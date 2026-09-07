import React, { useState } from 'react';
import { Mic, MicOff, Check, Sparkles, Volume2 } from 'lucide-react';
import { Modal } from './Modal';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSymptomsExtracted: (symptoms: string[]) => void;
}

const samplePhrases = [
  'मरीज को पिछले दो दिन से बहुत तेज छाती में दर्द, सांस लेने में तकलीफ और पसीना आ रहा है',
  'Patient is having severe chest discomfort, shortness of breath, and feeling dizzy since morning',
  'मरीज को तेज बुखार, सिरदर्द और उल्टी की शिकायत है'
];

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onSymptomsExtracted
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedChips, setExtractedChips] = useState<string[]>([]);

  const handleStartListening = (phrase?: string) => {
    setIsRecording(true);
    setTranscript('');
    setExtractedChips([]);

    const textToSimulate = phrase || samplePhrases[0];

    setTimeout(() => {
      setTranscript(textToSimulate);
      setIsRecording(false);
      setIsProcessing(true);

      setTimeout(() => {
        setIsProcessing(false);
        if (textToSimulate.includes('छाती') || textToSimulate.includes('chest')) {
          setExtractedChips(['Chest discomfort', 'Breathing difficulty', 'Sweating', 'Dizziness']);
        } else {
          setExtractedChips(['Fever', 'Headache', 'Vomiting']);
        }
      }, 1200);
    }, 2000);
  };

  const handleApply = () => {
    onSymptomsExtracted(extractedChips);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AWAZ AI — Voice Symptom Assistant"
      subtitle="Tap to speak in Hindi or English — extracts structured clinical symptoms automatically"
      maxWidth="md"
    >
      <div className="flex flex-col items-center text-center space-y-6 py-4">
        {/* Animated Mic Button */}
        <div className="relative">
          {isRecording && (
            <div className="absolute -inset-4 rounded-full bg-health-500/20 animate-ping"></div>
          )}
          <button
            onClick={() => handleStartListening()}
            disabled={isRecording || isProcessing}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all transform shadow-xl ${
              isRecording
                ? 'bg-rose-600 text-white scale-110'
                : isProcessing
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-health-700 hover:bg-health-800 text-white hover:scale-105'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-10 h-10 animate-pulse" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            {isRecording
              ? 'Listening... Speak now (सुन रहे हैं...)'
              : isProcessing
              ? 'AI Speech Analysis & Symptom Extraction...'
              : 'Tap microphone to speak'}
          </p>
          <p className="text-xs text-slate-600 mt-1">Supports Hindi (हिंदी), English, & Regional Accents</p>
        </div>

        {/* Demo Preset Voice Selector */}
        <div className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-left">
          <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-health-700" />
            Or select a simulated rural patient voice sample:
          </p>
          <div className="space-y-1.5">
            {samplePhrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => handleStartListening(phrase)}
                className="w-full text-left text-xs p-2 rounded-lg bg-white border border-slate-200 hover:border-health-400 hover:bg-health-50/50 transition-colors line-clamp-1"
              >
                🗣️ "{phrase}"
              </button>
            ))}
          </div>
        </div>

        {/* Live Transcript Display */}
        {transcript && (
          <div className="w-full bg-slate-900 text-slate-100 p-4 rounded-xl text-left text-xs font-mono border border-slate-700">
            <p className="text-slate-600 uppercase text-[10px] tracking-wider mb-1">Speech Transcript:</p>
            <p className="leading-relaxed">"{transcript}"</p>
          </div>
        )}

        {/* AI Extracted Symptom Chips */}
        {extractedChips.length > 0 && (
          <div className="w-full bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-left animate-letter">
            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              AI Extracted Symptoms:
            </div>
            <div className="flex flex-wrap gap-2">
              {extractedChips.map((chip, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold rounded-full shadow-sm flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 w-full pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            disabled={extractedChips.length === 0}
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-health-700 hover:bg-health-800 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-colors"
          >
            Add Extracted Symptoms
          </button>
        </div>
      </div>
    </Modal>
  );
};
