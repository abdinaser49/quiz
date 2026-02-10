import { useState, useMemo, useEffect } from "react";
import { quizQuestions, type QuizQuestion } from "@/data/quizQuestions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Brain, Sparkles, Trophy, Target, Type, ListChecks, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Screen = "welcome" | "quiz" | "results";
type Mode = "choice" | "direct";

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffleWithMapping(options: string[], correctIndex: number) {
  const correctOption = options[correctIndex];
  const shuffledOptions = shuffleArray([...options]);

  return {
    shuffled: shuffledOptions,
    newCorrectIndex: shuffledOptions.indexOf(correctOption),
  };
}

const QuizApp = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [mode, setMode] = useState<Mode>("choice");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [directInput, setDirectInput] = useState("");
  const [isCorrectDirect, setIsCorrectDirect] = useState<boolean | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  const total = quizQuestions.length;

  const shuffledQuestions = useMemo<QuizQuestion[]>(() => {
    const shuffledQ = shuffleArray(quizQuestions);
    return shuffledQ.map((q: QuizQuestion): QuizQuestion => {
      const { shuffled, newCorrectIndex } = shuffleWithMapping(q.options, q.correctIndex);
      return {
        ...q,
        options: shuffled,
        correctIndex: newCorrectIndex
      };
    });
  }, [shuffleKey]);

  const question = shuffledQuestions[currentIndex];
  const answered = selectedAnswer !== null || isCorrectDirect !== null;
  const progress = ((currentIndex + (answered ? 1 : 0)) / total) * 100;

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev + 1 < total) {
        setSelectedAnswer(null);
        setDirectInput("");
        setIsCorrectDirect(null);
        return prev + 1;
      } else {
        setScreen("results");
        return prev;
      }
    });
  };

  const handleSelect = (index: number) => {
    if (answered || mode !== "choice") return;
    setSelectedAnswer(index);
    if (index === question.correctIndex) {
      setScore((s) => s + 1);
    }
    setTimeout(handleNext, 1200);
  };

  const handleDirectSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (answered || mode !== "direct" || !directInput.trim()) return;

    // Normalize: lowercase, remove punctuation, and trim
    const normalize = (str: string) =>
      str.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();

    const normalizedInput = normalize(directInput);
    const normalizedCorrect = normalize(question.options[question.correctIndex]);

    // Check if input is part of correct answer OR correct answer contains the input
    // This allows for "qoraal sawir" to match "Abuuro qoraal, sawir, iyo cod"
    const isCorrect =
      normalizedInput.length >= 2 &&
      (normalizedCorrect.includes(normalizedInput) || normalizedInput.includes(normalizedCorrect));

    setIsCorrectDirect(isCorrect);
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setTimeout(handleNext, 2000);
  };

  const handleRestart = () => {
    setScreen("welcome");
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setDirectInput("");
    setIsCorrectDirect(null);
    setShuffleKey((k) => k + 1);
  };

  const percentage = Math.round((score / total) * 100);

  const getPerformanceData = () => {
    if (percentage >= 80) return { message: "🎉 Aad baad u fiicantahay!", color: "text-green-500", icon: Trophy };
    if (percentage >= 50) return { message: "👍 Waa lagu mahadsan yahay!", color: "text-blue-500", icon: Sparkles };
    return { message: "📚 Sii baro!", color: "text-orange-500", icon: Brain };
  };

  const performance = getPerformanceData();

  return (
    <div className="flex min-h-screen items-center justify-center p-4 selection:bg-primary/20 flex-col gap-6">
      {/* Mode Toggle */}
      {screen === "quiz" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex bg-muted p-1 rounded-xl shadow-inner"
        >
          <Button
            variant={mode === "choice" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              if (answered) return;
              setMode("choice");
            }}
            className={cn("rounded-lg px-4 gap-2", mode === "choice" && "shadow-sm")}
          >
            <ListChecks className="h-4 w-4" />
            Xulasho
          </Button>
          <Button
            variant={mode === "direct" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              if (answered) return;
              setMode("direct");
            }}
            className={cn("rounded-lg px-4 gap-2", mode === "direct" && "shadow-sm")}
          >
            <Type className="h-4 w-4" />
            Qoraal
          </Button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {screen === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-xl"
          >
            <Card className="glass overflow-hidden">
              <div className="h-2 premium-gradient" />
              <CardHeader className="space-y-6 text-center pb-8 pt-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                >
                  <Brain className="h-10 w-10" />
                </motion.div>
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                    Somali AI Quiz Hub
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto">
                    Ku soo dhowaad quiz-ka ku saabsan Generative AI iyo mustaqbalka waxbarashada sare ee Soomaaliya.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-10 gap-6">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">Dooro Nooca Quiz-ka</p>
                  <div className="flex gap-3">
                    <Button
                      variant={mode === "choice" ? "default" : "outline"}
                      onClick={() => setMode("choice")}
                      className="gap-2 h-12 px-6 rounded-xl transition-all"
                    >
                      <ListChecks className="h-5 w-5" /> Multiple Choice
                    </Button>
                    <Button
                      variant={mode === "direct" ? "default" : "outline"}
                      onClick={() => setMode("direct")}
                      className="gap-2 h-12 px-6 rounded-xl transition-all"
                    >
                      <Type className="h-5 w-5" /> Qoraal (Direct)
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>{total} Su'aalood</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>Interaktiv</span>
                  </div>
                </div>
                <Button size="lg" onClick={() => setScreen("quiz")} className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95">
                  Bilow Quiz-ka <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {screen === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-2xl space-y-6"
          >
            <div className="flex items-center justify-between px-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Su'aasha {currentIndex + 1} ee {total}
                </p>
                <h3 className="text-xl font-bold">Hore u soco</h3>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">Score-kaaga</p>
                <p className="text-xl font-bold text-primary">{score}</p>
              </div>
            </div>

            <Progress value={progress} className="h-3 rounded-full bg-secondary" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass border-none shadow-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl sm:text-2xl leading-relaxed font-semibold">
                      {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {mode === "choice" ? (
                      <div className="grid gap-3">
                        {question.options.map((option, i) => {
                          const isCorrect = i === question.correctIndex;
                          const isSelected = i === selectedAnswer;
                          const showCorrect = answered && isCorrect;
                          const showWrong = answered && isSelected && !isCorrect;

                          return (
                            <motion.button
                              key={i}
                              whileHover={!answered ? { scale: 1.01, x: 5 } : {}}
                              whileTap={!answered ? { scale: 0.98 } : {}}
                              disabled={answered}
                              onClick={() => handleSelect(i)}
                              className={cn(
                                "option-button flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-300",
                                !answered && "hover:border-primary/50 hover:bg-primary/5 border-border bg-card/50",
                                answered && !isCorrect && !isSelected && "opacity-40 border-border bg-transparent",
                                showCorrect && "border-green-500 bg-green-500/10 text-green-700 shadow-lg shadow-green-500/20",
                                showWrong && "border-destructive bg-destructive/10 text-destructive shadow-lg shadow-destructive/20"
                              )}
                            >
                              <span className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors",
                                !answered && "bg-secondary text-secondary-foreground border-transparent",
                                showCorrect && "bg-green-500 text-white border-green-500",
                                showWrong && "bg-destructive text-white border-destructive",
                                answered && !isCorrect && !isSelected && "bg-muted text-muted-foreground"
                              )}>
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span className="flex-1 font-medium">{option}</span>
                              {showCorrect && <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600 animate-in" />}
                              {showWrong && <XCircle className="h-6 w-6 shrink-0 text-destructive animate-in" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    ) : (
                      <form onSubmit={handleDirectSubmit} className="space-y-6">
                        <div className="relative">
                          <Input
                            placeholder="Halkan ku qor jawaabta saxda ah..."
                            value={directInput}
                            onChange={(e) => setDirectInput(e.target.value)}
                            disabled={answered}
                            className={cn(
                              "h-16 px-6 text-lg rounded-xl border-2 transition-all",
                              isCorrectDirect === true && "border-green-500 bg-green-500/5 ring-green-500/20",
                              isCorrectDirect === false && "border-destructive bg-destructive/5 ring-destructive/20"
                            )}
                          />
                          {!answered && (
                            <Button
                              type="submit"
                              size="icon"
                              className="absolute right-2 top-2 h-12 w-12 rounded-lg"
                              disabled={!directInput.trim()}
                            >
                              <Send className="h-5 w-5" />
                            </Button>
                          )}
                        </div>

                        <AnimatePresence>
                          {answered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={cn(
                                "p-4 rounded-xl flex items-center gap-3 font-medium",
                                isCorrectDirect ? "bg-green-500/10 text-green-700 border border-green-200" : "bg-destructive/10 text-destructive border border-destructive/20"
                              )}
                            >
                              {isCorrectDirect ? (
                                <>
                                  <CheckCircle2 className="h-5 w-5" />
                                  <span>Waa sax! Aad baad u fiicantahay.</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-5 w-5" />
                                  <span>Waa khalad. Jawaabta saxda ahayd: <span className="font-bold underline">{question.options[question.correctIndex]}</span></span>
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {screen === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl"
          >
            <Card className="glass overflow-hidden">
              <div className="h-2 premium-gradient" />
              <CardHeader className="space-y-4 text-center pb-2 pt-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <performance.icon className={cn("mx-auto h-16 w-16 mb-4", performance.color)} />
                  <CardTitle className="text-3xl">Quiz-ka waa dhamaaday!</CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="text-center space-y-8 pb-10">
                <div className="space-y-2">
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", delay: 0.4 }}
                    className="text-6xl font-black text-primary"
                  >
                    {percentage}%
                  </motion.p>
                  <p className="text-xl font-medium text-muted-foreground">
                    Waxaad heshay <span className="text-foreground font-bold">{score}</span> su'aalood oo sax ah {total} ka mid ah.
                  </p>
                </div>

                <div className="px-8 flex flex-col items-center gap-6">
                  <Progress value={percentage} className="h-4 rounded-full" />
                  <p className={cn("text-2xl font-bold", performance.color)}>{performance.message}</p>
                  <Button size="lg" onClick={handleRestart} className="h-14 px-10 rounded-full variant-outline border-2 hover:bg-primary hover:text-white transition-all">
                    <RotateCcw className="mr-2 h-5 w-5" /> Dib u bilaaw
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizApp;

