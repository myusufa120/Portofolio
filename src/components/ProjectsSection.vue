<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import ProjectCard from './ProjectCard.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

// Smart-IOT System screenshots
import imgLanding1 from '../assets/gambar_project/Monitoring_Iot/Landing_page1.png'
import imgLanding2 from '../assets/gambar_project/Monitoring_Iot/Landing_page2.png'
import imgLogin from '../assets/gambar_project/Monitoring_Iot/Login_page.png'
import imgDashboard from '../assets/gambar_project/Monitoring_Iot/Dashboard.png'
import imgDevices from '../assets/gambar_project/Monitoring_Iot/maangement devices.png'
import imgQr from '../assets/gambar_project/Monitoring_Iot/qr code generator.png'
import imgOta from '../assets/gambar_project/Monitoring_Iot/Tri Method OTA.png'
import imgNotif from '../assets/gambar_project/Monitoring_Iot/histori notifikasi.png'
import imgDiag from '../assets/gambar_project/Monitoring_Iot/self diagnosis & perintah sistem.png'

// Absensi Karyawan Magang screenshots
import imgAbsensiLanding from '../assets/gambar_project/Absensi_Karyawan_Magang/landing_page1.jpeg'
import imgAbsensiLogin from '../assets/gambar_project/Absensi_Karyawan_Magang/login_page.jpeg'
import imgAbsensiDashboard from '../assets/gambar_project/Absensi_Karyawan_Magang/dashbord.png'

// Mobile Smart-IOT System screenshots
import imgMIotLanding from '../assets/gambar_project/Mobile_Smart-IOT/landing_page.jpeg'
import imgMIotLogin from '../assets/gambar_project/Mobile_Smart-IOT/login page.jpeg'
import imgMIotDashboard from '../assets/gambar_project/Mobile_Smart-IOT/dashboard.jpeg'
import imgMIotDevice from '../assets/gambar_project/Mobile_Smart-IOT/device.jpeg'
import imgMIotDetailDevice from '../assets/gambar_project/Mobile_Smart-IOT/detail device.jpeg'
import imgMIotDeviceControl from '../assets/gambar_project/Mobile_Smart-IOT/device control.jpeg'
import imgMIotClaim from '../assets/gambar_project/Mobile_Smart-IOT/claim device.jpeg'
import imgMIotConsole from '../assets/gambar_project/Mobile_Smart-IOT/console.jpeg'
import imgMIotDataLogger from '../assets/gambar_project/Mobile_Smart-IOT/Data_logger.jpeg'
import imgMIotStatistik from '../assets/gambar_project/Mobile_Smart-IOT/statistik.jpeg'
import imgMIotFirmware from '../assets/gambar_project/Mobile_Smart-IOT/filmware.jpeg'

// Setup scroll reveal for this section
useScrollReveal('#projects')

const selectedCategory = ref('all')

// Re-trigger reveal after filter changes (new cards appear)
watch(selectedCategory, () => {
  nextTick(() => {
    const els = document.querySelectorAll('#projects .reveal-init:not(.revealed)')
    if (window.__revealObserver) {
      els.forEach(el => window.__revealObserver.observe(el))
    } else {
      els.forEach(el => el.classList.add('revealed'))
    }
  })
})

const categories = [
  { id: 'all', label: 'ALL_UNITS' },
  { id: 'mobile', label: 'MOBILE APPS' },
  { id: 'web', label: 'WEB PLATFORMS' },
  { id: 'iot', label: 'IOT SYSTEMS' }
]

