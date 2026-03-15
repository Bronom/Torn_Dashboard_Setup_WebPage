const basePath = window.location.pathname.replace(/\/[^/]*$/, "/");

export const manifestMap = {
  "4inch": `${basePath}firmware/manifest/manifest-4inch.json`,
  "2_8inch": `${basePath}firmware/manifest/manifest-2_8inch.json`,
  "eink213": `${basePath}firmware/manifest/manifest-eink213.json`
};

export const projectLabels = {
  "4inch": "Project: 4 Inch TFT",
  "2_8inch": "Project: 2.8 Inch TFT",
  "eink213": "Project: E-Ink 2.13"
};

export function setFirmwareProjectState(ui, project) {
  const { installBtn, firmwareProjectLabel, flashBtn } = ui.elements;

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

export function initFirmware(ui) {
  const { projectSelect, flashBtn } = ui.elements;

  projectSelect.addEventListener("change", () => {
    const project = projectSelect.value;

    if (!project) {
      setFirmwareProjectState(ui, "");
      ui.showFirmwareError("Please select a project version before installing firmware.");
      return;
    }

    setFirmwareProjectState(ui, project);
    ui.hideFirmwareError();
    ui.setAction("Firmware selected", "blue");
    ui.log(`Selected firmware project: ${project}`);
  });

  flashBtn.addEventListener("click", (e) => {
    const project = projectSelect.value;

    if (!project || !manifestMap[project]) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      ui.showFirmwareError("Please select a project version before installing firmware.");
      ui.setAction("Select project", "red");
      return false;
    }

    ui.hideFirmwareError();
  }, true);

  setFirmwareProjectState(ui, "");
}