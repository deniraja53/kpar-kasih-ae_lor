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
        borderRadius: "8px",
        border: filled
          ? "2px solid rgba(255,42,109,0.9)"
          : "2px dashed rgba(255,42,109,0.3)",
        background: filled ? "transparent" : "rgba(255,255,255,0.03)",
        boxShadow: filled ? "0 0 10px rgba(255,42,109,0.25)" : "none",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s",
        minHeight: "60px",
      }}
    >
      {!filled && (
        <div style={{ textAlign: "center", pointerEvents: "none" }}>
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "rgba(255,42,109,0.2)",
              lineHeight: 1,
            }}
          >
            {index + 1}
          </div>
          <div
            style={{
              fontSize: "6px",
              color: "rgba(255,255,255,0.25)",
              fontWeight: 700,
              marginTop: 1,
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
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 65%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "3px 5px",
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontSize: "6px",
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
                top: 3,
                left: 3,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "rgba(255,42,109,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "6px",
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
                top: 3,
                right: 3,
                background: "#22c55e",
                borderRadius: "50%",
                padding: 1,
              }}
            >
              <CheckCircle2 size={7} color="white" />
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

  const NUM_STYLE = {
    fontSize: "1.1rem",
    fontWeight: 900,
    color: "#fff",
    textShadow: "0 0 10px rgba(255,42,109,0.6)",
    lineHeight: 1,
    width: 16,
    textAlign: "center",
    flexShrink: 0,
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

      {/* Header - Compact */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 8px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(0,0,0,0.25)",
          flexShrink: 0,
          minHeight: 38,
        }}
      >
        <button
          onClick={onPrev}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "4px 10px",
            borderRadius: 14,
            background: "rgba(255,42,109,0.12)",
            border: "1px solid rgba(255,42,109,0.5)",
            color: "var(--primary)",
            fontWeight: 900,
            fontSize: 8,
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={10} /> Kembali
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Heart
              fill="var(--primary)"
              size={8}
              style={{ color: "var(--primary)" }}
            />
            <span
              style={{
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontSize: 7,
                color: "var(--primary)",
              }}
            >
              Susun Kisah Kasih
            </span>
            <Heart
              fill="var(--primary)"
              size={8}
              style={{ color: "var(--primary)" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={reset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "3px 8px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,.45)",
              fontWeight: 700,
              fontSize: 7,
              cursor: "pointer",
            }}
          >
            <RotateCcw size={8} /> Reset
          </button>
          <button
            onClick={onNext}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "4px 10px",
              borderRadius: 14,
              background: "rgba(255,42,109,0.12)",
              border: "1px solid rgba(255,42,109,0.5)",
              color: "var(--primary)",
              fontWeight: 900,
              fontSize: 8,
              cursor: "pointer",
            }}
          >
            Lanjut <ChevronRight size={10} />
          </button>
        </div>
      </div>

      {/* Instruction */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "2px 4px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            fontSize: 6,
            fontWeight: 700,
            padding: "2px 10px",
            borderRadius: 14,
            background: "rgba(255,42,109,.1)",
            color: "rgba(255,255,255,.6)",
            border: "1px solid rgba(255,42,109,.2)",
          }}
        >
          🎯 Seret gambar ke kotak!
        </span>
      </div>

      {/* Slot Area - FLEXIBLE HEIGHT */}
      <div
        style={{
          padding: "6px 10px",
          flex: "1 1 auto",
          overflowY: "auto",
          minHeight: "35%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 4,
              flex: 1,
              minHeight: "50px",
            }}
          >
            <span style={NUM_STYLE}>1</span>
            <Slot
              index={0}
              filled={slots[0]}
              slotRef={(el) => (slotRefs.current[0] = el)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 4,
              flex: 1,
              minHeight: "50px",
            }}
          >
            <span style={NUM_STYLE}>2</span>
            <Slot
              index={1}
              filled={slots[1]}
              slotRef={(el) => (slotRefs.current[1] = el)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 4,
              flex: 1,
              minHeight: "50px",
            }}
          >
            <span style={NUM_STYLE}>3</span>
            <Slot
              index={2}
              filled={slots[2]}
              slotRef={(el) => (slotRefs.current[2] = el)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 4,
              flex: 1,
              minHeight: "50px",
            }}
          >
            <span style={NUM_STYLE}>4</span>
            <Slot
              index={3}
              filled={slots[3]}
              slotRef={(el) => (slotRefs.current[3] = el)}
            />
          </div>
        </div>
      </div>

      {/* Pool - FLEXIBLE */}
      <div
        style={{
          flex: "0 0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "6px 10px 8px",
          position: "relative",
          maxHeight: "35%",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "2px 12px",
            borderRadius: 14,
            marginBottom: 4,
            background:
              "linear-gradient(90deg,rgba(255,42,109,.85),rgba(180,0,180,.85))",
            color: "#fff",
            fontSize: 6,
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
          ✦ PILIH & SERET GAMBAR ✦
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
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
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.05, zIndex: 999, cursor: "grabbing" }}
                onDragEnd={(e, info) => onDragEnd(e, info, item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.75 }}
                style={{
                  width: "45%",
                  maxWidth: "85px",
                  aspectRatio: "3/2",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "2px solid rgba(255,42,109,0.4)",
                  background: "#1a0a1a",
                  cursor: "grab",
                  boxShadow: "0 3px 12px rgba(0,0,0,0.45)",
                  position: "relative",
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                    fontSize: "6px",
                    color: "#fff",
                    fontWeight: 700,
                    textAlign: "center",
                    padding: "0 4px 4px",
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
                fontSize: 8,
                fontWeight: 700,
                color: "rgba(255,255,255,.25)",
              }}
            >
              🎉 Selesai!
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          minHeight: 28,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 10px",
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
                gap: 3,
                padding: "2px 10px",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 8,
                background:
                  feedback.type === "success"
                    ? "rgba(34,197,94,.18)"
                    : "rgba(255,42,109,.18)",
                color: feedback.type === "success" ? "#4ade80" : "#ff6b9d",
              }}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 size={8} />
              ) : (
                <AlertCircle size={8} />
              )}
              {feedback.msg}
            </motion.div>
          ) : (
            <motion.div
              key="dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", gap: 4 }}
            >
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 4,
                    borderRadius: 2,
                    width: slots[i] ? 14 : 4,
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
              padding: "12px",
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
                padding: "18px 24px",
                borderRadius: 18,
                maxWidth: 240,
                background:
                  "linear-gradient(145deg,rgba(32,5,52,.98),rgba(16,2,26,.98))",
                border: "2px solid rgba(255,42,109,.5)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2.6 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                  background:
                    "radial-gradient(circle,rgba(255,215,0,.2),rgba(255,215,0,.04))",
                  border: "2px solid rgba(255,215,0,.4)",
                }}
              >
                <Star fill="#FCD34D" size={22} style={{ color: "#FCD34D" }} />
              </motion.div>
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  color: "var(--primary)",
                  margin: "0 0 4px",
                }}
              >
                LUAR BIASA! 🎉
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.85)",
                  fontSize: 9,
                  fontWeight: 600,
                  margin: "0 0 3px",
                }}
              >
                Kisah tersusun!
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,.42)",
                  fontSize: 7,
                  lineHeight: 1.3,
                  margin: "0 0 12px",
                }}
              >
                Kasih itu berkorban! ❤️
              </p>
              <div style={{ display: "flex", gap: 4, width: "100%" }}>
                <button
                  onClick={reset}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    padding: "6px 0",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 9,
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.13)",
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                  }}
                >
                  <RotateCcw size={10} /> Main Lagi
                </button>
                <button
                  onClick={onNext}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    padding: "6px 0",
                    borderRadius: 10,
                    fontWeight: 900,
                    fontSize: 9,
                    background:
                      "linear-gradient(135deg,var(--primary),var(--secondary))",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Lanjut <ChevronRight size={12} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
