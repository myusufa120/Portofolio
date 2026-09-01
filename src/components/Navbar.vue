<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['navigate'])

defineProps({
  activeSection: {
    type: String,
    default: 'profile'
  }
})

const isLight = ref(false)
const menuOpen = ref(false)

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
  menuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 animate-hud-down" style="animation-delay: 0.1s;">
    <div class="max-w-7xl mx-auto glass-hud rounded-2xl px-5 py-3 flex flex-row items-center justify-between gap-4 shadow-sm">

      <!-- Left: Brand Logo -->
      <div class="flex items-center gap-3 cursor-pointer flex-shrink-0" @click="scrollTo('profile')">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
        </span>
        <div class="text-cyber-cyan font-hud font-extrabold text-base tracking-widest select-none">
          SOFTWARE
        </div>
      </div>

      <!-- Center: Desktop Nav -->
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

      <!-- Right: Desktop actions + Mobile hamburger -->
      <div class="flex items-center gap-3 flex-shrink-0">

        <!-- Desktop: Theme Toggle -->
        <button
          @click="toggleTheme"
          class="hidden md:flex px-3 py-1.5 text-xs font-hud font-bold border transition-all duration-300 rounded-full cursor-pointer items-center gap-1 bg-white/2"
          :class="isLight
            ? 'text-cyber-cyan border-cyber-cyan/30 hover:bg-cyber-cyan/5'
            : 'text-cyber-text-muted border-cyber-border/40 hover:border-cyber-text-muted hover:text-cyber-text-title'"
        >
          <span>{{ isLight ? '☼ LIGHT' : '☾ DARK' }}</span>
        </button>

        <!-- Desktop: CV Button -->
        <a
          href="#"
          class="hidden md:block px-4 py-1.5 text-xs font-hud font-bold text-cyber-cyan border border-cyber-cyan/35 bg-cyber-cyan/5 hover:bg-cyber-cyan/15 rounded-full tracking-wider transition-all duration-300 whitespace-nowrap"
        >
          DOWNLOAD CV
        </a>

        <!-- Mobile: Hamburger Button -->
        <button
          @click="menuOpen = !menuOpen"
          class="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 cursor-pointer rounded-xl border border-cyber-border/30 bg-white/2 hover:border-cyber-cyan/40 transition-all"
          aria-label="Toggle menu"
        >
          <span
            class="block w-5 h-[2px] bg-cyber-cyan transition-all duration-300 origin-center"
            :class="menuOpen ? 'rotate-45 translate-y-[7px]' : ''"
          ></span>
          <span
            class="block w-5 h-[2px] bg-cyber-cyan transition-all duration-300"
            :class="menuOpen ? 'opacity-0 scale-x-0' : ''"
          ></span>
          <span
            class="block w-5 h-[2px] bg-cyber-cyan transition-all duration-300 origin-center"
            :class="menuOpen ? '-rotate-45 -translate-y-[7px]' : ''"
          ></span>
        </button>

      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="menuOpen"
        class="md:hidden mt-2 max-w-7xl mx-auto glass-hud rounded-2xl overflow-hidden border border-cyber-border shadow-lg"
      >
        <!-- Nav Items -->
        <nav class="flex flex-col p-3 gap-1">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="scrollTo(item.id)"
            class="flex items-center gap-3 px-4 py-3 rounded-xl font-hud font-semibold text-sm transition-all duration-200 cursor-pointer text-left w-full"
            :class="activeSection === item.id
              ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20'
              : 'text-cyber-text-muted hover:text-cyber-text-title hover:bg-white/3'"
          >
            <span class="font-tech text-[10px] text-cyber-cyan/60 w-5">{{ item.num }}.</span>
            <span>{{ item.label }}</span>
            <span v-if="activeSection === item.id" class="ml-auto text-cyber-cyan text-xs">◀</span>
          </button>
        </nav>

        <!-- Divider -->
        <div class="h-px bg-cyber-dark-border mx-3"></div>

        <!-- Mobile: Theme + CV -->
        <div class="flex items-center gap-3 p-3">
          <button
            @click="toggleTheme"
            class="flex-1 py-2.5 text-xs font-hud font-bold border transition-all duration-300 rounded-xl cursor-pointer flex items-center justify-center gap-2 bg-white/2"
            :class="isLight
              ? 'text-cyber-cyan border-cyber-cyan/30'
              : 'text-cyber-text-muted border-cyber-border/40'"
          >
            <span>{{ isLight ? '☼ LIGHT MODE' : '☾ DARK MODE' }}</span>
          </button>
          <a
            href="#"
            class="flex-1 py-2.5 text-xs font-hud font-bold text-cyber-cyan border border-cyber-cyan/35 bg-cyber-cyan/5 hover:bg-cyber-cyan/15 rounded-xl tracking-wider transition-all duration-300 text-center"
          >
            DOWNLOAD CV
          </a>
        </div>
      </div>
    </Transition>

  </header>
</template>

<style scoped>
/* Mobile menu slide transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scaleY(0.95);
  transform-origin: top;
}
</style>
