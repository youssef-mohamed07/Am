"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { arabic } from "../app/translations";
import { siteConfig } from "../app/site-config";

const Play = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m8 5 11 7-11 7V5Z" />
  </svg>
);

const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SoundOn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
);

const SoundOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="m16 9 5 6M21 9l-5 6" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 20.5 4.4 16A8.5 8.5 0 1 1 8 19.6L3 20.5Z" /><path d="M9 10h6M9 13.5h4" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" />
  </svg>
);

const navLinks = [["#about", "About"], ["#coaching", "Coaching"], ["#ugc", "UGC Studio"], ["#transformations", "Results"], ["#reels", "Reels"], ["#faq", "FAQ"]];

const tape = ["Discipline", "Strength", "Nutrition", "Consistency", "Results", "Content"];

const features = [
  ["01", "Personal training", "Your workouts, mapped out with purpose and explained so you never feel lost."],
  ["02", "Nutrition that fits", "Flexible nutrition guidance that fuels your goals without taking over your life."],
  ["03", "Accountability", "Weekly check-ins, real feedback and a coach in your corner every step."],
  ["04", "Built to last", "Learn the habits and confidence to keep your results for good."],
];

const steps = [
  ["Apply", "Tell me about your goal, your schedule and where you're starting from."],
  ["Get your plan", "A training and nutrition plan built for you, ready within days."],
  ["Check in & level up", "Weekly check-ins, adjustments and support until the result shows."],
];

const instagram = "https://www.instagram.com/abdullahmuhhameed/";
const whatsapp = "https://wa.me/201017055212";
const phone = "tel:+201017055212";
const email = "abdallahberbatov@gmail.com";
const interests = ["Online coaching", "UGC & brand collaboration", "Both"];
const reelsAccount = "https://www.instagram.com/abdullahmuhhameed/reels/";
const feedbackHighlight = "https://www.instagram.com/stories/highlights/18058623980264452/";

// Reels live in public/reels as <name>.mp4 + <name>.jpg (cover).
const reels = [
  ["gym-forced", "POV: heading to leg day… then slipped", "https://www.instagram.com/abdullahmuhhameed/reel/DX5C_yIACkp/", "87.1K"],
  ["gym-buddy", "When your gym buddy doesn't show up", "https://www.instagram.com/abdullahmuhhameed/reel/DX7r_eEAXUH/", "1.9K"],
  ["delivery", "The classiest delivery in town", "https://www.instagram.com/abdullahmuhhameed/reel/DV4c8aiMq0m/", "4.6K"],
];

const brandReels = [
  ["debonairs", "Debonairs Pizza", "Food & beverage", "https://www.instagram.com/abdullahmuhhameed/reel/DbhA3BfswX_/"],
  ["oud", "Oud Shop", "Fragrance", "https://www.instagram.com/abdullahmuhhameed/reel/DexZhXeN-GC/"],
  ["limitless", "Limitless Naturals", "Lifestyle", "https://www.instagram.com/abdullahmuhhameed/reel/DcTsgjwNEMp/"],
];

// Muted, looping reel that plays only while on screen. Tap to toggle sound.
function AutoReel({ name, label, soundOn, soundOff }: { name: string; label: string; soundOn: string; soundOff: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.4 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    if (video.muted) {
      // only one reel speaks at a time
      document.querySelectorAll<HTMLVideoElement>("video.auto-reel").forEach((other) => { if (other !== video) other.muted = true; });
      video.muted = false;
      video.play().catch(() => {});
    } else {
      video.muted = true;
    }
  };

  return (
    <>
      <video ref={ref} className="auto-reel" src={`/reels/${name}.mp4`} poster={`/reels/${name}.jpg`} muted loop playsInline preload="none" aria-label={label} onClick={toggleSound} onVolumeChange={(event) => setMuted(event.currentTarget.muted)} />
      <button type="button" className="sound-toggle" onClick={toggleSound} aria-label={muted ? soundOn : soundOff} aria-pressed={!muted}>{muted ? <SoundOff /> : <SoundOn />}</button>
    </>
  );
}

