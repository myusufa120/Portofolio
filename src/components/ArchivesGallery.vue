<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import iotPrototyping from '../assets/iot_prototyping.png'
import fieldTesting from '../assets/field_testing.png'
import workshopPresentation from '../assets/workshop_presentation.png'
import iot1 from '../assets/gambar_project/sertifikat/iot-1.jpeg'
import iot2 from '../assets/gambar_project/sertifikat/iot-2.jpeg'
import iot3 from '../assets/gambar_project/sertifikat/iot-3.jpeg'
import iot4 from '../assets/gambar_project/sertifikat/iot-4.jpeg'
import iot5 from '../assets/gambar_project/sertifikat/iot-5.jpeg'
import iot6 from '../assets/gambar_project/sertifikat/iot-6.jpeg'
import service1 from '../assets/gambar_project/sertifikat/service-1.jpeg'
import service2 from '../assets/gambar_project/sertifikat/service-2.jpeg'
import service3 from '../assets/gambar_project/sertifikat/service-3.jpeg'
import service4 from '../assets/gambar_project/sertifikat/service-4.jpeg'

// Import sertifikat PDF
import cert01 from '../assets/gambar_project/sertifikat/CERT-01.pdf'
import cert02 from '../assets/gambar_project/sertifikat/CERT-02.pdf'
import cert03 from '../assets/gambar_project/sertifikat/CERT-03.pdf'
import cert04 from '../assets/gambar_project/sertifikat/CERT-04.pdf'
import cert05_1 from '../assets/gambar_project/sertifikat/1.pdf'
import cert05_2 from '../assets/gambar_project/sertifikat/2.pdf'
import cert05_3 from '../assets/gambar_project/sertifikat/3.pdf'
import cert05_4 from '../assets/gambar_project/sertifikat/4.pdf'
import cert05_5 from '../assets/gambar_project/sertifikat/5.pdf'
import cert06 from '../assets/gambar_project/sertifikat/CERT-06.pdf'
import cert07 from '../assets/gambar_project/sertifikat/CERT-07.pdf'

import magang1 from '../assets/gambar_project/sertifikat/magang1.jpg'
import magang2 from '../assets/gambar_project/sertifikat/magang2.jpg'
import magang3 from '../assets/gambar_project/sertifikat/magang3.jpg'
import magang4 from '../assets/gambar_project/sertifikat/magang4.jpg'
import magang6 from '../assets/gambar_project/sertifikat/magang6.jpeg'
import magang7 from '../assets/gambar_project/sertifikat/magang7.jpeg'
import magang8 from '../assets/gambar_project/sertifikat/magang8.jpeg'

// Setup scroll reveal for archives section
useScrollReveal('#archives')


const activeImage = ref(null)
const activeCert = ref(null)
const activeCertSlide = ref(0)

const certifications = [
  {
    id: 'CERT-01',
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'May 17, 2026',
    credId: 'CSCO-SRWE-2026',
    verifyUrl: 'https://www.credly.com/org/cisco',
    certFile: cert01
  },
  {
    id: 'CERT-02',
    title: 'Sertifikat Kelulusan Magang Profesional (Excellent)',
    issuer: 'PT Teknologi Aplikasi Sejahtera',
    date: 'June 2025',
    credId: 'TAS-INTERN-2025-EXC',
    verifyUrl: 'https://github.com/myusufa120',
    certFile: cert02
  },
  {
    id: 'CERT-03',
    title: 'IT Spesialist Database',
    issuer: 'UPT Komputer Universitas Semarang by Microsoft',
    date: 'Dec 2024',
    credId: 'FLUTTER-EXP-9871',
    verifyUrl: 'https://www.dicoding.com/certificates/FLUTTER-EXP-9871',
    certFile: cert03
  },
  {
    id: 'CERT-04',
    title: 'English Proficiency Test (TOEFL)',
    issuer: 'BINA BAHASA JAYA Universitas Semarang',
    date: '2024',
    credId: 'TOEFL-2024',
    verifyUrl: '#',
    certFile: cert04
  },
  {
    id: 'CERT-05',
    title: 'Organization & Seminar Awards',
    issuer: 'Various Institutions',
    date: '2023 – 2025',
    credId: 'ORG-SEM-BUNDLE-5',
    verifyUrl: '#',
    certFiles: [cert05_1, cert05_2, cert05_3, cert05_4, cert05_5]
  },
  {
    id: 'CERT-06',
    title: 'HAKI & Community Service Publications',
    issuer: 'Lembaga Penelitian dan Pengabdian kepada Masyarakat Universitas Semarang',
    date: '2024 – 2025',
    credId: 'LPPM-HAKI-USM-2',
    verifyUrl: '#',
    certFiles: [cert06, cert07]
  }
]

