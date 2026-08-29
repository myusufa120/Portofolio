<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroProfile from './components/HeroProfile.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ArchivesGallery from './components/ArchivesGallery.vue'
import TechMatrix from './components/TechMatrix.vue'

const activeSection = ref('profile')

const updateActiveSection = (id) => {
  activeSection.value = id
}

// Intersection Observer (Scroll Spy)
let observer = null

onMounted(() => {
  const sections = ['profile', 'projects', 'archives', 'tech-matrix']
  
  const options = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Triggers when section occupies middle of viewport
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  sections.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="min-h-screen bg-cyber-bg text-cyber-text-main relative overflow-hidden select-none font-sans">
    
    <!-- CRT Scanline overlay effect (disabled in css) -->
    <div class="scanline-overlay"></div>

    <!-- Holographic grid backgrounds - Faint and elegant -->
    <div class="absolute inset-0 bg-cyber-grid pointer-events-none opacity-20 z-0"></div>

    <!-- Fixed side info overlays (Sleek minimalist indicators) -->
    <div class="fixed left-4 bottom-20 z-40 hidden xl:flex flex-col items-center gap-4 text-[10px] font-tech text-cyber-text-muted/60 tracking-widest writing-vertical uppercase">
      <span>SECURE_LINK: ENCRYPTED</span>
      <div class="h-12 w-[1px] bg-cyber-border/20"></div>
      <span class="text-cyber-cyan/80 font-bold">CORE_ONLINE</span>
    </div>

    <div class="fixed right-4 bottom-20 z-40 hidden xl:flex flex-col items-center gap-4 text-[10px] font-tech text-cyber-text-muted/60 tracking-widest writing-vertical uppercase">
      <span>LOC: SUB_PORT_E</span>
      <div class="h-12 w-[1px] bg-cyber-border/20"></div>
      <span>SYS_CALIBRATION: 100%</span>
    </div>

    <!-- Header / Navbar HUD -->
    <Navbar :activeSection="activeSection" @navigate="updateActiveSection" />

    <!-- Main Content Panels -->
    <main class="relative z-10">
      <HeroProfile />
      <ProjectsSection />
      <ArchivesGallery />
      <TechMatrix />
    </main>

    <!-- Footer: Sci-Fi Command Line Terminal Panel -->
    <footer class="relative z-10 border-t border-cyber-border/30 bg-cyber-bg/95 dark:bg-cyber-card/90 backdrop-blur-md py-10 px-4 md:px-8 transition-colors duration-300">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-tech">
        
        <!-- Left: System watermark -->
        <div class="space-y-1 text-center md:text-left">
          <div class="text-cyber-cyan font-bold text-base tracking-wide">// SYSTEM TERMINATED CORRECTLY</div>
          <div class="text-cyber-text-muted text-xs md:text-sm">© 2026 M. Yusuf. All rights reserved. Deployed with Vercel.</div>
        </div>

        <!-- Middle: Status node grid with HUD Pills -->
        <div class="flex flex-wrap justify-center items-center gap-3 text-xs font-semibold">
          <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan shadow-sm">
            <span class="h-2 w-2 rounded-full bg-cyber-cyan animate-pulse"></span>
            <span>DATABASE: CONFIGURED</span>
          </div>
          <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/30 text-cyber-green shadow-sm">
            <span class="h-2 w-2 rounded-full bg-cyber-green animate-pulse"></span>
            <span>SECURITY_FIREWALL: PASS</span>
          </div>
        </div>

        <!-- Right: Social Links -->
        <div class="flex items-center gap-4 text-sm font-bold">
          <a href="https://github.com" target="_blank" class="text-cyber-text-main hover:text-cyber-cyan transition-colors">[ GITHUB ]</a>
          <a href="https://linkedin.com" target="_blank" class="text-cyber-text-main hover:text-cyber-cyan transition-colors">[ LINKEDIN ]</a>
          <a href="mailto:myusufa120@gmail.com" class="text-cyber-text-main hover:text-cyber-cyan transition-colors">[ EMAIL ]</a>
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
