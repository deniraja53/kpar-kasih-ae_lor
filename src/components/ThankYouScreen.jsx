import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, RotateCcw, Sparkles } from 'lucide-react';

/* ── Floating particles ───────────────────────────────────── */
const PARTICLES = [
  { emoji: '❤️', x: '5%',  delay: 0,   dur: 5.5, size: 28 },
  { emoji: '⭐', x: '15%', delay: 0.8, dur: 7,   size: 22 },
  { emoji: '❤️', x: '25%', delay: 1.5, dur: 6,   size: 20 },
  { emoji: '✨', x: '38%', delay: 0.3, dur: 8,   size: 24 },
  { emoji: '❤️', x: '52%', delay: 1.1, dur: 5.8, size: 32 },
  { emoji: '⭐', x: '65%', delay: 0.6, dur: 7.2, size: 18 },
  { emoji: '❤️', x: '75%', delay: 1.9, dur: 6.3, size: 26 },
  { emoji: '✨', x: '85%', delay: 0.4, dur: 5,   size: 20 },
  { emoji: '❤️', x: '93%', delay: 1.3, dur: 6.8, size: 22 },
];

export default function ThankYouScreen({ onRestart }) {
  const [leaving, setLeaving] = useState(false);

  const handleRestart = () => {
    setLeaving(true);
    setTimeout(() => onRestart(), 700);
  };

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="thankyou"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(145deg, #0f0218 0%, #1e0435 45%, #0f0218 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,42,109,0.15), transparent)',
          }} />

          {/* Floating particles */}
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: '110vh', opacity: 0 }}
              animate={{ y: '-10vh', opacity: [0, 0.85, 0.85, 0] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute', left: p.x, bottom: 0,
                fontSize: p.size, pointerEvents: 'none', zIndex: 0,
              }}
            >
              {p.emoji}
            </motion.div>
          ))}

          {/* ── Main Card ── */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 180, delay: 0.2 }}
            style={{
              position: 'relative', zIndex: 10,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', padding: '52px 56px 44px',
              borderRadius: 48,
              background: 'linear-gradient(145deg, rgba(38,7,62,0.97), rgba(20,3,34,0.97))',
              border: '2px solid rgba(255,42,109,0.45)',
              boxShadow: '0 0 100px rgba(255,42,109,0.25), 0 0 200px rgba(255,42,109,0.08), inset 0 0 60px rgba(255,42,109,0.04)',
              maxWidth: 520, width: '90%',
            }}
          >
            {/* Sparkle corners */}
            {[
              { top: -16, left: 30, rotate: -20 },
              { top: -16, right: 30, rotate: 20 },
              { bottom: -16, left: 30, rotate: 20 },
              { bottom: -16, right: 30, rotate: -20 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8 + i, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', ...pos }}
              >
                <Star fill="#FCD34D" size={28} style={{ color: '#FCD34D', filter: 'drop-shadow(0 0 8px #FCD34D)' }} />
              </motion.div>
            ))}

            {/* Three hearts */}
            <motion.div
              style={{ display: 'flex', gap: 12, marginBottom: 28 }}
            >
              {[{ size: 36, delay: 0 }, { size: 52, delay: 0.15 }, { size: 36, delay: 0.3 }].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: h.delay, ease: 'easeInOut' }}
                >
                  <Heart
                    fill="var(--primary)"
                    size={h.size}
                    style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 10px rgba(255,42,109,0.8))' }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: '3rem', fontWeight: 900, margin: '0 0 6px',
                background: 'linear-gradient(135deg, #ff2a6d, #ff65bd, #ffb3d9, #ff65bd)',
                backgroundSize: '200%',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                letterSpacing: 1,
              }}
            >
              Terima Kasih!
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                fontSize: 15, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,101,189,0.7)', margin: '0 0 24px',
              }}
            >
              ✦ Petualangan Kasih Selesai ✦
            </motion.p>

            {/* Message box */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                padding: '20px 28px', borderRadius: 20, marginBottom: 32,
                background: 'rgba(255,42,109,0.08)',
                border: '1px solid rgba(255,42,109,0.2)',
              }}
            >
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                Kamu telah menyelesaikan perjalanan kasih ini dengan luar biasa! 🎉<br />
                Ingatlah selalu untuk <span style={{ color: 'var(--primary)', fontWeight: 700 }}>mengasihi Tuhan, diri sendiri,</span><br />
                dan <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>sesama</span> dalam kehidupan sehari-harimu.
              </p>
            </motion.div>

            {/* Bible verse */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                padding: '14px 22px', borderRadius: 16, marginBottom: 36,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.7 }}>
                "Kasih itu sabar; kasih itu murah hati..."<br />
                <span style={{ color: 'rgba(255,101,189,0.6)', fontWeight: 700, fontSize: 11 }}>— 1 Korintus 13:4</span>
              </p>
            </motion.div>

            {/* Restart button */}
            <motion.button
              onClick={handleRestart}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 36px', borderRadius: 999,
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                border: 'none', color: '#fff', fontWeight: 900, fontSize: 15,
                cursor: 'pointer', letterSpacing: 1,
                boxShadow: '0 4px 28px rgba(255,42,109,0.45)',
                transition: 'all 0.2s',
              }}
            >
              <RotateCcw size={18} />
              Mulai Ulang
            </motion.button>
          </motion.div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 1.3 }}
            style={{
              position: 'absolute', bottom: 24,
              fontSize: 11, color: 'rgba(255,255,255,0.4)',
              letterSpacing: 1,
            }}
          >
            KARENA ALLAH ADALAH KASIH ❤️
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
