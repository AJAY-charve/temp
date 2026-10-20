import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Trash2,
  Plus,
  X,
  Check,
  CloudUpload,
} from "lucide-react";

// LOGO IMPORT
import logo from "../assets/daibmetalogo.jpeg";

const NAVY = "#14284b";

/* ============ STATIC DATA (no API) ============ */
const DOC_TYPES = [
  {
    key: "prescription",
    label: "Prescription",
    color: "#2f8cf0",
    bg: "#e0eefc",
  },
  { key: "lab-report", label: "Lab Report", color: "#2e9e48", bg: "#e4f4e8" },
  { key: "scan", label: "Scan / X-Ray", color: "#ea8a10", bg: "#fdf1d3" },
  { key: "bill", label: "Bill", color: "#ef5350", bg: "#fde3e3" },
  { key: "other", label: "Other", color: "#7E57C2", bg: "#EDE7F6" },
];

const INITIAL_DOCS = [
  {
    id: "1",
    name: "Blood Test Report",
    type: "lab-report",
    customType: "",
    date: "12 Mar 2025",
    size: "1.2 MB",
    fileType: "PDF",
    url: null,
  },
  {
    id: "2",
    name: "Dr. Sharma Prescription",
    type: "prescription",
    customType: "",
    date: "08 Mar 2025",
    size: "340 KB",
    fileType: "JPG",
    url: null,
  },
  {
    id: "3",
    name: "Chest X-Ray",
    type: "scan",
    customType: "",
    date: "28 Feb 2025",
    size: "2.8 MB",
    fileType: "PNG",
    url: null,
  },
  {
    id: "4",
    name: "Clinic Bill – Feb",
    type: "bill",
    customType: "",
    date: "20 Feb 2025",
    size: "180 KB",
    fileType: "PDF",
    url: null,
  },
];

const getDocType = (key) =>
  DOC_TYPES.find((d) => d.key === key) || DOC_TYPES[DOC_TYPES.length - 1];

const isImageType = (fileType) =>
  ["JPG", "JPEG", "PNG", "WEBP", "GIF"].includes(
    (fileType || "").toUpperCase(),
  );

/* ============ MAIN PAGE ============ */
export default function Records() {
  const navigate = useNavigate();

  const [docs, setDocs] = useState(INITIAL_DOCS);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedType, setSelectedType] = useState("prescription");
  const [customTypeName, setCustomTypeName] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  // STATIC upload — file list me add hoti hai + preview URL banata hai
  const handleFilePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newDoc = {
      id: Date.now().toString(),
      name: file.name,
      type: selectedType,
      customType:
        selectedType === "other" ? customTypeName.trim() || "Other" : "",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      size:
        file.size > 1024 * 1024
          ? (file.size / (1024 * 1024)).toFixed(1) + " MB"
          : Math.max(1, Math.round(file.size / 1024)) + " KB",
      fileType: file.name.split(".").pop()?.toUpperCase() || "FILE",
      url,
    };
    setDocs([newDoc, ...docs]);
    closeUpload();
    e.target.value = "";
  };

  const closeUpload = () => {
    setShowUpload(false);
    setSelectedType("prescription");
    setCustomTypeName("");
  };

  const openUpload = () => {
    setSelectedType("prescription");
    setCustomTypeName("");
    setShowUpload(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this document?")) {
      setDocs(docs.filter((d) => d.id !== id));
    }
  };

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
            <h1 className="font-bold text-gray-900 text-[15px]">
              My Documents
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
        <main className="flex-1 pb-24 px-4 pt-4">
          {/* Upload CTA */}
          <button
            onClick={openUpload}
            className="w-full rounded-2xl p-4 mb-4 flex items-center gap-3 text-left active:scale-[0.99] transition shadow-[0_2px_12px_rgba(15,23,42,0.06)] border border-[#005c55]/20"
            style={{ background: "linear-gradient(135deg,#9cf2e8,#c8f7f1)" }}
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-none shadow-sm">
              <CloudUpload size={24} className="text-[#005c55]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-extrabold text-[#005c55] leading-tight">
                Upload New Document
              </p>
              <p className="text-[10.5px] text-[#005c55]/80 font-medium mt-0.5">
                Prescription, lab report, scan or bill
              </p>
            </div>
            <Plus size={20} className="text-[#005c55] flex-none" />
          </button>

          {/* Documents list */}
          {docs.length === 0 ? (
            <EmptyState onUpload={openUpload} />
          ) : (
            <div className="flex flex-col gap-2.5">
              <p className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wide px-1">
                {docs.length} document{docs.length > 1 ? "s" : ""}
              </p>
              {docs.map((doc) => (
                <DocCard
                  key={doc.id}
                  doc={doc}
                  onPreview={() => setPreview(doc)}
                  onDelete={() => handleDelete(doc.id)}
                />
              ))}
            </div>
          )}
        </main>

        {/* UPLOAD SHEET */}
        {showUpload && (
          <UploadSheet
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            customTypeName={customTypeName}
            setCustomTypeName={setCustomTypeName}
            onClose={closeUpload}
            onPick={() => fileRef.current?.click()}
          />
        )}

        {/* hidden file input */}
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={handleFilePick}
          accept="*/*"
        />

        {/* PREVIEW MODAL */}
        {preview && (
          <PreviewModal doc={preview} onClose={() => setPreview(null)} />
        )}
      </div>
    </div>
  );
}

