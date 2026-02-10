export interface QuizQuestion {
  question: {
    so: string;
    en: string;
  };
  options: {
    so: string[];
    en: string[];
  };
  correctIndex: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: {
      so: "Generative AI waxa uu awood u leeyahay inuu:",
      en: "Generative AI is capable of:",
    },
    options: {
      so: ["Kaydiyo xog keliya", "Abuuro qoraal, sawir, iyo cod", "Maareeyo internet"],
      en: ["Saving data only", "Creating text, images, and audio", "Managing the internet"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Higher Education waxaa loola jeedaa:",
      en: "Higher Education refers to:",
    },
    options: {
      so: ["Dugsi hoose", "Waxbarashada jaamacadeed", "Tababar shaqo"],
      en: ["Primary school", "University education", "Vocational training"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "AI heer caalami ah waxaa si weyn u adeegsada:",
      en: "Globally, AI is widely used by:",
    },
    options: {
      so: ["Dalalka soo koraya", "USA, China, UK", "Afrika oo dhan"],
      en: ["Developing countries", "USA, China, UK", "All of Africa"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Afrika gudaheeda AI waxaa loo adeegsadaa:",
      en: "Within Africa, AI is used for:",
    },
    options: {
      so: ["Ciyaaro", "Taageeridda waxbarashada", "Suuq-geyn"],
      en: ["Games", "Supporting education", "Marketing"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Soomaaliya ardaydu AI waxay u isticmaalaan:",
      en: "In Somalia, students use AI for:",
    },
    options: {
      so: ["Madadaalo", "Fahamka casharro", "Isgaarsiin"],
      en: ["Entertainment", "Understanding lessons", "Communication"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Mid ka mid ah dhibaatooyinka AI waa:",
      en: "One of the problems of AI is:",
    },
    options: {
      so: ["Internet badan", "Khatar anshaxeed", "Macallimiin yar"],
      en: ["Excessive internet usage", "Ethical risks", "Fewer teachers"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Xaaladda la doonayo waa:",
      en: "The desired situation is:",
    },
    options: {
      so: ["In AI la mamnuuco", "AI nidaamsan oo anshax leh", "AI la iska ilaawo"],
      en: ["To ban AI", "Regulated and ethical AI", "To forget about AI"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Research gap waxaa loola jeedaa:",
      en: "Research gap means:",
    },
    options: {
      so: ["Xog buuxda", "Farqi cilmi-baaris", "Natiijooyin"],
      en: ["Complete data", "Research gap", "Results"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Ujeeddada guud ee daraasaddu waa:",
      en: "The general objective of the study is:",
    },
    options: {
      so: ["Mamnuucid AI", "Dheellitir innovation iyo ethics", "Qiimeyn arday"],
      en: ["Banning AI", "Balancing innovation and ethics", "Evaluating students"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Intelligent AI systems waxay:",
      en: "Intelligent AI systems:",
    },
    options: {
      so: ["Kaydiyaan xog", "La qabsadaan ardayga", "Sameeyaan xisaab"],
      en: ["Store data", "Adapt to the student", "Perform calculations"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "AI-driven technologies waxaa ka mid ah:",
      en: "AI-driven technologies include:",
    },
    options: {
      so: ["LMS", "Buugaag", "Qalin"],
      en: ["LMS", "Books", "Pen"],
    },
    correctIndex: 0,
  },
  {
    question: {
      so: "Conceptual framework wuxuu muujinayaa:",
      en: "The conceptual framework shows:",
    },
    options: {
      so: ["Xiriirka IV & DV", "Miisaaniyad", "Waqti"],
      en: ["Relationship between IV & DV", "Budget", "Time"],
    },
    correctIndex: 0,
  },
  {
    question: {
      so: "Nooca cilmi-baarista waa:",
      en: "The type of research is:",
    },
    options: {
      so: ["Qualitative", "Quantitative", "Mixed"],
      en: ["Qualitative", "Quantitative", "Mixed"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Tirada population-ka waa:",
      en: "The population size is:",
    },
    options: {
      so: ["100", "200", "300"],
      en: ["100", "200", "300"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Sample size-ka waa:",
      en: "The sample size is:",
    },
    options: {
      so: ["120", "133", "150"],
      en: ["120", "133", "150"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Qalabka xog ururinta waa:",
      en: "The data collection tool is:",
    },
    options: {
      so: ["Questionnaires", "Cameras", "Audio"],
      en: ["Questionnaires", "Cameras", "Audio"],
    },
    correctIndex: 0,
  },
  {
    question: {
      so: "Validity waxaa lagu hubiyay:",
      en: "Validity was verified by:",
    },
    options: {
      so: ["CVI & expert judgment", "Guess", "Random"],
      en: ["CVI & expert judgment", "Guess", "Random"],
    },
    correctIndex: 0,
  },
  {
    question: {
      so: "Reliability waxaa lagu cabbiray:",
      en: "Reliability was measured by:",
    },
    options: {
      so: ["GPA", "Cronbach’s Alpha", "IQ"],
      en: ["GPA", "Cronbach’s Alpha", "IQ"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Xogta waxaa lagu falanqeeyay:",
      en: "The data was analyzed using:",
    },
    options: {
      so: ["Word", "SPSS", "Paint"],
      en: ["Word", "SPSS", "Paint"],
    },
    correctIndex: 1,
  },
  {
    question: {
      so: "Mid ka mid ah xaddidaadaha daraasadda waa:",
      en: "One of the study limitations is:",
    },
    options: {
      so: ["Waqti & dhaqaale", "Arday badan", "Software"],
      en: ["Time & resources", "Too many students", "Software"],
    },
    correctIndex: 0,
  },
];