const projects = [
  // ── Baris 1: Yang ada gambar (Web dulu) ──
  {
    systemId: 'SYS-03',
    title: 'Web Smart-IOT System',
    description: 'Full-featured web platform for smart IoT device management. Includes real-time monitoring dashboard, Firebase Authentication, QR code generator for device provisioning, OTA update via Tri-Method, notification history, self-diagnosis, and remote command execution.',
    type: 'web',
    status: 'public',
    tags: ['Vue.js', 'Vite', 'Firebase Authentication', 'Thinger.io', 'Tailwind'],
    liveLink: 'https://smart-monitoring-iot-pi.vercel.app/',
    gitLink: null,
    images: [
      imgLanding1,
      imgLanding2,
      imgLogin,
      imgDashboard,
      imgDevices,
      imgQr,
      imgOta,
      imgNotif,
      imgDiag,
    ]
  },
  {
    systemId: 'APP-02',
    title: 'Intern Employee Attendance App',
    description: 'Flutter-based mobile application for tracking intern employee attendance. Features secure login authentication, an attendance summary dashboard, and a lightweight, responsive interface designed for daily use.',
    type: 'mobile',
    status: 'public',
    tags: ['Flutter', 'Dart', 'REST API', 'UI/UX', 'Geolocation'],
    liveLink: null,
    gitLink: 'https://github.com/myusufa120',
    images: [
      imgAbsensiLanding,
      imgAbsensiLogin,
      imgAbsensiDashboard,
    ]
  },
  {
    systemId: 'APP-03',
    title: 'Mobile Smart-IOT System',
    description: 'Mobile companion for the Web Smart-IOT System, built with Flutter. Provides real-time IoT device management on the go — including a monitoring dashboard, device control, data logger, usage statistics, OTA firmware updates, and a live command console.',
    type: 'mobile',
    status: 'public',
    tags: ['Flutter', 'Dart', 'Thinger.io', 'Firebase', 'IoT', 'Real-time'],
    liveLink: null,
    gitLink: 'https://github.com/myusufa120',
    images: [
      imgMIotLanding,
      imgMIotLogin,
      imgMIotDashboard,
      imgMIotDevice,
      imgMIotDetailDevice,
      imgMIotDeviceControl,
      imgMIotClaim,
      imgMIotConsole,
      imgMIotDataLogger,
      imgMIotStatistik,
      imgMIotFirmware,
    ]
  },
  // ── Baris 2: Tanpa gambar ──
  {
    systemId: 'SYS-01',
    title: 'Hybrid Cloud IoT Device Manager',
    description: 'Designed a hybrid cloud management dashboard for microcontrollers. Features hardware self-diagnostics via I2C and ADC path monitoring, Tri-Method OTA firmware deployments (local mDNS, WebSockets, cloud), and user-to-device affinity.',
    type: 'iot',
    status: 'private',
    tags: ['ESP32', 'Firebase RTDB', 'Thinger.io', 'C++', 'WebSocket', 'Flutter'],
    liveLink: null,
    gitLink: 'https://github.com/myusufa120'
  },
  {
    systemId: 'APP-01',
    title: 'BIMO Employee Management App',
    description: 'Developed and styled UI components for the BIMO mobile client using Flutter. Integrated dynamic REST API endpoints, set up role-based access control (RBAC), and designed geolocation checks to validate attendance records.',
    type: 'mobile',
    status: 'private',
    tags: ['Flutter', 'Dart', 'REST API', 'RBAC', 'Geolocation', 'UI/UX'],
    liveLink: null,
    gitLink: 'https://github.com/myusufa120'
  },
  {
    systemId: 'SYS-02',
    title: 'Secure WFH/WFO Presence Portal',
    description: 'Attendance web system optimized for mobile devices. Implemented strict geolocation locking within 100m coordinates limits, time-window locks, camera API live captures, and device validation filters.',
    type: 'web',
    status: 'private',
    tags: ['Google Apps Script', 'HTML/CSS', 'Geolocation', 'Camera API', 'Automation'],
    liveLink: null,
    gitLink: 'https://github.com/myusufa120'
  },
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') return projects
  return projects.filter(p => p.type === selectedCategory.value)
})

const timelineEvents = [
  {
    date: 'Apr 2026 - Mei 2026',
    title: 'Full-Stack Google Apps Script Developer',
    org: 'KUPUS 1 DITKUAD - DKI Jakarta',
    desc: 'Designed and developed WFH/WFO web presence portals. Implemented tight security structures including 100m geolocation locking, automated time-window gates, mobile-only access filters, and real-time live photo captures.'
  },
  {
    date: 'Jan 2026 - Juli 2026',
    title: 'Mobile & IoT Developer',
    org: 'Universitas Semarang - Semarang',
    desc: 'Engineered hybrid cloud IoT management controllers. Built automated hardware diagnostics (I2C paths, ADC status checking), implemented Tri-Method OTA deployment architectures, and enabled secure device claiming via Firebase Auth.'
  },
  {
    date: 'Jan 2025 - Juli 2025',
    title: 'Mobile Developer (Internship)',
    org: 'PT Teknologi Aplikasi Sejahtera - Semarang',
    desc: 'Developed UI templates for the BIMO employee management application. Integrated front-end Flutter elements with REST APIs, implemented role-based accessibility, and created geolocation verification systems (Magang Excellent).'
  }
]
</script>

