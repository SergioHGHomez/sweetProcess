/* =========================================================
   nolimits — aplicación de una sola página (SPA)
   Un único archivo JS para todo el sitio:
     - Catálogo de productos
     - Estado de carrito / pedidos (localStorage)
     - Navbar, footer y widget de accesibilidad
     - Enrutador por hash (#/home, #/catalogo, #/producto,
       #/carrito, #/cuenta) que dibuja cada "página" dentro
       de <main id="app">
   ========================================================= */

const NOLIMITS_PRODUCTS = [
  {
    id: "cheesecake-maracumango",
    nombre: "Cheesecake de Maracumango",
    categoria: "pasteles",
    badge: "NUEVO",
    precio: 32000,
    porciones: 8,
    tiempo: "listo en 24h",
    descCorta: "Cheesecake horneado de maracuyá y mango, con capa brûlée de fruta de la pasión.",
    descLarga:
      "Base de galleta artesanal, relleno cremoso horneado y una capa brûlée de maracuyá y mango que se prepara el mismo día de entrega. Se decora con mango y kiwi frescos.",
    imgs: [
      "assets/img/productos/cheesecake-maracumango-1.jpeg",
      "assets/img/productos/cheesecake-maracumango-2.jpeg",
    ],
    compat: { mani: true, lactosa: false, gluten: false, vegano: false },
  },
  {
    id: "cheesecake-frutos-rojos",
    nombre: "Cheesecake de Frutos Rojos",
    categoria: "pasteles",
    badge: "MÁS PEDIDO",
    precio: 30000,
    porciones: 8,
    tiempo: "listo en 24h",
    descCorta: "Cheesecake clásico cubierto con mermelada artesanal de moras, fresa y arándanos.",
    descLarga:
      "Cheesecake cremoso sobre base de galleta, cubierto con una generosa capa de mermelada casera de moras, fresas y arándanos frescos. Uno de los favoritos de nuestros clientes.",
    imgs: ["assets/img/productos/cheesecake-frutos-rojos.jpeg"],
    compat: { mani: true, lactosa: false, gluten: false, vegano: false },
  },
  {
    id: "postre-limon",
    nombre: "Postre de Limón",
    categoria: "pasteles",
    badge: "",
    precio: 8000,
    porciones: 1,
    tiempo: "listo en 4h",
    descCorta: "Porción individual de postre frío de limón con ralladura y toque de sal.",
    descLarga:
      "Postre frío individual de limón, suave y refrescante, terminado con ralladura de limón, un toque de sal de mar y una rodaja fresca. Ideal para compartir o para un antojo personal.",
    imgs: ["assets/img/productos/postre-limon.jpeg"],
    compat: { mani: true, lactosa: false, gluten: true, vegano: false },
  },
  {
    id: "tres-leches",
    nombre: "Tres Leches",
    categoria: "pasteles",
    badge: "MÁS PEDIDO",
    precio: 24000,
    porciones: 8,
    tiempo: "listo en 24h",
    descCorta: "Bizcocho de vainilla bañado en tres leches, cubierto con crema batida y un toque de canela.",
    descLarga:
      "Bizcocho de vainilla bañado en tres leches, cubierto con crema batida y un toque de canela. Se hornea en lotes pequeños cada mañana.",
    imgs: [],
    compat: { mani: true, lactosa: false, gluten: false, vegano: false },
  },
  {
    id: "flan-caramelo",
    nombre: "Flan de Caramelo",
    categoria: "pasteles",
    badge: "SIN GLUTEN",
    precio: 18000,
    porciones: 6,
    tiempo: "listo en 24h",
    descCorta: "Flan de caramelo sedoso, horneado a baño María.",
    descLarga:
      "Flan de caramelo sedoso, horneado a baño María con receta tradicional. Textura suave y caramelo casero.",
    imgs: [],
    compat: { mani: true, lactosa: false, gluten: true, vegano: false },
  },
  {
    id: "pastel-tres-chocolates",
    nombre: "Pastel Tres Chocolates",
    categoria: "pasteles",
    badge: "NUEVO",
    precio: 32000,
    porciones: 10,
    tiempo: "listo en 24h",
    descCorta: "Capas de mousse de chocolate oscuro, con leche y blanco.",
    descLarga:
      "Tres capas de mousse: chocolate oscuro, chocolate con leche y chocolate blanco, sobre base de bizcocho de cacao.",
    imgs: [],
    compat: { mani: false, lactosa: false, gluten: false, vegano: false },
  },
  {
    id: "alfajores",
    nombre: "Alfajores",
    categoria: "galletas",
    badge: "NUEVO",
    precio: 12000,
    porciones: 6,
    tiempo: "listo en 24h",
    descCorta: "Dulce de leche entre shortbread, borde de coco.",
    descLarga:
      "Dos galletas tipo shortbread rellenas de dulce de leche artesanal, con el borde cubierto de coco rallado.",
    imgs: [],
    compat: { mani: true, lactosa: false, gluten: false, vegano: false },
  },
  {
    id: "polvorones",
    nombre: "Polvorones",
    categoria: "galletas",
    badge: "",
    precio: 10000,
    porciones: 8,
    tiempo: "listo en 24h",
    descCorta: "Mantecados de almendra, azúcar glass.",
    descLarga:
      "Galletas mantecosas de almendra, espolvoreadas con azúcar glass. Se deshacen en la boca.",
    imgs: [],
    compat: { mani: false, lactosa: false, gluten: false, vegano: false },
  },
  {
    id: "cuernitos-dulces",
    nombre: "Cuernitos Dulces",
    categoria: "galletas",
    badge: "",
    precio: 9000,
    porciones: 6,
    tiempo: "listo en 24h",
    descCorta: "Cuernitos tipo croissant, glaseado de vainilla.",
    descLarga:
      "Cuernitos hojaldrados tipo croissant, horneados y terminados con un glaseado suave de vainilla.",
    imgs: [],
    compat: { mani: true, lactosa: false, gluten: true, vegano: false },
  },
  {
    id: "cafe-de-olla",
    nombre: "Café de Olla",
    categoria: "bebidas",
    badge: "",
    precio: 6000,
    porciones: 1,
    tiempo: "listo en 20 min",
    descCorta: "Café con canela y piloncillo, preparado lento.",
    descLarga:
      "Café preparado lentamente con canela y piloncillo, al estilo tradicional. Se sirve caliente.",
    imgs: [],
    compat: { mani: true, lactosa: true, gluten: true, vegano: true },
  },
  {
    id: "champurrado",
    nombre: "Champurrado",
    categoria: "bebidas",
    badge: "DE TEMPORADA",
    precio: 7000,
    porciones: 1,
    tiempo: "listo en 20 min",
    descCorta: "Atole de chocolate espesado con masa, especias.",
    descLarga:
      "Bebida caliente de chocolate espesada con masa de maíz y especias, preparada en temporada fría.",
    imgs: [],
    compat: { mani: true, lactosa: false, gluten: false, vegano: false },
  },
];

function nolimitsGetProduct(id) {
  return NOLIMITS_PRODUCTS.find((p) => p.id === id);
}

/* Extras opcionales con costo adicional, disponibles al agregar un
   producto al carrito (arequipe, chips de chocolate, etc.). */
const NOLIMITS_EXTRAS = [
  { id: "arequipe", nombre: "Arequipe extra", precio: 3000 },
  { id: "chips-chocolate", nombre: "Chips de chocolate", precio: 2500 },
  { id: "fresas-extra", nombre: "Fresas frescas extra", precio: 3500 },
  { id: "nueces", nombre: "Nueces picadas", precio: 3000 },
  { id: "vela", nombre: "Vela de feliz cumpleaños", precio: 2000 },
];

function nolimitsGetExtra(id) {
  return NOLIMITS_EXTRAS.find((e) => e.id === id);
}

/* El historial de compras solo debe reflejar los pedidos que el propio
   usuario confirma desde el carrito (NOLIMITS.addOrder()); no se
   precarga ningún pedido de ejemplo en la plataforma. */

