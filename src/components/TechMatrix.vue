<script setup>
import { ref } from 'vue'

const activeCategory = ref('mobile')
const activeSkill = ref(null)

const categories = [
  { id: 'mobile', label: 'FRONTEND & MOBILE', icon: '📱' },
  { id: 'backend', label: 'BACKEND & DATABASE', icon: '⚙️' },
  { id: 'iot', label: 'IOT & EMBEDDED', icon: '⚡' },
  { id: 'tools', label: 'TOOLS & ENV', icon: '🔧' }
]

const skillsData = {
  mobile: [
    { name: 'Flutter', level: 92, desc: 'Cross-platform mobile framework for robust native-performance apps.', cases: 'Designing BIMO UI templates, local storage caching, custom hardware streams.', projects: 'APP-01, SYS-01' },
    { name: 'Dart', level: 90, desc: 'Object-oriented programming language optimized for client app compilation.', cases: 'Asynchronous event loops, REST API parsing, device-to-user claims.', projects: 'APP-01, SYS-01' },
    { name: 'Vue.js', level: 85, desc: 'Component-based reactive framework for building administrative web panels.', cases: 'Real-time telemetry displays, device configurations.', projects: 'SYS-01' },
    { name: 'AppScript', level: 88, desc: 'Google Workspace scripting platform for lightweight serverless automations.', cases: 'WFH/WFO presence forms, spreadsheet records automation.', projects: 'SYS-02' },
    { name: 'HTML/CSS', level: 90, desc: 'Core web structures and layouts styling standard.', cases: 'Building mobile-responsive web presence layouts.', projects: 'SYS-02' }
  ],
  backend: [
    { name: 'Firebase', level: 90, desc: 'Realtime database infrastructure and user verification platforms.', cases: 'Device claim validation, authentication tokens, real-time data sync.', projects: 'SYS-01' },
    { name: 'Thinger.io', level: 88, desc: 'Specialized cloud platform for Internet of Things management.', cases: 'Telemetry charts, bucket storage, device status feeds.', projects: 'SYS-01' },
    { name: 'JavaScript', level: 85, desc: 'Dynamic client/server coding language for web applications.', cases: 'Backend REST logic, dynamic presence checking.', projects: 'SYS-01, SYS-02' },
    { name: 'Python', level: 75, desc: 'Scripting language for data analysis and quick backend checks.', cases: 'Fuzzy logic computation scripts, regression equations.', projects: 'SYS-01' }
  ],
  iot: [
    { name: 'ESP32 Integrasi', level: 92, desc: 'Configuring dual-core microcontrollers for analog/digital sensor readings.', cases: 'DHT22 sensors, wireless data packet transmissions.', projects: 'SYS-01' },
    { name: 'Firmware & C++', level: 88, desc: 'Hardware-level programming using Arduino IDE compiling frameworks.', cases: 'Serial debug logs, hardware sleep management.', projects: 'SYS-01' },
    { name: 'Tri-Method OTA', level: 90, desc: 'Three-tiered remote firmware update pipeline configuration.', cases: 'Local mDNS uploads, WebSocket chunks, remote GitHub releases.', projects: 'SYS-01' },
    { name: 'Diagnostics', level: 85, desc: 'Automated physical board checks to detect sensor faults.', cases: 'I2C bus diagnostic scanning, ADC route verification.', projects: 'SYS-01' }
  ],
  tools: [
    { name: 'Routing & Switching', level: 85, desc: 'Cisco certified router configurations and IP structures.', cases: 'CCNA network engineering, packet tracing validation.', projects: 'CERT-01' },
    { name: 'Keamanan Jaringan', level: 80, desc: 'Protecting network pipelines from intrusion or leakage.', cases: 'Access Control Lists, network domain validation.', projects: 'CERT-01' },
    { name: 'Git & GitHub', level: 90, desc: 'Source code management and continuous deployment tracks.', cases: 'OTA releases hosting, repository branch conflicts resolve.', projects: 'SYS-01' }
  ]
}

// Select category and default first skill
const selectCategory = (catId) => {
  activeCategory.value = catId
  activeSkill.value = skillsData[catId][0]
}

// Initialize default skill
activeSkill.value = skillsData.mobile[0]
</script>

