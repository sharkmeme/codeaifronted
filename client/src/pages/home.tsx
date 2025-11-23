import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { BunnyOrb } from "@/components/BunnyOrb";

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
              <Button 
                size="sm" 
                className="text-xs uppercase tracking-wider rounded-full px-6"
                data-testid="button-get-automated"
              >
                Get Automated
              </Button>
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
            BUNNYCODE.AI
          </h1>
          
          {/* Tagline */}
          <p className="text-xs sm:text-sm md:text-base uppercase tracking-ultra-wide text-muted-foreground max-w-3xl mx-auto mb-20" data-testid="text-tagline">
            AI-Native Automations for Teams That Move Fast.
          </p>
          
          {/* Client logos section */}
          <div className="mt-32 md:mt-40">
            <p className="text-[10px] uppercase tracking-ultra-wide text-muted-foreground mb-6" data-testid="text-trusted-caption">
              Trusted by teams worldwide
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
              {['CLIENT 1', 'CLIENT 2', 'CLIENT 3', 'CLIENT 4', 'CLIENT 5'].map((client, i) => (
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Sales & Lead Workflows',
                description: 'Intelligent lead qualification, automated follow-ups, and CRM synchronization that never sleeps.',
              },
              {
                title: 'Internal Ops & Reporting',
                description: 'Streamline data aggregation, generate insights, and deliver reports on autopilot.',
              },
              {
                title: 'Content & Outreach Systems',
                description: 'Scale your content creation and distribution with AI-powered automation frameworks.',
              },
            ].map((service, i) => (
              <div
                key={service.title}
                className="service-card group border border-border/50 p-8 hover-elevate hover:border-primary/30 transition-all duration-300 relative overflow-visible"
                data-testid={`card-service-${i + 1}`}
              >
                <div className="glitch-line" />
                <h3 className="font-heading font-bold text-xl mb-4 tracking-wide" data-testid={`heading-service-${i + 1}`}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-service-${i + 1}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="py-24 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide text-center mb-16" data-testid="heading-how-it-works">
            How It Works
          </h2>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-border/50 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative">
              {[
                {
                  number: '01',
                  title: 'Audit',
                  description: 'We analyze your current workflows and identify automation opportunities.',
                },
                {
                  number: '02',
                  title: 'Build',
                  description: 'Our team designs and implements custom AI-native automation solutions.',
                },
                {
                  number: '03',
                  title: 'Optimize',
                  description: 'Continuous monitoring and refinement ensure peak performance.',
                },
              ].map((step, i) => (
                <div key={step.number} className="relative text-center" data-testid={`step-${i + 1}`}>
                  <div className="inline-block mb-6 relative">
                    <div className="w-16 h-16 rounded-full border-2 border-primary bg-background flex items-center justify-center relative z-10">
                      <span className="font-heading font-bold text-2xl text-primary" data-testid={`text-step-number-${i + 1}`}>
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4 tracking-wide" data-testid={`heading-step-${i + 1}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground max-w-xs mx-auto" data-testid={`text-step-${i + 1}`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-wide mb-6" data-testid="heading-cta">
              Ship your first automation with bunnycode.ai
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-cta">
              Let's build something remarkable together. Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <ContactForm />
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-sm uppercase tracking-wider px-8"
              data-testid="button-view-showcase"
              onClick={() => scrollToSection('showcase')}
            >
              View Showcase
            </Button>
          </div>
        </div>
      </section>

      {/* Showcase placeholder */}
      <section id="showcase" className="py-24 px-6 lg:px-8 relative z-10 bg-card/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide mb-8" data-testid="heading-showcase">
            Our Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-showcase">
            Case studies and success stories coming soon. Contact us to learn about our recent automation projects.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-border/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © bunnycode.ai
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-contact-footer">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
