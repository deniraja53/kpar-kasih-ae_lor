import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Partikel hati kecil melayang di background */
const FloatingHeart = ({ delay, x, size, duration }) => (
  <motion.div
    initial={{ y: '110vh', x, opacity: 0 }}
    animate={{ y: '-10vh', opacity: [0, 0.7, 0.7, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    style={{ position: 'absolute', bottom: 0, fontSize: size, pointerEvents: 'none', zIndex: 0 }}
  >
    ❤️
  </motion.div>
);

const HEARTS = [
  { delay: 0,   x: '8vw',  size: 20, duration: 6 },
  { delay: 1.2, x: '20vw', size: 14, duration: 7.5 },
  { delay: 0.5, x: '35vw', size: 28, duration: 5.5 },
  { delay: 2,   x: '50vw', size: 16, duration: 8 },
  { delay: 0.8, x: '62vw', size: 22, duration: 6.5 },
  { delay: 1.8, x: '75vw', size: 18, duration: 7 },
  { delay: 0.3, x: '88vw', size: 26, duration: 5.8 },
  { delay: 3,   x: '15vw', size: 12, duration: 9 },
  { delay: 2.5, x: '55vw', size: 30, duration: 6.2 },
];

export default function WelcomeScreen({ onEnter }) {
  const [clicked, setClicked] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setRipple(true);
    setClicked(true);
    setTimeout(() => onEnter(), 900);
  };

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.div
          key="welcome"
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f0218 0%, #1e0435 40%, #0f0218 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Background floating hearts */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {HEARTS.map((h, i) => <FloatingHeart key={i} {...h} />)}
          </div>

          {/* Radial glow behind heart button */}
          <div style={{
            position: 'absolute',
            width: 480, height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,42,109,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            width: 280, height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,101,189,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}
          >
            {/* Subtitle atas */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: 13, fontWeight: 700, letterSpacing: 4,
                textTransform: 'uppercase', color: 'rgba(255,101,189,0.7)',
                marginBottom: 32,
              }}
            >
              Selamat Datang di KPAR MADIUN LOR
            </motion.p>

            {/* Judul */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', damping: 18 }}
              style={{
                fontSize: '3.5rem', fontWeight: 900, margin: '0 0 8px',
                background: 'linear-gradient(135deg, #ff2a6d, #ff65bd, #ffb3d9)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                textShadow: 'none', letterSpacing: 2, textAlign: 'center',
              }}
            >
              Petualangan Kasih
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                fontSize: 15, color: 'rgba(255,255,255,0.45)',
                fontStyle: 'italic', marginBottom: 56, textAlign: 'center',
              }}
            >
              Belajar Menjadi Saluran Berkat
            </motion.p>

            {/* ❤️ HEART BUTTON ❤️ */}
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              animate={{
                scale: [1, 1.06, 1, 1.06, 1],
              }}
              transition={{
                scale: {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              style={{
                position: 'relative',
                width: 200, height: 200,
                background: 'none', border: 'none',
                cursor: 'pointer', display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              {/* Ripple ring on click */}
              <AnimatePresence>
                {ripple && (
                  <>
                    <motion.div
                      key="r1"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      style={{
                        position: 'absolute', inset: 0,
                        borderRadius: '50%',
                        background: 'rgba(255,42,109,0.3)',
                        pointerEvents: 'none',
                      }}
                    />
                    <motion.div
                      key="r2"
                      initial={{ scale: 1, opacity: 0.4 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.9, delay: 0.1 }}
                      style={{
                        position: 'absolute', inset: 0,
                        borderRadius: '50%',
                        background: 'rgba(255,101,189,0.2)',
                        pointerEvents: 'none',
                      }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* The big SVG heart */}
              <motion.svg
                viewBox="0 0 100 90"
                style={{ width: 180, height: 180, filter: 'drop-shadow(0 0 30px rgba(255,42,109,0.7)) drop-shadow(0 0 60px rgba(255,42,109,0.35))' }}
              >
                <defs>
                  <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#ff2a6d" />
                    <stop offset="50%"  stopColor="#ff65bd" />
                    <stop offset="100%" stopColor="#ff2a6d" />
                  </linearGradient>
                  <linearGradient id="hg2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="rgba(255,255,255,0.35)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                {/* Shadow / depth heart */}
                <path
                  d="M50 85 C30 68, 5 55, 5 33 A22 22 0 0 1 50 20 A22 22 0 0 1 95 33 C95 55, 70 68, 50 85Z"
                  fill="rgba(180,0,60,0.4)"
                  transform="translate(1,3)"
                />
                {/* Main heart */}
                <path
                  d="M50 85 C30 68, 5 55, 5 33 A22 22 0 0 1 50 20 A22 22 0 0 1 95 33 C95 55, 70 68, 50 85Z"
                  fill="url(#hg)"
                />
                {/* Shine / gloss */}
                <path
                  d="M50 85 C30 68, 5 55, 5 33 A22 22 0 0 1 50 20 A22 22 0 0 1 95 33 C95 55, 70 68, 50 85Z"
                  fill="url(#hg2)"
                />
                {/* Inner shine dot */}
                <ellipse cx="35" cy="36" rx="10" ry="7" fill="rgba(255,255,255,0.25)" transform="rotate(-30 35 36)" />
              </motion.svg>

              {/* "Klik Aku" text inside heart */}
              <div style={{
                position: '',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                bottom: 18,
              }}>
                <span style={{
                  fontSize: 15, fontWeight: 900, color: '#fff',
                  letterSpacing: 3, textTransform: 'uppercase',
                  textShadow: '0 0 12px rgba(0,0,0,0.7)',
                }}>
                  Klik Aku
                </span>
              </div>
            </motion.button>

            {/* Hint text bawah */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
              transition={{ delay: 1.2, duration: 2.5, repeat: Infinity }}
              style={{
                marginTop: 36, display: 'flex', alignItems: 'center', gap: 8,
                color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              <span>✦</span>
              <span>Klik hati untuk memulai perjalanan kasih</span>
              <span>✦</span>
            </motion.div>
          </motion.div>

          {/* Bottom decoration line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{
              position: 'absolute', bottom: 28,
              width: 160, height: 2, borderRadius: 2,
              background: 'linear-gradient(90deg, transparent, rgba(255,42,109,0.6), transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
