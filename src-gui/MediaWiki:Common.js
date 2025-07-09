mw.hook('wikipage.content').add(function () {
  console.log("[Language Menu] Script started");

  var path = mw.config.get("wgPageName");
  console.log("[Language Menu] Current path:", path);

  var currentLang = '';
  var base = path;
  var langs = ['pt', 'en', 'es'];

  // Detecta o idioma atual com base no sufixo
  langs.forEach(function (lang) {
    var suffix = '/' + lang;
    if (path.toLowerCase().endsWith(suffix)) {
      currentLang = lang;
      base = path.slice(0, -suffix.length);
      console.log("[Language Menu] Detected language:", lang, "Base:", base);
    }
  });

  // Links e rótulos dos idiomas
  var links = {};
  var labels = {
    'pt': 'Português',
    'en': 'English',
    'es': 'Español'
  };

  // --- ALTERAÇÃO 1: Definir links de forma mais robusta ---
  // Se a página atual é uma das páginas principais (Main_Page ou Página_principal),
  // os links do menu devem apontar explicitamente para as suas versões principais.
  if (base === 'Main_Page' || base === 'Página_principal') {
    links = {
      'pt': 'Página_principal', // Link para a página principal em português
      'en': 'Main_Page/en',    // Link para a página principal em inglês
      'es': 'Main_Page/es'     // Link para a página principal em espanhol
    };
  } else {
    // Para páginas regulares, adiciona/remove o sufixo de idioma
    links = {
      'pt': base,           // Português (sem sufixo)
      'en': base + '/en',
      'es': base + '/es'
    };
  }
  // --- FIM DA ALTERAÇÃO 1 ---

  // Preenche o menu
  function insertContent(id, lang) {
    var el = document.getElementById(id);
    if (!el) {
      console.warn("[Language Menu] Element not found:", id);
      return;
    }

    // Se está na versão "sem idioma", trata como "pt"
    var effectiveLang = currentLang || 'pt';

    if (lang === effectiveLang) {
      el.textContent = labels[lang];
    } else {
      // --- ALTERAÇÃO 2: Adicionar classe para excluir da reescrita ---
      el.innerHTML = '<a class="lang-menu-link" href="' + mw.util.getUrl(links[lang]) + '">' + labels[lang] + '</a>';
      // --- FIM DA ALTERAÇÃO 2 ---
    }
  }

  insertContent("link-pt", "pt");
  insertContent("link-en", "en");
  insertContent("link-es", "es");

  // 🌀 Reescreve os links internos somente se o idioma for reconhecido
  if (langs.includes(currentLang) && base !== path) {
    console.log("[Language Menu] Rewriting internal links for:", currentLang);

    // --- ALTERAÇÃO 3: Excluir links com a classe 'lang-menu-link' ---
    document.querySelectorAll('a[href^="/wiki/"]:not(.lang-menu-link)').forEach(function (link) {
    // --- FIM DA ALTERAÇÃO 3 ---
      var href = link.getAttribute('href');
      if (!href) return;

      // Remove barra final e decodifica
      var hrefNormalized = decodeURIComponent(href.replace(/\/$/, ''));

      // Ignora links com parâmetros, âncoras ou namespaces especiais
      if (href.includes('?') || href.includes('#')) return;
      if (hrefNormalized.match(/\/wiki\/(Special:|File:|Category:|Help:|MediaWiki:)/)) return;

      // Tratamento especial para Main_Page e Página_principal
      // Esta lógica é para links DENTRO do conteúdo da página, não os do menu.
      if (hrefNormalized === '/wiki/Main_Page') {
        if (currentLang === 'en') {
          link.setAttribute('href', '/wiki/Main_Page/en');
          console.log("[Language Menu] Main_Page → Main_Page/en");
        } else {
          link.setAttribute('href', '/wiki/Página_principal'); // Removido o '/' final desnecessário
          console.log("[Language Menu] Main_Page → Página_principal");
        }
        return;
      }

      if (hrefNormalized === '/wiki/Página_principal') {
        if (currentLang === 'en') {
          link.setAttribute('href', '/wiki/Main_Page/en');
          console.log("[Language Menu] Página_principal → Main_Page/en");
        } else {
          link.setAttribute('href', '/wiki/Página_principal'); // Removido o '/' final desnecessário
          console.log("[Language Menu] Página_principal → Página_principal");
        }
        return;
      }

      // Ignora se já tem idioma
      if (hrefNormalized.match(/\/(pt|en|es)$/)) return;

      // Ignora se o link é para a própria página base sem idioma
      if (hrefNormalized === '/wiki/' + base) return;

      // Adiciona idioma ao final
      var newHref = href + '/' + currentLang;
      link.setAttribute('href', newHref);
      console.log("[Language Menu] Link modificado:", href, "→", newHref);
    });
  } else {
    console.log("[Language Menu] Nenhum idioma detectado — links não modificados.");
  }
});
