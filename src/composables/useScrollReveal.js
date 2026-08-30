import { onMounted, onUnmounted } from 'vue'

/**
 * useScrollReveal
 * Observes all .reveal-init elements inside the given containerSelector (or globally if null)
 * and adds .revealed when they enter the viewport.
 *
 * @param {string|null} containerSelector - CSS selector of the container, or null for document-wide
 */
export function useScrollReveal(containerSelector = null) {
  let observer = null

  const setup = () => {
    const root = containerSelector
      ? document.querySelector(containerSelector)
      : document
    if (!root) return

    const elements = root.querySelectorAll('.reveal-init')
    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.05
      }
    )

    elements.forEach((el) => observer.observe(el))
  }

  onMounted(() => {
    // Use requestAnimationFrame x2 to ensure elements are painted in hidden state first
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setup()
      })
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
