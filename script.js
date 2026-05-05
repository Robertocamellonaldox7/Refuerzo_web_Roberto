// ── Formulario de contacto ────────────────────────────────
function enviarFormulario() {
  const nombre  = document.getElementById('nombre');
  const email   = document.getElementById('email');
  const asunto  = document.getElementById('asunto');
  const mensaje = document.getElementById('mensaje');
  const exito   = document.getElementById('mensaje-exito');
  const btn     = document.getElementById('btn-enviar');

  // esta es la validación básica
  const campos = [nombre, email, asunto, mensaje];
  let valido = true;

  campos.forEach(campo => {
    campo.style.borderColor = '';
    if (!campo.value.trim()) {
      campo.style.borderColor = '#e05c5c';
      campo.style.boxShadow   = '0 0 0 3px rgba(224, 92, 92, 0.15)';
      valido = false;
    }
  });

  if (!valido) {
    // esta es la parte donde se sacude el botón para indicar error
    btn.style.animation = 'none';
    btn.style.transform = 'translateX(-6px)';
    setTimeout(() => { btn.style.transform = 'translateX(6px)'; }, 80);
    setTimeout(() => { btn.style.transform = 'translateX(-4px)'; }, 160);
    setTimeout(() => { btn.style.transform = 'translateX(0)'; },   240);
    return;
  }

  //aqui se encarga de simular envío
  btn.textContent = '⏳ Enviando...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = '✦ Enviar mensaje';
    btn.disabled    = false;
    btn.style.opacity = '1';
    campos.forEach(c => { c.value = ''; c.style.borderColor = ''; c.style.boxShadow = ''; });

    // aca se muestra el mensaje de éxito
    exito.classList.add('visible');
    setTimeout(() => exito.classList.remove('visible'), 5000);
  }, 1800);
}

document.addEventListener('DOMContentLoaded', () => {

  // ── Cursor personalizado ─
  const cursorDot   = document.querySelector('.cursor-dot');
  const cursorAnillo = document.querySelector('.cursor-anillo');

  let mouseX = 0, mouseY = 0;
  let anilloX = 0, anilloY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Animación suave del anillo
  function animarAnillo() {
    anilloX += (mouseX - anilloX) * 0.12;
    anilloY += (mouseY - anilloY) * 0.12;
    cursorAnillo.style.left = anilloX + 'px';
    cursorAnillo.style.top  = anilloY + 'px';
    requestAnimationFrame(animarAnillo);
  }
  animarAnillo();

  // Efecto hover del cursor sobre elementos interactivos
  const interactivos = document.querySelectorAll('a, button, .tarjeta, .nav-logo');
  interactivos.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorAnillo.style.width  = '50px';
      cursorAnillo.style.height = '50px';
      cursorAnillo.style.borderColor = 'rgba(92, 214, 92, 1)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursorAnillo.style.width  = '32px';
      cursorAnillo.style.height = '32px';
      cursorAnillo.style.borderColor = 'rgba(92, 214, 92, 0.6)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  // ── Botón intro: ingresar ─
  const btnIngresar = document.getElementById('btn-ingresar');
  const intro       = document.getElementById('intro');
  const contenido   = document.getElementById('contenido-principal');

  btnIngresar.addEventListener('click', () => {
    // Efecto de click
    btnIngresar.style.transform = 'scale(0.95)';
    setTimeout(() => {
      intro.classList.add('oculto');
      setTimeout(() => {
        intro.style.display = 'none';
        contenido.classList.add('visible');
        // Reasignar cursor a nuevos elementos
        iniciarObservadores();
      }, 900);
    }, 150);
  });

  // ── aca es donde se animan las tarjetas al hacer scroll ─
  function iniciarObservadores() {
    const tarjetas = document.querySelectorAll('.tarjeta');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('animada');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    tarjetas.forEach((tarjeta, i) => {
      tarjeta.dataset.delay = i * 150;
      observer.observe(tarjeta);
    });

    const nuevosInteractivos = document.querySelectorAll('a, button, .tarjeta');
    nuevosInteractivos.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorAnillo.style.width  = '50px';
        cursorAnillo.style.height = '50px';
        cursorAnillo.style.borderColor = 'rgba(92, 214, 92, 1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.8)';
      });
      el.addEventListener('mouseleave', () => {
        cursorAnillo.style.width  = '32px';
        cursorAnillo.style.height = '32px';
        cursorAnillo.style.borderColor = 'rgba(92, 214, 92, 0.6)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const scroll = window.pageYOffset;
    hero.style.transform = `translateY(${scroll * 0.25}px)`;
    hero.style.opacity   = 1 - scroll / 600;
  });

  // ── Efecto al hacer click en botones ─
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const ripple = document.createElement('span');
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;

    ripple.style.cssText = `
      position: absolute;
      width:  ${size}px;
      height: ${size}px;
      left:   ${e.clientX - rect.left - size / 2}px;
      top:    ${e.clientY - rect.top  - size / 2}px;
      background: rgba(255,255,255,0.25);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out forwards;
      pointer-events: none;
    `;

    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes rippleAnim {
          to { transform: scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });

  // ── Texto animado -
  function typewriter(elemento, textos, velocidad = 80, pausa = 2000) {
    if (!elemento) return;
    let textoIdx = 0;
    let charIdx  = 0;
    let borrando = false;

    function escribir() {
      const textoActual = textos[textoIdx];

      if (!borrando) {
        elemento.textContent = textoActual.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === textoActual.length) {
          borrando = true;
          setTimeout(escribir, pausa);
          return;
        }
      } else {
        elemento.textContent = textoActual.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          borrando = false;
          textoIdx = (textoIdx + 1) % textos.length;
        }
      }
      setTimeout(escribir, borrando ? velocidad / 2 : velocidad);
    }
    escribir();
  }

  // Iniciar typewriter después de que aparezca el contenido
  const btnIngresarObs = document.getElementById('btn-ingresar');
  btnIngresarObs.addEventListener('click', () => {
    setTimeout(() => {
      const tw = document.getElementById('typewriter');
      if (tw) {
        typewriter(tw, ['Elegante', 'Profesional', 'Moderno', 'Único'], 100, 1800);
      }
    }, 1200);
  });

  // ── Navegación activa al hacer scroll ─
  window.addEventListener('scroll', () => {
    const secciones = document.querySelectorAll('section[id]');
    const links     = document.querySelectorAll('.nav-links a');
    let actual = '';

    secciones.forEach(sec => {
      if (window.pageYOffset >= sec.offsetTop - 150) {
        actual = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + actual
        ? 'var(--verde-acento)'
        : '';
    });
  });

});