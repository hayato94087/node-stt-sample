import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio/demo1.mp3"),
    model: "whisper-1",
    response_format: "verbose_json", // デフォルトはJSON。
    temperature: 0.8 // デフォルトは0。1.0に近づくほどランダム性が増す
  });

  console.log(transcription);
}
main();