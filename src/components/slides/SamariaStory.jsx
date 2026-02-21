import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

/* ── Data ────────────────────────────────────────────────── */
const STEPS = [
  { id: 1, title: "Korban di Tepi Jalan", img: "/images/samaria-1.jpg" },
  { id: 2, title: "Orang Lewi Berlalu", img: "/images/samaria-2.jpg" },
  { id: 3, title: "Orang Samaria Menolong", img: "/images/samaria-3.jpg" },
  { id: 4, title: "Kasih yang Berkorban", img: "/images/samaria-4.jpg" },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/* ── Slot component ──────────────────────────────────────── */
function Slot({ index, filled, slotRef }) {
  return (
    <div
      ref={slotRef}
      style={{
        flex: 1,
        borderRadius: "6px",
        border: filled
          ? "2px solid rgba(255,42,109,0.9)"
          : "2px dashed rgba(255,42,109,0.3)",
        background: filled ? "transparent" : "rgba(255,255,255,0.03)",
        boxShadow: filled ? "0 0 8px rgba(255,42,109,0.25)" : "none",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s",
        minHeight: 0,
      }}
    >
      {!filled && (
        <div style={{ textAlign: "center", pointerEvents: "none" }}>
          <div
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              fontWeight: 900,
              color: "rgba(255,42,109,0.2)",
              lineHeight: 1,
            }}
          >
            {index + 1}
          </div>
          <div
            style={{
              fontSize: "clamp(0.4rem, 1.5vw, 0.6rem)",
              color: "rgba(255,255,255,0.25)",
              fontWeight: 700,
              marginTop: 2,
            }}
          >
            Langkah {index + 1}
          </div>
        </div>
      )}

      <AnimatePresence>
        {filled && (
          <motion.div
            key={`filled-${index}`}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <img
              src={filled.img}
              alt={filled.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              draggable={false}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "clamp(2px, 1vw, 4px)",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontSize: "clamp(0.5rem, 2vw, 0.75rem)",
                  fontWeight: 700,
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {filled.title}
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                top: "clamp(2px, 1vw, 4px)",
                left: "clamp(2px, 1vw, 4px)",
                width: "clamp(14px, 4vw, 20px)",
                height: "clamp(14px, 4vw, 20px)",
                borderRadius: "50%",
                background: "rgba(255,42,109,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(0.5rem, 2vw, 0.7rem)",
                fontWeight: 900,
                color: "#fff",
              }}
            >
              {index + 1}
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: "absolute",
                top: "clamp(2px, 1vw, 4px)",
                right: "clamp(2px, 1vw, 4px)",
                background: "#22c55e",
                borderRadius: "50%",
                padding: 1,
              }}
            >
              <CheckCircle2 size="clamp(6px, 2vw, 10px)" color="white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function SamariaStory({ onPrev, onNext }) {
  const [slots, setSlots] = useState([null, null, null, null]);
  const [pool, setPool] = useState(() => shuffle(STEPS));
  const [feedback, setFeed] = useState(null);
  const [completed, setDone] = useState(false);
  const [reward, setReward] = useState(false);
  const slotRefs = useRef([null, null, null, null]);

  const flash = (type, msg) => {
    setFeed({ type, msg });
    setTimeout(() => setFeed(null), 2000);
  };

  const findSlot = (x, y) => {
    let found = -1;
    slotRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const b = ref.getBoundingClientRect();
      if (x >= b.left && x <= b.right && y >= b.top && y <= b.bottom) found = i;
    });
    return found;
  };

  const onDragEnd = (e, info, item) => {
    const idx = findSlot(info.point.x, info.point.y);
    if (idx === -1) return;
    if (slots[idx]) {
      flash("error", "Kotak terisi!");
      return;
    }
    if (item.id === idx + 1) {
      const next = [...slots];
      next[idx] = item;
      setSlots(next);
      setPool((p) => p.filter((x) => x.id !== item.id));
      flash("success", "Hebat! ✅");
      if (next.every(Boolean)) {
        setTimeout(() => {
          setDone(true);
          setReward(true);
        }, 600);
      }
    } else {
      flash("error", "Coba lagi 🔄");
    }
  };

  const reset = () => {
    setSlots([null, null, null, null]);
    setPool(shuffle(STEPS));
    setDone(false);
    setReward(false);
    setFeed(null);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(145deg,#12031a,#1e0535,#12031a)",
        overflow: "hidden",
        userSelect: "none",
        position: "relative",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 55% 35% at 20% 10%,rgba(255,42,109,.13),transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 45% 35% at 80% 85%,rgba(148,0,211,.12),transparent)",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(4px, 2vw, 8px) clamp(6px, 3vw, 12px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(0,0,0,0.25)",
          flexShrink: 0,
          minHeight: "clamp(32px, 8vw, 44px)",
        }}
      >
        <button
          onClick={onPrev}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(2px, 1vw, 4px)",
            padding: "clamp(4px, 1.5vw, 6px) clamp(6px, 2vw, 10px)",
            borderRadius: "clamp(10px, 3vw, 16px)",
            background: "rgba(255,42,109,0.12)",
            border: "1px solid rgba(255,42,109,0.5)",
            color: "var(--primary)",
            fontWeight: 900,
            fontSize: "clamp(0.6rem, 2vw, 0.8rem)",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size="clamp(10px, 3vw, 14px)" /> Kembali
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(2px, 1vw, 4px)",
            }}
          >
            <Heart
              fill="var(--primary)"
              size="clamp(8px, 2.5vw, 12px)"
              style={{ color: "var(--primary)" }}
            />
            <span
              style={{
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontSize: "clamp(0.5rem, 2vw, 0.75rem)",
                color: "var(--primary)",
              }}
            >
              Susun Kisah
            </span>
            <Heart
              fill="var(--primary)"
              size="clamp(8px, 2.5vw, 12px)"
              style={{ color: "var(--primary)" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "clamp(3px, 1vw, 6px)" }}>
          <button
            onClick={reset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(1px, 0.5vw, 2px)",
              padding: "clamp(3px, 1vw, 5px) clamp(4px, 1.5vw, 8px)",
              borderRadius: "clamp(10px, 3vw, 16px)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,.45)",
              fontWeight: 700,
              fontSize: "clamp(0.5rem, 1.5vw, 0.7rem)",
              cursor: "pointer",
            }}
          >
            <RotateCcw size="clamp(8px, 2vw, 12px)" /> Reset
          </button>
          <button
            onClick={onNext}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(2px, 1vw, 4px)",
              padding: "clamp(4px, 1.5vw, 6px) clamp(6px, 2vw, 10px)",
              borderRadius: "clamp(10px, 3vw, 16px)",
              background: "rgba(255,42,109,0.12)",
              border: "1px solid rgba(255,42,109,0.5)",
              color: "var(--primary)",
              fontWeight: 900,
              fontSize: "clamp(0.6rem, 2vw, 0.8rem)",
              cursor: "pointer",
            }}
          >
            Lanjut <ChevronRight size="clamp(10px, 3vw, 14px)" />
          </button>
        </div>
      </div>

      {/* Instruction */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "clamp(2px, 1vw, 4px) clamp(4px, 2vw, 6px)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(2px, 1vw, 4px)",
            fontSize: "clamp(0.5rem, 1.5vw, 0.7rem)",
            fontWeight: 700,
            padding: "clamp(2px, 1vw, 3px) clamp(6px, 2vw, 10px)",
            borderRadius: "clamp(10px, 3vw, 16px)",
            background: "rgba(255,42,109,.1)",
            color: "rgba(255,255,255,.6)",
            border: "1px solid rgba(255,42,109,.2)",
          }}
        >
          🎯 Seret gambar ke kotak!
        </span>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "clamp(4px, 2vw, 8px) clamp(6px, 3vw, 12px)",
          overflow: "hidden",
          minHeight: 0,
          position: "relative",
        }}
      >
        {/* 16:9 Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            aspectRatio: "16/9",
          }}
        >
          {/* Slots Grid - 2x2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "clamp(4px, 1.5vw, 8px)",
              width: "100%",
              flex: 1,
              minHeight: 0,
            }}
          >
            <Slot
              index={0}
              filled={slots[0]}
              slotRef={(el) => (slotRefs.current[0] = el)}
            />
            <Slot
              index={1}
              filled={slots[1]}
              slotRef={(el) => (slotRefs.current[1] = el)}
            />
            <Slot
              index={2}
              filled={slots[2]}
              slotRef={(el) => (slotRefs.current[2] = el)}
            />
            <Slot
              index={3}
              filled={slots[3]}
              slotRef={(el) => (slotRefs.current[3] = el)}
            />
          </div>
        </div>

        {/* Pool - Draggable Cards */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "clamp(6px, 2vw, 10px) 0 clamp(4px, 1.5vw, 6px)",
            position: "relative",
            borderTop: "1px solid rgba(255,42,109,0.15)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "clamp(2px, 1vw, 3px) clamp(8px, 3vw, 14px)",
              borderRadius: "clamp(10px, 3vw, 16px)",
              marginBottom: "clamp(4px, 1.5vw, 6px)",
              background:
                "linear-gradient(90deg,rgba(255,42,109,.85),rgba(180,0,180,.85))",
              color: "#fff",
              fontSize: "clamp(0.45rem, 1.5vw, 0.6rem)",
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            ✦ PILIH & SERET GAMBAR ✦
          </div>
          <div
            style={{
              display: "flex",
              gap: "clamp(4px, 1.5vw, 8px)",
              width: "100%",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <AnimatePresence>
              {pool.map((item) => (
                <motion.div
                  key={item.id}
                  drag
                  dragSnapToOrigin
                  dragElastic={0.08}
                  dragMomentum={false}
                  whileHover={{ scale: 1.01 }}
                  whileDrag={{ scale: 1.03, zIndex: 999, cursor: "grabbing" }}
                  onDragEnd={(e, info) => onDragEnd(e, info, item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  style={{
                    width: "clamp(60px, 18vw, 100px)",
                    aspectRatio: "16/9",
                    borderRadius: "clamp(6px, 2vw, 10px)",
                    overflow: "hidden",
                    border: "2px solid rgba(255,42,109,0.4)",
                    background: "#1a0a1a",
                    cursor: "grab",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.45)",
                    position: "relative",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    draggable={false}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top,rgba(0,0,0,.85) 45%,transparent 75%)",
                    }}
                  />
                  <p
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      fontSize: "clamp(0.4rem, 1.5vw, 0.55rem)",
                      color: "#fff",
                      fontWeight: 700,
                      textAlign: "center",
                      padding: "0 clamp(2px, 1vw, 4px) clamp(2px, 1vw, 4px)",
                    }}
                  >
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            {pool.length === 0 && !completed && (
              <p
                style={{
                  fontSize: "clamp(0.6rem, 2vw, 0.8rem)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,.25)",
                }}
              >
                🎉 Selesai!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          minHeight: "clamp(24px, 6vw, 32px)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 clamp(6px, 3vw, 10px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <AnimatePresence mode="wait">
          {feedback ? (
            <motion.div
              key="fb"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(2px, 1vw, 4px)",
                padding: "clamp(2px, 1vw, 4px) clamp(6px, 2vw, 10px)",
                borderRadius: "clamp(10px, 3vw, 16px)",
                fontWeight: 700,
                fontSize: "clamp(0.55rem, 1.5vw, 0.75rem)",
                background:
                  feedback.type === "success"
                    ? "rgba(34,197,94,.18)"
                    : "rgba(255,42,109,.18)",
                color: feedback.type === "success" ? "#4ade80" : "#ff6b9d",
              }}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 size="clamp(8px, 2.5vw, 12px)" />
              ) : (
                <AlertCircle size="clamp(8px, 2.5vw, 12px)" />
              )}
              {feedback.msg}
            </motion.div>
          ) : (
            <motion.div
              key="dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", gap: "clamp(3px, 1vw, 6px)" }}
            >
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: "clamp(3px, 1vw, 5px)",
                    borderRadius: 2,
                    width: slots[i]
                      ? "clamp(10px, 3vw, 16px)"
                      : "clamp(3px, 1vw, 5px)",
                    background: slots[i]
                      ? "var(--primary)"
                      : "rgba(255,255,255,0.18)",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reward Overlay */}
      <AnimatePresence>
        {completed && reward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(8,1,14,0.92)",
              backdropFilter: "blur(14px)",
              padding: "clamp(12px, 4vw, 20px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "clamp(16px, 5vw, 24px) clamp(20px, 6vw, 32px)",
                borderRadius: "clamp(16px, 5vw, 24px)",
                maxWidth: "clamp(200px, 60vw, 280px)",
                background:
                  "linear-gradient(145deg,rgba(32,5,52,.98),rgba(16,2,26,.98))",
                border: "2px solid rgba(255,42,109,.5)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2.6 }}
                style={{
                  width: "clamp(36px, 10vw, 56px)",
                  height: "clamp(36px, 10vw, 56px)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "clamp(8px, 2vw, 12px)",
                  background:
                    "radial-gradient(circle,rgba(255,215,0,.2),rgba(255,215,0,.04))",
                  border: "2px solid rgba(255,215,0,.4)",
                }}
              >
                <Star
                  fill="#FCD34D"
                  size="clamp(20px, 6vw, 30px)"
                  style={{ color: "#FCD34D" }}
                />
              </motion.div>
              <h2
                style={{
                  fontSize: "clamp(1rem, 4vw, 1.5rem)",
                  fontWeight: 900,
                  color: "var(--primary)",
                  margin: "0 0 clamp(4px, 1.5vw, 8px)",
                }}
              >
                LUAR BIASA! 🎉
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.85)",
                  fontSize: "clamp(0.6rem, 2vw, 0.85rem)",
                  fontWeight: 600,
                  margin: "0 0 clamp(2px, 1vw, 4px)",
                }}
              >
                Kisah tersusun!
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,.42)",
                  fontSize: "clamp(0.5rem, 1.5vw, 0.7rem)",
                  lineHeight: 1.3,
                  margin: "0 0 clamp(10px, 3vw, 16px)",
                }}
              >
                Kasih itu berkorban! ❤️
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "clamp(4px, 1.5vw, 8px)",
                  width: "100%",
                }}
              >
                <button
                  onClick={reset}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "clamp(2px, 1vw, 4px)",
                    padding: "clamp(6px, 2vw, 10px) 0",
                    borderRadius: "clamp(10px, 3vw, 14px)",
                    fontWeight: 700,
                    fontSize: "clamp(0.55rem, 1.5vw, 0.8rem)",
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.13)",
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                  }}
                >
                  <RotateCcw size="clamp(10px, 3vw, 14px)" /> Main Lagi
                </button>
                <button
                  onClick={onNext}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "clamp(2px, 1vw, 4px)",
                    padding: "clamp(6px, 2vw, 10px) 0",
                    borderRadius: "clamp(10px, 3vw, 14px)",
                    fontWeight: 900,
                    fontSize: "clamp(0.55rem, 1.5vw, 0.8rem)",
                    background:
                      "linear-gradient(135deg,var(--primary),var(--secondary))",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Lanjut <ChevronRight size="clamp(12px, 3.5vw, 16px)" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
