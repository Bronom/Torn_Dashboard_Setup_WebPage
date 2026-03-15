let port;
let reader;
let espReady = false;
let autoScroll = true;

const logDiv = document.getElementById("log");
const connDot = document.getElementById("connDot");
const connText = document.getElementById("connText");
const readyDot = document.getElementById("readyDot");
const readyText = document.getElementById("readyText");
const sendBtn = document.getElementById("sendBtn");
const passInput = document.getElementById("pass");
const togglePassBtn = document.getElementById("togglePassBtn");
const toast = document.getElementById("toast");
const hudLink = document.getElementById("hudLink");
const hudReady = document.getElementById("hudReady");
const hudAction = document.getElementById("hudAction");
const clearLogBtn = document.getElementById("clearLogBtn");

const projectSelect = document.getElementById("project");
const installBtn = document.getElementById("installBtn");
const flashBtn = document.getElementById("flashBtn");
const firmwareProjectLabel = document.getElementById("firmwareProjectLabel");
const firmwareError = document.getElementById("firmwareError");

const manifestMap = {
  "4inch": "./manifest-4inch.json",
  "2_8inch": "./manifest-2_8inch.json",
  "eink213": "./manifest-eink213.json"
};

const projectLabels = {
  "4inch": "Project: 4 Inch TFT",
  "2_8inch": "Project: 2.8 Inch TFT",
  "eink213": "Project: E-Ink 2.13"
};

logDiv.addEventListener("scroll", () => {
  const nearBottom =
    logDiv.scrollHeight - logDiv.scrollTop - logDiv.clientHeight < 10;
  autoScroll = nearBottom;
});

function log(msg, type = "info") {
  const line = document.createElement("div");

  const now = new Date();
  const time =
    now.getHours().toString().padStart(2, "0") + ":" +
    now.getMinutes().toString().padStart(2, "0") + ":" +
    now.getSeconds().toString().padStart(2, "0");

  line.innerHTML = `<span class="log-time">${time}</span> <span class="log-${type}">${msg}</span>`;
  logDiv.appendChild(line);

  if (autoScroll) {
    logDiv.scrollTop = logDiv.scrollHeight;
  }
}

function setConnected(connected) {
  connDot.className = connected ? "dot connected" : "dot";
  connText.textContent = connected ? "Connected" : "Disconnected";
  hudLink.textContent = connected ? "Online" : "Offline";
  hudLink.className = connected ? "hud-value green" : "hud-value red";
}

function setReady(state) {
  if (state === "ready") {
    readyDot.className = "dot connected";
    readyText.textContent = "ESP32 ready";
    sendBtn.disabled = false;
    hudReady.textContent = "Ready";
    hudReady.className = "hud-value green";
  } else if (state === "waiting") {
    readyDot.className = "dot waiting";
    readyText.textContent = "Waiting for ESP32";
    sendBtn.disabled = true;
    hudReady.textContent = "Waiting";
    hudReady.className = "hud-value blue";
  } else {
    readyDot.className = "dot";
    readyText.textContent = "Waiting for device";
    sendBtn.disabled = true;
    hudReady.textContent = "Standby";
    hudReady.className = "hud-value blue";
  }
}

function setAction(text, tone = "green") {
  hudAction.textContent = text;
  hudAction.className = `hud-value ${tone}`;
}

function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

function showFirmwareError(message) {
  firmwareError.textContent = message;
  firmwareError.hidden = false;
}

function hideFirmwareError() {
  firmwareError.hidden = true;
}

function setFirmwareProjectState(project) {
  if (!project || !manifestMap[project]) {
    installBtn.removeAttribute("manifest");
    firmwareProjectLabel.textContent = "Project: None";
    flashBtn.disabled = true;
    return;
  }

  installBtn.setAttribute("manifest", manifestMap[project]);
  firmwareProjectLabel.textContent = projectLabels[project] || "Project: Unknown";
  flashBtn.disabled = false;
}

togglePassBtn.addEventListener("click", () => {
  const isPassword = passInput.type === "password";
  passInput.type = isPassword ? "text" : "password";
  togglePassBtn.textContent = isPassword ? "Hide" : "Show";
});

