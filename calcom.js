(function (C, A, L) {
  let p = function (a, ar) {
    a.q.push(ar);
  };
  let d = C.document;

  // Obtener el elemento <script> actual
  let currentScript = d.currentScript || d.querySelector('script[src*="helloWorld.js"]');
  
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
    
  Cal("init", { origin: "https://app.cal.com" });

  Cal("inline", {
    elementOrSelector: "#my-cal-inline",
    calLink: link, // Usar el valor extraído
    config: {
      theme: "light",
    },
  });

})(window, "https://app.cal.com/embed/embed.js", "init");
