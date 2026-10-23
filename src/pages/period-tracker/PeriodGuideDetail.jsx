import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Info } from "lucide-react";
import logo from "../../assets/daibmetalogo.jpeg";

// 🔹 Same images jo PeriodHealthGuide mein use hui hain
import imgKnowPeriod from "../../assets/periodtracker/know-period.png";
import imgPainRelief from "../../assets/periodtracker/pain-relief.png";
import imgHygiene from "../../assets/periodtracker/hygiene.png";
import imgFood from "../../assets/periodtracker/food.png";
import imgWarning from "../../assets/periodtracker/warning.png";
import imgMyths from "../../assets/periodtracker/myths.png";

export default function PeriodGuideDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================================
  // STATIC DATA (image + htmlContent)
  // ==========================================
  const guidesData = {
    "know-period": {
      title: "Know About Menstrual Period",
      img: imgKnowPeriod,
      htmlContent: `
        <h3>What is a normal cycle?</h3>
        <p>A normal menstrual cycle typically ranges from <b>21 to 35 days</b>, with bleeding lasting 2 to 7 days. It's normal for cycles to vary slightly each month.</p>
        
        <h3>Understanding flow</h3>
        <p>Bleeding can be light, moderate, or heavy. Using 3-6 pads/tampons a day is generally considered normal.</p>
        
        <ul>
          <li><b>Light flow:</b> Changing pad every 6-8 hours.</li>
          <li><b>Heavy flow:</b> Changing pad every 1-2 hours.</li>
        </ul>

        <div class="note-box">
          If you feel dizzy or fatigued during heavy flow, consult a doctor immediately.
        </div>
      `,
    },
    "pain-relief": {
      title: "Period Pain Relief",
      img: imgPainRelief,
      htmlContent: `
        <h3>Why does it hurt?</h3>
        <p>Cramps happen when the uterus contracts to shed its lining. A hormone called <i>prostaglandin</i> triggers these contractions.</p>
        
        <h3>Self-care tips</h3>
        <ul>
          <li>Apply a heating pad to your lower belly.</li>
          <li>Take a warm bath to relax muscles.</li>
          <li>Gentle exercise like walking or yoga can help relieve pain.</li>
        </ul>

        <div class="note-box">
          Over-the-counter pain relievers (like ibuprofen) work best if taken at the first sign of cramps.
        </div>
      `,
    },
    hygiene: {
      title: "Period Hygiene",
      img: imgHygiene,
      htmlContent: `
        <h3>Changing products</h3>
        <p>Change your pad, tampon, or menstrual cup every <b>4 to 6 hours</b> to prevent infections and odor.</p>
        
        <h3>Washing up</h3>
        <p>Wash your intimate area daily with mild soap and water. Avoid scented products or douches.</p>
        
        <h3>Disposal</h3>
        <p>Wrap used pads/tampons in paper and throw them in a bin. <b>Do not flush them down the toilet.</b></p>
      `,
    },
    food: {
      title: "Food & Lifestyle",
      img: imgFood,
      htmlContent: `
        <h3>What to eat</h3>
        <p>Eat iron-rich foods (spinach, beans) to replace lost blood. Include calcium and magnesium for muscle relaxation.</p>
        
        <h3>What to avoid</h3>
        <ul>
          <li>Reduce salt (causes bloating)</li>
          <li>Reduce caffeine (worsens cramps)</li>
          <li>Avoid sugary foods during your period</li>
        </ul>
        
        <div class="note-box">
          Drink plenty of water. Light exercise like stretching can reduce bloating and improve mood.
        </div>
      `,
    },
    warning: {
      title: "Warning Signs",
      img: imgWarning,
      htmlContent: `
        <h3>When to see a doctor?</h3>
        <p>Consult a gynecologist if you experience any of the following:</p>
        <ul>
          <li><b>Extreme pain:</b> If pain stops your daily activities and medication doesn't help.</li>
          <li><b>Heavy bleeding:</b> Soaking through one or more pads/tampons every hour for several hours.</li>
          <li><b>Irregularity:</b> Cycles shorter than 21 days or longer than 35 days.</li>
          <li><b>Missed periods:</b> If you are not pregnant and miss periods regularly.</li>
        </ul>
      `,
    },
    myths: {
      title: "Myths vs Facts",
      img: imgMyths,
      htmlContent: `
        <h3>Common Myths</h3>
        <ul>
          <li><b>Myth:</b> You can't exercise during your period.<br/><span style="color:#2e9e3a">Fact: Gentle exercise actually helps reduce cramps and improves mood.</span></li>
          <li><b>Myth:</b> You shouldn't bathe during your period.<br/><span style="color:#2e9e3a">Fact: Bathing is perfectly safe and helps maintain hygiene and relieve pain.</span></li>
          <li><b>Myth:</b> Period blood is impure.<br/><span style="color:#2e9e3a">Fact: It's just the uterine lining mixed with blood—there is nothing impure about it.</span></li>
        </ul>
      `,
    },
  };

  const data = guidesData[id] || guidesData["know-period"];

  return (
    <div className="min-h-screen bg-[#faf8ff] flex flex-col font-nunito relative overflow-hidden">
      {/* Background Blush */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ffe4ed] rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      {/* FIXED HEADER */}
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-gray-100 relative z-10 sticky top-0">
        <button
          onClick={() => navigate("/period-tracker/health-guide")}
          className="p-1 w-8"
        >
          <ChevronLeft size={24} className="text-[#1a237e]" />
        </button>

        <h1 className="text-[17px] font-black text-[#1a237e] flex-1 text-center">
          Guide Details
        </h1>

        <img src={logo} alt="DiabMeta" className="h-8 object-contain w-16" />
      </header>

      <main className="flex-1 px-4 py-6 overflow-y-auto relative z-10">
        {/* Title Section — image icon */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-white border border-pink-100 shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={data.img}
              alt={data.title}
              draggable={false}
              className="w-12 h-12 object-contain select-none"
            />
          </div>
          <h1 className="text-[24px] leading-tight font-black text-[#1a237e] flex-1">
            {data.title}
          </h1>
        </div>

        {/* WHITE CARD WITH DYNAMIC HTML */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <div
            className="admin-rich-text"
            dangerouslySetInnerHTML={{ __html: data.htmlContent }}
          />
        </div>

        {/* Standard Disclaimer */}
        <div className="bg-[#fdf2f6] rounded-2xl border border-pink-100 p-4 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#e91e63] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info size={14} className="text-white" />
          </div>
          <div className="text-[11px] text-gray-600 leading-relaxed font-medium">
            <p className="font-extrabold text-[#e91e63] mb-1">Important</p>
            <p>
              Before following any advice given in this section, please consult
              a qualified doctor. This information is for general awareness
              only.
            </p>
          </div>
        </div>
      </main>

      {/* ADMIN HTML STYLING */}
      <style>{`
        .admin-rich-text h3 {
          font-size: 16px;
          font-weight: 800;
          color: #1a237e;
          margin-top: 18px;
          margin-bottom: 8px;
        }
        .admin-rich-text h3:first-child {
          margin-top: 0;
        }
        .admin-rich-text p {
          font-size: 13.5px;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 14px;
          font-weight: 500;
        }
        .admin-rich-text ul {
          list-style-type: disc;
          padding-left: 20px;
          margin-bottom: 16px;
        }
        .admin-rich-text li {
          font-size: 13px;
          color: #4b5563;
          line-height: 1.5;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .admin-rich-text b, .admin-rich-text strong {
          color: #1a237e;
          font-weight: 800;
        }
        .admin-rich-text .note-box {
          background-color: #fdf2f6;
          border-left: 4px solid #e91e63;
          padding: 12px;
          border-radius: 0 8px 8px 0;
          font-size: 12.5px;
          color: #1a237e;
          font-weight: 600;
          margin-top: 16px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