<template>
  <section id="tech-matrix" class="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-cyber-dark-border min-h-screen flex flex-col justify-center">
    <div class="space-y-16">
      
      <!-- Section Title -->
      <div class="text-center space-y-3">
        <div class="text-sm font-tech text-cyber-cyan tracking-widest uppercase">// SYSTEM WEAPONRY</div>
        <h2 class="text-4xl md:text-5xl font-hud font-extrabold text-cyber-text-title uppercase tracking-tight">Tech Matrix</h2>
        <p class="text-cyber-text-main text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Hover or click on components of the system weapons to reveal diagnostic status and compatibility values.
        </p>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <!-- Left Side: Circular selector layout -->
        <div class="lg:col-span-6 flex flex-col items-center justify-center relative py-10">
          
          <!-- Outer Circle representation -->
          <div class="relative w-72 h-72 md:w-96 md:h-96 rounded-full border border-cyber-cyan/10 flex items-center justify-center bg-dot-matrix">
            
            <!-- Category buttons positioned around the circle -->
            <div 
              v-for="(cat, index) in categories" 
              :key="cat.id"
              @click="selectCategory(cat.id)"
              class="absolute cursor-pointer w-18 h-18 md:w-22 md:h-22 rounded-full border flex flex-col items-center justify-center transition-all duration-500 hover:scale-105"
              :class="activeCategory === cat.id 
                ? 'border-cyber-cyan bg-cyber-cyan/15 text-cyber-cyan shadow-[0_0_12px_rgba(56,189,248,0.2)]' 
                : 'border-cyber-dark-border bg-cyber-card text-cyber-text-muted hover:border-cyber-cyan/35 hover:text-cyber-cyan'"
              :style="{
                top: `${50 - 38 * Math.sin((index * 2 * Math.PI) / 4)}%`,
                left: `${50 + 38 * Math.cos((index * 2 * Math.PI) / 4)}%`,
                transform: 'translate(-50%, -50%)'
              }"
            >
              <span class="text-2xl md:text-3xl">{{ cat.icon }}</span>
              <span class="text-[10px] md:text-xs font-tech text-center mt-1 uppercase font-bold tracking-tighter">
                {{ cat.id }}
              </span>
            </div>

            <!-- Central Hologram Indicator -->
            <div class="w-28 h-28 md:w-36 md:h-36 rounded-full border border-cyber-cyan/30 flex flex-col items-center justify-center p-2 text-center bg-cyber-bg/95 dark:bg-cyber-card/90 backdrop-blur-md shadow-md relative transition-colors">
              <!-- Spinning outer ring -->
              <div class="absolute inset-0 rounded-full border border-dashed border-cyber-cyan/30 animate-[spin_12s_linear_infinite]"></div>
              
              <span class="text-[10px] font-tech text-cyber-cyan tracking-widest uppercase font-bold">MATRIX</span>
              <span class="text-sm md:text-base font-hud font-extrabold text-cyber-text-title uppercase mt-1">STATUS: OK</span>
              <span class="text-xs font-tech text-cyber-green font-bold animate-pulse mt-0.5">ONLINE</span>
            </div>

          </div>

          <!-- Category Labels beneath circle (Mobile indicator) -->
          <div class="mt-8 flex flex-wrap justify-center gap-3 lg:hidden font-tech text-xs">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              @click="selectCategory(cat.id)"
              class="px-4 py-2 border rounded-full cursor-pointer font-semibold"
              :class="activeCategory === cat.id ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10' : 'border-cyber-dark-border text-cyber-text-muted'"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <!-- Right Side: Detailed Skills List and Hologram Diagnostic Tooltip -->
        <div class="lg:col-span-6 space-y-6">
          
          <!-- Skill Selector Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button 
              v-for="skill in skillsData[activeCategory]" 
              :key="skill.name"
              @click="activeSkill = skill"
              @mouseenter="activeSkill = skill"
              class="px-5 py-3.5 border text-left transition-all duration-300 font-tech text-sm flex items-center justify-between rounded-xl bg-cyber-card cursor-pointer"
              :class="activeSkill?.name === skill.name 
                ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/5 font-bold shadow-sm' 
                : 'border-cyber-dark-border text-cyber-text-main hover:border-cyber-cyan/30 hover:text-cyber-cyan font-medium'"
            >
              <span>{{ skill.name }}</span>
              <span class="text-xs font-tech" :class="activeSkill?.name === skill.name ? 'text-cyber-cyan font-bold' : 'text-cyber-text-muted'">
                {{ skill.level }}%
              </span>
            </button>
          </div>

          <!-- Holographic Diagnostic Card -->
          <div 
            v-if="activeSkill"
            class="glass-hud rounded-2xl p-6 md:p-8 bg-cyber-card/90 border border-cyber-cyan/35 space-y-6 shadow-sm transition-all duration-300"
          >
            <!-- Card Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-cyber-dark-border pb-3.5">
              <div>
                <span class="text-xs font-tech text-cyber-cyan">// COMPONENT DIAGNOSTICS</span>
                <h3 class="text-2xl md:text-3xl font-hud font-bold text-cyber-text-title mt-1">{{ activeSkill.name }}</h3>
              </div>
              
              <!-- Compatibility percentage bar -->
              <div class="text-left sm:text-right">
                <span class="block text-xs font-tech text-cyber-text-muted uppercase tracking-widest">Compatibility</span>
                <span class="text-2xl font-hud font-extrabold text-cyber-cyan">{{ activeSkill.level }}%</span>
              </div>
            </div>

            <!-- Loading Progress bar -->
            <div class="w-full bg-white/5 border border-cyber-dark-border h-3 rounded-full overflow-hidden p-0.5">
              <div 
                class="bg-cyber-cyan h-full rounded-full transition-all duration-500" 
                :style="{ width: `${activeSkill.level}%` }"
              ></div>
            </div>

            <!-- Specs Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm font-sans">
              <div class="space-y-1.5">
                <span class="block font-tech text-xs text-cyber-text-muted uppercase tracking-widest font-semibold">Primary Function</span>
                <p class="text-cyber-text-main leading-relaxed">{{ activeSkill.desc }}</p>
              </div>
              <div class="space-y-1.5">
                <span class="block font-tech text-xs text-cyber-text-muted uppercase tracking-widest font-semibold">Primary Use Cases</span>
                <p class="text-cyber-text-main leading-relaxed">{{ activeSkill.cases }}</p>
              </div>
            </div>

            <!-- Footer data -->
            <div class="border-t border-cyber-dark-border pt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2 font-tech text-xs text-cyber-text-muted">
              <div>ASSOCIATED_PROJECTS: <span class="text-cyber-text-title font-bold">{{ activeSkill.projects }}</span></div>
              <div class="text-cyber-green font-semibold">STATUS: STABLE_DEPLOYMENT</div>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>
