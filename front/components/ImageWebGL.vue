<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  props: {
    img: {
      required: true,
    },
    scratch: {
      default: 0,
    },
    shiny: {
      default: false
    },
    random: {
      default: "cc"
    }
  },
  data() {
    return {
      frequency: 15.0,
      time: {
        x: 1,
        y: 1
      }
    };
  },
  watch: {
    scratch() {
      this.update();
    },
  },
  computed: {
    getScratch() {
      const min = 0.2;
      const max = 0.7;
      if (this.scratch <= 0) {
        return min;
      } else if (this.scratch >= 100) {
        return Number(1).toFixed(2);
      } else {
        return min + (max - min) * (this.scratch / 100);
      }
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      this.time.x = getNumberFromHash(this.random, 1, 200)
      this.time.y = getNumberFromHash(this.random, 200, 400)
      this.frequency = Number(this.frequency).toFixed(2);
      const canvas = this.$refs.canvas;
      this.filterImage(canvas, this.img);
    },
    filterImage(canvas, imgSrc) {
      const f = this.frequency;
      const a = this.getScratch;
      const gl = canvas.getContext("webgl");

      const noise = `
  // Noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
float noise(vec3 P) {
    vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.0));
    vec3 f0 = fract(P), f1 = f0 - vec3(1.0), f = fade(f0);
    vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy);
    vec4 iz0 = i0.zzzz, iz1 = i1.zzzz;
    vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0), gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    vec4 gx1 = ixy1 * (1.0 / 7.0), gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0); gx1 = fract(gx1);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),
        g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),
        g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),
        g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3)));
    vec4 norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));
    g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;
    g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;
    vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),
        dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),
        vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),
            dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);
    return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);
}
float noise(vec2 P) { return noise(vec3(P, 0.0)); }
  `;

      const vertexShaderSource = `
  attribute vec2 position;
  varying vec2 v_coordinate;
  void main() {
    gl_Position = vec4(position, 0, 1);
    v_coordinate = gl_Position.xy * 0.5 + 0.5;
  }
`;

      const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_coordinate;
  uniform vec2 u_textureSize;
  uniform sampler2D u_texture;


  ${noise}

  void main() {
    float floatNoise = noise(v_coordinate * ${f} + vec2(${this.time.x}, ${this.time.y}));

    vec2 position = vec2(v_coordinate.x, 1.0 - v_coordinate.y);
    vec4 color = vec4(0);
    color = texture2D(u_texture, position);
    if(color.a > 0.2) {
      if(floatNoise > ${a}){
        color.a = 0.0;
      }
    }
    if(${this.shiny}){
      color.g = 0.9;
      color.r = 0.9;
    }

    gl_FragColor = color;
 }
`;

      const vertexShader = compileShader(
        gl,
        gl.VERTEX_SHADER,
        vertexShaderSource
      );
      const fragmentShader = compileShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
      );

      // iniziailing the program
      const program = createProgram(gl, vertexShader, fragmentShader);

      const positionAttributeLocation = gl.getAttribLocation(
        program,
        "position"
      );

      const imageSizeLocation = gl.getUniformLocation(program, "imageSize");

      // binding the position buffer to positionBuffer
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      // using the program defined above
      gl.useProgram(program);
      // enabling the texcoord attribute
      gl.enableVertexAttribArray(positionAttributeLocation);
      // setting up the size of the image
      gl.uniform2f(imageSizeLocation, canvas.width, canvas.height);
      // telling positionAttributeLocation how to retrieve data out of positionBuffer
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      // provide the texture coordinates
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1]),
        gl.STATIC_DRAW
      );

      // loading the original image as a texture
      const texture = gl.createTexture();
      texture.image = new Image();

      // setting the anonymous mode
      // Learn more about it here:
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/crossOrigin
      texture.image.crossOrigin = "";
      texture.image.src = imgSrc;
      texture.image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // setting the parameters to be able to render any image,
        // regardless of its size
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        // loading the original image as a texture
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          texture.image
        );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };
    },
  },
};

function compileShader(gl, type, shaderSource) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  const outcome = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (outcome === false) {
    // logging the error message on failure
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const outcome = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (outcome === false) {
    // logging the error message on failure
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  return program;
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    hash += charCode;
  }
  return hash;
}

function getNumberFromHash(str, min, max) {
  const hash = simpleHash(str);
  const range = max - min + 1;
  return ((hash % range) + range) % range + min;
}
</script>
