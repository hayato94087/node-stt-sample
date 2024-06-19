import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio/demo2.wav"),
    model: "whisper-1",
    response_format: "verbose_json", // デフォルトはJSON。
  });

  console.log(transcription);
}
main();