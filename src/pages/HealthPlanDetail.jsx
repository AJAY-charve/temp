import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight, Info } from "lucide-react";

// LOGO IMPORT
import logo from "../assets/daibmetalogo.jpeg";

import { BMI_THEME, PLAN_ART } from "./BmiCheck";

const NAVY = "#14284b";

/* ============ BMI CATEGORIES DATA ============ */
const BMI_CATEGORIES = {
  underweight: {
    range: "<18.5",
    diet: [
      "Increase calories gradually with nutritious foods.",
      "Eat 3 main meals and 2–3 healthy snacks.",
      "Include milk, curd, paneer, eggs, pulses, nuts and healthy fats.",
      "Ensure adequate protein intake.",
      "Avoid relying on junk food for weight gain.",
    ],
    activity: [
      "Perform strength training 2–3 days/week.",
      "Include light to moderate walking or cycling.",
      "Start gradually and avoid excessive endurance exercise if struggling to gain weight.",
      "Focus on improving muscle mass.",
    ],
    advice: [
      "Aim for gradual, healthy weight gain.",
      "Monitor weight every 1–2 weeks.",
      "Maintain 7–9 hours of sleep.",
      "Consult a doctor to evaluate unexplained low weight or weight loss.",
    ],
  },
  normal: {
    range: "18.5–22.9",
    diet: [
      "Follow a balanced diet with vegetables, fruits, whole grains and protein.",
      "Maintain appropriate portion sizes.",
      "Limit sugary drinks and ultra-processed foods.",
      "Stay adequately hydrated.",
    ],
    activity: [
      "Aim for 150–300 minutes/week of moderate aerobic activity.",
      "Include strength training at least 2 days/week.",
      "Reduce prolonged sitting.",
      "Choose enjoyable activities for consistency.",
    ],
    advice: [
      "Maintain your healthy weight.",
      "Monitor weight periodically.",
      "Maintain 7–9 hours of sleep.",
      "Avoid smoking and limit alcohol.",
      "Remember that normal BMI does not always exclude excess abdominal fat.",
    ],
  },
  overweight: {
    range: "23.0–24.9",
    diet: [
      "Create a modest calorie deficit if weight loss is appropriate.",
      "Increase vegetables, fibre and lean protein.",
      "Reduce sugary drinks, fried foods and oversized portions.",
      "Choose whole grains instead of refined carbohydrates.",
    ],
    activity: [
      "Gradually aim for 150–300 minutes/week of moderate aerobic activity.",
      "Include strength training 2–3 days/week.",
      "Walk after meals when practical.",
      "Increase daily steps progressively.",
    ],
    advice: [
      "Consider an initial 5% weight-loss target if clinically appropriate.",
      "Monitor weight and waist circumference.",
      "Check BP, blood glucose and lipids based on risk.",
      "Seek medical advice for associated health conditions.",
    ],
  },
  obesity1: {
    range: "25.0–29.9",
    diet: [
      "Follow an individualised calorie-restricted diet.",
      "Prioritise protein, vegetables and fibre.",
      "Limit calorie-dense snacks and sweetened beverages.",
      "Consider dietitian-guided meal planning.",
    ],
    activity: [
      "Begin with low-impact aerobic exercise as tolerated.",
      "Progress towards 150–300 minutes/week.",
      "Include resistance training 2–3 days/week.",
      "Avoid sudden high-intensity workouts if unaccustomed.",
    ],
    advice: [
      "Aim initially for 5–10% weight loss where appropriate.",
      "Monitor weight and waist circumference.",
      "Screen for diabetes, hypertension, dyslipidaemia and fatty liver based on clinical assessment.",
      "Consult a doctor for structured obesity management.",
    ],
  },
  obesity2: {
    range: "30.0–34.9",
    diet: [
      "Use a structured, individualised calorie-deficit plan.",
      "Ensure sufficient protein and nutritional adequacy.",
      "Reduce refined carbohydrates, sugary drinks and high-calorie snacks.",
      "Seek dietitian supervision for sustainable changes.",
    ],
    activity: [
      "Start with low-impact walking, cycling or water-based exercise.",
      "Increase duration and intensity gradually.",
      "Include adapted resistance exercises.",
      "Consider supervised exercise if mobility or medical conditions limit activity.",
    ],
    advice: [
      "Arrange a comprehensive medical assessment.",
      "Evaluate obesity-related complications and sleep apnoea symptoms.",
      "Discuss evidence-based weight-management medicines when eligible.",
      "Consider metabolic/bariatric surgery assessment when indicated.",
    ],
  },
  obesity3: {
    range: "≥35.0",
    diet: [
      "Follow a medically supervised, individualised nutrition plan.",
      "Prioritise adequate protein, vegetables and micronutrients.",
      "Avoid crash diets and unsupervised extreme calorie restriction.",
      "Seek regular dietitian follow-up.",
    ],
    activity: [
      "Begin with gentle, low-impact activity within individual tolerance.",
      "Consider chair exercises, water-based activity or short walks.",
      "Increase activity gradually under appropriate supervision.",
      "Include strength and mobility exercises as feasible.",
    ],
    advice: [
      "Seek comprehensive obesity-specialist evaluation.",
      "Assess for diabetes, sleep apnoea, cardiovascular and metabolic complications.",
      "Discuss pharmacotherapy and bariatric/metabolic surgery eligibility.",
      "Set realistic long-term goals with regular follow-up.",
    ],
  },
};

