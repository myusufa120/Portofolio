<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroProfile from './components/HeroProfile.vue'
import AboutMe from './components/AboutMe.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ArchivesGallery from './components/ArchivesGallery.vue'
import TechMatrix from './components/TechMatrix.vue'

const activeSection = ref('profile')
const scrollProgress = ref(0)

const updateActiveSection = (id) => {
  activeSection.value = id
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Scroll Progress Tracker
const handleScroll = () => {
  const totalScroll = document.documentElement.scrollTop || document.body.scrollTop
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (windowHeight > 0) {
    scrollProgress.value = (totalScroll / windowHeight) * 100
  }
}

// Scroll Spy for Navbar
let spyObserver = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  const sections = ['profile', 'about', 'projects', 'archives', 'tech-matrix']
  spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  })

  sections.forEach((id) => {
    const el = document.getElementById(id)
    if (el) spyObserver.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (spyObserver) spyObserver.disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-cyber-bg text-cyber-text-main relative overflow-hidden select-none font-sans">
    
    <!-- Top Futuristic Telemetry Progress Bar -->
    <div 
      class="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-cyber-cyan via-cyber-gold to-cyber-green z-50 transition-all duration-100 ease-out pointer-events-none shadow-[0_0_8px_rgba(56,189,248,0.5)]"
      :style="{ width: `${scrollProgress}%` }"
    ></div>

    <!-- CRT Scanline overlay effect (disabled in css) -->
    <div class="scanline-overlay"></div>

    <!-- Holographic grid backgrounds - Faint and elegant -->
    <div class="absolute inset-0 bg-cyber-grid pointer-events-none opacity-20 z-0"></div>

    <!-- Fixed side info overlays (Sleek minimalist indicators) -->
    <div class="fixed left-4 bottom-20 z-40 hidden xl:flex flex-col items-center gap-4 text-[10px] font-tech text-cyber-text-muted/60 tracking-widest writing-vertical uppercase">
      <span>DEV_STACK: FULL-STACK / IOT</span>
      <div class="h-12 w-[1px] bg-cyber-border/20"></div>
      <span class="text-cyber-cyan/80 font-bold">STATUS: ACTIVE</span>
    </div>

    <div class="fixed right-4 bottom-20 z-40 hidden xl:flex flex-col items-center gap-4 text-[10px] font-tech text-cyber-text-muted/60 tracking-widest writing-vertical uppercase">
      <span>LOCATION: SEMARANG, ID</span>
      <div class="h-12 w-[1px] bg-cyber-border/20"></div>
      <span>SYS_BUILD: 2026.09</span>
    </div>

    <!-- Header / Navbar HUD -->
    <Navbar :activeSection="activeSection" @navigate="updateActiveSection" />

    <!-- Main Content Panels -->
    <main class="relative z-10">
      <HeroProfile />
      <AboutMe />
      <ProjectsSection />
      <ArchivesGallery />
      <TechMatrix />
    </main>

    <!-- Footer: Developer Terminal Panel -->
    <footer class="relative z-10 border-t border-cyber-border/30 bg-cyber-bg/95 dark:bg-cyber-card/90 backdrop-blur-md pt-12 pb-8 px-6 md:px-12 xl:px-20 transition-colors duration-300">
      <!-- Ambient Top Glow Line -->
      <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent pointer-events-none"></div>

      <div class="max-w-7xl mx-auto">
        <!-- Top Tier: Brand Identity & Interactive Action Hub -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          <!-- Left: Developer Identity -->
          <div class="space-y-1 text-left">
            <h3 class="text-base md:text-lg font-bold text-cyber-text-title font-hud tracking-wide">
              M. Yusuf Abdurrahman
            </h3>
            <p class="text-cyber-text-muted text-xs md:text-sm font-sans max-w-lg leading-relaxed">
              IT Infrastructure Enthusiast & Network Operations Specialist.
            </p>
          </div>

          <!-- Right: Social Links & Scroll to Top -->
          <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a 
              href="https://github.com/myusufa120" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-cyber-border/40 bg-cyber-card/70 hover:bg-cyber-cyan/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan text-cyber-text-main text-xs font-tech transition-all whitespace-nowrap shadow-sm group"
            >
              <svg class="w-3.5 h-3.5 text-cyber-text-muted group-hover:text-cyber-cyan transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </a>

            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-cyber-border/40 bg-cyber-card/70 hover:bg-cyber-cyan/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan text-cyber-text-main text-xs font-tech transition-all whitespace-nowrap shadow-sm group"
            >
              <svg class="w-3.5 h-3.5 text-cyber-text-muted group-hover:text-cyber-cyan transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            <a 
              href="mailto:myusufa120@gmail.com" 
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-cyber-border/40 bg-cyber-card/70 hover:bg-cyber-cyan/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan text-cyber-text-main text-xs font-tech transition-all whitespace-nowrap shadow-sm group"
            >
              <svg class="w-3.5 h-3.5 text-cyber-text-muted group-hover:text-cyber-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Email</span>
            </a>

            <button 
              @click="scrollToTop" 
              title="Scroll back to top"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyber-border/40 bg-cyber-card/70 hover:bg-cyber-cyan/15 hover:border-cyber-cyan/60 hover:text-cyber-cyan text-cyber-text-muted text-xs font-tech transition-all cursor-pointer group shadow-sm active:scale-95 whitespace-nowrap"
            >
              <svg class="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
              <span>TOP</span>
            </button>
          </div>

        </div>

        <!-- Bottom Tier: Copyright -->
        <div class="border-t border-cyber-border/20 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-cyber-text-muted/50 tracking-wider">
          <span>© 2026 M. Yusuf Abdurrahman.</span>
          <span>SEMARANG, ID</span>
        </div>

      </div>
    </footer>

  </div>
</template>

<style>
/* Custom writing mode for vertical HUD side text */
.writing-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
