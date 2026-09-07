<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  direction: { type: String, default: 'right' },
  speed: { type: Number, default: 1 },
  borderColor: { type: String, default: '#999' },
  squareSize: { type: Number, default: 40 },
  hoverFillColor: { type: String, default: '#222' },
  shape: { type: String, default: 'square' },
  hoverTrailAmount: { type: Number, default: 0 }
});

const canvasRef = ref(null);
const requestRef = ref(null);
const numSquaresX = ref(0);
const numSquaresY = ref(0);
const gridOffset = ref({ x: 0, y: 0 });
const hoveredSquareRef = ref(null);
const trailCells = ref([]);
const cellOpacities = ref(new Map());

let resizeCanvas, handleMouseMove, handleMouseLeave, onVisibility, io;

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let isHex = props.shape === 'hexagon';
  let isTri = props.shape === 'triangle';
  let hexHoriz = props.squareSize * 1.5;
  let hexVert = props.squareSize * Math.sqrt(3);

  resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    numSquaresX.value = Math.ceil(canvas.width / props.squareSize) + 1;
    numSquaresY.value = Math.ceil(canvas.height / props.squareSize) + 1;
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const drawHex = (cx, cy, size) => {
    if (!ctx) return;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const vx = cx + size * Math.cos(angle);
      const vy = cy + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();
  };

  const drawCircle = (cx, cy, size) => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    ctx.closePath();
  };

  const drawTriangle = (cx, cy, size, flip) => {
    if (!ctx) return;
    ctx.beginPath();
    if (flip) {
      ctx.moveTo(cx, cy + size / 2);
      ctx.lineTo(cx + size / 2, cy - size / 2);
      ctx.lineTo(cx - size / 2, cy - size / 2);
    } else {
      ctx.moveTo(cx, cy - size / 2);
      ctx.lineTo(cx + size / 2, cy + size / 2);
      ctx.lineTo(cx - size / 2, cy + size / 2);
    }
    ctx.closePath();
  };

  const drawGrid = () => {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isHex) {
      const colShift = Math.floor(gridOffset.value.x / hexHoriz);
      const offsetX = ((gridOffset.value.x % hexHoriz) + hexHoriz) % hexHoriz;
      const offsetY = ((gridOffset.value.y % hexVert) + hexVert) % hexVert;

      const cols = Math.ceil(canvas.width / hexHoriz) + 3;
      const rows = Math.ceil(canvas.height / hexVert) + 3;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const cx = col * hexHoriz + offsetX;
          const cy = row * hexVert + ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) + offsetY;

          const cellKey = `${col},${row}`;
          const alpha = cellOpacities.value.get(cellKey);
          if (alpha) {
            ctx.globalAlpha = alpha;
            drawHex(cx, cy, props.squareSize);
            ctx.fillStyle = props.hoverFillColor;
            ctx.fill();
            ctx.globalAlpha = 1;
          }

          drawHex(cx, cy, props.squareSize);
          ctx.strokeStyle = props.borderColor;
          ctx.stroke();
        }
      }
    } else if (isTri) {
      const halfW = props.squareSize / 2;
      const colShift = Math.floor(gridOffset.value.x / halfW);
      const rowShift = Math.floor(gridOffset.value.y / props.squareSize);
      const offsetX = ((gridOffset.value.x % halfW) + halfW) % halfW;
      const offsetY = ((gridOffset.value.y % props.squareSize) + props.squareSize) % props.squareSize;

      const cols = Math.ceil(canvas.width / halfW) + 4;
      const rows = Math.ceil(canvas.height / props.squareSize) + 4;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const cx = col * halfW + offsetX;
          const cy = row * props.squareSize + props.squareSize / 2 + offsetY;
          const flip = ((col + colShift + row + rowShift) % 2 + 2) % 2 !== 0;

          const cellKey = `${col},${row}`;
          const alpha = cellOpacities.value.get(cellKey);
          if (alpha) {
            ctx.globalAlpha = alpha;
            drawTriangle(cx, cy, props.squareSize, flip);
            ctx.fillStyle = props.hoverFillColor;
            ctx.fill();
            ctx.globalAlpha = 1;
          }

          drawTriangle(cx, cy, props.squareSize, flip);
          ctx.strokeStyle = props.borderColor;
          ctx.stroke();
        }
      }
    } else if (props.shape === 'circle') {
      const offsetX = ((gridOffset.value.x % props.squareSize) + props.squareSize) % props.squareSize;
      const offsetY = ((gridOffset.value.y % props.squareSize) + props.squareSize) % props.squareSize;

      const cols = Math.ceil(canvas.width / props.squareSize) + 3;
      const rows = Math.ceil(canvas.height / props.squareSize) + 3;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const cx = col * props.squareSize + props.squareSize / 2 + offsetX;
          const cy = row * props.squareSize + props.squareSize / 2 + offsetY;

          const cellKey = `${col},${row}`;
          const alpha = cellOpacities.value.get(cellKey);
          if (alpha) {
            ctx.globalAlpha = alpha;
            drawCircle(cx, cy, props.squareSize);
            ctx.fillStyle = props.hoverFillColor;
            ctx.fill();
            ctx.globalAlpha = 1;
          }

          drawCircle(cx, cy, props.squareSize);
          ctx.strokeStyle = props.borderColor;
          ctx.stroke();
        }
      }
    } else {
      const offsetX = ((gridOffset.value.x % props.squareSize) + props.squareSize) % props.squareSize;
      const offsetY = ((gridOffset.value.y % props.squareSize) + props.squareSize) % props.squareSize;

      const cols = Math.ceil(canvas.width / props.squareSize) + 3;
      const rows = Math.ceil(canvas.height / props.squareSize) + 3;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const sx = col * props.squareSize + offsetX;
          const sy = row * props.squareSize + offsetY;

          const cellKey = `${col},${row}`;
          const alpha = cellOpacities.value.get(cellKey);
          if (alpha) {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = props.hoverFillColor;
            ctx.fillRect(sx, sy, props.squareSize, props.squareSize);
            ctx.globalAlpha = 1;
          }

          ctx.strokeStyle = props.borderColor;
          ctx.strokeRect(sx, sy, props.squareSize, props.squareSize);
        }
      }
    }
  };

  const updateAnimation = () => {
    const effectiveSpeed = Math.max(props.speed, 0.1);
    const wrapX = isHex ? hexHoriz * 2 : props.squareSize;
    const wrapY = isHex ? hexVert : isTri ? props.squareSize * 2 : props.squareSize;

    switch (props.direction) {
      case 'right':
        gridOffset.value.x = (gridOffset.value.x - effectiveSpeed + wrapX) % wrapX;
        break;
      case 'left':
        gridOffset.value.x = (gridOffset.value.x + effectiveSpeed + wrapX) % wrapX;
        break;
      case 'up':
        gridOffset.value.y = (gridOffset.value.y + effectiveSpeed + wrapY) % wrapY;
        break;
      case 'down':
        gridOffset.value.y = (gridOffset.value.y - effectiveSpeed + wrapY) % wrapY;
        break;
      case 'diagonal':
        gridOffset.value.x = (gridOffset.value.x - effectiveSpeed + wrapX) % wrapX;
        gridOffset.value.y = (gridOffset.value.y - effectiveSpeed + wrapY) % wrapY;
        break;
      default:
        break;
    }

    updateCellOpacities();
    drawGrid();
    requestRef.value = requestAnimationFrame(updateAnimation);
  };

  const updateCellOpacities = () => {
    const targets = new Map();

    if (hoveredSquareRef.value) {
      targets.set(`${hoveredSquareRef.value.x},${hoveredSquareRef.value.y}`, 1);
    }

    if (props.hoverTrailAmount > 0) {
      for (let i = 0; i < trailCells.value.length; i++) {
        const t = trailCells.value[i];
        const key = `${t.x},${t.y}`;
        if (!targets.has(key)) {
          targets.set(key, (trailCells.value.length - i) / (trailCells.value.length + 1));
        }
      }
    }

    for (const [key] of targets) {
      if (!cellOpacities.value.has(key)) {
        cellOpacities.value.set(key, 0);
      }
    }

    for (const [key, opacity] of cellOpacities.value) {
      const target = targets.get(key) || 0;
      const next = opacity + (target - opacity) * 0.15;
      if (next < 0.005) {
        cellOpacities.value.delete(key);
      } else {
        cellOpacities.value.set(key, next);
      }
    }
  };

  handleMouseMove = event => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (isHex) {
      const colShift = Math.floor(gridOffset.value.x / hexHoriz);
      const offsetX = ((gridOffset.value.x % hexHoriz) + hexHoriz) % hexHoriz;
      const offsetY = ((gridOffset.value.y % hexVert) + hexVert) % hexVert;
      const adjustedX = mouseX - offsetX;
      const adjustedY = mouseY - offsetY;

      const col = Math.round(adjustedX / hexHoriz);
      const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
      const row = Math.round((adjustedY - rowOffset) / hexVert);

      if (
        !hoveredSquareRef.value ||
        hoveredSquareRef.value.x !== col ||
        hoveredSquareRef.value.y !== row
      ) {
        if (hoveredSquareRef.value && props.hoverTrailAmount > 0) {
          trailCells.value.unshift({ ...hoveredSquareRef.value });
          if (trailCells.value.length > props.hoverTrailAmount) trailCells.value.length = props.hoverTrailAmount;
        }
        hoveredSquareRef.value = { x: col, y: row };
      }
    } else if (isTri) {
      const halfW = props.squareSize / 2;
      const offsetX = ((gridOffset.value.x % halfW) + halfW) % halfW;
      const offsetY = ((gridOffset.value.y % props.squareSize) + props.squareSize) % props.squareSize;

      const adjustedX = mouseX - offsetX;
      const adjustedY = mouseY - offsetY;

      const col = Math.round(adjustedX / halfW);
      const row = Math.floor(adjustedY / props.squareSize);

      if (
        !hoveredSquareRef.value ||
        hoveredSquareRef.value.x !== col ||
        hoveredSquareRef.value.y !== row
      ) {
        if (hoveredSquareRef.value && props.hoverTrailAmount > 0) {
          trailCells.value.unshift({ ...hoveredSquareRef.value });
          if (trailCells.value.length > props.hoverTrailAmount) trailCells.value.length = props.hoverTrailAmount;
        }
        hoveredSquareRef.value = { x: col, y: row };
      }
    } else if (props.shape === 'circle') {
      const offsetX = ((gridOffset.value.x % props.squareSize) + props.squareSize) % props.squareSize;
      const offsetY = ((gridOffset.value.y % props.squareSize) + props.squareSize) % props.squareSize;

      const adjustedX = mouseX - offsetX;
      const adjustedY = mouseY - offsetY;

      const col = Math.round(adjustedX / props.squareSize);
      const row = Math.round(adjustedY / props.squareSize);

      if (
        !hoveredSquareRef.value ||
        hoveredSquareRef.value.x !== col ||
        hoveredSquareRef.value.y !== row
      ) {
        if (hoveredSquareRef.value && props.hoverTrailAmount > 0) {
          trailCells.value.unshift({ ...hoveredSquareRef.value });
          if (trailCells.value.length > props.hoverTrailAmount) trailCells.value.length = props.hoverTrailAmount;
        }
        hoveredSquareRef.value = { x: col, y: row };
      }
    } else {
      const offsetX = ((gridOffset.value.x % props.squareSize) + props.squareSize) % props.squareSize;
      const offsetY = ((gridOffset.value.y % props.squareSize) + props.squareSize) % props.squareSize;

      const adjustedX = mouseX - offsetX;
      const adjustedY = mouseY - offsetY;

      const col = Math.floor(adjustedX / props.squareSize);
      const row = Math.floor(adjustedY / props.squareSize);

      if (
        !hoveredSquareRef.value ||
        hoveredSquareRef.value.x !== col ||
        hoveredSquareRef.value.y !== row
      ) {
        if (hoveredSquareRef.value && props.hoverTrailAmount > 0) {
          trailCells.value.unshift({ ...hoveredSquareRef.value });
          if (trailCells.value.length > props.hoverTrailAmount) trailCells.value.length = props.hoverTrailAmount;
        }
        hoveredSquareRef.value = { x: col, y: row };
      }
    }
  };

  handleMouseLeave = () => {
    if (hoveredSquareRef.value && props.hoverTrailAmount > 0) {
      trailCells.value.unshift({ ...hoveredSquareRef.value });
      if (trailCells.value.length > props.hoverTrailAmount) trailCells.value.length = props.hoverTrailAmount;
    }
    hoveredSquareRef.value = null;
  };

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);
  let isVisible = false;
  let isPageVisible = !document.hidden;

  const tryStart = () => {
    if (isVisible && isPageVisible && !requestRef.value) {
      requestRef.value = requestAnimationFrame(updateAnimation);
    }
  };
  const tryStop = () => {
    if (requestRef.value) {
      cancelAnimationFrame(requestRef.value);
      requestRef.value = null;
    }
  };

  io = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      isVisible ? tryStart() : tryStop();
    },
    { threshold: 0 }
  );
  io.observe(canvas);

  onVisibility = () => {
    isPageVisible = !document.hidden;
    isPageVisible ? tryStart() : tryStop();
  };
  document.addEventListener('visibilitychange', onVisibility);

  tryStart();

  watch(() => props, () => {
    isHex = props.shape === 'hexagon';
    isTri = props.shape === 'triangle';
    hexHoriz = props.squareSize * 1.5;
    hexVert = props.squareSize * Math.sqrt(3);
  }, { deep: true });

});

onUnmounted(() => {
  if (resizeCanvas) window.removeEventListener('resize', resizeCanvas);
  if (requestRef.value) {
    cancelAnimationFrame(requestRef.value);
    requestRef.value = null;
  }
  if (io && canvasRef.value) io.disconnect();
  if (onVisibility) document.removeEventListener('visibilitychange', onVisibility);
  if (canvasRef.value && handleMouseMove) canvasRef.value.removeEventListener('mousemove', handleMouseMove);
  if (canvasRef.value && handleMouseLeave) canvasRef.value.removeEventListener('mouseleave', handleMouseLeave);
});
</script>

<template>
  <canvas ref="canvasRef" class="w-full h-full border-none block pointer-events-auto"></canvas>
</template>
