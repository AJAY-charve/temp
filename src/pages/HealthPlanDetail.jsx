import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  Check,
  ArrowRight,
  Info,
  Salad,
  Dumbbell,
  HeartPulse,
} from "lucide-react";

// Images
import scanFoodImg from "../assets/cards/scan-food.jpeg";
import caloriesImg from "../assets/cards/calories.jpeg";
import diabetesImg from "../assets/cards/diabetes.jpeg";

/* ============ BMI CATEGORIES DATA ============ */
const BMI_CATEGORIES = {
  underweight: {
    label: "Underweight",
    range: "<18.5",
    color: "#4059aa",
    bg: "#dce1ff",
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
    label: "Normal Weight",
    range: "18.5–22.9",
    color: "#005c55",
    bg: "#9cf2e8",
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
    label: "Overweight",
    range: "23.0–24.9",
    color: "#c45d00",
    bg: "#ffe2c2",
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
    label: "Obesity Class I",
    range: "25.0–29.9",
    color: "#932265",
    bg: "#ffd8e7",
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
    label: "Obesity Class II",
    range: "30.0–34.9",
    color: "#932265",
    bg: "#ffd8e7",
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
    label: "Obesity Class III",
    range: "≥35.0",
    color: "#932265",
    bg: "#ffd8e7",
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
  diet: {
    title: "Diet Plan",
    icon: <Salad size={24} />,
    image: scanFoodImg,
    color: "#e8f8f1",
    colorDark: "#005c55",
    emoji: "🥗",
  },
  activity: {
    title: "Physical Activity",
    icon: <Dumbbell size={24} />,
    image: caloriesImg,
    color: "#e8efff",
    colorDark: "#4059aa",
    emoji: "🏃",
  },
  advice: {
    title: "Other Advice",
    icon: <HeartPulse size={24} />,
    image: diabetesImg,
    color: "#fff8e1",
    colorDark: "#c45d00",
    emoji: "💡",
  },
};

export default function HealthPlanDetail() {
  const { category, planType } = useParams();
  const navigate = useNavigate();

  const cat = BMI_CATEGORIES[category];
  const plan = PLAN_TYPES[planType];

  if (!cat || !plan) {
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

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen flex flex-col">
        {/* TOP BAR */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px]">
              {plan.title}
            </h1>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 pb-8 px-4 pt-4">
          {/* Hero */}
          <div
            className="rounded-2xl p-4 mb-4 flex items-center gap-3"
            style={{ backgroundColor: plan.color }}
          >
            <div
              className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0"
              style={{ color: plan.colorDark }}
            >
              {plan.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[16px] font-black text-gray-900">
                {plan.title}
              </h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="text-[9px] font-bold text-white px-2 py-0.5 rounded"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.label.toUpperCase()}
                </span>
                <span className="text-[10px] text-gray-600">
                  BMI {cat.range}
                </span>
              </div>
            </div>
            <div className="text-[24px]">{plan.emoji}</div>
          </div>

          {/* ENGLISH SECTION */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold text-white"
                style={{ backgroundColor: plan.colorDark }}
              >
                EN
              </div>
              <h3 className="text-[12px] font-bold text-gray-900">English</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {englishItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: plan.colorDark }}
                  >
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </span>
                  <span className="text-[12px] text-gray-700 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* HINDI SECTION */}
          <div className="bg-white rounded-2xl border border-[#eaedff] p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold text-white"
                style={{ backgroundColor: plan.colorDark }}
              >
                हि
              </div>
              <h3 className="text-[12px] font-bold text-gray-900">हिंदी</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {hindiItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: plan.colorDark }}
                  >
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </span>
                  <span className="text-[12px] text-gray-700 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#eef6f9] rounded-2xl p-3.5 mb-4 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#005c55] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={13} className="text-white" />
            </div>
            <div className="text-[10px] text-gray-700 leading-relaxed">
              <p>
                <span className="font-bold">Disclaimer:</span> {DISCLAIMER.en}
              </p>
              <p className="mt-1.5">{DISCLAIMER.hi}</p>
            </div>
          </div>

          {/* Book Doctor */}
          <button
            onClick={() => navigate("/appointment")}
            className="w-full border border-[#005c55] text-[#005c55] font-bold py-3.5 rounded-xl active:scale-[0.98] transition flex items-center justify-center gap-2 hover:bg-[#e8f3f1]"
          >
            Book Doctor Consult <ArrowRight size={16} />
          </button>
        </main>
      </div>
    </div>
  );
}