<template>
  <section id="projects" class="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-cyber-dark-border">
    <div class="space-y-16">
      <!-- Section Title -->
      <div class="text-center space-y-3 reveal-init">
        <div class="text-sm font-tech text-cyber-cyan tracking-widest uppercase">// DEPLOYMENT REGISTRY</div>
        <h2 class="text-4xl md:text-5xl font-hud font-extrabold text-cyber-text-title uppercase tracking-tight">Mission Logs & Projects</h2>
        <p class="text-cyber-text-main text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Filter through different sectors of engineering operations: Web, Mobile, and IoT Systems.
        </p>
      </div>

      <!-- Tab Filter Bar -->
      <div class="flex flex-wrap justify-center gap-3 font-tech text-sm reveal-init delay-150">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="selectedCategory = cat.id"
          class="px-6 py-2.5 border transition-all duration-300 rounded-full cursor-pointer font-semibold"
          :class="selectedCategory === cat.id 
            ? 'text-cyber-cyan border-cyber-cyan bg-cyber-cyan/10' 
            : 'text-cyber-text-muted border-cyber-dark-border hover:text-cyber-cyan hover:border-cyber-cyan/35'"
        >
          [ {{ cat.label }} ]
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(project, index) in filteredProjects" 
          :key="project.systemId"
          class="transition-all duration-500 transform reveal-init"
          :class="`delay-${[200, 300, 400][index] || 200}`"
        >
          <ProjectCard :project="project" />
        </div>
      </div>

      <!-- Experience Timeline Section -->
      <div class="pt-24 space-y-16">
        <div class="text-center space-y-3 reveal-init">
          <div class="text-sm font-tech text-cyber-gold tracking-widest uppercase">// ARCHIVAL CHRONOLOGY</div>
          <h2 class="text-4xl md:text-5xl font-hud font-extrabold text-cyber-text-title uppercase tracking-tight">Experience & Research</h2>
          <p class="text-cyber-text-main text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Historical log of engineering engagements, research milestones, and production deployments.
          </p>
        </div>

        <div class="relative max-w-4xl mx-auto">
          <!-- Timeline Vertical Spine Line -->
          <div class="absolute left-4 md:left-1/2 top-3 bottom-3 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyber-cyan via-cyber-gold to-cyber-green/20"></div>

          <div class="space-y-12 md:space-y-16">
            <div 
              v-for="(event, index) in timelineEvents" 
              :key="index"
              class="relative pl-10 md:pl-0 group reveal-init"
              :class="index % 2 === 0 ? 'reveal-left' : 'reveal-right'"
              :style="`transition-delay: ${200 + index * 150}ms`"
            >
              <!-- Timeline Central Node / Bullet Dot -->
              <div 
                class="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-cyber-bg border-2 z-20 transition-all duration-300 flex items-center justify-center group-hover:scale-125 shadow-sm"
                :class="index % 2 === 0 
                  ? 'border-cyber-cyan shadow-[0_0_10px_rgba(56,189,248,0.4)]' 
                  : 'border-cyber-gold shadow-[0_0_10px_rgba(245,158,11,0.4)]'"
              >
                <div 
                  class="w-1.5 h-1.5 rounded-full transition-colors"
                  :class="index % 2 === 0 ? 'bg-cyber-cyan' : 'bg-cyber-gold'"
                ></div>
              </div>

              <!-- Content Row Grid -->
              <div class="md:grid md:grid-cols-2 md:gap-16 items-center">
                <!-- Header / Role Info Block -->
                <div 
                  class="space-y-2"
                  :class="index % 2 === 0 ? 'md:text-right md:order-1' : 'md:text-left md:order-2'"
                >
                  <span 
                    class="inline-block px-3 py-1 rounded-md text-xs font-tech font-bold tracking-wider"
                    :class="index % 2 === 0 
                      ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan' 
                      : 'bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold'"
                  >
                    // {{ event.date }}
                  </span>
                  <h3 
                    class="text-lg md:text-xl font-hud font-bold text-cyber-text-title transition-colors"
                    :class="index % 2 === 0 ? 'group-hover:text-cyber-cyan' : 'group-hover:text-cyber-gold'"
                  >
                    {{ event.title }}
                  </h3>
                  <p class="text-cyber-text-muted text-xs md:text-sm font-tech tracking-wide">{{ event.org }}</p>
                </div>

                <!-- Description Card Block -->
                <div 
                  class="mt-3 md:mt-0 text-left"
                  :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'"
                >
                  <div 
                    class="p-6 rounded-2xl border border-cyber-dark-border bg-cyber-card/75 backdrop-blur-sm transition-all duration-300 shadow-sm relative group-hover:shadow-md"
                    :class="index % 2 === 0 ? 'group-hover:border-cyber-cyan/40' : 'group-hover:border-cyber-gold/40'"
                  >
                    <p class="text-cyber-text-main text-sm leading-relaxed font-sans">
                      {{ event.desc }}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
