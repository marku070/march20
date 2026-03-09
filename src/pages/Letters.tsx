import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, MailOpen, X } from "lucide-react";
import { letters, isLetterUnlocked, getUnlockDisplayDate } from "../data/letters";

const envelopeColors = [
  "bg-soft-pink",
  "bg-baby-blue",
  "bg-soft-yellow",
  "bg-lavender",
  "bg-cream",
];

const Letters = () => {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [lockedMessage, setLockedMessage] = useState<string | null>(null);

  const handleClick = (id: number) => {
    const letter = letters.find((l) => l.id === id)!;
    if (isLetterUnlocked(letter)) {
      setSelectedLetter(id);
      setLockedMessage(null);
    } else {
      setLockedMessage(`Come back on ${getUnlockDisplayDate(letter)} to open this letter. 💌`);
      setTimeout(() => setLockedMessage(null), 3000);
    }
  };

  const selected = letters.find((l) => l.id === selectedLetter);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-display text-foreground mb-2">
            Birthday Messages 💌
          </h1>
          <p className="text-muted-foreground font-body">
            I thought one big one on the birthday is lame and overused so here are 15 through 10 days
          </p>
        </motion.div>

        {/* Locked message toast */}
        <AnimatePresence>
          {lockedMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-2xl px-6 py-3 shadow-lg text-sm text-foreground font-body"
            >
              {lockedMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {letters.map((letter, i) => {
            const unlocked = isLetterUnlocked(letter);
            return (
              <motion.button
                key={letter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 1) }}
                whileHover={unlocked ? { y: -4, scale: 1.03 } : {}}
                onClick={() => handleClick(letter.id)}
                className={`relative rounded-2xl p-5 border border-border shadow-md text-center transition-all duration-300 ${
                  envelopeColors[i % envelopeColors.length]
                } ${unlocked ? "cursor-pointer hover:shadow-xl" : "opacity-50 cursor-not-allowed"}`}
              >
                <div className="mb-3">
                  {unlocked ? (
                    <Mail className="w-8 h-8 mx-auto text-foreground" />
                  ) : (
                    <Lock className="w-6 h-6 mx-auto text-muted-foreground" />
                  )}
                </div>
                <p className="font-body text-xs font-semibold text-foreground">
                  {letter.title}
                </p>
                {!unlocked && (
                  <p className="text-[10px] text-muted-foreground mt-1 font-body">
                    Opens on {getUnlockDisplayDate(letter)}
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Letter modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedLetter(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-cream border border-border rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              >
                <div className="sticky top-0 bg-cream rounded-t-2xl px-6 pt-5 pb-3 flex items-center justify-between border-b border-border">
                  <div className="flex items-center gap-2">
                    <MailOpen className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-xl text-foreground">
                      {selected.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
                <div className="px-6 py-5">
                  <div className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {selected.content}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Letters;