const faqs = [
  ["How does online coaching work?", "After your application, we build a plan around your schedule, goals and lifestyle. You get weekly check-ins, direct support and ongoing adjustments so you always know your next move."],
  ["Do I need a gym to get started?", "Not at all. Your plan can be built for a commercial gym, a home setup or a combination of both."],
  ["How long until I see results?", "Most clients feel meaningful changes in the first few weeks. Your consistency, starting point and goal determine the pace — we focus on sustainable progress that lasts."],
  ["What kind of brands do you work with?", "I create high-retention content for fitness, nutrition, food & beverage, grooming, fashion and lifestyle brands."],
];

// Real client messages from the FEEDBACK highlight (names hidden by the clients' request).
const reviews = [
  ["“I'm healthier — and I lost weight in a week.”", "I can't believe I'm following a coach and eating healthy, not just to lose weight — I actually feel healthier, I lost weight in one week and everyone noticed. Thank you for the effort you put in with me.", "Coaching client", "WhatsApp message"],
  ["“For the first time I can feel my body changing.”", "Honestly, you're often the push I need to go train when I'm lazy. For the first time in my life I feel my body improving — my clothes got tighter, no scale needed — in about 40 days.", "Online coaching client", "Around 40 days in"],
  ["“That pair of jeans fits now. No scale needed.”", "I had jeans two sizes smaller than usual — happy to say they fit now 😂 Thanks for putting up with me, and I really loved the plan.", "Coaching client", "WhatsApp message"],
];

const messageShots = ["05", "19", "17", "09", "34", "10", "39", "58"];
const transformations = ["01", "02", "03", "04", "05", "06"];

function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        setValue(to * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [to]);

  return <span ref={ref} dir="ltr">{value.toFixed(decimals)}{suffix}</span>;
}

type Translate = (text: string) => string;

