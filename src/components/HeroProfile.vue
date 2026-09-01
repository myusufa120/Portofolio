<script setup>
import { ref, onMounted } from 'vue'
import profilePhoto from '../assets/profile.jpeg'

const totalDeploys = ref('5+')
const activeNodes = ref(0)
const uptime = ref(99.90)

// Copy-to-clipboard state
const copiedType = ref('')
const copyText = (text, type) => {
  navigator.clipboard.writeText(text)
  copiedType.value = type
  setTimeout(() => {
    copiedType.value = ''
  }, 2000)
}

onMounted(() => {
  const targetNodes = 12
  
  const intervalNodes = setInterval(() => {
    if (activeNodes.value < targetNodes) {
      activeNodes.value++
    } else {
      clearInterval(intervalNodes)
    }
  }, 80)

  const intervalUptime = setInterval(() => {
    if (uptime.value < 99.98) {
      uptime.value = parseFloat((uptime.value + 0.01).toFixed(2))
    } else {
      clearInterval(intervalUptime)
    }
  }, 100)
})
</script>

<template>
  <section id="profile" class="relative w-full min-h-screen bg-cyber-bg text-cyber-text-main flex flex-col justify-start pt-36 lg:pt-44 pb-24 overflow-hidden transition-colors duration-300">
    
    <!-- BACKGROUND ANIMATIONS & TEXTURES (Full screen span) -->
    <!-- Drifting Grid Overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0"></div>
    
    <!-- Ambient Slow Drifting Glows -->
    <div class="absolute -top-12 -left-12 w-[600px] h-[600px] bg-cyber-cyan-glow rounded-full blur-[130px] pointer-events-none animate-float-slow z-0"></div>
    <div class="absolute -bottom-24 -right-12 w-[600px] h-[600px] bg-cyber-cyan-glow/50 rounded-full blur-[130px] pointer-events-none animate-float-fast z-0"></div>

    <!-- CONTENT WRAPPER: Centered content with maximum width -->
    <div class="w-full max-w-[1360px] mx-auto px-4 md:px-8 relative z-10 space-y-10">

      <!-- Header: Operator Title -->
      <div class="space-y-3 animate-hud-up" style="opacity:0; animation-delay: 0.05s; animation-fill-mode: forwards;">
        <div class="flex items-center gap-3 text-sm font-tech text-cyber-cyan tracking-widest uppercase">
          <span>// MISSION OPERATOR IDENTIFICATION</span>
          <span class="h-[1px] w-20 bg-cyber-cyan/35"></span>
          <span class="flex items-center gap-2 text-xs font-tech text-cyber-green uppercase">
            <span class="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
            CALIBRATED
          </span>
        </div>
        <h2 class="text-4xl md:text-6xl font-hud font-extrabold text-cyber-text-title tracking-tight uppercase leading-none">
          M. Yusuf Abdurrahman
        </h2>
      </div>

      <!-- 3-Panel Layered HUD Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- ==================== LEFT PANEL: ATRIBUT & STATS ==================== -->
        <div class="lg:col-span-4 flex flex-col justify-start gap-4 animate-hud-up" style="opacity:0; animation-delay: 0.2s; animation-fill-mode: forwards;">
          
          <!-- Role / Class Badge Card -->
          <div class="relative p-5 border border-cyber-border/25 bg-cyber-card rounded-sm overflow-hidden hologram-card">
            <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan"></div>
            <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan"></div>
            <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-cyan"></div>
            <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-cyan"></div>
            
            <div class="text-xs font-tech text-cyber-cyan tracking-widest">// CLASSIFICATION</div>
            <div class="text-xl md:text-2xl font-hud font-extrabold text-cyber-text-title tracking-wider mt-1.5">SOFTWARE ENGINEER

            </div>
            
            <div class="flex flex-wrap gap-2 mt-4">
              <span class="px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-tech font-bold rounded-md">
                FULL-STACK
              </span>
              <span class="px-3 py-1 bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold text-xs font-tech font-bold rounded-md">
                MOBILE ENGINEER
              </span>
              <span class="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-xs font-tech font-bold rounded-md">
                IOT ARCHITECT
              </span>
            </div>
          </div>

          <!-- Value Proposition / Statement Card -->
          <div class="relative p-5 border border-cyber-dark-border bg-cyber-card/40 rounded-sm hologram-card">
            <span class="absolute top-3 right-4 text-xs font-tech text-cyber-text-muted">[ MISSION_OBJECTIVE ]</span>
            <p class="text-base md:text-lg font-sans text-cyber-text-main leading-relaxed italic pr-8 pt-2">
              "Bridging real-world hardware telemetry with sleek, production-ready mobile apps and cloud systems."
            </p>
          </div>

          <!-- Core Pillars -->
          <div class="space-y-3.5">
            <div class="text-xs font-tech text-cyber-text-muted tracking-widest uppercase">// CORE COGNITIVE PILLARS</div>
            
            <!-- Mobile Pillar -->
            <div class="p-3.5 rounded-sm border border-cyber-border/35 bg-cyber-card hover:border-cyber-cyan/35 transition-colors">
              <div class="flex items-center gap-2 text-cyber-cyan font-tech text-sm font-bold">
                <span>+ MOBILE DEVELOPMENT</span>
                <span class="text-xs text-cyber-text-muted font-normal ml-auto">[ 01 ]</span>
              </div>
              <div class="flex flex-wrap gap-2 mt-2.5">
                <span class="text-xs font-tech text-cyber-text-muted px-2.5 py-1 bg-cyber-dark-border rounded">Flutter</span>
                <span class="text-xs font-tech text-cyber-text-muted px-2.5 py-1 bg-cyber-dark-border rounded">Geolocation & Maps</span>
                <span class="text-xs font-tech text-cyber-text-muted px-2.5 py-1 bg-cyber-dark-border rounded">Clean Architecture</span>
              </div>
            </div>

            <!-- IoT Pillar -->
            <div class="p-3.5 rounded-sm border border-cyber-border/35 bg-cyber-card hover:border-cyber-gold/35 transition-colors">
              <div class="flex items-center gap-2 text-cyber-gold font-tech text-sm font-bold">
                <span>+ IOT MANAGEMENT & MONITORING</span>
                <span class="text-xs text-cyber-text-muted font-normal ml-auto">[ 02 ]</span>
              </div>
              <div class="flex flex-wrap gap-2 mt-2.5">
                <span class="text-xs font-tech text-cyber-text-muted px-2.5 py-1 bg-cyber-dark-border rounded">ESP32 Firmware</span>
                <span class="text-xs font-tech text-cyber-text-muted px-2.5 py-1 bg-cyber-dark-border rounded">Thinger.io</span>
                <span class="text-xs font-tech text-cyber-text-muted px-2.5 py-1 bg-cyber-dark-border rounded">OTA Protocol</span>
              </div>
            </div>

            <!-- Infrastructure Pillar -->
            <div class="p-3.5 rounded-sm border border-cyber-border/35 bg-cyber-card hover:border-cyber-green/35 transition-colors">
              <div class="flex items-center gap-2 text-cyber-green font-tech text-sm font-bold">
                <span>+ INFRASTRUCTURE</span>
                <span class="text-xs text-cyber-text-muted font-normal ml-auto">[ 03 ]</span>
              </div>
              <div class="flex flex-wrap gap-2 mt-2.5">
                <span class="text-xs font-tech text-cyber-text-muted px-2.5 py-1 bg-cyber-dark-border rounded">CCNA Certified</span>
                <span class="text-xs font-tech text-cyber-text-muted px-2.5 py-1 bg-cyber-dark-border rounded">Firebase DB</span>
                <span class="text-xs font-tech text-cyber-text-muted px-2.5 py-1 bg-cyber-dark-border rounded">Cloud Systems</span>
              </div>
            </div>
          </div>

          <!-- Live Operational Stats Row -->
          <div class="grid grid-cols-3 gap-3">
            <div class="p-3 bg-cyber-card border border-cyber-dark-border rounded-sm text-center">
              <div class="text-[11px] font-tech text-cyber-text-muted uppercase">PROJECTS</div>
              <div class="text-xl md:text-2xl font-tech font-extrabold text-cyber-cyan mt-1">{{ totalDeploys }}</div>
            </div>
            <div class="p-3 bg-cyber-card border border-cyber-dark-border rounded-sm text-center">
              <div class="text-[11px] font-tech text-cyber-text-muted uppercase">ACTIVE NODES</div>
              <div class="text-xl md:text-2xl font-tech font-extrabold text-cyber-gold mt-1">{{ activeNodes }}</div>
            </div>
            <div class="p-3 bg-cyber-card border border-cyber-dark-border rounded-sm text-center">
              <div class="text-[11px] font-tech text-cyber-text-muted uppercase">UPTIME</div>
              <div class="text-xl md:text-2xl font-tech font-extrabold text-cyber-green mt-1">{{ uptime }}%</div>
            </div>
          </div>

        </div>

        <!-- ==================== MIDDLE PANEL: VISUAL UTAMA ==================== -->
        <div class="lg:col-span-4 flex flex-col items-center justify-center space-y-6 bg-cyber-card/30 border border-cyber-dark-border rounded-sm p-6 relative animate-hud-zoom" style="opacity:0; animation-delay: 0.35s; animation-fill-mode: forwards;">
          <div class="absolute top-3 left-4 text-xs font-tech text-cyber-text-muted">SYSTEM_VISUAL_FEED</div>
          
          <!-- Octagonal/Chamfered Photo Frame with Neon Glow -->
          <div class="relative group mt-4">
            <!-- Holographic Outer Glow -->
            <div class="absolute inset-[-4px] bg-gradient-to-tr from-cyber-cyan/40 to-cyber-cyan-glow blur-md clip-hud transition-all duration-500 group-hover:from-cyber-cyan/60"></div>
            
            <!-- Octagonal Container -->
            <div class="relative w-64 h-80 clip-hud border border-cyber-cyan/40 bg-cyber-bg overflow-hidden shadow-2xl">
              <!-- Grid Background Overlay -->
              <div class="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none z-10"></div>
              
              <!-- Holographic Aura Gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-cyber-cyan/20 via-transparent to-transparent pointer-events-none z-10"></div>

              <img 
                :src="profilePhoto" 
                alt="M. Yusuf Abdurrahman" 
                class="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 relative z-0" 
              />

              <!-- Corner HUD details inside the frame -->
              <div class="absolute top-2.5 left-2.5 text-[10px] font-tech text-cyber-cyan/80 z-20">SYS_OPERATOR // M. YUSUF. A</div>
              <div class="absolute bottom-2.5 right-2.5 text-[10px] font-tech text-cyber-cyan/80 z-20">LOC: [7.2575° S, 112.7521° E]</div>
              
              <!-- Floating tag -->
              <div class="absolute bottom-2.5 left-2.5 z-20 font-tech text-xs text-cyber-cyan bg-cyber-bg/90 backdrop-blur-sm px-2 py-0.5 border border-cyber-cyan/30 rounded">
                ● IT
              </div>
            </div>
          </div>

          <!-- Identity tag details below image -->
          <div class="text-center space-y-2 w-full pt-1">
            <div class="text-base md:text-lg font-tech text-cyber-cyan font-bold tracking-widest uppercase">
              M. YUSUF ABDURRAHMAN
            </div>
            <div class="text-xs md:text-sm font-tech text-cyber-text-muted tracking-wide">
              CLASS: SOFTWARE ENGINEER / IOT ARCHITECT
            </div>

            <!-- Switcher Details Visual Decorator -->
            <div class="flex items-center justify-center gap-2 pt-2">
              <span class="w-1.5 h-1.5 rounded-full bg-cyber-cyan"></span>
              <span class="h-[1px] w-8 bg-cyber-cyan/35"></span>
              <span class="text-xs font-tech text-cyber-text-title uppercase tracking-widest">TRANSMISSION ACTIVE</span>
              <span class="h-[1px] w-8 bg-cyber-cyan/35"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-cyber-cyan"></span>
            </div>
          </div>

        </div>

        <!-- ==================== RIGHT PANEL: SPECS ==================== -->
        <div class="lg:col-span-4 flex flex-col justify-start gap-4 animate-hud-up" style="opacity:0; animation-delay: 0.5s; animation-fill-mode: forwards;">
          
          <!-- Education Dossier Card -->
          <div class="relative p-5 border border-cyber-border/25 bg-cyber-card rounded-sm hologram-card">
            <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan"></div>
            <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan"></div>
            <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-cyan"></div>
            <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-cyan"></div>
            
            <span class="absolute top-3 right-4 text-xs font-tech text-cyber-text-muted">[ MISSION_RECORD ]</span>
            <span class="text-xs font-tech text-cyber-cyan tracking-widest uppercase block">// ARCHIVE: EDUCATION</span>

            <div class="mt-4 space-y-4 font-sans">
              <div>
                <h4 class="text-sm md:text-base font-hud font-bold text-cyber-text-title uppercase">S1 Teknik Informatika</h4>
                <p class="text-xs font-tech text-cyber-text-muted mt-1">Universitas Semarang (Graduated 2026)</p>
              </div>

              <div class="flex items-center justify-between border-t border-cyber-dark-border pt-3 text-sm">
                <div>
                  <span class="block text-[10px] font-tech text-cyber-text-muted uppercase tracking-widest font-semibold">GPA RATIO</span>
                  <span class="font-bold text-cyber-gold text-base md:text-lg block mt-0.5 font-tech">3.93 / 4.00</span>
                </div>
                <div class="text-right">
                  <span class="block text-[10px] font-tech text-cyber-text-muted uppercase tracking-widest font-semibold">EVALUATION</span>
                  <span class="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-xs font-tech font-bold rounded-md block mt-0.5">
                    EXCELLENT
                  </span>
                </div>
              </div>

              <!-- Thesis Badge Component -->
              <div class="border-t border-cyber-dark-border pt-3 space-y-2">
                <span class="block text-[10px] font-tech text-cyber-text-muted uppercase tracking-widest font-semibold">// THESIS PROJECT</span>
                <div class="p-3 bg-cyber-card/40 border border-cyber-dark-border rounded-sm text-xs md:text-sm text-cyber-text-main leading-relaxed italic">
                  <span class="text-cyber-cyan font-bold block not-italic text-xs mb-1 font-tech">RESEARCH // CLOUD-IOT INTEGRATION:</span>
                  "Rancang Bangun Sistem Manajemen Perangkat IOT Berbasis Cloud dengan Fitur Self-Diagnostic dan Over-The-Air Update."
                </div>
              </div>
            </div>
          </div>

          <!-- Comms Hub (Transceiver module) -->
          <div class="relative p-5 border border-cyber-border/25 bg-cyber-card rounded-sm hologram-card" style="top:50px">
            <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan"></div>
            <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan"></div>
            <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-cyan"></div>
            <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-cyan"></div>
            
            <span class="absolute top-3 right-4 text-xs font-tech text-cyber-text-muted">[ TRANSCEIVER_01 ]</span>
            <span class="text-xs font-tech text-cyber-cyan tracking-widest uppercase block">// COMMS TRANSCEIVER</span>

            <!-- Available Indicator -->
            <div class="mt-3.5 flex items-center gap-2 px-3 py-2 bg-cyber-green/5 border border-cyber-green/25 text-cyber-green text-xs font-tech rounded-sm">
              <span class="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
              STATUS: AVAILABLE FOR ROLES / CONTRACTS
            </div>

            <!-- Contact Nodes List -->
            <div class="mt-4 space-y-3">
              
              <!-- Geolocation Node -->
              <div class="flex items-center justify-between p-2.5 bg-cyber-card/40 border border-cyber-dark-border rounded-sm">
                <div>
                  <span class="block text-[10px] font-tech text-cyber-text-muted uppercase font-semibold">GEOLOCATION</span>
                  <span class="font-bold text-cyber-text-title text-xs md:text-sm block mt-0.5">Semarang, Central Java, ID</span>
                </div>
                <span class="text-xs font-tech text-cyber-text-muted">[ SEC_LOC ]</span>
              </div>

              <!-- Email Node -->
              <div class="group flex items-center justify-between p-2.5 bg-cyber-card/40 border border-cyber-dark-border rounded-sm hover:border-cyber-cyan/35 transition-colors">
                <div>
                  <span class="block text-[10px] font-tech text-cyber-text-muted uppercase font-semibold">EMAIL DIRECT</span>
                  <a href="mailto:myusufa120@gmail.com" class="font-bold text-cyber-cyan text-xs md:text-sm block mt-0.5 hover:underline">
                    myusufa120@gmail.com
                  </a>
                </div>
                <button 
                  @click="copyText('myusufa120@gmail.com', 'email')" 
                  class="px-3 py-1 bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/35 text-cyber-cyan text-xs font-tech rounded-sm cursor-pointer transition-all active:scale-95"
                >
                  {{ copiedType === 'email' ? 'COPIED' : 'COPY' }}
                </button>
              </div>

              <!-- Phone Node -->
              <div class="group flex items-center justify-between p-2.5 bg-cyber-card/40 border border-cyber-dark-border rounded-sm hover:border-cyber-green/35 transition-colors">
                <div>
                  <span class="block text-[10px] font-tech text-cyber-text-muted uppercase font-semibold">PHONE COMMS</span>
                  <span class="font-bold text-cyber-green text-xs md:text-sm block mt-0.5">0813-4317-9023</span>
                </div>
                <button 
                  @click="copyText('081343179023', 'phone')" 
                  class="px-3 py-1 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/35 text-cyber-green text-xs font-tech rounded-sm cursor-pointer transition-all active:scale-95"
                >
                  {{ copiedType === 'phone' ? 'COPIED' : 'COPY' }}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<style scoped>
/* Grid Background Pattern using theme variables */
.bg-grid-pattern {
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
}

/* Grid Drift Animation */
@keyframes grid-drift {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}
.animate-grid-drift {
  animation: grid-drift 22s linear infinite;
}

/* Ambient Slow Drifting Glows */
@keyframes float-slow {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(40px, -20px) scale(1.1);
  }
}
@keyframes float-fast {
  0%, 100% {
    transform: translate(0, 0) scale(1.05);
  }
  50% {
    transform: translate(-20px, 30px) scale(0.95);
  }
}
.animate-float-slow {
  animation: float-slow 16s ease-in-out infinite;
}
.animate-float-fast {
  animation: float-fast 12s ease-in-out infinite;
}
</style>
