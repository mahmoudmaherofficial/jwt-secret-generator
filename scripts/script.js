const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const secretOutput = document.getElementById("secretOutput");
const secretLength = document.getElementById("secretLength");
const includeSpecialChars = document.getElementById("includeSpecialChars");
const lengthValue = document.getElementById("lengthValue");
const statusMessage = document.getElementById("statusMessage");
const currentYear = document.getElementById("currentYear");

const LENGTH_OPTIONS = [32, 64, 128, 265, 512, 1024];
const HEX_CHARSET = "0123456789abcdef";
const SPECIAL_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$%&?";

function updateLengthLabel() {
  lengthValue.textContent = `${getSelectedLength()} chars`;
}

function getSelectedLength() {
  return LENGTH_OPTIONS[Number(secretLength.value)];
}

function generateFromCharset(length, charset) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (value) => charset[value % charset.length]).join("");
}

function generateHexSecret(length) {
  return generateFromCharset(length, HEX_CHARSET);
}

function setStatus(message) {
  statusMessage.textContent = message;
}

generateBtn.addEventListener("click", () => {
  const length = getSelectedLength();
  const useSpecialChars = includeSpecialChars.checked;
  const secret = useSpecialChars
    ? generateFromCharset(length, SPECIAL_CHARSET)
    : generateHexSecret(length);

  secretOutput.value = secret;
  setStatus(
    `Generated a ${length}-character JWT secret${useSpecialChars ? " with special characters." : " in lowercase hex format."}`
  );
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
currentYear.textContent = new Date().getFullYear();