/* ============ HINDI TRANSLATIONS ============ */
const HINDI_PLANS = {
  underweight: {
    diet: [
      "पौष्टिक आहार के साथ धीरे-धीरे कैलोरी बढ़ाएँ।",
      "3 मुख्य भोजन और 2–3 स्वस्थ स्नैक्स लें।",
      "दूध, दही, पनीर, अंडे, दालें, मेवे और स्वस्थ वसा शामिल करें।",
      "पर्याप्त प्रोटीन का सेवन सुनिश्चित करें।",
      "वजन बढ़ाने के लिए जंक फूड पर निर्भर न रहें।",
    ],
    activity: [
      "सप्ताह में 2–3 दिन शक्ति प्रशिक्षण करें।",
      "हल्की से मध्यम चलना या साइकिल चलाना शामिल करें।",
      "धीरे-धीरे शुरू करें और अत्यधिक सहनशक्ति व्यायाम से बचें।",
      "मांसपेशियों को बढ़ाने पर ध्यान दें।",
    ],
    advice: [
      "धीरे-धीरे स्वस्थ वजन बढ़ाने का लक्ष्य रखें।",
      "हर 1–2 सप्ताह में वजन की निगरानी करें।",
      "7–9 घंटे की नींद लें।",
      "अस्पष्ट कम वजन के लिए डॉक्टर से परामर्श करें।",
    ],
  },
  normal: {
    diet: [
      "सब्जियों, फलों, साबुत अनाज और प्रोटीन के साथ संतुलित आहार लें।",
      "उचित मात्रा में भोजन करें।",
      "मीठे पेय और अति-प्रसंस्कृत खाद्य पदार्थों को सीमित करें।",
      "पर्याप्त हाइड्रेटेड रहें।",
    ],
    activity: [
      "सप्ताह में 150–300 मिनट मध्यम एरोबिक गतिविधि करें।",
      "सप्ताह में कम से कम 2 दिन शक्ति प्रशिक्षण करें।",
      "लंबे समय तक बैठने से बचें।",
      "निरंतरता के लिए मनोरंजक गतिविधियाँ चुनें।",
    ],
    advice: [
      "अपना स्वस्थ वजन बनाए रखें।",
      "समय-समय पर वजन की निगरानी करें।",
      "7–9 घंटे की नींद लें।",
      "धूम्रपान से बचें और शराब सीमित करें।",
      "सामान्य BMI पेट की अतिरिक्त चर्बी को बाहर नहीं करता।",
    ],
  },
  overweight: {
    diet: [
      "यदि उचित हो तो मामूली कैलोरी कमी करें।",
      "सब्जियाँ, फाइबर और दुबला प्रोटीन बढ़ाएँ।",
      "मीठे पेय, तले हुए खाद्य पदार्थ और बड़े हिस्से कम करें।",
      "परिष्कृत कार्बोहाइड्रेट के बजाय साबुत अनाज चुनें।",
    ],
    activity: [
      "धीरे-धीरे 150–300 मिनट/सप्ताह मध्यम एरोबिक गतिविधि का लक्ष्य रखें।",
      "सप्ताह में 2–3 दिन शक्ति प्रशिक्षण करें।",
      "भोजन के बाद टहलें।",
      "दैनिक कदम धीरे-धीरे बढ़ाएँ।",
    ],
    advice: [
      "यदि चिकित्सकीय रूप से उपयुक्त हो तो 5% वजन घटाने का लक्ष्य रखें।",
      "वजन और कमर की परिधि की निगरानी करें।",
      "जोखिम के आधार पर BP, रक्त शर्करा और लिपिड की जाँच करें।",
      "संबंधित स्वास्थ्य स्थितियों के लिए चिकित्सकीय सलाह लें।",
    ],
  },
  obesity1: {
    diet: [
      "व्यक्तिगत कैलोरी-प्रतिबंधित आहार का पालन करें।",
      "प्रोटीन, सब्जियों और फाइबर को प्राथमिकता दें।",
      "कैलोरी-घने स्नैक्स और मीठे पेय सीमित करें।",
      "आहार विशेषज्ञ-निर्देशित भोजन योजना पर विचार करें।",
    ],
    activity: [
      "सहनशीलता के अनुसार कम-प्रभाव वाले एरोबिक व्यायाम से शुरू करें।",
      "150–300 मिनट/सप्ताह की ओर बढ़ें।",
      "सप्ताह में 2–3 दिन प्रतिरोध प्रशिक्षण करें।",
      "अभ्यस्त न होने पर अचानक उच्च-तीव्रता वर्कआउट से बचें।",
    ],
    advice: [
      "शुरू में 5–10% वजन घटाने का लक्ष्य रखें।",
      "वजन और कमर की परिधि की निगरानी करें।",
      "मधुमेह, उच्च रक्तचाप, डिस्लिपिडेमिया और फैटी लिवर की जाँच करें।",
      "संरचित मोटापा प्रबंधन के लिए डॉक्टर से परामर्श करें।",
    ],
  },
  obesity2: {
    diet: [
      "संरचित, व्यक्तिगत कैलोरी-कमी योजना का उपयोग करें।",
      "पर्याप्त प्रोटीन और पोषण सुनिश्चित करें।",
      "परिष्कृत कार्बोहाइड्रेट, मीठे पेय और उच्च-कैलोरी स्नैक्स कम करें।",
      "टिकाऊ परिवर्तनों के लिए आहार विशेषज्ञ की देखरेख लें।",
    ],
    activity: [
      "कम-प्रभाव वाली चलना, साइकिल चलाना या पानी-आधारित व्यायाम से शुरू करें।",
      "धीरे-धीरे अवधि और तीव्रता बढ़ाएँ।",
      "अनुकूलित प्रतिरोध व्यायाम शामिल करें।",
      "यदि गतिशीलता सीमित हो तो पर्यवेक्षित व्यायाम पर विचार करें।",
    ],
    advice: [
      "व्यापक चिकित्सा मूल्यांकन की व्यवस्था करें।",
      "मोटापे से संबंधित जटिलताओं और स्लीप एपनिया के लक्षणों का मूल्यांकन करें।",
      "पात्र होने पर साक्ष्य-आधारित वजन-प्रबंधन दवाओं पर चर्चा करें।",
      "संकेत मिलने पर मेटाबॉलिक/बैरिएट्रिक सर्जरी मूल्यांकन पर विचार करें।",
    ],
  },
  obesity3: {
    diet: [
      "चिकित्सकीय पर्यवेक्षण वाली व्यक्तिगत पोषण योजना का पालन करें।",
      "पर्याप्त प्रोटीन, सब्जियाँ और सूक्ष्म पोषक तत्वों को प्राथमिकता दें।",
      "क्रैश डाइट और असुरक्षित अत्यधिक कैलोरी प्रतिबंध से बचें।",
      "नियमित आहार विशेषज्ञ फॉलो-अप लें।",
    ],
    activity: [
      "व्यक्तिगत सहनशीलता के भीतर कोमल, कम-प्रभाव वाली गतिविधि से शुरू करें।",
      "कुर्सी व्यायाम, पानी-आधारित गतिविधि या छोटी सैर पर विचार करें।",
      "उचित पर्यवेक्षण में धीरे-धीरे गतिविधि बढ़ाएँ।",
      "जहाँ संभव हो शक्ति और गतिशीलता व्यायाम शामिल करें।",
    ],
    advice: [
      "व्यापक मोटापा-विशेषज्ञ मूल्यांकन लें।",
      "मधुमेह, स्लीप एपनिया, हृदय और चयापचय जटिलताओं का आकलन करें।",
      "फार्माकोथेरेपी और बैरिएट्रिक/मेटाबॉलिक सर्जरी पात्रता पर चर्चा करें।",
      "नियमित फॉलो-अप के साथ वास्तविक दीर्घकालिक लक्ष्य निर्धारित करें।",
    ],
  },
};

