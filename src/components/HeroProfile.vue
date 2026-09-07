<script setup>
import { ref, onMounted } from 'vue'
import profilePhoto from '../assets/profile.jpeg'

const copiedType = ref('')
const copyText = (text, type) => {
  navigator.clipboard.writeText(text)
  copiedType.value = type
  setTimeout(() => { copiedType.value = '' }, 2000)
}

const displayedGreeting = ref('')
const showCursor = ref(true)
const greetingText = "Hi, I'm"

onMounted(() => {
  let i = 0
  const typeInterval = setInterval(() => {
    if (i < greetingText.length) {
      displayedGreeting.value += greetingText.charAt(i)
      i++
    } else {
      clearInterval(typeInterval)
    }
  }, 90)
  setInterval(() => { showCursor.value = !showCursor.value }, 530)
})
</script>

<template>
  <section id="profile" class="relative w-full bg-cyber-bg text-cyber-text-main overflow-hidden transition-colors duration-300">

    <!-- BACKGROUND -->
    <div class="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0"></div>
    <div class="absolute -top-24 -left-24 w-[700px] h-[700px] bg-cyber-cyan-glow rounded-full blur-[180px] pointer-events-none animate-float-slow z-0 opacity-50"></div>
    <div class="absolute -bottom-20 -right-24 w-[500px] h-[500px] bg-cyber-cyan-glow/15 rounded-full blur-[160px] pointer-events-none animate-float-fast z-0"></div>

    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pt-28 lg:pt-32 pb-16">

      <!-- ===== HERO ROW ===== -->
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20">

        <!-- Left: Text -->
        <div class="flex-1 min-w-0 space-y-6 text-center lg:text-left animate-hud-up" style="opacity:0;animation-delay:0.05s;animation-fill-mode:forwards;">

          <!-- Greeting + Name -->
          <div class="space-y-1">
            <p class="text-2xl md:text-3xl lg:text-4xl font-sans text-cyber-text-muted tracking-wide leading-tight">
              <span>{{ displayedGreeting }}</span><span
                class="text-cyber-cyan font-light transition-opacity duration-100"
                :class="showCursor ? 'opacity-100' : 'opacity-0'"
              >|</span>
            </p>
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-hud font-extrabold text-cyber-text-title tracking-tight leading-[1.05]">
              M. Yusuf<br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-sky-300 to-cyber-cyan">Abdurrahman</span>
            </h1>
          </div>

          <!-- Role subtitle -->
          <p class="text-base md:text-lg font-sans text-cyber-text-muted leading-relaxed max-w-[560px] mx-auto lg:mx-0">
            IT Infrastructure Enthusiast &amp; IoT Engineer — building end-to-end monitoring systems, from sensor telemetry to cross-platform mobile apps and cloud dashboards.
          </p>

          <!-- Simple flat tags — NO borders/boxes, just text chips -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2">
            <span class="inline-flex items-center gap-2 text-sm font-tech text-cyber-cyan tracking-wider">
              <span class="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse flex-shrink-0"></span>
              OPEN TO WORK
            </span>
            <span class="text-cyber-text-muted/40 text-xs">·</span>
            <span class="text-sm font-tech text-cyber-text-muted tracking-wider">NETWORKING</span>
            <span class="text-cyber-text-muted/40 text-xs">·</span>
            <span class="text-sm font-tech text-cyber-text-muted tracking-wider">IOT ARCHITECT</span>
            <span class="text-cyber-text-muted/40 text-xs">·</span>
            <span class="text-sm font-tech text-cyber-text-muted tracking-wider">MOBILE DEV</span>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
            <a
              href="mailto:myusufa120@gmail.com"
              class="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-cyber-cyan text-cyber-bg font-tech font-bold text-sm tracking-widest hover:bg-sky-300 transition-all duration-200 shadow-lg shadow-cyber-cyan/20 active:scale-[0.97]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              GET IN TOUCH
            </a>
            <a
              href="https://github.com/myusufa120"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-cyber-border/50 bg-transparent text-cyber-text-main font-tech font-bold text-sm tracking-widest hover:border-cyber-cyan/60 hover:text-cyber-cyan transition-all duration-200 active:scale-[0.97]"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              VIEW GITHUB
            </a>
          </div>
        </div>

        <!-- Right: Profile Photo -->
        <div class="flex-shrink-0 mx-auto lg:ml-0 lg:mr-8 xl:mr-20 animate-hud-zoom" style="opacity:0;animation-delay:0.3s;animation-fill-mode:forwards;">
          <div class="relative group">
            <div class="absolute -inset-4 bg-cyber-cyan/8 rounded-full blur-2xl group-hover:bg-cyber-cyan/15 transition-all duration-700 pointer-events-none"></div>
            <div class="absolute -inset-1.5 rounded-full border border-cyber-cyan/10 animate-spin-slow pointer-events-none"></div>
            <div class="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border border-cyber-cyan/25 group-hover:border-cyber-cyan/50 transition-colors duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-cyber-bg/50 via-transparent to-transparent pointer-events-none z-10 rounded-full"></div>
              <img
                :src="profilePhoto"
                alt="M. Yusuf Abdurrahman"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 relative z-0"
              />
            </div>
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap flex items-center gap-2 px-4 py-1.5 bg-cyber-bg/95 backdrop-blur-md border border-cyber-cyan/20 rounded-full text-xs font-tech text-cyber-text-muted tracking-widest">
              <span class="w-1.5 h-1.5 rounded-full bg-cyber-cyan/70 flex-shrink-0"></span>
              FRESH GRADUATE · 2026
            </div>
          </div>
        </div>

      </div>

      <!-- ===== INFO SECTION — NO BOXES, flat layout ===== -->
      <div class="mt-16 animate-hud-up" style="opacity:0;animation-delay:0.5s;animation-fill-mode:forwards;">

        <!-- Thin divider -->
        <div class="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent mb-10"></div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          <!-- Education -->
          <div>
            <p class="text-[11px] font-tech text-cyber-cyan tracking-[0.2em] uppercase mb-3">Education</p>
            <h3 class="text-lg font-hud font-bold text-cyber-text-title leading-tight">S1 Teknik Informatika</h3>
            <p class="text-sm text-cyber-text-muted mt-0.5">Universitas Semarang · 2026</p>
            <div class="flex items-baseline gap-3 mt-3">
              <span class="text-2xl font-tech font-extrabold text-cyber-text-title">3.93</span>
              <span class="text-sm text-cyber-text-muted font-tech">/ 4.00 GPA</span>
              <span class="text-xs font-tech text-cyber-cyan ml-1">EXCELLENT</span>
            </div>
          </div>

          <!-- Thesis -->
          <div>
            <p class="text-[11px] font-tech text-cyber-cyan tracking-[0.2em] uppercase mb-3">Thesis</p>
            <p class="text-sm text-cyber-text-muted leading-relaxed">
              "Sistem Manajemen Perangkat IOT Berbasis Cloud dengan Self-Diagnostic dan Over-The-Air Update."
            </p>
          </div>

          <!-- Contact -->
          <div>
            <p class="text-[11px] font-tech text-cyber-cyan tracking-[0.2em] uppercase mb-3">Contact</p>
            <div class="space-y-3">
              <div class="flex items-center justify-between gap-4">
                <a href="mailto:myusufa120@gmail.com" class="text-sm text-cyber-text-main hover:text-cyber-cyan transition-colors">myusufa120@gmail.com</a>
                <button
                  @click="copyText('myusufa120@gmail.com', 'email')"
                  class="flex-shrink-0 text-xs font-tech text-cyber-text-muted hover:text-cyber-cyan transition-colors cursor-pointer underline-offset-2 hover:underline"
                >{{ copiedType === 'email' ? 'Copied ✓' : 'Copy' }}</button>
              </div>
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm text-cyber-text-main">0813-4317-9023</span>
                <button
                  @click="copyText('081343179023', 'phone')"
                  class="flex-shrink-0 text-xs font-tech text-cyber-text-muted hover:text-cyber-cyan transition-colors cursor-pointer underline-offset-2 hover:underline"
                >{{ copiedType === 'phone' ? 'Copied ✓' : 'Copy' }}</button>
              </div>
              <p class="text-xs text-cyber-text-muted/60">Semarang, Central Java, ID</p>
            </div>
          </div>

        </div>

        <!-- Skills flat list -->
        <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span class="text-[11px] font-tech text-cyber-cyan tracking-[0.2em] uppercase">Core Skills</span>
          <span class="text-cyber-text-muted/30 text-xs">—</span>
          <span v-for="skill in ['CCNA Certified','ESP32 Firmware','Flutter','Dart','Firebase RTDB','Thinger.io','Vue.js','OTA Protocol','Cloud IoT','Google Apps Script']"
            :key="skill"
            class="text-sm font-tech text-cyber-text-muted hover:text-cyber-text-title transition-colors cursor-default"
          >{{ skill }}</span>
        </div>

      </div>

      <!-- Scroll indicator -->
      <div class="mt-16 flex flex-col items-center gap-2 text-cyber-text-muted/40 animate-hud-up" style="opacity:0;animation-delay:0.75s;animation-fill-mode:forwards;">
        <span class="text-[10px] font-tech tracking-[0.3em] uppercase">Scroll</span>
        <div class="flex flex-col items-center gap-0.5 animate-bounce-slow">
          <div class="w-px h-5 bg-gradient-to-b from-transparent to-cyber-cyan/35"></div>
          <svg class="w-3.5 h-3.5 text-cyber-cyan/45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.bg-grid-pattern {
  background-size: 50px 50px;
  background-image:
    linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
}
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -15px) scale(1.05); }
}
@keyframes float-fast {
  0%, 100% { transform: translate(0, 0) scale(1.02); }
  50% { transform: translate(-15px, 25px) scale(0.98); }
}
.animate-float-slow { animation: float-slow 18s ease-in-out infinite; }
.animate-float-fast { animation: float-fast 13s ease-in-out infinite; }

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 25s linear infinite; }

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
.animate-bounce-slow { animation: bounce-slow 2.5s ease-in-out infinite; }
</style>
