import indexHtml from "./index.html";

import mergedFirmware from "./firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.merged.bin";

const manifest = {
  "name": "ESP32-S3 Torn Dashboard",
  "version": "1.0.0",
  "new_install_prompt_erase": true,
  "builds": [
    {
      "chipFamily": "ESP32-S3",
      "parts": [
        {
          "path": "/firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.merged.bin",
          "offset": 0
        }
      ]
    }
  ]
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(indexHtml, {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          "cache-control": "no-store"
        }
      });
    }

    if (url.pathname === "/manifest.json") {
      return new Response(JSON.stringify(manifest), {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "cache-control": "no-store"
        }
      });
    }

    if (url.pathname === "/firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.merged.bin") {
      return new Response(mergedFirmware, {
        headers: { "content-type": "application/octet-stream" }
      });
    }

    return new Response("Not found", { status: 404 });
  }
};