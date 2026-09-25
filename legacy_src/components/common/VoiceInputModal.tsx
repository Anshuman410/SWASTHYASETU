import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Modal } from './Modal';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSymptomsExtracted: (symptoms: string[]) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onSymptomsExtracted
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedChips, setExtractedChips] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const extractSymptomsFromText = (text: string) => {
    const lower = text.toLowerCase();
    const symptoms: string[] = [];

    // Chest / Heart
    if (lower.includes('chest') || lower.includes('छाती') || lower.includes('dard') || lower.includes('pain') || lower.includes('सीने')) {
      symptoms.push('Chest Pain / Discomfort');
    }
    // Breathing / Shortness
    if (lower.includes('breath') || lower.includes('सांस') || lower.includes('dum') || lower.includes('shortness') || lower.includes('दम')) {
      symptoms.push('Breathing Difficulty / Shortness of Breath');
    }
    // Fever
    if (lower.includes('fever') || lower.includes('बुखार') || lower.includes('bukhar') || lower.includes('temperature') || lower.includes('तापमान')) {
      symptoms.push('High Fever');
    }
    // Cough / Cold
    if (lower.includes('cough') || lower.includes('खांसी') || lower.includes('khasi') || lower.includes('cold') || lower.includes('जुकाम')) {
      symptoms.push('Persistent Cough');
    }
    // Headache / Dizziness
    if (lower.includes('headache') || lower.includes('सिर') || lower.includes('dizzy') || lower.includes('chakkar') || lower.includes('चक्कर')) {
      symptoms.push('Headache & Dizziness');
    }
    // Vomiting / Nausea / Stomach
    if (lower.includes('vomit') || lower.includes('उल्टी') || lower.includes('stomach') || lower.includes('pet') || lower.includes('पेट')) {
      symptoms.push('Nausea / Abdominal Discomfort');
    }
    // Sweating / Weakness
    if (lower.includes('sweat') || lower.includes('पसीना') || lower.includes('weak') || lower.includes('kamzori') || lower.includes('कमजोरी')) {
      symptoms.push('Profuse Sweating & Fatigue');
    }

    if (symptoms.length === 0 && text.trim().length > 0) {
      symptoms.push('General Malaise / Consult Doctor');
    }

    return Array.from(new Set(symptoms));
  };

  const startVoiceRecording = async () => {
    setErrorMessage('');
    setTranscript('');
    setExtractedChips([]);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback if browser does not support Web Speech API
      setSpeechSupported(false);
      setErrorMessage('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      // Prompt for microphone access directly via getUserMedia
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN'; // Hindi / Indian English recognition

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access denied. Please allow microphone permission in your browser.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No speech detected. Please tap the microphone and speak clearly.');
        } else {
          setErrorMessage(`Audio error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
        }, 500);
      };

      recognition.start();
    } catch (err: any) {
      setIsRecording(false);
      setErrorMessage('Microphone permission was not granted. Please check browser permissions.');
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (transcript) {
      const extracted = extractSymptomsFromText(transcript);
      setExtractedChips(extracted);
    }
  }, [transcript]);

  const handleApply = () => {
    onSymptomsExtracted(extractedChips);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (isRecording) stopVoiceRecording();
        onClose();
      }}
      title="AWAZ AI — Voice Symptom Assistant"
      subtitle="Speak in Hindi, English, or mixed dialect to extract clinical symptoms"
      maxWidth="md"
    >
      <div className="flex flex-col items-center text-center space-y-6 py-4">
        {/* Animated Mic Button */}
        <div className="relative">
          {isRecording && (
            <div className="absolute -inset-4 rounded-full bg-rose-500/20 animate-ping"></div>
          )}
          <button
            type="button"
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            disabled={isProcessing}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all transform shadow-xl cursor-pointer ${
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
              ? 'Listening to microphone... Speak symptoms now (बोलिए...)'
              : isProcessing
              ? 'Analyzing speech & clinical keywords...'
              : 'Tap microphone to start voice recording'}
          </p>
          <p className="text-xs text-slate-500 mt-1">Supports Hindi (हिंदी), English, & Hinglish phrases</p>
        </div>

        {/* Error message display */}
        {errorMessage && (
          <div className="w-full p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Live Audio Transcript Display */}
        {transcript && (
          <div className="w-full bg-slate-900 text-slate-100 p-4 rounded-xl text-left text-xs font-mono border border-slate-700">
            <p className="text-slate-400 uppercase text-[10px] tracking-wider mb-1">Live Microphone Transcript:</p>
            <p className="leading-relaxed text-slate-200">"{transcript}"</p>
          </div>
        )}

        {/* AI Extracted Symptom Chips */}
        {extractedChips.length > 0 && (
          <div className="w-full bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-left animate-letter">
            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Extracted Clinical Symptoms:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {extractedChips.map((chip, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold rounded-full shadow-sm flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 w-full pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={extractedChips.length === 0}
            onClick={handleApply}
            className="px-5 py-2.5 rounded-xl bg-health-700 hover:bg-health-800 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            Add Extracted Symptoms
          </button>
        </div>
      </div>
    </Modal>
  );
};
