import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { BunnyOrb } from "@/components/BunnyOrb";
import { Link } from "react-router-dom";
import Typewriter from "@/components/Typewriter";
import { ArrowRight, Zap, Cpu, TrendingUp, Globe } from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-sm font-heading font-bold tracking-wide" data-testid="text-logo">
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 pt-16 overflow-hidden">
        {/* Visual effects scoped to hero */}
        <div className="noise-overlay" />
        <div className="vertical-lines" />
        <div className="scanlines" />
        <div className="matrix-circle" />
        <BunnyOrb />
        
        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          {/* Main glitch title */}
          <h1 
            className="glitch-text font-heading font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-extra-wide mb-8"
            data-glitch="BUNNYCODE.AI"
            data-testid="text-hero-title"
          >
            <Typewriter text="BUNNYCODE.AI" />
          </h1>
          
          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl uppercase tracking-ultra-wide text-muted-foreground max-w-3xl mx-auto mb-12" data-testid="text-tagline">
            AI-Native Automation That Moves Fast.
          </p>

          {/* Subheadline */}
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed" data-testid="text-subheadline">
            We build fully automated systems, AI content engines, and next-generation workflows for creators and businesses.
          </p>
          
          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to="/get-automated" data-testid="link-hero-get-automated">
              <Button 
                size="lg" 
                className="text-sm uppercase tracking-wider px-8 min-w-[200px]"
                data-testid="button-hero-get-automated"
              >
                Get Automated
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-sm uppercase tracking-wider px-8 min-w-[200px]"
              data-testid="button-hero-view-services"
              onClick={() => scrollToSection('services')}
            >
              View Services
            </Button>
          </div>
          
          {/* Client trust section */}
          <div className="mt-32 md:mt-40">
            <p className="text-[10px] uppercase tracking-ultra-wide text-muted-foreground mb-6" data-testid="text-trusted-caption">
              Trusted by forward-thinking creators and businesses
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
              {['APEX', 'NEXUS', 'QUANTUM', 'CIPHER', 'VECTOR'].map((client, i) => (
                <div 
                  key={client}
                  className="flex items-center justify-center h-12 px-6 border border-border/50 bg-card/30 text-xs font-mono tracking-wider"
                  data-testid={`logo-client-${i + 1}`}
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 lg:px-8 relative z-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide text-center mb-16" data-testid="heading-services">
            What We Automate
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="service-card group border border-border/50 p-8 hover-elevate hover:border-primary/30 transition-all duration-300 relative overflow-visible"
                  data-testid={`card-service-${i + 1}`}
                >
                  <div className="glitch-line" />
                  <div className="mb-4 text-primary">
                    <IconComponent className="w-8 h-8" />
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
      <section id="showcase" className="py-24 px-6 lg:px-8 relative z-10 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide text-center mb-16" data-testid="heading-showcase">
            Featured Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Automation Dashboard',
                subtitle: 'Real-time workflow monitoring',
                category: 'Process Automation',
              },
              {
                title: 'AI Content Engine',
                subtitle: 'Multi-channel content generation',
                category: 'Content Automation',
              },
              {
                title: 'Trading Bot Framework',
                subtitle: 'Algorithmic trading platform',
                category: 'Trading Automation',
              },
              {
                title: 'AI Website Builder',
                subtitle: 'Intelligent web application',
                category: 'Web Development',
              },
              {
                title: 'Short-Form Automation',
                subtitle: 'Social media content pipeline',
                category: 'Content Automation',
              },
              {
                title: 'Lead-Gen Funnels',
                subtitle: 'Automated customer acquisition',
                category: 'Process Automation',
              },
            ].map((project, i) => (
              <div
                key={project.title}
                className="group border border-border/50 p-8 hover-elevate hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                data-testid={`card-showcase-${i + 1}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-ultra-wide text-primary mb-3" data-testid={`text-showcase-category-${i + 1}`}>
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
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide mb-8" data-testid="heading-about">
                Who We Are
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
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
            
            <div className="grid grid-cols-1 gap-6">
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
                <div key={step.number} className="border border-border/50 p-6 hover-elevate transition-all" data-testid={`step-${i + 1}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-primary bg-background flex items-center justify-center flex-shrink-0">
                      <span className="font-heading font-bold text-lg text-primary" data-testid={`text-step-number-${i + 1}`}>
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-wide mb-6" data-testid="heading-cta">
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
      <footer className="py-12 px-6 lg:px-8 border-t border-border/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-bold text-lg mb-4" data-testid="heading-footer-brand">
                Bunnyhoney.ai
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-footer-tagline">
                AI-Native Automation
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4" data-testid="heading-footer-links">
                Navigation
              </h4>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid="link-footer-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('showcase')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid="link-footer-showcase"
                >
                  Showcase
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid="link-footer-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid="link-footer-contact"
                >
                  Contact
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4" data-testid="heading-footer-action">
                Get Started
              </h4>
              <Link to="/get-automated" data-testid="link-footer-get-automated">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  data-testid="button-footer-get-automated"
                >
                  Get Automated
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © 2025 Bunnyhoney.ai — All rights reserved
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
