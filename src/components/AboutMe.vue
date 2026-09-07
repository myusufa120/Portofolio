<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal('#about')
</script>

<template>
  <section id="about" class="pt-16 pb-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-cyber-dark-border">
    <div class="space-y-16">
      
      <!-- Section Title -->
      <div class="text-center space-y-3 reveal-init">
        <div class="text-sm font-tech text-cyber-cyan tracking-widest uppercase">// ABOUT ME</div>
        <h2 class="text-4xl md:text-5xl font-hud font-extrabold text-cyber-text-title uppercase tracking-tight">Who I Am</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start reveal-init delay-150">
        
        <!-- Text Content (60%) -->
        <div class="lg:col-span-7 space-y-6 text-cyber-text-muted leading-relaxed font-sans text-base md:text-lg text-left md:text-justify">
          <p>
            Hello! I'm <strong class="text-cyber-text-main font-semibold">M. Yusuf Abdurrahman</strong>, a Computer Science graduate from Universitas Semarang (3.93 GPA) with <strong class="text-cyber-text-main font-semibold">Cisco Networking (CCNA)</strong> and <strong class="text-cyber-text-main font-semibold">IT Specialist Database</strong> certifications, focusing heavily on networking and IoT operations.
          </p>
          <p>
            Through my final project, I designed a <strong class="text-cyber-text-main font-semibold">centralized management and monitoring system</strong> to track data metrics and transmission stability for ESP32 devices connected to a hybrid cloud architecture. This deepened my understanding of network protocols such as <strong class="text-cyber-text-main font-semibold">TCP, WebSocket, and mDNS</strong>, while building automated notification and incident logging systems for real-time anomaly detection.
          </p>
          <p>
            The system resolves memory failure and downtime issues through a <strong class="text-cyber-text-main font-semibold">self-diagnostic mechanism</strong> and remote firmware updates using a <strong class="text-cyber-text-main font-semibold">Tri-Method OTA</strong> approach—eliminating the need for on-site physical handling. This experience has trained me to habitually analyze disruption patterns, monitor dashboards, and systematically document periodic reports.
          </p>
        </div>

        <!-- Tech/Stats Matrix or Visual Element (40%) -->
        <div class="lg:col-span-5 relative rounded-2xl border border-white/5 bg-white/[0.015] p-8 overflow-hidden group">
          <div class="absolute inset-0 bg-cyber-grid pointer-events-none opacity-20"></div>
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-cyber-cyan/10 blur-[50px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-cyber-cyan/20"></div>
          
          <div class="relative z-10 space-y-6">
            <h3 class="text-sm font-tech text-cyber-cyan tracking-widest uppercase border-b border-white/10 pb-3">Professional Focus</h3>
            
            <ul class="space-y-4 font-tech text-sm text-cyber-text-muted">
              <li class="flex items-start gap-3">
                <span class="text-cyber-cyan mt-0.5">▹</span>
                <span><strong class="text-cyber-text-main">Networking</strong> — CCNA Certified, TCP/WebSocket/mDNS protocols</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-cyber-cyan mt-0.5">▹</span>
                <span><strong class="text-cyber-text-main">IoT Architecture</strong> — Centralized monitoring, Tri-Method OTA, ESP32</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-cyber-cyan mt-0.5">▹</span>
                <span><strong class="text-cyber-text-main">Database & Cloud</strong> — IT Specialist Database, Hybrid Cloud, Logging</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-cyber-cyan mt-0.5">▹</span>
                <span><strong class="text-cyber-text-main">Mobile Development</strong> — Cross-platform apps with Flutter & Dart</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
</style>
