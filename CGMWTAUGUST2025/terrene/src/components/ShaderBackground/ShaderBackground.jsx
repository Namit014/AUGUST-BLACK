"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER_SOURCE = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

// High quality procedural noise
float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// 2D Smooth Noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fine analog film grain
float filmGrain(vec2 fragCoord, float t) {
  vec3 p3 = fract(vec3(fragCoord.xyx) * vec3(0.1031, 0.1030, 0.0973) + fract(t * 0.02));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  
  // Very slow time progression
  float t = uTime * 0.04;

  // Extremely subtle low-frequency organic warp
  vec2 warp = vec2(
    noise(uv * 2.5 + vec2(t * 0.2, 0.0)) - 0.5,
    noise(uv * 2.5 - vec2(0.0, t * 0.15)) - 0.5
  ) * 0.018;
  vec2 p = uv + warp;

  // Number of distinct horizontal light bands
  const float NUM_BANDS = 12.0;
  
  // Band index and fractional position inside the band
  float scaledY = p.y * NUM_BANDS;
  float bandIndex = floor(scaledY);
  float fy = fract(scaledY);

  // Slight horizontal boundary softening between adjacent bands
  float edgeFeather = 0.06;
  float bandEdgeMask = smoothstep(0.0, edgeFeather, fy) * (1.0 - smoothstep(1.0 - edgeFeather, 1.0, fy));
  // Keep step contrast visible like layered glass sheets
  float sheetStepShade = 0.90 + 0.15 * pow(fy, 0.8);

  // Stepped horizontal parameters per band:
  // tNorm goes from 0.0 (bottom band) to 1.0 (top band)
  float tNorm = clamp(bandIndex / (NUM_BANDS - 1.0), 0.0, 1.0);
  
  // Staggered X Start & End points creating the diagonal staircase
  // Top bands: start far right (~0.48), end at ~0.90
  // Bottom bands: start far left (~-0.20), end at ~0.42
  float xStart = mix(-0.20, 0.48, pow(tNorm, 0.95)) + sin(tNorm * 4.0 + t) * 0.012;
  float xEnd   = mix(0.44, 0.90, pow(tNorm, 0.85)) + cos(tNorm * 3.5 - t) * 0.012;

  // Softness on the left and right ends of the band
  float softL = mix(0.16, 0.10, tNorm);
  float softR = mix(0.24, 0.18, tNorm);

  // Horizontal envelope of current band
  float maskL = smoothstep(xStart - softL, xStart + softL * 0.5, p.x);
  float maskR = 1.0 - smoothstep(xEnd - softR * 0.5, xEnd + softR, p.x);
  float bandMask = clamp(maskL * maskR, 0.0, 1.0);

  // Peak brightness profile: upper-center is highest mint brightness
  float bandIntensity = mix(0.55, 1.08, sin(tNorm * 3.14159 * 0.85 + 0.25));
  
  // Also blend a little with neighboring band to ensure soft photographic continuity
  float nextTNorm = clamp((bandIndex + 1.0) / (NUM_BANDS - 1.0), 0.0, 1.0);
  float nextXStart = mix(-0.20, 0.48, pow(nextTNorm, 0.95));
  float nextXEnd   = mix(0.44, 0.90, pow(nextTNorm, 0.85));
  float nextMask = smoothstep(nextXStart - 0.15, nextXStart + 0.08, p.x) * (1.0 - smoothstep(nextXEnd - 0.10, nextXEnd + 0.20, p.x));
  float nextIntensity = mix(0.55, 1.08, sin(nextTNorm * 3.14159 * 0.85 + 0.25));

  // Combine primary band with subtle inter-band blending
  float currentLight = bandMask * bandIntensity * sheetStepShade;
  float blendedLight = mix(currentLight, nextMask * nextIntensity, (1.0 - bandEdgeMask) * 0.35);

  // Broad diagonal background illumination supporting the beam
  float diagCoord = (p.x * 0.70 + p.y * 0.65);
  float ambientBeam = exp(-pow((diagCoord - 0.72) / 0.50, 2.0)) * 0.38;
  
  // Total computed light field
  float totalLight = blendedLight * 0.82 + ambientBeam * 0.28;

  // Target Color Grading (Matching reference image exactly):
  // 1. Deep Dark Forest Pine Base #0d2818 (RGB 13, 40, 24)
  vec3 colBase     = vec3(13.0 / 255.0, 40.0 / 255.0, 24.0 / 255.0);
  // 2. Dark Emerald Moss #16462d (RGB 22, 70, 45)
  vec3 colDark     = vec3(22.0 / 255.0, 70.0 / 255.0, 45.0 / 255.0);
  // 3. Medium Forest Emerald #2e6e4a (RGB 46, 110, 74)
  vec3 colMid      = vec3(46.0 / 255.0, 110.0 / 255.0, 74.0 / 255.0);
  // 4. Soft Muted Sage #60a07a (RGB 96, 160, 122)
  vec3 colSage     = vec3(96.0 / 255.0, 160.0 / 255.0, 122.0 / 255.0);
  // 5. Bright Mint Green #9ecaa9 (RGB 158, 202, 169)
  vec3 colMint     = vec3(158.0 / 255.0, 202.0 / 255.0, 169.0 / 255.0);
  // 6. Highlight Pale White-Mint Core #d8eee0 (RGB 216, 238, 224)
  vec3 colCoreMint = vec3(216.0 / 255.0, 238.0 / 255.0, 224.0 / 255.0);

  // Multi-tier smooth color blending
  vec3 col = colBase;
  col = mix(col, colDark,     smoothstep(0.01, 0.22, totalLight));
  col = mix(col, colMid,      smoothstep(0.18, 0.46, totalLight));
  col = mix(col, colSage,     smoothstep(0.40, 0.72, totalLight));
  col = mix(col, colMint,     smoothstep(0.68, 0.96, totalLight));
  col = mix(col, colCoreMint, smoothstep(0.92, 1.25, totalLight));

  // Subtle Vignette (Darkening outer perimeter)
  vec2 vUv = uv - 0.5;
  float vig = 1.0 - dot(vUv, vUv) * 0.35;
  col *= clamp(vig, 0.70, 1.0);

  // Dense, Fine Monochromatic Film Grain Texture
  float grain1 = filmGrain(gl_FragCoord.xy, uTime);
  float grain2 = filmGrain(gl_FragCoord.xy * 0.5 + vec2(17.3, 41.7), uTime * 0.5);
  float combinedGrain = (grain1 * 0.65 + grain2 * 0.35);
  
  // ~7% tactile analog grain intensity matching reference texture
  float grainIntensity = 0.075 + 0.015 * (1.0 - totalLight);
  col += (combinedGrain - 0.5) * grainIntensity;

  // Dithering to eliminate any banding
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.008;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export default function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("WebGL not supported.");
      return;
    }

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering full screen [-1, 1]
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLocation = gl.getUniformLocation(program, "uResolution");
    const uTimeLocation = gl.getUniformLocation(program, "uTime");

    let animationFrameId;
    let startTime = performance.now();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const render = (now) => {
      handleResize();
      const elapsedSeconds = (now - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(uTimeLocation, elapsedSeconds);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
