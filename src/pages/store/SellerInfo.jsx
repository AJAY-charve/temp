import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, CheckCircle2 } from "lucide-react";

import logo from "../../assets/daibmetalogo.jpeg";

export default function SellerInfo() {
  const navigate = useNavigate();

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
            <h1 className="font-bold text-gray-900 text-[15px]">Seller Info</h1>
            <img
              src={logo}
              alt="DiabMeta"
              className="h-9 w-auto object-contain"
            />
          </div>
        </header>

        <main className="flex-1 pb-10 px-4 pt-5 overflow-y-auto">
          {/* SELLER NAME BANNER */}
          <div className="bg-[#E0F2F1]/60 rounded-3xl border border-[#B2DFDB] p-6 flex flex-col items-center text-center shadow-sm mb-5 relative overflow-hidden">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-3 relative z-10">
              <Building2 size={32} className="text-[#005c55]" />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                <CheckCircle2 size={18} className="text-[#2e9e48] fill-white" />
              </div>
            </div>

            <h2 className="text-[20px] font-extrabold text-[#005c55] leading-tight relative z-10">
              DiabMeta Clinic
            </h2>
            <p className="text-[12px] text-[#005c55]/80 font-semibold mt-1 relative z-10">
              Verified Healthcare Partner
            </p>
          </div>

          {/* YOUR CONTENT SECTION - PASTE/EDIT YOUR HTML HERE */}
          <div className="bg-white rounded-3xl border border-[#eaedff] shadow-sm p-5 mb-5">
            <div className="flex flex-col gap-5 text-[13px] text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-[14px] font-extrabold text-[#14284b] mb-1.5">
                  About DiabMeta Clinic
                </h3>
                <p>
                  DiabMeta Clinic is a premier healthcare destination dedicated
                  to metabolic health, diabetes management, and overall
                  wellness. We provide world-class diagnostic services, expert
                  consultations, and authentic medical supplies.
                </p>
              </div>

              <div>
                <h3 className="text-[14px] font-extrabold text-[#14284b] mb-1.5">
                  Contact Details
                </h3>
                <p className="mb-1">
                  <b>Address:</b> Shop 12, Ground Floor, Sector 18 Market,
                  Noida, UP - 201301
                </p>
                <p className="mb-1">
                  <b>Phone:</b> +91 98765 43210
                </p>
                <p>
                  <b>Email:</b> care@diabmeta.com
                </p>
              </div>

              <div>
                <h3 className="text-[14px] font-extrabold text-[#14284b] mb-1.5">
                  Store Policies
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <b>Returns:</b> No returns on opened supplements or medical
                    devices.
                  </li>
                  <li>
                    <b>Order Fulfillment:</b> All orders must be picked up from
                    the clinic.
                  </li>
                  <li>
                    <b>Pickup Timings:</b> Mon - Sat, 9:00 AM to 8:00 PM.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[14px] font-extrabold text-[#14284b] mb-1.5">
                  Need Help?
                </h3>
                <p>
                  If you have any questions regarding a product or your order,
                  feel free to reach out to our support team.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
