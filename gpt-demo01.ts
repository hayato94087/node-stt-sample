import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();


async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio/demo2.wav"),
    model: "whisper-1",
    response_format: "verbose_json", // デフォルトはJSON。
  });


  console.log('音声認識結果（補正前）\n', transcription?.text ?? "");

  // 専門用語を追加
  const systemPrompt = "あなたは株式会社ほげほげMAXの有能なアシスタントです。あなたの任務は作成されたテキストのスペルの不一致を修正することです。次の言葉が正しく綴られていることを確認してください。株式会社ホゲホゲMAX, 灼熱でぃあぼろす, 勇者ポンぽこポコぽん。必要な句読点（ピリオド、カンマ、大文字など）のみを追加し、提供された文脈のみを使用してください。";

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: transcription.text
      }
    ]
  });

  console.log('音声認識結果（補正後）\n', completion?.choices[0]?.message.content);
}
main();