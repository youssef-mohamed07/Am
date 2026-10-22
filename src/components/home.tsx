"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { arabic } from "../app/translations";
import { siteConfig } from "../app/site-config";

const photo = (id: string, width = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

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

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" />
  </svg>
);

const navLinks = [["#coaching", "Coaching"], ["#ugc", "UGC Studio"], ["#transformations", "Results"], ["#reels", "Reels"], ["#faq", "FAQ"]];

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

const results = [
  [photo("1579758629938-03607ccdbaba", 700), "Ahmed", "−12", "kg", "in 16 weeks"],
  [photo("1574680096145-d05b474e2155", 700), "Salma", "+6", "kg muscle", "in 24 weeks"],
  [photo("1581009146145-b5ef050c2e1e", 700), "Omar", "−9%", "body fat", "in 20 weeks"],
];

const reels = [
  [photo("1517836357463-d25dfeac3438", 600), "Leg day, done right"],
  [photo("1547592180-85f173990554", 600), "A better breakfast"],
  [photo("1584466977773-e625c37cdd50", 600), "Train with me"],
  [photo("1599058917212-d750089bc07e", 600), "Simple nutrition"],
];

const faqs = [
  ["How does online coaching work?", "After your application, we build a plan around your schedule, goals and lifestyle. You get weekly check-ins, direct support and ongoing adjustments so you always know your next move."],
  ["Do I need a gym to get started?", "Not at all. Your plan can be built for a commercial gym, a home setup or a combination of both."],
  ["How long until I see results?", "Most clients feel meaningful changes in the first few weeks. Your consistency, starting point and goal determine the pace — we focus on sustainable progress that lasts."],
  ["What kind of brands do you work with?", "I create high-retention content for fitness, nutrition, food & beverage, grooming, fashion and lifestyle brands."],
];

const reviews = [
  ["“I stopped starting over.”", "I finally have a plan that fits my life. Four months in and I’m stronger, leaner and actually enjoying training.", "Mariam A.", "Online coaching · 18 weeks"],
  ["“The accountability is different.”", "Abdallah sees the details I miss. Every check-in gives me one clear thing to focus on next.", "Youssef K.", "Online coaching · 12 weeks"],
  ["“Exactly what our brand needed.”", "The content felt authentic, looked premium and outperformed our studio assets in the first week.", "Nour / Brand manager", "UGC collaboration"],
];

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

