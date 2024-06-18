import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio/demo2.wav"),
    model: "whisper-1",
    response_format: "verbose_json", // デフォルトはJSON。
    prompt:"株式会社ホゲホゲMAX, 灼熱でぃあぼろす, 勇者ポンぽこポコぽん", // 専門用語を追加
  });

  console.log(transcription);
}
main();