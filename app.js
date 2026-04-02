const API = "https://server-divisas.onrender.com";

const baseSelect = document.getElementById("base");
const currencyPicker = document.getElementById("currencyPicker");
const addCurrencyBtn = document.getElementById("addCurrencyBtn");
const btn = document.getElementById("btn");
const cards = document.getElementById("cards");
const status = document.getElementById("status");
const selectedCurrenciesEl = document.getElementById("selectedCurrencies");

/*
  Mapa moneda -> país/región para bandera.
  En monedas regionales o especiales usamos una opción razonable.
  En metales o activos sin bandera clara, queda null y se muestra fallback 💱.
*/
const currencyToCountry = {
  AED: "ae",
  AFN: "af",
  ALL: "al",
  AMD: "am",
  ANG: "cw",
  AOA: "ao",
  ARS: "ar",
  AUD: "au",
  AWG: "aw",
  AZN: "az",
  BAM: "ba",
  BBD: "bb",
  BDT: "bd",
  BHD: "bh",
  BIF: "bi",
  BMD: "bm",
  BND: "bn",
  BOB: "bo",
  BRL: "br",
  BSD: "bs",
  BTN: "bt",
  BWP: "bw",
  BYN: "by",
  BZD: "bz",
  CAD: "ca",
  CDF: "cd",
  CHF: "ch",
  CLP: "cl",
  CNH: "cn",
  CNY: "cn",
  COP: "co",
  CRC: "cr",
  CUP: "cu",
  CVE: "cv",
  CZK: "cz",
  DJF: "dj",
  DKK: "dk",
  DOP: "do",
  DZD: "dz",
  EGP: "eg",
  ERN: "er",
  ETB: "et",
  EUR: "eu",
  FJD: "fj",
  FKP: "fk",
  GBP: "gb",
  GEL: "ge",
  GGP: "gg",
  GHS: "gh",
  GIP: "gi",
  GMD: "gm",
  GNF: "gn",
  GTQ: "gt",
  GYD: "gy",
  HKD: "hk",
  HNL: "hn",
  HTG: "ht",
  HUF: "hu",
  IDR: "id",
  ILS: "il",
  IMP: "im",
  INR: "in",
  IQD: "iq",
  IRR: "ir",
  ISK: "is",
  JEP: "je",
  JMD: "jm",
  JOD: "jo",
  JPY: "jp",
  KES: "ke",
  KGS: "kg",
  KHR: "kh",
  KMF: "km",
  KRW: "kr",
  KWD: "kw",
  KYD: "ky",
  KZT: "kz",
  LAK: "la",
  LBP: "lb",
  LKR: "lk",
  LRD: "lr",
  LSL: "ls",
  LYD: "ly",
  MAD: "ma",
  MDL: "md",
  MGA: "mg",
  MKD: "mk",
  MMK: "mm",
  MNT: "mn",
  MOP: "mo",
  MRO: "mr",
  MRU: "mr",
  MUR: "mu",
  MVR: "mv",
  MWK: "mw",
  MXN: "mx",
  MYR: "my",
  MZN: "mz",
  NAD: "na",
  NGN: "ng",
  NIO: "ni",
  NOK: "no",
  NPR: "np",
  NZD: "nz",
  OMR: "om",
  PAB: "pa",
  PEN: "pe",
  PGK: "pg",
  PHP: "ph",
  PKR: "pk",
  PLN: "pl",
  PYG: "py",
  QAR: "qa",
  RON: "ro",
  RSD: "rs",
  RUB: "ru",
  RWF: "rw",
  SAR: "sa",
  SBD: "sb",
  SCR: "sc",
  SDG: "sd",
  SEK: "se",
  SGD: "sg",
  SHP: "sh",
  SLE: "sl",
  SOS: "so",
  SRD: "sr",
  SSP: "ss",
  STN: "st",
  SVC: "sv",
  SYP: "sy",
  SZL: "sz",
  THB: "th",
  TJS: "tj",
  TMT: "tm",
  TND: "tn",
  TOP: "to",
  TRY: "tr",
  TTD: "tt",
  TWD: "tw",
  TZS: "tz",
  UAH: "ua",
  UGX: "ug",
  USD: "us",
  UYU: "uy",
  UZS: "uz",
  VES: "ve",
  VND: "vn",
  VUV: "vu",
  WST: "ws",
  XAF: "cm",
  XAG: null,
  XAU: null,
  XCD: "ag",
  XCG: "cw",
  XOF: "sn",
  XPF: "pf",
  YER: "ye",
  ZAR: "za",
  ZMW: "zm",
  ZWG: "zw"
};

