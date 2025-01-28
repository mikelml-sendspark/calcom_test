function extractDomainAndLink(url) {
  // Utilizar una expresión regular para extraer el originDomain y el link
  const regex = /^https?:\/\/([^/]+)\/([^?]+)/;
  const match = url.match(regex);

  if (match) {
    const originDomain = match[1]; // El dominio principal
    const link = match[2];        // La parte del "link"
    return { originDomain, link };
  } else {
    throw new Error("URL inválida");
  }
}


(function (C, A, L) {
  let p = function (a, ar) {
    a.q.push(ar);
  };
  let d = C.document;
  let targetDiv = d.querySelector('#my-cal-inline.my-cal-inline');
  let link = targetDiv.getAttribute('src');
  const url = extractDomainAndLink(link)

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

  Cal("init", "15min", { origin: `https://${url.originDomain}` });

  Cal.ns["15min"]("inline", {
    elementOrSelector: "#my-cal-inline",
    config: { layout: "month_view" },
    calLink: url.link,
  });

  Cal.ns["15min"]("ui", {
    styles: { branding: { brandColor: "#000000" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
})(window, "https://app.cal.com/embed/embed.js", "init");
