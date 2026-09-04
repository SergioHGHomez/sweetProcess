(function () {
  "use strict";


  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const EMPLOYEE_DOMAIN = "@nolimits.co";

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function setFieldError(fieldId, errorId, message) {
    const field = $("#" + fieldId).closest(".field");
    const errorEl = $("#" + errorId);
    if (message) {
      field.classList.add("has-error");
      errorEl.textContent = message;
    } else {
      field.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (sel) {
      let el = this;
      while (el) {
        if (el.matches(sel)) return el;
        el = el.parentElement;
      }
      return null;
    };
  }

  function showToast(message, type) {
    const toast = $("#toast");
    toast.innerHTML =
      (type === "success"
        ? '<i class="fa-solid fa-circle-check"></i> '
        : '<i class="fa-solid fa-circle-exclamation"></i> ') + message;
    toast.className = "toast is-" + (type || "success");
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.hidden = true; }, 3200);
  }

  function setLoading(form, isLoading) {
    const btn = form.querySelector('button[type="submit"]');
    const label = btn.querySelector(".btn-label");
    const spinner = btn.querySelector(".btn-spinner");
    btn.disabled = isLoading;
    if (label) label.style.opacity = isLoading ? "0.6" : "1";
    if (spinner) spinner.hidden = !isLoading;
  }

  const tabCliente = $("#tabCliente");
  const tabEmpleado = $("#tabEmpleado");
  const panelCliente = $("#panelCliente");
  const panelEmpleado = $("#panelEmpleado");

  function goToRole(role) {
    const isCliente = role === "cliente";

    tabCliente.classList.toggle("is-active", isCliente);
    tabEmpleado.classList.toggle("is-active", !isCliente);
    tabCliente.setAttribute("aria-selected", String(isCliente));
    tabEmpleado.setAttribute("aria-selected", String(!isCliente));

    panelCliente.hidden = !isCliente;
    panelEmpleado.hidden = isCliente;
    panelCliente.classList.toggle("is-active", isCliente);
    panelEmpleado.classList.toggle("is-active", !isCliente);

    document.body.style.background = isCliente ? "" : "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabCliente.addEventListener("click", () => goToRole("cliente"));
  tabEmpleado.addEventListener("click", () => goToRole("empleado"));


  document.querySelectorAll(".toggle-pwd").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      const icon = btn.querySelector("i");
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      icon.classList.toggle("fa-eye", !isHidden);
      icon.classList.toggle("fa-eye-slash", isHidden);
      btn.setAttribute("aria-label", isHidden ? "Ocultar contraseña" : "Mostrar contraseña");
    });
  });

  function loginUsuario(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true, nombre: email.split("@")[0] });
      }, 900);
    });
  }


  const formCliente = $("#formCliente");
  formCliente.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = $("#clienteEmail").value.trim();
    const password = $("#clientePassword").value;
    let valid = true;

    if (!email) {
      setFieldError("clienteEmail", "clienteEmailError", "Escribe tu correo electrónico.");
      valid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setFieldError("clienteEmail", "clienteEmailError", "Ese correo no parece válido.");
      valid = false;
    } else {
      setFieldError("clienteEmail", "clienteEmailError", "");
    }

    if (!password) {
      setFieldError("clientePassword", "clientePasswordError", "Escribe tu contraseña.");
      valid = false;
    } else if (password.length < 6) {
      setFieldError("clientePassword", "clientePasswordError", "Debe tener al menos 6 caracteres.");
      valid = false;
    } else {
      setFieldError("clientePassword", "clientePasswordError", "");
    }

    const note = $("#clienteFormNote");
    if (!valid) {
      note.textContent = "Revisa los campos marcados en rojo.";
      note.className = "form-note is-error";
      return;
    }

    note.textContent = "";
    note.className = "form-note";
    setLoading(formCliente, true);

    loginUsuario(email, password).then((res) => {
      setLoading(formCliente, false);
      if (res.ok) {
        note.textContent = "¡Bienvenido de vuelta, " + res.nombre + "!";
        note.className = "form-note is-success";
        showToast("Sesión iniciada como cliente", "success");
        formCliente.reset();
      }
    });
  });


  const formEmpleado = $("#formEmpleado");
  formEmpleado.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = $("#empleadoEmail").value.trim();
    const password = $("#empleadoPassword").value;
    let valid = true;

    if (!email) {
      setFieldError("empleadoEmail", "empleadoEmailError", "Escribe tu correo corporativo.");
      valid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setFieldError("empleadoEmail", "empleadoEmailError", "Ese correo no parece válido.");
      valid = false;
    } else if (!email.toLowerCase().endsWith(EMPLOYEE_DOMAIN)) {
      setFieldError("empleadoEmail", "empleadoEmailError", "Usa tu correo corporativo (" + EMPLOYEE_DOMAIN + ").");
      valid = false;
    } else {
      setFieldError("empleadoEmail", "empleadoEmailError", "");
    }

    if (!password) {
      setFieldError("empleadoPassword", "empleadoPasswordError", "Escribe tu contraseña.");
      valid = false;
    } else if (password.length < 6) {
      setFieldError("empleadoPassword", "empleadoPasswordError", "Debe tener al menos 6 caracteres.");
      valid = false;
    } else {
      setFieldError("empleadoPassword", "empleadoPasswordError", "");
    }

    const note = $("#empleadoFormNote");
    if (!valid) {
      note.textContent = "Revisa los campos marcados en rojo.";
      note.className = "form-note is-error";
      return;
    }

    note.textContent = "";
    note.className = "form-note";
    setLoading(formEmpleado, true);

    loginUsuario(email, password).then((res) => {
      setLoading(formEmpleado, false);
      if (res.ok) {
        note.textContent = "Acceso concedido, " + res.nombre + ".";
        note.className = "form-note is-success";
        showToast("Sesión iniciada como empleado", "success");
        formEmpleado.reset();
      }
    });
  });


  $("#googleLoginBtn").addEventListener("click", function () {
    showToast("Conecta tu proveedor de Google OAuth para activar este botón", "error");
  });


  const forgotModal = $("#forgotModal");
  let forgotRole = "cliente";

  document.querySelectorAll(".forgot-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      forgotRole = btn.dataset.role;
      openModal(forgotModal);
      $("#forgotEmail").focus();
    });
  });

  $("#closeForgotModal").addEventListener("click", () => closeModal(forgotModal));

  $("#formForgot").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = $("#forgotEmail").value.trim();
    const note = $("#forgotFormNote");

    if (!email || !EMAIL_REGEX.test(email)) {
      setFieldError("forgotEmail", "forgotEmailError", "Escribe un correo válido.");
      return;
    }
    setFieldError("forgotEmail", "forgotEmailError", "");

    note.textContent = "Si el correo existe, te enviamos las instrucciones.";
    note.className = "form-note is-success";

    setTimeout(() => {
      closeModal(forgotModal);
      this.reset();
      note.textContent = "";
      showToast("Revisa tu correo (" + forgotRole + ") para restablecer tu contraseña", "success");
    }, 1400);
  });

  const registerModal = $("#registerModal");
  $("#openRegister").addEventListener("click", () => {
    openModal(registerModal);
    $("#registerName").focus();
  });
  $("#closeRegisterModal").addEventListener("click", () => closeModal(registerModal));

  $("#formRegister").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = $("#registerName").value.trim();
    const email = $("#registerEmail").value.trim();
    const password = $("#registerPassword").value;
    let valid = true;

    if (!name) {
      setFieldError("registerName", "registerNameError", "Escribe tu nombre.");
      valid = false;
    } else {
      setFieldError("registerName", "registerNameError", "");
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      setFieldError("registerEmail", "registerEmailError", "Escribe un correo válido.");
      valid = false;
    } else {
      setFieldError("registerEmail", "registerEmailError", "");
    }

    if (!password || password.length < 6) {
      setFieldError("registerPassword", "registerPasswordError", "Mínimo 6 caracteres.");
      valid = false;
    } else {
      setFieldError("registerPassword", "registerPasswordError", "");
    }

    const note = $("#registerFormNote");
    if (!valid) {
      note.textContent = "Revisa los campos marcados en rojo.";
      note.className = "form-note is-error";
      return;
    }

    note.textContent = "Cuenta creada. ¡Ya puedes iniciar sesión!";
    note.className = "form-note is-success";

    setTimeout(() => {
      closeModal(registerModal);
      this.reset();
      note.textContent = "";
      $("#clienteEmail").value = email;
      showToast("Cuenta creada correctamente", "success");
    }, 1200);
  });

 
  function openModal(modal) {
    modal.hidden = false;
  }
  function closeModal(modal) {
    modal.hidden = true;
  }
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay").forEach((m) => { if (!m.hidden) closeModal(m); });
    }
  });


  const slides = document.querySelectorAll(".showcase-slide");
  const dotsWrap = $("#showcaseDots");
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Ver postre " + (i + 1));
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll("button");

  function goToSlide(index) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = index;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  function startCarousel() {
    clearInterval(timer);
    timer = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 4000);
  }

  if (slides.length) startCarousel();
})();
