import { useState, useMemo } from "react";
import { quizQuestions, type QuizQuestion } from "@/data/quizQuestions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Brain, Sparkles, Trophy, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Screen = "welcome" | "quiz" | "results";

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const uiTranslations = {
  so: {
    welcomeTitle: "Somali AI Quiz Hub",
    welcomeDescription: "Ku soo dhowaad quiz-ka ku saabsan Generative AI iyo mustaqbalka waxbarashada sare ee Soomaaliya.",
    questionCount: "Su'aalood",
    interactive: "Interaktiv",
    startButton: "Bilow Quiz-ka",
    nextButton: "Xiga",
    resultsTitle: "Quiz-ka waa dhamaaday!",
    restartButton: "Dib u bilaaw",
    scoreLabel: "Waxaad heshay {score} su'aalood oo sax ah {total} ka mid ah.",
    performance80: "🎉 Aad baad u fiicantahay!",
    performance50: "👍 Waa lagu mahadsan yahay!",
    performance0: "📚 Sii baro!",
    progressLabel: "Su'aasha {current} ee {total}",
    scoreDisplay: "Score-kaaga",
    progressTitle: "Hore u soco",
  },
  en: {
    welcomeTitle: "Somali AI Quiz Hub",
    welcomeDescription: "Welcome to the quiz about Generative AI and the future of higher education in Somalia.",
    questionCount: "Questions",
    interactive: "Interactive",
    startButton: "Start Quiz",
    nextButton: "Next",
    resultsTitle: "Quiz Completed!",
    restartButton: "Restart Quiz",
    scoreLabel: "You got {score} correct questions out of {total}.",
    performance80: "🎉 Excellent job!",
    performance50: "👍 Well done!",
    performance0: "📚 Keep learning!",
    progressLabel: "Question {current} of {total}",
    scoreDisplay: "Your Score",
    progressTitle: "Progress",
  }
};

function shuffleWithMapping(optionsSo: string[], optionsEn: string[], correctIndex: number) {
  const correctOptionSo = optionsSo[correctIndex];

  const indices = optionsSo.map((_, i) => i);
  const shuffledIndices = shuffleArray(indices);

  const finalOptionsSo = shuffledIndices.map(i => optionsSo[i]);
  const finalOptionsEn = shuffledIndices.map(i => optionsEn[i]);

  return {
    shuffledSo: finalOptionsSo,
    shuffledEn: finalOptionsEn,
    newCorrectIndex: finalOptionsSo.indexOf(correctOptionSo),
  };
}

const QuizApp = () => {
  const [lang, setLang] = useState<"so" | "en">("so");
  const [screen, setScreen] = useState<Screen>("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  const t = uiTranslations[lang];
  const total = quizQuestions.length;

  const shuffledQuestions = useMemo<QuizQuestion[]>(() => {
    const shuffledQ = shuffleArray(quizQuestions);
    return shuffledQ.map((q: QuizQuestion): QuizQuestion => {
      const { shuffledSo, shuffledEn, newCorrectIndex } = shuffleWithMapping(q.options.so, q.options.en, q.correctIndex);
      return {
        ...q,
        options: { so: shuffledSo, en: shuffledEn },
        correctIndex: newCorrectIndex
      };
    });
  }, [shuffleKey]);

  const question = shuffledQuestions[currentIndex];
  const answered = selectedAnswer !== null;
  const progress = ((currentIndex + (answered ? 1 : 0)) / total) * 100;

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev + 1 < total) {
        setSelectedAnswer(null);
        return prev + 1;
      } else {
        setScreen("results");
        return prev;
      }
    });
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "so" ? "so" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelect = (index: number) => {
    if (answered) return;

    const selectedOptionText = question.options[lang][index];
    speakText(selectedOptionText);

    setSelectedAnswer(index);
    if (index === question.correctIndex) {
      setScore((s) => s + 1);
    }
    setTimeout(handleNext, 2000);
  };

  const handleRestart = () => {
    setScreen("welcome");
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShuffleKey((k) => k + 1);
  };

  const percentage = Math.round((score / total) * 100);

  const getPerformanceData = () => {
    if (percentage >= 80) return { message: t.performance80, color: "text-green-500", icon: Trophy };
    if (percentage >= 50) return { message: t.performance50, color: "text-blue-500", icon: Sparkles };
    return { message: t.performance0, color: "text-orange-500", icon: Brain };
  };

  const performance = getPerformanceData();

  return (
    <div className="flex min-h-screen items-center justify-center p-4 selection:bg-primary/20 flex-col gap-4">
      <div className="flex gap-2 mb-4 bg-muted p-1 rounded-full shadow-inner">
        <Button
          variant={lang === "so" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLang("so")}
          className="rounded-full px-6 transition-all"
        >
          Soomaali
        </Button>
        <Button
          variant={lang === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLang("en")}
          className="rounded-full px-6 transition-all"
        >
          English
        </Button>
      </div>

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
                    {t.welcomeTitle}
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto">
                    {t.welcomeDescription}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-10">
                <div className="flex items-center gap-8 mb-8 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>{total} {t.questionCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>{t.interactive}</span>
                  </div>
                </div>
                <Button size="lg" onClick={() => setScreen("quiz")} className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95">
                  {t.startButton} <ArrowRight className="ml-2 h-5 w-5" />
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
                  {t.progressLabel.replace("{current}", (currentIndex + 1).toString()).replace("{total}", total.toString())}
                </p>
                <h3 className="text-xl font-bold">{t.progressTitle}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">{t.scoreDisplay}</p>
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
                      {question.question[lang]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3 pt-4">
                    {question.options[lang].map((option, i) => {
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
                  <CardTitle className="text-3xl">{t.resultsTitle}</CardTitle>
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
                    {t.scoreLabel.replace("{score}", score.toString()).replace("{total}", total.toString())}
                  </p>
                </div>

                <div className="px-8 flex flex-col items-center gap-6">
                  <Progress value={percentage} className="h-4 rounded-full" />
                  <p className={cn("text-2xl font-bold", performance.color)}>{performance.message}</p>
                  <Button size="lg" onClick={handleRestart} className="h-14 px-10 rounded-full variant-outline border-2 hover:bg-primary hover:text-white transition-all">
                    <RotateCcw className="mr-2 h-5 w-5" /> {t.restartButton}
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

