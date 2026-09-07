<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  animationTime: { type: Number, default: 600 },
  particleCount: { type: Number, default: 15 },
  particleDistances: { type: Array, default: () => [90, 10] },
  particleR: { type: Number, default: 100 },
  timeVariance: { type: Number, default: 300 },
  colors: { type: Array, default: () => [1, 2, 3, 1, 2, 3, 1, 4] },
  initialActiveIndex: { type: Number, default: 0 },
  activeIndexOverride: { type: Number, default: -1 }
})

const emit = defineEmits(['navigate'])

const containerRef = ref(null)
const navRef = ref(null)
const filterRef = ref(null)
const textRef = ref(null)
const activeIndex = ref(props.initialActiveIndex)

watch(() => props.activeIndexOverride, (newVal) => {
  if (newVal !== -1 && newVal !== activeIndex.value) {
    activeIndex.value = newVal;
    const itemsEl = navRef.value?.querySelectorAll('li');
    if (itemsEl && itemsEl[newVal]) {
      updateEffectPosition(itemsEl[newVal]);
    }
  }
})

const noise = (n = 1) => n / 2 - Math.random() * n

const getXY = (distance, pointIndex, totalPoints) => {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
  return [distance * Math.cos(angle), distance * Math.sin(angle)]
}

const createParticle = (i, t, d, r) => {
  let rotate = noise(r / 10)
  return {
    start: getXY(d[0], props.particleCount - i, props.particleCount),
    end: getXY(d[1] + noise(7), props.particleCount - i, props.particleCount),
    time: t,
    scale: 1 + noise(0.2),
    color: props.colors[Math.floor(Math.random() * props.colors.length)],
    rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
  }
}

const makeParticles = element => {
  const d = props.particleDistances
  const r = props.particleR
  const bubbleTime = props.animationTime * 2 + props.timeVariance
  element.style.setProperty('--time', `${bubbleTime}ms`)
  
  for (let i = 0; i < props.particleCount; i++) {
    const t = props.animationTime * 2 + noise(props.timeVariance * 2)
    const p = createParticle(i, t, d, r)
    element.classList.remove('active')
    
    setTimeout(() => {
      const particle = document.createElement('span')
      const point = document.createElement('span')
      particle.classList.add('particle')
      particle.style.setProperty('--start-x', `${p.start[0]}px`)
      particle.style.setProperty('--start-y', `${p.start[1]}px`)
      particle.style.setProperty('--end-x', `${p.end[0]}px`)
      particle.style.setProperty('--end-y', `${p.end[1]}px`)
      particle.style.setProperty('--time', `${p.time}ms`)
      particle.style.setProperty('--scale', `${p.scale}`)
      particle.style.setProperty('--color', `var(--color-${p.color}, white)`)
      particle.style.setProperty('--rotate', `${p.rotate}deg`)
      
      point.classList.add('point')
      particle.appendChild(point)
      element.appendChild(particle)
      
      requestAnimationFrame(() => {
        element.classList.add('active')
      })
      
      setTimeout(() => {
        try {
          element.removeChild(particle)
        } catch {
          // do nothing
        }
      }, t)
    }, 30)
  }
}

const updateEffectPosition = element => {
  if (!containerRef.value || !filterRef.value || !textRef.value) return
  const containerRect = containerRef.value.getBoundingClientRect()
  const pos = element.getBoundingClientRect()
  
  const styles = {
    left: `${pos.x - containerRect.x}px`,
    top: `${pos.y - containerRect.y}px`,
    width: `${pos.width}px`,
    height: `${pos.height}px`
  }
  
  Object.assign(filterRef.value.style, styles)
  Object.assign(textRef.value.style, styles)
  
  textRef.value.innerText = element.innerText
}

const handleClick = (e, index, item) => {
  e.preventDefault();
  const liEl = e.currentTarget;
  if (activeIndex.value === index) {
      emit('navigate', item.id)
      return;
  }
  activeIndex.value = index;
  emit('navigate', item.id)
  
  updateEffectPosition(liEl);
  
  if (filterRef.value) {
    const particles = filterRef.value.querySelectorAll('.particle');
    particles.forEach(p => filterRef.value.removeChild(p));
  }
  if (textRef.value) {
    textRef.value.classList.remove('active');
    void textRef.value.offsetWidth;
    textRef.value.classList.add('active');
  }
  if (filterRef.value) {
    makeParticles(filterRef.value);
  }
}

