// TheWebWiz — landing page app
import React, { useState, useEffect, useRef } from "react";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  accent: "#FF5B2E",
  mode: "dark",
  density: "regular",
  displayFont: "Instrument Serif",
}; /*EDITMODE-END*/

const NAV = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const SERVICES = [
  {
    num: "01",
    title: "Custom websites",
    desc: "Marketing sites designed and built around your business. No templates, no bloat.",
  },
  {
    num: "02",
    title: "AI chatbots",
    desc: "A website assistant trained on your business that answers questions and books leads around the clock.",
  },
  {
    num: "03",
    title: "Shopify storefronts",
    desc: "Custom themes, integrated apps, and Shopify CMS your operators can actually use.",
  },
  {
    num: "04",
    title: "Local SEO",
    desc: "On-page, technical, and local-pack work that gets you found where it counts.",
  },
  {
    num: "05",
    title: "Google & Meta ads",
    desc: "Campaigns built and managed by people who care about CAC, not vanity metrics.",
  },
  {
    num: "06",
    title: "Brand identity",
    desc: "Wordmarks, type systems, and design tokens that travel from web into print.",
  },
  {
    num: "07",
    title: "Edits & retainers",
    desc: "Unlimited small changes on a flat monthly. Reply to a Slack message, see it ship.",
  },
  {
    num: "08",
    title: "AI automation",
    desc: "Automated lead follow-up, intake forms, and admin workflows that save your team hours every week.",
  },
];

const TRIO = [
  {
    num: "01",
    title: "Mobile-first, always",
    desc: "Every site we ship is engineered for thumbs first, then scaled up — because that's where 70% of your visitors are.",
  },
  {
    num: "02",
    title: "Built from scratch",
    desc: "No WordPress, no Wix, no templates. Clean, modern code that stays fast and is easy to update.",
  },
  {
    num: "03",
    title: "Sub-second loads",
    desc: "Most sites we ship hit 100 on Lighthouse. The rest are 95+ and we're iterating. Speed is a feature.",
  },
];

const PORTFOLIO = [
  {
    name: "Valley Construction Supply",
    sector: "Building Materials · Seattle, WA",
    desc: "Catalog-driven site for a 35-year construction supplier. Inventory feeds, quote requests, and a trade-account portal.",
    year: "2025",
  },
  {
    name: "Dr. Victoria Chan",
    sector: "Naturopathic Medicine · CA",
    desc: "A custom design for a holistic mental-health practice. Booking integration, client intake forms, blog CMS.",
    year: "2025",
  },
  {
    name: "Casablanca Bakery",
    sector: "Restaurant · Multilingual",
    desc: "Editable menu, custom CMS, and an English/Spanish toggle. Ships in under 800ms on 4G.",
    year: "2024",
  },
  {
    name: "Northbound Outfitters",
    sector: "Outdoor Retail · Bozeman, MT",
    desc: "Shopify rebuild with a custom theme, lookbook editor, and trip-planner integration.",
    year: "2024",
  },
  {
    name: "Studio Fern",
    sector: "Architecture · NYC",
    desc: "Editorial portfolio with a project archive, press wall, and a hidden ops dashboard for the studio.",
    year: "2024",
  },
  {
    name: "Harbor & Pine CPAs",
    sector: "Accounting · Los Angeles, CA",
    desc: "Lead-gen site with a tax-deadline calculator, document upload portal, and a client login.",
    year: "2023",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    name: "Avery L.",
    co: "Northwind Goods Co.",
    loc: "Portland, OR",
  },
  {
    quote:
      "Phasellus auctor lectus a justo dignissim, eget pretium urna gravida. Pellentesque habitant morbi tristique senectus et netus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
    name: "Jordan M.",
    co: "Cascade Field Supply",
    loc: "Boulder, CO",
  },
  {
    quote:
      "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa.",
    name: "Sasha T.",
    co: "Mariner & Bell Studio",
    loc: "Halifax, NS",
  },
];

