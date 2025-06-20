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
  Music,
  Award,
  Gem,
  Flame
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
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
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
    <div className="antialiased w-full min-h-screen" onMouseMove={handleMouseMove}>
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
              <div className="flex items-center mb-3">
                <MicOff className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Inwigilacja Wibroakustyczna</h3>
              </div>
              <p className="text-gray-300">
                Prowadzenie setek tajnych operacji pomiarowych i analizy sygnałów w celu neutralizacji &quot;celów&quot; (hałasu i wibracji) w kluczowych produktach.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl achievement-card">
              <div className="flex items-center mb-3">
                <Ghost className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Planowanie Operacji Specjalnych</h3>
              </div>
              <p className="text-gray-300">
                Potwierdzona zdolność do błyskawicznej infiltracji dowolnego projektu, przejęcia nad nim pełnej kontroli i zagwarantowania jego finalizacji z bezwzględną precyzją.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl achievement-card">
              <div className="flex items-center mb-3">
                <UsersRound className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Formowanie Zorganizowanej Grupy Przestępczej</h3>
              </div>
              <p className="text-gray-300">
                Udowodniona skuteczność w wypraniu mózgów 3-osobowej komórki agentów (inżynierów), w pełni przygotowanych do prowadzenia samodzielnych operacji.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl achievement-card">
              <div className="flex items-center mb-3">
                <PackageCheck className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Wprowadzenie Znacznych Ilości do Obrotu</h3>
              </div>
              <p className="text-gray-300">
                Zarządzanie całym cyklem życia &quot;substancji&quot; - od tajnego laboratorium i kontroli jakości, po logistykę, siatkę dilerów i zdominowanie podległego &quot;terytorium&quot;.
              </p>
            </div>
          </div>
        </section>

        {/* STRATEGIE */}
        <section id="strengths" className="mb-24">
          <h2>Strategie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-effect p-6 rounded-xl strength-card">
              <div className="flex items-center mb-3">
                <ScanSearch className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Wywiad i Rozpoznanie</h3>
              </div>
              <p className="text-gray-300">
                Przechwytywanie danych z różnych źródeł, identyfikowanie słabych punktów celu i planowanie optymalnej drogi &quot;wejścia&quot;.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl strength-card">
              <div className="flex items-center mb-3">
                <Beaker className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Niestandardowe Metody</h3>
              </div>
              <p className="text-gray-300">
                Zdolność do tworzenia niekonwencjonalnych planów i narzędzi, które skutecznie omijają standardowe &quot;zabezpieczenia&quot; i procedury.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl strength-card">
              <div className="flex items-center mb-3">
                <Bot className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Broń Cyfrowa</h3>
              </div>
              <p className="text-gray-300">
                Użycie interfejsów neuronowych do przewidywania ruchów &quot;przeciwnika&quot;, automatyzacji włamań i łamania złożonych szyfrów.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl strength-card">
              <div className="flex items-center mb-3">
                <TerminalSquare className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Laboratorium Hakerskie</h3>
              </div>
              <p className="text-gray-300">
                Pisanie &quot;szkodliwego&quot; oprogramowania na zamówienie i tworzenie exploitów, które otwierają dostęp do najlepiej strzeżonych systemów.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl strength-card">
              <div className="flex items-center mb-3">
                <Swords className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Zarządzanie Załogą</h3>
              </div>
              <p className="text-gray-300">
                Utrzymywanie wysokiego morale i żelaznej dyscypliny w &quot;załodze&quot;, zapewniając, że każdy członek bezbłędnie wykonuje swoją rolę podczas &quot;akcji&quot;.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl strength-card">
              <div className="flex items-center mb-3">
                <ClipboardList className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Układanie Scenariusza</h3>
              </div>
              <p className="text-gray-300">
                Projektowanie wieloetapowych &quot;scenariuszy&quot; napadu, uwzględniających każdy możliwy ruch &quot;ochrony&quot; i wszystkie drogi ucieczki.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl strength-card">
              <div className="flex items-center mb-3">
                <LifeBuoy className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Plan B</h3>
              </div>
              <p className="text-gray-300">
                Zimna krew i zdolność do improwizacji, gdy &quot;plan&quot; zawodzi. Błyskawiczne znajdowanie wyjścia z każdej pułapki bez pozostawiania śladów.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl strength-card">
              <div className="flex items-center mb-3">
                <Gavel className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl font-bold text-white">Wydawanie Rozkazów</h3>
              </div>
              <p className="text-gray-300">
                Przejmowanie dowodzenia w kluczowych momentach operacji i wydawanie nieodwołalnych rozkazów, od których zależą losy całej misji.
              </p>
            </div>
          </div>
        </section>

        {/* AKTA OPERACYJNE */}
        <section id="experience" className="mb-24">
          <h2>Akta Operacyjne</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-700 hidden md:block timeline-line"></div>
            <div className="space-y-16">
              {/* Chery Europe */}
              <div className="timeline-item relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-12 items-start">
                <div className="md:col-start-3 md:text-left">
                  <h3 className="text-2xl font-bold text-white">NVH Expert</h3>
                  <p className="text-gray-400">Chery Europe</p>
                  <time className="text-sm text-green-400">2024 - Obecnie | Frankfurt am Main</time>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 hidden md:block ring-8 ring-gray-800 timeline-dot"></div>
                <div className="md:col-start-1 md:row-start-1 md:text-right mt-4 md:mt-0 glass-effect p-6 rounded-xl">
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-left">
                    <li>Kamuflowanie sygnatur dźwiękowych dla e-pojazdów operacyjnych na rynek UE.</li>
                    <li>Modyfikacja układów napędowych w celu minimalizacji śladu akustycznego.</li>
                    <li>Ustanawianie benchmarków i analiza konkurencji w zakresie demaskujących sygnałów wibroakustycznych.</li>
                  </ul>
                </div>
              </div>
              {/* Freelancer */}
              <div className="timeline-item relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-12 items-start">
                <div className="md:text-right">
                  <h3 className="text-2xl font-bold text-white">Freelancer</h3>
                  <p className="text-gray-400">Paweł Niedermaier.tech</p>
                  <time className="text-sm text-green-400">2020 - 2024 | Polska</time>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 hidden md:block ring-8 ring-gray-800 timeline-dot"></div>
                <div className="md:col-start-3 mt-4 md:mt-0 glass-effect p-6 rounded-xl">
                  <p className="text-gray-300 mb-3 text-left">Prowadzenie niezależnych operacji badawczo-rozwojowych, dywersyfikacja portfolio i zdobywanie wpływów w nowych sektorach.</p>
                  <div className="achievement-highlight text-left">
                    <p className="font-semibold text-white">
                      <Crown className="inline w-5 h-5 mr-1 text-green-400" />Koronna robota:
                    </p>
                    <p className="text-gray-200">Przeprowadzenie kampanii propagandowej (social media), która podniosła &quot;zaangażowanie&quot; o 360% i &quot;sprzedaż&quot; o 161%. Zabezpieczono 9 publikacji w prasie i 2 nagrania wideo.</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-700/50 space-y-4 text-left">
                    <div>
                      <h4 className="font-bold text-white">Kontrakt dla Focusly IT:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        <li>Zabezpieczenie 60 godzin &quot;kontrabandy&quot; (muzyki) dla klienta z branży IT i rozwoju.</li>
                      </ul>
                      <div className="achievement-highlight">
                        <p className="font-semibold text-white">
                          <Award className="inline w-5 h-5 mr-1 text-green-400" />Kluczowy ruch:
                        </p>
                        <p className="text-gray-200">Wdrożenie niekonwencjonalnej &quot;podsłuchującej&quot; funkcji, która przesądziła o sukcesie całej operacji.</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Kontrakt dla Instalator365 IT:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        <li>Stworzenie oprogramowania do zarządzania siatką operacyjną dla klienta z branży budowlanej.</li>
                      </ul>
                      <div className="achievement-highlight">
                        <p className="font-semibold text-white">
                          <Gem className="inline w-5 h-5 mr-1 text-green-400" />Majstersztyk:
                        </p>
                        <p className="text-gray-200">Zwerbowanie 3 kluczowych partnerów, co umożliwiło pomyślne wdrożenie pilotażowe.</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Kontrakt dla Tandig IT:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        <li>Przejęcie i rozwój platformy opartej na Neo4J do zarządzania &quot;haraczami&quot; w branży muzycznej.</li>
                      </ul>
                      <div className="achievement-highlight">
                        <p className="font-semibold text-white">
                          <Award className="inline w-5 h-5 mr-1 text-green-400" />Kluczowy ruch:
                        </p>
                        <p className="text-gray-200">Stworzenie algorytmów automatyzujących pobieranie opłat, co przyniosło znaczne oszczędności czasu.</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Kontrakt dla Inalfa Roof Systems:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        <li>Przeprowadzenie dogłębnej inwigilacji procesów produkcyjnych, linii montażowych i oprogramowania w celu zidentyfikowania słabych punktów.</li>
                      </ul>
                      <div className="achievement-highlight">
                        <p className="font-semibold text-white"><Flame className="inline w-5 h-5 mr-1 text-green-400" />Klasyk:</p>
                        <p className="text-gray-200">Zredukowano &quot;straty&quot; z 5% do zera poprzez manipulację czułością sensorów, nie pozostawiając żadnych śladów.</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Kontrakt dla Aquarius Engines:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        <li>Zbudowanie od podstaw tajnego laboratorium i wdrożenie procesów operacyjnych NVH.</li>
                      </ul>
                      <div className="achievement-highlight">
                        <p className="font-semibold text-white"><Gem className="inline w-5 h-5 mr-1 text-green-400" />Majstersztyk:</p>
                        <p className="text-gray-200">Opracowano specjalne &quot;procedury przesłuchań&quot; (testy wytrzymałościowe) weryfikujące minimalną jakość i żywotność &quot;obiektu&quot;.</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Kontrakt dla IzziFast:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        <li>Namierzenie i neutralizacja źródeł demaskującego hałasu w pompach ciepła.</li>
                      </ul>
                      <div className="achievement-highlight">
                        <p className="font-semibold text-white"><Flame className="inline w-5 h-5 mr-1 text-green-400" />Klasyk:</p>
                        <p className="text-gray-200">Skutecznie &quot;wyciszono&quot; pompę ciepła R290, redukując jej sygnaturę dźwiękową o 3.3 dBA, co pozwoliło na jej dyskretne działanie w tle.</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Kontrakt dla Immergas:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        <li>Zorganizowanie &quot;przemytu&quot; specjalistycznego sprzętu do testów akustycznych w celu wzmocnienia zdolności operacyjnych.</li>
                      </ul>
                      <div className="achievement-highlight">
                        <p className="font-semibold text-white"><Flame className="inline w-5 h-5 mr-1 text-green-400" />Klasyk:</p>
                        <p className="text-gray-200">Wdrożono standardowy &quot;protokół uciszania świadków&quot; (procedurę obsługi reklamacji), gwarantujący szybkie i skuteczne rozwiązywanie problemów z &quot;hałasem&quot; od agentów.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* BorgWarner */}
              <div className="timeline-item relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-12 items-start">
                <div className="md:col-start-3 md:text-left">
                  <h3 className="text-2xl font-bold text-white">NVH Engineer</h3>
                  <p className="text-gray-400">BorgWarner Poland Sp. z o.o.</p>
                  <time className="text-sm text-green-400">2012 - 2019 | Rzeszów Technical Center</time>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 hidden md:block ring-8 ring-gray-800 timeline-dot"></div>
                <div className="md:col-start-1 md:row-start-1 md:text-right mt-4 md:mt-0 glass-effect p-6 rounded-xl">
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-left">
                    <li>Stworzenie od zera i rozbudowa elitarnej komórki NVH.</li>
                    <li>Zarządzanie &quot;aktywami&quot; projektu o wartości 1,2mln € oraz rocznym &quot;funduszem operacyjnym&quot; 200k €.</li>
                    <li>Globalna koordynacaja działań wywiadowczych.</li>
                    <li>Przeprowadzenie 111 turbo operacji w terenie dla różnych syndykatów (OEM).</li>
                  </ul>
                  <div className="achievement-highlight text-left">
                    <p className="font-semibold text-white">
                      <Crown className="inline w-5 h-5 mr-1 text-green-400" />Koronna robota:
                    </p>
                    <p className="text-gray-200">Opracowanie epickiego &quot;przekrętu&quot;, który skrócił czas testu turbo robotów z 28 do 8 dni (zysk: 90k € na operacji).</p>
                  </div>
                  <div className="achievement-highlight text-left">
                    <p className="font-semibold text-white">
                      <Gem className="inline w-5 h-5 mr-1 text-green-400" />Majstersztyk:
                    </p>
                    <p className="text-gray-200">Opracowanie metody ochrony turbo prototypów (oszczędność 12k € na jednostce).</p>
                  </div>
                </div>
              </div>
              {/* Nidec */}
              <div className="timeline-item relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-12 items-start">
                <div className="md:col-start-1 md:text-right">
                  <h3 className="text-2xl font-bold text-white">Acoustic Engineer</h3>
                  <p className="text-gray-400">Nidec Motors and Actuators Sp. z o.o.</p>
                  <time className="text-sm text-green-400">2010 - 2012 | Niepołomice</time>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 hidden md:block ring-8 ring-gray-800 timeline-dot"></div>
                <div className="md:col-start-3 mt-4 md:mt-0 glass-effect p-6 rounded-xl">
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Kontrola &quot;śladu akustycznego&quot; dla silników elektrycznych na 12 liniach produkcyjnych.</li>
                    <li>Koncepcja i nadzór nad budową bunkra bezechowego (tzw. &quot;cichego pokoju&quot;).</li>
                    <li>Wsparcie techniczne dla oddziałów specjalnych Nidec w Chinach i Meksyku.</li>
                  </ul>
                  <div className="achievement-highlight">
                    <p className="font-semibold text-white">
                      <Crown className="inline w-5 h-5 mr-1 text-green-400" />Koronna robota:
                    </p>
                    <p className="text-gray-200">Przeprowadzenie reorganizacji, która wyciszyła &quot;gorący towar&quot; dla klienta Ferrari, eliminując reklamacje i redukując &quot;straty&quot; z 8% do 1%.</p>
                  </div>
                </div>
              </div>
              {/* Arcadis */}
              <div className="timeline-item relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-12 items-start">
                <div className="md:col-start-3 md:text-left">
                  <h3 className="text-2xl font-bold text-white">Acoustics Assistant</h3>
                  <p className="text-gray-400">Arcadis Sp. z o.o.</p>
                  <time className="text-sm text-green-400">2009 - 2010 | Warszawa</time>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 hidden md:block ring-8 ring-gray-800 timeline-dot"></div>
                <div className="md:col-start-1 md:row-start-1 md:text-right mt-4 md:mt-0 glass-effect p-6 rounded-xl">
                  <p className="text-gray-300 mb-3 text-left">Tworzenie tajnych map akustycznych i projektowanie &quot;barier ochronnych&quot; dla ponad 380 km infrastruktury (drogowej, kolejowej).</p>
                  <div className="achievement-highlight text-left">
                    <p className="font-semibold text-white">
                      <Flame className="inline w-5 h-5 mr-1 text-green-400" />Klasyk:
                    </p>
                    <p className="text-gray-200">Stworzenie i wdrożenie cyfrowego &quot;wytrychu&quot; (oprogramowania), który zautomatyzował proces projektowania i skrócił czas operacji o 300%.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARSENAŁ */}
        <section id="skills" className="mb-24">
          <h2>Arsenał</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 text-center skills-title">Artefakty</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="tag">AI</span>
                <span className="tag">Siemens Testlab</span>
                <span className="tag">Head Acoustics</span>
                <span className="tag">Jira</span>
                <span className="tag">SoundPLAN</span>
                <span className="tag">Neo4j</span>
                <span className="tag">Dewesoft</span>
                <span className="tag">Office</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4 text-center skills-title">Zdolności Taktyczne</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="tag">Planowanie</span>
                <span className="tag">Manipulacja i Perswazja</span>
                <span className="tag">Zarządzanie Pionkami</span>
                <span className="tag">Negocjacje</span>
                <span className="tag">Profilowanie Psychologiczne</span>
                <span className="tag">Budowanie Sojuszy</span>
                <span className="tag">Koordynacja</span>
                <span className="tag">Organizacja</span>
                <span className="tag">Logistyka</span>
                <span className="tag">Networking</span>
                <span className="tag">Realizacja</span>
              </div>
            </div>
          </div>
          <div className="mt-12" id="languages">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Systemy Komunikacji</h3>
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="language-item">
                <p className="font-semibold">Polski <span className="text-gray-400 font-normal">- Szyfr rodzimy (poziom mistrzowski)</span></p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                  <div className="bg-green-500 h-2.5 rounded-full language-bar" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div className="language-item">
                <p className="font-semibold">Angielski <span className="text-gray-400 font-normal">- Kod międzynarodowy (poziom techniczny)</span></p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                  <div className="bg-green-500 h-2.5 rounded-full language-bar" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="language-item">
                <p className="font-semibold">Niemiecki <span className="text-gray-400 font-normal">- Szyfr zachodniego sąsiada (poziom podstawowy)</span></p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                  <div className="bg-green-500 h-2.5 rounded-full language-bar" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OŚRODKI SZKOLENIOWE */}
        <section id="education" className="mb-24">
          <h2>Ośrodki Szkoleniowe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-effect p-6 rounded-xl education-card">
              <h3 className="text-xl font-bold text-white mb-4">Placówki Naukowe</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-green-400">Ośrodek szkoleniowy krypt. 'UJ' (2008-2010)</p>
                  <p className="text-gray-300">Specjalizacja: Inżynieria Oprogramowania, Narzędzia Dywersyjne.</p>
                </div>
                <div>
                  <p className="font-semibold text-green-400">Główna akademia syndykatu, krypt. 'AGH' (2002-2007)</p>
                  <p className="text-gray-300">Główna specjalizacja: Wibroakustyka i Inżynieria Dźwięku (kierunek Mechanika i Budowa Robotów).</p>
                </div>
              </div>
            </div>
            <div className="glass-effect p-6 rounded-xl education-card">
              <h3 className="text-xl font-bold text-white mb-4">Wyszkolenie</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><b>Inżynieria Umysłów Syntetycznych:</b> 8 tygodni / 2 kursy</li>
                <li><b>Techniki Niekonwencjonalne:</b> 7 dni / 3 kursy / 1 akcelerator</li>
                <li><b>Informatyka Śledcza:</b> 14 dni / 2 kursy</li>
                <li><b>Techniki Przesłuchań:</b> 8 dni / 3 kursy</li>
                <li><b>Techniki Perswazji i Manipulacji:</b> 17 dni / 7 kursów</li>
                <li><b>Wiedza o Przemyśle Motoryzacyjnym:</b> 35 dni / 4 kursy</li>
                <li><b>Ćwiczenia w Terenie:</b> BorgWarner Niemcy (6 m-cy), Nidec Niemcy (1 m-c)</li>
                <li><b>Międzynarodowe Zjazdy Syndykatu:</b> 10 dni</li>
                <li><b>Instruktor i Propagandysta:</b> 15 przeprowadzonych szkoleń + 6 prezentacji dla 550 słuchaczy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* REFERENCJE, BIOS, STOPKA */}
        <footer className="bg-gray-900 pt-16 pb-8 px-4" id="references">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-8">Referencje</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-effect p-8 rounded-xl text-center flex flex-col items-center footer-item">
                <div className="mb-4">
                  <Linkedin className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Oficjalne Akta</h3>
                <p className="text-6xl font-black text-green-400">6</p>
                <p className="text-gray-300 mt-2">jawnych rekomendacji w aktach<br />profilu LinkedIn.</p>
                <a href="https://www.linkedin.com/in/pawelniedermaier" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
                  Zobacz Akta
                </a>
              </div>
              <div className="glass-effect p-8 rounded-xl text-center flex flex-col items-center footer-item">
                <div className="mb-4">
                  <Lock className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Poufne Źródła</h3>
                <p className="text-6xl font-black text-white">4</p>
                <p className="text-gray-300 mt-2">dodatkowe, poufne kontakty<br />dostępne na życzenie.</p>
                <p className="text-sm text-yellow-400 mt-6 bg-yellow-400/10 px-3 py-1 rounded-full">
                  Dostęp po weryfikacji
                </p>
              </div>
            </div>

            <div className="mt-24">
              <h3 className="text-2xl font-bold text-white mb-6 text-center footer-item">Dane Kontrwywiadowcze</h3>
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-gray-300 mb-8">
                <a href="https://inzynierwibroakustyki.pl" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors footer-item">
                  <span className="flex items-center">
                    <Vibrate className="w-5 h-5 mr-2 text-green-400" />inzynierwibroakustyki.pl
                  </span>
                </a>
                <a href="https://nvhengineer.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors footer-item">
                  <span className="flex items-center">
                    <Car className="w-5 h-5 mr-2 text-green-400" />nvhengineer.com
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center footer-item">BIOS</h3>
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-gray-300 mb-8">
                <span className="flex items-center footer-item"><MountainSnow className="w-5 h-5 mr-2 text-green-400" />Góry</span>
                <span className="flex items-center footer-item"><Snowflake className="w-5 h-5 mr-2 text-green-400" />Skitouring</span>
                <span className="flex items-center footer-item"><Bike className="w-5 h-5 mr-2 text-green-400" />MTB</span>
                <span className="flex items-center footer-item"><Trees className="w-5 h-5 mr-2 text-green-400" />Las</span>
                <span className="flex items-center footer-item"><Cpu className="w-5 h-5 mr-2 text-green-400" />Technologie</span>
                <span className="flex items-center footer-item"><Wind className="w-5 h-5 mr-2 text-green-400" />Qi Gong</span>
                <span className="flex items-center footer-item"><Brain className="w-5 h-5 mr-2 text-green-400" />Samorozwój</span>
                <span className="flex items-center footer-item"><CircleDot className="w-5 h-5 mr-2 text-green-400" />Medytacja</span>
                <span className="flex items-center footer-item"><Music className="w-5 h-5 mr-2 text-green-400" />Muzyka Elektroniczna</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-12 max-w-3xl mx-auto text-center footer-item">
              Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w mojej ofercie pracy dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z art. 6 ust. 1 lit. a Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych). Wyrażam również zgodę na przetwarzanie moich danych osobowych na potrzeby przyszłych procesów rekrutacyjnych.
            </p>
            <p className="text-sm text-gray-500 mt-4 text-center footer-item">© 2025 Paweł Niedermaier.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
