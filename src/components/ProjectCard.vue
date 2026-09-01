<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

// Returns specific color classes based on project status
const statusClasses = computed(() => {
  switch (props.project.status.toUpperCase()) {
    case 'PUBLIC':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    case 'PRIVATE':
      return 'text-rose-400 bg-rose-500/10 border-rose-500/30'
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

// ── Lightbox state ──────────────────────────────────────────────
const lightboxOpen = ref(false)
const activeIndex = ref(0)

const hasImages = computed(() => props.project.images && props.project.images.length > 0)

function openLightbox(index = 0) {
  activeIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + props.project.images.length) % props.project.images.length
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % props.project.images.length
}

function onKeydown(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'Escape') closeLightbox()
}

// Touch/drag swipe support
const touchStartX = ref(0)
function onTouchStart(e) { touchStartX.value = e.touches[0].clientX }
function onTouchEnd(e) {
  const delta = touchStartX.value - e.changedTouches[0].clientX
  if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

// Human-readable image labels derived from filenames
function imageLabel(url) {
  try {
    const name = decodeURIComponent(url.split('/').pop().replace(/\.\w+$/, ''))
    return name.replace(/_/g, ' ')
  } catch {
    return ''
  }
}
</script>

<template>
  <div
    class="relative flex flex-col h-full rounded-2xl border border-cyber-border/30 bg-cyber-card/80 backdrop-blur-sm shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(56,189,248,0.18)] hover:border-cyber-cyan/40 hologram-card cursor-default group p-6"
  >
    
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
      <div class="my-4 bg-cyber-card/40 border border-cyber-dark-border rounded-xl flex items-center justify-center relative overflow-hidden bg-dot-matrix"
           :class="hasImages ? (project.type === 'mobile' ? 'h-60 p-3 cursor-pointer' : 'h-52 p-0 cursor-pointer') : 'h-44 p-3'">
        
        <!-- ── MOBILE: Screenshot inside phone frame ── -->
        <template v-if="hasImages && project.type === 'mobile'">
          <div class="phone-wrap group/phone" @click="openLightbox(0)">
            <!-- Side buttons (decorative) -->
            <div class="ph-vol" style="top:22%;height:9%"></div>
            <div class="ph-vol" style="top:34%;height:9%"></div>
            <div class="ph-pwr"></div>
            <!-- Body -->
            <div class="ph-body">
              <!-- Dynamic Island -->
              <div class="ph-island"></div>
              <!-- Screen -->
              <div class="ph-screen">
                <img
                  :src="project.images[0]"
                  :alt="project.title"
                  class="w-full h-full object-contain object-top transition-transform duration-500 group-hover/phone:scale-[1.02]"
                />
                <div class="ph-overlay">
                  <span class="ph-ov-icon">⊕</span>
                  <span class="ph-ov-label">VIEW SCREENS</span>
                  <span class="ph-ov-count">{{ project.images.length }} screenshots</span>
                </div>
              </div>
              <!-- Home bar -->
              <div class="ph-bar"><div class="ph-pill"></div></div>
            </div>
          </div>
        </template>

        <!-- ── WEB: Full-bleed thumbnail ── -->
        <template v-else-if="hasImages && project.type !== 'mobile'">
          <img
            :src="project.images[0]"
            :alt="project.title"
            class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            @click="openLightbox(0)"
          />
          <!-- Overlay hint -->
          <div
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 pointer-events-none"
          >
            <span class="text-white text-2xl">🖼</span>
            <span class="text-white font-tech text-xs tracking-widest">CLICK TO VIEW ALL SCREENS</span>
            <span class="text-white/60 font-tech text-[10px]">{{ project.images.length }} SCREENSHOTS</span>
          </div>
          <!-- Clickable layer -->
          <div class="absolute inset-0 cursor-pointer" @click="openLightbox(0)"></div>
        </template>

        <!-- Case 1: Mobile Phone Mockup -->
        <div v-else-if="project.type === 'mobile'" class="relative w-22 h-36 border border-cyber-dark-border bg-cyber-bg rounded-xl p-1.5 shadow-md shadow-black/10 flex flex-col justify-between">
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
          <button
            v-if="hasImages"
            @click="openLightbox(0)"
            class="text-cyber-cyan hover:underline flex items-center gap-1 font-semibold transition-all cursor-pointer"
          >
            VIEW_SCREENS ↗
          </button>
          <a 
            v-if="project.liveLink" 
            :href="project.liveLink" 
            target="_blank" 
            class="text-cyber-cyan hover:underline flex items-center gap-1 font-semibold transition-all"
          >
            LIVE_DEMO ↗
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

  <!-- ══════════════════════════════════════════════════════
       LIGHTBOX MODAL
  ══════════════════════════════════════════════════════ -->
  <Teleport to="body">
    <Transition name="lb">
      <div
        v-if="lightboxOpen && hasImages"
        class="lightbox-overlay"
        @click.self="closeLightbox"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <!-- Modal shell -->
        <div class="lightbox-shell" :class="project.type === 'mobile' ? 'lightbox-shell--mobile' : ''">

          <!-- ── Top bar ── -->
          <div class="lb-topbar">
            <div class="lb-title font-tech text-cyber-cyan text-xs tracking-widest truncate">
              {{ project.title }} &nbsp;/&nbsp;
              <span class="text-cyber-text-muted">{{ imageLabel(project.images[activeIndex]) }}</span>
            </div>
            <div class="lb-counter font-tech text-xs text-cyber-text-muted">
              {{ activeIndex + 1 }} / {{ project.images.length }}
            </div>
            <button class="lb-close" @click="closeLightbox" aria-label="Close">✕</button>
          </div>

          <!-- ── Image stage ── -->
          <div class="lb-stage">
            <!-- Prev arrow -->
            <button class="lb-arrow lb-arrow-left" @click="prev" aria-label="Previous">‹</button>

            <Transition name="slide" mode="out-in">
              <!-- Single wrapper keyed per slide so Transition animates correctly -->
              <div :key="activeIndex" class="lb-slide-wrapper" :class="project.type === 'mobile' ? 'lb-slide-mobile' : 'lb-slide-web'">

                <!-- MOBILE: modern phone frame -->
                <template v-if="project.type === 'mobile'">
                  <div class="lb-phone-wrap">
                    <div class="ph-vol" style="top:22%;height:9%"></div>
                    <div class="ph-vol" style="top:34%;height:9%"></div>
                    <div class="ph-pwr"></div>
                    <div class="ph-body lb-ph-body">
                      <div class="ph-island lb-ph-island"></div>
                      <div class="ph-screen">
                        <img
                          :src="project.images[activeIndex]"
                          :alt="imageLabel(project.images[activeIndex])"
                          class="w-full h-full object-contain object-top"
                        />
                      </div>
                      <div class="ph-bar"><div class="ph-pill"></div></div>
                    </div>
                  </div>
                </template>

                <!-- WEB / other: plain image -->
                <template v-else>
                  <img
                    :src="project.images[activeIndex]"
                    :alt="imageLabel(project.images[activeIndex])"
                    class="lb-image"
                  />
                </template>

              </div>
            </Transition>

            <!-- Next arrow -->
            <button class="lb-arrow lb-arrow-right" @click="next" aria-label="Next">›</button>
          </div>


          <!-- ── Thumbnail strip ── -->
          <div class="lb-strip">
            <button
              v-for="(img, i) in project.images"
              :key="i"
              class="lb-thumb"
              :class="{ 'lb-thumb--active': i === activeIndex }"
              @click="activeIndex = i"
            >
              <img :src="img" :alt="`Screen ${i + 1}`" />
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ══════════════════════════════════════════
   LIGHTBOX OVERLAY
══════════════════════════════════════════ */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.lightbox-shell {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  max-height: 92vh;
  background: #0d1117;
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 60px rgba(56, 189, 248, 0.15), 0 0 120px rgba(0,0,0,0.6);
}

.lightbox-shell--mobile {
  max-width: 460px;
}
.lightbox-shell--mobile .lb-arrow-left  { left:  0.4rem; }
.lightbox-shell--mobile .lb-arrow-right { right: 0.4rem; }

/* ── Top bar ── */
.lb-topbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  flex-shrink: 0;
}
.lb-title { flex: 1; min-width: 0; }
.lb-counter { white-space: nowrap; }
.lb-close {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
}
.lb-close:hover { background: rgba(255,255,255,0.15); }

/* ── Image stage ── */
.lb-stage {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #080c10;
  min-height: 0;
}
.lb-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0;
  display: block;
  user-select: none;
}

