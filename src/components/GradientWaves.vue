<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const props = defineProps({
  horizonColor: { type: String, default: '#5227FF' },
  waveColor: { type: String, default: '#FF9FFC' },
  crestColor: { type: String, default: '#FFFFFF' },
  speed: { type: Number, default: 0.4 },
  amplitude: { type: Number, default: 2.5 },
  waveScale: { type: Number, default: 0.6 },
  waveRatio: { type: Number, default: 0.9 },
  swell: { type: Number, default: 35 },
  turbulence: { type: Number, default: 20 },
  tilt: { type: Number, default: 1.11 },
  zoom: { type: Number, default: 1.0 },
  height: { type: Number, default: 5.5 },
  fogDepth: { type: Number, default: 15 },
  detail: { type: String, default: 'medium' },
  brightness: { type: Number, default: 1.0 },
  opacity: { type: Number, default: 1.0 },
  mouseInteraction: { type: Boolean, default: true },
  parallaxStrength: { type: Number, default: 0.5 },
  grain: { type: Boolean, default: true },
  grainIntensity: { type: Number, default: 0.05 },
  className: { type: String, default: '' }
});

const containerRef = ref(null);

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const detailToSteps = detail => {
  if (detail === 'low') return 40.0;
  if (detail === 'high') return 110.0;
  return 70.0;
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaveScale;
uniform float uWaveRatio;
uniform float uSwell;
uniform float uTurbulence;
uniform float uTilt;
uniform float uZoom;
uniform float uHeight;
uniform float uFogDepth;
uniform float uSteps;
uniform float uBrightness;
uniform float uOpacity;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec2 uMouse;
uniform float uParallax;
uniform bool uEnableMouse;
uniform vec3 uHorizonColor;
uniform vec3 uWaveColor;
uniform vec3 uCrestColor;
out vec4 fragColor;

const float MAX_DIST = 20000.0;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float plasma(vec3 r, vec2 freq, vec4 tc) {
  float mx = r.x + tc.x;
  mx += uSwell * sin((r.y + mx) / 20.0 + tc.y);
  float my = r.y - tc.z;
  my += uTurbulence * cos(r.x / 23.0 + tc.w);
  return r.z - (sin(mx * freq.x) * uAmplitude + sin(my * freq.y) * uAmplitude + uHeight);
}

float raymarch(vec3 pos, vec3 dir, vec2 freq, vec4 tc) {
  float dist = 0.0;
  for (int i = 0; i < 128; i++) {
    if (float(i) >= uSteps) break;
    float dscene = plasma(pos + dist * dir, freq, tc);
    if (abs(dscene) < 0.1) break;
    dist += 0.9 * dscene;
    if (!(abs(dist) < MAX_DIST)) return MAX_DIST;
  }
  return dist;
}

void main() {
  float T = iTime * uSpeed;
  vec2 freq = vec2(uWaveScale / 7.0, (uWaveScale * uWaveRatio) / 3.0);
  vec4 tc = vec4(T / 0.130, T / 0.810, T / 0.200, T / 0.710);
  float c, s;
  float vfov = (3.14159 / 2.3) / max(uZoom, 0.05);
  vec3 cam = vec3(0.0, 0.0, 30.0);
  vec2 uv = (gl_FragCoord.xy / iResolution.xy) - 0.5;
  uv.x *= iResolution.x / iResolution.y;
  uv.y *= -1.0;

  vec3 dir = vec3(0.0, 0.0, -1.0);
  float ulen = length(uv);
  float xrot = vfov * ulen;
  c = cos(xrot); s = sin(xrot);
  dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  vec2 nuv = ulen > 1e-5 ? uv / ulen : vec2(1.0, 0.0);
  c = nuv.x; s = nuv.y;
  dir = mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0) * dir;
  c = cos(uTilt); s = sin(uTilt);
  dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;

  if (uEnableMouse) {
    float yaw = (uMouse.x - 0.5) * uParallax * 0.4;
    float pitch = (uMouse.y - 0.5) * uParallax * 0.4;
    c = cos(yaw); s = sin(yaw);
    dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;
    c = cos(pitch); s = sin(pitch);
    dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  }

  float dist = raymarch(cam, dir, freq, tc);
  vec3 pos = cam + dist * dir;

  float t = clamp(uFogDepth / max(dist, 0.001), 0.0, 1.0);
  vec3 body = mix(uWaveColor, uCrestColor, clamp(pos.z * 0.08 + 0.5, 0.0, 1.0));
  vec3 col = mix(uHorizonColor, body, t);
  col *= uBrightness;
  col = clamp(col, 0.0, 1.0);

  float alpha = clamp(t, 0.0, 1.0) * uOpacity;
  if (uGrain > 0.5) {
    float g = hash21(gl_FragCoord.xy + mod(iTime, 64.0) * 11.0);
    alpha += (g - 0.5) * uGrainIntensity;
  }
  alpha = clamp(alpha, 0.0, 1.0);
  fragColor = vec4(col * alpha, alpha);
}
`;

let renderer, program, mesh;
let ro, io;
let raf = 0;
let isVisible = true;
let isPageVisible = !document.hidden;

const currentMouse = [0.5, 0.5];
const targetMouse = [0.5, 0.5];
let onPointerMove, onPointerLeave, onVisibility;
let canvas;

onMounted(() => {
  const container = containerRef.value;
  if (!container) return;

  renderer = new Renderer({
    webgl: 2,
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    dpr: Math.min(window.devicePixelRatio || 1, 2)
  });

  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  canvas = gl.canvas;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const geometry = new Triangle(gl);
  program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new Float32Array([1, 1]) },
      uSpeed: { value: props.speed },
      uAmplitude: { value: props.amplitude },
      uWaveScale: { value: props.waveScale },
      uWaveRatio: { value: props.waveRatio },
      uSwell: { value: props.swell },
      uTurbulence: { value: props.turbulence },
      uTilt: { value: props.tilt },
      uZoom: { value: props.zoom },
      uHeight: { value: props.height },
      uFogDepth: { value: props.fogDepth },
      uSteps: { value: detailToSteps(props.detail) },
      uBrightness: { value: props.brightness },
      uOpacity: { value: props.opacity },
      uGrain: { value: props.grain ? 1.0 : 0.0 },
      uGrainIntensity: { value: props.grainIntensity },
      uMouse: { value: new Float32Array([0.5, 0.5]) },
      uParallax: { value: props.parallaxStrength },
      uEnableMouse: { value: props.mouseInteraction },
      uHorizonColor: { value: new Float32Array(hexToRgb(props.horizonColor)) },
      uWaveColor: { value: new Float32Array(hexToRgb(props.waveColor)) },
      uCrestColor: { value: new Float32Array(hexToRgb(props.crestColor)) }
    }
  });

  mesh = new Mesh(gl, { geometry, program });

  const setSize = () => {
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    renderer.setSize(w, h);
    const res = program.uniforms.iResolution.value;
    res[0] = gl.drawingBufferWidth;
    res[1] = gl.drawingBufferHeight;
    renderer.render({ scene: mesh });
  };

  ro = new ResizeObserver(setSize);
  ro.observe(container);
  setSize();

  onPointerMove = e => {
    targetMouse[0] = e.clientX / window.innerWidth;
    targetMouse[1] = 1.0 - (e.clientY / window.innerHeight);
  };
  onPointerLeave = () => {
    targetMouse[0] = 0.5;
    targetMouse[1] = 0.5;
  };
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerleave', onPointerLeave);

  const t0 = performance.now();

  const loop = t => {
    program.uniforms.iTime.value = (t - t0) * 0.001;
    const tx = props.mouseInteraction ? targetMouse[0] : 0.5;
    const ty = props.mouseInteraction ? targetMouse[1] : 0.5;
    currentMouse[0] += 0.05 * (tx - currentMouse[0]);
    currentMouse[1] += 0.05 * (ty - currentMouse[1]);
    program.uniforms.uMouse.value[0] = currentMouse[0];
    program.uniforms.uMouse.value[1] = currentMouse[1];
    renderer.render({ scene: mesh });
    raf = requestAnimationFrame(loop);
  };

  const tryStart = () => {
    if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
  };
  const tryStop = () => {
    if (raf !== 0) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  io = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      isVisible ? tryStart() : tryStop();
    },
    { threshold: 0 }
  );
  io.observe(container);

  onVisibility = () => {
    isPageVisible = !document.hidden;
    isPageVisible ? tryStart() : tryStop();
  };
  document.addEventListener('visibilitychange', onVisibility);

  tryStart();

  watch(() => props, (newProps) => {
    if (!program) return;
    const u = program.uniforms;
    u.uSpeed.value = newProps.speed;
    u.uAmplitude.value = newProps.amplitude;
    u.uWaveScale.value = newProps.waveScale;
    u.uWaveRatio.value = newProps.waveRatio;
    u.uSwell.value = newProps.swell;
    u.uTurbulence.value = newProps.turbulence;
    u.uTilt.value = newProps.tilt;
    u.uZoom.value = newProps.zoom;
    u.uHeight.value = newProps.height;
    u.uFogDepth.value = newProps.fogDepth;
    u.uSteps.value = detailToSteps(newProps.detail);
    u.uBrightness.value = newProps.brightness;
    u.uOpacity.value = newProps.opacity;
    u.uGrain.value = newProps.grain ? 1.0 : 0.0;
    u.uGrainIntensity.value = newProps.grainIntensity;
    u.uParallax.value = newProps.parallaxStrength;
    u.uEnableMouse.value = newProps.mouseInteraction;
    
    const h = hexToRgb(newProps.horizonColor);
    const w = hexToRgb(newProps.waveColor);
    const cr = hexToRgb(newProps.crestColor);
    u.uHorizonColor.value[0] = h[0];
    u.uHorizonColor.value[1] = h[1];
    u.uHorizonColor.value[2] = h[2];
    u.uWaveColor.value[0] = w[0];
    u.uWaveColor.value[1] = w[1];
    u.uWaveColor.value[2] = w[2];
    u.uCrestColor.value[0] = cr[0];
    u.uCrestColor.value[1] = cr[1];
    u.uCrestColor.value[2] = cr[2];
  }, { deep: true });
});

onUnmounted(() => {
  if (raf !== 0) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
  if (ro) ro.disconnect();
  if (io) io.disconnect();
  document.removeEventListener('visibilitychange', onVisibility);
  if (canvas) {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerleave', onPointerLeave);
  }
  
  if (containerRef.value && canvas) {
    try {
      containerRef.value.removeChild(canvas);
    } catch (e) {}
  }
  
  if (renderer && renderer.gl) {
    renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
});
</script>

<template>
  <div ref="containerRef" :class="['relative h-full w-full overflow-hidden', className]"></div>
</template>
