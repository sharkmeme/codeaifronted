import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { BunnyOrb } from "@/components/BunnyOrb";
import { Link } from "react-router-dom";
import Typewriter from "@/components/Typewriter";
import { ArrowRight, Zap, Cpu, TrendingUp, Globe } from "lucide-react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-sm sm:text-base md:text-lg font-heading font-bold tracking-wide" data-testid="text-logo">
              bunnycode.ai
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-xs uppercase tracking-wider hover:text-primary transition-all hover:tracking-ultra-wide duration-300"
                data-testid="link-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('showcase')}
                className="text-xs uppercase tracking-wider hover:text-primary transition-all hover:tracking-ultra-wide duration-300"
                data-testid="link-showcase"
              >
                Showcase
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-xs uppercase tracking-wider hover:text-primary transition-all hover:tracking-ultra-wide duration-300"
                data-testid="link-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-xs uppercase tracking-wider hover:text-primary transition-all hover:tracking-ultra-wide duration-300"
                data-testid="link-contact"
              >
                Contact
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/get-automated"
                className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                data-testid="button-get-automated"
              >
                GET AUTOMATED
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimal */}
      <section className="hero relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 overflow-hidden -mt-24 mb-2 dark:bg-black max-sm:pt-0 max-sm:pb-0 max-sm:mt-0 max-sm:mb-0">
        {/* Visual effects scoped to hero */}
        <div className="noise-overlay" />
        <div className="vertical-lines" />
        <div className="scanlines" />
        <div className="matrix-circle" />
        <BunnyOrb />
        
        <div className="max-w-7xl mx-auto w-full text-center relative z-10 max-sm:pt-0 max-sm:pb-0 max-sm:mt-0 max-sm:mb-0 max-sm:space-y-0">
          {/* Main glitch title */}
          <h1 
            className="glitch-text font-heading font-bold text-4xl max-sm:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-extra-wide max-sm:text-center max-sm:leading-[1.1] max-sm:pt-0 max-sm:pb-0 max-sm:mt-0 max-sm:mb-0"
            data-glitch="BUNNYCODE.AI"
            data-testid="text-hero-title"
          >
            <Typewriter text="BUNNYCODE.AI" />
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section id="intro" className="pt-24 pb-24 px-6 lg:px-8 relative z-10 bg-background dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto text-center">
          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl uppercase tracking-ultra-wide text-muted-foreground max-w-lg max-sm:max-w-xs max-sm:px-4 mx-auto mb-8 leading-snug max-sm:text-center" data-testid="text-tagline">
            AI-Native Automation That Moves Fast.
          </p>

          {/* Subheadline */}
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-lg max-sm:max-w-xs max-sm:px-4 mx-auto mb-8 leading-relaxed max-sm:text-center" data-testid="text-subheadline">
            We build fully automated systems, AI content engines, and next-generation workflows for creators and businesses.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-sm:gap-3 mb-10 max-sm:w-full max-sm:mx-auto">
            <Link to="/get-automated" data-testid="link-hero-get-automated" className="max-sm:w-full">
              <Button 
                size="lg" 
                className="text-sm uppercase tracking-wider px-8 min-w-[200px] max-sm:w-full"
                data-testid="button-hero-get-automated"
              >
                Get Automated
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-sm uppercase tracking-wider px-8 min-w-[200px] max-sm:w-full shadow-sm"
              data-testid="button-hero-view-services"
              onClick={() => scrollToSection('services')}
            >
              View Services
            </Button>
          </div>
          
          {/* Client trust section */}
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-ultra-wide text-muted-foreground mb-4" data-testid="text-trusted-caption">
              Trusted by forward-thinking creators and businesses
            </p>
            
            <div className="marquee opacity-62 dark:opacity-80" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <div className="marquee-content h-12 max-sm:h-10 flex items-center justify-center max-sm:gap-6">
                {/* First set */}
                <img src="/logos/7eleven.webp" alt="7-Eleven" className="marquee-logo max-sm:h-6 md:h-10" data-testid="logo-client-1" />
                <img src="/logos/doordash.webp" alt="Doordash" className="marquee-logo max-sm:h-6 md:h-10" data-testid="logo-client-2" />
                <img src="/logos/dyson.webp" alt="Dyson" className="marquee-logo max-sm:h-6 md:h-10" data-testid="logo-client-3" />
                <img src="/logos/grab.webp" alt="Grab" className="marquee-logo max-sm:h-6 md:h-10" data-testid="logo-client-4" />
                <img src="/logos/marriott.webp" alt="Marriott" className="marquee-logo max-sm:h-6 md:h-10" data-testid="logo-client-5" />
                <img src="/logos/mondelez.webp" alt="Mondelez" className="marquee-logo max-sm:h-6 md:h-10" data-testid="logo-client-6" />
                {/* Second set */}
                <img src="/logos/7eleven.webp" alt="7-Eleven" className="marquee-logo max-sm:h-6 md:h-10" />
                <img src="/logos/doordash.webp" alt="Doordash" className="marquee-logo max-sm:h-6 md:h-10" />
                <img src="/logos/dyson.webp" alt="Dyson" className="marquee-logo max-sm:h-6 md:h-10" />
                <img src="/logos/grab.webp" alt="Grab" className="marquee-logo max-sm:h-6 md:h-10" />
                <img src="/logos/marriott.webp" alt="Marriott" className="marquee-logo max-sm:h-6 md:h-10" />
                <img src="/logos/mondelez.webp" alt="Mondelez" className="marquee-logo max-sm:h-6 md:h-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="pt-24 pb-24 px-6 lg:px-8 relative z-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide text-center mb-8 dark:text-white dark:font-semibold" data-testid="heading-services">
            What We Automate
          </h2>
          
          <div className="grid grid-cols-1 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'Process Automation',
                description: 'Streamline workflows with intelligent automation. From data processing to task orchestration, we eliminate manual bottlenecks.',
              },
              {
                icon: Cpu,
                title: 'Content Automation',
                description: 'Scale your content creation with AI-powered engines. Generate, distribute, and optimize content across all channels automatically.',
              },
              {
                icon: TrendingUp,
                title: 'Trading Automation',
                description: 'Build algorithmic trading systems with real-time data analysis. Execute strategies faster than human reflexes allow.',
              },
              {
                icon: Globe,
                title: 'AI Website Development',
                description: 'Launch intelligent web applications powered by AI. Custom solutions built for performance, scalability, and user experience.',
              },
            ].map((service, i) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="service-card group border border-border/50 p-8 max-sm:p-4 hover-elevate hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-visible dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:shadow-neutral-800 max-sm:text-center"
                  data-testid={`card-service-${i + 1}`}
                >
                  <div className="glitch-line" />
                  <div className="mb-4 text-primary dark:text-blue-400 max-sm:flex max-sm:justify-center">
                    <IconComponent className="w-12 h-12 max-sm:w-10 max-sm:h-10" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-4 tracking-wide" data-testid={`heading-service-${i + 1}`}>
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm" data-testid={`text-service-${i + 1}`}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="pt-24 pb-24 px-6 lg:px-8 relative z-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide text-center mb-8" data-testid="heading-showcase">
            Featured Work
          </h2>
          
          <div className="max-sm:flex max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:gap-4 max-sm:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-9">
            {[
              {
                title: 'Full-Spectrum Workflow Intelligence',
                subtitle: 'Real-time monitoring, automated task routing, error-detection, and analytics-driven optimization—built to run mission-critical operations without human bottlenecks.',
                category: 'Process Automation',
              },
              {
                title: 'Multi-Channel Creation. Zero Manual Work.',
                subtitle: 'Automatically generate, repurpose, schedule, and distribute content across all platforms. High-volume output with brand-consistent quality.',
                category: 'Content Automation',
              },
              {
                title: 'Lightning-Fast Execution. Data-Driven Decisions.',
                subtitle: 'Adaptive algorithms, real-time market scanning, automated strategy execution, and performance tracking—engineered for speed and accuracy.',
                category: 'Trading Automation',
              },
              {
                title: 'Websites That Think, React & Convert.',
                subtitle: 'AI-powered landing pages, dynamic content blocks, automated SEO, and instant A/B testing—built for growth and personalization at scale.',
                category: 'Web Development',
              },
              {
                title: 'High-Volume Short-Form Production Engine.',
                subtitle: 'Auto-cut, auto-caption, auto-resize, and auto-post videos—all aligned to your niche, style, and current trends. Scales with your brand, not your workload.',
                category: 'Content Automation',
              },
              {
                title: 'AI-Operated Customer Acquisition Systems.',
                subtitle: 'Intelligent lead scoring, automated outreach, CRM syncing, and conversion tracking—plug-and-play funnels that run 24/7.',
                category: 'Process Automation',
              },
            ].map((project, i) => (
              <div key={project.title} className="max-sm:snap-center max-sm:flex-shrink-0 max-sm:w-[85%]">
                <div
                  className="group border border-border/50 p-8 max-sm:p-4 hover-elevate hover:border-primary/30 hover:shadow-md transition-all duration-300 relative overflow-hidden dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:shadow-neutral-800 max-sm:text-center h-full"
                  data-testid={`card-showcase-${i + 1}`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-ultra-wide text-blue-500 dark:text-blue-400 mb-3" data-testid={`text-showcase-category-${i + 1}`}>
                      {project.category}
                    </p>
                    <h3 className="font-heading font-bold text-xl mb-2 tracking-wide" data-testid={`heading-showcase-${i + 1}`}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid={`text-showcase-${i + 1}`}>
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="w-full flex justify-center pt-12 pb-8 bg-background dark:bg-neutral-950">
        <button
          onClick={() => {
            const url = "https://calendly.com/akademischesghosteditor/30min?hide_event_type_details=1";

            const w = window as any;

            if (w.Calendly) {
              w.Calendly.showPopupWidget(url);
            } else {
              console.error("Calendly not loaded yet");
            }
          }}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-md transition-all duration-200"
          data-testid="button-book-session"
        >
          Book a Strategy Session
        </button>
      </div>

      {/* Integrations Section */}
      <section id="integrations" className="bg-background dark:bg-neutral-950 w-full pt-24 pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-heading font-bold tracking-wide mb-8" data-testid="heading-integrations">
            We Connect Your Apps and Services
          </h2>

          <p className="text-center max-w-2xl mx-auto mb-12 text-neutral-600 dark:text-neutral-300" data-testid="text-integrations-description">
            From CRMs and payment processors to AI platforms, marketing suites, and cloud systems—we integrate everything into one unified automation engine. APIs, webhooks, custom scripts, and AI agents—whatever your stack looks like, we make it work together.
          </p>

          <div className="flex justify-center">
            <img
              src="/logos/logosbrands.webp"
              alt="App Integrations"
              className="w-full max-w-3xl mx-auto rounded-lg shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-24 pb-24 px-6 lg:px-8 relative z-10 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide mb-8" data-testid="heading-about">
              Who We Are
            </h2>
            <div className="h-0.5 w-16 max-sm:w-12 bg-blue-500/70 rounded-full mx-auto mb-8"></div>
            <div className="space-y-6 text-muted-foreground dark:text-neutral-200 leading-relaxed dark:leading-relaxed max-w-3xl max-sm:max-w-xs max-sm:px-4 mx-auto max-sm:text-center">
              <p data-testid="text-about-1">
                Bunnycode is an AI automation agency built for the modern era. We specialize in creating intelligent systems that work 24/7, eliminating repetitive tasks and amplifying human potential.
              </p>
              <p data-testid="text-about-2">
                Founded by engineers and creators who understand the power of automation, we've built our reputation on delivering production-ready solutions that scale. From content pipelines to trading algorithms, we architect systems that perform.
              </p>
              <p data-testid="text-about-3">
                What makes us different? We don't just automate—we build AI-native systems from the ground up. Every project is custom-engineered for your specific workflow, optimized for performance, and designed to evolve with your business.
              </p>
            </div>
          </div>
            
          <div className="h-px bg-neutral-200 dark:bg-neutral-700 dark:opacity-70 my-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                number: '01',
                title: 'Audit',
                description: 'We analyze your current workflows and identify high-impact automation opportunities.',
              },
              {
                number: '02',
                title: 'Build',
                description: 'Our team designs and implements custom AI-native automation solutions tailored to your needs.',
              },
              {
                number: '03',
                title: 'Optimize',
                description: 'Continuous monitoring and refinement ensure peak performance and ROI.',
              },
            ].map((step, i) => (
              <div key={step.number} className="border border-neutral-200 p-6 max-sm:p-4 hover-elevate transition-all dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 max-sm:text-center" data-testid={`step-${i + 1}`}>
                <div className="flex items-start gap-4 max-sm:flex-col max-sm:items-center">
                  <div className="w-9 h-9 rounded-full border-2 border-primary dark:border-blue-400 bg-background dark:bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-lg text-primary dark:text-blue-400" data-testid={`text-step-number-${i + 1}`}>
                      {step.number}
                    </span>
                  </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-2 tracking-wide" data-testid={`heading-step-${i + 1}`}>
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm" data-testid={`text-step-${i + 1}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-24 max-sm:pt-12 pb-24 px-6 lg:px-8 relative z-10 bg-background dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-wide mb-8" data-testid="heading-cta">
              Ship Your First Automation
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-cta">
              Let's build something remarkable together. Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 max-sm:pt-8 pb-24 max-sm:pb-8 px-6 lg:px-8 relative z-10 bg-background dark:bg-neutral-950">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-8"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-sm:gap-6 mb-8 items-start max-sm:text-center">
            <div>
              <h3 className="font-heading font-bold text-lg max-sm:text-base mb-4 tracking-wide" data-testid="heading-footer-brand">
                Bunnycode.ai
              </h3>
              <p className="text-sm max-sm:text-xs text-muted-foreground" data-testid="text-footer-tagline">
                AI-Native Automation
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-sm max-sm:text-xs uppercase tracking-wide mb-4" data-testid="heading-footer-links">
                Navigation
              </h4>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-sm max-sm:text-xs text-muted-foreground hover:text-foreground transition-colors text-left max-sm:text-center"
                  data-testid="link-footer-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('showcase')}
                  className="text-sm max-sm:text-xs text-muted-foreground hover:text-foreground transition-colors text-left max-sm:text-center"
                  data-testid="link-footer-showcase"
                >
                  Showcase
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-sm max-sm:text-xs text-muted-foreground hover:text-foreground transition-colors text-left max-sm:text-center"
                  data-testid="link-footer-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-sm max-sm:text-xs text-muted-foreground hover:text-foreground transition-colors text-left max-sm:text-center"
                  data-testid="link-footer-contact"
                >
                  Contact
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-sm max-sm:text-xs uppercase tracking-wide mb-4" data-testid="heading-footer-action">
                Get Started
              </h4>
              <Link to="/get-automated" data-testid="link-footer-get-automated">
                <Button 
                  variant="ghost" 
                  className="w-full sm:w-auto"
                  data-testid="button-footer-get-automated"
                >
                  Get Automated
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground dark:text-neutral-400" data-testid="text-copyright">
              © 2025 Bunnycode.ai — All rights reserved
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground dark:text-neutral-400 hover:text-foreground transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground dark:text-neutral-400 hover:text-foreground transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
