'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { 
  MicOff, 
  Ghost, 
  UsersRound, 
  PackageCheck, 
  ScanSearch, 
  Beaker, 
  Bot, 
  TerminalSquare, 
  Swords, 
  ClipboardList, 
  LifeBuoy, 
  Gavel,
  Crown,
  Linkedin,
  Lock,
  Vibrate,
  Car,
  MountainSnow,
  Snowflake,
  Bike,
  Trees,
  Cpu,
  Wind,
  Brain,
  CircleDot,
  Music
} from 'lucide-react';

export default function Home() {
  const [shotFired, setShotFired] = useState(false);
  const [scopePosition, setScopePosition] = useState({ x: -1000, y: -1000 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchCheck);

    const initGSAP = async () => {
      try {
        const gsap = await import('gsap');
        const ScrollTrigger = await import('gsap/ScrollTrigger');
        gsap.default.registerPlugin(ScrollTrigger.default);

        gsap.default.to("body", { duration: 0.5, opacity: 1, ease: "power1.inOut" });
        gsap.default.from(".hero-bg", { opacity: 0, duration: 2, ease: "power3.out" });
        gsap.default.to("#hero-content", { y: -15, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.default.from("#hero-content > *", { duration: 0.8, y: 30, opacity: 0, stagger: 0.15, ease: "power3.out", delay: 0.2 });
        
        gsap.default.utils.toArray<HTMLElement>("h2").forEach((h2) => {
          gsap.default.from(h2, {
            scrollTrigger: {
              trigger: h2,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out"
          });
        });

        gsap.default.from(".achievement-card", {
          scrollTrigger: {
            trigger: "#achievements",
            start: "top 80%",
            toggleActions: "play none none none"
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        });

      } catch (error) {
        console.error('GSAP initialization failed:', error);
        if (document.body) document.body.style.opacity = '1';
      }
    };
    initGSAP();
  }, []);

  useEffect(() => {
    const positionScope = () => {
      if (isTouchDevice && photoRef.current) {
        const photoRect = photoRef.current.getBoundingClientRect();
        setScopePosition({
          x: photoRect.left + photoRect.width / 2,
          y: photoRect.top + photoRect.height / 2,
        });
      }
    };

    const timer = setTimeout(positionScope, 200);
    window.addEventListener('resize', positionScope);
    window.addEventListener('scroll', positionScope);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', positionScope);
      window.removeEventListener('scroll', positionScope);
    };
  }, [isTouchDevice]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    setScopePosition({ x: e.clientX, y: e.clientY });
  };

  const handlePhotoClick = () => {
    setShotFired(true);
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const mainOsc = audioContext.createOscillator();
      const mainGain = audioContext.createGain();
      mainOsc.connect(mainGain);
      mainGain.connect(audioContext.destination);
      mainOsc.type = 'sine';
      mainOsc.frequency.setValueAtTime(80, audioContext.currentTime);
      mainOsc.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.3);
      mainGain.gain.setValueAtTime(0.4, audioContext.currentTime);
      mainGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      mainOsc.start(audioContext.currentTime);
      mainOsc.stop(audioContext.currentTime + 0.4);

      const crackOsc = audioContext.createOscillator();
      const crackGain = audioContext.createGain();
      crackOsc.connect(crackGain);
      crackGain.connect(audioContext.destination);
      crackOsc.type = 'sawtooth';
      crackOsc.frequency.setValueAtTime(2000, audioContext.currentTime);
      crackOsc.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
      crackGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      crackGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      crackOsc.start(audioContext.currentTime);
      crackOsc.stop(audioContext.currentTime + 0.15);
      
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
    setTimeout(() => setShotFired(false), 1000);
  };

  return (
    <div className="antialiased" onMouseMove={handleMouseMove}>
      <div 
        className="sniper-scope fixed pointer-events-none z-50"
        style={{
          left: scopePosition.x,
          top: scopePosition.y,
          transform: 'translate(-50%, -50%)',
          opacity: isTouchDevice || (scopePosition.x > -1000) ? 0.9 : 0,
          transition: 'opacity 0.2s'
        }}
      >
        <div className="w-80 h-80">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <g id="crosshair-arm">
                <line x1="100" y1="100" x2="100" y2="20" stroke="red" strokeWidth="0.5" />
                <line x1="100" y1="90" x2="104" y2="90" stroke="red" strokeWidth="0.5" />
                <line x1="100" y1="80" x2="105" y2="80" stroke="red" strokeWidth="0.75" />
                <line x1="100" y1="70" x2="104" y2="70" stroke="red" strokeWidth="0.5" />
                <line x1="100" y1="60" x2="105" y2="60" stroke="red" strokeWidth="0.75" />
              </g>
            </defs>
            <use href="#crosshair-arm" />
            <use href="#crosshair-arm" transform="rotate(90 100 100)" />
            <use href="#crosshair-arm" transform="rotate(180 100 100)" />
            <use href="#crosshair-arm" transform="rotate(270 100 100)" />
            <circle cx="100" cy="100" r="25" fill="none" stroke="red" strokeWidth="0.75" />
            <circle cx="100" cy="100" r="1" fill="red" />
          </svg>
        </div>
      </div>

      <header className="hero-bg min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {shotFired && (
          <div className="shot-effect fixed inset-0 pointer-events-none z-40">
            <div className="muzzle-flash absolute w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
        )}
        <div className="text-center" id="hero-content">
          <p className="text-lg md:text-xl font-bold tracking-widest text-red-500 mb-4 uppercase">
            TOP WANTED
          </p>
          <div className="relative inline-block">
            <Image 
              ref={photoRef}
              src="/zdjecie.jpg" 
              alt="Zdjęcie"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-red-700/50 shadow-lg cursor-crosshair transition-transform hover:scale-110"
              onClick={handlePhotoClick}
            />
            <div className="target-reticle absolute inset-0 pointer-events-none">
              <div className="w-full h-full border-2 border-red-500/50 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            KRYPTONIM: &quot;WŁADCA CISZY&quot;
          </h1>
          <p className="mt-2 max-w-3xl mx-auto text-base md:text-lg text-gray-400">
            (Znany również jako &quot;Mistrz Wibroakustyki&quot;, &quot;Profesor AI&quot; oraz &quot;Architekt&quot;)
          </p>
          <div className="mt-8 max-w-2xl mx-auto glass-effect rounded-lg p-4 border border-yellow-500/30">
            <h3 className="font-bold text-yellow-400 tracking-wider">OSTRZEŻENIE</h3>
            <p className="text-gray-300">
              Kontakt grozi eksplozją innowacji.
            </p>
          </div>
          <div className="mt-10">
            <a href="#achievements" className="btn-primary text-lg">
              Zobacz Modus Operandi
            </a>
          </div>
        </div>
      </header>

      <main className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <section id="achievements" className="mb-24">
          <h2>Modus Operandi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-effect p-6 rounded-xl achievement-card">
              <MicOff className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-xl font-bold text-white">Inwigilacja Wibroakustyczna</h3>
              <p className="text-gray-300">Prowadzenie operacji pomiarowych.</p>
            </div>
            <div className="glass-effect p-6 rounded-xl achievement-card">
              <Ghost className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-xl font-bold text-white">Planowanie Operacji Specjalnych</h3>
              <p className="text-gray-300">Infiltracja projektu i przejęcie kontroli.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
