import indexHtml from "./index.html";

const GITHUB_OWNER = "Bronom";
const GITHUB_REPO = "Torn_Dashboard_ESP32_TFT_4Inch";

const manifest = {
  name: "ESP32-S3 Torn Dashboard",
  version: "latest",
  builds: [
    {
      chipFamily: "ESP32-S3",
      parts: [
        {
          path: "/Torn_Dashboard_ESP32_TFT_4Inch.ino.merged.bin",
          offset: 0
        }
      ]
    }
  ]
};

function githubLatestAssetUrl(assetName) {
  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest/download/${assetName}`;
}

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

    if (url.pathname === "/Torn_Dashboard_ESP32_TFT_4Inch.ino.merged.bin") {
      const githubUrl = githubLatestAssetUrl("Torn_Dashboard_ESP32_TFT_4Inch.ino.merged.bin");
      const resp = await fetch(githubUrl, {
        redirect: "follow",
        headers: {
          "User-Agent": "Cloudflare-Worker"
        }
      });

      if (!resp.ok) {
        return new Response(`GitHub fetch failed: ${resp.status}`, { status: 502 });
      }

      return new Response(resp.body, {
        headers: {
          "content-type": "application/octet-stream",
          "cache-control": "no-store"
        }
      });
    }

    return new Response("Not found", { status: 404 });
  }
};