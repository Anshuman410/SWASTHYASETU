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
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: string;
}

export function FloatingAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "ai",
      content:
        "Namaste Rahul ji! Main SwasthyaSetu AI Health Assistant hu. Main aapki ABHA linked reports, dawaiyo (Metformin, Telmisartan) aur aaj ke Token #24 ke baare mein sawalo ke jawab de sakta hu. Aap Hindi ya English mein bol ya likh sakte hain.",
      timestamp: "Just now",
    },
  ]);

  const quickPrompts = [
    "Meri dawaiyo ka dose kya hai?",
    "Pichli report mein Blood Sugar kitna tha?",
    "Aaj doctor appointment ka time kya hai?",
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

  // Text-To-Speech (SpeechSynthesis Voice Out)
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#_]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "hi-IN";
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || message;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessage("");
    setChatHistory((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          patientContext:
            "Patient Name: Rahul Kumar. Age: 35. ABHA: 9821-4432-1001. Condition: Type 2 Diabetes, Mild BP. Current Rx: Metformin 500mg (twice daily), Telmisartan 40mg (once daily). Last Vitals: BP 120/80, SpO2 98%, Sugar 95 mg/dL. Next token: Token #24 with Dr. Ramesh Sharma at 11:30 AM.",
        }),
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "ai",
        content: data.reply || "Aapka sawal mil gaya hai. Kripya doctor se Token #24 par consult karein.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatHistory((prev) => [...prev, aiReply]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "ai",
          content:
            "Aapka sawal record ho gaya hai. Aapki reports ke anusaar aapka Blood Sugar aur BP stable hai. Aaj 11:30 AM par Dr. Ramesh Sharma ke sath Token #24 par visit karein.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[90vw] sm:w-[410px] h-[580px] max-h-[85vh] rounded-3xl glass-panel border border-emerald-500/30 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-slate-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-600/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">SwasthyaSetu AI</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Gemini 1.5 RAG
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Patient Context: Rahul Kumar (ABHA: 9821...)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2.5 border-b border-white/5 bg-black/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-white/[0.04] hover:bg-emerald-500/20 text-[11px] text-slate-300 hover:text-emerald-300 border border-white/5 transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex flex-col ${
                    chat.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      chat.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-950/40"
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
                <div className="flex items-center gap-2 text-xs text-emerald-400 p-2 rounded-xl bg-emerald-500/10 w-fit">
                  <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span>Gemini is reading medical records...</span>
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
              {/* Mic Voice Button */}
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

      {/* Floating Action Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-[0_10px_35px_-5px_rgba(16,185,129,0.5)] cursor-pointer"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 blur-md group-hover:opacity-100 opacity-60 transition-opacity -z-10 animate-pulse" />
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-200 border-2 border-slate-900" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
