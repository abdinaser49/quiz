export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const quizQuestions: QuizQuestion[] = [
  // 1–10
  {
    question: "Generative AI waa tiknoolajiyad awood u leh inay?",
    options: ["Kaydiso xogta kaliya", "Abuurto qoraal, sawir, cod iyo video cusub", "Kaliya xisaabiso tirooyin", "Maamusho internet-ka"],
    correctIndex: 1,
  },
  {
    question: "Higher Education waxaa loola jeedaa?",
    options: ["Waxbarashada hoose", "Tababar shaqo", "Waxbarashada jaamacadeed", "Barashada online"],
    correctIndex: 2,
  },
  {
    question: "Heer caalami ah, AI waxaa loo adeegsadaa?",
    options: ["Waxbarid shakhsiyeed, qiimeyn otomaatig ah, cilmi-baaris", "Kaydinta xogta", "Suuq geynta", "Cayaaraha online-ka"],
    correctIndex: 0,
  },
  {
    question: "Afrika gudaheeda, AI waxaa loo adeegsadaa si loo?",
    options: ["Kaliya macallimiinta tababar loo siiyo", "Kordhiyo helitaanka waxbarasho iyo taageero arday", "Maamulka jaamacadaha beddelo", "Sameynta apps"],
    correctIndex: 1,
  },
  {
    question: "Soomaaliya, isticmaalka AI sida ChatGPT ee jaamacadaha waa?",
    options: ["Si nidaamsan oo sharci ah", "Si aan nidaam lahayn, hagitaan anshaxeed ma jiro", "Kaliya loogu isticmaalo software", "La joojiyay"],
    correctIndex: 1,
  },
  {
    question: "Problem statement-ka daraasadda wuxuu tilmaamayaa?",
    options: ["Xaaladda dhabta ah ee jaamacadaha iyo baahida loo qabo AI sharci leh", "Tirada ardayda", "Xeerarka caalamiga ah", "Apps-ka AI"],
    correctIndex: 0,
  },
  {
    question: "Farqiga cilmi-baariseed (research gap) waa?",
    options: ["Meesha cilmi-baaristu ka dhacdo", "Farqiga aqooneed ee wali la baarin", "Waqtiga daraasadda", "Tirada respondents"],
    correctIndex: 1,
  },
  {
    question: "Ujeeddada guud ee daraasadda waa?",
    options: ["Sameynta software cusub", "Baarista adeegsiga AI iyadoo la dheellitirayo hal-abuurnimo iyo anshax", "Qiimeynta website", "Suuq geynta AI"],
    correctIndex: 1,
  },
  {
    question: "Specific objectives-ka daraasadda waxaa ka mid ah?",
    options: ["Ogaanshaha heerka adeegsiga Advanced AI Technologies", "Dhisidda jaamacad cusub", "Kaliya barashada coding", "Ka ganacsiga AI"],
    correctIndex: 0,
  },
  {
    question: "Su'aalaha cilmi-baarista waxaa ka mid ah?",
    options: ["Waa maxay saameynta Intelligent AI Systems?", "Maxaa lagu sameeyay Excel?", "Kaliya software cusub samee", "Sida internet-ka loo isticmaalo"],
    correctIndex: 0,
  },
  // 11–20
  {
    question: "Scope-ka juqraafiyeed ee daraasadda waa?",
    options: ["Nairobi iyo Cairo", "Mogadishu, Hargeisa, Garowe, Kismayo", "London iyo Paris", "New York iyo Tokyo"],
    correctIndex: 1,
  },
  {
    question: "Scope-ka waqtiga daraasadda waa?",
    options: ["Hal bil", "Lix bilood (Dec 2025 – June 2026)", "Hal sano", "Saddex bilood"],
    correctIndex: 1,
  },
  {
    question: "Significance-ka daraasadda waxaa ka faa'iidaya?",
    options: ["Siyaasad-dejiyeyaasha waxbarashada, maamulka jaamacadaha, macallimiinta, ardayda, cilmi-baarayaasha", "Kaliya ardayda", "Kaliya macallimiinta", "Kaliya shirkadaha AI"],
    correctIndex: 0,
  },
  {
    question: "Advanced AI Technologies waxaa loo adeegsadaa?",
    options: ["Kaliya apps-ka mobile-ka", "Baridda, qiimeynta, cilmi-baarista", "Kaydinta xogta", "Games"],
    correctIndex: 1,
  },
  {
    question: "Intelligent AI Systems waxay?",
    options: ["Fahmaan ardayga, la qabsadaan baahidiisa", "Kaliya xisaabiyaan tirooyin", "Kaliya software cusub abuuraan", "Ma isticmaalaan waxbarashada"],
    correctIndex: 0,
  },
  {
    question: "AI-Driven Digital Technologies waxaa ka mid ah?",
    options: ["LMS, e-learning, analytics", "Qorista warqadaha", "Kaliya Excel", "Kaliya software hardware"],
    correctIndex: 0,
  },
  {
    question: "Study population waa?",
    options: ["100", "133", "200", "50"],
    correctIndex: 2,
  },
  {
    question: "Sample size-ka daraasadda waa?",
    options: ["133", "200", "150", "100"],
    correctIndex: 0,
  },
  {
    question: "Sampling technique-ka la isticmaalay waa?",
    options: ["Stratified sampling", "Convenience random sampling", "Systematic sampling", "Purposive sampling"],
    correctIndex: 1,
  },
  {
    question: "Primary data waxaa lagu ururiyaa?",
    options: ["Questionnaires", "Books", "Internet", "Newspaper"],
    correctIndex: 0,
  },
  // 21–30
  {
    question: "Validity-ga qalabka waxaa lagu hubiyaa?",
    options: ["Regression analysis", "Expert judgment iyo CVI", "Frequency", "Cronbach's Alpha"],
    correctIndex: 1,
  },
  {
    question: "Reliability-ga qalabka waxaa lagu cabiraa?",
    options: ["CVI", "Cronbach's Alpha", "SPSS charts", "Frequencies"],
    correctIndex: 1,
  },
  {
    question: "Data analysis waxaa lagu sameeyaa?",
    options: ["Excel", "SPSS v27 (frequencies, charts, regression)", "PowerPoint", "Word"],
    correctIndex: 1,
  },
  {
    question: "Ethical consideration waxay ka hadlaysaa?",
    options: ["Ilaalinta ka-qaybgalayaasha iyo oggolaanshaha jaamacadeed", "Excel analysis", "Falanqaynta charts", "Coding"],
    correctIndex: 0,
  },
  {
    question: "Limitations-ka daraasadda waxaa ka mid ah?",
    options: ["Waqti, dhaqaale, helitaanka xog sax ah", "Helitaanka internet", "Apps design", "Barnaamijyada mobile"],
    correctIndex: 0,
  },
  {
    question: "Conceptual framework-ka daraasadda wuxuu muujinayaa?",
    options: ["Xiriirka IV (Generative AI) iyo DV (Higher Education)", "Xogta Excel", "Software development", "Apps design"],
    correctIndex: 0,
  },
  {
    question: "Qodobka \"Balancing Innovation with Ethical Perspectives\" wuxuu ka dhigan yahay?",
    options: ["Kaliya hal-abuurnimo", "Kaliya anshax", "Isku dheellitirid hal-abuurnimo iyo anshax", "Kaliya cashar online"],
    correctIndex: 2,
  },
  {
    question: "Advanced AI Technologies iyo Intelligent AI Systems waxay?",
    options: ["Kaliya software abuuraan", "Hagaajiyaan waxbaridda, qiimeynta, cilmi-baarista", "Kaliya hardware design", "Kaliya apps mobile"],
    correctIndex: 1,
  },
  {
    question: "AI waxay halis ku noqon kartaa?",
    options: ["Daacadnimada waxbarashada haddii si aan nidaam lahayn loo isticmaalo", "Kaliya barashada coding", "Kaliya hardware design", "Kaliya e-learning"],
    correctIndex: 0,
  },
  {
    question: "Qeexidda erayada muhiimka ah (Operational Definitions) waxaa ka mid ah?",
    options: ["Generative AI, Higher Education, Advanced AI Technologies", "Excel, Word, PowerPoint", "Apps, Software, Hardware", "Coding, Gaming, Networking"],
    correctIndex: 0,
  },
  // 31–40
  {
    question: "ChatGPT waxaa isticmaala ardaydu si ay u?",
    options: ["U fahmaan casharrada", "Kaliya software abuuraan", "Kaliya hardware design", "Games sameeyaan"],
    correctIndex: 0,
  },
  {
    question: "Heerka aqoonta AI ee macallimiinta iyo ardayda Soomaaliya waa?",
    options: ["Sare", "Dhexdhexaad", "Hoose", "Aad u sare"],
    correctIndex: 2,
  },
  {
    question: "AI waxaa lagu isticmaalaa waxbaridda si loo?",
    options: ["Kordhiyo waxtarka iyo wax-soo-saarka", "Kaliya kaydinta xogta", "Kaliya ciyaaro", "Kaliya software design"],
    correctIndex: 0,
  },
  {
    question: "LMS waxaa loola jeedaa?",
    options: ["Learning Management System", "Local Management Software", "Learning Mobile System", "Leadership Management System"],
    correctIndex: 0,
  },
  {
    question: "E-learning waa?",
    options: ["Waxbarasho online", "Cashar offline", "App software", "Excel sheets"],
    correctIndex: 0,
  },
  {
    question: "Analytics waxaa loo adeegsadaa?",
    options: ["Falanqaynta xogta waxbarashada", "Qorista apps", "Hardware", "Games"],
    correctIndex: 0,
  },
  {
    question: "Advanced AI Technologies waxay taageeraan?",
    options: ["Qiimeynta ardayda", "Kaliya software", "Kaliya hardware", "Kaliya internet"],
    correctIndex: 0,
  },
  {
    question: "Intelligent AI Systems waxay fahmaan?",
    options: ["Baahida ardayga", "Kaliya tirada ardayda", "Kaliya software", "Kaliya games"],
    correctIndex: 0,
  },
  {
    question: "AI-Driven Digital Technologies waxay bixiyaan?",
    options: ["Hab waxbarasho casri ah", "Kaliya coding", "Kaliya hardware", "Kaliya books"],
    correctIndex: 0,
  },
  {
    question: "Daraasaddu waxay diiradda saareysaa?",
    options: ["Generative AI iyo Higher Education", "Kaliya software", "Kaliya hardware", "Kaliya e-learning"],
    correctIndex: 0,
  },
  // 41–50
  {
    question: "Waxaa jira baahi cilmi-baaris sababtoo ah?",
    options: ["AI lama nidaamin", "AI waa sharci", "AI ma jiro", "AI waa hardware"],
    correctIndex: 0,
  },
  {
    question: "AI waa in lagu dhex daro jaamacadaha si?",
    options: ["Sharciyeysan, nidaamsan, oo anshax leh", "Kaliya apps design", "Kaliya hardware", "Kaliya coding"],
    correctIndex: 0,
  },
  {
    question: "AI waxay kordhisaa?",
    options: ["Wax-soo-saarka cilmi-baarista", "Kaliya hardware design", "Kaliya apps", "Kaliya xog kaydinta"],
    correctIndex: 0,
  },
  {
    question: "Daraasaddu waxay socon doontaa?",
    options: ["3 bilood", "Lix bilood", "Hal bil", "Hal sano"],
    correctIndex: 1,
  },
  {
    question: "Daraasaddu waxay muhiim u tahay?",
    options: ["Siyaasad-dejiyeyaasha, maamulka jaamacadaha, macallimiinta, ardayda", "Kaliya software developers", "Kaliya ardayda", "Kaliya teachers"],
    correctIndex: 0,
  },
  {
    question: "MCQs quiz-ka website-ka waa in?",
    options: ["Jawaabaha mar kasta isku beddelaan", "Had iyo jeer isku mid ahaadaan", "Kaliya hal jawaab la muujiyo", "Kaliya offline"],
    correctIndex: 0,
  },
  {
    question: "Quiz interactive wuxuu ka caawiyaa ardayda?",
    options: ["Fahamka Generative AI", "Kaliya coding", "Kaliya hardware", "Kaliya software"],
    correctIndex: 0,
  },
  {
    question: "Progress bar-ka wuxuu muujinayaa?",
    options: ["Heerkaga quiz-ka", "Kaliya score", "Kaliya su'aalaha saxda ah", "Kaliya su'aalaha khaldan"],
    correctIndex: 0,
  },
  {
    question: "Jawaabaha quiz-ka waa in lagu shubo si?",
    options: ["Mar kasta isku beddelaan", "Had iyo jeer isku mid ahaadaan", "Kaliya hal su'aal", "Kaliya offline"],
    correctIndex: 0,
  },
  {
    question: "Restart quiz button wuxuu u oggolaanayaa ardayga?",
    options: ["Inuu quiz-ka mar kale bilaabo", "Kaliya score daawado", "Kaliya su'aal saxdo", "Kaliya e-learning"],
    correctIndex: 0,
  },
];
