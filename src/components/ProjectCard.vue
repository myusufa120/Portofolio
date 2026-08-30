<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

// Returns specific color classes based on project status
const statusClasses = computed(() => {
  switch (props.project.status.toUpperCase()) {
    case 'PRODUCTION':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    case 'DEPLOYED':
      return 'text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/30'
    case 'RESEARCH':
      return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
  }
})
</script>

<template>
  <div class="relative flex flex-col h-full rounded-2xl border border-cyber-border/30 bg-cyber-card/80 backdrop-blur-sm shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(56,189,248,0.18)] hover:border-cyber-cyan/40 hologram-card cursor-default group p-6">
    
    <!-- Card Header -->
    <div class="flex items-center justify-between border-b border-cyber-dark-border pb-3 mb-4 font-tech text-sm">
      <span class="text-cyber-cyan tracking-widest font-bold">{{ project.systemId }}</span>
      <span class="px-3 py-1 border text-xs tracking-wider rounded-full font-bold" :class="statusClasses">
        ● {{ project.status }}
      </span>
    </div>

    <!-- Main Content Grid -->
    <div class="space-y-4 flex-grow flex flex-col justify-between">
      <div>
        <h3 class="text-xl font-hud font-bold text-cyber-text-title group-hover:text-cyber-cyan transition-colors duration-300">
          {{ project.title }}
        </h3>
        
        <p class="text-cyber-text-main text-sm mt-2.5 leading-relaxed font-sans">
          {{ project.description }}
        </p>
      </div>

      <!-- Interactive Schema / Mockup Container -->
      <div class="my-4 h-44 bg-cyber-card/40 border border-cyber-dark-border rounded-xl flex items-center justify-center p-3 relative overflow-hidden bg-dot-matrix">
        
        <!-- Case 1: Mobile Phone Mockup -->
        <div v-if="project.type === 'mobile'" class="relative w-22 h-36 border border-cyber-dark-border bg-cyber-bg rounded-xl p-1.5 shadow-md shadow-black/10 flex flex-col justify-between">
          <!-- Notch -->
          <div class="w-8 h-1 bg-cyber-dark-border rounded-full mx-auto mb-1"></div>
          <!-- Screen Mock Content -->
          <div class="flex-grow rounded-lg bg-cyber-bg/80 border border-cyber-dark-border p-1.5 flex flex-col justify-between overflow-hidden">
            <div class="h-2.5 w-full bg-cyber-cyan/15 rounded mb-1 animate-pulse"></div>
            <div class="space-y-1">
              <div class="h-2 w-3/4 bg-cyber-text-muted/20 rounded"></div>
              <div class="h-2 w-1/2 bg-cyber-text-muted/20 rounded"></div>
            </div>
            <!-- Mock Floating Button -->
            <div class="h-3 w-3 bg-cyber-cyan rounded-full self-end shadow-sm"></div>
          </div>
          <!-- Home Bar -->
          <div class="w-7 h-0.5 bg-cyber-dark-border mx-auto mt-1"></div>
        </div>

        <!-- Case 2: IoT Sensor Flow Scheme -->
        <div v-else-if="project.type === 'iot'" class="w-full max-w-xs flex items-center justify-between text-xs font-tech text-cyber-text-muted">
          <!-- Sensor Node -->
          <div class="flex flex-col items-center gap-1.5 z-10">
            <div class="w-10 h-10 border border-amber-500/20 bg-amber-500/5 flex items-center justify-center rounded-lg text-amber-500 font-bold text-xs">
              ESP32
            </div>
            <span class="text-[10px]">NODE_01</span>
          </div>

          <!-- Pulsing connector line -->
          <div class="flex-grow h-[1px] mx-2 bg-cyber-border/20 relative">
            <div class="absolute top-[-2px] left-0 w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-cyber-cyan/40 animate-pulse"></div>
          </div>

          <!-- Firebase Cloud -->
          <div class="flex flex-col items-center gap-1.5 z-10">
            <div class="w-10 h-10 border border-cyber-cyan/20 bg-cyber-cyan/5 flex items-center justify-center rounded-lg text-cyber-cyan font-bold text-xs">
              CLOUD
            </div>
            <span class="text-[10px]">FIREBASE</span>
          </div>

          <!-- Pulsing connector line -->
          <div class="flex-grow h-[1px] mx-2 bg-cyber-border/20 relative">
            <div class="absolute top-[-2px] right-0 w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-cyber-cyan/40 to-cyber-green/40 animate-pulse"></div>
          </div>

          <!-- Dashboard -->
          <div class="flex flex-col items-center gap-1.5 z-10">
            <div class="w-10 h-10 border border-cyber-green/20 bg-cyber-green/5 flex items-center justify-center rounded-lg text-cyber-green font-bold text-xs">
              DASH
            </div>
            <span class="text-[10px]">VUE_APP</span>
          </div>
        </div>

        <!-- Case 3: Web Dashboard Mockup -->
        <div v-else class="w-full max-w-[220px] border border-cyber-dark-border bg-cyber-bg rounded-lg flex flex-col overflow-hidden h-32 shadow-md">
          <!-- Top bar -->
          <div class="h-4 bg-cyber-card border-b border-cyber-dark-border px-2 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500/60"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-yellow-500/60"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-green-500/60"></span>
          </div>
          <!-- Body dashboard -->
          <div class="flex-grow p-2 grid grid-cols-12 gap-1.5 bg-cyber-bg/40">
            <!-- Sidebar -->
            <div class="col-span-3 bg-cyber-card rounded p-1 space-y-1">
              <div class="h-1.5 bg-cyber-cyan/30 rounded w-full"></div>
              <div class="h-1.5 bg-cyber-text-muted/10 rounded w-3/4"></div>
              <div class="h-1.5 bg-cyber-text-muted/10 rounded w-1/2"></div>
            </div>
            <!-- Main metrics -->
            <div class="col-span-9 space-y-1.5">
              <div class="grid grid-cols-3 gap-1">
                <div class="h-3 bg-cyber-card border border-cyber-cyan/15 rounded"></div>
                <div class="h-3 bg-cyber-card border border-amber-500/15 rounded"></div>
                <div class="h-3 bg-cyber-card border border-cyber-green/15 rounded"></div>
              </div>
              <div class="h-10 bg-cyber-card border border-cyber-dark-border rounded relative">
                <!-- Mini Bar chart -->
                <div class="absolute bottom-1 left-2 right-2 top-3 flex items-end justify-between">
                  <div class="w-1.5 bg-cyber-cyan/60 rounded-t" style="height: 40%"></div>
                  <div class="w-1.5 bg-cyber-cyan/60 rounded-t" style="height: 80%"></div>
                  <div class="w-1.5 bg-cyber-cyan/60 rounded-t" style="height: 60%"></div>
                  <div class="w-1.5 bg-cyber-cyan/60 rounded-t" style="height: 90%"></div>
                  <div class="w-1.5 bg-cyber-cyan/60 rounded-t" style="height: 50%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Tech tags & Links -->
      <div class="space-y-4">
        <!-- Tech Tags -->
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in project.tags" 
            :key="tag" 
            class="px-2.5 py-1 bg-white/3 border border-cyber-dark-border text-cyber-text-main text-xs font-tech tracking-wider rounded-md"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Action Links -->
        <div class="flex items-center gap-4 pt-3 border-t border-cyber-dark-border font-tech text-sm">
          <a 
            v-if="project.liveLink" 
            :href="project.liveLink" 
            target="_blank" 
            class="text-cyber-cyan hover:underline flex items-center gap-1 font-semibold transition-all"
          >
            LAUNCH_LIVE ↗
          </a>
          <a 
            v-if="project.gitLink" 
            :href="project.gitLink" 
            target="_blank" 
            class="text-cyber-text-muted hover:text-cyber-cyan flex items-center gap-1 font-semibold transition-all"
          >
            GIT_SOURCE ↗
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