const galleryItems = [
  {
    id: 'GALLERY-01',
    title: 'IoT Prototyping & ESP32 Assembly',
    desc: 'Breadboard setup connecting ESP32 nodes to sensors (DHT22, BMP280) and designing local OLED screens to diagnose offline calibration states before telemetry deployment.',
    img: iot1,
    imgs: [iot1, iot2, iot3, iot4, iot5, iot6],
    imgLabels: ['Assembly Setup', 'Sensor Wiring', 'OLED Display Test', 'Node Configuration', 'Power Module', 'Deployment Ready'],
    meta: 'CORE: ESP32-WROOM-32 // DEV_BOARD: v4'
  },
  {
    id: 'GALLERY-02',
    title: 'Hardware Service & Repair',
    desc: 'Hands-on hardware servicing including diagnostics, component-level repair, and device maintenance. Covering laptop, desktop, and peripheral troubleshooting with systematic fault isolation techniques.',
    img: service1,
    imgs: [service1, service2, service3, service4],
    imgLabels: ['Device Diagnosis', 'Component Repair', 'System Reassembly', 'Final Testing'],
    meta: 'SKILL: HARDWARE_SERVICE // TYPE: COMPONENT_LEVEL_REPAIR'
  },
  {
    id: 'GALLERY-03',
    title: 'Internship Documentation',
    desc: 'Professional internship activities at PT Teknologi Aplikasi Sejahtera — covering daily operations, software development sprints, cross-functional team collaboration, and final project presentation to company stakeholders.',
    img: magang1,
    imgs: [magang1, magang2, magang3, magang4, magang6, magang7, magang8],
    imgLabels: ['Day Operations', 'Project Development', 'Team Collaboration', 'Final Presentation', 'Field Activity I', 'Field Activity II', 'Field Activity III'],
    meta: 'PHASE: MAGANG_PROFESIONAL // LOC: PT_TAS // GRADE: EXCELLENT'
  }
]

const activeImageSlide = ref(0)

const openLightbox = (item) => {
  activeImage.value = item
  activeImageSlide.value = 0
}

const closeLightbox = () => {
  activeImage.value = null
  activeImageSlide.value = 0
}

const prevImageSlide = () => {
  if (!activeImage.value?.imgs) return
  activeImageSlide.value = (activeImageSlide.value - 1 + activeImage.value.imgs.length) % activeImage.value.imgs.length
}

const nextImageSlide = () => {
  if (!activeImage.value?.imgs) return
  activeImageSlide.value = (activeImageSlide.value + 1) % activeImage.value.imgs.length
}

const currentGalleryImg = () => {
  if (!activeImage.value) return ''
  if (activeImage.value.imgs) return activeImage.value.imgs[activeImageSlide.value]
  return activeImage.value.img
}

const currentGalleryLabel = () => {
  if (!activeImage.value?.imgLabels) return activeImage.value?.id ?? ''
  return activeImage.value.imgLabels[activeImageSlide.value]
}

const openCertModal = (cert) => {
  activeCert.value = cert
  activeCertSlide.value = 0
}

const closeCertModal = () => {
  activeCert.value = null
  activeCertSlide.value = 0
}

const prevSlide = () => {
  if (!activeCert.value?.certFiles) return
  activeCertSlide.value = (activeCertSlide.value - 1 + activeCert.value.certFiles.length) % activeCert.value.certFiles.length
}

const nextSlide = () => {
  if (!activeCert.value?.certFiles) return
  activeCertSlide.value = (activeCertSlide.value + 1) % activeCert.value.certFiles.length
}

const currentCertFile = () => {
  if (!activeCert.value) return ''
  if (activeCert.value.certFiles) return activeCert.value.certFiles[activeCertSlide.value]
  return activeCert.value.certFile
}
</script>

