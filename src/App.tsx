import { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Menu, X, ArrowUpRight, MessageCircle, RefreshCw, Send, CheckCircle2, Play, Target, Crown, Sliders, Cpu, GraduationCap, BookOpen, Lightbulb } from 'lucide-react';
import rightSectionImg from './public/image.png';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'brand' | 'funnel'>('ai');
  
  // Mascot state
  const mascotQuotes = [
    "Let's increase your course conversion rate!",
    "Ditch boring learning portals. Let's build a zine-style LMS!",
    "AI grading & custom quizzes? We build those too.",
    "Student retention dropping? Let's fix your funnel below!",
    "Click me to optimize your platform architecture!",
    "Hatch helps EdTech scale without losing the human feel.",
    "Ready to build custom interactive dashboards for your students?"
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isWinking, setIsWinking] = useState(false);

  const cycleMascot = () => {
    setQuoteIndex((prev) => (prev + 1) % mascotQuotes.length);
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 800);
  };

  // Case Studies State & Data
  const [activeCaseStudy, setActiveCaseStudy] = useState('scuba');

  const caseStudies = [
    {
      id: 'scuba',
      name: 'Scuba Dive In',
      tags: 'ADS MANAGEMENT | FUNNEL STRATEGY',
      badge: 'PREMIUM COURSE FUNNEL',
      headline: 'SELLING ₹2,00,000 DIVE MASTER COURSES FOR THE FIRST TIME ONLINE. BEST ON THE ISLAND — BUT LARGELY UNKNOWN ACROSS INDIA.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      accentColor: '#ffcc99', // Peach
      metrics: [
        { value: '105', label: 'LEADS GENERATED' },
        { value: '₹2L', label: 'CONVERSION MONTH 1' },
        { value: '₹17K', label: 'AD SPEND' }
      ]
    },
    {
      id: 'phd',
      name: 'H&G PhD Solutions',
      tags: 'ORGANIC REACH | BRAND POSITIONING',
      badge: 'PHD CONSULTING PLATFORM',
      headline: 'ESTABLISHING AUTHORITY IN ACADEMIC WRITING SERVICES. SCALED LINKEDIN PRESENCE FOR FOUNDERS AND BUILT ORGANIC FUNNEL.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      accentColor: '#99ffcc', // Mint
      metrics: [
        { value: '1.2M', label: 'ORGANIC IMPRESSIONS' },
        { value: '🔥 8x', label: 'LEAD GEN INCREASE' },
        { value: '₹0', label: 'PAID AD SPEND' }
      ]
    },
    {
      id: 'sheldon',
      name: 'SuperSheldon',
      tags: 'METAMARKETING | RETARGETING',
      badge: 'K-12 EDTECH APP',
      headline: 'AUDITED AND OPTIMIZED USER CONVERSION PATHS FOR A PREMIUM SCHOOL PREP APP. CUT CPA IN HALF WHILE DOUBLING ENROLLMENTS.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      accentColor: '#7bbbff', // Sky Pop
      metrics: [
        { value: '350+', label: 'PAID ENROLLMENTS' },
        { value: '52%', label: 'REDUCTION IN CPA' },
        { value: '5.1X', label: 'BLENDED ROAS' }
      ]
    },
    {
      id: 'fmge',
      name: 'FMGE Boosters',
      tags: 'AI CHATBOTS | EMAIL NURTURE',
      badge: 'MEDICAL LICENSING PREP',
      headline: 'AUTOMATED CRM LEAD NURTURE SEQUENCES AND DEPLOYED AI CHATBOTS TO PRE-QUALIFY MEDICAL ASPIRANTS FOR PREMIUM TEST PACKAGES.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      accentColor: '#ff99cc', // Bubblegum
      metrics: [
        { value: '92%', label: 'CHATBOT ENGAGEMENT' },
        { value: '₹5.5L', label: 'REVENUE AUTO-GENERATED' },
        { value: '3.8X', label: 'LTV/CAC RATIO' }
      ]
    }
  ];

  // Services State & Data
  const [activeService, setActiveService] = useState('ads');

  const servicesList = [
    {
      id: 'ads',
      title: 'PAID ADS & PERFORMANCE MARKETING',
      category: 'PROFITABLE ACQUISITION ENGINES',
      quote: '"Running ads is easy. Making them profitable isn\'t."',
      description: 'We craft data-driven campaigns across Meta, Google, and LinkedIn that don\'t just generate clicks—they generate customers. Every rupee is tracked, optimized, and made to work harder.',
      bullets: [
        'Meta, Google & LinkedIn Ad Management',
        'Conversion Tracking & Analytics',
        'Landing Page Optimization'
      ],
      accentColor: '#ffcc99', // Peach
      icon: Target,
      number: '01',
      ctaText: 'BOOK A DISCOVERY CALL'
    },
    {
      id: 'brand',
      title: 'PERSONAL BRANDING & INFLUENCE',
      category: 'FOUNDER-LED TRUST AND DEMAND',
      quote: '"You already have credibility. You just need people to see it."',
      description: 'We help founders, coaches, and experts build thought leadership on LinkedIn & Instagram. From content strategy to ghostwriting—we make your personal brand magnetic.',
      bullets: [
        'LinkedIn & Instagram Strategy',
        'Content Calendar & Ghostwriting',
        'Visual Branding & Templates'
      ],
      accentColor: '#7bbbff', // Sky Pop
      icon: Crown,
      number: '02',
      ctaText: "LET'S BUILD YOUR AUTHORITY"
    },
    {
      id: 'growth',
      title: 'GROWTH MARKETING & CONSULTING',
      category: 'A SHARPER PATH TO SCALE',
      quote: '"Not sure what\'s broken? We\'ll find it."',
      description: 'We audit your funnel, diagnose bottlenecks, and build a clear growth roadmap. Strategy-first, results-focused. Perfect for brands ready to scale but unsure where to start.',
      bullets: [
        'Full Funnel Audit',
        'Growth Strategy Roadmap',
        'Channel Prioritization'
      ],
      accentColor: '#ff99cc', // Bubblegum
      icon: Sliders,
      number: '03',
      ctaText: 'TALK GROWTH WITH US'
    },
    {
      id: 'ai',
      title: 'AI AUTOMATION & SMART SYSTEMS',
      category: 'LESS MANUAL WORK, FASTER FOLLOW-UP',
      quote: '"If it\'s repetitive, manual, or slowing you down—we automate it."',
      description: 'From chatbots to CRM workflows to AI-powered lead scoring, we help you save hours every week. Work smarter, not harder.',
      bullets: [
        'AI Chatbot Setup',
        'CRM & Workflow Automation',
        'Lead Scoring Systems'
      ],
      accentColor: '#99ffcc', // Mint Splash
      icon: Cpu,
      number: '04',
      ctaText: 'AUTOMATE YOUR SYSTEMS'
    }
  ];

  // Testimonials State & Data
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "I really enjoyed working with the Hatch team, their process is clear and easy to understand. Diligent, competent with good ideas, they are keen to do excellent work. Passionate about making the interface look good and also usable.",
      author: "Ralph Edwards",
      role: "CEO & Founder Opensight",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80", // High contrast portrait
      blobColor: "#ff99cc"
    },
    {
      quote: "Selling our premium course online was a struggle until we partnered with Hatch. Their brand systems and high-converting funnel design changed everything. We generated over 105 high-intent leads in the first month!",
      author: "Dr. Aris Thorne",
      role: "Founder, PhD Solutions",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
      blobColor: "#7bbbff"
    },
    {
      quote: "Hatch's AI workflows saved us 20+ manual hours a week. Leads flow smoothly from our social feeds straight into our CRM. If it's repetitive, they automate it perfectly. Invaluable partner for EdTech brands.",
      author: "Sarah Jenkins",
      role: "Admissions Director, FMGE Boosters",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80",
      blobColor: "#99ffcc"
    },
    {
      quote: "The brand systems Hatch designed for us are incredible. It feels playful, premium, and unique—far away from standard corporate templates. True masters of Neo-Brutalist and zine aesthetics.",
      author: "Dianne Russell",
      role: "Creative Lead LearnCraft",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
      blobColor: "#ffcc99"
    }
  ];

  // Platform diagram hover state
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hubVisible, setHubVisible] = useState(false);
  const hubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHubVisible(true); },
      { threshold: 0.2 }
    );
    if (hubRef.current) observer.observe(hubRef.current);
    return () => observer.disconnect();
  }, []);

  const nodeStats: Record<string, { name: string; stat: string; color: string }> = {
    founder: { name: 'Founder Brand (LinkedIn & IG)', stat: 'Generates organic trust & thought-leadership. Feeds high-intent traffic directly to the Hub.', color: '#7bbbff' },
    ads: { name: 'Paid Ad Funnels (Meta & Google)', stat: 'Launches target-matched acquisition engines. Pours qualified scale prospects into the Hub.', color: '#ffcc99' },
    cold: { name: 'Cold Outbound (Email & DM)', stat: 'Deploys hyper-personalized outreach sequences. Funnels enterprise B2B prospects to the Hub.', color: '#ff99cc' },
    ai_scoring: { name: 'AI Lead Scoring', stat: 'Parses incoming leads and scores fit criteria using AI. Flags premium prospects in 12 seconds.', color: '#99ffcc' },
    lms_nurture: { name: 'LMS Nurturing', stat: 'Triggers interactive mini-courses and email flows. Builds student affinity automatically.', color: '#7bbbff' },
    booked_calls: { name: 'Booked Revenue Calls', stat: 'Drives scheduled meetings directly onto your admissions calendar. Keeps pipeline full of qualified buyers.', color: '#ffcc99' }
  };

  // AI Strategy Mock Builder State
  const [selectedGoal, setSelectedGoal] = useState('EdTech Cohort');
  const [generatedBrief, setGeneratedBrief] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Spinning Wheel States
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedPerk, setSelectedPerk] = useState<string | null>(null);
  const perks = ["+40% Leads", "Custom LMS", "AI Grading", "Funnel Audit", "10x Virality", "Auto-Quiz"];

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedPerk(null);

    const spins = 5 + Math.floor(Math.random() * 5);
    const targetIndex = Math.floor(Math.random() * perks.length);
    const anglePerSegment = 360 / perks.length;
    const targetAngle = wheelRotation + (spins * 360) + (targetIndex * anglePerSegment);
    
    setWheelRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPerk(perks[targetIndex]);
    }, 3000);
  };

  const generateBriefText = () => {
    setIsGenerating(true);
    setGeneratedBrief('');
    
    const briefs: Record<string, string> = {
      'EdTech Cohort': `[GOAL]: Launch EdTech Cohort\n[THEME]: Cream & Pastel Candy Zine\n[CHANNELS]: Programmatic TikTok hooks & LinkedIn thread wiggles\n[MASCOT]: Blue Speech bubble winking at visitors\n[STATUS]: Ready for production deployment.`,
      'Coding Boot Camp': `[GOAL]: Scale Coding Boot Camp\n[THEME]: Dark Ink & High Contrast Mint Accents\n[CHANNELS]: Automated newsletter briefs & GitHub integration hooks\n[MASCOT]: Bubblegum headphone headset widget active\n[STATUS]: Scaffolding established.`,
      'Creative Agency': `[GOAL]: Build Agency Portfolio\n[THEME]: Soft Peach & Mint Zine Grid\n[CHANNELS]: Organic LinkedIn micro-articles & YouTube visual breakdowns\n[MASCOT]: Mascot wiggles when users click services\n[STATUS]: Live metrics tracing configured.`
    };

    let fullText = briefs[selectedGoal] || '';
    let currentIdx = 0;
    
    const interval = setInterval(() => {
      if (currentIdx < fullText.length) {
        setGeneratedBrief((prev) => prev + fullText[currentIdx]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 15);
  };

  // Brand Systems Slider State
  const [sliderPosition, setSliderPosition] = useState(50);

  // Conversion Funnels Leads State
  const [leadCounter, setLeadCounter] = useState(124);
  const [leads, setLeads] = useState<{ id: number; color: string; left: number; top: number }[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateLeads = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setLeads([]);

    const pastelColors = ['#99ffcc', '#7bbbff', '#ff99cc', '#ffcc99'];
    const newLeads = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      color: pastelColors[i % pastelColors.length],
      left: Math.random() * 80 + 10, // Starting random position
      top: Math.random() * 80 + 10,
    }));
    
    setLeads(newLeads);

    // Increment count gradually as leads "flow"
    let incremented = 0;
    const interval = setInterval(() => {
      if (incremented < 12) {
        setLeadCounter((c) => c + 1);
        setLeads((curr) => curr.filter((_, idx) => idx !== 0));
        incremented++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 200);
  };

  // Appointment Booking Form State
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentEmail, setAppointmentEmail] = useState('');
  const [selectedAccent, setSelectedAccent] = useState('mint');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Confetti Particle state
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const nextConfettiId = useRef(0);

  const triggerConfetti = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement> | { clientX: number; clientY: number }) => {
    // Determine source coordinates
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2;

    if ('clientX' in e && 'clientY' in e) {
      originX = e.clientX;
      originY = e.clientY;
    }

    const pastelColors = ['#99ffcc', '#7bbbff', '#ff99cc', '#ffcc99'];
    const newConfetti: ConfettiPiece[] = Array.from({ length: 28 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      return {
        id: nextConfettiId.current++,
        x: originX,
        y: originY + window.scrollY, // Factor in page scroll
        color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
        size: Math.random() * 8 + 6,
        angle,
        speed
      };
    });

    setConfetti((curr) => [...curr, ...newConfetti]);
  };

  // Run confetti physics loop
  useEffect(() => {
    if (confetti.length === 0) return;

    const frame = requestAnimationFrame(() => {
      setConfetti((curr) => 
        curr
          .map((p) => ({
            ...p,
            x: p.x + Math.cos(p.angle) * p.speed,
            y: p.y + Math.sin(p.angle) * p.speed + 1.2, // Apply gravity
            speed: p.speed * 0.95 // Drag
          }))
          // Keep particles on screen and with speed
          .filter((p) => p.y < window.innerHeight + window.scrollY && p.speed > 0.2)
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [confetti]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentEmail || !appointmentName) return;
    setIsSubmitted(true);
    
    // Confetti burst from submit location
    const rect = document.getElementById('btn-submit-booking')?.getBoundingClientRect();
    if (rect) {
      triggerConfetti({
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] bg-grid-paper text-black font-sans selection:bg-[#99ffcc] selection:text-black overflow-x-hidden flex flex-col relative">
      
      {/* Infinite Scrolling Marquee Banner (Brutalist Accent) */}
      <div className="bg-black text-[#99ffcc] py-2.5 border-b-2 border-black overflow-hidden font-mono uppercase text-xs tracking-[2px] font-bold select-none z-50">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          <span>SCALE // LMS CONVERSIONS // RETENTION // programatic AI // student funnel // </span>
          <span>SCALE // LMS CONVERSIONS // RETENTION // programatic AI // student funnel // </span>
          <span>SCALE // LMS CONVERSIONS // RETENTION // programatic AI // student funnel // </span>
          <span>SCALE // LMS CONVERSIONS // RETENTION // programatic AI // student funnel // </span>
        </div>
      </div>

      {/* Scattered Confetti Decoration Elements (Floating Navy Blue Shapes) */}
      <div className="absolute top-28 left-10 w-3 h-3 rounded-full bg-[#160042]/20 animate-float pointer-events-none" />
      <div className="absolute top-36 right-16 w-4.5 h-4.5 rounded-full bg-[#160042]/30 animate-float-delayed pointer-events-none" />
      <div className="absolute top-96 left-8 w-2.5 h-2.5 rounded-full bg-[#160042]/15 animate-float pointer-events-none" />
      <div className="absolute top-[500px] right-24 w-4 h-4 rounded-full bg-[#160042]/25 animate-float-delayed pointer-events-none" />
      <div className="absolute bottom-40 left-16 w-3 h-3 rounded-full bg-[#160042]/20 animate-float pointer-events-none" />

      {/* Dynamic Confetti Particle Canvas */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full border border-black/20"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Persistent Navigation Bar */}
      <header className="w-full max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between z-50">
        <a href="#" className="font-serif text-2xl font-bold tracking-tight text-black hover:opacity-80 transition-opacity">
          HATCH
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-sm font-bold text-black hover:underline underline-offset-4 decoration-[#dddfe2]">Our Work</a>
          <a href="#services" className="text-sm font-bold text-black hover:underline underline-offset-4 decoration-[#dddfe2]">Capabilities</a>
          <a href="#playground" className="text-sm font-bold text-black hover:underline underline-offset-4 decoration-[#dddfe2]">Interactive Sandbox</a>
          <a href="#testimonials" className="text-sm font-bold text-black hover:underline underline-offset-4 decoration-[#dddfe2]">Testimonials</a>
          <a href="#booking" className="text-sm font-bold text-black hover:underline underline-offset-4 decoration-[#dddfe2]">Contact</a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:block">
          <a 
            id="nav-cta-call"
            href="#booking"
            className="inline-flex items-center bg-[#99ffcc] text-black font-bold text-sm px-5 py-2.5 rounded-full border border-black hover:bg-white transition-all duration-200 select-none"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-1.5 border border-black rounded-lg bg-white"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[84px] bg-[#f5f4f0] z-40 border-t border-black px-6 py-8 flex flex-col gap-6">
          <a href="#work" onClick={() => setMenuOpen(false)} className="font-serif text-3xl font-bold">Our Work</a>
          <a href="#services" onClick={() => setMenuOpen(false)} className="font-serif text-3xl font-bold">Capabilities</a>
          <a href="#playground" onClick={() => setMenuOpen(false)} className="font-serif text-3xl font-bold">Interactive Sandbox</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} className="font-serif text-3xl font-bold">Testimonials</a>
          <a href="#booking" onClick={() => setMenuOpen(false)} className="font-serif text-3xl font-bold">Contact</a>
          <a 
            href="#booking" 
            onClick={() => setMenuOpen(false)}
            className="w-full text-center bg-[#99ffcc] text-black font-bold py-3 rounded-full border border-black mt-4"
          >
            Book a Call
          </a>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 pt-4 md:pt-6 pb-24 space-y-24">

        {/* Hero Section (CADEO Two-Column Neo-Brutalist Layout - Spacing & Scale Optimized) */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-[1140px] mx-auto pt-4 pb-8">
          
          {/* Navy Blue Floating Star Sticker Behind Left Column */}
          <div className="absolute top-[12%] left-[-4%] text-[#160042]/15 animate-wiggle pointer-events-none -z-10 hidden xl:block">
            <svg className="w-16 h-16 fill-current" viewBox="0 0 100 100">
              <path d="M50 15 C45 35, 25 45, 15 50 C25 55, 45 65, 50 85 C55 65, 75 55, 85 50 C75 45, 55 35, 50 15 Z" />
            </svg>
          </div>

          {/* Navy Blue Hand-Drawn Squiggle Loop between Left & Right Columns */}
          <div className="absolute top-1/2 left-[54%] -translate-y-1/2 text-[#160042]/20 hidden lg:block animate-float pointer-events-none">
            <svg className="w-18 h-18" viewBox="0 0 100 100" fill="none">
              <path d="M10,50 C25,20 75,20 90,50 C95,70 70,90 50,70 C30,50 60,30 80,45" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
          
          {/* Left Column: Copy & Core CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Sparkle Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#ff99cc] text-black text-[10px] font-extrabold tracking-wider px-4 py-2 border-2 border-black shadow-[3px_3px_0px_#000000]">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>MADE FOR EDTECH FOUNDERS & CREATORS</span>
            </div>

            {/* Headline scaled up slightly for visual weight */}
            <h1 className="font-sans font-black text-[40px] sm:text-[56px] md:text-[68px] leading-[1.14] text-[#160042] select-text tracking-tight relative">
              Scaling your <br />
              EdTech platform <br />
              in the digital age.
            </h1>

            {/* Subtitle slightly wider */}
            <p className="text-sm sm:text-base font-bold text-[#160042]/90 max-w-[540px] leading-relaxed">
              Driving your platform's success with high-conversion landing engines, custom LMS builds, and intentional AI automation.
            </p>

            {/* Ratings Row */}
            <div className="flex items-center gap-2 bg-[#ffcc99] border-2 border-black py-1.5 px-3.5 text-[10px] font-extrabold shadow-[2px_2px_0px_#000000]">
              <span className="text-[#160042]">⭐⭐⭐⭐⭐</span>
              <span className="font-mono text-[#160042]">4.9/5 RATED BY EDTECH FOUNDERS</span>
            </div>

            {/* Interactive Tactile Neo-Brutalist Buttons Group */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pt-2 w-full sm:w-auto">
              <button 
                id="cta-scale-edtech"
                onClick={(e) => {
                  triggerConfetti(e);
                  cycleMascot();
                }}
                className="w-full sm:w-auto text-center bg-[#99ffcc] hover:bg-white text-[#160042] font-extrabold text-xs uppercase tracking-widest px-8 py-4 border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 select-none cursor-pointer"
              >
                SCALE YOUR EDTECH 🎉
              </button>

              <div className="relative flex items-center gap-4 group">
                <a 
                  href="#playground" 
                  className="w-full sm:w-auto text-center bg-[#ffcc99] hover:bg-white text-[#160042] font-extrabold text-xs uppercase tracking-widest px-8 py-4 border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 select-none cursor-pointer"
                >
                  EXPLORE PLAYGROUND
                </a>

                {/* Navy Hand-drawn SVG Arrow */}
                <svg className="w-20 h-12 text-[#160042] hidden xl:block transform rotate-6 transition-transform duration-300 origin-right drawing-arrow" fill="none" viewBox="0 0 100 60">
                  {/* The loopy tail path */}
                  <path 
                    d="M 80 12 C 85 22, 70 45, 55 40 C 42 35, 45 18, 55 20 C 65 22, 60 42, 40 45 C 28 47, 18 42, 12 38" 
                    stroke="currentColor" 
                    strokeWidth="3.2" 
                    strokeLinecap="round"
                    className="arrow-path-tail"
                  />
                  {/* The arrowhead path */}
                  <path 
                    d="M 22 28 L 12 38 L 22 48" 
                    stroke="currentColor" 
                    strokeWidth="3.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="arrow-path-head"
                  />
                </svg>
              </div>
            </div>

          </div>

          {/* Right Column: User-provided right section PNG (Scaled up to fill layout) */}
          <div className="lg:col-span-5 flex items-center justify-center relative select-none">
            
            {/* Floating Graduation Cap Sticker (Top-Left) */}
            <div className="absolute -top-8 -left-8 z-20 animate-float hidden xl:block">
              <div className="bg-[#ff99cc] border-2 border-black p-2.5 shadow-[3px_3px_0px_#000000] rotate-[-12deg] hover:rotate-0 transition-all duration-200 flex items-center justify-center w-14 h-14 rounded-2xl">
                <GraduationCap className="w-7 h-7 text-[#160042]" />
              </div>
            </div>

            {/* Floating Lightbulb Sticker (Top-Right) */}
            <div className="absolute -top-10 -right-4 z-20 animate-float-delayed hidden xl:block">
              <div className="bg-[#99ffcc] border-2 border-black p-2.5 shadow-[3px_3px_0px_#000000] rotate-[15deg] hover:rotate-0 transition-all duration-200 flex items-center justify-center w-14 h-14 rounded-2xl">
                <Lightbulb className="w-7 h-7 text-[#160042]" />
              </div>
            </div>

            {/* Floating Book Sticker (Right-Middle) */}
            <div className="absolute top-[40%] -right-12 z-20 animate-float hidden xl:block">
              <div className="bg-[#7bbbff] border-2 border-black p-2.5 shadow-[3px_3px_0px_#000000] rotate-[-8deg] hover:rotate-0 transition-all duration-200 flex items-center justify-center w-14 h-14 rounded-full">
                <BookOpen className="w-7 h-7 text-[#160042]" />
              </div>
            </div>

            {/* Animated Growth Graph Squiggle (Bottom-Right) */}
            <div className="absolute -bottom-10 -right-10 text-[#ffcc99] animate-float-delayed hidden xl:block -z-10">
              <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                {/* Dashed growth trend curve */}
                <path 
                  d="M 10 90 Q 30 70, 45 45 T 85 15" 
                  stroke="currentColor" 
                  strokeWidth="3.5" 
                  strokeDasharray="6 4" 
                  strokeLinecap="round" 
                />
                {/* Growth Arrowhead */}
                <path 
                  d="M 72 15 L 85 15 L 85 28" 
                  stroke="currentColor" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>

            <div className="relative bg-white border-[3px] border-black p-4 shadow-[8px_8px_0px_#000000] rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
              <img 
                src={rightSectionImg} 
                alt="EdTech Platform Layout" 
                className="w-full max-w-[500px] h-auto object-cover border border-black/10"
              />

              {/* Overlapping Mascot Sticker Card to fill remaining space */}
              <div className="absolute -bottom-6 -left-6 rotate-[-4deg] z-20">
                <div className="bg-white border-2 border-black p-2 shadow-[3px_3px_0px_#000] flex flex-col items-center">
                  <button onClick={cycleMascot} className="w-12 h-12" aria-label="Mascot Dialog">
                    <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
                      <path d="M120 40C120 18 100 0 80 0C60 0 40 18 40 40C40 62 60 80 80 80C90 80 98 83 105 90L115 100V80C120 72 120 54 120 40Z" fill="#7bbbff" stroke="#000000" strokeWidth="4" />
                      <circle cx="61" cy="35" r="4.5" fill="#000000" />
                      <circle cx="96" cy="35" r="4.5" fill="#000000" />
                      <path d="M72 50C75 55 85 55 88 50" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </button>
                  <span className="text-[7px] font-extrabold uppercase mt-0.5 text-[#160042]">{mascotQuotes[quoteIndex].substring(0, 12)}...</span>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Section: Core Services (Tabbed Zine Light Theme - Compact Height) */}
        <section id="services" className="scroll-mt-12 space-y-8 py-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#160042]">OUR CAPABILITIES</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 text-[#160042]">
              Growth Engines Built For Scale
            </h2>
            <p className="text-sm font-bold text-[#160042]/70 mt-1">
              Explore our core methodologies for accelerating audience growth, brand authority, and revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1060px] mx-auto items-stretch min-h-[420px]">
            
            {/* Left Column: Tab Selector List */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-3">
              {servicesList.map((service) => {
                const isActive = activeService === service.id;
                const IconComponent = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className="w-full text-left px-5 py-4 bg-white border-2 border-black font-extrabold text-xs uppercase tracking-wider select-none transition-all duration-100 hover:-translate-x-[2px] hover:-translate-y-[2px] rounded-2xl flex items-center justify-between"
                    style={{
                      backgroundColor: isActive ? service.accentColor : '#ffffff',
                      boxShadow: isActive ? '3px 3px 0px #000000' : '5px 5px 0px #000000',
                      transform: isActive ? 'translate(2px, 2px)' : 'none',
                    }}
                  >
                    <span className="flex items-center gap-3 text-[#160042]">
                      <IconComponent className="w-4 h-4 shrink-0" />
                      <span>{service.title.split(' ⚡ ')[0]}</span>
                    </span>
                    <span className="text-[10px] font-mono font-black text-[#160042]/40 bg-[#f5f4f0] px-2 py-0.5 border border-black/10 rounded">
                      {service.number}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Selected Tab Detail Card (Compact wobbly zine card) */}
            <div className="lg:col-span-7 flex items-center justify-center">
              {servicesList.map((service) => {
                if (activeService !== service.id) return null;
                return (
                  <div
                    key={service.id}
                    className="w-full bg-white border-[3px] border-black p-6 sm:p-8 rounded-[24px] shadow-[6px_6px_0px_#000000] rotate-[0.5deg] hover:rotate-0 transition-transform duration-200 flex flex-col justify-between h-full min-h-[380px] space-y-4 animate-hub-fade-up select-text"
                  >
                    <div className="space-y-3">
                      {/* Category Badge & Number */}
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 border-2 border-black rounded-md text-black"
                          style={{ backgroundColor: service.accentColor }}
                        >
                          {service.category}
                        </span>
                        <span className="text-xs font-mono font-black text-[#160042]/40">
                          #{service.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-black text-xl sm:text-2xl text-[#160042] tracking-tight uppercase leading-none">
                        {service.title}
                      </h3>

                      {/* Quote */}
                      <p className="text-xs italic text-[#160042]/80 font-serif border-l-2 border-black/25 pl-3 py-0.5">
                        {service.quote}
                      </p>

                      {/* Paragraph */}
                      <p className="text-xs sm:text-sm text-zinc-700 font-bold leading-relaxed pt-1">
                        {service.description}
                      </p>

                      {/* Checklist */}
                      <ul className="space-y-1.5 pt-1">
                        {service.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs text-[#160042] font-black">
                            <span className="text-emerald-500 text-sm">✓</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          const notesArea = document.getElementById('input-notes') as HTMLTextAreaElement | null;
                          if (notesArea) {
                            notesArea.value = `Interested in "${service.title}"...`;
                            notesArea.focus();
                          }
                        }}
                        className="w-full text-center bg-white hover:bg-white text-[#160042] font-extrabold text-[10px] uppercase tracking-widest px-5 py-3 border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all duration-100 select-none cursor-pointer rounded-xl"
                        style={{ backgroundColor: service.accentColor }}
                      >
                        {service.ctaText}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Section: Platform Pipeline — Expert Animated */}
        <section id="pipeline" className="scroll-mt-12 flex flex-col items-center justify-center gap-6" ref={hubRef}>
          <div className={`text-center transition-all duration-700 ${hubVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-slate-500">SYSTEM ARCHITECTURE</span>
            <h3 className="font-serif text-2xl md:text-3xl mt-1">Our Student Acquisition Scale Engine</h3>
            <p className="text-xs text-slate-500 mt-2">Hover over the pipeline nodes to trace the active student & lead acquisition flows in real time.</p>
          </div>
          
          <div className={`bg-white border-2 border-black rounded-[16px] p-6 sm:p-10 max-w-4xl w-full select-none flex flex-col gap-6 transition-all duration-700 delay-150 ${hubVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Dynamic Status Bar */}
            <div className="bg-[#f5f4f0] border border-black p-4 rounded-xl min-h-[72px] overflow-hidden relative">
              {hoveredNode && nodeStats[hoveredNode] ? (
                <div className="flex items-center gap-3 animate-status-slide-in">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-black animate-pulse shrink-0"
                    style={{ backgroundColor: nodeStats[hoveredNode].color }}
                  />
                  <div>
                    <span className="font-black text-[10px] uppercase tracking-[2px] block" style={{ color: nodeStats[hoveredNode].color === '#7bbbff' ? '#1a6eff' : nodeStats[hoveredNode].color === '#ffcc99' ? '#b36a00' : '#cc0066' }}>{nodeStats[hoveredNode].name}</span>
                    <span className="text-sm font-semibold text-black">{nodeStats[hoveredNode].stat}</span>
                  </div>
                  {/* Animated stat bar */}
                  <div className="ml-auto hidden sm:flex flex-col items-end gap-1">
                    <div className="h-1.5 rounded-full bg-black/10 w-28 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: '80%', backgroundColor: nodeStats[hoveredNode].color }} />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">PIPELINE ACTIVITY</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 h-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-xs text-slate-400 italic">Hover any pipeline node to trace active student & lead acquisition flows...</span>
                </div>
              )}
            </div>

            {/* Expert Animated SVG Hub */}
            <div className="relative">
              <svg className="w-full h-auto" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">

                {/* ── BACKGROUND PATHS (drawn on section enter) ── */}
                {[
                  { d: 'M150 60 L400 160', nodeKey: 'founder', color: '#7bbbff' },
                  { d: 'M150 160 L400 160', nodeKey: 'ads', color: '#ffcc99' },
                  { d: 'M150 260 L400 160', nodeKey: 'cold', color: '#ff99cc' },
                  { d: 'M400 160 L650 60', nodeKey: 'ai_scoring', color: '#99ffcc' },
                  { d: 'M400 160 L650 160', nodeKey: 'lms_nurture', color: '#7bbbff' },
                  { d: 'M400 160 L650 260', nodeKey: 'booked_calls', color: '#ffcc99' },
                ].map(({ d, nodeKey, color }, i) => (
                  <g key={nodeKey}>
                    {/* Base track */}
                    <path
                      d={d}
                      stroke="#e5e7eb"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Active path draw-on */}
                    <path
                      d={d}
                      stroke={color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="400"
                      strokeDashoffset={hubVisible ? '0' : '400'}
                      className={hoveredNode === nodeKey ? 'animate-dash-flow' : ''}
                      style={{
                        transition: `stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s`,
                        opacity: hoveredNode === nodeKey ? 1 : 0.25,
                      }}
                    />
                    {/* Hidden path for animateMotion */}
                    <path id={`path-${nodeKey}`} d={d} fill="none" stroke="none" />
                  </g>
                ))}

                {/* ── CONTINUOUS FLOWING LEAD PARTICLES ── */}
                {hubVisible && [
                  { nodeKey: 'founder', color: '#7bbbff' },
                  { nodeKey: 'ads', color: '#ffcc99' },
                  { nodeKey: 'cold', color: '#ff99cc' },
                  { nodeKey: 'ai_scoring', color: '#99ffcc' },
                  { nodeKey: 'lms_nurture', color: '#7bbbff' },
                  { nodeKey: 'booked_calls', color: '#ffcc99' },
                ].map(({ nodeKey, color }) => {
                  const isCurrentHovered = hoveredNode === nodeKey;
                  return (
                    <g key={`flow-${nodeKey}`} style={{ opacity: hoveredNode && !isCurrentHovered ? 0.35 : 1, transition: 'opacity 0.25s ease' }}>
                      {/* Dot 1 */}
                      <circle 
                        r={isCurrentHovered ? 6 : 3.5} 
                        fill={color} 
                        stroke="#000000" 
                        strokeWidth={isCurrentHovered ? 1.8 : 1}
                        style={{ transition: 'r 0.2s ease, stroke-width 0.2s ease' }}
                      >
                        <animateMotion dur="2.2s" repeatCount="indefinite" rotate="auto" begin="0s">
                          <mpath href={`#path-${nodeKey}`} />
                        </animateMotion>
                      </circle>
                      {/* Dot 2 */}
                      <circle 
                        r={isCurrentHovered ? 6 : 3.5} 
                        fill={color} 
                        stroke="#000000" 
                        strokeWidth={isCurrentHovered ? 1.8 : 1}
                        style={{ transition: 'r 0.2s ease, stroke-width 0.2s ease' }}
                      >
                        <animateMotion dur="2.2s" repeatCount="indefinite" rotate="auto" begin="1.1s">
                          <mpath href={`#path-${nodeKey}`} />
                        </animateMotion>
                      </circle>
                    </g>
                  );
                })}

                {/* ── CENTRAL NODE — Pulsing mint hub ── */}
                <g className={`transition-all duration-500 ${hubVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.9s' }}>
                  {/* Outer expansion ring 1 */}
                  <circle cx="400" cy="160" r="56" fill="none" stroke="#99ffcc" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="r" values="52;72;52" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                  {/* Outer expansion ring 2 (offset phase) */}
                  <circle cx="400" cy="160" r="56" fill="none" stroke="#99ffcc" strokeWidth="1" opacity="0.3">
                    <animate attributeName="r" values="52;80;52" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
                  </circle>
                  {/* Main circle */}
                  <circle cx="400" cy="160" r="44" fill="#99ffcc" stroke="#000000" strokeWidth="3">
                    <animate attributeName="r" values="44;46;44" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Rotating Cog icon centered inside central node */}
                  <foreignObject width="50" height="50" x="375" y="135" className="pointer-events-none">
                    <div className="w-full h-full flex items-center justify-center">
                      <Cpu className="w-8 h-8 text-black animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                  </foreignObject>
                </g>

                {/* ── LEFT NODES ── */}
                {[
                  { cx: 150, cy: 60, nodeKey: 'founder', color: '#7bbbff', delay: 0.2, icon: (
                    <foreignObject width="40" height="40" x="130" y="40" className="pointer-events-none">
                      <div className="w-full h-full flex items-center justify-center">
                        <Crown className="w-5 h-5 text-black" />
                      </div>
                    </foreignObject>
                  )},
                  { cx: 150, cy: 160, nodeKey: 'ads', color: '#ffcc99', delay: 0.35, icon: (
                    <foreignObject width="40" height="40" x="130" y="140" className="pointer-events-none">
                      <div className="w-full h-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-black" />
                      </div>
                    </foreignObject>
                  )},
                  { cx: 150, cy: 260, nodeKey: 'cold', color: '#ff99cc', delay: 0.5, icon: (
                    <foreignObject width="40" height="40" x="130" y="240" className="pointer-events-none">
                      <div className="w-full h-full flex items-center justify-center">
                        <Send className="w-5 h-5 text-black" />
                      </div>
                    </foreignObject>
                  )},
                ].map(({ cx, cy, nodeKey, color, delay, icon }) => (
                  <g
                    key={nodeKey}
                    onMouseEnter={() => setHoveredNode(nodeKey)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                    style={{
                      opacity: hubVisible ? 1 : 0,
                      transform: hubVisible ? 'scale(1)' : 'scale(0.3)',
                      transformOrigin: `${cx}px ${cy}px`,
                      transition: `opacity 0.5s ease ${delay}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                    }}
                  >
                    {/* Hover glow ring */}
                    <circle
                      cx={cx} cy={cy} r="32"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      opacity={hoveredNode === nodeKey ? 0.6 : 0}
                      style={{ transition: 'opacity 0.2s ease' }}
                    >
                      {hoveredNode === nodeKey && (
                        <animate attributeName="r" values="32;38;32" dur="1.2s" repeatCount="indefinite" />
                      )}
                    </circle>
                    {/* Main circle */}
                    <circle
                      cx={cx} cy={cy} r="26"
                      fill={hoveredNode === nodeKey ? color : '#ffffff'}
                      stroke="#000000"
                      strokeWidth="2.5"
                      style={{ transition: 'fill 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)', transform: hoveredNode === nodeKey ? 'scale(1.12)' : 'scale(1)', transformOrigin: `${cx}px ${cy}px` }}
                    />
                    {icon}
                  </g>
                ))}

                {/* ── RIGHT NODES ── */}
                {[
                  { cx: 650, cy: 60, nodeKey: 'ai_scoring', color: '#99ffcc', delay: 0.25, icon: (
                    <foreignObject width="40" height="40" x="630" y="40" className="pointer-events-none">
                      <div className="w-full h-full flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-black" />
                      </div>
                    </foreignObject>
                  )},
                  { cx: 650, cy: 160, nodeKey: 'lms_nurture', color: '#7bbbff', delay: 0.4, icon: (
                    <foreignObject width="40" height="40" x="630" y="140" className="pointer-events-none">
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-black" />
                      </div>
                    </foreignObject>
                  )},
                  { cx: 650, cy: 260, nodeKey: 'booked_calls', color: '#ffcc99', delay: 0.55, icon: (
                    <foreignObject width="40" height="40" x="630" y="240" className="pointer-events-none">
                      <div className="w-full h-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-black" />
                      </div>
                    </foreignObject>
                  )},
                ].map(({ cx, cy, nodeKey, color, delay, icon }) => (
                  <g
                    key={nodeKey}
                    onMouseEnter={() => setHoveredNode(nodeKey)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                    style={{
                      opacity: hubVisible ? 1 : 0,
                      transform: hubVisible ? 'scale(1)' : 'scale(0.3)',
                      transformOrigin: `${cx}px ${cy}px`,
                      transition: `opacity 0.5s ease ${delay}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                    }}
                  >
                    <circle
                      cx={cx} cy={cy} r="32"
                      fill="none" stroke={color} strokeWidth="2"
                      opacity={hoveredNode === nodeKey ? 0.6 : 0}
                      style={{ transition: 'opacity 0.2s ease' }}
                    >
                      {hoveredNode === nodeKey && (
                        <animate attributeName="r" values="32;38;32" dur="1.2s" repeatCount="indefinite" />
                      )}
                    </circle>
                    <circle
                      cx={cx} cy={cy} r="26"
                      fill={hoveredNode === nodeKey ? color : '#ffffff'}
                      stroke="#000000" strokeWidth="2.5"
                      style={{ transition: 'fill 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)', transform: hoveredNode === nodeKey ? 'scale(1.12)' : 'scale(1)', transformOrigin: `${cx}px ${cy}px` }}
                    />
                    {icon}
                  </g>
                ))}

                {/* Labels */}
                <text x="150" y="20" textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="11" fontWeight="bold" letterSpacing="2">ACQUISITION SOURCES</text>
                <text x="650" y="20" textAnchor="middle" fill="#94a3b8" fontFamily="monospace" fontSize="11" fontWeight="bold" letterSpacing="2">SYSTEM OUTPUTS</text>
                <text x="400" y="226" textAnchor="middle" fill="#000000" fontFamily="monospace" fontSize="9" fontWeight="bold" letterSpacing="1.5" opacity="0.5">SCALE ENGINE</text>
              </svg>
            </div>

            {/* Live Node Legend */}
            <div className={`flex flex-wrap gap-3 justify-center pt-2 border-t border-black/10 transition-all duration-700 delay-700 ${hubVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {Object.entries(nodeStats).map(([key, { name, color }]) => (
                <button
                  key={key}
                  onMouseEnter={() => setHoveredNode(key)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/20 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 hover:border-black"
                  style={{ backgroundColor: hoveredNode === key ? color : 'transparent' }}
                >
                  <span className="w-2 h-2 rounded-full border border-black/30" style={{ backgroundColor: color }} />
                  {name.split(' (')[0].split(' Calls')[0]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Case Study Showcase */}
        <section id="work" className="scroll-mt-12 space-y-8 py-12 border-t border-black/10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-slate-500">CASE STUDIES</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 text-black">
              Proven Results For Growing Platforms
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Tabs Bar */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {caseStudies.map((study) => {
                const isActive = activeCaseStudy === study.id;
                return (
                  <button
                    key={study.id}
                    onClick={() => setActiveCaseStudy(study.id)}
                    className="px-4 py-2.5 bg-white border-2 border-black font-extrabold text-[10px] tracking-wider uppercase select-none transition-all duration-100 hover:-translate-x-[2px] hover:-translate-y-[2px]"
                    style={{
                      backgroundColor: isActive ? study.accentColor : '#ffffff',
                      boxShadow: isActive ? '3px 3px 0px #000000' : '5px 5px 0px #000000',
                      transform: isActive ? 'translate(2px, 2px)' : 'none',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full border border-black/40" style={{ backgroundColor: study.accentColor }} />
                      {study.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Showcase Detail Card */}
            {caseStudies.map((study) => {
              if (study.id !== activeCaseStudy) return null;
              return (
                <div 
                  key={study.id}
                  className="bg-black text-white border-2 border-black rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-[12px_12px_0px_rgba(0,0,0,0.15)] transition-all duration-500 min-h-[460px]"
                >
                  {/* Left Column: Image */}
                  <div className="lg:col-span-6 relative overflow-hidden group min-h-[280px] lg:min-h-full">
                    <img 
                      src={study.image} 
                      alt={study.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-sm border border-white/20 text-white font-mono text-[9px] tracking-wider uppercase px-3 py-1.5 rounded font-bold">
                      {study.name}
                    </div>
                  </div>

                  {/* Right Column: Copy & Metrics */}
                  <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-8 select-text">
                    
                    <div className="space-y-4">
                      {/* Tags & Badge */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-mono tracking-widest text-[#ffcc99] font-bold">
                          {study.tags}
                        </span>
                        <span 
                          className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 border border-black rounded-md text-black"
                          style={{ backgroundColor: study.accentColor }}
                        >
                          {study.badge}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="font-sans font-black text-lg sm:text-xl md:text-2xl leading-[1.3] text-white tracking-tight uppercase">
                        {study.headline}
                      </h3>
                    </div>

                    {/* Key Results */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-black">
                        KEY RESULTS
                      </span>
                      <div className="grid grid-cols-3 gap-4">
                        {study.metrics.map((metric, idx) => (
                          <div key={idx} className="border-l-2 pl-3" style={{ borderColor: study.accentColor }}>
                            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white leading-none">
                              {metric.value}
                            </div>
                            <div className="text-[9px] font-bold text-zinc-400 mt-1.5 uppercase tracking-wider leading-tight">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <a 
                        href="#booking"
                        onClick={() => {
                          const notesArea = document.getElementById('input-notes') as HTMLTextAreaElement | null;
                          if (notesArea) {
                            notesArea.value = `Interested in results similar to "${study.name}" case study...`;
                            notesArea.focus();
                          }
                        }}
                        className="inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-wider px-6 py-3.5 bg-white text-black border-2 border-black shadow-[4px_4px_0px_rgba(255,255,255,0.15)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_rgba(255,255,255,0.2)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 cursor-pointer"
                      >
                        GET SIMILAR RESULTS <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Service Playground */}
        <section id="playground" className="scroll-mt-12 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-slate-500">interactive sandbox</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 text-black">
              Try our capabilities in real-time
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white border-2 border-black rounded-[16px] overflow-hidden flex flex-col md:flex-row min-h-[420px]">
            {/* Left selector menu */}
            <div className="bg-[#f5f4f0] border-b-2 md:border-b-0 md:border-r-2 border-black p-6 flex md:flex-col gap-3 md:w-64 shrink-0">
              <button 
                onClick={() => setActiveTab('ai')}
                className={`w-full text-left px-4 py-3.5 rounded-xl border font-bold text-sm transition-all flex items-center justify-between ${activeTab === 'ai' ? 'bg-[#99ffcc] border-black' : 'bg-white border-transparent hover:border-black'}`}
              >
                <span>AI Strategy</span>
                <span className="text-[10px] bg-black/5 px-2 py-0.5 rounded font-mono">01</span>
              </button>
              <button 
                onClick={() => setActiveTab('brand')}
                className={`w-full text-left px-4 py-3.5 rounded-xl border font-bold text-sm transition-all flex items-center justify-between ${activeTab === 'brand' ? 'bg-[#7bbbff] border-black' : 'bg-white border-transparent hover:border-black'}`}
              >
                <span>Brand Systems</span>
                <span className="text-[10px] bg-black/5 px-2 py-0.5 rounded font-mono">02</span>
              </button>
              <button 
                onClick={() => setActiveTab('funnel')}
                className={`w-full text-left px-4 py-3.5 rounded-xl border font-bold text-sm transition-all flex items-center justify-between ${activeTab === 'funnel' ? 'bg-[#ff99cc] border-black' : 'bg-white border-transparent hover:border-black'}`}
              >
                <span>Conversion Funnels</span>
                <span className="text-[10px] bg-black/5 px-2 py-0.5 rounded font-mono">03</span>
              </button>
            </div>

            {/* Right playground area */}
            <div className="p-8 flex-1 flex flex-col justify-between bg-white">
              
              {/* Tab 1: AI Brief Writer */}
              {activeTab === 'ai' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#99ffcc] border border-black uppercase">Module AI.01</span>
                      <h3 className="font-serif text-2xl font-bold">Interactive Brief Generator</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                      Configure your primary brand expansion vector and trigger Hatch Mascot AI to draft a programmatic action brief.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {['EdTech Cohort', 'Coding Boot Camp', 'Creative Agency'].map((goal) => (
                        <button
                          key={goal}
                          onClick={() => setSelectedGoal(goal)}
                          className={`text-xs font-bold px-3.5 py-2 rounded-lg border transition-all ${selectedGoal === goal ? 'bg-black text-white border-black' : 'bg-[#f5f4f0] border-black/15 hover:border-black'}`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-end min-h-[140px] pt-4">
                    <div className="bg-[#f5f4f0] border border-black rounded-xl p-4 font-mono text-xs text-slate-800 h-36 overflow-y-auto whitespace-pre-wrap relative select-text">
                      {generatedBrief || (
                        <span className="text-slate-400 italic">Select an expansion model above and click Generate...</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={generateBriefText}
                      disabled={isGenerating}
                      className="inline-flex items-center gap-2 bg-[#99ffcc] border border-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-black hover:text-[#99ffcc] disabled:opacity-50 transition-all select-none"
                    >
                      {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                      Generate Brief
                    </button>
                    <span className="text-xs text-slate-400 font-mono">// Ready</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Brand Systems Comparison Slider */}
              {activeTab === 'brand' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#7bbbff] border border-black uppercase">Module BR.02</span>
                      <h3 className="font-serif text-2xl font-bold">Zine Transition Comparison</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                      Drag the slider below to contrast generic corporate layouts with our hand-illustrated cream agency designs.
                    </p>
                  </div>

                  {/* Before/After Split Viewer */}
                  <div className="relative w-full h-44 rounded-xl border border-black overflow-hidden bg-slate-900 select-none">
                    
                    {/* Before State (Generic corporate design) */}
                    <div className="absolute inset-0 bg-slate-900 text-slate-400 flex flex-col justify-center px-8 space-y-2">
                      <div className="w-16 h-4 bg-slate-800 rounded animate-pulse" />
                      <div className="font-sans text-xl font-medium text-slate-300">Generic Dashboard Layout</div>
                      <div className="w-44 h-2 bg-slate-800 rounded" />
                      <div className="w-32 h-2 bg-slate-800 rounded" />
                    </div>

                    {/* After State (Hatch creative design) - Clipped dynamically by sliderPosition */}
                    <div 
                      className="absolute inset-0 bg-[#f5f4f0] text-black border-r border-black flex flex-col justify-center px-8 space-y-2 overflow-hidden transition-all"
                      style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                    >
                      <div className="inline-block bg-[#ffcc99] border border-black text-[9px] font-bold px-2 rounded-full w-fit">CREATIVE</div>
                      <div className="font-serif text-2xl font-bold tracking-tight text-[#160042]">ambitions unlocked</div>
                      <div className="text-xs text-[#222222] max-w-[280px]">Bespoke handmade paper canvassing overlayed with pastels.</div>
                    </div>

                    {/* Clip Division Indicator */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-black z-20 pointer-events-none"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-[#7bbbff] border border-black rounded-full flex items-center justify-center font-bold text-xs">
                        ↔
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="comparison-slider" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Transition Progress: {sliderPosition}%</label>
                    <input 
                      id="comparison-slider"
                      type="range" 
                      min="0" 
                      max="100" 
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="w-full h-2 bg-[#f5f4f0] border border-black rounded-lg appearance-none cursor-pointer accent-black"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Conversion Funnels Leads Flow */}
              {activeTab === 'funnel' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#ff99cc] border border-black uppercase">Module FN.03</span>
                      <h3 className="font-serif text-2xl font-bold">Lead Pipeline Simulator</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                      Click the simulator to generate mock student leads flowing from outbound social channels directly into your roster.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center bg-[#f5f4f0] border border-black rounded-xl p-4 min-h-[120px] relative overflow-hidden select-none">
                    
                    {/* Left: Source Platforms */}
                    <div className="text-center space-y-1 border-r border-black/10">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Outbound</span>
                      <span className="font-serif text-base font-bold">Social Feed</span>
                    </div>

                    {/* Middle: Simulating Flow Particle Area */}
                    <div className="relative h-20 border-r border-black/10">
                      {leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="absolute w-3.5 h-3.5 rounded-full border border-black/50 transition-all duration-700 ease-out"
                          style={{
                            left: `${lead.left}%`,
                            top: `${lead.top}%`,
                            backgroundColor: lead.color,
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      ))}
                      {isSimulating && (
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-indigo-500 animate-pulse">FLOWING...</span>
                      )}
                    </div>

                    {/* Right: Counter */}
                    <div className="text-center space-y-0.5">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Student Roster</span>
                      <span className="text-3xl font-extrabold tracking-tight font-mono text-emerald-600">{leadCounter}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={simulateLeads}
                      disabled={isSimulating}
                      className="inline-flex items-center gap-2 bg-[#ff99cc] border border-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-black hover:text-[#ff99cc] disabled:opacity-50 transition-all select-none"
                    >
                      <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                      Simulate Leads
                    </button>
                    <span className="text-xs text-slate-400 font-mono">// Sandbox mode</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* Section: Testimonials (Bubblegum Pink Zine Theme) */}
        <section id="testimonials" className="scroll-mt-12 max-w-[960px] mx-auto py-6">
          <div className="bg-[#ffa3d1] border-[3px] border-black rounded-[24px] shadow-[8px_8px_0px_#000] p-8 sm:p-12 relative overflow-hidden select-text min-h-[380px] flex flex-col justify-between">
            
            {/* Header: Centered Title */}
            <div className="text-center mb-6">
              <h2 className="font-sans font-black text-xl sm:text-2xl text-black uppercase tracking-tight">
                This is what my clients say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 px-4">
              {/* Left Column: Mascot/Client cutout with wobbly colored backdrop blob */}
              <div className="md:col-span-5 flex justify-center relative min-h-[190px]">
                {/* Wobbly backdrop blob shape */}
                <div 
                  className="w-44 h-44 border-2 border-black shadow-[4px_4px_0px_#000000] absolute -z-10 animate-blob-wobble"
                  style={{ backgroundColor: testimonials[activeTestimonial].blobColor }}
                />
                
                {/* High contrast grayscale cutout image with solid white outline border */}
                <img 
                  src={testimonials[activeTestimonial].image} 
                  alt={testimonials[activeTestimonial].author}
                  className="w-40 h-40 object-cover rounded-[36px] border-2 border-black filter grayscale contrast-[1.15] brightness-[1.05] drop-shadow-[3px_3px_0px_#ffffff] drop-shadow-[-3px_-3px_0px_#ffffff] drop-shadow-[3px_-3px_0px_#ffffff] drop-shadow-[-3px_3px_0px_#ffffff] z-10 transition-all duration-300 transform hover:scale-105"
                />
              </div>

              {/* Right Column: Detailed Testimonial Text & Info */}
              <div className="md:col-span-7 space-y-4 text-center md:text-left flex flex-col justify-center">
                <p className="font-sans font-extrabold text-sm sm:text-base text-black leading-relaxed italic">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="pt-2">
                  <h4 className="font-sans font-black text-base text-black uppercase">
                    {testimonials[activeTestimonial].author}
                  </h4>
                  <p className="text-[10px] font-mono font-black text-black/60 uppercase tracking-wider">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel Arrow Controls */}
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_#000] hover:bg-zinc-100 active:shadow-none transition-all duration-100 select-none cursor-pointer flex items-center justify-center text-black"
              aria-label="Previous Testimonial"
            >
              <span className="font-sans font-black text-sm sm:text-base">←</span>
            </button>
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_#000] hover:bg-zinc-100 active:shadow-none transition-all duration-100 select-none cursor-pointer flex items-center justify-center text-black"
              aria-label="Next Testimonial"
            >
              <span className="font-sans font-black text-sm sm:text-base">→</span>
            </button>

            {/* Slider Dots Row */}
            <div className="flex gap-2 justify-center mt-6 z-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full border-2 border-black transition-all ${idx === activeTestimonial ? 'bg-black scale-110' : 'bg-transparent hover:bg-black/20'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </section>

        {/* Section: Booking Form (Interactive Accent Color & Confetti Burst) */}
        <section id="booking" className="scroll-mt-12 max-w-xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-slate-500">START YOUR EXPANSION</span>
            <h2 className="font-serif text-3xl mt-1 text-black">Ready to hatch your ideas?</h2>
            <p className="text-sm text-slate-600 mt-2">Select your favorite brand color and send us a brief message.</p>
          </div>

          <div className="bg-white border-2 border-black rounded-[16px] p-8 space-y-6">
            
            {/* Color Accent Picker */}
            <div className="space-y-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">1. CHOOSE YOUR BRAND ACCENT COLOR</span>
              <div className="flex gap-3">
                {[
                  { id: 'mint', color: '#99ffcc', name: 'Mint Splash' },
                  { id: 'sky', color: '#7bbbff', name: 'Sky Pop' },
                  { id: 'peach', color: '#ffcc99', name: 'Peach Pop' },
                  { id: 'pink', color: '#ff99cc', name: 'Bubblegum' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedAccent(item.id)}
                    style={{ backgroundColor: item.color }}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedAccent === item.id ? 'border-black scale-110 shadow-none' : 'border-black/20 hover:border-black'}`}
                    aria-label={`Select ${item.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Dynamic Card Border matching selected accent color */}
            <div 
              className="border-2 rounded-xl p-6 transition-all duration-350 bg-[#f5f4f0]/30"
              style={{
                borderColor: 
                  selectedAccent === 'mint' ? '#99ffcc' :
                  selectedAccent === 'sky' ? '#7bbbff' :
                  selectedAccent === 'peach' ? '#ffcc99' : '#ff99cc'
              }}
            >
              {isSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <h3 className="font-serif text-2xl font-bold">Booking Brief Locked!</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thanks <span className="font-bold text-black">{appointmentName}</span>, our team will reach out to <span className="font-bold text-black">{appointmentEmail}</span> with your bespoke planner shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setAppointmentName('');
                      setAppointmentEmail('');
                    }}
                    className="text-xs font-bold underline hover:text-indigo-600"
                  >
                    Reset Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label htmlFor="input-name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Name</label>
                    <input
                      id="input-name"
                      type="text"
                      placeholder="e.g. Vaibhav"
                      value={appointmentName}
                      onChange={(e) => setAppointmentName(e.target.value)}
                      className="w-full bg-white border border-black rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="input-email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      id="input-email"
                      type="email"
                      placeholder="e.g. growth@hatch.co"
                      value={appointmentEmail}
                      onChange={(e) => setAppointmentEmail(e.target.value)}
                      className="w-full bg-white border border-black rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="input-notes" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Brief Notes (Optional)</label>
                    <textarea
                      id="input-notes"
                      placeholder="Tell us what you want to build..."
                      rows={3}
                      className="w-full bg-white border border-black rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    />
                  </div>

                  <button
                    id="btn-submit-booking"
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl border border-black select-none transition-colors duration-200"
                    style={{
                      backgroundColor: 
                        selectedAccent === 'mint' ? '#99ffcc' :
                        selectedAccent === 'sky' ? '#7bbbff' :
                        selectedAccent === 'peach' ? '#ffcc99' : '#ff99cc'
                    }}
                  >
                    <Send className="w-4 h-4" />
                    SUBMIT BOOKING BRIEF
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="pt-16 border-t border-black/10 text-center text-xs text-slate-500 space-y-4">
          <div className="flex justify-center gap-6 text-black font-bold">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          <p>© 2026 Hatch Studio. Hand-drawn with care & built for high growth.</p>
        </footer>

      </main>

      {/* Retro Conic Checkerboard Trim Banner */}
      <div className="h-10 bg-checkerboard border-t-2 border-black w-full shrink-0" />
    </div>
  );
}
