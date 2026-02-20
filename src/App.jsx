import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  BookOpen, 
  Users, 
  Sun, 
  HelpCircle,
  Trophy,
  CheckCircle2,
  XCircle,
  PenTool,
  Sparkles,
  Quote,
  Smile,
  HandHeart,
  MessageCircle,
  Star,
  MapPin
} from 'lucide-react';

import SamariaStory from './components/slides/SamariaStory';
import WelcomeScreen from './components/WelcomeScreen';
import ThankYouScreen from './components/ThankYouScreen';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(null);
  const [quizScores, setQuizScores] = useState({});
  const [quizFeedback, setQuizFeedback] = useState({});
  const [reflection, setReflection] = useState("");
  const [isReflectionSaved, setIsReflectionSaved] = useState(false);

  // Helper for slide transitions
  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const slides = [
    // Slide 1: Judul
    {
      id: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="p-8 glass-card mb-8"
            style={{ borderRadius: '50%', background: 'rgba(255, 42, 109, 0.1)' }}
          >
            <Heart className="w-24 h-24 text-pink-500 animate-pulse" style={{ color: 'var(--primary)', fill: 'rgba(255, 42, 109, 0.2)' }} />
          </motion.div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textShadow: '0 0 20px var(--primary)' }}>Petualangan Kasih</h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.9, marginBottom: '2rem' }}>Belajar Menjadi Saluran Berkat</p>
          <div className="glass-card p-6" style={{ maxWidth: '500px', textAlign: 'left' }}>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--secondary)' }}>Tujuan Pembelajaran:</h3>
            <ul className="space-y-3">
              {["Memahami arti kasih (1 Korintus 13)", "Mengidentifikasi bentuk kasih sehari-hari", "Berkomitmen mempraktikkan kasih"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    // Slide 2: Konsep 1 (Apa Itu Kasih?)
    {
      id: 'concept-1',
      content: (
        <div className="p-8 h-full flex flex-col">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen color="var(--primary)" /> Apa Itu Kasih?
          </h2>
          <div className="grid grid-cols-2 gap-8 items-center h-full">
            <div className="flex flex-col gap-6">
              <div className="glass-card p-6" style={{ borderLeft: '8px solid var(--primary)' }}>
                <p className="text-lg italic" style={{ lineHeight: '1.6' }}>
                  "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu..."
                </p>
                <p className="font-bold mt-2" style={{ color: 'var(--secondary)' }}>— 1 Korintus 13:4</p>
              </div>
              <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                Halo anak-anak hebat! Kasih bukan cuma perasaan di hati saja, lho. 
                Dalam Alkitab, ada tindakan <span className="font-bold" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>KASIH</span>—yang tulus tanpa mengharapkan imbalan.
              </p>
              <div className="flex flex-col gap-4">
                <div className="glass-card p-4 flex items-center gap-4">
                  <Sun color="var(--accent)" />
                  <span>Kasih adalah <span className="font-bold">Kata Kerja</span> (tindakan nyata)</span>
                </div>
                <div className="glass-card p-4 flex items-center gap-4">
                  <Heart color="var(--primary)" />
                  <span>Kita mengasihi karena Allah lebih dulu mengasihi kita</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 h-full">
              <div className="glass-card flex-1 flex items-center justify-center p-2" style={{ background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <img 
                  src="/images/yesus-sumber-kasih.jpg" 
                  alt="Yesus Memberkati Anak-anak" 
                  className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="glass-card flex-1 flex items-center justify-center p-2" style={{ background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <img 
                  src="/images/yesus-sumber-kasih-2.jpg" 
                  alt="Gambar Kedua" 
                  className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 3: Konsep 2 (Mengasihi Siapa Saja?)
    {
      id: 'concept-2',
      content: (
        <div className="p-8 h-full">
          <h2 className="text-3xl font-bold mb-10 text-center">Mengasihi Siapa Saja?</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: "Kepada Tuhan", desc: "Berdoa, ibadah, dan taat firman-Nya.", icon: <Sun size={40} color="var(--accent)" /> },
              { title: "Diri Sendiri", desc: "Menjaga tubuh (Bait Allah) & bersyukur.", icon: <Heart size={40} color="var(--primary)" /> },
              { title: "Kepada Sesama", desc: "Keluarga, teman, guru, bahkan musuh!", icon: <Users size={40} color="var(--secondary)" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => {
                  if (item.title === "Kepada Tuhan") {
                    setShowPopup(1);
                  } else if (item.title === "Diri Sendiri") {
                    setShowPopup(2);
                  } else if (item.title === "Kepada Sesama") {
                    setShowPopup(3);
                  }
                }}
                className={`glass-card p-6 flex flex-col items-center text-center transition-all cursor-pointer hover:border-accent ring-accent/30 hover:ring-4`}
                style={{ height: '240px', justifyContent: 'center' }}
              >
                <div className="mb-6 p-4 pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 pointer-events-none">{item.title}</h3>
                <p className="pointer-events-none" style={{ opacity: 0.8, lineHeight: '1.5' }}>{item.desc}</p>
                {item.title === "Kepada Tuhan" && (
                  <div className="mt-4 text-accent text-sm font-bold animate-pulse pointer-events-none">
                    Klik untuk melihat! ✨
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 4: Interaktif Hotspot
    {
      id: 'interactive',
      content: (
        <div className="p-8 h-full flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Heart color="var(--primary)" fill="var(--primary)" /> Klik 5 Ikon Love Untuk Temukan Kasih!
          </h2>
          <p className="mb-12 opacity-80 italic text-lg text-center">Setiap ikon menyimpan rahasia bagaimana kamu bisa menemukan kasih hari ini...</p>
          
          <div className="flex justify-center items-center gap-12 flex-1">
            {[4, 5, 6, 7, 8].map((id, index) => (
              <motion.button 
                key={id}
                whileHover={{ scale: 1.2, rotate: 10 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                onClick={() => setShowPopup(id)}
                className="p-8 rounded-full shadow-[0_0_30px_rgba(255,42,109,0.3)] cursor-pointer bg-primary/20 border-4 border-primary hover:bg-primary/40 transition-all"
              >
                <Heart className="text-primary" fill="var(--primary)" size={48} />
              </motion.button>
            ))}
          </div>
        </div>
      )
    },
    // Slide 5: Studi Kasus (Samaria) — rendered directly via currentSlide === 4 check
    {
      id: 'case-study',
      content: null,
    },
    // Slide 6: Kuis
    {
      id: 'quiz',
      content: (
        <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Trophy color="var(--accent)" /> Cek Pemahamanmu!
          </h2>
          <div className="space-y-4">
            {[
              { 
                q: "Kasihilah TUHAN, Allahmu, dengan segenap hatimu dan dengan segenap jiwamu dan dengan segenap kekuatanmu, terdapat di kitab...", 
                a: ["Ulangan 5:6", "Ulangan 6:5"], 
                correct: 1 
              },
              { 
                q: "Tahukah kamu bahwa, tubuhmu adalah bait Allah yang diam di dalam kamu, terdapat di kitab...", 
                a: ["1 Korintus 19:6", "1 Korintus 6:19"], 
                correct: 1 
              },
              { 
                q: "terdapat di kitab manakah, perkataan Tuhan Yesus tentang Tetapi 'Aku berkata kepadamu: Kasihilah musuhmu dan berdoalah bagi mereka...", 
                a: ["Matius 5:44", "Matius 15:24"], 
                correct: 0 
              }
            ].map((quiz, qIdx) => (
              <div key={qIdx} className="glass-card p-6">
                <p className="font-bold text-lg mb-4">{qIdx + 1}. {quiz.q}</p>
                <div className="grid grid-cols-2 gap-4">
                  {quiz.a.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const isCorrect = oIdx === quiz.correct;
                        setQuizScores({ ...quizScores, [qIdx]: isCorrect });
                        setQuizFeedback({ ...quizFeedback, [qIdx]: isCorrect ? "Benar! Hebat!" : "Coba lagi, ya!" });
                      }}
                      className="p-4 rounded-xl text-left border cursor-pointer transition-all"
                      style={{
                        background: quizScores[qIdx] !== undefined && oIdx === quiz.correct 
                          ? 'rgba(0, 255, 128, 0.2)' 
                          : quizScores[qIdx] === false && oIdx !== quiz.correct && quizScores[qIdx] !== undefined
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.1)',
                        borderColor: quizScores[qIdx] !== undefined && oIdx === quiz.correct 
                          ? '#00ff80' 
                          : 'transparent'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {quizFeedback[qIdx] && (
                  <p className="mt-3 font-bold flex items-center gap-2" style={{ color: quizScores[qIdx] ? '#00ff80' : '#ff2a6d' }}>
                    {quizScores[qIdx] ? <CheckCircle2 size={18}/> : <XCircle size={18}/>}
                    {quizFeedback[qIdx]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 7: Misi & Refleksi
    {
      id: 'reflection',
      content: (
        <div className="p-8 h-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <PenTool color="var(--primary)" /> Misi Kasihku
          </h2>
          <div className="w-full max-w-2xl glass-card p-8 relative">
            <div className="absolute -top-6 -right-6 p-3 rounded-full rotate-12" style={{ background: 'var(--accent)' }}>
              <Sparkles className="text-black" />
            </div>
            <p className="mb-6 font-medium text-lg">
              Tuhan Yesus ingin kamu menjadi saluran kasih. Apa <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>satu tindakan kasih</span> yang akan kamu lakukan hari ini?
            </p>
            <textarea
              value={reflection}
              onChange={(e) => {
                setReflection(e.target.value);
                setIsReflectionSaved(false);
              }}
              placeholder="Tuliskan komitmenmu di sini... (Contoh: Aku ingin menolong ibu mencuci piring)"
              className="w-full h-40 p-5 rounded-2xl outline-none transition-all resize-none mb-6"
              style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid var(--glass-border)', color: 'white', fontSize: '1.1rem' }}
            />
            <button
              onClick={() => {
                if (reflection.trim()) setIsReflectionSaved(true);
              }}
              className="btn-primary w-full justify-center"
              style={{ opacity: isReflectionSaved ? 0.8 : 1 }}
            >
              {isReflectionSaved ? <><CheckCircle2 /> Tersimpan!</> : 'Simpan Komitmen'}
            </button>
          </div>
          {isReflectionSaved && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-8 font-bold text-center text-xl" style={{ color: 'var(--accent)' }}>
              Luar biasa! Tekan Lanjut untuk melihat rangkuman.
            </motion.div>
          )}
        </div>
      )
    },
    // Slide 8: Rangkuman
    {
      id: 'summary',
      content: (
        <div className="p-8 h-full flex flex-col overflow-y-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--accent)' }}>Rangkuman Kasih</h2>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="glass-card p-6 relative">
              <Quote className="absolute top-4 right-6 opacity-20 w-12 h-12" />
              <h3 className="font-bold text-xl mb-3 flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                <BookOpen size={24}/> 1 Korintus 13:4-7
              </h3>
              <p className="leading-loose italic opacity-90">
                "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia tidak melakukan yang tidak sopan dan tidak mencari keuntungan diri sendiri. Ia tidak pemarah dan tidak menyimpan kesalahan orang lain..."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: 'var(--secondary)' }}>
                  <Trophy size={20}/> Ingat Ini:
                </h3>
                <ul className="space-y-2 opacity-80">
                  <li>• Kasih adalah identitas kita.</li>
                  <li>• Yesus adalah teladan kita.</li>
                  <li>• Kasih adalah tindakan nyata.</li>
                </ul>
              </div>
              <div className="glass-card p-6" style={{ background: 'rgba(255, 42, 109, 0.2)', border: '2px solid var(--primary)' }}>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Sun size={20}/> Komitmen Kamu:
                </h3>
                <p className="italic font-medium text-lg">
                  "{reflection || "Lakukan kebaikan rahasia!"}"
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-auto text-center pb-4">
            <p className="text-2xl font-bold drop-shadow-lg mb-2" style={{ color: 'var(--primary)' }}>KARENA ALLAH ADALAH KASIH</p>
            <p className="text-sm opacity-60">Sampai jumpa di petualangan berikutnya!</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const Navigation = ({ className = "" }) => (
    <div className={`flex justify-between items-center bg-black/10 backdrop-blur-md ${className || 'p-6'}`}>
      <button 
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
          currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'
        }`}
      >
        <ChevronLeft size={24} /> Kembali
      </button>
      
      <div className="font-bold text-lg opacity-60">
        {currentSlide + 1} / {slides.length}
      </div>

      <button 
        onClick={currentSlide === slides.length - 1 ? () => setShowThankYou(true) : nextSlide}
        className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all shadow-lg btn-primary ${
          currentSlide === slides.length - 1 ? 'hover:scale-105' : ''
        }`}
      >
        {currentSlide === slides.length - 1 ? 'Selesai' : 'Lanjut'} <ChevronRight size={24} />
      </button>
    </div>
  );

  return (
    <>
      {showThankYou && (
        <ThankYouScreen onRestart={() => {
          setShowThankYou(false);
          setCurrentSlide(0);
          setShowWelcome(true);
        }} />
      )}
      {showWelcome && <WelcomeScreen onEnter={() => setShowWelcome(false)} />}
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0a050a] p-4 overflow-auto">
        <div className="relative flex flex-col p-0 overflow-hidden shadow-2xl" style={{ width: '1024px', height: '733px' }}>
          <div className="bg-blobs">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>

          <div className="slide-content glass-card relative w-full h-full flex flex-col p-0 overflow-hidden" style={{ borderRadius: '0px' }}>
            {/* Slide Window */}
            <div className={`flex-1 overflow-hidden relative ${currentSlide === 4 ? 'p-0' : 'p-4'}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="h-full w-full"
                >
                  {currentSlide === 4 ? (
                    <SamariaStory onPrev={prevSlide} onNext={nextSlide} currentSlide={currentSlide} totalSlides={slides.length} />
                  ) : (
                    slides[currentSlide].content
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Wrapper */}
            {currentSlide !== 4 && <Navigation className="border-t border-white/10" />}
          </div>
        </div>
      </div>
      
      {showPopup && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => setShowPopup(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card flex flex-col w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-[0_0_100px_rgba(255,42,109,0.3)] border-2 border-[var(--primary)]" 
            style={{ background: 'rgba(30, 15, 30, 0.98)', borderRadius: '40px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 pb-2 flex justify-between items-center border-b border-white/10">
              <h3 className="text-xl font-bold flex items-center gap-3" style={{ color: 'var(--primary)', textShadow: '0 0 10px var(--primary)' }}>
                <Star fill="var(--primary)" size={24} />
                {showPopup === 1 ? "Bukti Mengasihi-Nya" : 
                 showPopup === 2 ? "Kasih Diri Sendiri" : 
                 showPopup === 3 ? "Kasih Sesama" : 
                 "Temukan Kasih!"}
              </h3>
              <button 
                onClick={() => setShowPopup(null)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <XCircle size={28} className="text-white/40 hover:text-white" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {showPopup === 1 && (
                <div className="space-y-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <img src="/images/bukti-kasih-tuhan-1.jpg" alt="Proof 1" className="w-full h-auto rounded-2xl border-2 border-white/10" />
                    <img src="/images/bukti-kasih-tuhan-2.jpg" alt="Proof 2" className="w-full h-auto rounded-2xl border-2 border-white/10" />
                  </div>
                  <div className="p-4 glass-card bg-white/5 border-none">
                    <p className="text-lg italic opacity-90">"Kasih kepada Tuhan diwujudkan melalui ketaatan dan ibadah yang tulus."</p>
                  </div>
                </div>
              )}
              {showPopup === 2 && (
                <div className="space-y-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <img src="/images/kasih-diri-sendiri-1.jpg" alt="Hati yang Bersyukur" className="w-full h-auto rounded-2xl border-2 border-white/10" />
                    <img src="/images/kasih-diri-sendiri-2.jpg" alt="Tubuh sebagai Bait Allah" className="w-full h-auto rounded-2xl border-2 border-white/10" />
                  </div>
                  <div className="p-4 glass-card bg-white/5 border-none">
                    <p className="text-lg italic opacity-90">"Mengasihi diri sendiri berarti menjaga tubuh sebagai Bait Allah dan selalu memiliki hati yang bersyukur."</p>
                  </div>
                </div>
              )}
              {showPopup === 3 && (
                <div className="space-y-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <img src="/images/kasih-sesama-1.jpg" alt="Kasih Sesama 1" className="w-full h-auto rounded-2xl border-2 border-white/10" />
                    <img src="/images/kasih-sesama-2.jpg" alt="Kasih Sesama 2" className="w-full h-auto rounded-2xl border-2 border-white/10" />
                  </div>
                  <div className="p-4 glass-card bg-white/5 border-none">
                    <p className="text-lg italic opacity-90">"Mengasihi sesama berarti peduli, berbagi, dan menolong siapa saja yang membutuhkan dengan hati yang tulus."</p>
                  </div>
                </div>
              )}
              {showPopup >= 4 && showPopup <= 8 && (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-8 p-10">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="p-6 rounded-full bg-primary/10 border-2 border-primary"
                  >
                    <Heart size={64} fill="var(--primary)" className="text-primary" />
                  </motion.div>
                  <p className="text-3xl font-bold leading-relaxed text-white">
                    {showPopup === 4 && "Di Rumah: Bagaimana kamu menunjukkan kasih kepada orang tuamu hari ini?"}
                    {showPopup === 5 && "Di Sekolah: Apa yang bisa kamu lakukan jika melihat teman yang sedang sedih?"}
                    {showPopup === 6 && "Saat Bermain: Bagaimana sikap kasih saat kamu kalah dalam permainan?"}
                    {showPopup === 7 && "Terhadap Guru: Mengapa kita harus menghormati dan mendengarkan nasihat guru?"}
                    {showPopup === 8 && "Untuk Diri Sendiri: Mengapa bersyukur setiap pagi adalah bentuk kasih pada diri sendiri?"}
                  </p>
                  <div className="p-6 glass-card border-none bg-white/5 max-w-2xl w-full">
                    <p className="text-xl italic text-accent">
                      {showPopup === 4 && "Kasih dimulai dari hal kecil di rumah, seperti membantu atau mendengarkan nasihat."}
                      {showPopup === 5 && "Menghibur teman adalah wujud nyata kasih AGAPE yang tidak mementingkan diri sendiri."}
                      {showPopup === 6 && "Tetap rendah hati dan menghargai teman adalah tanda hati yang penuh kasih."}
                      {showPopup === 7 && "Guru adalah wakil Tuhan di sekolah yang membimbing kita menjadi anak yang bijak."}
                      {showPopup === 8 && "Mencintai dirimu sendiri berarti menghargai ciptaan Tuhan yang paling berharga: Kamu!"}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 pt-2 border-t border-white/10">
              <button 
                onClick={() => setShowPopup(null)}
                className="btn-primary w-full justify-center text-lg py-3 rounded-xl font-bold shadow-lg shadow-pink-500/20"
              >
                Aku Mau Melakukan Ini! ✨
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default App;