let currenciesByCode = {};
let selectedCurrencies = [];

function setStatus(message, isError = false) {
  status.textContent = message;
  status.style.color = isError ? "#ef4444" : "";
}

function clearCards() {
  cards.innerHTML = "";
}

function formatARS(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2
  }).format(value);
}

function normalizeCode(code) {
  return String(code || "").trim().toUpperCase();
}

function getCurrencyName(code) {
  return currenciesByCode[code]?.name || code;
}

function getCurrencySymbol(code) {
  return currenciesByCode[code]?.symbol || "";
}

function getFlagUrl(code) {
  const country = currencyToCountry[code];
  if (!country) return null;
  return `https://flagcdn.com/w80/${country}.png`;
}

function createCard(code, subtitle, value) {
  const card = document.createElement("article");
  card.className = "card";

  const name = getCurrencyName(code);
  const symbol = getCurrencySymbol(code);
  const flagUrl = getFlagUrl(code);

  card.innerHTML = `
    <div class="card-header">
      ${
        flagUrl
          ? `<img src="${flagUrl}" alt="${name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';" />`
          : ""
      }
      <span class="card-fallback-icon" style="${flagUrl ? "display:none;" : "display:inline-flex;"}">💱</span>
      <div class="card-title-group">
        <h3>${name}</h3>
        <span class="card-code">${code}${symbol ? ` • ${symbol}` : ""}</span>
      </div>
    </div>
    <small>${subtitle}</small>
    <p>${value}</p>
  `;

  cards.appendChild(card);
}

function normalizeCurrenciesData(rawData) {
  const normalized = {};

  if (!Array.isArray(rawData)) return normalized;

  rawData.forEach((item) => {
    if (!item || typeof item !== "object") return;

    const code = normalizeCode(item.iso_code || item.code || item.currency);
    const name = String(item.name || code || "").trim();
    const symbol = String(item.symbol || "").trim();

    if (!/^[A-Z]{3}$/.test(code)) return;

    normalized[code] = {
      name: name || code,
      symbol
    };
  });

  return normalized;
}

function fillSelect(selectElement, currenciesObject) {
  selectElement.innerHTML = "";

  Object.entries(currenciesObject)
    .sort((a, b) => a[1].name.localeCompare(b[1].name))
    .forEach(([code, info]) => {
      if (code === "ARS") return;

      const option = document.createElement("option");
      option.value = code;
      option.textContent = `${info.name} (${code})`;
      selectElement.appendChild(option);
    });
}

function renderSelectedCurrencies() {
  selectedCurrenciesEl.innerHTML = "";

  if (!selectedCurrencies.length) {
    selectedCurrenciesEl.innerHTML = `<p class="empty-selection">No seleccionaste monedas extra.</p>`;
    return;
  }

  selectedCurrencies.forEach((code) => {
    const chip = document.createElement("div");
    chip.className = "currency-chip";

    const name = getCurrencyName(code);
    const flagUrl = getFlagUrl(code);

    chip.innerHTML = `
      <div class="chip-left">
        ${
          flagUrl
            ? `<img src="${flagUrl}" alt="${name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';" />`
            : ""
        }
        <span class="card-fallback-icon" style="${flagUrl ? "display:none;" : "display:inline-flex;"}">💱</span>
        <span>${name} (${code})</span>
      </div>
      <button type="button" class="remove-chip" data-code="${code}">✕</button>
    `;

    selectedCurrenciesEl.appendChild(chip);
  });

  document.querySelectorAll(".remove-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const code = button.dataset.code;
      selectedCurrencies = selectedCurrencies.filter((item) => item !== code);
      renderSelectedCurrencies();
      fetchMultipleRates();
    });
  });
}

function addSelectedCurrency() {
  const code = normalizeCode(currencyPicker.value);
  const mainCode = normalizeCode(baseSelect.value);

  if (!code || code === "ARS" || code === mainCode) return;
  if (selectedCurrencies.includes(code)) return;

  selectedCurrencies.push(code);
  renderSelectedCurrencies();
  fetchMultipleRates();
}