// Floating button that opens Abdullah's contact and social links.
function SocialFab({ t }: { t: Translate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const onPointer = (event: PointerEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [open]);

  const links: [string, string, React.ReactNode, boolean][] = [
    [whatsapp, "WhatsApp", <ChatIcon key="wa" />, true],
    [instagram, "Instagram", <InstagramIcon key="ig" />, true],
    [phone, "Call me", <PhoneIcon key="ph" />, false],
    [`mailto:${email}`, "Email", <MailIcon key="em" />, false],
  ];

  return (
    <div ref={ref} className={`fab${open ? " is-open" : ""}`}>
      <ul id="fab-menu" className="fab-menu">
        {links.map(([href, label, icon, external], index) => (
          <li key={label} style={{ "--i": links.length - index } as React.CSSProperties}>
            <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={() => setOpen(false)}>
              <span className="fab-label">{t(label)}</span>
              <span className="fab-icon">{icon}</span>
            </a>
          </li>
        ))}
      </ul>
      <button type="button" className="fab-toggle" aria-expanded={open} aria-controls="fab-menu" aria-label={open ? t("Close") : t("Contact Abdullah")} onClick={() => setOpen(!open)}>
        <span className="fab-avatar" aria-hidden="true" />
        <span className="fab-close" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function Home({ language }: { language: "ar" | "en" }) {
  const isArabic = language === "ar";
  const t = (text: string) => isArabic ? (arabic[text] ?? text) : text;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [interest, setInterest] = useState(interests[0]);

  // No backend yet: the form hands the message to WhatsApp, ready to send.
  const sendToWhatsApp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `${t("Hi Abdullah, I'm")} ${data.get("name")}\n${t("I'm interested in")}: ${t(interest)}\n\n${data.get("message")}`;
    window.open(`${whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  const shell = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = shell.current;
    if (!root) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => window.removeEventListener("scroll", onScroll);
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    root.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={shell} className="site-shell" lang={language} dir={isArabic ? "rtl" : "ltr"}>
      <nav className={`main-nav${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}>
        <div className="wrap nav-bar">
          <a href="#top" className="brand" aria-label={t("Abdullah Muhameed home")} onClick={closeMenu}>
            <span className="brand-avatar" aria-hidden="true" />
            <span className="brand-name"><strong>{t("Abdullah Muhameed")}</strong><small dir="ltr">@abdullahmuhhameed</small></span>
          </a>
          <div className="nav-links">
            {navLinks.slice(0, 4).map(([href, label]) => <a key={href} href={href}>{t(label)}</a>)}
          </div>
          <div className="nav-end">
            <a href={isArabic ? "/en" : "/"} className="language-switch" lang={isArabic ? "en" : "ar"} hrefLang={isArabic ? "en" : "ar"} aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}>{isArabic ? "EN" : "عربي"}</a>
            <a href="#contact" className="nav-cta">{t("Let's talk")}</a>
            <button className="menu-toggle" aria-label={t("Toggle menu")} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span />
            </button>
          </div>
        </div>
        <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
          <div className="wrap">
            {navLinks.map(([href, label], index) => <a key={href} href={href} onClick={closeMenu}><small>0{index + 1}</small>{t(label)}</a>)}
            <a href="#contact" onClick={closeMenu} className="mobile-cta">{t("Start a conversation")} <Arrow /></a>
          </div>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-media" aria-hidden={!siteConfig.portrait}>
          {siteConfig.portrait
            ? <Image src={siteConfig.portrait} alt={t("Abdullah, personal coach")} fill sizes="(max-width: 767px) 100vw, 55vw" className="hero-portrait" preload />
            : <div className="hero-photo" style={{ backgroundImage: `url(${"/instagram/hero-abdallah.jpg"})` }} />}
        </div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-inner">
          <p className="kicker hero-in" style={{ "--d": "0ms" } as React.CSSProperties}><span className="live-dot" />{t("Online coaching")} <i>·</i> {t("CAIRO, EGYPT")} <i>→</i> {t("WORLDWIDE")}</p>
          <h1 className="hero-title">
            <span className="hero-line hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>{t("Better is")}</span>
            <span className="hero-line hero-in" style={{ "--d": "200ms" } as React.CSSProperties}><span className="mark">{t("built daily.")}</span></span>
          </h1>
          <p className="hero-lead hero-in" style={{ "--d": "320ms" } as React.CSSProperties}>{t("Let’s build a body — and a life — you feel good in.")}</p>
          <div className="hero-actions hero-in" style={{ "--d": "420ms" } as React.CSSProperties}>
            <a href="#contact" className="btn btn-primary">{t("Let’s build your next chapter")} <Arrow /></a>
            <a href="#reels" className="btn btn-ghost"><span className="play-dot"><Play /></span>{t("Watch the reels")}</a>
          </div>
          <dl className="hero-stats hero-in" style={{ "--d": "540ms" } as React.CSSProperties}>
            <div><dt>{t("Clients coached")}</dt><dd><CountUp to={80} suffix="+" /></dd></div>
            <div><dt>{t("Average rating")}</dt><dd><CountUp to={4.9} decimals={1} /><small>/5</small></dd></div>
            <div><dt>{t("Hours max to reply")}</dt><dd><CountUp to={24} /><small>h</small></dd></div>
          </dl>
        </div>
        <a href="#coaching" className="scroll-cue">{t("SCROLL TO DISCOVER")}<span /></a>
      </section>

      <div className="tape" aria-hidden="true">
        <div className="tape-track">
          {[0, 1].map((copy) => <div key={copy} className="tape-group">{tape.map((word) => <span key={word}>{t(word)}<Star /></span>)}</div>)}
        </div>
      </div>

      <section id="about" className="section">
        <div className="wrap about-grid">
          <div className="about-media" data-reveal>
            <div className="about-img" style={{ backgroundImage: `url(${"/instagram/about-training.jpg"})` }} />
            <div className="about-sticker"><strong dir="ltr">01</strong><span>{t("one mission")}</span></div>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <p className="eyebrow">{t("01 / Meet Abdullah")}</p>
            <h2 className="display">{t("More than")}<br />{t("a")} <span className="accent">{t("coach.")}</span></h2>
            <p className="lead">{t("I know what it feels like to start from zero, lose momentum and wonder if you're doing it right. That's why I built a coaching experience that makes progress feel clear, personal and possible.")}</p>
            <ul className="credentials">
              <li><strong dir="ltr">ISSA</strong>{t("Certified personal trainer & nutritionist")}</li>
              <li><strong>{t("Zamalek Academy")}</strong>{t("Fitness coach")}</li>
            </ul>
            <blockquote className="pull-quote">{t("There’s no shortcut. There’s the right way.")}</blockquote>
            <a href="#contact" className="link-arrow">{t("My story")} <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="coaching" className="section section-alt">
        <div className="wrap">
          <header className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{t("02 / Online coaching")}</p>
              <h2 className="display">{t("No guesswork.")}<br /><span className="accent">{t("Just progress.")}</span></h2>
            </div>
            <p className="lead">{t("A plan built around your body, your schedule and your actual life — not a template you'll quit in three weeks.")}</p>
          </header>
          <div className="feature-grid">
            {features.map(([number, title, text], index) => (
              <article key={number} className="feature-card" data-reveal style={{ "--d": `${index * 90}ms` } as React.CSSProperties}>
                <span className="feature-number" dir="ltr">{number}</span>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </article>
            ))}
          </div>

          <div className="process" data-reveal>
            <div className="process-head">
              <p className="eyebrow">{t("How it works")}</p>
              <h3 className="display display-sm">{t("Three steps.")} <span className="accent">{t("Zero confusion.")}</span></h3>
            </div>
            <ol className="process-steps">
              {steps.map(([title, text], index) => (
                <li key={title} style={{ "--d": `${index * 120}ms` } as React.CSSProperties}>
                  <span className="step-index" dir="ltr">{index + 1}</span>
                  <div><h4>{t(title)}</h4><p>{t(text)}</p></div>
                </li>
              ))}
            </ol>
            <a href="#contact" className="btn btn-primary">{t("Start a conversation")} <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="ugc" className="section">
        <div className="wrap">
          <header className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{t("03 / UGC studio")}</p>
              <h2 className="display">{t("Content that")}<br /><span className="mark">{t("converts.")}</span></h2>
            </div>
            <p className="lead">{t("Authentic, scroll-stopping content made to feel native to your audience — and valuable to your brand.")}</p>
          </header>
          <div className="ugc-grid">
            {brandReels.map(([name, brand, category, link], index) => (
              <article key={name} className="media-card" data-reveal style={{ "--d": `${index * 100}ms` } as React.CSSProperties}>
                <AutoReel name={name} label={brand} soundOn={t("Turn sound on")} soundOff={t("Turn sound off")} />
                <div className="media-copy"><span className="chip">{t(category)}</span><h3 dir="ltr">{brand}</h3></div>
                <a className="media-arrow" href={link} target="_blank" rel="noopener noreferrer" aria-label={`${brand} — ${t("Watch on Instagram")}`}><Arrow /></a>
              </article>
            ))}
          </div>
          <div className="ugc-foot" data-reveal>
            <ul className="pill-list">{t("Fitness • Food & beverage • Grooming • Lifestyle").split(" • ").map((item) => <li key={item}>{item}</li>)}</ul>
            <a href="#contact" className="link-arrow">{t("Work with me")} <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="transformations" className="section section-alt">
        <div className="wrap">
          <header className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{t("04 / Real people. Real change.")}</p>
              <h2 className="display">{t("Proof over")}<br /><span className="accent">{t("promises.")}</span></h2>
            </div>
            <p className="lead">{t("No crash diets. No six-week shortcuts. Just clients building a body and mindset they can keep.")}</p>
          </header>
          <div className="transform-grid">
            {transformations.map((id, index) => (
              <figure key={id} className="transform-card" data-reveal style={{ "--d": `${(index % 3) * 90}ms` } as React.CSSProperties}>
                <div className="transform-img" role="img" aria-label={t("Client before and after")} style={{ backgroundImage: `url(/results/before-after-${id}.jpg)` }} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="reels" className="section reels">
        <div className="wrap reels-layout">
          <header className="reels-head" data-reveal>
            <p className="eyebrow">{t("05 / From the feed")}</p>
            <h2 className="display">{t("Watch.")}<br />{t("Feel it.")}</h2>
            <p className="reels-lead">{t("Training, food and everyday life — the way I share it with my followers every day.")}</p>
            <dl className="reels-stats">
              <div><dt>{t("followers")}</dt><dd dir="ltr">51.7K</dd></div>
              <div><dt>{t("top reel views")}</dt><dd dir="ltr">87.1K</dd></div>
            </dl>
            <a href={reelsAccount} target="_blank" rel="noopener noreferrer" className="btn btn-dark"><span dir="ltr">@abdullahmuhhameed</span> <Arrow /></a>
          </header>
          <div className="reel-grid">
            {reels.map(([name, title, link, views], index) => (
              <article key={name} className="reel-card" data-reveal style={{ "--d": `${index * 90}ms`, "--tilt": `${index % 2 ? 2 : -2}deg` } as React.CSSProperties}>
                <AutoReel name={name} label={t(title)} soundOn={t("Turn sound on")} soundOff={t("Turn sound off")} />
                <div className="reel-copy"><span><b dir="ltr">{views}</b> {t("views")}</span><p>{t(title)}</p></div>
                <a className="reel-link" href={link} target="_blank" rel="noopener noreferrer" aria-label={`${t(title)} — ${t("Watch on Instagram")}`}><Arrow /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="section">
        <div className="wrap">
          <header className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{t("06 / The community")}</p>
              <h2 className="display">{t("Good energy")}<br /><span className="accent">{t("travels.")}</span></h2>
            </div>
            <div className="rating">
              <strong dir="ltr">4.9</strong>
              <div><span className="stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}</span><span>{t("from 80+ clients")}</span></div>
            </div>
          </header>
          <div className="review-grid">
            {reviews.map(([quote, text, name, detail], index) => (
              <article key={quote} className="review-card" data-reveal style={{ "--d": `${index * 100}ms` } as React.CSSProperties}>
                <span className="quote-mark" aria-hidden="true">”</span>
                <h3>{t(quote)}</h3>
                <p>{t(text)}</p>
                <footer><span className="avatar">{t(name).charAt(0)}</span><div><strong>{t(name)}</strong><small>{t(detail)}</small></div></footer>
              </article>
            ))}
          </div>
          <div className="message-wall" data-reveal>
            <div className="message-track">
              {[...messageShots, ...messageShots].map((id, index) => (
                <a key={index} href={feedbackHighlight} target="_blank" rel="noopener noreferrer" className="message-card" aria-label={t("Client message on Instagram")} aria-hidden={index >= messageShots.length || undefined} tabIndex={index >= messageShots.length ? -1 : undefined}>
                  <div style={{ backgroundImage: `url(/feedback/message-${id}.jpg)` }} />
                </a>
              ))}
            </div>
          </div>
          <a href={feedbackHighlight} target="_blank" rel="noopener noreferrer" className="feedback-cta" data-reveal>
            <span className="feedback-ring" aria-hidden="true"><span>FEEDBACK</span></span>
            <span className="feedback-copy"><strong>{t("See every client review")}</strong><small>{t("Real messages from clients, saved on Instagram")}</small></span>
            <Arrow />
          </a>
        </div>
      </section>

      <section id="faq" className="section section-alt">
        <div className="wrap faq-grid">
          <div className="faq-side" data-reveal>
            <p className="eyebrow">{t("07 / Questions")}</p>
            <h2 className="display">{t("Let's clear")}<br /><span className="accent">{t("things up.")}</span></h2>
            <p className="lead">{t("Can't find your answer? Message me directly.")}</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="help-card">
              <span className="method-icon"><ChatIcon /></span>
              <span className="help-copy"><strong>{t("Ask on WhatsApp")}</strong><small>{t("Replies within 24 hours")}</small></span>
              <Arrow />
            </a>
          </div>
          <div className="faq-list" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            {faqs.map(([question, answer], index) => (
              <div key={question} className={`faq-item${openFaq === index ? " is-open" : ""}`}>
                <button aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <span className="faq-num" dir="ltr">0{index + 1}</span>
                  <span className="faq-q">{t(question)}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </button>
                <div id={`faq-answer-${index}`} className="faq-answer" aria-hidden={openFaq !== index}><p>{t(answer)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="wrap">
          <div className="contact-panel">
            <div className="contact-intro" data-reveal>
              <p className="eyebrow">{t("08 / Start here")}</p>
              <h2 className="display">{t("Ready to")} <span className="mark">{t("move?")}</span></h2>
              <p className="lead">{t("Tell me a little about your goals. I'll get back to you within 24 hours.")}</p>
              <ul className="contact-methods">
                <li><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="method is-primary"><span className="method-icon"><ChatIcon /></span><span className="method-copy"><small>{t("WhatsApp")}</small><strong dir="ltr">+20 101 705 5212</strong></span><Arrow /></a></li>
                <li><a href={phone} className="method"><span className="method-icon"><PhoneIcon /></span><span className="method-copy"><small>{t("Call me")}</small><strong dir="ltr">0101 705 5212</strong></span><Arrow /></a></li>
                <li><a href={`mailto:${email}`} className="method"><span className="method-icon"><MailIcon /></span><span className="method-copy"><small>{t("Email")}</small><strong dir="ltr">{email}</strong></span><Arrow /></a></li>
                <li><a href={instagram} target="_blank" rel="noopener noreferrer" className="method"><span className="method-icon"><InstagramIcon /></span><span className="method-copy"><small>{t("Instagram")}</small><strong dir="ltr">@abdullahmuhhameed</strong></span><Arrow /></a></li>
              </ul>
            </div>
            <form className="contact-form" data-reveal style={{ "--d": "120ms" } as React.CSSProperties} onSubmit={sendToWhatsApp}>
              <div className="form-head">
                <h3>{t("Send a quick message")}</h3>
                <p>{t("It opens WhatsApp with your message ready to send.")}</p>
              </div>
              <label className="field"><span>{t("Name")}</span><input name="name" required autoComplete="name" placeholder={t("Your name")} /></label>
              <fieldset className="field">
                <legend>{t("I'm interested in")}</legend>
                <div className="choice-row">
                  {interests.map((option) => (
                    <label key={option} className={`choice${interest === option ? " is-active" : ""}`}>
                      <input type="radio" name="interest" value={option} checked={interest === option} onChange={() => setInterest(option)} />
                      <span>{t(option)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="field"><span>{t("Tell me more")}</span><textarea name="message" required placeholder={t("What are you working towards?")} rows={4} /></label>
              <button type="submit" className="btn btn-primary btn-block"><ChatIcon /> {t("Send on WhatsApp")}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand" aria-label={t("Abdullah Muhameed home")}>
              <span className="brand-avatar" aria-hidden="true" />
              <span className="brand-name"><strong>{t("Abdullah Muhameed")}</strong><small dir="ltr">@abdullahmuhhameed</small></span>
            </a>
            <p>{t("BUILT ON DISCIPLINE. DRIVEN BY YOU.")}</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{t("Start a conversation")} <Arrow /></a>
          </div>
          <nav className="footer-col" aria-label={t("Explore")}>
            <h4>{t("Explore")}</h4>
            {navLinks.map(([href, label]) => <a key={href} href={href}>{t(label)}</a>)}
          </nav>
          <div className="footer-col">
            <h4>{t("Contact")}</h4>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">{t("WhatsApp")}</a>
            <a href={phone} dir="ltr">0101 705 5212</a>
            <a href={`mailto:${email}`} dir="ltr">{email}</a>
          </div>
          <div className="footer-col">
            <h4>{t("Follow")}</h4>
            <a href={instagram} target="_blank" rel="noopener noreferrer">{t("Instagram")}</a>
            <a href={reelsAccount} target="_blank" rel="noopener noreferrer">{t("Reels")}</a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>{t("© 2026 Abdullah Muhameed. All rights reserved.")}</span>
          <a href="#top">{t("Back to top")} <span aria-hidden="true">↑</span></a>
        </div>
        <p className="footer-word" dir="ltr" aria-hidden="true">ABDULLAH<span>MUHAMEED</span></p>
      </footer>
      <SocialFab t={t} />
    </main>
  );
}
