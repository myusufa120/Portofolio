<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ReactDOM from 'react-dom/client'
import React from 'react'
import LanyardReact from './react/Lanyard.jsx'

const props = defineProps({
  position:     { type: Array,  default: () => [0, 0, 30] },
  gravity:      { type: Array,  default: () => [0, -40, 0] },
  fov:          { type: Number, default: 20 },
  frontImage:   { type: String, default: null },
  backImage:    { type: String, default: null },
  imageFit:     { type: String, default: 'cover' },
  lanyardImage: { type: String, default: null },
  lanyardWidth: { type: Number, default: 1 },
})

const mountEl = ref(null)
let reactRoot = null

onMounted(() => {
  if (!mountEl.value) return
  reactRoot = ReactDOM.createRoot(mountEl.value)
  reactRoot.render(
    React.createElement(LanyardReact, {
      position:     props.position,
      gravity:      props.gravity,
      fov:          props.fov,
      frontImage:   props.frontImage,
      backImage:    props.backImage,
      imageFit:     props.imageFit,
      lanyardImage: props.lanyardImage,
      lanyardWidth: props.lanyardWidth,
    })
  )
})

onUnmounted(() => {
  if (reactRoot) {
    reactRoot.unmount()
    reactRoot = null
  }
})
</script>

<template>
  <div ref="mountEl" style="width: 100%; height: 100%;" />
</template>
