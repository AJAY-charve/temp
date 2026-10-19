import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

// LOGO
import logo from "../assets/daibmetalogo.jpeg";

// Images
import symptomsImg from "../assets/cards/knowyoursymptoms.png";
import diseaseImg from "../assets/cards/disease.png";
import bmiImg from "../assets/cards/bmi.jpeg";
import diabetesImg from "../assets/cards/diabetes.jpeg";
import heartImg from "../assets/cards/calories.jpeg";

const SYMPTOM_DETAILS = {
  fever: {
    name: "Fever",
    image: diseaseImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is Fever?</h3>
      <p>A fever is a temporary increase in your body temperature, often due to an illness. Having a fever is a sign that something out of the ordinary is going on in your body.</p>
      
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">Common Causes</h3>
      <ul class="list-disc pl-5 flex flex-col gap-1 my-2">
        <li>Viral or bacterial infections</li>
        <li>Heat exhaustion</li>
        <li>Inflammatory conditions</li>
      </ul>

      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">When to see a doctor</h3>
      <p>If your fever is accompanied by a severe headache, rash, breathing problems, or lasts more than 3 days, consult a doctor immediately.</p>
    `,
  },
  headache: {
    name: "Headache",
    image: bmiImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is a Headache?</h3>
      <p>A headache can occur in any part of the head, on both sides, or in just one spot. It can be a sharp pain, a throbbing sensation, or a dull ache.</p>
      
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">Common Types</h3>
      <ul class="list-disc pl-5 flex flex-col gap-1 my-2">
        <li>Tension headaches (most common)</li>
        <li>Migraines</li>
        <li>Cluster headaches</li>
      </ul>
    `,
  },
  fatigue: {
    name: "Fatigue",
    image: diabetesImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is Fatigue?</h3>
      <p>Fatigue is a feeling of constant tiredness or weakness and can be physical, mental, or a combination of both. It can affect anyone.</p>
      
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">Potential Causes</h3>
      <p>It can be caused by lack of sleep, poor diet, anemia, thyroid issues, or chronic conditions like diabetes.</p>
    `,
  },
  cough: {
    name: "Cough & Cold",
    image: symptomsImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is Cough & Cold?</h3>
      <p>The common cold is a viral infection of your nose and throat. It's usually harmless, although it might not feel that way.</p>
      
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">Symptoms Include</h3>
      <ul class="list-disc pl-5 flex flex-col gap-1 my-2">
        <li>Runny or stuffy nose</li>
        <li>Sore throat</li>
        <li>Cough</li>
        <li>Congestion</li>
      </ul>
    `,
  },
  "chest-pain": {
    name: "Chest Pain",
    image: heartImg,
    contentHtml: `
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">What is Chest Pain?</h3>
      <p>Chest pain appears in many forms, ranging from a sharp stab to a dull ache. It can be a symptom of a serious heart condition.</p>
      
      <h3 class="text-[14px] font-bold text-[#14284b] mt-4 mb-2">Emergency Warning</h3>
      <p>If you have sudden, severe chest pain, especially with shortness of breath or radiating to the arm/jaw, seek emergency medical help immediately.</p>
    `,
  },
};

export default function SymptomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const symptom = SYMPTOM_DETAILS[id];

  if (!symptom) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[14px] font-bold text-gray-800">
            Symptom not found
          </p>
          <button
            onClick={() => navigate("/symptoms")}
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
              {symptom.name}
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
              src={symptom.image}
              alt={symptom.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-4 pt-5">
            <h1 className="text-[22px] font-extrabold text-[#14284b] leading-tight">
              {symptom.name}
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
                  About {symptom.name}
                </h3>
              </div>

              <div
                className="text-[12.5px] text-[#3b4a66] leading-relaxed
                           [&>p]:mb-3 
                           [&>ul]:mb-3 
                           [&>li]:mb-1 
                           [&_strong]:font-bold [&_strong]:text-gray-900"
                dangerouslySetInnerHTML={{ __html: symptom.contentHtml }}
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
