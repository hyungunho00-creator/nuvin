/* ═══════════════════════════════════════
   NUVIN — App JS (재작성)
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. 햄버거 메뉴 (모바일) ── */
  const nav = document.getElementById('nav');
  const ham = document.getElementById('ham');
  if (ham) {
    ham.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      ham.textContent = nav.classList.contains('nav-open') ? '✕' : '☰';
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        ham.textContent = '☰';
      });
    });
  }

  /* ── 2. 네비 스크롤 그림자 ── */
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,.09)' : 'none';
  }, { passive: true });

  /* ── 3. 위로 가기 버튼 ── */
  const stb = document.getElementById('stb');
  if (stb) {
    window.addEventListener('scroll', () => {
      stb.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    stb.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── 4. Fade-in Observer ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fi').forEach(el => observer.observe(el));

  /* ── 5. 히어로 숫자 카운터 ── */
  let counted = false;
  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.hs-n[data-t]').forEach(el => {
          animCount(el, parseInt(el.dataset.t, 10));
        });
        heroObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const heroEl = document.getElementById('hero');
  if (heroEl) heroObs.observe(heroEl);

  function animCount(el, target) {
    const dur = 2000;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString('ko-KR');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ── 6. 멘토 플로우 아코디언 (모바일) ── */
  document.querySelectorAll('.fc-head').forEach(head => {
    head.addEventListener('click', () => {
      const card = head.closest('.fc');
      // 모바일에서만 토글 (데스크톱은 CSS로 항상 오픈)
      if (window.innerWidth < 900) {
        card.classList.toggle('open');
      }
    });
  });

  /* ── 7. 수익 탭 전환 (homecare + data 추가) ── */
  const tabs = document.querySelectorAll('.rtab');
  const panels = document.querySelectorAll('.rtab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const t = tab.dataset.tab;
      tabs.forEach(x => x.classList.remove('on'));
      panels.forEach(p => p.classList.remove('on'));
      tab.classList.add('on');
      const panel = document.getElementById(`tp-${t}`);
      if (panel) {
        panel.classList.add('on');
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(10px)';
        requestAnimationFrame(() => {
          panel.style.transition = 'opacity .3s ease, transform .3s ease';
          panel.style.opacity = '1';
          panel.style.transform = 'none';
        });
      }
    });
  });

  /* ── 8. 스무스 스크롤 ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 54; // nav 높이
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 9. 현재 섹션 네비 하이라이트 ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('cur'));
        const cur = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (cur) cur.classList.add('cur');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObs.observe(s));

  /* ── 10. 히어로 즉시 페이드인 ── */
  setTimeout(() => {
    document.querySelectorAll('#hero .fi').forEach((el, i) => {
      setTimeout(() => el.classList.add('on'), i * 180);
    });
  }, 80);

  /* ── 11. 로드맵 호버 ── */
  document.querySelectorAll('.rphase').forEach(ph => {
    ph.addEventListener('mouseenter', () => {
      ph.style.transform = 'translateY(-3px)';
      ph.style.transition = 'transform .28s ease, box-shadow .28s ease';
      ph.style.boxShadow = '0 12px 40px rgba(0,0,0,.14)';
    });
    ph.addEventListener('mouseleave', () => {
      ph.style.transform = '';
      ph.style.boxShadow = '';
    });
  });

  /* ── 12. BEP 행 호버 ── */
  document.querySelectorAll('.bept-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      if (!row.classList.contains('bpt') && !row.classList.contains('hl')) {
        row.style.transform = 'translateX(3px)';
        row.style.transition = 'transform .18s ease';
      }
    });
    row.addEventListener('mouseleave', () => { row.style.transform = ''; });
  });

});