const FAQ = [
  {
    q: "Why not WordPress?",
    a: "WordPress sites carry 200+ database queries, dozens of plugins, and load 3–5MB on first paint. Our sites are a fraction of that. Result: faster loads, better SEO, fewer security holes, and no monthly plugin updates that break things.",
  },
  {
    q: "How long does a project take?",
    a: "A standard 5-page small business site ships in 2–3 weeks from kickoff. Custom builds and e-commerce projects run 4–8 weeks depending on scope. We give you a fixed timeline at signing and we hit it.",
  },
  {
    q: "Do you handle hosting?",
    a: "Yes — we host on a CDN-backed static infrastructure. $25/mo flat. Includes SSL, daily backups, and a 99.99% uptime guarantee. You can also self-host; we'll hand you a deploy-ready repo.",
  },
  {
    q: "What about edits after launch?",
    a: "Two options. Pay $100/page for ad-hoc edits, or add the +$50/mo unlimited edits retainer and get same-day turnaround on small changes via Slack or email.",
  },
  {
    q: "Can I see real performance scores?",
    a: "Every site we build is engineered for a 95+ Lighthouse mobile score before launch, with most landing at a perfect 100. We'll show you the live PageSpeed report for your own site before we hand it off.",
  },
  {
    q: "Do you take equity or revenue share?",
    a: "No. We work flat-rate or monthly. Aligned incentives are good — but we keep the engagement clean so we can focus on shipping the best site we know how.",
  },
  {
    q: "What can AI actually do for my business?",
    a: "A chatbot on your site that answers common questions and books appointments 24/7, even when you're closed. Automated follow-up that texts or emails a lead the moment they fill out a form, instead of hours later. And simple automations for intake forms and admin work that save your team real time every week. We'll help you figure out which of these is worth it for your business before we build anything.",
  },
];

// ── small components ───────────────────────────────────────────

