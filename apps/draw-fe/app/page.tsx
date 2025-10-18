import { Button } from "@repo/ui/button"
import { ArrowRight, Sparkles, Pencil, Users, Zap, Lock, Download, Palette, Github, Twitter, Linkedin } from "lucide-react";
import heroImage from "@/assets/hero-whiteboard.jpg";

const features = [
  {
    icon: Pencil,
    title: "Hand-Drawn Feel",
    description: "Create diagrams with a natural, sketchy aesthetic that feels authentic and creative."
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "Work together seamlessly with your team. See changes instantly as others draw."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed. Start drawing immediately without any lag or delays."
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data stays yours. End-to-end encryption keeps your work secure."
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description: "Export to PNG, SVG, or clipboard. Share your work however you like."
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Personalize your workspace with custom colors, themes, and tools."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-20 pb-32">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial opacity-60" />
        
        {/* Floating shapes with intense glow */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl shadow-glow-primary animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl shadow-glow-accent animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Main content */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-scale-in">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Collaborative Whiteboarding</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Sketch Ideas,
                <br />
                Build Together
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                A free, open-source digital whiteboard for sketching hand-drawn diagrams. 
                Perfect for brainstorming, teaching, and collaborative design.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
                <Button className="group">
                  Start Drawing Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button>
                  See How It Works
                </Button>
              </div>
            </div>
            
            {/* Hero image */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-hero opacity-30 blur-[80px]" />
              <div className="relative rounded-2xl overflow-hidden shadow-intense border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow-primary">
                <img 
                  src={heroImage.src} 
                  alt="Digital whiteboard interface showing collaborative sketches and diagrams"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything you need to
                <span className="bg-clip-text text-transparent bg-gradient-hero"> create freely</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to help you visualize ideas and collaborate effortlessly
              </p>
            </div>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 md:p-16 text-center shadow-intense border border-primary/30 animate-fade-in">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                  Ready to bring your ideas to life?
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Join thousands of creators, teachers, and teams who use our platform to collaborate and create amazing things.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button className="group">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
                  >
                    View Examples
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-secondary/50 border-t border-border py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-hero">
                  SketchBoard
                </h3>
                <p className="text-muted-foreground mb-4">
                  Free and open-source whiteboarding tool for creative minds
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Product links */}
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Examples</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                </ul>
              </div>
              
              {/* Company links */}
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="pt-8 border-t border-border text-center text-muted-foreground">
              <p>&copy; 2024 SketchBoard. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