const DISCLAIMER = {
  en: "These are general recommendations. Consult your doctor for personalised advice.",
  hi: "चिकित्सकीय सलाह: ये सामान्य सुझाव हैं। व्यक्तिगत सलाह के लिए अपने डॉक्टर से परामर्श करें।",
};

/* ============ PLAN TYPE CONFIG ============ */
const PLAN_TYPES = {
  diet: { title: "Diet Plan", colorDark: "#2e8f3a" },
  activity: { title: "Physical Activity", colorDark: "#2f8cf0" },
  advice: { title: "Other Advice", colorDark: "#ea8a10" },
};

export default function HealthPlanDetail() {
  const { category, planType } = useParams();
  const navigate = useNavigate();

  const cat = BMI_CATEGORIES[category];
  const theme = BMI_THEME[category];
  const plan = PLAN_TYPES[planType];
  const Art = PLAN_ART[planType];

  if (!cat || !theme || !plan || !Art) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[14px] font-bold text-gray-800">Plan not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-[13px] font-semibold text-blue-600 underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const englishItems = cat[planType];
  const hindiItems = HINDI_PLANS[category][planType];

  // BUTTON TEXT LOGIC: Diet me Dietitian, baaki me Doctor
  const btnText =
    planType === "diet" ? "Consult a Dietitian" : "Book Doctor Consultation";

  return (
    <div
      className="min-h-screen flex justify-center"
      style={{
        background:
          "linear-gradient(180deg,#e7f1fc 0%,#f2f7fd 45%,#fafcff 100%)",
        fontFamily: "'Nunito','Noto Sans Devanagari',system-ui,sans-serif",
      }}
    >
      <div className="w-full max-w-md min-h-screen flex flex-col">
        {/* TOP BAR */}
        <header
          className="sticky top-0 z-40"
          style={{
            background: "rgba(231,241,252,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full active:scale-95"
              style={{ color: NAVY }}
            >
              <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
            <h1 className="font-extrabold text-[17px]" style={{ color: NAVY }}>
              {plan.title}
            </h1>

            {/* TOP RIGHT LOGO */}
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-8 px-4 pt-3">
          {/* HERO: same colours + SVG art as the BMI result page */}
          <div
            className="rounded-[20px] p-4 mb-3.5 flex items-center gap-3.5"
            style={{ background: theme.cardBg }}
          >
            <div className="w-[72px] h-[72px] rounded-2xl bg-white/90 p-1.5 flex-none shadow-sm overflow-hidden flex items-end">
              <Art />
            </div>
            <div className="flex-1 min-w-0">
              <h2
                className="text-[19px] font-black leading-tight"
                style={{ color: NAVY }}
              >
                {plan.title}
              </h2>
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span
                  className="text-[9.5px] font-black text-white px-2.5 py-1 rounded-md tracking-wide whitespace-nowrap shadow-sm"
                  style={{ background: theme.pill }}
                >
                  {theme.label}
                </span>
                <span className="text-[10px] text-gray-600 font-semibold">
                  BMI {cat.range}
                </span>
              </div>
            </div>
          </div>

          {/* ENGLISH SECTION */}
          <PlanList
            badge="EN"
            title="English"
            items={englishItems}
            color={plan.colorDark}
          />

          {/* HINDI SECTION */}
          <PlanList
            badge="हि"
            title="हिंदी"
            items={hindiItems}
            color={plan.colorDark}
          />

          {/* Disclaimer */}
          <div className="bg-[#e6f0fb] border border-[#d3e4f7] rounded-2xl p-3.5 mb-4 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#2f80ed] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={14} strokeWidth={2.6} className="text-white" />
            </div>
            <div className="text-[10px] text-[#3b4a66] leading-relaxed font-medium">
              <p>
                <span className="font-extrabold">Disclaimer:</span>{" "}
                {DISCLAIMER.en}
              </p>
              <p className="mt-1.5">{DISCLAIMER.hi}</p>
            </div>
          </div>

          {/* Dynamic Button */}
          <button
            onClick={() => navigate("/appointment")}
            className="w-full bg-white border-2 border-[#0d6b63] text-[#0d6b63] font-bold py-3.5 rounded-xl active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            {btnText} <ArrowRight size={16} />
          </button>
        </main>
      </div>
    </div>
  );
}

/* ============ LIST CARD (English / Hindi) ============ */
function PlanList({ badge, title, items, color }) {
  return (
    <div className="bg-white rounded-[20px] border border-[#e3ecf7] shadow-[0_2px_10px_rgba(30,64,120,0.06)] p-4 mb-3.5">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {badge}
        </div>
        <h3 className="text-[13px] font-extrabold" style={{ color: NAVY }}>
          {title}
        </h3>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: color }}
            >
              <Check size={10} className="text-white" strokeWidth={3} />
            </span>
            <span className="text-[12px] text-[#3b4a66] leading-snug font-medium">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
