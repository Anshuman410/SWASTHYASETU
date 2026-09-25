import React, { useState } from 'react';
import { useHealthcare } from '../../context/HealthcareContext';
import {
  Video, Mic, MicOff, Camera, CameraOff, PhoneOff, MessageSquare,
  FileText, Activity, ShieldCheck, User, CheckCircle2, Send
} from 'lucide-react';

interface TeleconsultationPageProps {
  onNavigate: (route: string) => void;
}

export const TeleconsultationPage: React.FC<TeleconsultationPageProps> = ({ onNavigate }) => {
  const { patients } = useHealthcare();
  const patient = patients[0]; // Rahul Kumar

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Sharma', text: 'Good morning Rahul ji. How is your chest discomfort feeling right now?', time: '11:32 AM' },
    { sender: 'Rahul Kumar', text: 'Doctor sahab, pain is a bit less than morning, but feeling heavy when walking.', time: '11:33 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatMessages(prev => [...prev, { sender: 'Dr. Sharma', text: chatInput.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setChatInput('');
    }
  };

  return (
    <div className="space-y-6 animate-letter">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
          <div>
            <h2 className="text-sm font-bold text-white">LIVE TELECONSULTATION SESSION</h2>
            <p className="text-[11px] text-slate-300">Room #TC-8821 • PHC Rampur Node</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/doctor/dashboard')}
          className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
        >
          <PhoneOff className="w-3.5 h-3.5" />
          <span>End Consultation Call</span>
        </button>
      </div>

      {/* Main Video & Panel Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 8 COLS: Video Feeds & Call Controls */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video rounded-3xl bg-slate-950 overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center">
            {/* Patient Main Feed */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
              <div className="w-24 h-24 rounded-full bg-emerald-800 text-white font-black text-3xl flex items-center justify-center shadow-xl border-4 border-emerald-600 mb-4 animate-pulse">
                {patient.name.substring(0, 1)}
              </div>
              <h3 className="text-xl font-bold text-white">{patient.name}</h3>
              <p className="text-xs text-emerald-400 font-medium">Remote Patient Video Connected • Rampur Village Node</p>
            </div>

            {/* Doctor PIP Thumbnail */}
            <div className="absolute bottom-4 right-4 w-40 h-28 rounded-2xl bg-slate-800 border-2 border-white/20 shadow-xl overflow-hidden flex flex-col items-center justify-center">
              {isVideoOff ? (
                <span className="text-[10px] text-slate-400">Camera Off</span>
              ) : (
                <div className="text-center p-2">
                  <div className="w-8 h-8 rounded-full bg-purple-700 text-white text-xs font-bold mx-auto flex items-center justify-center">DS</div>
                  <span className="text-[9px] text-white font-bold block mt-1">Dr. Ramesh Sharma</span>
                </div>
              )}
            </div>

            {/* In-Call Controls Overlay Bar */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 p-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-xl transition-all ${isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-xl transition-all ${isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
              >
                {isVideoOff ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
              </button>

              <button
                onClick={() => onNavigate('/doctor/dashboard')}
                className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md flex items-center gap-2"
              >
                <PhoneOff className="w-5 h-5" />
                <span>Disconnect Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT 4 COLS: Side Panel (Patient Vitals & Live Chat) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Patient Quick Vitals Panel */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
              <Activity className="w-4 h-4 text-health-700" />
              Patient Snapshot
            </h4>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <p className="font-bold text-slate-900">{patient.name} ({patient.age} yrs / {patient.gender})</p>
              <p className="text-slate-600">Vitals: BP 148/94 • Pulse 88 • SpO2 96%</p>
              <span className="inline-block px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">HIGH RISK ASSESSMENT</span>
            </div>
          </div>

          {/* Consultation Live Chat */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[340px] justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
              <MessageSquare className="w-4 h-4 text-purple-700" />
              In-Call Chat & Transcript
            </h4>

            <div className="flex-1 overflow-y-auto space-y-2 py-2">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`p-2.5 rounded-xl text-xs ${msg.sender.includes('Doctor') || msg.sender.includes('Sharma') ? 'bg-purple-50 text-purple-950 ml-4' : 'bg-slate-100 text-slate-900 mr-4'}`}>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-0.5">
                    <span>{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Type message or prescription advice..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
              />
              <button type="submit" className="p-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