function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={`reveal${shown ? " in" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}

function Counter({ to, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const t0 = performance.now();
            const tick = (now) => {
              const p = Math.min(1, (now - t0) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setV(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

function GaugeRing({ value, size = 64 }) {
  const r = 26,
    c = 2 * Math.PI * r;
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const t0 = performance.now();
            const tick = (now) => {
              const p = Math.min(1, (now - t0) / 1400);
              const eased = 1 - Math.pow(1 - p, 3);
              setV(value * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return (
    <div className="gauge-ring" ref={ref} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={r}
          stroke="var(--line)"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r={r}
          stroke="var(--accent)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v / 100)}
          strokeLinecap="round"
        />
      </svg>
      <div className="num">{Math.round(v)}</div>
    </div>
  );
}

function Glyph({ kind }) {
  // Tiny, geometric, never illustrative.
  const stroke = "currentColor",
    sw = 1.4;
  const ic = {
    code: (
      <>
        <path d="M9 8L4 12L9 16" />
        <path d="M15 8L20 12L15 16" />
      </>
    ),
    cms: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="0.5" />
        <path d="M4 9h16" />
        <circle cx="6.5" cy="7" r="0.6" fill={stroke} />
      </>
    ),
    cart: (
      <>
        <path d="M3 5h2l2 11h11l2-8H7" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </>
    ),
    seo: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l5 5" />
      </>
    ),
    ads: (
      <>
        <path d="M5 14V10l10-5v14L5 14z" />
        <path d="M5 10h-1a2 2 0 000 4h1" />
      </>
    ),
    brand: (
      <>
        <circle cx="9" cy="9" r="4" />
        <circle cx="15" cy="15" r="4" />
      </>
    ),
    wrench: (
      <>
        <path d="M14.5 4a4 4 0 015 5l-9 9-5 1 1-5 8-10z" />
      </>
    ),
    gauge: (
      <>
        <path d="M4 16a8 8 0 1116 0" />
        <path d="M12 16l4-4" />
      </>
    ),
    chat: (
      <>
        <path d="M4 5h16v11H9l-5 4V5z" />
        <path d="M8 10h8" />
        <path d="M8 13h5" />
      </>
    ),
    flow: (
      <>
        <rect x="3" y="4" width="6" height="5" />
        <rect x="15" y="15" width="6" height="5" />
        <path d="M6 9v4a2 2 0 002 2h7" />
        <path d="M13 13l2 2-2 2" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
    >
      {ic[kind]}
    </svg>
  );
}

const SVC_GLYPHS = [
  "code",
  "chat",
  "cart",
  "seo",
  "ads",
  "brand",
  "wrench",
  "flow",
];

// ── sections ───────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="brand">
          <span className="brand-mark">/</span>
          <span>thewebwiz</span>
        </a>
        <div className="nav-links">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="nav-cta">
          <span className="dot" />
          Start a project
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-meta mono">
        <span>
          <b>EST.</b> &nbsp;Independent studio · Los Angeles, CA
        </span>
        <span>
          <b>CLIENTS</b> &nbsp;US & Canada
        </span>
        <span style={{ color: "var(--accent)" }}>● Booking Q1 2027</span>
      </div>
      <Reveal as="h1" className="display">
        Websites and AI
        <br />
        <em>
          that work as hard
          <br />
          as you do.
        </em>
      </Reveal>
      <div className="hero-sub">
        <p>
          TheWebWiz is a Los Angeles studio building websites, online stores,
          and AI tools for small businesses in the US and Canada. Fast sites
          that rank and convert, plus chatbots and automations that handle the
          busywork.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Start a project <span className="btn-arrow">→</span>
          </a>
          <a href="#services" className="btn-ghost">
            See what we do
          </a>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Custom design",
    "Sub-second loads",
    "AI chatbots",
    "Lead automation",
    "Local SEO",
    "Built in the USA",
    "Unlimited edits",
    "Mobile-first",
  ];
  const all = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((t, i) => (
          <span key={i}>
            {t} <span className="dot">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function WhatWeDo() {
  return (
    <section className="section" id="approach">
      <div className="section-head">
        <div className="section-eyebrow">
          <span className="num">[01]</span> Approach
        </div>
        <div>
          <h2 className="section-title">
            A studio for businesses tired of <em>waiting on websites.</em>
          </h2>
          <p className="section-lede">
            Most agencies give you WordPress, a calendar full of meetings, and a
            final invoice that doesn't match the proposal. We're built
            differently — small team, flat rates, fast turnarounds, code we'd be
            proud to show another developer.
          </p>
        </div>
      </div>
      <div className="trio">
        {TRIO.map((t) => (
          <Reveal key={t.num}>
            <div>
              <div className="trio-num">{t.num} —</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="section-head">
        <div className="section-eyebrow">
          <span className="num">[02]</span> Services
        </div>
        <div>
          <h2 className="section-title">
            Websites, growth, <em>and AI.</em>
          </h2>
          <p className="section-lede">
            Design, development, SEO, ads, and AI tools under one roof. Pick
            what you need.
          </p>
        </div>
      </div>
      <div className="svc-grid">
        {SERVICES.map((s, i) => (
          <div key={s.num} className="svc-cell">
            <div>
              <div className="svc-glyph">
                <Glyph kind={SVC_GLYPHS[i]} />
              </div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
            <div className="mono">{s.num}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section className="section" id="about">
      <div className="section-head">
        <div className="section-eyebrow">
          <span className="num">[03]</span> The offer
        </div>
        <div>
          <h2 className="section-title">
            Sites starting at <em>$0 down,</em> $175/mo.
          </h2>
          <p className="section-lede">
            A 12-month engagement that includes design, development, hosting,
            unlimited edits, 24/7 support, and lifetime updates. Zero up-front.
            Cancel any time after year one.
          </p>
        </div>
      </div>
      <div className="offer">
        <div className="portrait">
          <div className="portrait-card">
            <b>Studio Lead</b>
            <span>thewebwiz</span>
          </div>
        </div>
        <div>
          <div className="offer-features">
            <div>
              <h5>Static-first</h5>
              <p>
                Every page is pre-rendered HTML. No databases to hack, no
                plugins to update, nothing to break in the middle of the night.
              </p>
            </div>
            <div>
              <h5>100 PageSpeed</h5>
              <p>
                We engineer for perfect Lighthouse scores from the first commit.
                Fast loads compound into more traffic and more conversions.
              </p>
            </div>
            <div>
              <h5>Money-back guarantee</h5>
              <p>
                If we can't ship a design you love within the first 30 days, you
                get a full refund and walk away with no contract.
              </p>
            </div>
            <div>
              <h5>Custom designed</h5>
              <p>
                No themes. No template marketplaces. Every site is designed
                in-house from a brief, and the code is yours to keep.
              </p>
            </div>
            <div>
              <h5>Real human support</h5>
              <p>
                You text the studio lead directly. No ticket portal, no
                offshore call center. Same-day responses, every day.
              </p>
            </div>
            <div>
              <h5>SEO done right</h5>
              <p>
                No snake oil. We explain exactly how SEO works, what we'll do
                for you, and how to measure it. Monthly reports, no fluff.
              </p>
            </div>
          </div>
          <div className="offer-cta">
            <a href="#contact" className="btn-primary">
              Schedule a call <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="section" id="work">
      <div className="section-head">
        <div className="section-eyebrow">
          <span className="num">[04]</span> Selected work
        </div>
        <div>
          <h2 className="section-title">
            Built for <em>every industry you can think of.</em>
          </h2>
          <p className="section-lede">
            Home services, restaurants, consulting, healthcare, retail,
            accounting. Real businesses with real customers.
          </p>
        </div>
      </div>
      <div className="portfolio-grid">
        {PORTFOLIO.map((p, i) => (
          <div key={p.name} className="case">
            <div className="case-frame">
              <div className="browser-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="case-thumb" />
            </div>
            <div className="case-meta">
              <span className="mono">
                [ {String(i + 1).padStart(2, "0")} / {p.year} ]
              </span>
              <a href="#">Visit ↗</a>
            </div>
            <h4>{p.name}</h4>
            <p>{p.desc}</p>
            <div className="mono" style={{ color: "var(--ink-3)" }}>
              {p.sector}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Performance() {
  const [tab, setTab] = useState("mobile");
  const scores =
    tab === "mobile"
      ? { perf: 100, a11y: 100, bp: 100, seo: 100 }
      : { perf: 100, a11y: 98, bp: 100, seo: 100 };
  const metrics =
    tab === "mobile"
      ? [
          ["First Contentful Paint", "0.4s"],
          ["Largest Contentful Paint", "0.9s"],
          ["Total Blocking Time", "0ms"],
          ["Cumulative Layout Shift", "0.001"],
          ["Speed Index", "0.7s"],
        ]
      : [
          ["First Contentful Paint", "0.2s"],
          ["Largest Contentful Paint", "0.5s"],
          ["Total Blocking Time", "0ms"],
          ["Cumulative Layout Shift", "0.000"],
          ["Speed Index", "0.4s"],
        ];
  return (
    <section className="section" id="performance">
      <div className="section-head">
        <div className="section-eyebrow">
          <span className="num">[04]</span> Performance
        </div>
        <div>
          <h2 className="section-title">
            Numbers <em>we ship by.</em>
          </h2>
          <p className="section-lede">
            If your site takes more than 3 seconds to load, half your visitors
            are gone before they see it. Ours load in under one. Every time.
          </p>
        </div>
      </div>
      <div className="perf">
        <div>
          <div className="perf-stats">
            <div className="stat">
              <div className="stat-num">
                <Counter to={100} />
                <span className="unit">%</span>
              </div>
              <div className="stat-label mono">Satisfaction guaranteed</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                <Counter to={100} />
              </div>
              <div className="stat-label mono">PageSpeed scores</div>
            </div>
          </div>
          <p
            style={{
              marginTop: 32,
              color: "var(--ink-2)",
              fontSize: 16,
              lineHeight: 1.55,
              maxWidth: "52ch",
            }}
          >
            Every site is built and tuned for Google's Core Web Vitals. The
            result is a site that ranks higher, converts better, and gives your
            visitors zero reasons to bounce.
          </p>
          <div style={{ marginTop: 24 }}>
            <a href="#contact" className="btn-primary">
              Get an audit <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
        <div className="perf-card">
          <div className="perf-card-head">
            <div className="mono">PageSpeed Insights</div>
            <div className="perf-tabs">
              <button
                className={tab === "mobile" ? "on" : ""}
                onClick={() => setTab("mobile")}
              >
                Mobile
              </button>
              <button
                className={tab === "desktop" ? "on" : ""}
                onClick={() => setTab("desktop")}
              >
                Desktop
              </button>
            </div>
          </div>
          <div className="gauges" key={tab}>
            <div className="gauge">
              <GaugeRing value={scores.perf} />
              <div className="gauge-label">Perf</div>
            </div>
            <div className="gauge">
              <GaugeRing value={scores.a11y} />
              <div className="gauge-label">A11y</div>
            </div>
            <div className="gauge">
              <GaugeRing value={scores.bp} />
              <div className="gauge-label">Best</div>
            </div>
            <div className="gauge">
              <GaugeRing value={scores.seo} />
              <div className="gauge-label">SEO</div>
            </div>
          </div>
          <div className="perf-rows">
            {metrics.map(([l, v]) => (
              <div key={l} className="perf-row">
                <span className="lbl">{l}</span>
                <span className="val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [mode, setMode] = useState("monthly");
  const tiers =
    mode === "monthly"
      ? [
          {
            name: "Starter",
            sub: "5-page small business site",
            amt: "$175",
            per: "/mo · 12 mo min",
            feat: [
              "Design & development",
              "Hosting included",
              "+$50/mo unlimited edits",
              "+$250 add a blog",
              "Lifetime updates",
            ],
            off: ["Bespoke integrations", "E-commerce"],
          },
          {
            name: "Growth",
            sub: "Custom build with CMS",
            amt: "$295",
            per: "/mo · 12 mo min",
            feat: [
              "Everything in Starter",
              "Custom CMS",
              "Unlimited edits included",
              "Blog & newsletter",
              "24/7 support",
              "SEO setup",
            ],
            off: ["E-commerce"],
            featured: true,
          },
          {
            name: "Commerce",
            sub: "Custom Shopify storefront",
            amt: "$8k",
            per: "starting · then $295/mo",
            feat: [
              "Custom Shopify theme",
              "Configure all apps",
              "Integrated shipping",
              "Multi-currency",
              "+$50/mo unlimited edits",
              "24/7 support",
            ],
            off: [],
          },
        ]
      : [
          {
            name: "Starter",
            sub: "5-page small business site",
            amt: "$3,800",
            per: "+ $25/mo hosting",
            feat: [
              "Design & development",
              "$25/mo hosting",
              "$100/page after 5",
              "+$50/mo unlimited edits",
              "+$250 add a blog",
            ],
            off: ["24/7 support", "Lifetime updates"],
          },
          {
            name: "Growth",
            sub: "Custom build with CMS",
            amt: "$6,500",
            per: "+ $25/mo hosting",
            feat: [
              "Everything in Starter",
              "Custom CMS",
              "Unlimited edits add-on",
              "Blog & newsletter",
              "Priority support",
            ],
            off: ["24/7 support"],
            featured: true,
          },
          {
            name: "Commerce",
            sub: "Custom Shopify storefront",
            amt: "$12k",
            per: "starting",
            feat: [
              "Custom Shopify theme",
              "Configure all apps",
              "Integrated shipping",
              "Multi-currency",
              "+$50/mo unlimited edits",
            ],
            off: ["24/7 support"],
          },
        ];
  return (
    <section className="section" id="pricing">
      <div className="section-head">
        <div className="section-eyebrow">
          <span className="num">[05]</span> Pricing
        </div>
        <div>
          <h2 className="section-title">
            Packages for <em>every budget.</em>
          </h2>
          <p className="section-lede">
            Two ways to pay: a flat monthly subscription with everything bundled
            in, or a one-time lump sum with hosting on the side. Same site
            either way.
          </p>
          <div className="price-toggle">
            <button
              className={mode === "monthly" ? "on" : ""}
              onClick={() => setMode("monthly")}
            >
              Monthly
            </button>
            <button
              className={mode === "lump" ? "on" : ""}
              onClick={() => setMode("lump")}
            >
              Lump sum
            </button>
          </div>
        </div>
      </div>
      <div className="pricing-grid">
        {tiers.map((t) => (
          <div key={t.name} className={`tier${t.featured ? " featured" : ""}`}>
            <h3>{t.name}</h3>
            <div className="tier-sub">{t.sub}</div>
            <div className="tier-price">
              <span className="amt">{t.amt}</span>
              <span className="per">{t.per}</span>
            </div>
            <ul className="tier-feats">
              {t.feat.map((f) => (
                <li key={f}>{f}</li>
              ))}
              {t.off.map((f) => (
                <li key={f} className="off">
                  {f}
                </li>
              ))}
            </ul>
            <div className="tier-cta">
              <a
                href="#contact"
                className={t.featured ? "btn-primary" : "btn-ghost"}
              >
                Choose {t.name} <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Quotes() {
  return (
    <section className="section" id="testimonials">
      <div className="section-head">
        <div className="section-eyebrow">
          <span className="num">[07]</span> Kind words
        </div>
        <div>
          <h2 className="section-title">
            Trusted by businesses <em>across the country.</em>
          </h2>
          <p className="section-lede">
            Small business owners across the US and Canada who got the website
            they'd been waiting for. When you work with TheWebWiz, you're
            working with a partner — not an agency.
          </p>
        </div>
      </div>
      <div className="quotes">
        {TESTIMONIALS.map((t) => (
          <Reveal key={t.name}>
            <div className="quote">
              <div className="quote-mark">"</div>
              <p>{t.quote}</p>
              <div className="quote-cite">
                <div>
                  <b>{t.name}</b>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--mono)",
                      fontSize: 10.5,
                      color: "var(--ink-3)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      marginTop: 2,
                    }}
                  >
                    {t.co}
                  </span>
                </div>
                <span>{t.loc}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="faq">
        <div>
          <div className="section-eyebrow" style={{ marginBottom: 24 }}>
            <span className="num">[06]</span> FAQ
          </div>
          <h2 className="section-title">
            Common <em>questions.</em>
          </h2>
          <p className="section-lede">
            If yours isn't here, just ask — we reply same-day.
          </p>
        </div>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? " open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="faq-q">
                <h4>{f.q}</h4>
                <div className="faq-toggle">{open === i ? "−" : "+"}</div>
              </div>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [vals, setVals] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    msg: "",
  });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k, v) => setVals({ ...vals, [k]: v });
  const submit = (e) => {
    e.preventDefault();
    const ne = {};
    if (!vals.name.trim()) ne.name = "required";
    if (!/^\S+@\S+\.\S+$/.test(vals.email)) ne.email = "valid email required";
    if (!vals.msg.trim() || vals.msg.length < 10)
      ne.msg = "tell us a bit more (10+ chars)";
    setErrs(ne);
    if (Object.keys(ne).length === 0) setSent(true);
  };
  if (sent) {
    return (
      <section className="contact" id="contact">
        <div className="contact-cta">
          <h2>
            Got it. <em>Talk soon.</em>
          </h2>
          <p>
            Your message is in. Expect a reply from the studio within a few
            hours, often less. In the meantime, browse the work or come back and
            tweak the design above.
          </p>
        </div>
        <div className="form-success">
          <b>SENT —</b> Thanks {vals.name}. We'll be in touch at {vals.email}.
        </div>
      </section>
    );
  }
  return (
    <section className="contact" id="contact">
      <div className="contact-cta">
        <h2>
          Let's build <em>something fast.</em>
        </h2>
        <p>
          Tell us about the project. We'll come back with a fixed quote, a
          timeline, and a date we can ship — usually within 24 hours.
        </p>
        <div className="contact-meta">
          <div className="item">
            <span className="mono">Email</span>
            <b>hello@thewebwiz.us</b>
          </div>
          <div className="item">
            <span className="mono">Phone</span>
            <b>+1 (719) 213-5621</b>
          </div>
          <div className="item">
            <span className="mono">Hours</span>
            <b>Mon–Fri · 9–6 PT · Los Angeles</b>
          </div>
          <div className="item">
            <span className="mono">Booking</span>
            <b>Q1 2027 · 2 slots open</b>
          </div>
        </div>
      </div>
      <form className="form" onSubmit={submit} noValidate>
        <div className={`field${errs.name ? " error" : ""}`}>
          <label>Name</label>
          <input
            value={vals.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Jane Smith"
          />
          {errs.name && <span className="field-err">— {errs.name}</span>}
        </div>
        <div className={`field${errs.email ? " error" : ""}`}>
          <label>Email</label>
          <input
            type="email"
            value={vals.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jane@company.com"
          />
          {errs.email && <span className="field-err">— {errs.email}</span>}
        </div>
        <div className="field row2">
          <div>
            <label>Company</label>
            <input
              value={vals.company}
              onChange={(e) => set("company", e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div>
            <label>Budget</label>
            <select
              value={vals.budget}
              onChange={(e) => set("budget", e.target.value)}
            >
              <option value="">Select range</option>
              <option>Under $5k</option>
              <option>$5–10k</option>
              <option>$10–25k</option>
              <option>$25k+</option>
              <option>Monthly subscription</option>
            </select>
          </div>
        </div>
        <div className={`field${errs.msg ? " error" : ""}`}>
          <label>Project</label>
          <textarea
            value={vals.msg}
            onChange={(e) => set("msg", e.target.value)}
            placeholder="A few sentences about what you're building, your timeline, and anything we should know."
          ></textarea>
          {errs.msg && <span className="field-err">— {errs.msg}</span>}
        </div>
        <div className="form-foot">
          <span className="mono" style={{ color: "var(--ink-3)" }}>
            We reply same day.
          </span>
          <button type="submit" className="btn-primary" style={{ border: 0 }}>
            Send inquiry <span className="btn-arrow">→</span>
          </button>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <>
      <footer>
        <div className="col-brand">
          <a href="#" className="brand">
            <span className="brand-mark">/</span>
            <span>thewebwiz</span>
          </a>
          <p>
            An independent studio in Los Angeles building websites and AI tools
            for small businesses across the US and Canada.
          </p>
        </div>
        <div>
          <h6>Studio</h6>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#approach">Approach</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <h6>Services</h6>
          <ul>
            <li>
              <a href="#services">Custom websites</a>
            </li>
            <li>
              <a href="#services">E-commerce</a>
            </li>
            <li>
              <a href="#services">SEO</a>
            </li>
            <li>
              <a href="#services">AI chatbots &amp; automation</a>
            </li>
          </ul>
        </div>
        <div>
          <h6>Contact</h6>
          <ul>
            <li>
              <a href="mailto:hello@thewebwiz.us">hello@thewebwiz.us</a>
            </li>
            <li>
              <a href="tel:+17192135621">+1 (719) 213-5621</a>
            </li>
            <li>
              <a href="#">LinkedIn ↗</a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="foot-bottom">
        <span>© 2026 TheWebWiz Studio</span>
        <span>Built in Los Angeles, CA</span>
      </div>
    </>
  );
}

// ── app root ───────────────────────────────────────────────────

function App() {
  const [t] = useState(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = t.mode;
    root.dataset.density = t.density;
    root.style.setProperty("--accent", t.accent);
    // pick a contrasting ink-on-accent color
    const hex = t.accent.replace("#", "");
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      root.style.setProperty(
        "--accent-ink",
        lum > 0.55 ? "#1a1208" : "#fff8f1",
      );
    }
    const fam = `"${t.displayFont}", ui-serif, Georgia, serif`;
    root.style.setProperty("--display", fam);
    if (t.displayFont === "Geist") {
      root.style.setProperty(
        "--display",
        `"Geist", ui-sans-serif, system-ui, sans-serif`,
      );
    }
  }, [t]);

  // dynamically load alternate display fonts if needed
  useEffect(() => {
    const fonts = ["Fraunces", "DM Serif Display"];
    fonts.forEach((f) => {
      const id = "fnt-" + f.replace(/\s+/g, "-");
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${f.replace(/\s+/g, "+")}:ital@0;1&display=swap`;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <WhatWeDo />
      <Services />
      <Offer />
      {/* Portfolio hidden until we have real shipped sites to show */}
      <Performance />
      <Pricing />
      {/* Quotes hidden until we have real client testimonials */}
      <FaqSection />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
