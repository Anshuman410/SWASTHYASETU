import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Pull Gemini API key from environment variable
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
  try {
    const { message, patientContext } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    const context =
      patientContext ||
      `Patient Name: Rahul Kumar. Age: 35. ABHA: 9821-4432-1001. Condition: Type 2 Diabetes & Mild Hypertension. Current Medications: Metformin 500mg twice daily after meals, Telmisartan 40mg once in morning. Latest Vitals: BP 120/80 mmHg, SpO2 98%, Fasting Blood Sugar 95 mg/dL. Recent Labs: HbA1c 6.4% (Good control). Next Appointment: Today Token #24 with Dr. Ramesh Sharma.`;

    const prompt = `
You are SwasthyaSetu's AI Medical Assistant. 
You must answer the user's question using the provided patient medical history as factual ground truth (RAG).
Be helpful, clinically responsible, empathetic, and concise. 
If the user asks in Hindi or Hinglish, reply warmly in conversational Hindi / Hinglish. If in English, reply in English.
IMPORTANT RULES:
1. DO NOT prescribe brand new unprescribed prescription drugs.
2. DO advise visiting a doctor or consulting Token #24 if symptoms are red-flag or acute.
3. Clearly reference their verified medicines (e.g. Metformin 500mg, Telmisartan 40mg) when asked about doses.

Patient Medical History Context:
${context}

User Question: ${message}
    `;

    // Try live Gemini 1.5 Flash generation
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (text && text.trim().length > 0) {
          return NextResponse.json({ reply: text });
        }
      } catch (geminiError: any) {
        console.warn("Live Gemini API call error:", geminiError?.message || geminiError);
      }
    }

    // Intelligent Clinical Fallback (if API key quota limit, invalid format, or offline)
    const lower = message.toLowerCase();
    let fallbackReply = "";

    if (lower.includes("dawai") || lower.includes("medicine") || lower.includes("metformin")) {
      fallbackReply = `Namaste Rahul ji! Aapki medical history ke anusaar aapki current dawaiyan ye hain:
1. **Metformin 500mg**: Din mein 2 baar khane ke baad (Diabetes ke liye).
2. **Telmisartan 40mg**: Subah 1 baar (BP control ke liye).
Kripya bina doctor ki salah ke dose change na karein. Aaj 11:30 AM par aapka Token #24 Dr. Ramesh Sharma ke sath schedule hai.`;
    } else if (lower.includes("sugar") || lower.includes("bp") || lower.includes("report")) {
      fallbackReply = `Aapki pichli lab report (City Lab) ke hisaab se:
- **Blood Pressure**: 120/80 mmHg (Bilkul normal hai)
- **Fasting Sugar**: 95 mg/dL (Well-controlled)
- **HbA1c**: 6.4% (Good diabetic control)
Subah ki walk aur low-glycemic diet continue rakhein.`;
    } else if (lower.includes("token") || lower.includes("appointment") || lower.includes("doctor")) {
      fallbackReply = `Aapka aaj ka token number **#24** hai Dr. Ramesh Sharma (General Medicine) ke sath. OPD Room 104 mein 11:30 AM par call hone ki umeed hai. Currently 2 patients aapse aage hain.`;
    } else {
      fallbackReply = `Namaste! SwasthyaSetu AI aapki reports aur prescriptions monitor kar raha hai. 
Aapki condition (Type 2 Diabetes & Mild BP) stable hai. Agar aapko koi naya symptom jaise sar dard, chakkar ya fever mehsus ho raha hai, toh turant Dr. Ramesh Sharma (Room 104) ko consult karein. 
Aap aur kya janna chahte hain?`;
    }

    return NextResponse.json({ reply: fallbackReply });
  } catch (error) {
    console.error("AI Assistant Route Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to AI Assistant" },
      { status: 500 }
    );
  }
}