clearLogBtn.addEventListener("click", () => {
  logDiv.textContent = "Log cleared...";
});

projectSelect.addEventListener("change", () => {
  const project = projectSelect.value;

  if (!project) {
    setFirmwareProjectState("");
    showFirmwareError("Please select a project version before installing firmware.");
    return;
  }

  setFirmwareProjectState(project);
  hideFirmwareError();
  setAction("Firmware selected", "blue");
  log(`Selected firmware project: ${project}`);
});

flashBtn.addEventListener("click", (e) => {
  const project = projectSelect.value;
  if (!project || !manifestMap[project]) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    showFirmwareError("Please select a project version before installing firmware.");
    setAction("Select project", "red");
    return false;
  }
  hideFirmwareError();
}, true);

async function connect() {
  try {
    if (!("serial" in navigator)) {
      log("Web Serial is not supported in this browser. Use Chrome or Edge.", "error");
      setAction("Unsupported", "red");
      return;
    }

    espReady = false;
    setReady("waiting");
    setAction("Selecting port", "blue");

    port = await navigator.serial.requestPort();
    const info = port.getInfo();

    log(`Selected port VID=${info.usbVendorId || "?"} PID=${info.usbProductId || "?"}`);

    await port.open({ baudRate: 115200 });

    setConnected(true);
    setAction("Connected", "green");
    log("ESP32 connected", "success");

    espReady = true;
    setReady("ready");

    const decoder = new TextDecoderStream();
    port.readable.pipeTo(decoder.writable).catch(() => {});
    reader = decoder.readable.getReader();

    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (!value) continue;

      buffer += value;

      let lines = buffer.split(/\r?\n/);
      buffer = lines.pop();

      for (const line of lines) {
        const clean = line.trim();
        if (!clean) continue;

        log("ESP32: " + clean, "esp");

        if (
          clean.includes("WAITING_CONFIG") ||
          clean.includes("Waiting for config") ||
          clean.includes("READY_FOR_CONFIG") ||
          clean.includes("Ready for config")
        ) {
          espReady = true;
          setReady("ready");
          setAction("Config mode", "green");
        }

        if (
          clean.includes("CONFIG_SAVED") ||
          clean.includes("Config saved")
        ) {
          espReady = false;
          setReady("waiting");
          setAction("Saved", "green");
          showToast();
          log("Configuration saved. ESP32 should reboot.", "success");
        }

        if (clean.includes("JSON_ERROR")) {
          setAction("JSON error", "red");
          log("ESP32 reported JSON_ERROR", "error");
        }
      }
    }
  } catch (err) {
    setConnected(false);
    setReady("idle");
    setAction("Connect failed", "red");
    log("Connect error: " + err.message, "error");
  }
}

async function send() {
  try {
    log("Send button clicked");

    if (!port || !port.writable) {
      log("Connect the ESP32 first.", "error");
      setAction("No device", "red");
      return;
    }

    const config = {
      ssid: document.getElementById("ssid").value.trim(),
      pass: document.getElementById("pass").value,
      api: document.getElementById("api").value.trim()
    };

    if (!config.ssid || !config.api) {
      log("SSID and API key are required.", "error");
      setAction("Missing fields", "red");
      return;
    }

    if (!espReady) {
      log("ESP32 did not report ready, sending anyway...");
    }

    const payload = JSON.stringify(config) + "\n";
    log("Sending JSON to ESP32...");

    const writer = port.writable.getWriter();
    await writer.write(new TextEncoder().encode(payload));
    writer.releaseLock();

    sendBtn.disabled = true;
    setAction("Config sent", "blue");

    log("Config sent: " + JSON.stringify({
      ssid: config.ssid,
      pass: config.pass ? "***" : "",
      api: config.api ? "***" : ""
    }), "success");
  } catch (err) {
    log("Send error: " + err.message, "error");
    setAction("Send failed", "red");
  }
}

document.getElementById("connectBtn").addEventListener("click", connect);
document.getElementById("sendBtn").addEventListener("click", send);

setFirmwareProjectState("");
setReady("idle");
setConnected(false);