async function loadCurrencies() {
  try {
    setStatus("Cargando monedas...");

    const response = await fetch(`${API}/api/currency/currencies`);
    const result = await response.json();

    console.log("Currencies response:", result);

    if (!response.ok || !result.success || !result.data) {
      throw new Error(result.message || "No se pudieron cargar las monedas");
    }

    currenciesByCode = normalizeCurrenciesData(result.data);

    if (!Object.keys(currenciesByCode).length) {
      throw new Error("No se encontraron monedas válidas");
    }

    fillSelect(baseSelect, currenciesByCode);
    fillSelect(currencyPicker, currenciesByCode);

    if ([...baseSelect.options].some((opt) => opt.value === "USD")) {
      baseSelect.value = "USD";
    } else {
      baseSelect.selectedIndex = 0;
    }

    selectedCurrencies = ["EUR", "BRL", "KES", "GBP"].filter(
      (code) => currenciesByCode[code] && code !== normalizeCode(baseSelect.value)
    );

    renderSelectedCurrencies();
    setStatus("Monedas cargadas correctamente.");
  } catch (error) {
    console.error("loadCurrencies error:", error);
    setStatus(`Error al cargar monedas: ${error.message}`, true);
  }
}

function normalizeSingleRatePayload(data) {
  if (typeof data === "number") return data;

  if (data && typeof data === "object") {
    if (typeof data.amount === "number") return data.amount;
    if (typeof data.rate === "number") return data.rate;
    if (typeof data.value === "number") return data.value;

    if (data.rates && typeof data.rates === "object") {
      const firstValue = Object.values(data.rates)[0];
      if (typeof firstValue === "number") return firstValue;
    }
  }

  return null;
}

function getRequestedCurrencies() {
  const main = normalizeCode(baseSelect.value);
  const extras = selectedCurrencies.map(normalizeCode);

  return [...new Set([main, ...extras])].filter(
    (code) => /^[A-Z]{3}$/.test(code) && code !== "ARS"
  );
}

async function fetchCurrencyRate(code) {
  const url = `${API}/api/currency/rate/${encodeURIComponent(code)}/ARS`;
  console.log("Fetching:", url);

  const response = await fetch(url);
  const result = await response.json();

  console.log(`Rate response for ${code}:`, result);

  if (!response.ok || !result.success) {
    throw new Error(result.message || `No se pudo obtener la cotización de ${code}`);
  }

  const rateValue = normalizeSingleRatePayload(result.data);

  if (rateValue === null) {
    throw new Error(`No se encontró una cotización válida para ${code}`);
  }

  return rateValue;
}

async function fetchMultipleRates() {
  try {
    const codes = getRequestedCurrencies();

    if (!codes.length) {
      throw new Error("Seleccioná al menos una moneda válida");
    }

    setStatus("Cargando cotizaciones...");
    clearCards();

    const results = await Promise.allSettled(
      codes.map(async (code) => {
        const value = await fetchCurrencyRate(code);
        return { code, value };
      })
    );

    let successCount = 0;

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        const { code, value } = result.value;

        createCard(
          code,
          `Valor de 1 ${getCurrencyName(code)} en pesos argentinos`,
          formatARS(value)
        );

        successCount += 1;
      } else {
        console.error("Currency fetch failed:", result.reason);
      }
    });

    if (!successCount) {
      throw new Error("No se pudo obtener ninguna cotización");
    }

    setStatus(`Cotizaciones actualizadas: ${successCount} moneda(s).`);
  } catch (error) {
    console.error("fetchMultipleRates error:", error);
    setStatus(`Error al cargar datos: ${error.message}`, true);
  }
}

addCurrencyBtn.addEventListener("click", addSelectedCurrency);
btn.addEventListener("click", fetchMultipleRates);

baseSelect.addEventListener("change", () => {
  selectedCurrencies = selectedCurrencies.filter(
    (code) => code !== normalizeCode(baseSelect.value)
  );
  renderSelectedCurrencies();
  fetchMultipleRates();
});

window.addEventListener("DOMContentLoaded", async () => {
  await loadCurrencies();
  await fetchMultipleRates();

  setInterval(fetchMultipleRates, 30000);
});