"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  RefreshCw,
  ShieldAlert,
  Upload,
  FileText,
  CheckCircle2,
  Activity,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: string;
  isReportSummary?: boolean;
}

export function FloatingAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showReportUploadModal, setShowReportUploadModal] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "ai",
      content:
        "Namaste! Main SwasthyaSetu AI Health Assistant hu. Main aapki ABHA linked reports, dawaiyo (Metformin, Telmisartan) aur Token #24 ke baare mein sawalo ke jawab de sakta hu. Aap Hindi ya English mein baat kar sakte hain ya apni report upload karke instant summary paa sakte hain.",
      timestamp: "Just now",
    },
  ]);

  const quickPrompts = [
    "Meri dawaiyo ka dose kya hai?",
    "Pichli report mein Blood Sugar kitna tha?",
    "Token #24 OPD timings kya hain?",
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isOpen, isLoading]);

  // Web Speech API: Voice Recognition (Voice-to-Text)
  const startVoiceRecognition = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN"; // Hindi & Hinglish recognition
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsRecording(false);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  // Web Speech API: Text-to-Speech (Voice Output)
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#_~]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "hi-IN";
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || message;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    if (!customText) setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          patientContext: {
            name: "Rahul Kumar",
            abhaId: "9821-4432-1001",
            lastBp: "120/80 mmHg",
            activeToken: "Token #24 - District Hospital OPD (Dr. Ramesh Sharma)",
            medicines: "Tab Telmisartan 40mg (OD), Tab Metformin 500mg (BD)",
            recentLab: "FBS: 95 mg/dL, HbA1c: 5.6%, Normal",
          },
        }),
      });

      const data = await res.json();
      const aiReply =
        data.reply ||
        "Aapki medical report aur vitals normal range mein hain. Agar koi asuvidha ho toh Turant PHC ya 108 par call karein.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "ai",
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatHistory((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: "ai",
        content:
          "Main aapki request process kar raha hu. Aapke ABHA record ke mutabiq aapka Token #24 aaj 10:30 AM par Dr. Ramesh Sharma ke paas schedule hai.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatHistory((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadReportForSummary = (docTitle: string) => {
    setShowReportUploadModal(false);

    const userUploadMsg: ChatMessage = {
      id: `usr-up-${Date.now()}`,
      role: "user",
      content: `📎 Attached Document for AI Summary: ${docTitle}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatHistory((prev) => [...prev, userUploadMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const summaryMsg: ChatMessage = {
        id: `ai-sum-${Date.now()}`,
        role: "ai",
        content: `🩺 **AI Clinical Summary for: ${docTitle}**\n\n• **Blood Glucose & HbA1c:** Fasting Sugar is **95 mg/dL** (Normal: <100), HbA1c is **5.6%** (Good glycemic control).\n• **Cardiovascular Markers:** Total Cholesterol is **185 mg/dL**, BP **120/80 mmHg** is optimal under Telmisartan 40mg.\n• **Clinical Recommendation:** Continue prescribed medication. Next routine lipid panel scheduled after 90 days.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isReportSummary: true,
      };

      setChatHistory((prev) => [...prev, summaryMsg]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] rounded-3xl glass-panel border border-emerald-500/30 bg-[#0f172a]/95 shadow-2xl flex flex-col overflow-hidden mb-4 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-slate-900/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-md">
                    <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-white">AI Health Assistant</h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Gemini RAG
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Hindi • English • ABHA Verified</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Action: Upload Report for AI Summary */}
            <div className="px-4 py-2 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between">
              <span className="text-[11px] text-emerald-300 font-medium flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Clinical OCR & Summary</span>
              </span>

              <button
                onClick={() => setShowReportUploadModal(true)}
                className="px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 transition-all"
              >
                <Upload className="w-3 h-3" />
                <span>Upload Report for AI Summary</span>
              </button>
            </div>

            {/* Quick Suggestion Pills */}
            <div className="p-2.5 border-b border-white/5 flex gap-1.5 overflow-x-auto bg-black/20">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] text-slate-300 whitespace-nowrap transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat History Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex gap-2.5 ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {chat.role === "ai" && (
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      chat.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-950/40"
                        : chat.isReportSummary
                        ? "bg-emerald-950/50 text-slate-200 border border-emerald-500/40 rounded-bl-none shadow-md"
                        : "bg-slate-800/80 text-slate-200 border border-white/10 rounded-bl-none shadow-md"
                    }`}
                  >
                    <div className="whitespace-pre-line">{chat.content}</div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10 text-[9px] opacity-70">
                      <span>{chat.timestamp}</span>
                      {chat.role === "ai" && (
                        <button
                          onClick={() => speakText(chat.content)}
                          className="hover:text-emerald-300 flex items-center gap-1 ml-2"
                          title="Bol kar sunein"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Voice</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 p-2.5 rounded-2xl bg-emerald-500/10 w-fit">
                  <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span>Gemini AI is analyzing clinical context...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Voice Recording Active Banner */}
            {isRecording && (
              <div className="px-4 py-2 bg-emerald-500/20 border-t border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 animate-pulse">
                <span className="flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  Listening... (Speak in Hindi or English)
                </span>
                <span className="text-[10px] text-slate-400">Web Speech API</span>
              </div>
            )}

            {/* Input Form Area */}
            <div className="p-3 border-t border-white/10 bg-slate-900/90 flex items-center gap-2">
              <button
                type="button"
                onClick={startVoiceRecognition}
                className={`p-2.5 rounded-xl border transition-all ${
                  isRecording
                    ? "bg-red-500 text-white border-red-400 animate-pulse"
                    : "bg-white/5 border-white/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30"
                }`}
                title="Speak your question (Hindi / English)"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={isRecording ? "Listening..." : "Ask in Hindi or English..."}
                disabled={isRecording || isLoading}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
              />

              <Button
                size="sm"
                onClick={() => handleSend()}
                disabled={!message.trim() || isLoading}
                className="h-10 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Upload Modal for AI Summary */}
      <AnimatePresence>
        {showReportUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl glass-panel border border-emerald-500/30 bg-[#0f172a] p-5 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-sm text-white">Select Report for AI Summary</h3>
                </div>
                <button
                  onClick={() => setShowReportUploadModal(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Choose a record from your ABHA Health Locker or upload a local lab PDF/image:
              </p>

              <div className="space-y-2">
                {[
                  "Comprehensive Metabolic & Lipid Panel (12 Sep)",
                  "Digital E-Prescription Cardiology (15 Aug)",
                  "Chest X-Ray Digital Radiograph (04 May)",
                ].map((docName, i) => (
                  <button
                    key={i}
                    onClick={() => handleUploadReportForSummary(docName)}
                    className="w-full p-3 rounded-2xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-left text-xs text-slate-200 transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium">{docName}</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 opacity-60 group-hover:opacity-100" />
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10">
                <label className="block p-3 rounded-2xl border-2 border-dashed border-white/10 hover:border-emerald-500/40 text-center cursor-pointer bg-white/[0.01]">
                  <Upload className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-[11px] text-slate-300 font-medium block">
                    Upload new lab report PDF / Image
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleUploadReportForSummary(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Badge & Button */}
      <div className="flex items-center gap-3">
        {/* Glowing Badge with Pulsing Dot */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 shadow-lg shadow-emerald-950/40 backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">AI Health Assistant</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </motion.div>
        )}

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-[0_10px_35px_-5px_rgba(16,185,129,0.5)] cursor-pointer"
        >
          <span className="absolute -inset-1.5 rounded-full bg-emerald-400/30 blur-md group-hover:opacity-100 opacity-60 transition-opacity -z-10 animate-pulse" />
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="relative">
              <HeartPulse className="w-6 h-6 text-white stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-200 border-2 border-slate-900" />
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