/* ============ DOCUMENT CARD ============ */
function DocCard({ doc, onPreview, onDelete }) {
  const t = getDocType(doc.type);
  const image = isImageType(doc.fileType);
  const typeLabel =
    doc.type === "other" && doc.customType ? doc.customType : t.label;

  return (
    <div className="bg-white rounded-2xl border border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] p-3 flex items-center gap-3">
      {/* thumbnail / icon */}
      <button
        onClick={onPreview}
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-none overflow-hidden active:scale-95 transition"
        style={{ backgroundColor: t.bg }}
      >
        {image && doc.url ? (
          <img
            src={doc.url}
            alt={doc.name}
            className="w-full h-full object-cover"
          />
        ) : image ? (
          <ImageIcon size={20} style={{ color: t.color }} />
        ) : (
          <FileText size={20} style={{ color: t.color }} />
        )}
      </button>

      {/* info */}
      <button onClick={onPreview} className="flex-1 min-w-0 text-left">
        <p className="text-[13px] font-bold text-gray-900 truncate leading-tight">
          {doc.name}
        </p>
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          <span
            className="text-[8.5px] font-bold px-1.5 py-0.5 rounded"
            style={{ color: t.color, backgroundColor: t.bg }}
          >
            {typeLabel}
          </span>
          <span className="text-[10px] text-gray-500 font-medium">
            {doc.date}
          </span>
          <span className="text-[10px] text-gray-400">·</span>
          <span className="text-[10px] text-gray-500 font-medium">
            {doc.size}
          </span>
        </div>
      </button>

      {/* delete */}
      <button
        onClick={onDelete}
        className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 active:scale-90 flex-none"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

/* ============ EMPTY STATE ============ */
function EmptyState({ onUpload }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-[#eef1f8] flex items-center justify-center mb-3">
        <FileText size={32} className="text-gray-400" />
      </div>
      <p className="text-[13px] font-bold text-gray-800">No documents yet</p>
      <p className="text-[11px] text-gray-500 mt-1 max-w-[220px] leading-snug">
        Upload your prescriptions, reports and scans to keep them safe.
      </p>
      <button
        onClick={onUpload}
        className="mt-4 bg-[#0d6b63] text-white font-bold text-[12px] px-4 py-2.5 rounded-xl active:scale-95 transition inline-flex items-center gap-1.5"
      >
        <Plus size={14} /> Upload First Document
      </button>
    </div>
  );
}

/* ============ UPLOAD BOTTOM SHEET ============ */
function UploadSheet({
  selectedType,
  setSelectedType,
  customTypeName,
  setCustomTypeName,
  onClose,
  onPick,
}) {
  const isOther = selectedType === "other";
  const canUpload = !isOther || customTypeName.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl p-4 pb-6 shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-extrabold" style={{ color: NAVY }}>
            Upload Document
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <p className="text-[11px] font-semibold text-gray-600 mb-2">
          Select document type
        </p>

        {/* Type options */}
        <div className="flex flex-col gap-2 mb-3">
          {DOC_TYPES.map((t) => {
            const active = selectedType === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setSelectedType(t.key)}
                className={`flex items-center justify-between px-3 py-3 rounded-xl border text-left transition ${
                  active
                    ? "border-[#005c55] bg-[#9cf2e8]/30"
                    : "border-[#eaedff] bg-[#f4f5fb]"
                }`}
              >
                <span className="text-[12.5px] font-bold text-gray-800">
                  {t.label}
                </span>
                {active && <Check size={15} className="text-[#005c55]" />}
              </button>
            );
          })}
        </div>

        {/* Custom name input when "Other" is selected */}
        {isOther && (
          <div className="mb-3">
            <label className="text-[11px] font-semibold text-gray-600 mb-1.5 block">
              Document name
            </label>
            <input
              type="text"
              value={customTypeName}
              onChange={(e) => setCustomTypeName(e.target.value)}
              placeholder="e.g. Insurance Paper, Vaccination Card"
              className="w-full px-3 py-3 rounded-xl border border-[#eaedff] bg-[#f4f5fb] focus:bg-white focus:border-[#005c55] outline-none text-[12.5px] text-gray-800 placeholder-gray-400 transition"
            />
          </div>
        )}

        <button
          onClick={onPick}
          disabled={!canUpload}
          className="w-full bg-[#0d6b63] text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <CloudUpload size={18} /> Choose File & Upload
        </button>
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.28s ease-out; }
      `}</style>
    </div>
  );
}

/* ============ PREVIEW MODAL (Supports Image, PDF & Fallback) ============ */
function PreviewModal({ doc, onClose }) {
  const image = isImageType(doc.fileType);
  const pdf = doc.fileType === "PDF";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Top bar */}
      <div className="h-14 px-4 flex items-center justify-between flex-none bg-black/80 backdrop-blur">
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-white truncate">
            {doc.name}
          </p>
          <p className="text-[10px] text-white/60 mt-0.5">
            {doc.fileType} · {doc.size}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center active:scale-90 flex-none"
        >
          <X size={18} className="text-white" />
        </button>
      </div>

      {/* Full preview area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden bg-black">
        {image && doc.url ? (
          <img
            src={doc.url}
            alt={doc.name}
            className="max-w-full max-h-full object-contain"
          />
        ) : pdf && doc.url ? (
          <iframe
            src={doc.url}
            title={doc.name}
            className="w-full h-full border-0 bg-white"
          />
        ) : (
          <div className="flex flex-col items-center text-center px-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
              <FileText size={40} className="text-white/80" />
            </div>
            <p className="text-[14px] font-bold text-white">
              Preview not available
            </p>
            <p className="text-[12px] text-white/60 mt-2 max-w-[260px] leading-snug">
              {image || pdf
                ? "This is a sample document. Upload a file to preview it here."
                : "This file type (DOC/DOCX/Other) cannot be previewed directly in the browser."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
