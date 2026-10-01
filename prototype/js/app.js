/**
 * ROOTLINE prototype — shared helpers
 * Paths are relative from each page; BASE is set per shell.
 */
(function () {
  const BASE = document.documentElement.dataset.base || "..";

  window.RL = window.RL || {};

  RL.people = {
    eleanor: {
      id: "eleanor",
      name: "Eleanor Mae Norwood",
      initials: "EN",
      line: "norwood",
      living: false,
      years: "1898–1974",
      place: "San Marcos, Texas",
      honor: "civic",
      honorLabel: "Church & civic",
      sample: true,
    },
    samuel: {
      id: "samuel",
      name: 'Samuel "Sam" Hutson',
      initials: "SH",
      line: "hutson",
      living: false,
      years: "1921–1998",
      place: "Houston, Texas",
      honor: "military",
      honorLabel: "U.S. Army · WWII",
      sample: true,
    },
    margaret: {
      id: "margaret",
      name: "Margaret Norwood Hutson",
      initials: "MH",
      line: "both",
      living: false,
      years: "1924–2009",
      place: "Texas → Los Angeles",
      honor: null,
      migration: "Texas → elsewhere (Los Angeles)",
      sample: true,
    },
    charlie: {
      id: "charlie",
      name: "Charlie Hutson",
      initials: "CH",
      line: "hutson",
      living: true,
      years: "Living",
      place: "Houston, Texas",
      honor: null,
      privacy: true,
      sample: true,
    },
  };

  RL.icons = {
    tree: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M8 8l4-4 4 4M7 14l5-3 5 3M6 20h12"/></svg>',
    people: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5M14 14c2.5 0 5 1.5 5 4"/></svg>',
    stories: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4z"/><path d="M8 4v13"/></svg>',
    ask: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18l-1 3 3-1h9a4 4 0 004-4V8a4 4 0 00-4-4H8a4 4 0 00-4 4v8a4 4 0 002 3z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/></svg>',
    me: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 19c0-3.5 3-6 7-6s7 2.5 7 6"/></svg>',
  };

  function qs(sel, el) { return (el || document).querySelector(sel); }

  RL.mountSampleBanner = function () {
    if (qs(".rl-sample-banner")) return;
    const b = document.createElement("div");
    b.className = "rl-sample-banner";
    b.setAttribute("role", "status");
    b.textContent = "SAMPLE data only — fictional until Founding Steward confirms";
    document.body.prepend(b);
  };

  RL.mountMemberChrome = function (activeTab) {
    RL.mountSampleBanner();
    const bar = qs("[data-rl-app-bar]");
    if (bar) {
      bar.innerHTML = `
        <a class="rl-logo" href="${BASE}/index.html">Rootline <span>· Hutson–Norwood</span></a>
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <a class="rl-steward-link" href="${BASE}/steward/queue.html">Steward desk</a>
          <div class="rl-app-meta">Member view<br/>Prototype</div>
        </div>`;
    }
    let tabbar = qs("[data-rl-tabbar]");
    if (!tabbar) {
      tabbar = document.createElement("nav");
      tabbar.className = "rl-tabbar";
      tabbar.setAttribute("data-rl-tabbar", "");
      tabbar.setAttribute("aria-label", "Member tabs");
      document.body.appendChild(tabbar);
    }
    const tabs = [
      { id: "tree", label: "Tree", href: `${BASE}/member/tree.html` },
      { id: "people", label: "People", href: `${BASE}/member/people.html` },
      { id: "stories", label: "Stories", href: `${BASE}/member/stories.html` },
      { id: "ask", label: "Ask", href: `${BASE}/member/ask.html` },
      { id: "me", label: "Me", href: `${BASE}/member/me.html` },
    ];
    tabbar.innerHTML = tabs.map((t) => `
      <a class="rl-tab${activeTab === t.id ? " is-active" : ""}" href="${t.href}" ${activeTab === t.id ? 'aria-current="page"' : ""}>
        ${RL.icons[t.id] || ""}
        <span>${t.label}</span>
      </a>`).join("");
  };

  RL.mountStewardNav = function (active) {
    RL.mountSampleBanner();
    const bar = qs("[data-rl-app-bar]");
    if (bar) {
      bar.innerHTML = `
        <a class="rl-logo" href="${BASE}/index.html">Rootline <span>· Steward</span></a>
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <a class="rl-steward-link" href="${BASE}/member/tree.html">← Member app</a>
          <div class="rl-app-meta">Founding Steward<br/>Prototype</div>
        </div>`;
    }
    const nav = qs("[data-rl-steward-nav]");
    if (!nav) return;
    const links = [
      { id: "queue", label: "Queue", href: `${BASE}/steward/queue.html` },
      { id: "claims", label: "Claims", href: `${BASE}/steward/claims.html` },
      { id: "merge", label: "Merges", href: `${BASE}/steward/merge.html` },
      { id: "export", label: "Exports", href: `${BASE}/steward/export.html` },
      { id: "roles", label: "Roles", href: `${BASE}/steward/roles.html` },
      { id: "public", label: "Public site", href: `${BASE}/steward/public-toggles.html` },
    ];
    nav.innerHTML = links.map((l) =>
      `<a href="${l.href}" class="${active === l.id ? "is-active" : ""}" ${active === l.id ? 'aria-current="page"' : ""}>${l.label}</a>`
    ).join("");
  };

  RL.mountSiteHeader = function () {
    RL.mountSampleBanner();
    const h = qs("[data-rl-site-header]");
    if (!h) return;
    h.innerHTML = `
      <a class="rl-logo" href="${BASE}/website/home.html">Rootline</a>
      <nav class="rl-site-nav" aria-label="Website">
        <a href="${BASE}/website/home.html">Home</a>
        <a href="${BASE}/website/download.html">Download</a>
        <a href="${BASE}/member/request-access.html">Request access</a>
        <a href="${BASE}/index.html">Prototype hub</a>
      </nav>`;
  };

  RL.personHref = function (id) {
    return `${BASE}/member/person.html?id=${encodeURIComponent(id)}`;
  };

  document.addEventListener("DOMContentLoaded", function () {
    const shell = document.body.dataset.shell;
    const active = document.body.dataset.active || "";
    if (shell === "member") RL.mountMemberChrome(active);
    if (shell === "steward") RL.mountStewardNav(active);
    if (shell === "website") RL.mountSiteHeader();
    if (shell === "hub") RL.mountSampleBanner();
  });
})();
