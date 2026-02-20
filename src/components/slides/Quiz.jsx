import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const questions = [
  {
    q: "Apa arti dari kasih 'Agape'?",
    answer: "Kasih tulus tanpa balasan",
    placeholder: "Ketik jawabanmu di sini..."
  },
  {
    q: "Siapakah yang menjadi teladan kasih yang sempurna bagi kita?",
    answer: "Tuhan Yesus",
    placeholder: "Nama teladan kita..."
  },
  {
    q: "Menurut 1 Korintus 13:4, kasih itu sabar dan murah...?",
    answer: "Hati",
    placeholder: "Lanjutkan kalimatnya..."
  },
  {
    q: "Ayat Alkitab yang mengatakan 'Allah adalah Kasih' terdapat di 1 Yohanes 4 ayat...?",
    answer: "8",
    placeholder: "Tuliskan angkanya..."
  },
  {
    q: "Kepada siapakah kita harus menunjukkan kasih?",
    answer: "Semua orang",
    placeholder: "Siapa saja yang harus kita kasihi?"
  }
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isAnswered || !userInput.trim()) return;

    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedAnswer = questions[currentQ].answer.toLowerCase();
    
    // Simple fuzzy matching or exact match
    const correct = normalizedInput === normalizedAnswer || 
                    (normalizedAnswer.length > 3 && normalizedInput.includes(normalizedAnswer)) ||
                    (normalizedInput.length > 3 && normalizedAnswer.includes(normalizedInput));

    setIsAnswered(true);
    setFeedback(correct ? 'correct' : 'incorrect');
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setUserInput("");
        setIsAnswered(false);
        setFeedback(null);
      } else {
        setShowResult(true);
        if (score + (correct ? 1 : 0) >= 4) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff6b6b', '#4ecdc4', '#ffe66d']
          });
        }
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setUserInput("");
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    setFeedback(null);
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="h-full flex flex-col items-center justify-center text-center p-8"
      >
        <div className="p-12 glass-card mb-8" style={{ background: 'rgba(255, 230, 109, 0.1)', borderRadius: '50px' }}>
          <Trophy size={120} color="var(--accent)" style={{ filter: 'drop-shadow(0 0 30px var(--accent))' }} />
        </div>
        <h2 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Selesai!</h2>
        <p style={{ fontSize: '2.5rem', marginBottom: '2.5rem', fontWeight: 800 }}>Skor Kamu: <span style={{ color: 'var(--secondary)' }}>{score}</span> / {questions.length}</p>
        <button className="btn-primary" onClick={resetQuiz} style={{ fontSize: '1.5rem' }}>
          <RotateCcw size={28} /> Ulangi Kuis
        </button>
      </motion.div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 style={{ fontSize: '2.2rem' }}>Uji Pemahamanmu</h2>
        <div className="glass-card px-6 py-3 flex items-center gap-3" style={{ borderRadius: '20px' }}>
          <CheckCircle size={24} color="var(--secondary)" />
          <span style={{ fontWeight: 800, fontSize: '1.4rem' }}>{score}</span>
        </div>
      </div>
      
      <div style={{ marginBottom: '3rem' }}>
        <div className="flex justify-between mb-3" style={{ fontSize: '1rem', opacity: 0.7, fontWeight: 700 }}>
          <span>Pertanyaan {currentQ + 1} dari {questions.length}</span>
          <span>{Math.round(((currentQ) / questions.length) * 100)}% Selesai</span>
        </div>
        <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <motion.div 
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="w-full max-w-2xl mx-auto"
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '3rem', fontWeight: 700, lineHeight: '1.4', textAlign: 'center' }}>
              {questions[currentQ].q}
            </h3>
            
            <form onSubmit={handleSubmit} className="relative">
              <input 
                type="text"
                className="answer-input"
                style={{ fontSize: '1.3rem', padding: '1.5rem 2.5rem' }}
                placeholder={questions[currentQ].placeholder}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isAnswered}
                autoFocus
              />
              
              <button 
                type="submit"
                className="absolute"
                style={{ 
                  right: '1.5rem', 
                  top: '1.3rem', 
                  background: 'var(--secondary)', 
                  border: 'none', 
                  borderRadius: '16px',
                  padding: '0.8rem 1.5rem',
                  color: 'white',
                  cursor: 'pointer',
                  display: isAnswered ? 'none' : 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 700
                }}
              >
                Kirim <Send size={20} />
              </button>

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center mt-8"
                  >
                    {feedback === 'correct' ? (
                      <div className="flex items-center gap-4 text-green-400" style={{ color: '#4ecdc4' }}>
                        <CheckCircle size={48} />
                        <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>Jawaban Benar!</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-4" style={{ color: '#ff6b6b' }}>
                          <XCircle size={48} />
                          <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>Belum Tepat</span>
                        </div>
                        <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>Jawaban: {questions[currentQ].answer}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
