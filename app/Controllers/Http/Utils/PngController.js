"use strict";
const compressImg = use("compress-images");

class PngController {
  async compress({ request }) {
    const img = request.file("image", { types: ["image"], size: "2mb" });

    await compress_images(
      img,
      Helpers.tmpPath("uploads"),
      {
        compress_force: false,
        statistic: true,
        autoupdate: true
      },
      false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
      { png: { engine: "pngquant", command: ["--quality=20-50"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      {
        gif: {
          engine: "gifsicle",
          command: ["--colors", "64", "--use-col=web"]
        }
      }
    );
  }
}

module.exports = PngController;
