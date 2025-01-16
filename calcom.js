(function (C, A, L) {
  alert('is inside')
  let p = function (a, ar) {
    a.q.push(ar);
  };
  let d = C.document;
  console.log(d)
  // Obtener el elemento <script> actual
  let currentScript = d.currentScript || d.querySelector('script[src*="calcom.js"]');

  // Obtener el valor del atributo 'link'
  let link = currentScript.getAttribute('link');

  C.Cal =
    C.Cal ||
    function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };

  // Inicializar Cal con el namespace "15min"
  Cal("init", "15min", { origin: "https://cal.com" });

  Cal.ns["15min"]("inline", {
    elementOrSelector: "#my-cal-inline",
    config: { layout: "month_view" },
    calLink: link, // Usar el valor extraído
  });

  Cal.ns["15min"]("ui", {
    styles: { branding: { brandColor: "#000000" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
})(window, "https://app.cal.com/embed/embed.js", "init");
