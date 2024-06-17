import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
    const translation = await openai.audio.translations.create({
      file: fs.createReadStream("audio/demo1.mp3"),
      model: "whisper-1",
      response_format: "verbose_json", // デフォルトはJSON。
    });

    console.log(translation);
}
main();