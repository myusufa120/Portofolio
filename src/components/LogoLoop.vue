<script setup>
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'

const props = defineProps({
  logos: { type: Array, required: true },
  speed: { type: Number, default: 120 },
  direction: { type: String, default: 'left' },
  width: { type: [Number, String], default: '100%' },
  logoHeight: { type: Number, default: 28 },
  gap: { type: Number, default: 32 },
  pauseOnHover: { type: Boolean, default: undefined },
  hoverSpeed: { type: Number, default: undefined },
  fadeOut: { type: Boolean, default: false },
  fadeOutColor: { type: String, default: undefined },
  scaleOnHover: { type: Boolean, default: false },
  ariaLabel: { type: String, default: 'Partner logos' },
  className: { type: String, default: '' },
})

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 }
const cx = (...parts) => parts.filter(Boolean).join(' ')
const toCssLength = value => typeof value === 'number' ? `${value}px` : (value ?? undefined)

const containerRef = ref(null)
const trackRef = ref(null)
const seqRef = ref(null)

const seqWidth = ref(0)
const seqHeight = ref(0)
const copyCount = ref(ANIMATION_CONFIG.MIN_COPIES)
const isHovered = ref(false)

const isVertical = computed(() => props.direction === 'up' || props.direction === 'down')

const effectiveHoverSpeed = computed(() => {
  if (props.hoverSpeed !== undefined) return props.hoverSpeed
  if (props.pauseOnHover === true) return 0
  if (props.pauseOnHover === false) return undefined
  return 0
})

const targetVelocity = computed(() => {
  const magnitude = Math.abs(props.speed)
  let directionMultiplier = 1
  if (isVertical.value) {
    directionMultiplier = props.direction === 'up' ? 1 : -1
  } else {
    directionMultiplier = props.direction === 'left' ? 1 : -1
  }
  const speedMultiplier = props.speed < 0 ? -1 : 1
  return magnitude * directionMultiplier * speedMultiplier
})

const updateDimensions = () => {
  if (!containerRef.value) return
  const containerWidth = containerRef.value.clientWidth ?? 0
  const sequenceRect = seqRef.value?.[0]?.getBoundingClientRect?.()
  const sequenceWidth = sequenceRect?.width ?? 0
  const sequenceHeight = sequenceRect?.height ?? 0

  if (isVertical.value) {
    const parentHeight = containerRef.value.parentElement?.clientHeight ?? 0
    if (parentHeight > 0) {
      const targetHeight = Math.ceil(parentHeight)
      if (containerRef.value.style.height !== `${targetHeight}px`)
        containerRef.value.style.height = `${targetHeight}px`
    }
    if (sequenceHeight > 0) {
      seqHeight.value = Math.ceil(sequenceHeight)
      const viewport = containerRef.value.clientHeight ?? parentHeight ?? sequenceHeight
      const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM
      copyCount.value = Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded)
    }
  } else if (sequenceWidth > 0) {
    seqWidth.value = Math.ceil(sequenceWidth)
    const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM
    copyCount.value = Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded)
  }
}

let resizeObserver = null
onMounted(() => {
  if (window.ResizeObserver && containerRef.value) {
    resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(containerRef.value)
    if (seqRef.value && seqRef.value[0]) {
      resizeObserver.observe(seqRef.value[0])
    }
  } else {
    window.addEventListener('resize', updateDimensions)
  }
  
  nextTick(() => {
    updateDimensions()
  })
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
  window.removeEventListener('resize', updateDimensions)
  if (rafRef) cancelAnimationFrame(rafRef)
})

let rafRef = null
let lastTimestampRef = null
let offsetRef = 0
let velocityRef = 0

const animate = timestamp => {
  if (lastTimestampRef === null) lastTimestampRef = timestamp
  const deltaTime = Math.max(0, timestamp - lastTimestampRef) / 1000
  lastTimestampRef = timestamp

  const target = isHovered.value && effectiveHoverSpeed.value !== undefined ? effectiveHoverSpeed.value : targetVelocity.value
  const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU)
  velocityRef += (target - velocityRef) * easingFactor

  const seqSize = isVertical.value ? seqHeight.value : seqWidth.value

  if (seqSize > 0 && trackRef.value) {
    let nextOffset = offsetRef + velocityRef * deltaTime
    nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize
    offsetRef = nextOffset

    const transformValue = isVertical.value
      ? `translate3d(0, ${-offsetRef}px, 0)`
      : `translate3d(${-offsetRef}px, 0, 0)`
    trackRef.value.style.transform = transformValue
  }

  rafRef = requestAnimationFrame(animate)
}

watch([seqWidth, seqHeight, targetVelocity, isHovered], () => {
  if (!rafRef) {
    lastTimestampRef = null
    rafRef = requestAnimationFrame(animate)
  }
}, { immediate: true })

const handleMouseEnter = () => { if (effectiveHoverSpeed.value !== undefined) isHovered.value = true }
const handleMouseLeave = () => { if (effectiveHoverSpeed.value !== undefined) isHovered.value = false }

</script>

<template>
  <div
    ref="containerRef"
    :class="cx(
      'relative group',
      isVertical ? 'overflow-hidden h-full inline-block' : 'overflow-x-hidden',
      scaleOnHover && `py-[calc(${logoHeight}px*0.1)]`,
      className
    )"
    :style="{
      width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : (toCssLength(width) ?? '100%'),
      '--logoloop-gap': `${gap}px`,
      '--logoloop-logoHeight': `${logoHeight}px`,
      ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
    }"
    role="region"
    :aria-label="ariaLabel"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="fadeOut">
      <template v-if="isVertical">
        <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-[clamp(24px,8%,120px)] bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]" aria-hidden />
        <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[clamp(24px,8%,120px)] bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]" aria-hidden />
      </template>
      <template v-else>
        <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]" aria-hidden />
        <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]" aria-hidden />
      </template>
    </template>

    <div
      ref="trackRef"
      :class="cx(
        'flex will-change-transform select-none relative z-0 motion-reduce:transform-none',
        isVertical ? 'flex-col h-max w-full' : 'flex-row w-max'
      )"
    >
      <ul
        v-for="(copy, copyIndex) in copyCount"
        :key="`copy-${copyIndex}`"
        :ref="el => { if (copyIndex === 0 && el) seqRef = [el] }"
        :class="cx('flex items-center m-0 p-0 list-none', isVertical && 'flex-col')"
        role="list"
        :aria-hidden="copyIndex > 0"
      >
        <li
          v-for="(item, itemIndex) in logos"
          :key="`${copyIndex}-${itemIndex}`"
          :class="cx(
            'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
            isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
            scaleOnHover && 'overflow-visible group/item'
          )"
          role="listitem"
        >
          <slot name="item" :item="item" :index="itemIndex">
            <span
              :class="cx(
                'inline-flex items-center motion-reduce:transition-none',
                scaleOnHover && 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110'
              )"
            >
              {{ typeof item === 'string' ? item : item.title }}
            </span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.group {
  --logoloop-fadeColorAuto: #ffffff;
}
:root.dark .group, :global(.dark) .group {
  --logoloop-fadeColorAuto: #0b0b0b;
}
</style>