const handleKeyDown = (e, index, item) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const liEl = e.currentTarget.parentElement;
    if (liEl) {
      handleClick({ currentTarget: liEl, preventDefault: ()=>{} }, index, item);
    }
  }
}

let resizeObserver

onMounted(() => {
  if (!navRef.value || !containerRef.value) return
  
  setTimeout(() => {
      const activeLi = navRef.value.querySelectorAll('li')[activeIndex.value]
      if (activeLi) {
        updateEffectPosition(activeLi)
        if (textRef.value) textRef.value.classList.add('active')
      }
      
      resizeObserver = new ResizeObserver(() => {
        const currentActiveLi = navRef.value?.querySelectorAll('li')[activeIndex.value]
        if (currentActiveLi) {
          updateEffectPosition(currentActiveLi)
        }
      })
      if (containerRef.value) {
        resizeObserver.observe(containerRef.value)
      }
  }, 100);
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
})

</script>

<template>
  <div class="relative" ref="containerRef">
    <!-- SVG Filter for true transparent Gooey Effect -->
    <svg width="0" height="0" class="absolute pointer-events-none">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0  
            0 1 0 0 0  
            0 0 1 0 0  
            0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>

    <nav class="flex relative" style="transform: translate3d(0,0,0.01px)">
      <ul
        ref="navRef"
        class="flex gap-1 md:gap-3 list-none p-0 m-0 relative z-[3]"
        style="text-shadow: 0 1px 1px hsl(205deg 30% 10% / 0.2)"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          class="rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent]"
          :class="[activeIndex === index ? 'active text-cyber-bg font-bold' : 'text-cyber-text-main font-semibold']"
          @click="e => handleClick(e, index, item)"
        >
          <a
            :href="`#${item.id}`"
            @click.prevent
            @keydown="e => handleKeyDown(e, index, item)"
            class="outline-none py-[0.5em] px-[1em] inline-flex items-center gap-1.5 font-hud text-xs tracking-wider"
          >
             <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <span class="effect filter" ref="filterRef" />
    <span class="effect text font-hud font-bold text-xs flex items-center justify-center tracking-wider" ref="textRef" />
  </div>
</template>

<style scoped>
:root {
  --color-1: var(--cyber-cyan);
  --color-2: var(--cyber-gold);
  --color-3: var(--cyber-green);
  --color-4: var(--cyber-cyan); /* Removed white, now matching theme */
}

.effect {
  position: absolute;
  opacity: 1;
  pointer-events: none;
  display: grid;
  place-items: center;
  z-index: 1;
}
.effect.text {
  color: white;
  transition: color 0.3s ease;
}
.effect.text.active {
  color: var(--cyber-bg);
}
.effect.filter {
  filter: url('#goo'); /* Use SVG filter for true transparency support */
}

/* We removed the black box (::before) since SVG filter handles alpha channel directly */

.effect.filter::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--cyber-cyan);
  transform: scale(0);
  opacity: 0;
  z-index: -1;
  border-radius: 9999px;
}
.effect.active::after {
  animation: pill 0.3s ease both;
}
@keyframes pill {
  to {
    transform: scale(1);
    opacity: 1;
  }
}
:deep(.particle),
:deep(.point) {
  display: block;
  opacity: 0;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  transform-origin: center;
}
:deep(.particle) {
  --time: 5s;
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 8px);
  animation: particle calc(var(--time)) ease 1 -350ms;
}
:deep(.point) {
  background: var(--color);
  opacity: 1;
  animation: point calc(var(--time)) ease 1 -350ms;
}
@keyframes particle {
  0% {
    transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
    opacity: 1;
    animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
  }
  70% {
    transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
    opacity: 1;
    animation-timing-function: ease;
  }
  85% {
    transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
    opacity: 1;
  }
  100% {
    transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
    opacity: 1;
  }
}
@keyframes point {
  0% {
    transform: scale(0);
    opacity: 0;
    animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
  }
  25% {
    transform: scale(calc(var(--scale) * 0.25));
  }
  38% {
    opacity: 1;
  }
  65% {
    transform: scale(var(--scale));
    opacity: 1;
    animation-timing-function: ease;
  }
  85% {
    transform: scale(var(--scale));
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
li.active {
  color: var(--cyber-bg);
  text-shadow: none;
}
li.active::after {
  opacity: 1;
  transform: scale(1);
}
li::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background: var(--cyber-cyan);
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
  z-index: -1;
}
</style>
