document.addEventListener('DOMContentLoaded', () => {

  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/919876543210?text=Namaste%20Aryan!%20WildLens%20website%20se%20contact%20kar%20raha%20hoon.';
  waBtn.target = '_blank';
  waBtn.className = 'wa-btn';
  waBtn.innerHTML = `<span style="font-size:1.5rem">📱</span><div class="wa-tooltip">WhatsApp pe chat karo!</div>`;
  waBtn.title = 'Chat on WhatsApp';
  document.body.appendChild(waBtn);

  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top';
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.title = 'Scroll to top';
  scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  const themePanel = document.createElement('div');
  themePanel.className = 'theme-toggle';
  themePanel.innerHTML = `
    <button class="theme-btn active" id="t-dark" title="Dark Mode" onclick="setTheme('dark')">🌙</button>
    <button class="theme-btn" id="t-light" title="Light Mode" onclick="setTheme('light')">☀️</button>
    <button class="theme-btn" id="t-forest" title="Forest Mode" onclick="setTheme('forest')">🌿</button>
  `;
  document.body.appendChild(themePanel);

  window.setTheme = (theme) => {
    document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      document.getElementById('t-light').classList.add('active');
    } else if (theme === 'forest') {
      document.body.style.setProperty('--black', '#061208');
      document.body.style.setProperty('--green', '#0d2e14');
      document.getElementById('t-forest').classList.add('active');
    } else {
      document.body.classList.remove('light-mode');
      document.body.style.removeProperty('--black');
      document.body.style.removeProperty('--green');
      document.getElementById('t-dark').classList.add('active');
    }
    localStorage.setItem('wl-theme', theme);
  };

  const saved = localStorage.getItem('wl-theme');
  if (saved) setTheme(saved);

  if (!localStorage.getItem('wl-cookies')) {
    const cookie = document.createElement('div');
    cookie.className = 'cookie-banner';
    cookie.innerHTML = `
      <div class="cookie-text">
        🍪 Hum cookies use karte hain aapka experience better banane ke liye. 
        <a href="#">Privacy Policy</a> padhein.
      </div>
      <div class="cookie-btns">
        <button class="cookie-decline" onclick="dismissCookie()">Decline</button>
        <button class="cookie-accept" onclick="acceptCookie()">Accept All</button>
      </div>
    `;
    document.body.appendChild(cookie);
    setTimeout(() => cookie.classList.add('show'), 1500);

    window.acceptCookie = () => { localStorage.setItem('wl-cookies', 'accepted'); cookie.remove(); };
    window.dismissCookie = () => { localStorage.setItem('wl-cookies', 'declined'); cookie.remove(); };
  }

  if (!localStorage.getItem('wl-newsletter-shown')) {
    const popup = document.createElement('div');
    popup.className = 'newsletter-popup';
    popup.id = 'nl-popup';
    popup.innerHTML = `
      <div class="nl-box">
        <button class="nl-close" onclick="closeNewsletter()">✕</button>
        <span class="nl-icon">📸</span>
        <div class="nl-title">Free Wildlife <em>Tips</em> Weekly!</div>
        <p class="nl-sub">Camera settings, safari tips, aur exclusive photo tutorials — bilkul free! 2,400+ photographers already subscribe kar chuke hain.</p>
        <div class="nl-form">
          <input class="nl-input" type="email" placeholder="aapka@email.com" id="nl-email">
          <button class="nl-submit" onclick="subscribeNewsletter()">Subscribe!</button>
        </div>
        <span class="nl-skip" onclick="closeNewsletter()">Abhi nahi, thanks</span>
      </div>
    `;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.classList.add('show');
      localStorage.setItem('wl-newsletter-shown', '1');
    }, 8000);

    popup.addEventListener('click', (e) => { if (e.target === popup) closeNewsletter(); });

    window.closeNewsletter = () => popup.classList.remove('show');
    window.subscribeNewsletter = () => {
      const email = document.getElementById('nl-email').value;
      if (email && email.includes('@')) {
        popup.querySelector('.nl-box').innerHTML = `
          <div style="text-align:center;padding:1rem">
            <span style="font-size:3rem;display:block;margin-bottom:1rem">✅</span>
            <h3 style="font-family:'Playfair Display',serif;font-size:1.5rem;color:#7cb342;margin-bottom:.5rem">Subscribed!</h3>
            <p style="font-size:.85rem;color:rgba(234,230,220,.65)">Shukriya! Pehla newsletter kal tak aa jayega. 🌿</p>
          </div>
        `;
        setTimeout(closeNewsletter, 3000);
      } else {
        document.getElementById('nl-email').style.borderColor = '#f87171';
        document.getElementById('nl-email').placeholder = 'Valid email daalo!';
      }
    };
  }

  const nav = document.querySelector('nav');
  if (nav) {
    const langDiv = document.createElement('div');
    langDiv.className = 'lang-toggle';
    langDiv.innerHTML = `
      <span class="lang-option active" id="lang-en" onclick="setLang('en')">EN</span>
      <span style="color:rgba(234,230,220,.2);font-size:.6rem">|</span>
      <span class="lang-option" id="lang-hi" onclick="setLang('hi')">हिं</span>
    `;
    nav.appendChild(langDiv);
  }

  const translations = {
    en: {
      home: 'Home', courses: 'Courses', gallery: 'Gallery',
      blog: 'Blog', videos: 'Videos', about: 'About', contact: 'Contact',
    },
    hi: {
      home: 'होम', courses: 'कोर्स', gallery: 'गैलरी',
      blog: 'ब्लॉग', videos: 'वीडियो', about: 'हमारे बारे में', contact: 'संपर्क',
    }
  };

  const navTextMap = { 'Home': 'home', 'Courses': 'courses', 'Gallery': 'gallery', 'Blog': 'blog', 'Videos': 'videos', 'About': 'about', 'Contact': 'contact' };

  window.setLang = (lang) => {
    document.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
    document.getElementById('lang-' + lang).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => {
      const key = navTextMap[a.textContent.trim()];
      if (key && translations[lang][key]) a.textContent = translations[lang][key];
    });
    localStorage.setItem('wl-lang', lang);
  };

  const savedLang = localStorage.getItem('wl-lang');
  if (savedLang === 'hi') setLang('hi');

  const loader = document.createElement('div');
  loader.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(to right,#7cb342,#c8a951);z-index:9999;width:0;transition:width .3s ease;';
  document.body.appendChild(loader);

  let w = 0;
  const iv = setInterval(() => {
    w += Math.random() * 15;
    if (w > 85) { clearInterval(iv); w = 85; }
    loader.style.width = w + '%';
  }, 100);

  window.addEventListener('load', () => {
    clearInterval(iv);
    loader.style.width = '100%';
    setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.remove(), 300); }, 200);
  });

});
