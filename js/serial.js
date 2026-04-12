export function createSerialController(ui) {
  let port = null;
  let reader = null;
  let espReady = false;

  async function connect() {
    try {
      if (!("serial" in navigator)) {
        ui.log("Web Serial is not supported in this browser. Use Chrome or Edge.", "error");
        ui.setAction("Unsupported", "red");
        return;
      }

      espReady = false;
      ui.setReady("waiting");
      ui.setAction("Selecting port", "blue");

      port = await navigator.serial.requestPort();
      const info = port.getInfo();

      ui.log(`Selected port VID=${info.usbVendorId || "?"} PID=${info.usbProductId || "?"}`);

      await port.open({ baudRate: 115200 });

      ui.setConnected(true);
      ui.setAction("Connected", "green");
      ui.log("ESP32 connected", "success");

      espReady = true;
      ui.setReady("ready");

      const decoder = new TextDecoderStream();
      port.readable.pipeTo(decoder.writable).catch(() => {});
      reader = decoder.readable.getReader();

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (!value) continue;

        buffer += value;

        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop();

        for (const line of lines) {
          const clean = line.trim();
          if (!clean) continue;

          ui.log("ESP32: " + clean, "esp");

          if (
            clean.includes("WAITING_CONFIG") ||
            clean.includes("Waiting for config") ||
            clean.includes("READY_FOR_CONFIG") ||
            clean.includes("Ready for config")
          ) {
            espReady = true;
            ui.setReady("ready");
            ui.setAction("Config mode", "green");
          }

          if (
            clean.includes("CONFIG_SAVED") ||
            clean.includes("Config saved")
          ) {
            espReady = false;
            ui.setReady("waiting");
            ui.setAction("Saved", "green");
            ui.showToast();
            ui.log("Configuration saved. ESP32 should reboot.", "success");
          }

          if (clean.includes("JSON_ERROR")) {
            ui.setAction("JSON error", "red");
            ui.log("ESP32 reported JSON_ERROR", "error");
          }
        }
      }
    } catch (err) {
      ui.setConnected(false);
      ui.setReady("idle");
      ui.setAction("Connect failed", "red");
      ui.log("Connect error: " + err.message, "error");
    }
  }

  async function send() {
    try {
      ui.log("Send button clicked");

      if (!port || !port.writable) {
        ui.log("Connect the ESP32 first.", "error");
        ui.setAction("No device", "red");
        return;
      }

      const config = ui.getConfigValues();

      let payloadObject;

      if (config.mode === "advanced") {
        if (!config.wifi || !config.wifi.length || !config.api) {
          ui.log("Advanced JSON must contain wifi[] and api.", "error");
          ui.setAction("Missing JSON fields", "red");
          return;
        }

        payloadObject = {
          wifi: config.wifi,
          api: config.api
        };
      } else {
        if (!config.ssid || !config.api) {
          ui.log("SSID and API key are required.", "error");
          ui.setAction("Missing fields", "red");
          return;
        }

        payloadObject = {
          ssid: config.ssid,
          pass: config.pass,
          api: config.api
        };
      }

      if (!espReady) {
        ui.log("ESP32 did not report ready, sending anyway...");
      }

      const payload = JSON.stringify(payloadObject) + "\n";

      ui.log("Sending JSON to ESP32...");
      const writer = port.writable.getWriter();
      await writer.write(new TextEncoder().encode(payload));
      writer.releaseLock();

      ui.elements.sendBtn.disabled = true;
      ui.setAction("Config sent", "blue");

      if (config.mode === "advanced") {
        ui.log(
          "Config sent: " +
            JSON.stringify({
              wifi: payloadObject.wifi.map((w) => ({
                ssid: w.ssid,
                pass: w.pass ? "***" : ""
              })),
              api: "***"
            }),
          "success"
        );
      } else {
        ui.log(
          "Config sent: " +
            JSON.stringify({
              ssid: payloadObject.ssid,
              pass: payloadObject.pass ? "***" : "",
              api: "***"
            }),
          "success"
        );
      }
    } catch (err) {
      ui.log("Send error: " + err.message, "error");
      ui.setAction("Send failed", "red");
    }
  }

  return {
    connect,
    send
  };
}