export default function Home({ language }: { language: "ar" | "en" }) {
  const isArabic = language === "ar";
  const t = (text: string) => isArabic ? (arabic[text] ?? text) : text;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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
          <a href="#top" className="brand" dir="ltr" aria-label={t("Fit With Abdallah home")} onClick={closeMenu}>
            <span className="brand-symbol">fw</span>
            <span className="brand-name">FIT WITH<br />ABDALLAH</span>
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
            ? <Image src={siteConfig.portrait} alt={t("Abdallah, personal coach")} fill sizes="(max-width: 767px) 100vw, 55vw" className="hero-portrait" preload />
            : <div className="hero-photo" style={{ backgroundImage: `url(${photo("1605296867304-46d5465a13f1", 1600)})` }} />}
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
        <div className="hero-badge" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs><path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <text><textPath href="#badge-circle">FIT WITH ABDALLAH • COACHING • CONTENT • </textPath></text>
          </svg>
          <span>fw</span>
        </div>
        <a href="#coaching" className="scroll-cue">{t("SCROLL TO DISCOVER")}<span /></a>
      </section>

      <div className="tape" aria-hidden="true">
        <div className="tape-track">
          {[0, 1].map((copy) => <div key={copy} className="tape-group">{tape.map((word) => <span key={word}>{t(word)}<Star /></span>)}</div>)}
        </div>
      </div>

      <section id="coaching" className="section">
        <div className="wrap">
          <header className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{t("01 / Online coaching")}</p>
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

      <section id="ugc" className="section section-alt">
        <div className="wrap">
          <header className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{t("02 / UGC studio")}</p>
              <h2 className="display">{t("Content that")}<br /><span className="mark">{t("converts.")}</span></h2>
            </div>
            <p className="lead">{t("Authentic, scroll-stopping content made to feel native to your audience — and valuable to your brand.")}</p>
          </header>
          <div className="ugc-grid">
            {[
              [photo("1534438327276-14e5300c3a48", 1100), "Fit / Performance", "Move with intent"],
              [photo("1547592180-85f173990554", 700), "Nutrition", "Fuel your day"],
              [photo("1571019613454-1cb2f99b2d8b", 700), "Lifestyle", "Everyday energy"],
            ].map(([image, tag, title], index) => (
              <a href="#contact" key={tag} className={`media-card${index === 0 ? " is-large" : ""}`} data-reveal style={{ "--d": `${index * 100}ms` } as React.CSSProperties}>
                <div className="media-img" style={{ backgroundImage: `url(${image})` }} />
                <div className="media-copy"><span className="chip">{t(tag)}</span><h3>{t(title)}</h3></div>
                <span className="media-arrow"><Arrow /></span>
              </a>
            ))}
          </div>
          <div className="ugc-foot" data-reveal>
            <ul className="pill-list">{t("Fitness • Food & beverage • Grooming • Lifestyle").split(" • ").map((item) => <li key={item}>{item}</li>)}</ul>
            <a href="#contact" className="link-arrow">{t("Work with me")} <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="wrap about-grid">
          <div className="about-media" data-reveal>
            <div className="about-img" style={{ backgroundImage: `url(${photo("1526506118085-60ce8714f8c5", 1000)})` }} />
            <div className="about-sticker"><strong dir="ltr">01</strong><span>{t("one mission")}</span></div>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <p className="eyebrow">{t("03 / Meet Abdallah")}</p>
            <h2 className="display">{t("More than")}<br />{t("a")} <span className="accent">{t("coach.")}</span></h2>
            <p className="lead">{t("I know what it feels like to start from zero, lose momentum and wonder if you're doing it right. That's why I built a coaching experience that makes progress feel clear, personal and possible.")}</p>
            <blockquote className="pull-quote">{t("There’s no shortcut. There’s the right way.")}</blockquote>
            <a href="#contact" className="link-arrow">{t("My story")} <Arrow /></a>
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
          <div className="result-grid">
            {results.map(([image, name, figure, unit, time], index) => (
              <article key={name} className="result-card" data-reveal style={{ "--d": `${index * 110}ms` } as React.CSSProperties}>
                <div className="result-img" style={{ backgroundImage: `url(${image})` }} />
                <div className="result-copy">
                  <p className="result-figure"><strong dir="ltr">{figure}</strong><span>{t(unit)}</span></p>
                  <div className="result-meta"><span>{t(name)}</span><span>{t(time)}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reels" className="section reels">
        <div className="wrap">
          <header className="section-head" data-reveal>
            <div>
              <p className="eyebrow">{t("05 / From the feed")}</p>
              <h2 className="display">{t("Watch.")}<br />{t("Feel it.")}</h2>
            </div>
            <a href="https://www.instagram.com/fitwithabdallah/" className="btn btn-dark">{t("See all reels")} <Arrow /></a>
          </header>
          <div className="reel-grid">
            {reels.map(([image, title], index) => (
              <a href="https://www.instagram.com/fitwithabdallah/" key={title} className="reel-card" data-reveal style={{ "--d": `${index * 90}ms`, "--tilt": `${index % 2 ? 2 : -2}deg` } as React.CSSProperties}>
                <div className="reel-img" style={{ backgroundImage: `url(${image})` }} />
                <span className="reel-play"><Play /></span>
                <div className="reel-copy"><span dir="ltr">REEL / 0{index + 1}</span><p>{t(title)}</p></div>
              </a>
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
              <article key={name} className="review-card" data-reveal style={{ "--d": `${index * 100}ms` } as React.CSSProperties}>
                <span className="quote-mark" aria-hidden="true">”</span>
                <h3>{t(quote)}</h3>
                <p>{t(text)}</p>
                <footer><span className="avatar">{t(name).charAt(0)}</span><div><strong>{t(name)}</strong><small>{t(detail)}</small></div></footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section section-alt">
        <div className="wrap faq-grid">
          <div data-reveal>
            <p className="eyebrow">{t("07 / Questions")}</p>
            <h2 className="display">{t("Let's clear")}<br /><span className="accent">{t("things up.")}</span></h2>
          </div>
          <div className="faq-list" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            {faqs.map(([question, answer], index) => (
              <div key={question} className={`faq-item${openFaq === index ? " is-open" : ""}`}>
                <button aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <span>{t(question)}</span><span className="faq-icon" aria-hidden="true" />
                </button>
                <div id={`faq-answer-${index}`} className="faq-answer" aria-hidden={openFaq !== index}><p>{t(answer)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="wrap contact-grid">
          <div data-reveal>
            <p className="eyebrow">{t("08 / Start here")}</p>
            <h2 className="display display-xl">{t("Ready to")}<br /><span className="mark">{t("move?")}</span></h2>
            <p className="lead">{t("Tell me a little about your goals. I'll get back to you within 24 hours.")}</p>
            <div className="contact-links">
              <a href="https://wa.me/201017055212" className="btn btn-primary">{t("WhatsApp me")} <Arrow /></a>
              <a href="mailto:abdallahberbatov@gmail.com" className="contact-mail">abdallahberbatov@gmail.com</a>
              <a href="tel:+201017055212" className="contact-mail">01017055212</a>
            </div>
          </div>
          <form className="contact-form" data-reveal style={{ "--d": "120ms" } as React.CSSProperties} onSubmit={(event) => event.preventDefault()}>
            <div className="form-row">
              <label>{t("Name")}<input required placeholder={t("Your name")} /></label>
              <label>{t("Email")}<input required type="email" placeholder="you@email.com" /></label>
            </div>
            <label>{t("I'm interested in")}
              <select defaultValue="coaching">
                <option value="coaching">{t("Online coaching")}</option>
                <option value="ugc">{t("UGC & brand collaboration")}</option>
                <option value="both">{t("Both")}</option>
              </select>
            </label>
            <label>{t("Tell me more")}<textarea required placeholder={t("What are you working towards?")} rows={4} /></label>
            <button type="submit" className="btn btn-primary btn-block">{t("Send inquiry")} <Arrow /></button>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          <p className="footer-tagline">{t("BUILT ON DISCIPLINE. DRIVEN BY YOU.")}</p>
          <div className="footer-row">
            <span>{t("© 2026 FitWithAbdallah. All rights reserved.")}</span>
            <div className="footer-links">
              <a href="https://www.instagram.com/fitwithabdallah/">{t("Instagram")}</a>
              <a href="https://www.tiktok.com/">{t("TikTok")}</a>
              <a href="https://wa.me/201017055212">{t("WhatsApp")}</a>
            </div>
          </div>
        </div>
        <p className="footer-word" dir="ltr" aria-hidden="true">FIT<span>WITH</span>ABDALLAH</p>
      </footer>
    </main>
  );
}
