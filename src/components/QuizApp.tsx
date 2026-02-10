import { useState, useMemo, useEffect } from "react";
import { quizQuestions, type QuizQuestion } from "@/data/quizQuestions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Brain, Sparkles, Trophy, Target, Type, ListChecks, Send, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Screen = "welcome" | "quiz" | "results" | "study";
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

    const normalize = (str: string) =>
      str.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();

    const normalizedInput = normalize(directInput);
    const normalizedCorrect = normalize(question.options[question.correctIndex]);

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

  const studyData = [
    {
      category: "Generative AI & Education",
      questions: [
        { q: "Waa maxay Generative Artificial Intelligence?", a: "Waa tiknoolajiyad awood u leh inay abuurto qoraal, sawir, iyo cod cusub." },
        { q: "Maxaa loola jeedaa Higher Education?", a: "Waxaa loola jeedaa waxbarashada heerka jaamacadeed." },
        { q: "Sidee Generative AI uga caawisaa waxbarashada sare?", a: "Waxay ka caawisaa waxbaridda shakhsiyaysan, qiimaynta otomaatigga ah, iyo cilmi-baarista." },
        { q: "Dalalkee si weyn ugu adeegsada AI jaamacadaha?", a: "USA, China, iyo UK ayaa ah dalalka ugu horreeya." },
        { q: "Maxay Afrika uga faa’iideysaneysaa AI?", a: "Kordhinta helitaanka waxbarashada iyo taageerada ardayda." },
        { q: "Ardayda Soomaaliya sidee ayay u isticmaalaan AI?", a: "Inta badan waxay u isticmaalaan fahamka casharrada iyo cilmi-baarista." },
        { q: "Waa maxay caqabadaha anshaxeed ee AI?", a: "Khatarta anshaxeed sida daacadnimada waxbarashada (Academic integrity)." },
        { q: "Maxay Intelligent AI Systems qabtaan?", a: "Waxay fahmaan baahida ardayga waxayna la qabsadaan habkiisa barasho." },
        { q: "Waa maxay AI-driven digital technologies?", a: "Waxaa ka mid ah LMS, e-learning, iyo falanqaynta xogta (Analytics)." }
      ]
    },
    {
      category: "Cilmi-baarista (Methodology)",
      questions: [
        { q: "Maxaa lagu tilmaamaa research gap?", a: "Waa farqi aqooneed ama meel aan wali cilmi-baaris lagu samayn." },
        { q: "Waa maxay ujeeddada guud ee daraasadda?", a: "Baarista adeegsiga AI iyadoo la dheellitirayo hal-abuurnimo iyo anshax." },
        { q: "Maxuu muujinayaa conceptual framework?", a: "Wuxuu muujinayaa xiriirka ka dhexeeya IV (Independent Variable) iyo DV (Dependent Variable)." },
        { q: "Noocee cilmi-baaris ah ayaa la isticmaalay?", a: "Waxaa la isticmaalay Quantitative Research (Cilmi-baaris tiro koob ah)." },
        { q: "Immisa qof ayaa ka mid ah bulshada daraasadda?", a: "Tirada guud (Population) waa 200 oo qof." },
        { q: "Waa imisa sample size-ka daraasadda?", a: "Sample size-ka la doortay waa 133 qof." },
        { q: "Qalabkee ayaa loo adeegsaday ururinta xogta?", a: "Waxaa loo adeegsaday Questionnaires (Su'aalo-waydiin)." },
        { q: "Sidee loo hubiyay validity-ga qalabka?", a: "Waxaa lagu hubiyay CVI (Content Validity Index) iyo khubaro (Expert Judgment)." },
        { q: "Sidee loo cabbiray reliability-ga daraasadda?", a: "Waxaa lagu cabbiray Cronbach’s Alpha." },
        { q: "Software kee ayaa lagu falanqeeyay xogta?", a: "Waxaa lagu falanqeeyay SPSS v27." },
        { q: "Waa maxay xaddidaadaha daraasadda?", a: "Waxaa ka mid ah waqtiga, dhaqaalaha, iyo helitaanka xogta." }
      ]
    }
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-4 selection:bg-primary/20 flex-col gap-6 w-full max-w-7xl mx-auto">
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
              <CardContent className="flex flex-col items-center pb-10 gap-8">
                <div className="flex flex-col items-center gap-4 w-full">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">Dooro Nooca Quiz-ka</p>
                  <div className="flex flex-wrap justify-center gap-3">
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

                <div className="flex flex-col gap-3 w-full">
                  <Button size="lg" onClick={() => setScreen("quiz")} className="h-14 px-10 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95">
                    Bilow Quiz-ka <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setScreen("study")} className="h-14 px-10 text-lg rounded-xl border-2 hover:bg-muted transition-all gap-2">
                    <BookOpen className="h-5 w-5 text-primary" /> Baro casharka
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {screen === "study" && (
          <motion.div
            key="study"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full space-y-8 py-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card/50 p-6 rounded-2xl border-2 border-primary/10 glass">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-3xl font-black tracking-tight text-primary">Hage Barasho (FAQ)</h2>
                <p className="text-muted-foreground">Halkan ka barto su'aalaha iyo jawaabaha rasmiga ah.</p>
              </div>
              <Button size="lg" onClick={() => setScreen("welcome")} className="rounded-xl gap-2 h-12 px-8">
                <RotateCcw className="h-5 w-5" /> Ku laabo Hoyga
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {studyData.map((cat, idx) => (
                <div key={idx} className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground/90 px-2 sticky top-4 z-1 bg-background/80 py-2 backdrop-blur-sm rounded-lg">
                    <span className="h-10 w-1 bg-primary rounded-full"></span>
                    {cat.category}
                  </h3>
                  <div className="grid gap-4">
                    {cat.questions.map((item, i) => (
                      <Card key={i} className="glass border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                        <CardHeader className="p-5 flex flex-row items-start gap-4 space-y-0">
                          <div className="bg-primary/10 text-primary h-10 w-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg group-hover:bg-primary group-hover:text-white transition-colors">
                            {i + 1}
                          </div>
                          <div className="space-y-3">
                            <CardTitle className="text-lg font-bold leading-snug">{item.q}</CardTitle>
                            <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
                              <p className="text-primary font-semibold flex items-start gap-2 leading-relaxed">
                                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-green-500" />
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-10 pb-20">
              <Button size="lg" onClick={() => setScreen("quiz")} className="h-16 px-12 text-xl rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform gap-3">
                Hadda bilow Quiz-ka <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
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
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Su'aasha {currentIndex + 1} ee {total}</p>
                <h3 className="text-xl font-bold">Hore u soco</h3>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Score-kaaga</p>
                <p className="text-3xl font-black text-primary">{score}</p>
              </div>
            </div>

            <Progress value={progress} className="h-4 rounded-full bg-secondary border border-border/10" />

            <div className="flex justify-center">
              <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
                <Button variant={mode === "choice" ? "default" : "ghost"} size="sm" onClick={() => !answered && setMode("choice")} className="rounded-lg gap-2">
                  <ListChecks className="h-4 w-4" /> Xulasho
                </Button>
                <Button variant={mode === "direct" ? "default" : "ghost"} size="sm" onClick={() => !answered && setMode("direct")} className="rounded-lg gap-2">
                  <Type className="h-4 w-4" /> Qoraal
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass border-none shadow-2xl overflow-hidden rounded-3xl">
                  <CardHeader className="pb-6 pt-8">
                    <CardTitle className="text-2xl sm:text-3xl leading-relaxed font-black text-center px-4">
                      {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 pb-8 px-6">
                    {mode === "choice" ? (
                      <div className="grid gap-4">
                        {question.options.map((option, i) => {
                          const isCorrect = i === question.correctIndex;
                          const isSelected = i === selectedAnswer;
                          const showCorrect = answered && isCorrect;
                          const showWrong = answered && isSelected && !isCorrect;

                          return (
                            <motion.button
                              key={i}
                              whileHover={!answered ? { scale: 1.02, x: 8 } : {}}
                              whileTap={!answered ? { scale: 0.98 } : {}}
                              disabled={answered}
                              onClick={() => handleSelect(i)}
                              className={cn(
                                "option-button flex w-full items-center gap-5 rounded-2xl border-2 p-5 text-left transition-all duration-300",
                                !answered && "hover:border-primary/50 hover:bg-primary/5 border-border/40 bg-card/40",
                                answered && !isCorrect && !isSelected && "opacity-30 border-border/20 grayscale-[0.5]",
                                showCorrect && "border-green-500 bg-green-500/15 text-green-800 shadow-xl shadow-green-500/20",
                                showWrong && "border-destructive bg-destructive/15 text-destructive shadow-xl shadow-destructive/20"
                              )}
                            >
                              <span className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 text-lg font-black transition-all",
                                !answered && "bg-secondary text-secondary-foreground border-transparent",
                                showCorrect && "bg-green-500 text-white border-green-500 rotate-[360deg]",
                                showWrong && "bg-destructive text-white border-destructive",
                                answered && !isCorrect && !isSelected && "bg-muted text-muted-foreground"
                              )}>
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span className="flex-1 font-bold text-lg">{option}</span>
                              {showCorrect && <CheckCircle2 className="h-8 w-8 shrink-0 text-green-600 animate-in bounce-in" />}
                              {showWrong && <XCircle className="h-8 w-8 shrink-0 text-destructive animate-in" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    ) : (
                      <form onSubmit={handleDirectSubmit} className="space-y-6 max-w-lg mx-auto">
                        <div className="relative">
                          <Input
                            placeholder="Halkan ku qor jawaabta saxda ah..."
                            value={directInput}
                            onChange={(e) => setDirectInput(e.target.value)}
                            disabled={answered}
                            className={cn(
                              "h-20 px-8 text-xl rounded-2xl border-2 transition-all shadow-inner font-semibold",
                              isCorrectDirect === true && "border-green-500 bg-green-500/10",
                              isCorrectDirect === false && "border-destructive bg-destructive/10"
                            )}
                          />
                          {!answered && (
                            <Button type="submit" size="icon" className="absolute right-3 top-3 h-14 w-14 rounded-xl shadow-lg" disabled={!directInput.trim()}>
                              <Send className="h-6 w-6" />
                            </Button>
                          )}
                        </div>

                        <AnimatePresence>
                          {answered && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={cn(
                                "p-6 rounded-2xl flex flex-col items-center text-center gap-3 font-bold text-lg border-2",
                                isCorrectDirect ? "bg-green-500/10 text-green-700 border-green-500/20" : "bg-destructive/10 text-destructive border-destructive/20"
                              )}
                            >
                              {isCorrectDirect ? (
                                <><CheckCircle2 className="h-10 w-10 text-green-500" /> <span>WAXAAD QORTAY WAA SAX!</span></>
                              ) : (
                                <><XCircle className="h-10 w-10 text-destructive" /> <span>WAA KHALAD. JAWAABTU WAXAY AHAYD:</span> <span className="text-2xl font-black underline">{question.options[question.correctIndex]}</span></>
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
            <Card className="glass overflow-hidden rounded-3xl">
              <div className="h-2 premium-gradient" />
              <CardHeader className="space-y-4 text-center pb-2 pt-12">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <performance.icon className={cn("mx-auto h-24 w-24 mb-6", performance.color)} />
                  <CardTitle className="text-4xl font-black uppercase tracking-tighter">Natiijadaada</CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="text-center space-y-10 pb-12 px-10">
                <div className="relative inline-block">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", delay: 0.4, damping: 10 }}
                    className="text-8xl font-black tracking-tighter text-primary"
                  >
                    {percentage}%
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <p className="text-2xl font-bold text-muted-foreground uppercase tracking-widest leading-none">
                    SAX: <span className="text-foreground font-black text-4xl">{score}</span> / {total}
                  </p>
                  <div className="h-4 w-full bg-secondary rounded-full overflow-hidden border border-border/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full premium-gradient"
                    />
                  </div>
                  <p className={cn("text-3xl font-black tracking-tight mt-4 drop-shadow-sm", performance.color)}>{performance.message}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <Button size="lg" onClick={handleRestart} className="h-16 px-10 rounded-2xl text-xl font-bold shadow-xl transition-all hover:scale-105">
                    <RotateCcw className="mr-3 h-6 w-6" /> Dib u bilaaw
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setScreen("study")} className="h-16 px-10 rounded-2xl text-xl font-bold border-2 transition-all hover:bg-muted">
                    <BookOpen className="mr-3 h-6 w-6 text-primary" /> Dib u eeg casharka
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
