export function createUI() {
  const elements = {
    logDiv: document.getElementById("log"),
    connDot: document.getElementById("connDot"),
    connText: document.getElementById("connText"),
    readyDot: document.getElementById("readyDot"),
    readyText: document.getElementById("readyText"),
    sendBtn: document.getElementById("sendBtn"),
    connectBtn: document.getElementById("connectBtn"),
    passInput: document.getElementById("pass"),
    togglePassBtn: document.getElementById("togglePassBtn"),
    toast: document.getElementById("toast"),
    hudLink: document.getElementById("hudLink"),
    hudReady: document.getElementById("hudReady"),
    hudAction: document.getElementById("hudAction"),
    clearLogBtn: document.getElementById("clearLogBtn"),
    projectSelect: document.getElementById("project"),
    installBtn: document.getElementById("installBtn"),
    flashBtn: document.getElementById("flashBtn"),
    firmwareProjectLabel: document.getElementById("firmwareProjectLabel"),
    firmwareError: document.getElementById("firmwareError"),
    ssidInput: document.getElementById("ssid"),
    apiInput: document.getElementById("api"),

    advancedJsonToggle: document.getElementById("advancedJsonToggle"),
    advancedJsonWrap: document.getElementById("advancedJsonWrap"),
    advancedJson: document.getElementById("advancedJson")
  };

  let autoScroll = true;

  elements.logDiv.addEventListener("scroll", () => {
    const nearBottom =
      elements.logDiv.scrollHeight - elements.logDiv.scrollTop - elements.logDiv.clientHeight < 10;
    autoScroll = nearBottom;
  });

  function log(msg, type = "info") {
    const line = document.createElement("div");
    const now = new Date();
    const time =
      now.getHours().toString().padStart(2, "0") + ":" +
      now.getMinutes().toString().padStart(2, "0") + ":" +
      now.getSeconds().toString().padStart(2, "0");
    line.innerHTML = `${time} ${msg}`;
    elements.logDiv.appendChild(line);
    if (autoScroll) {
      elements.logDiv.scrollTop = elements.logDiv.scrollHeight;
    }
  }

  function clearLog() {
    elements.logDiv.textContent = "Log cleared...";
  }

  function setConnected(connected) {
    elements.connDot.className = connected ? "dot connected" : "dot";
    elements.connText.textContent = connected ? "Connected" : "Disconnected";
    elements.hudLink.textContent = connected ? "Online" : "Offline";
    elements.hudLink.className = connected ? "hud-value green" : "hud-value red";
  }

  function setReady(state) {
    if (state === "ready") {
      elements.readyDot.className = "dot connected";
      elements.readyText.textContent = "ESP32 ready";
      elements.sendBtn.disabled = false;
      elements.hudReady.textContent = "Ready";
      elements.hudReady.className = "hud-value green";
    } else if (state === "waiting") {
      elements.readyDot.className = "dot waiting";
      elements.readyText.textContent = "Waiting for ESP32";
      elements.sendBtn.disabled = true;
      elements.hudReady.textContent = "Waiting";
      elements.hudReady.className = "hud-value blue";
    } else {
      elements.readyDot.className = "dot";
      elements.readyText.textContent = "Waiting for device";
      elements.sendBtn.disabled = true;
      elements.hudReady.textContent = "Standby";
      elements.hudReady.className = "hud-value blue";
    }
  }

  function setAction(text, tone = "green") {
    elements.hudAction.textContent = text;
    elements.hudAction.className = `hud-value ${tone}`;
  }

  function showToast() {
    elements.toast.classList.add("show");
    setTimeout(() => elements.toast.classList.remove("show"), 3500);
  }

  function showFirmwareError(message) {
    elements.firmwareError.textContent = message;
    elements.firmwareError.hidden = false;
  }

  function hideFirmwareError() {
    elements.firmwareError.hidden = true;
  }

  function updateAdvancedMode() {
    const advanced = elements.advancedJsonToggle?.checked ?? false;

    if (elements.advancedJsonWrap) {
      elements.advancedJsonWrap.hidden = !advanced;
    }

    elements.ssidInput.disabled = advanced;
    elements.passInput.disabled = advanced;
    elements.apiInput.disabled = advanced;

    if (elements.togglePassBtn) {
      elements.togglePassBtn.disabled = advanced;
    }
  }

  function parseAdvancedJson(text) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Advanced JSON is not valid JSON.");
    }

    if (!parsed || typeof parsed !== "object") {
      throw new Error("Advanced JSON must be an object.");
    }

    if (!Array.isArray(parsed.wifi) || parsed.wifi.length === 0) {
      throw new Error('Advanced JSON must include a "wifi" array with at least one entry.');
    }

    for (const entry of parsed.wifi) {
      if (!entry || typeof entry.ssid !== "string" || !entry.ssid.trim()) {
        throw new Error('Each wifi entry must include a non-empty "ssid".');
      }
      if (typeof entry.pass !== "string") {
        throw new Error('Each wifi entry must include a "pass" string.');
      }
    }

    if (typeof parsed.api !== "string" || !parsed.api.trim()) {
      throw new Error('Advanced JSON must include a non-empty "api".');
    }

    return {
      wifi: parsed.wifi.map((entry) => ({
        ssid: entry.ssid.trim(),
        pass: entry.pass
      })),
      api: parsed.api.trim()
    };
  }

  function getConfigValues() {
    const advanced = elements.advancedJsonToggle.checked;

    if (advanced) {
      return {
        mode: "advanced",
        ...parseAdvancedJson(elements.advancedJson.value.trim())
      };
    }

    return {
      mode: "basic",
      ssid: elements.ssidInput.value.trim(),
      pass: elements.passInput.value,
      api: elements.apiInput.value.trim()
    };
  }

  elements.advancedJsonToggle?.addEventListener("change", updateAdvancedMode);
  updateAdvancedMode();

  return {
    elements,
    log,
    clearLog,
    setConnected,
    setReady,
    setAction,
    showToast,
    showFirmwareError,
    hideFirmwareError,
    getConfigValues
  };
}