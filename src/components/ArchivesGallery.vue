<script setup>
import { ref } from 'vue'
import iotPrototyping from '../assets/iot_prototyping.png'
import fieldTesting from '../assets/field_testing.png'
import workshopPresentation from '../assets/workshop_presentation.png'

const activeImage = ref(null)

const certifications = [
  {
    id: 'CERT-01',
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'May 17, 2026',
    credId: 'CSCO-SRWE-2026',
    verifyUrl: 'https://www.credly.com/org/cisco'
  },
  {
    id: 'CERT-02',
    title: 'Sertifikat Kelulusan Magang Profesional (Excellent)',
    issuer: 'PT Teknologi Aplikasi Sejahtera',
    date: 'June 2025',
    credId: 'TAS-INTERN-2025-EXC',
    verifyUrl: 'https://github.com/myusufa120'
  },
  {
    id: 'CERT-03',
    title: 'Menjadi Flutter Developer Expert',
    issuer: 'Dicoding Indonesia',
    date: 'Dec 2024',
    credId: 'FLUTTER-EXP-9871',
    verifyUrl: 'https://www.dicoding.com/certificates/FLUTTER-EXP-9871'
  }
]

const galleryItems = [
  {
    id: 'GALLERY-01',
    title: 'IoT Prototyping & ESP32 Assembly',
    desc: 'Breadboard setup connecting ESP32 nodes to sensors (DHT22, BMP280) and designing local OLED screens to diagnose offline calibration states before telemetry deployment.',
    img: iotPrototyping,
    meta: 'CORE: ESP32-WROOM-32 // DEV_BOARD: v4'
  },
  {
    id: 'GALLERY-02',
    title: 'Field Diagnostic & Telemetry Validation',
    desc: 'Mounting and configuring sensor nodes in outdoor environments. Calibrating solar-powered battery inputs and verifying Wi-Fi/cellular gateway stability back to database routes.',
    img: fieldTesting,
    meta: 'LOC: HYDRO_COORDS_SURABAYA // TEMP: 32.4°C'
  },
  {
    id: 'GALLERY-03',
    title: 'Software Architecture Presentations',
    desc: 'Demonstrating clean architecture concepts and Fuzzy Logic decision trees during local tech panels. Explaining sensor payload structures and responsive data graphs to engineers.',
    img: workshopPresentation,
    meta: 'THEME: HYBRID SENSORS TO FLUTTER APP'
  }
]

const openLightbox = (item) => {
  activeImage.value = item
}

const closeLightbox = () => {
  activeImage.value = null
}
</script>