<template>
  <section id="archives" class="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-cyber-dark-border">
    <div class="space-y-16">
      
      <!-- Section Title -->
      <div class="text-center space-y-3 reveal-init">
        <div class="text-sm font-tech text-cyber-cyan tracking-widest uppercase">// SECURE DATA ARCHIVES</div>
        <h2 class="text-4xl md:text-5xl font-hud font-extrabold text-cyber-text-title uppercase tracking-tight">Certifications & Field Reports</h2>
        <p class="text-cyber-text-main text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Archived proof of tech competency, verified credentials, and logs from physical system operations.
        </p>
      </div>

      <!-- Part 1: Certification Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(cert, index) in certifications" 
          :key="cert.id"
          class="glass-hud rounded-2xl p-6 flex flex-col justify-between hover:border-cyber-cyan/40 transition-all duration-300 bg-cyber-card/85 shadow-sm hologram-card hover:-translate-y-1 reveal-init"
          :style="`transition-delay: ${150 + index * 120}ms`"
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
            <button 
              @click="openCertModal(cert)"
              class="w-full text-center block py-2.5 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan font-tech text-sm tracking-wider rounded-xl transition-all font-semibold cursor-pointer"
            >
              [ VERIFY CREDENTIAL ]
            </button>
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
            v-for="(item, index) in galleryItems" 
            :key="item.id"
            @click="openLightbox(item)"
            class="group cursor-pointer relative glass-hud rounded-2xl p-3 bg-cyber-card hover:border-cyber-cyan/45 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(56,189,248,0.15)] reveal-init"
            :style="`transition-delay: ${150 + index * 120}ms`"
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

      <!-- Certificate Modal (PDF Viewer) -->
      <Teleport to="body">
        <Transition name="cert-modal">
          <div 
            v-if="activeCert" 
            class="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4"
            @click.self="closeCertModal"
          >
            <div class="cert-modal-box w-full md:max-w-4xl glass-hud md:rounded-3xl rounded-t-3xl border border-cyber-border shadow-2xl shadow-black/40 flex flex-col overflow-hidden bg-cyber-card"
              style="max-height: 95vh;"
            >
              <!-- Modal Header — stacks on mobile -->
              <div class="flex flex-col gap-2 px-4 md:px-6 pt-4 pb-3 border-b border-cyber-dark-border flex-shrink-0">
                <!-- Top row: ID + title + close -->
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="text-cyber-cyan font-tech text-xs font-bold flex-shrink-0">{{ activeCert.id }}</span>
                    <span class="text-cyber-dark-border font-tech flex-shrink-0">|</span>
                    <span class="text-cyber-text-title font-hud font-bold text-sm md:text-base leading-tight">{{ activeCert.title }}</span>
                  </div>
                  <button 
                    @click="closeCertModal"
                    class="flex-shrink-0 text-cyber-cyan hover:text-white font-tech text-xs border border-cyber-border px-3 py-1.5 rounded-full bg-cyber-bg transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <!-- Bottom row: Download button -->
                <a 
                  :href="currentCertFile()" 
                  download 
                  class="self-start flex items-center gap-1.5 py-1.5 px-3 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan font-tech text-xs tracking-wider rounded-xl transition-all"
                  title="Download PDF"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  DOWNLOAD PDF
                </a>
              </div>

              <!-- Cert Info Bar — wraps on mobile -->
              <div class="px-4 md:px-6 py-2.5 border-b border-cyber-dark-border bg-cyber-bg/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-tech text-cyber-text-muted flex-shrink-0">
                <span class="leading-relaxed">ISSUER: <span class="text-cyber-text-main font-bold uppercase">{{ activeCert.issuer }}</span></span>
                <span>DATE: <span class="text-cyber-cyan">{{ activeCert.date }}</span></span>
                <span class="flex items-center gap-1.5">
                  <span class="inline-block w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
                  CREDENTIAL VERIFIED
                </span>
              </div>

              <!-- PDF Embed — desktop only -->
              <div class="hidden md:block flex-1 bg-cyber-bg/80 overflow-hidden relative" style="min-height: 480px;">
                <iframe
                  :key="activeCertSlide"
                  :src="currentCertFile() + '#toolbar=1&navpanes=0&scrollbar=1'"
                  class="w-full h-full"
                  style="min-height: 480px; border: none;"
                  :title="activeCert.title"
                />
                <!-- Multi-slide navigation -->
                <template v-if="activeCert.certFiles">
                  <button
                    @click="prevSlide"
                    class="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-cyber-bg/90 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 hover:border-cyber-cyan transition-all cursor-pointer text-lg font-bold"
                    title="Previous"
                  >&#8249;</button>
                  <button
                    @click="nextSlide"
                    class="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-cyber-bg/90 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 hover:border-cyber-cyan transition-all cursor-pointer text-lg font-bold"
                    title="Next"
                  >&#8250;</button>
                  <div class="absolute bottom-3 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none">
                    <div class="flex gap-2">
                      <button
                        v-for="(_, i) in activeCert.certFiles"
                        :key="i"
                        @click="activeCertSlide = i"
                        class="pointer-events-auto w-2.5 h-2.5 rounded-full border border-cyber-cyan/40 transition-all cursor-pointer"
                        :class="activeCertSlide === i ? 'bg-cyber-cyan scale-125' : 'bg-cyber-bg/70 hover:bg-cyber-cyan/40'"
                      />
                    </div>
                    <span class="pointer-events-none font-tech text-xs text-cyber-cyan bg-cyber-bg/80 px-3 py-0.5 rounded-full border border-cyber-cyan/20">
                      {{ activeCertSlide + 1 }} / {{ activeCert.certFiles.length }}
                    </span>
                  </div>
                </template>
              </div>

              <!-- Mobile: PDF tidak bisa di-embed, tampilkan list buka per halaman -->
              <div class="md:hidden flex-1 flex flex-col items-center justify-center gap-5 px-6 py-8 bg-cyber-bg/60">
                <div class="w-16 h-16 rounded-2xl border border-cyber-cyan/30 bg-cyber-cyan/5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-cyber-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="text-center space-y-1">
                  <p class="font-hud font-bold text-cyber-text-title text-sm">PDF Viewer</p>
                  <p class="font-tech text-xs text-cyber-text-muted">Browser mobile tidak mendukung PDF embed. Buka langsung melalui tombol di bawah.</p>
                </div>

                <!-- Single file -->
                <template v-if="!activeCert.certFiles">
                  <a
                    :href="currentCertFile()"
                    target="_blank"
                    class="w-full py-3 flex items-center justify-center gap-2 border border-cyber-cyan/40 text-cyber-cyan bg-cyber-cyan/10 hover:bg-cyber-cyan/20 font-tech text-sm tracking-wider rounded-2xl transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    BUKA PDF
                  </a>
                </template>

                <!-- Multi-file (CERT-05 / CERT-06) -->
                <template v-else>
                  <div class="w-full space-y-2">
                    <a
                      v-for="(file, i) in activeCert.certFiles"
                      :key="i"
                      :href="file"
                      target="_blank"
                      class="w-full py-2.5 flex items-center justify-between gap-2 border border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/5 hover:bg-cyber-cyan/15 font-tech text-xs tracking-wider rounded-xl transition-all px-4"
                    >
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Dokumen {{ i + 1 }}</span>
                      </div>
                      <span class="text-cyber-text-muted">OPEN ›</span>
                    </a>
                  </div>
                </template>
              </div>

            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Lightbox Modal (Gallery) -->
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

          <!-- Left column: Image with slideshow -->
          <div class="md:w-3/5 relative border border-cyber-dark-border rounded-2xl aspect-video bg-cyber-bg/90 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none"></div>
            <img
              :key="activeImageSlide"
              :src="currentGalleryImg()"
              :alt="activeImage.title"
              class="w-full h-full object-cover transition-opacity duration-300"
            />
            <!-- Slide nav arrows (multi-image only) -->
            <template v-if="activeImage.imgs">
              <button
                @click="prevImageSlide"
                class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-cyber-bg/90 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 hover:border-cyber-cyan transition-all cursor-pointer text-xl font-bold"
              >&#8249;</button>
              <button
                @click="nextImageSlide"
                class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-cyber-bg/90 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 hover:border-cyber-cyan transition-all cursor-pointer text-xl font-bold"
              >&#8250;</button>
              <!-- Dot indicators -->
              <div class="absolute bottom-2.5 left-0 right-0 flex flex-col items-center gap-1.5">
                <div class="flex gap-2">
                  <button
                    v-for="(_, i) in activeImage.imgs"
                    :key="i"
                    @click="activeImageSlide = i"
                    class="w-2 h-2 rounded-full border border-cyber-cyan/40 transition-all cursor-pointer"
                    :class="activeImageSlide === i ? 'bg-cyber-cyan scale-125' : 'bg-cyber-bg/70 hover:bg-cyber-cyan/40'"
                  />
                </div>
                <span class="font-tech text-[10px] text-cyber-cyan bg-cyber-bg/80 px-2.5 py-0.5 rounded-full border border-cyber-cyan/20">
                  {{ currentGalleryLabel() }} &nbsp;·&nbsp; {{ activeImageSlide + 1 }}/{{ activeImage.imgs.length }}
                </span>
              </div>
            </template>
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

<style scoped>
/* Certificate Modal Transition */
.cert-modal-enter-active,
.cert-modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.cert-modal-enter-from,
.cert-modal-leave-to {
  opacity: 0;
}
.cert-modal-enter-from .cert-modal-box,
.cert-modal-leave-to .cert-modal-box {
  transform: scale(0.93) translateY(16px);
}
.cert-modal-enter-to .cert-modal-box,
.cert-modal-leave-from .cert-modal-box {
  transform: scale(1) translateY(0);
  transition: transform 0.3s ease;
}
</style>
