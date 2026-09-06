// ==========================================================================
// CARRUSEL INTERACTIVO DE IMÁGENES
// **Este archivo se creó con ayuda de Inteligencia Artificial**
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. SELECCIÓN DE ELEMENTOS DEL DOM
  // ------------------------------------------------------------------------
  const slides = document.querySelectorAll('.carousel-slide');           // Lista de diapositivas con imágenes
  const dots = document.querySelectorAll('.carousel-dots .dot');         // Puntos indicadores inferiores
  const prevBtn = document.getElementById('prevBtn');                    // Botón flecha izquierda (Anterior)
  const nextBtn = document.getElementById('nextBtn');                    // Botón flecha derecha (Siguiente)
  const carousel = document.getElementById('carousel');                  // Contenedor principal del carrusel

  // Si no existen diapositivas en la página, se interrumpe la ejecución para evitar errores
  if (!slides.length) return;

  // ------------------------------------------------------------------------
  // 2. ESTADO DEL CARRUSEL
  // ------------------------------------------------------------------------
  let currentIndex = 0;              // Índice de la diapositiva actualmente visible (0 = primera imagen)
  let autoSlideInterval = null;      // Identificador del temporizador para la rotación automática

  // ------------------------------------------------------------------------
  // 3. FUNCIÓN PRINCIPAL DE VISUALIZACIÓN DE DIAPOSITIVA
  // ------------------------------------------------------------------------
  /**
   * Muestra la diapositiva en el índice proporcionado y actualiza los indicadores.
   * Maneja el ciclo circular: si se pasa del final vuelve al inicio y viceversa.
   * @param {number} index - Índice de la diapositiva objetivo
   */
  function showSlide(index) {
    // Manejo circular hacia adelante y hacia atrás
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    // Activa la diapositiva correspondiente y desactiva las demás
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    // Actualiza el punto indicador activo según el índice actual
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Avanza a la siguiente diapositiva
  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  // Retrocede a la diapositiva anterior
  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // ------------------------------------------------------------------------
  // 4. MANEJADORES DE EVENTOS DE CLIC (Flechas y Puntos)
  // ------------------------------------------------------------------------
  // Botón Siguiente
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide(); // Reinicia el temporizador al interactuar manualmente
    });
  }

  // Botón Anterior
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  // Puntos indicadores (dots): permiten ir directamente a cualquier foto
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoSlide();
    });
  });

  // ------------------------------------------------------------------------
  // 5. TEMPORIZADOR PARA ROTACIÓN AUTOMÁTICA (Auto-slide)
  // ------------------------------------------------------------------------
  /**
   * Inicia el cambio automático de imagen cada 6 segundos.
   */
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
  }

  /**
   * Reinicia el temporizador tras una interacción manual del usuario.
   */
  function resetAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
  }

  // ------------------------------------------------------------------------
  // 6. INTERACCIÓN DE RATÓN Y GESTOS TÁCTILES (Hover y Swipe)
  // ------------------------------------------------------------------------
  if (carousel) {
    // Pausa la rotación automática cuando el usuario pasa el ratón por encima
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    // Reanuda la rotación cuando el usuario retira el ratón
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Detección de gestos táctiles (deslizar en móviles/tabletas)
    let touchStartX = 0;

    // Guarda la coordenada X donde inicia el toque en la pantalla
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    // Compara con la coordenada final para determinar si el swipe fue a la izquierda o derecha
    carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = 50; // Umbral mínimo en píxeles para reconocer el gesto

      if (touchStartX - touchEndX > swipeDistance) {
        // Deslizado a la izquierda -> Siguiente foto
        nextSlide();
        resetAutoSlide();
      } else if (touchEndX - touchStartX > swipeDistance) {
        // Deslizado a la derecha -> Foto anterior
        prevSlide();
        resetAutoSlide();
      }
    }, { passive: true });
  }

  // Inicializa el temporizador automático al cargar la página
  startAutoSlide();
});