<template>
  <section id="archives" class="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-cyber-dark-border">
    <div class="space-y-16">
      
      <!-- Section Title -->
      <div class="text-center space-y-3">
        <div class="text-sm font-tech text-cyber-cyan tracking-widest uppercase">// SECURE DATA ARCHIVES</div>
        <h2 class="text-4xl md:text-5xl font-hud font-extrabold text-cyber-text-title uppercase tracking-tight">Certifications & Field Reports</h2>
        <p class="text-cyber-text-main text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Archived proof of tech competency, verified credentials, and logs from physical system operations.
        </p>
      </div>

      <!-- Part 1: Certification Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="cert in certifications" 
          :key="cert.id"
          class="glass-hud rounded-2xl p-6 flex flex-col justify-between hover:border-cyber-cyan/40 transition-all duration-300 bg-cyber-card/85 shadow-sm"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-cyber-dark-border pb-2.5 font-tech text-sm">
              <span class="text-cyber-cyan font-bold">{{ cert.id }}</span>
              <span class="text-cyber-text-muted text-xs md:text-sm">{{ cert.date }}</span>
            </div>
            <div>
              <h3 class="text-lg font-hud font-bold text-cyber-text-title leading-snug">{{ cert.title }}</h3>
              <p class="text-xs md:text-sm font-tech text-cyber-text-muted mt-1.5 uppercase">{{ cert.issuer }}</p>
            </div>
            <div class="bg-white/2 border border-cyber-dark-border p-3 rounded-lg text-xs font-tech text-cyber-text-muted">
              CREDENTIAL_ID: <span class="text-cyber-text-main font-bold">{{ cert.credId }}</span>
            </div>
          </div>
          <div class="mt-6 pt-3 border-t border-cyber-dark-border">
            <a 
              :href="cert.verifyUrl" 
              target="_blank" 
              class="w-full text-center block py-2.5 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan font-tech text-sm tracking-wider rounded-xl transition-all font-semibold"
            >
              [ VERIFY CREDENTIAL ]
            </a>
          </div>
        </div>
      </div>

      <!-- Part 2: Field Gallery Grid -->
      <div class="space-y-8">
        <div class="text-left font-tech">
          <span class="text-cyber-cyan text-sm tracking-widest">// FIELD RECORDS & PROTOTYPING IMAGES</span>
          <div class="h-[1px] w-full bg-cyber-dark-border mt-2"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="item in galleryItems" 
            :key="item.id"
            @click="openLightbox(item)"
            class="group cursor-pointer relative glass-hud rounded-2xl p-3 bg-cyber-card hover:border-cyber-cyan/45 transition-all duration-300"
          >
            <div class="relative overflow-hidden aspect-video border border-cyber-dark-border rounded-xl">
              <!-- Grid overlay -->
              <div class="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none"></div>
              
              <img 
                :src="item.img" 
                :alt="item.title"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              <div class="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center text-xs font-tech text-cyber-cyan bg-cyber-bg/85 backdrop-blur-sm px-2.5 py-1 border border-cyber-cyan/25 rounded-lg">
                <span class="font-bold">{{ item.id }}</span>
                <span>OPEN_LOG 📂</span>
              </div>
            </div>
            <div class="p-3 space-y-1.5">
              <h4 class="font-hud font-bold text-base md:text-lg text-cyber-text-title group-hover:text-cyber-cyan transition-colors">{{ item.title }}</h4>
              <p class="text-xs font-tech text-cyber-text-muted uppercase">{{ item.meta }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div 
        v-if="activeImage" 
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <div class="max-w-4xl w-full glass-hud rounded-3xl p-6 md:p-8 relative bg-cyber-card flex flex-col md:flex-row gap-6 border border-cyber-border shadow-2xl shadow-black/20">
          
          <!-- Close button -->
          <button 
            @click="closeLightbox"
            class="absolute top-5 right-5 text-cyber-cyan hover:text-white font-tech text-sm z-10 border border-cyber-border px-3.5 py-1.5 rounded-full bg-cyber-bg cursor-pointer"
          >
            [ CLOSE_X ]
          </button>

          <!-- Left column: Image -->
          <div class="md:w-3/5 relative border border-cyber-dark-border rounded-2xl aspect-video bg-cyber-bg/90 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none"></div>
            <img :src="activeImage.img" :alt="activeImage.title" class="w-full h-full object-cover" />
          </div>

          <!-- Right column: Log Info -->
          <div class="md:w-2/5 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="font-tech text-sm text-cyber-cyan">
                <span>// LOG_ID: {{ activeImage.id }}</span>
                <span class="block text-xs text-cyber-text-muted uppercase tracking-widest mt-1">{{ activeImage.meta }}</span>
              </div>
              <h3 class="text-xl md:text-2xl font-hud font-bold text-cyber-text-title border-b border-cyber-dark-border pb-2.5">
                {{ activeImage.title }}
              </h3>
              <p class="text-cyber-text-main text-sm leading-relaxed font-sans">
                {{ activeImage.desc }}
              </p>
            </div>

            <div class="bg-cyber-bg/70 border border-cyber-dark-border p-3.5 text-xs font-tech text-cyber-text-muted space-y-1.5 rounded-xl">
              <div>DIAGNOSTIC_STATE: <span class="text-cyber-green font-bold">STABLE</span></div>
              <div>VERIFICATION: <span class="text-cyber-cyan">APPROVED_BY_OPERATOR</span></div>
              <div>INTEGRITY: <span class="text-cyber-text-title font-bold">100% SECURE</span></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