/* ── Arrows ── */
.lb-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(56,189,248,0.25);
  color: rgba(56,189,248,0.9);
  font-size: 2.5rem;
  line-height: 1;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  padding-bottom: 3px;
}
.lb-arrow:hover {
  background: rgba(56,189,248,0.18);
  color: #38bdf8;
}
.lb-arrow:active { transform: translateY(-50%) scale(0.92); }
.lb-arrow-left  { left:  0.75rem; }
.lb-arrow-right { right: 0.75rem; }

/* ── Thumbnail strip ── */
.lb-strip {
  display: flex;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  overflow-x: auto;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(56,189,248,0.3) transparent;
}
.lb-strip::-webkit-scrollbar { height: 4px; }
.lb-strip::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 2px; }

.lb-thumb {
  flex-shrink: 0;
  width: 70px;
  height: 46px;
  border-radius: 0.375rem;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color 0.2s, opacity 0.2s;
  opacity: 0.55;
  background: #0d1117;
  padding: 0;
}
.lb-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}
.lb-thumb:hover { opacity: 0.85; }
.lb-thumb--active {
  border-color: #38bdf8;
  opacity: 1;
}

/* ══════════════════════════════════════════
   TRANSITIONS
══════════════════════════════════════════ */
.lb-enter-active,
.lb-leave-active { transition: opacity 0.25s ease; }
.lb-enter-from,
.lb-leave-to { opacity: 0; }

