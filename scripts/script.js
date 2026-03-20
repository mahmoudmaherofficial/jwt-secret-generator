const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const secretOutput = document.getElementById("secretOutput");
const secretLength = document.getElementById("secretLength");
const lengthValue = document.getElementById("lengthValue");
const statusMessage = document.getElementById("statusMessage");

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

function updateLengthLabel() {
  lengthValue.textContent = `${secretLength.value} chars`;
}

function generateSecret(length) {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (value) => CHARSET[value % CHARSET.length]).join("");
}

function setStatus(message) {
  statusMessage.textContent = message;
}

generateBtn.addEventListener("click", () => {
  const length = Number(secretLength.value);
  const secret = generateSecret(length);

  secretOutput.value = secret;
  setStatus(`Generated a ${length}-character JWT secret.`);
});

copyBtn.addEventListener("click", async () => {
  if (!secretOutput.value) {
    setStatus("Generate a secret before copying.");
    return;
  }

  try {
    await navigator.clipboard.writeText(secretOutput.value);
    setStatus("Secret copied to clipboard.");
  } catch (error) {
    setStatus("Copy failed. Please copy the secret manually.");
  }
});

secretLength.addEventListener("input", updateLengthLabel);

updateLengthLabel();
