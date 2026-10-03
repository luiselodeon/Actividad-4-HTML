// Script carrusel.js
// Funcionalidades: Carrusel interactivo de imagenes (JavaScript) y Efectos Hover y Doble Clic (jQuery)


// 1. CARRUSEL INTERACTIVO (JavaScript Nativo)

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carousel = document.getElementById('carousel');

  // Si no existen diapositivas en la pagina, se interrumpe la ejecucion para evitar errores
  if (!slides.length) return;

  let currentIndex = 0;
  let autoSlideInterval = null;

  /**
   * Muestra la diapositiva en el indice proporcionado y actualiza los indicadores.
   * Maneja el ciclo circular: si se pasa del final vuelve al inicio y viceversa.
   * @param {number} index - Indice de la diapositiva objetivo
   */
  function showSlide(index) {
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
  }

  function resetAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
  }

  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', startAutoSlide);

    let touchStartX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = 50;

      if (touchStartX - touchEndX > swipeDistance) {
        nextSlide();
        resetAutoSlide();
      } else if (touchEndX - touchStartX > swipeDistance) {
        prevSlide();
        resetAutoSlide();
      }
    }, { passive: true });
  }

  startAutoSlide();
});


// 2. EFECTOS JQUERY EN IMAGENES (.img-roy)

$(document).ready(function () {
  // Cuando esta el mouse en hover
  // Tambien modifica a los hermanos (DOM)
  $('.img-roy').on('mouseenter', function () {
    // Manipulacion DOM: siblings()
    $(this).siblings('.img-roy').stop().fadeTo(250, 0.3);
    $(this).css('transform', 'scale(1.1)');
  });

  // Cuando el mouse sale del hover de la imagen
  $('.img-roy').on('mouseleave', function () {
    $(this).siblings('.img-roy').stop().fadeTo(250, 1.0);
    $(this).css('transform', 'scale(1.0)');
  });

  // Un efecto de doble click a una imagen
  $('.img-roy').on('dblclick', function () {
    let $imagen = $(this);
    $imagen.fadeOut(300, function () {
      $imagen.fadeIn(300);
    });
  });
});
