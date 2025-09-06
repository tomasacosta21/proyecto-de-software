// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
      })
    })
  }

  const themeToggle = document.querySelector(".theme-toggle")
  if (themeToggle) {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", currentTheme)

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
    })
  }

  const carouselTrack = document.querySelector(".carousel-track")
  const prevBtn = document.querySelector(".carousel-prev")
  const nextBtn = document.querySelector(".carousel-next")

  if (carouselTrack && prevBtn && nextBtn) {
    let currentIndex = 0
    const cards = document.querySelectorAll(".project-card")
    const cardWidth = 400 + 24 // card width + gap
    const visibleCards = Math.floor(window.innerWidth / cardWidth)
    const maxIndex = Math.max(0, cards.length - visibleCards)

    function updateCarousel() {
      const translateX = -currentIndex * cardWidth
      carouselTrack.style.transform = `translateX(${translateX}px)`

      // Update button states
      prevBtn.disabled = currentIndex === 0
      nextBtn.disabled = currentIndex >= maxIndex
    }

    function goToNext() {
      if (currentIndex < maxIndex) {
        currentIndex++
        updateCarousel()
      }
    }

    function goToPrev() {
      if (currentIndex > 0) {
        currentIndex--
        updateCarousel()
      }
    }

    prevBtn.addEventListener("click", goToPrev)
    nextBtn.addEventListener("click", goToNext)

    // Handle window resize
    window.addEventListener("resize", () => {
      const newVisibleCards = Math.floor(window.innerWidth / cardWidth)
      const newMaxIndex = Math.max(0, cards.length - newVisibleCards)

      if (currentIndex > newMaxIndex) {
        currentIndex = newMaxIndex
      }

      updateCarousel()
    })

    // Initialize carousel
    updateCarousel()

    // Add touch/swipe support for mobile
    let startX = 0
    let isDragging = false

    carouselTrack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
      isDragging = true
    })

    carouselTrack.addEventListener("touchmove", (e) => {
      if (!isDragging) return
      e.preventDefault()
    })

    carouselTrack.addEventListener("touchend", (e) => {
      if (!isDragging) return

      const endX = e.changedTouches[0].clientX
      const diffX = startX - endX

      if (Math.abs(diffX) > 50) {
        // Minimum swipe distance
        if (diffX > 0) {
          goToNext()
        } else {
          goToPrev()
        }
      }

      isDragging = false
    })
  }

  // Contact Form Handler
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Simple validation
      if (!data.nombre || !data.email || !data.mensaje) {
        alert("Por favor completa todos los campos requeridos.")
        return
      }

      // Simulate form submission
      alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
      contactForm.reset()
    })
  }

  // Set active navigation based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
})