const NOLIMITS_COUPONS = [
  {
    codigo: "BIENVENIDO10",
    desc: "10% de descuento en tu primer pedido.",
    valido: "Válido hasta 31/12/2026",
    tipo: "porcentaje",
    valor: 10,
  },
  {
    codigo: "ENVIOGRATIS",
    desc: "Envío gratis en tu próximo pedido, sin mínimo de compra.",
    valido: "Válido hasta 30/09/2026",
    tipo: "envio",
    valor: 0,
  },
  {
    codigo: "DULCE20",
    desc: "20% de descuento en pasteles seleccionados.",
    valido: "Válido hasta 15/10/2026",
    tipo: "porcentaje",
    valor: 20,
    categoria: "pasteles",
  },
];

const NOLIMITS = (function () {
  "use strict";

  const CART_KEY = "nolimits_cart";
  const A11Y_KEY = "nolimits_a11y";
  const ORDERS_KEY = "nolimits_orders";
  const USED_COUPONS_KEY = "nolimits_used_coupons";
  const APPLIED_COUPON_KEY = "nolimits_applied_coupon";

  const ENVIO_FLAT = 6000;
  const ENVIO_GRATIS_DESDE = 80000;

  /* ---------------- Carrito ---------------- */
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartBadge();
  }

  function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(
      (i) =>
        i.id === item.id &&
        i.horario === item.horario &&
        (i.extrasKey || "") === (item.extrasKey || "")
    );
    if (existing) {
      existing.cantidad += item.cantidad;
    } else {
      cart.push(item);
    }
    saveCart(cart);
  }

  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  }

  function updateCartQty(index, cantidad) {
    const cart = getCart();
    if (cart[index]) {
      cart[index].cantidad = Math.max(1, cantidad);
      saveCart(cart);
    }
  }

  function cartCount() {
    return getCart().reduce((sum, i) => sum + i.cantidad, 0);
  }

  function updateCartBadge() {
    const badge = document.querySelector("[data-cart-badge]");
    if (!badge) return;
    const count = cartCount();
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  /* Calcula subtotal, descuento (por cupón), envío y total para una lista
     de items {id, precio, cantidad}. El segundo parámetro es opcional y es
     el objeto de cupón aplicado (de NOLIMITS_COUPONS). No se cobra IVA. */
  function calcTotals(items, coupon) {
    const subtotal = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);

    let descuento = 0;
    if (coupon && coupon.tipo === "porcentaje") {
      let base = subtotal;
      if (coupon.categoria) {
        base = items.reduce((sum, i) => {
          const p = nolimitsGetProduct(i.id);
          if (p && p.categoria === coupon.categoria) return sum + i.precio * i.cantidad;
          return sum;
        }, 0);
      }
      descuento = Math.round((base * coupon.valor) / 100);
    }
    descuento = Math.min(descuento, subtotal);

    const subtotalConDescuento = subtotal - descuento;
    const envioGratisPorCupon = !!coupon && coupon.tipo === "envio";
    const envio =
      subtotal === 0
        ? 0
        : subtotal >= ENVIO_GRATIS_DESDE || envioGratisPorCupon
        ? 0
        : ENVIO_FLAT;
    const total = subtotalConDescuento + envio;

    return {
      subtotal,
      descuento,
      envio,
      total,
      cuponCodigo: coupon ? coupon.codigo : null,
    };
  }

  /* ---------------- Cupones ---------------- */
  function findCoupon(codigo) {
    const normalized = String(codigo || "").trim().toUpperCase();
    return NOLIMITS_COUPONS.find((c) => c.codigo === normalized) || null;
  }

  function getUsedCoupons() {
    try {
      return JSON.parse(localStorage.getItem(USED_COUPONS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function isCouponUsed(codigo) {
    const used = getUsedCoupons();
    return !!used[String(codigo || "").trim().toUpperCase()];
  }

  function markCouponUsed(codigo) {
    const used = getUsedCoupons();
    used[String(codigo || "").trim().toUpperCase()] = true;
    localStorage.setItem(USED_COUPONS_KEY, JSON.stringify(used));
  }

  /* Rehabilita un cupón ya usado para que pueda volver a aplicarse */
  function reactivateCoupon(codigo) {
    const used = getUsedCoupons();
    delete used[String(codigo || "").trim().toUpperCase()];
    localStorage.setItem(USED_COUPONS_KEY, JSON.stringify(used));
  }

  function getAppliedCoupon() {
    try {
      return JSON.parse(localStorage.getItem(APPLIED_COUPON_KEY)) || null;
    } catch (e) {
      return null;
    }
  }

  function setAppliedCoupon(coupon) {
    localStorage.setItem(APPLIED_COUPON_KEY, JSON.stringify(coupon));
  }

  function clearAppliedCoupon() {
    localStorage.removeItem(APPLIED_COUPON_KEY);
  }

  /* ---------------- Pedidos (historial + pendientes) ---------------- */
  /* Solo se muestran los pedidos que el usuario realmente ha confirmado
     desde su carrito (ver addOrder). No hay pedidos de ejemplo
     precargados en la plataforma. */
  function getOrders() {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function addOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    return order;
  }

  function updateOrderStatus(id, estado) {
    const orders = getOrders();
    const order = orders.find((o) => o.id === id);
    if (order) {
      order.estado = estado;
      saveOrders(orders);
    }
  }

  function getOrder(id) {
    return getOrders().find((o) => o.id === id) || null;
  }

  /* ---------------- Navegación (router por hash) ---------------- */
  function navigate(hash) {
    window.location.hash = hash;
  }

  function parseHash() {
    let raw = window.location.hash || "#/home";
    raw = raw.replace(/^#\/?/, "");
    if (!raw) raw = "home";
    const [path, queryString] = raw.split("?");
    const query = new URLSearchParams(queryString || "");
    return { path: path || "home", query };
  }

  /* ---------------- Navbar / Footer ---------------- */
  function renderChrome(activePage) {
    const navMount = document.querySelector("#site-navbar");
    const footMount = document.querySelector("#site-footer");

    if (navMount) {
      navMount.innerHTML = `
        <div class="navbar__inner">
          <a class="navbar__brand" href="#/home">
            <img class="navbar__logo" src="assets/img/logo.png" alt="nolimits Postrería">
          </a>
          <button class="navbar__toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false">
            <i class="fa-solid fa-bars"></i>
          </button>
          <ul class="navbar__links" id="navLinks">
            <li><a href="#/home" data-nav="home">Home</a></li>
            <li><a href="#/catalogo" data-nav="catalogo">Menú</a></li>
            <li><a href="#/carrito" data-nav="pedidos">Mis pedidos</a></li>
          </ul>
          <div class="navbar__actions">
            <a class="navbar__user" href="#/cuenta" data-user-slot>
              <i class="fa-regular fa-circle-user"></i>
              <span data-user-name>Usuario</span>
            </a>
            <a class="navbar__cart" href="#/carrito">
              <i class="fa-solid fa-bag-shopping"></i>
              Carrito
              <span class="navbar__cart-badge" data-cart-badge hidden>0</span>
            </a>
          </div>
        </div>
      `;

      const links = navMount.querySelectorAll("[data-nav]");
      links.forEach((a) => {
        if (a.dataset.nav === activePage) a.classList.add("is-active");
      });

      const toggle = document.getElementById("navToggle");
      const navLinks = document.getElementById("navLinks");
      toggle.addEventListener("click", () => {
        const isOpen = navLinks.style.display === "flex";
        navLinks.style.display = isOpen ? "" : "flex";
        navLinks.style.cssText = isOpen
          ? ""
          : "display:flex;position:fixed;top:var(--nav-h);left:0;right:0;background:#fff;flex-direction:column;padding:16px 24px;gap:14px;box-shadow:0 12px 20px rgba(0,0,0,.08);";
        toggle.setAttribute("aria-expanded", String(!isOpen));
      });
    }

    if (footMount) {
      footMount.innerHTML = `
        <div class="site-footer__inner">
          <div class="site-footer__brand">
            <img src="assets/img/logo.png" alt="nolimits Postrería">
          </div>
          <div class="site-footer__contact">
            <div><i class="fa-regular fa-envelope"></i><a href="mailto:servicioatencion@nolimits.co">servicioatencion@nolimits.co</a></div>
            <div><i class="fa-solid fa-phone"></i><a href="tel:+573227470159">+57 322 7470159</a></div>
          </div>
        </div>
        <p class="site-footer__bottom">© ${new Date().getFullYear()} nolimits postrería. Todos los derechos reservados.</p>
      `;
    }

    updateCartBadge();
    renderA11yWidget();
  }

  /* ---------------- Widget de accesibilidad ---------------- */
  function getA11yPrefs() {
    try {
      return (
        JSON.parse(localStorage.getItem(A11Y_KEY)) || {
          fontScale: 100,
          contrast: false,
          underline: false,
          reduceMotion: false,
        }
      );
    } catch (e) {
      return { fontScale: 100, contrast: false, underline: false, reduceMotion: false };
    }
  }

  function saveA11yPrefs(prefs) {
    localStorage.setItem(A11Y_KEY, JSON.stringify(prefs));
  }

  function applyA11yPrefs(prefs) {
    document.documentElement.style.fontSize = prefs.fontScale + "%";
    document.documentElement.classList.toggle("a11y-contrast", prefs.contrast);
    document.documentElement.classList.toggle("a11y-underline", prefs.underline);
    document.documentElement.classList.toggle("a11y-reduce-motion", prefs.reduceMotion);
  }

  function renderA11yWidget() {
    if (document.querySelector(".a11y-fab")) return; // ya insertado

    const fab = document.createElement("button");
    fab.className = "a11y-fab";
    fab.setAttribute("aria-label", "Abrir panel de accesibilidad");
    fab.innerHTML = '<i class="fa-solid fa-universal-access"></i>';

    const panel = document.createElement("div");
    panel.className = "a11y-panel";
    panel.hidden = true;
    panel.innerHTML = `
      <div class="a11y-panel__head">
        <h2>Accesibilidad</h2>
        <button class="a11y-panel__close" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <p class="a11y-panel__label">TAMAÑO DE TEXTO</p>
      <div class="a11y-fontsize">
        <button data-a11y="font-dec" aria-label="Reducir texto">A-</button>
        <span class="a11y-fontsize__value" data-a11y-value>100%</span>
        <button data-a11y="font-inc" aria-label="Aumentar texto">A+</button>
      </div>
      <div class="a11y-row">
        <label for="a11yContrast">Alto contraste</label>
        <span class="switch"><input type="checkbox" id="a11yContrast" data-a11y="contrast"><span class="switch__track"></span></span>
      </div>
      <div class="a11y-row">
        <label for="a11yUnderline">Subrayar enlaces</label>
        <span class="switch"><input type="checkbox" id="a11yUnderline" data-a11y="underline"><span class="switch__track"></span></span>
      </div>
      <div class="a11y-row">
        <label for="a11yMotion">Reducir movimiento</label>
        <span class="switch"><input type="checkbox" id="a11yMotion" data-a11y="reduceMotion"><span class="switch__track"></span></span>
      </div>
      <button class="a11y-reset" data-a11y="reset">Restablecer preferencias</button>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    const prefs = getA11yPrefs();
    applyA11yPrefs(prefs);
    syncPanel(panel, prefs);

    fab.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
    });
    panel.querySelector(".a11y-panel__close").addEventListener("click", () => {
      panel.hidden = true;
    });

    panel.querySelector('[data-a11y="font-inc"]').addEventListener("click", () => {
      const p = getA11yPrefs();
      p.fontScale = Math.min(150, p.fontScale + 10);
      saveA11yPrefs(p);
      applyA11yPrefs(p);
      syncPanel(panel, p);
    });
    panel.querySelector('[data-a11y="font-dec"]').addEventListener("click", () => {
      const p = getA11yPrefs();
      p.fontScale = Math.max(80, p.fontScale - 10);
      saveA11yPrefs(p);
      applyA11yPrefs(p);
      syncPanel(panel, p);
    });

    ["contrast", "underline", "reduceMotion"].forEach((key) => {
      panel.querySelector(`[data-a11y="${key}"]`).addEventListener("change", (e) => {
        const p = getA11yPrefs();
        p[key] = e.target.checked;
        saveA11yPrefs(p);
        applyA11yPrefs(p);
      });
    });

    panel.querySelector('[data-a11y="reset"]').addEventListener("click", () => {
      const defaults = { fontScale: 100, contrast: false, underline: false, reduceMotion: false };
      saveA11yPrefs(defaults);
      applyA11yPrefs(defaults);
      syncPanel(panel, defaults);
    });

    function syncPanel(panelEl, p) {
      panelEl.querySelector("[data-a11y-value]").textContent = p.fontScale + "%";
      panelEl.querySelector("#a11yContrast").checked = p.contrast;
      panelEl.querySelector("#a11yUnderline").checked = p.underline;
      panelEl.querySelector("#a11yMotion").checked = p.reduceMotion;
    }
  }

  /* Aplica preferencias guardadas lo antes posible (evita parpadeo) */
  applyA11yPrefs(getA11yPrefs());

  /* ---------------- Tarjeta de producto (home + catálogo) ---------------- */
  function badgeClass(badge) {
    if (badge === "NUEVO") return "badge badge--nuevo";
    if (badge === "DE TEMPORADA") return "badge badge--temporada";
    if (badge === "SIN GLUTEN") return "badge badge--gluten";
    return "badge";
  }

  function productCardHTML(p) {
    const media = p.imgs && p.imgs.length
      ? `<img src="${p.imgs[0]}" alt="${p.nombre}">`
      : `<div class="product-card__placeholder"><i class="fa-regular fa-image"></i><span>${p.nombre}</span></div>`;

    const badge = p.badge
      ? `<span class="${badgeClass(p.badge)} product-card__badge">${p.badge}</span>`
      : "";

    return `
      <a class="product-card" href="#/producto?id=${p.id}">
        <div class="product-card__media">
          ${media}
          ${badge}
        </div>
        <div class="product-card__body">
          <h3 class="product-card__name">${p.nombre}</h3>
          <p class="product-card__desc">${p.descCorta}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${moneyFmt(p.precio)}</span>
            <span class="btn btn--navy btn--sm">Ver</span>
          </div>
        </div>
      </a>
    `;
  }

  function moneyFmt(n) {
    return "$" + Number(n).toLocaleString("es-CO");
  }

  function showToast(msg, isError) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid ${isError ? "fa-triangle-exclamation" : "fa-circle-check"}"></i> ${msg}`;
    toast.classList.toggle("is-error", !!isError);
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.hidden = true; }, 2800);
  }

  return {
    ENVIO_FLAT,
    ENVIO_GRATIS_DESDE,
    getCart,
    saveCart,
    addToCart,
    removeFromCart,
    updateCartQty,
    cartCount,
    calcTotals,
    findCoupon,
    isCouponUsed,
    markCouponUsed,
    reactivateCoupon,
    getAppliedCoupon,
    setAppliedCoupon,
    clearAppliedCoupon,
    getOrders,
    addOrder,
    updateOrderStatus,
    getOrder,
    navigate,
    parseHash,
    renderChrome,
    productCardHTML,
    money: moneyFmt,
    showToast,
  };
})();

/* =========================================================
   Vistas (páginas)
   ========================================================= */

const NOLIMITS_VIEWS = (function () {
  "use strict";

  const app = () => document.getElementById("app");

  /* ---------------- HOME ---------------- */
  function renderHome() {
    const featuredIds = ["cheesecake-maracumango", "cheesecake-frutos-rojos", "postre-limon"];
    const featured = featuredIds.map(nolimitsGetProduct).filter(Boolean);

    app().innerHTML = `
      <section class="hero">
        <div class="hero__media">
          <img src="assets/img/productos/cheesecake-frutos-rojos.jpeg" alt="Cheesecake de frutos rojos de nolimits">
          <div class="hero__overlay"></div>
        </div>
        <div class="container hero__content">
          <h1 class="hero__title">Dulces sin límites</h1>
          <p class="hero__text">Horneado fresco cada mañana, entrega el mismo día en toda la ciudad.</p>
          <div class="hero__actions">
            <a href="#/catalogo" class="btn btn--primary">Ver menú</a>
            <a href="#/carrito" class="btn btn--outline btn--outline-light">Obtener ahora</a>
          </div>
        </div>
      </section>

      <section class="container section">
        <div class="section__head">
          <div>
            <p class="eyebrow">Destacados</p>
            <h2 class="section__title">Lo más pedido</h2>
          </div>
          <a href="#/catalogo" class="link-arrow">Ver todo <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="product-grid" id="featuredGrid">
          ${featured.map((p) => NOLIMITS.productCardHTML(p)).join("")}
        </div>
      </section>

      <section class="ingredients">
        <div class="container ingredients__inner">
          <div class="ingredients__media">
            <img src="assets/img/productos/cheesecake-maracumango-2.jpeg" alt="Ingredientes frescos usados en nolimits">
          </div>
          <div class="ingredients__text">
            <p class="eyebrow">Nuestra cocina</p>
            <h2>Ingredientes reales, recetas honestas</h2>
            <p>Cada pastel se hornea en pequeños lotes con mantequilla, fruta y chocolate de verdad — nada de mezclas ni atajos.</p>
          </div>
        </div>
      </section>

      <section class="container section">
        <p class="eyebrow" style="text-align:center">Testimonios</p>
        <h2 class="section__title" style="text-align:center; margin-bottom:28px;">Lo que dicen nuestros clientes</h2>
        <div class="testimonials-wrap">
          <div class="testimonial-grid">
            <article class="testimonial-card">
              <p>“El tres leches de nolimits no se compara con nada — llegó fresco y a tiempo.”</p>
              <span>Andrea Ruiz</span>
            </article>
            <article class="testimonial-card">
              <p>“Pedí para un evento de 40 personas, todo perfecto y muy buena comunicación.”</p>
              <span>Ricardo Mora</span>
            </article>
            <article class="testimonial-card">
              <p>“Los alfajores son mi antojo semanal. Entrega siempre puntual.”</p>
              <span>Karla Tovar</span>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  /* ---------------- CATÁLOGO ---------------- */
  function renderCatalogo(query) {
    app().innerHTML = `
      <div class="container section catalog">
        <p class="eyebrow">Nuestro menú</p>
        <h1 class="catalog__title">Todo, sin límites</h1>

        <div class="catalog__toolbar">
          <div class="catalog__search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="search" id="searchInput" placeholder="Buscar postres...">
          </div>

          <div class="catalog__filter">
            <label for="categorySelect">Filtrar por categoría</label>
            <select id="categorySelect">
              <option value="todas">Todas las categorías</option>
              <option value="pasteles">Pasteles</option>
              <option value="galletas">Galletas</option>
              <option value="bebidas">Bebidas</option>
            </select>
          </div>

          <div class="catalog__filter">
            <label for="sortSelect">Ordenar por</label>
            <select id="sortSelect">
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
          </div>
        </div>

        <div class="catalog__tabs" id="categoryTabs">
          <button type="button" class="catalog__tab is-active" data-tab="todos">Todos</button>
          <button type="button" class="catalog__tab" data-tab="pasteles">Pasteles</button>
          <button type="button" class="catalog__tab" data-tab="galletas">Galletas</button>
          <button type="button" class="catalog__tab" data-tab="bebidas">Bebidas</button>
        </div>

        <p class="catalog__empty" id="catalogEmpty" hidden>No encontramos postres con esos filtros. Prueba con otra búsqueda.</p>

        <div class="product-grid" id="catalogGrid"></div>
      </div>
    `;

    const grid = document.getElementById("catalogGrid");
    const empty = document.getElementById("catalogEmpty");
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const sortSelect = document.getElementById("sortSelect");
    const tabs = document.querySelectorAll(".catalog__tab");

    const initialCat = query.get("categoria");
    if (initialCat) {
      categorySelect.value = initialCat;
      setActiveTab(initialCat);
    }

    function setActiveTab(cat) {
      tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.tab === (cat === "todas" ? "todos" : cat)));
    }

    function render() {
      const q = searchInput.value.trim().toLowerCase();
      const cat = categorySelect.value;
      const sort = sortSelect.value;

      let items = NOLIMITS_PRODUCTS.filter((p) => {
        const matchesCat = cat === "todas" || p.categoria === cat;
        const matchesQuery = !q || p.nombre.toLowerCase().includes(q) || p.descCorta.toLowerCase().includes(q);
        return matchesCat && matchesQuery;
      });

      if (sort === "precio-asc") items.sort((a, b) => a.precio - b.precio);
      else if (sort === "precio-desc") items.sort((a, b) => b.precio - a.precio);
      else if (sort === "nombre") items.sort((a, b) => a.nombre.localeCompare(b.nombre));

      grid.innerHTML = items.map((p) => NOLIMITS.productCardHTML(p)).join("");
      empty.hidden = items.length !== 0;
      grid.hidden = items.length === 0;
    }

    searchInput.addEventListener("input", render);
    categorySelect.addEventListener("change", () => {
      setActiveTab(categorySelect.value);
      render();
    });
    sortSelect.addEventListener("change", render);

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        categorySelect.value = tab.dataset.tab === "todos" ? "todas" : tab.dataset.tab;
        render();
      });
    });

    render();
  }

  /* ---------------- PRODUCTO ---------------- */
  function renderProducto(query) {
    const id = query.get("id");
    const product = nolimitsGetProduct(id);

    app().innerHTML = `<main class="container product-page" id="productPage"></main>
      <div class="toast" id="toastLocal" hidden></div>`;
    const root = document.getElementById("productPage");

    if (!product) {
      root.innerHTML = `
        <div class="product-notfound">
          <h1>No encontramos ese postre</h1>
          <p>Puede que el enlace esté incompleto o el producto ya no exista.</p>
          <a class="btn btn--navy" href="#/catalogo">Volver al menú</a>
        </div>`;
      return;
    }

    document.title = product.nombre + " | nolimits Postrería";

    let qty = 1;
    let activeImg = 0;
    let extrasOpen = false;
    const selectedExtras = new Set();

    function extrasTotal() {
      let total = 0;
      selectedExtras.forEach((id) => {
        const extra = nolimitsGetExtra(id);
        if (extra) total += extra.precio;
      });
      return total;
    }

    const restrictionLabels = [
      { key: "mani", label: "Alergia al maní" },
      { key: "lactosa", label: "Intolerante a la lactosa" },
      { key: "gluten", label: "Alergia al gluten" },
      { key: "vegano", label: "Vegano" },
    ];

    function galleryHTML() {
      if (!product.imgs.length) {
        return `
          <div class="product-gallery__main">
            <div class="product-gallery__placeholder">
              <i class="fa-regular fa-image"></i>
              <span>${product.nombre} — foto de producto</span>
            </div>
          </div>`;
      }
      const thumbs = product.imgs.length > 1
        ? `<div class="product-gallery__thumbs">
            ${product.imgs.map((src, i) => `
              <button type="button" data-thumb="${i}" class="${i === activeImg ? "is-active" : ""}">
                <img src="${src}" alt="${product.nombre} foto ${i + 1}">
              </button>`).join("")}
          </div>`
        : "";
      return `
        <div class="product-gallery__main">
          <img id="mainImg" src="${product.imgs[activeImg]}" alt="${product.nombre}">
        </div>
        ${thumbs}`;
    }

    function containsList() {
      const contains = [];
      if (!product.compat.gluten) contains.push("gluten");
      if (!product.compat.lactosa) contains.push("lácteos");
      if (!product.compat.mani) contains.push("maní");
      return contains;
    }

    function render() {
      const contains = containsList();
      root.innerHTML = `
        <div class="product-detail">
          <div class="product-gallery" id="gallery">
            ${galleryHTML()}
          </div>

          <div class="product-info">
            <p class="eyebrow">${product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1)}</p>
            <h1>${product.nombre}</h1>
            <p class="product-info__price">${NOLIMITS.money(product.precio)}</p>
            <p class="product-info__desc">${product.descLarga}</p>

            <div class="product-qty">
              <div class="product-qty__control">
                <button type="button" id="qtyMinus" aria-label="Quitar unidad">−</button>
                <span id="qtyValue">${qty}</span>
                <button type="button" id="qtyPlus" aria-label="Agregar unidad">+</button>
              </div>
              <span class="product-qty__meta">${product.porciones} porciones · ${product.tiempo}</span>
            </div>

            <div class="product-restrictions">
              <p class="product-restrictions__label">Restricciones alimentarias</p>
              <p class="product-restrictions__hint">Marca las que te apliquen a ti. Te avisaremos si este producto no es apto para alguna que selecciones.</p>
              <div class="product-restrictions__list">
                ${restrictionLabels.map((r) => `
                  <label class="product-restriction" data-key="${r.key}">
                    <input type="checkbox" data-restriction="${r.key}">
                    ${r.label}
                  </label>`).join("")}
              </div>
              <div class="product-restrictions__warning" id="restrictionWarning" hidden>
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span id="restrictionWarningText"></span>
              </div>
            </div>

            <div class="product-extras">
              <button type="button" class="product-extras__toggle" id="extrasToggle" aria-expanded="${extrasOpen}">
                <i class="fa-solid fa-chevron-right product-extras__arrow"></i>
                Adicionales con costo extra
              </button>
              <div class="product-extras__panel" id="extrasPanel" ${extrasOpen ? "" : "hidden"}>
                ${NOLIMITS_EXTRAS.map((extra) => `
                  <label class="product-extra">
                    <span class="product-extra__check">
                      <input type="checkbox" data-extra="${extra.id}" ${selectedExtras.has(extra.id) ? "checked" : ""}>
                      ${extra.nombre}
                    </span>
                    <span class="product-extra__price">+ ${NOLIMITS.money(extra.precio)}</span>
                  </label>`).join("")}
              </div>
            </div>

            <p class="product-info__total">Total: <span id="totalPrice">${NOLIMITS.money((product.precio + extrasTotal()) * qty)}</span></p>

            <button class="btn btn--navy btn--full" id="addToCartBtn">Agregar al carrito</button>

            <div class="product-facts">
              <div><i class="fa-solid fa-truck"></i>Entrega el mismo día en pedidos antes de las 2pm.</div>
              <div><i class="fa-solid fa-triangle-exclamation"></i>${contains.length ? "Contiene " + contains.join(", ") + "." : "No contiene alérgenos comunes."}</div>
            </div>
          </div>
        </div>
      `;

      bindEvents();
    }

    function bindEvents() {
      const gallery = document.getElementById("gallery");
      if (gallery) {
        gallery.querySelectorAll("[data-thumb]").forEach((btn) => {
          btn.addEventListener("click", () => {
            activeImg = Number(btn.dataset.thumb);
            document.getElementById("mainImg").src = product.imgs[activeImg];
            gallery.querySelectorAll("[data-thumb]").forEach((b) => b.classList.remove("is-active"));
            btn.classList.add("is-active");
          });
        });
      }

      document.getElementById("qtyMinus").addEventListener("click", () => updateQty(qty - 1));
      document.getElementById("qtyPlus").addEventListener("click", () => updateQty(qty + 1));

      const restrictionInputs = document.querySelectorAll("[data-restriction]");
      restrictionInputs.forEach((input) => {
        input.addEventListener("change", updateRestrictionWarning);
      });
      updateRestrictionWarning();

      const extrasToggle = document.getElementById("extrasToggle");
      extrasToggle.addEventListener("click", () => {
        extrasOpen = !extrasOpen;
        extrasToggle.setAttribute("aria-expanded", String(extrasOpen));
        document.getElementById("extrasPanel").hidden = !extrasOpen;
        extrasToggle.classList.toggle("is-open", extrasOpen);
      });

      document.querySelectorAll("[data-extra]").forEach((input) => {
        input.addEventListener("change", () => {
          if (input.checked) selectedExtras.add(input.dataset.extra);
          else selectedExtras.delete(input.dataset.extra);
          updateTotal();
        });
      });

      document.getElementById("addToCartBtn").addEventListener("click", () => {
        const extras = Array.from(selectedExtras)
          .map((id) => nolimitsGetExtra(id))
          .filter(Boolean)
          .map((e) => ({ id: e.id, nombre: e.nombre, precio: e.precio }));
        const extrasKey = extras.map((e) => e.id).sort().join(",");

        NOLIMITS.addToCart({
          id: product.id,
          nombre: product.nombre,
          precio: product.precio + extrasTotal(),
          img: product.imgs[0] || "",
          cantidad: qty,
          horario: null,
          extras,
          extrasKey,
        });
        NOLIMITS.showToast(`${product.nombre} agregado al carrito`);
      });
    }

    function updateRestrictionWarning() {
      const checked = Array.from(document.querySelectorAll("[data-restriction]:checked"));
      const warning = document.getElementById("restrictionWarning");
      const warningText = document.getElementById("restrictionWarningText");
      const conflictos = checked.filter((c) => !product.compat[c.dataset.restriction]);
      if (!conflictos.length) {
        warning.hidden = true;
        return;
      }
      const labels = conflictos.map((c) => {
        const label = restrictionLabels.find((r) => r.key === c.dataset.restriction);
        return label ? label.label.toLowerCase() : c.dataset.restriction;
      });
      warningText.textContent = `Este producto no es apto para: ${labels.join(", ")}.`;
      warning.hidden = false;
    }

    function updateQty(next) {
      qty = Math.min(20, Math.max(1, next));
      document.getElementById("qtyValue").textContent = qty;
      updateTotal();
    }

    function updateTotal() {
      document.getElementById("totalPrice").textContent = NOLIMITS.money((product.precio + extrasTotal()) * qty);
    }

    render();
  }

  /* ---------------- CARRITO ---------------- */
  function renderCarrito() {
    app().innerHTML = `
      <main class="container cart-page">
        <h1 class="cart-page__title">Tu carrito</h1>
        <div class="cart-layout" id="cartLayout"></div>
      </main>`;

    const layout = document.getElementById("cartLayout");

    const TIME_SLOTS = [
      "9:00 AM – 11:00 AM",
      "11:00 AM – 1:00 PM",
      "1:00 PM – 3:00 PM",
      "3:00 PM – 5:00 PM",
      "5:00 PM – 7:00 PM",
    ];

    let couponMsg = "";
    let couponError = false;

    function todayISO() {
      const d = new Date();
      return d.toISOString().split("T")[0];
    }

    /* Convierte "9:00 AM – 11:00 AM" en la hora de inicio {h, m} en 24h */
    function parseHorarioStart(horario) {
      const first = String(horario || "").split("–")[0].trim();
      const match = first.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return { h: 0, m: 0 };
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === "PM" && h !== 12) h += 12;
      if (ampm === "AM" && h === 12) h = 0;
      return { h, m };
    }

    /* Un pedido queda "Pendiente" mientras la fecha/horario elegidos por
       el cliente todavía no llegan; si ya pasaron, se considera "Confirmado". */
    function computeEstado(fechaISO, horario) {
      const { h, m } = parseHorarioStart(horario);
      const [y, mo, d] = fechaISO.split("-").map(Number);
      const scheduled = new Date(y, mo - 1, d, h, m, 0);
      return scheduled.getTime() > Date.now() ? "Pendiente" : "Confirmado";
    }

    function formatFechaDisplay(fechaISO) {
      const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
      const [y, mo, d] = fechaISO.split("-").map(Number);
      return `${String(d).padStart(2, "0")} ${meses[mo - 1]} ${y}`;
    }

    function generateOrderId() {
      return "NL-" + Date.now().toString().slice(-6);
    }

    function captureFormValues() {
      const ids = ["nombre", "direccion", "fecha", "horario", "tarjeta"];
      const vals = {};
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) vals[id] = el.value;
      });
      return vals;
    }

    function restoreFormValues(vals) {
      Object.keys(vals).forEach((id) => {
        const el = document.getElementById(id);
        if (el && vals[id]) el.value = vals[id];
      });
    }

    function tagsFor(product) {
      if (!product) return "";
      const tags = [];
      if (product.compat.mani) tags.push("Sin maní");
      if (product.compat.lactosa) tags.push("Sin lactosa");
      if (product.compat.gluten) tags.push("Sin gluten");
      if (product.compat.vegano) tags.push("Vegano");
      if (!tags.length) return "";
      return `<p class="cart-item__tags"><i class="fa-solid fa-leaf"></i>${tags.join(" · ")}</p>`;
    }

    function extrasFor(item) {
      if (!item.extras || !item.extras.length) return "";
      const names = item.extras.map((e) => e.nombre).join(", ");
      return `<p class="cart-item__extras"><i class="fa-solid fa-plus"></i>${names}</p>`;
    }

    function render() {
      const cart = NOLIMITS.getCart();
      const formVals = captureFormValues();

      if (!cart.length) {
        layout.innerHTML = `
          <div class="cart-empty" style="grid-column:1/-1;">
            <i class="fa-solid fa-bag-shopping"></i>
            <p>Tu carrito está vacío por ahora.</p>
            <a class="btn btn--navy" href="#/catalogo">Ver el menú</a>
          </div>`;
        return;
      }

      let appliedCoupon = NOLIMITS.getAppliedCoupon();
      if (appliedCoupon && NOLIMITS.isCouponUsed(appliedCoupon.codigo)) {
        NOLIMITS.clearAppliedCoupon();
        appliedCoupon = null;
      }

      const { subtotal, descuento, envio, total } = NOLIMITS.calcTotals(cart, appliedCoupon);

      layout.innerHTML = `
        <section class="cart-items-wrap">
          <div class="cart-items" id="cartItems">
            ${cart.map((item, idx) => cartItemHTML(item, idx)).join("")}
          </div>

          <form class="cart-form" id="deliveryForm" novalidate>
            <h2>Datos de entrega y pago</h2>

            <div class="field">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" placeholder="María García" required>
              <p class="field-error" id="nombreError"></p>
            </div>

            <div class="field">
              <label for="direccion">Dirección de entrega</label>
              <input type="text" id="direccion" placeholder="Av. Reforma 245" required>
              <p class="field-error" id="direccionError"></p>
            </div>

            <div class="field-row">
              <div class="field">
                <label for="fecha">Fecha de entrega</label>
                <input type="date" id="fecha" min="${todayISO()}" required>
                <p class="field-error" id="fechaError"></p>
              </div>
              <div class="field">
                <label for="horario">Horario</label>
                <select id="horario" required>
                  <option value="" disabled selected>Elige un horario</option>
                  ${TIME_SLOTS.map((h) => `<option value="${h}">${h}</option>`).join("")}
                </select>
                <p class="field-error" id="horarioError"></p>
              </div>
            </div>

            <div class="field">
              <label for="tarjeta">Tarjeta</label>
              <input type="text" id="tarjeta" placeholder="•••• •••• •••• 4242" inputmode="numeric" maxlength="19" required>
              <p class="field-error" id="tarjetaError"></p>
            </div>
          </form>
        </section>

        <aside class="order-summary">
          <h2>Resumen del pedido</h2>
          ${cart.map((i) => `
            <div class="order-summary__row">
              <span>${i.nombre} × ${i.cantidad}${i.extras && i.extras.length ? `<br><small class="order-summary__extras">+ ${i.extras.map((e) => e.nombre).join(", ")}</small>` : ""}</span>
              <span>${NOLIMITS.money(i.precio * i.cantidad)}</span>
            </div>`).join("")}

          <div class="coupon-apply">
            <label for="couponInput">Cupón de descuento</label>
            <div class="coupon-apply__row">
              <input type="text" id="couponInput" placeholder="Código" value="${appliedCoupon ? appliedCoupon.codigo : ""}" ${appliedCoupon ? "disabled" : ""}>
              ${appliedCoupon
                ? `<button type="button" class="btn btn--outline btn--sm" id="removeCouponBtn">Quitar</button>`
                : `<button type="button" class="btn btn--outline btn--sm" id="applyCouponBtn">Aplicar</button>`}
            </div>
            ${couponMsg ? `<p class="coupon-apply__msg${couponError ? " is-error" : ""}">${couponMsg}</p>` : ""}
          </div>

          <div class="order-summary__row is-muted">
            <span>Subtotal</span>
            <span>${NOLIMITS.money(subtotal)}</span>
          </div>
          ${descuento > 0 ? `
          <div class="order-summary__row is-muted is-discount">
            <span>Descuento${appliedCoupon ? " (" + appliedCoupon.codigo + ")" : ""}</span>
            <span>−${NOLIMITS.money(descuento)}</span>
          </div>` : ""}
          <div class="order-summary__row is-muted">
            <span>Envío</span>
            <span>${envio === 0 ? "Gratis" : NOLIMITS.money(envio)}</span>
          </div>
          <div class="order-summary__total">
            <span>Total</span>
            <span>${NOLIMITS.money(total)}</span>
          </div>
          <p class="order-summary__note">Envío gratis en pedidos desde ${NOLIMITS.money(NOLIMITS.ENVIO_GRATIS_DESDE)}.</p>
          <button class="btn btn--navy btn--full" id="confirmBtn">Confirmar pedido</button>
        </aside>
      `;

      restoreFormValues(formVals);
      bindEvents(cart);
    }

    function cartItemHTML(item, idx) {
      const product = nolimitsGetProduct(item.id);
      const media = item.img
        ? `<img src="${item.img}" alt="${item.nombre}">`
        : `<i class="fa-regular fa-image"></i>`;

      return `
        <div class="cart-item" data-idx="${idx}">
          <div class="cart-item__media" data-action="view" data-id="${item.id}">${media}</div>
          <div class="cart-item__body">
            <p class="cart-item__name" data-action="view" data-id="${item.id}">${item.nombre}</p>
            ${tagsFor(product)}
            ${extrasFor(item)}
            <div class="cart-item__row">
              <div class="cart-item__qty">
                <button type="button" data-action="dec" aria-label="Quitar unidad">−</button>
                <span>${item.cantidad}</span>
                <button type="button" data-action="inc" aria-label="Agregar unidad">+</button>
              </div>
              <span class="cart-item__price">${NOLIMITS.money(item.precio * item.cantidad)}</span>
              <button type="button" class="cart-item__remove" data-action="remove" aria-label="Eliminar producto">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>`;
    }

    function bindEvents(cart) {
      document.querySelectorAll(".cart-item").forEach((el) => {
        const idx = Number(el.dataset.idx);
        el.querySelector('[data-action="inc"]').addEventListener("click", () => {
          NOLIMITS.updateCartQty(idx, cart[idx].cantidad + 1);
          render();
        });
        el.querySelector('[data-action="dec"]').addEventListener("click", () => {
          NOLIMITS.updateCartQty(idx, cart[idx].cantidad - 1);
          render();
        });
        el.querySelector('[data-action="remove"]').addEventListener("click", () => {
          NOLIMITS.removeFromCart(idx);
          render();
        });
        el.querySelectorAll('[data-action="view"]').forEach((viewEl) => {
          viewEl.addEventListener("click", () => {
            NOLIMITS.navigate(`/producto?id=${viewEl.dataset.id}`);
          });
        });
      });

      const applyBtn = document.getElementById("applyCouponBtn");
      if (applyBtn) {
        applyBtn.addEventListener("click", () => {
          const input = document.getElementById("couponInput");
          const code = input.value.trim();

          if (!code) {
            couponMsg = "Escribe un código de cupón.";
            couponError = true;
            render();
            return;
          }

          const coupon = NOLIMITS.findCoupon(code);
          if (!coupon) {
            couponMsg = "Ese cupón no existe o ya no es válido.";
            couponError = true;
            render();
            return;
          }

          if (NOLIMITS.isCouponUsed(coupon.codigo)) {
            couponMsg = "Ya usaste este cupón. No se puede volver a aplicar hasta que se reactive.";
            couponError = true;
            render();
            return;
          }

          NOLIMITS.setAppliedCoupon(coupon);
          couponMsg = `Cupón ${coupon.codigo} aplicado — ${coupon.desc}`;
          couponError = false;
          render();
        });
      }

      const removeBtn = document.getElementById("removeCouponBtn");
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          NOLIMITS.clearAppliedCoupon();
          couponMsg = "Cupón eliminado.";
          couponError = false;
          render();
        });
      }

      document.getElementById("confirmBtn").addEventListener("click", (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const btn = e.target;
        btn.disabled = true;
        btn.textContent = "Procesando...";

        setTimeout(() => {
          const currentCart = NOLIMITS.getCart();
          let appliedCoupon = NOLIMITS.getAppliedCoupon();
          if (appliedCoupon && NOLIMITS.isCouponUsed(appliedCoupon.codigo)) appliedCoupon = null;

          const nombre = document.getElementById("nombre").value.trim();
          const direccion = document.getElementById("direccion").value.trim();
          const fechaISO = document.getElementById("fecha").value;
          const horario = document.getElementById("horario").value;

          const totales = NOLIMITS.calcTotals(currentCart, appliedCoupon);
          const estado = computeEstado(fechaISO, horario);

          const order = {
            id: generateOrderId(),
            nombre,
            direccion,
            fecha: formatFechaDisplay(fechaISO),
            horario,
            estado,
            items: currentCart.map((i) => ({
              id: i.id,
              nombre: i.nombre,
              precio: i.precio,
              cantidad: i.cantidad,
              extras: i.extras || [],
            })),
            totales,
          };

          NOLIMITS.addOrder(order);
          if (appliedCoupon) {
            NOLIMITS.markCouponUsed(appliedCoupon.codigo);
            NOLIMITS.clearAppliedCoupon();
          }
          NOLIMITS.saveCart([]);

          const msg = estado === "Pendiente"
            ? "¡Pedido confirmado! Quedó como pendiente hasta la fecha y horario que elegiste."
            : "¡Pedido confirmado! Te avisaremos cuando salga para entrega.";
          NOLIMITS.showToast(msg);

          setTimeout(() => { NOLIMITS.navigate(`/cuenta?pedido=${order.id}`); }, 1400);
        }, 900);
      });
    }

    function validateForm() {
      let valid = true;
      const fields = [
        { id: "nombre", errId: "nombreError", msg: "Escribe tu nombre." },
        { id: "direccion", errId: "direccionError", msg: "Escribe tu dirección de entrega." },
        { id: "fecha", errId: "fechaError", msg: "Elige una fecha de entrega." },
        { id: "horario", errId: "horarioError", msg: "Elige un horario de entrega." },
      ];

      fields.forEach((f) => {
        const el = document.getElementById(f.id);
        const err = document.getElementById(f.errId);
        if (!el.value) {
          err.textContent = f.msg;
          valid = false;
        } else {
          err.textContent = "";
        }
      });

      const tarjeta = document.getElementById("tarjeta");
      const tarjetaErr = document.getElementById("tarjetaError");
      const digits = tarjeta.value.replace(/\D/g, "");
      if (digits.length < 4) {
        tarjetaErr.textContent = "Escribe al menos los últimos 4 dígitos de tu tarjeta.";
        valid = false;
      } else {
        tarjetaErr.textContent = "";
      }

      return valid;
    }

    render();
  }

  /* ---------------- CUENTA (Usuario) ---------------- */
  /* Compatibilidad hacia atrás: si un pedido guarda items como {id,cantidad}
     (formato antiguo) los resuelve contra el catálogo; si ya trae
     nombre/precio propios (pedidos nuevos confirmados desde el carrito)
     los usa tal cual, para que la factura muestre el precio real pagado. */
  function resolveOrderItems(items) {
    return items
      .map((i) => {
        if (i.nombre !== undefined && i.precio !== undefined) return i;
        const p = nolimitsGetProduct(i.id);
        if (!p) return null;
        return { id: p.id, nombre: p.nombre, precio: p.precio, cantidad: i.cantidad };
      })
      .filter(Boolean);
  }

  function orderCardHTML(order, { showManageActions } = {}) {
    const items = resolveOrderItems(order.items);
    const totales = order.totales || NOLIMITS.calcTotals(items);
    const statusClass = order.estado === "Pendiente" ? "is-pending" : "";
    return `
      <div class="order-card">
        <div class="order-card__info">
          <p class="order-card__id">Pedido ${order.id}</p>
          <p class="order-card__meta">${order.fecha} · ${order.horario} · ${items.length} producto(s)</p>
          <p class="order-card__meta">${order.nombre || "—"} · ${order.direccion || "—"}</p>
          <span class="order-card__status ${statusClass}">${order.estado}</span>
        </div>
        <div class="order-card__actions">
          <span class="order-card__total">${NOLIMITS.money(totales.total)}</span>
          ${showManageActions && order.estado === "Pendiente" ? `<button class="btn btn--outline btn--sm" data-deliver="${order.id}">Marcar entregado</button>` : ""}
          <button class="btn btn--navy btn--sm" data-order="${order.id}">Ver pedido</button>
        </div>
      </div>`;
  }

  function renderCuenta(query) {
    const pedidoId = query.get("pedido");
    if (pedidoId) {
      renderRecibo(pedidoId);
      return;
    }

    const cart = NOLIMITS.getCart();
    const allOrders = NOLIMITS.getOrders();
    const pendingOrders = allOrders.filter((o) => o.estado === "Pendiente");
    const historyOrders = allOrders.filter((o) => o.estado !== "Pendiente");

    app().innerHTML = `
      <main class="container account-page">
        <div class="account-page__head">
          <h1 class="account-page__title">Mi cuenta</h1>
          <button class="btn btn--primary" id="newOrderBtn"><i class="fa-solid fa-plus"></i> Nuevo pedido</button>
        </div>

        ${cart.length ? `
        <section class="account-section">
          <div class="account-cart-hint">
            <span><i class="fa-solid fa-bag-shopping"></i> Tienes ${cart.reduce((s, i) => s + i.cantidad, 0)} producto(s) en el carrito sin confirmar.</span>
            <button class="btn btn--outline btn--sm" id="goCartBtn">Ir al carrito</button>
          </div>
        </section>` : ""}

        <section class="account-section">
          <div class="account-section__head">
            <div>
              <h2 class="account-section__title">Pedidos pendientes</h2>
              <p class="account-section__sub">Pedidos confirmados que esperan su fecha y horario de entrega.</p>
            </div>
          </div>
          <div id="pendingOrderSlot"></div>
        </section>

        <section class="account-section">
          <div class="account-section__head">
            <div>
              <h2 class="account-section__title">Historial de compras</h2>
              <p class="account-section__sub">Tus pedidos anteriores con nolimits.</p>
            </div>
          </div>
          <div id="historySlot"></div>
        </section>

        <section class="account-section">
          <div class="account-section__head">
            <div>
              <h2 class="account-section__title">Cupones</h2>
              <p class="account-section__sub">Descuentos disponibles para tu próxima compra.</p>
            </div>
          </div>
          <div class="coupon-grid" id="couponSlot"></div>
        </section>
      </main>
    `;

    document.getElementById("newOrderBtn").addEventListener("click", () => {
      NOLIMITS.navigate("/catalogo");
    });
    const goCartBtn = document.getElementById("goCartBtn");
    if (goCartBtn) goCartBtn.addEventListener("click", () => NOLIMITS.navigate("/carrito"));

    /* Pedidos pendientes (ya confirmados, en espera de su horario) */
    const pendingSlot = document.getElementById("pendingOrderSlot");
    if (!pendingOrders.length) {
      pendingSlot.innerHTML = `<p class="account-empty">No tienes pedidos pendientes por ahora.</p>`;
    } else {
      pendingSlot.innerHTML = pendingOrders.map((o) => orderCardHTML(o, { showManageActions: true })).join("");
      pendingSlot.querySelectorAll("[data-order]").forEach((btn) => {
        btn.addEventListener("click", () => NOLIMITS.navigate(`/cuenta?pedido=${btn.dataset.order}`));
      });
      pendingSlot.querySelectorAll("[data-deliver]").forEach((btn) => {
        btn.addEventListener("click", () => {
          NOLIMITS.updateOrderStatus(btn.dataset.deliver, "Entregado");
          NOLIMITS.showToast("Pedido marcado como entregado.");
          renderCuenta(query);
        });
      });
    }

    /* Historial */
    const historySlot = document.getElementById("historySlot");
    if (!historyOrders.length) {
      historySlot.innerHTML = `<p class="account-empty">Todavía no tienes compras registradas.</p>`;
    } else {
      historySlot.innerHTML = historyOrders.map((o) => orderCardHTML(o)).join("");
      historySlot.querySelectorAll("[data-order]").forEach((btn) => {
        btn.addEventListener("click", () => {
          NOLIMITS.navigate(`/cuenta?pedido=${btn.dataset.order}`);
        });
      });
    }

    /* Cupones */
    const couponSlot = document.getElementById("couponSlot");
    couponSlot.innerHTML = NOLIMITS_COUPONS.map((c) => {
      const used = NOLIMITS.isCouponUsed(c.codigo);
      return `
      <div class="coupon-card ${used ? "is-used" : ""}">
        <span class="coupon-card__code"><i class="fa-solid fa-tag"></i> ${c.codigo}</span>
        <p class="coupon-card__desc">${c.desc}</p>
        <span class="coupon-card__valid">${c.valido}</span>
        ${used
          ? `<div class="coupon-card__footer"><span class="coupon-card__badge">Usado</span><button class="coupon-card__reactivate" data-reactivate="${c.codigo}">Reactivar</button></div>`
          : `<div class="coupon-card__footer"><span class="coupon-card__badge coupon-card__badge--ok">Disponible</span></div>`}
      </div>`;
    }).join("");

    couponSlot.querySelectorAll("[data-reactivate]").forEach((btn) => {
      btn.addEventListener("click", () => {
        NOLIMITS.reactivateCoupon(btn.dataset.reactivate);
        NOLIMITS.showToast(`Cupón ${btn.dataset.reactivate} reactivado.`);
        renderCuenta(query);
      });
    });
  }

  /* ---------------- RECIBO DIGITAL ---------------- */
  function renderRecibo(pedidoId) {
    let order = null;
    let items = [];
    let fecha = "";
    let direccion = "";
    let horario = "";
    let estado = "";
    let nombre = "";
    let totales = null;

    if (pedidoId === "pendiente") {
      /* Vista previa del carrito sin confirmar todavía (aún no tiene los
         datos de entrega, esos solo existen una vez que se confirma el pedido). */
      const cart = NOLIMITS.getCart();
      items = resolveOrderItems(cart);
      fecha = "Por confirmar";
      direccion = "Se define al confirmar el pedido";
      horario = "Se define al confirmar el pedido";
      estado = "En carrito";
      nombre = "Por confirmar";
      order = items.length ? { id: "Pedido actual" } : null;
      totales = items.length ? NOLIMITS.calcTotals(items, NOLIMITS.getAppliedCoupon()) : null;
    } else {
      order = NOLIMITS.getOrder(pedidoId);
      if (order) {
        items = resolveOrderItems(order.items);
        fecha = order.fecha;
        direccion = order.direccion;
        horario = order.horario;
        estado = order.estado;
        nombre = order.nombre || "—";
        totales = order.totales || NOLIMITS.calcTotals(items);
      }
    }

    if (!order || !items.length) {
      app().innerHTML = `
        <main class="container account-page">
          <div class="receipt">
            <button class="receipt__back" id="backBtn"><i class="fa-solid fa-arrow-left"></i> Volver a mi cuenta</button>
            <div class="receipt__notfound">
              <h1>No encontramos ese pedido</h1>
              <p>Puede que ya no tengas productos en el carrito o el pedido no exista.</p>
            </div>
          </div>
        </main>`;
      document.getElementById("backBtn").addEventListener("click", () => NOLIMITS.navigate("/cuenta"));
      return;
    }

    const { subtotal, descuento, envio, total } = totales;
    const orderLabel = pedidoId === "pendiente" ? "Pedido actual" : `Pedido ${pedidoId}`;

    app().innerHTML = `
      <main class="container account-page">
        <div class="receipt">
          <button class="receipt__back" id="backBtn"><i class="fa-solid fa-arrow-left"></i> Volver a mi cuenta</button>

          <div class="receipt__head">
            <img class="receipt__logo" src="assets/img/logo.png" alt="nolimits Postrería">
            <p>Recibo digital de compra</p>
            <p>${orderLabel}</p>
          </div>

          <div class="receipt__meta">
            <div><span class="label">Nombre de quien pagó</span><span>${nombre}</span></div>
            <div><span class="label">Estado</span><span>${estado}</span></div>
            <div><span class="label">Dirección de entrega</span><span>${direccion}</span></div>
            <div><span class="label">Horario</span><span>${horario}</span></div>
            <div><span class="label">Fecha</span><span>${fecha}</span></div>
            ${totales.cuponCodigo ? `<div><span class="label">Cupón</span><span>${totales.cuponCodigo}</span></div>` : ""}
          </div>

          <div class="receipt__items">
            ${items.map((i) => `
              <div class="receipt__item">
                <span class="receipt__item-name" data-id="${i.id}">
                  ${i.nombre} × ${i.cantidad}
                  ${i.extras && i.extras.length ? `<span class="receipt__item-extras">+ ${i.extras.map((e) => e.nombre).join(", ")}</span>` : ""}
                </span>
                <span>${NOLIMITS.money(i.precio * i.cantidad)}</span>
              </div>`).join("")}
          </div>

          <div class="receipt__totals">
            <div class="receipt__row"><span>Subtotal</span><span>${NOLIMITS.money(subtotal)}</span></div>
            ${descuento > 0 ? `<div class="receipt__row"><span>Descuento${totales.cuponCodigo ? " (" + totales.cuponCodigo + ")" : ""}</span><span>−${NOLIMITS.money(descuento)}</span></div>` : ""}
            <div class="receipt__row"><span>Domicilio</span><span>${envio === 0 ? "Gratis" : NOLIMITS.money(envio)}</span></div>
            <div class="receipt__row is-total"><span>Total</span><span>${NOLIMITS.money(total)}</span></div>
          </div>
        </div>
      </main>`;

    document.getElementById("backBtn").addEventListener("click", () => NOLIMITS.navigate("/cuenta"));
    document.querySelectorAll(".receipt__item-name").forEach((el) => {
      el.addEventListener("click", () => NOLIMITS.navigate(`/producto?id=${el.dataset.id}`));
    });
  }

  return {
    home: renderHome,
    catalogo: renderCatalogo,
    producto: renderProducto,
    carrito: renderCarrito,
    cuenta: renderCuenta,
  };
})();

/* =========================================================
   Enrutador principal
   ========================================================= */
function nolimitsRouter() {
  const { path, query } = NOLIMITS.parseHash();
  const known = ["home", "catalogo", "producto", "carrito", "cuenta"];
  const page = known.includes(path) ? path : "home";
  const navKey = page === "producto" ? "catalogo" : page === "cuenta" ? "" : page === "carrito" ? "pedidos" : page;

  NOLIMITS.renderChrome(navKey);
  NOLIMITS_VIEWS[page](query);
  window.scrollTo(0, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) window.location.hash = "#/home";
  nolimitsRouter();
});

window.addEventListener("hashchange", nolimitsRouter);
