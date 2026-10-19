import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

// LOGO
import logo from "../assets/daibmetalogo.jpeg";

// Mock Disease Data
import diabetesImg from "../assets/cards/diabetes.jpeg";
import bmiImg from "../assets/cards/bmi.jpeg";
import diseaseImg from "../assets/cards/disease.png";
import heartImg from "../assets/cards/calories.jpeg";
import kidneyImg from "../assets/cards/period.jpeg";

const DISEASE_DETAILS = {
  diabetes: {
    name: "Diabetes",
    image: diabetesImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is Diabetes?</h3>
      <p>Diabetes is a chronic health condition that affects how your body turns food into energy. It occurs when your blood glucose (sugar) is too high. Over time, having too much glucose in your blood can cause serious problems.</p>
      
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">Common Symptoms</h3>
      <ul class="list-disc pl-5 flex flex-col gap-1 my-2">
        <li>Increased thirst and frequent urination</li>
        <li>Extreme hunger and unexplained weight loss</li>
        <li>Fatigue and irritability</li>
        <li>Blurred vision</li>
      </ul>

      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">Causes</h3>
      <p>Type 1 Diabetes is an autoimmune reaction, while Type 2 is mostly related to insulin resistance. Genetics and lifestyle play a major role.</p>
      
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">Prevention</h3>
      <p>Maintain a healthy weight, eat a balanced diet rich in fiber, and exercise regularly to lower your risk.</p>
    `,
  },
  obesity: {
    name: "Obesity",
    image: bmiImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is Obesity?</h3>
      <p>Obesity is a complex disease involving an excessive amount of body fat. It's not just a cosmetic concern — it's a medical problem that increases the risk of other diseases like heart disease and diabetes.</p>
      
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">Symptoms</h3>
      <ul class="list-disc pl-5 flex flex-col gap-1 my-2">
        <li>Excess body fat (BMI of 30 or higher)</li>
        <li>Shortness of breath with mild exertion</li>
        <li>Snoring or sleep apnea</li>
      </ul>
    `,
  },
  hypertension: {
    name: "Hypertension",
    image: diseaseImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is Hypertension?</h3>
      <p>Hypertension, or high blood pressure, is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems.</p>
      
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">The Silent Killer</h3>
      <p>It often has no noticeable symptoms. Regular monitoring of blood pressure is crucial.</p>
    `,
  },
  "heart-disease": {
    name: "Heart Disease",
    image: heartImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is Heart Disease?</h3>
      <p>Heart disease describes a range of conditions that affect your heart, including blood vessel diseases (coronary artery disease), heart rhythm problems, and heart defects.</p>
    `,
  },
  "kidney-disease": {
    name: "Kidney Disease",
    image: kidneyImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is Kidney Disease?</h3>
      <p>Chronic kidney disease is a gradual loss of kidney function. Your kidneys filter wastes and excess fluids from your blood, which are then removed in your urine.</p>
    `,
  },
};

export default function DiseaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const disease = DISEASE_DETAILS[id];

  if (!disease) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[14px] font-bold text-gray-800">
            Disease not found
          </p>
          <button
            onClick={() => navigate("/diseases")}
            className="mt-3 text-[13px] font-semibold text-[#005c55] underline"
          >
            Go back to list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-700 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-[15px] truncate max-w-[200px]">
              {disease.name}
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
        <main className="flex-1 pb-10">
          {/* Hero Image */}
          <div className="w-full h-[220px] bg-[#f0f2f8]">
            <img
              src={disease.image}
              alt={disease.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-4 pt-5">
            <h1 className="text-[22px] font-extrabold text-[#14284b] leading-tight">
              {disease.name}
            </h1>
          </div>

          {/* SINGLE ABOUT SECTION (HTML RENDER) */}
          <div className="px-4 mt-5">
            <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-2 mb-4 border-b border-[#eaedff] pb-3">
                <div className="w-8 h-8 rounded-lg bg-[#E0F2F1] flex items-center justify-center">
                  <FileText size={18} className="text-[#005c55]" />
                </div>
                <h3 className="text-[15px] font-extrabold text-[#14284b]">
                  About {disease.name}
                </h3>
              </div>

              <div
                className="text-[12.5px] text-[#3b4a66] leading-relaxed
                           [&>p]:mb-3 
                           [&>ul]:mb-3 
                           [&>li]:mb-1 
                           [&_strong]:font-bold [&_strong]:text-gray-900"
                dangerouslySetInnerHTML={{ __html: disease.contentHtml }}
              />
            </div>

            <p className="text-[9.5px] text-gray-400 text-center mt-6 leading-snug px-4">
              Disclaimer: This information is for educational purposes only.
              Consult a healthcare professional for medical advice.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
