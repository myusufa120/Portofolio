<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['navigate'])

defineProps({
  activeSection: {
    type: String,
    default: 'profile'
  }
})

const isLight = ref(false)

const toggleTheme = () => {
  isLight.value = !isLight.value
  if (isLight.value) {
    document.documentElement.classList.add('light')
    localStorage.setItem('user-theme', 'light')
  } else {
    document.documentElement.classList.remove('light')
    localStorage.setItem('user-theme', 'dark')
  }
}

onMounted(() => {
  // Check local storage preference
  const savedTheme = localStorage.getItem('user-theme')
  if (savedTheme === 'light') {
    isLight.value = true
    document.documentElement.classList.add('light')
  } else {
    isLight.value = false
    document.documentElement.classList.remove('light')
  }
})

const navItems = [
  { id: 'profile', label: 'PROFILE', num: '01' },
  { id: 'projects', label: 'PROJECTS & EXP', num: '02' },
  { id: 'archives', label: 'ARCHIVES', num: '03' },
  { id: 'tech-matrix', label: 'TECH MATRIX', num: '04' }
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    emit('navigate', id)
  }
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-5">
    <div class="max-w-7xl mx-auto glass-hud rounded-2xl px-5 py-3 flex flex-row items-center justify-between gap-4 shadow-sm">
      
      <!-- Left side: Brand Logo with Online Status Dot -->
      <div class="flex items-center gap-3 cursor-pointer" @click="scrollTo('profile')">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
        </span>
        <div class="text-cyber-cyan font-hud font-extrabold text-base tracking-widest select-none">
          YUS.DEV
        </div>
      </div>

      <!-- Center: Floating Capsule Navigation Dock -->
      <nav class="hidden md:flex items-center gap-1 bg-white/2 border border-cyber-border/20 px-2 py-1 rounded-full font-hud font-semibold text-xs">
        <button 
          v-for="item in navItems" 
          :key="item.id"
          @click="scrollTo(item.id)"
          class="group flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs"
          :class="activeSection === item.id 
            ? 'text-cyber-cyan bg-cyber-cyan/10 font-bold' 
            : 'text-cyber-text-muted hover:text-cyber-text-title hover:bg-white/3'"
        >
          <span class="text-[9px] font-tech" :class="activeSection === item.id ? 'text-cyber-cyan/70' : 'text-cyber-text-muted/60'">
            {{ item.num }}.
          </span>
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <!-- Right side: Theme & CV actions -->
      <div class="flex items-center gap-3">
        <!-- Mobile menu indicator or mini nav (fallback for small screens) -->
        <nav class="flex md:hidden gap-3 font-hud font-semibold text-[10px]">
          <button 
            v-for="item in navItems" 
            :key="item.id"
            @click="scrollTo(item.id)"
            class="transition-colors cursor-pointer"
            :class="activeSection === item.id ? 'text-cyber-cyan' : 'text-cyber-text-muted'"
          >
            {{ item.label.split(' ')[0] }}
          </button>
        </nav>

        <!-- Theme Mode Toggle Pill -->
        <button 
          @click="toggleTheme"
          class="px-3 py-1.5 text-xs font-hud font-bold border transition-all duration-300 rounded-full cursor-pointer flex items-center gap-1 bg-white/2"
          :class="isLight 
            ? 'text-cyber-cyan border-cyber-cyan/30 hover:bg-cyber-cyan/5' 
            : 'text-cyber-text-muted border-cyber-border/40 hover:border-cyber-text-muted hover:text-cyber-text-title'"
        >
          <span>{{ isLight ? '☼ LIGHT' : '☾ DARK' }}</span>
        </button>

        <!-- CV Action Pill -->
        <a 
          href="#" 
          class="px-4 py-1.5 text-xs font-hud font-bold text-cyber-cyan border border-cyber-cyan/35 bg-cyber-cyan/5 hover:bg-cyber-cyan/15 rounded-full tracking-wider transition-all duration-300 whitespace-nowrap"
        >
          DOWNLOAD CV
        </a>
      </div>

    </div>
  </header>
</template>