.slide-enter-active,
.slide-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.slide-enter-from   { opacity: 0; transform: translateX(28px); }
.slide-leave-to     { opacity: 0; transform: translateX(-28px); }

/* Slide wrapper inside Transition */
.lb-slide-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.lb-slide-mobile {
  /* centres the phone frame */
  padding: 1rem 4rem;
  box-sizing: border-box;
}
.lb-slide-web {
  /* fills stage for web screenshots */
  align-items: stretch;
}
.lb-slide-web .lb-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ═══════════════════════════════════════════
   PHONE FRAME — CARD
═══════════════════════════════════════════ */
.phone-wrap {
  position: relative;
  height: 100%;
  aspect-ratio: 9 / 19.5;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
  filter: drop-shadow(0 6px 20px rgba(0,0,0,0.55))
          drop-shadow(0 0 10px rgba(56,189,248,0.08));
}
.phone-wrap:hover {
  transform: translateY(-3px);
  filter: drop-shadow(0 10px 28px rgba(0,0,0,0.65))
          drop-shadow(0 0 18px rgba(56,189,248,0.25));
}

/* Side buttons */
.ph-vol {
  position: absolute;
  left: -3px;
  width: 3px;
  background: #252d3d;
  border-radius: 2px 0 0 2px;
  box-shadow: inset 1px 0 0 rgba(255,255,255,0.08);
}
.ph-pwr {
  position: absolute;
  right: -3px;
  top: 28%;
  height: 12%;
  width: 3px;
  background: #252d3d;
  border-radius: 0 2px 2px 0;
  box-shadow: inset -1px 0 0 rgba(255,255,255,0.08);
}

/* Main body — rectangular modern smartphone */
.ph-body {
  width: 100%;
  height: 100%;
  /* Dark metallic gradient like a real phone back */
  background: linear-gradient(160deg, #1a1f2e 0%, #0d1017 50%, #151a26 100%);
  border: 2px solid #252d3d;
  border-radius: 1rem;            /* kotak, bukan lonjong */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.10),
    inset 0 -1px 0 rgba(0,0,0,0.4);
}

/* Hole-punch camera bar */
.ph-island {
  flex-shrink: 0;
  height: 20px;
  background: #080c14;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.ph-island::after {
  content: '';
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #000;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 0 4px rgba(56,189,248,0.25);
}

/* Screen — flush, no margin */
.ph-screen {
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #000;
  margin: 0;
  border-radius: 0;
}

/* Hover overlay */
.ph-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(2px);
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: opacity 0.25s;
  z-index: 5;
}
.phone-wrap:hover .ph-overlay { opacity: 1; }
.ph-ov-icon  { font-size: 1.3rem; color: #38bdf8; line-height: 1; }
.ph-ov-label { font-size: 9px; font-family: monospace; letter-spacing: 0.14em; color: #fff; text-transform: uppercase; font-weight: 600; }
.ph-ov-count { font-size: 8px; color: rgba(255,255,255,0.4); font-family: monospace; }

/* Home bar */
.ph-bar {
  flex-shrink: 0;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ph-pill {
  width: 35%;
  height: 3px;
  background: rgba(255,255,255,0.18);
  border-radius: 99px;
}


/* ═══════════════════════════════════════════
   PHONE FRAME — LIGHTBOX
═══════════════════════════════════════════ */
.lb-phone-wrap {
  position: relative;
  height: 420px;
  width: auto;
  aspect-ratio: 9 / 19.5;
  flex-shrink: 0;
  filter: drop-shadow(0 8px 32px rgba(0,0,0,0.7))
          drop-shadow(0 0 20px rgba(56,189,248,0.20));
}

/* Lightbox body inherits ph-body + overrides */
.lb-ph-body {
  border: 2px solid rgba(56,189,248,0.30) !important;
  border-radius: 1rem !important;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.10),
    0 0 0 1px rgba(56,189,248,0.08) !important;
}
.lb-ph-island {
  height: 22px !important;
  margin-top: 0 !important;
}
</style>
