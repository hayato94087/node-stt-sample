import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio/demo1.mp3"),
    model: "whisper-1",
    response_format: "verbose_json", // デフォルトはJSON。
  });

  const language = "英語";

  console.log('音声認識結果\n', transcription?.text ?? "");

  // 専門用語を追加
  const systemPrompt = `あなたは有能なアシスタントです。あなたの任務は入力されたテキストを${language}に翻訳してください。翻訳結果のみを出力死てください。`;

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

  console.log('翻訳結果\n', completion?.choices[0]?.message.content);
}
main();