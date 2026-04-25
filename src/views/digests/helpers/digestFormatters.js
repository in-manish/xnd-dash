export const stripHtml = (html = "") => {
  if (typeof document === "undefined") return String(html).replace(/<[^>]+>/g, " ");
  const element = document.createElement("div");
  element.innerHTML = html;
  return element.textContent || element.innerText || "";
};

export const clampText = (value = "", max = 180) => {
  const text = stripHtml(value).replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
};

export const formatNumber = (value) => {
  if (value == null || value === "") return "0";
  return new Intl.NumberFormat("en-IN").format(Number(value) || 0);
};

export const formatDecimal = (value, suffix = "") => {
  if (value == null || value === "") return "0";
  return `${Number(value).toFixed(1)}${suffix}`;
};

export const getPersonName = (person) => person?.name || person?.email || "Unassigned";

export const getPrimarySource = (digest) => {
  const source = digest?.source;
  if (!source || Object.keys(source).length === 0) return null;
  return source;
};

export const DEFAULT_DIGEST_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'><rect width='640' height='360' fill='hsl(240 10% 94%)'/><rect x='64' y='72' width='512' height='216' rx='24' fill='hsl(240 10% 98%)' stroke='hsl(240 10% 84%)'/><circle cx='140' cy='140' r='28' fill='hsl(240 10% 88%)'/><path d='M120 206l58-54 44 40 70-72 104 86H120z' fill='hsl(240 10% 86%)'/><text x='320' y='252' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='24' font-weight='700' fill='hsl(240 10% 45%)'>DailyBrief Digest</text></svg>"
)}`;

export const handleDigestImageError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = DEFAULT_DIGEST_IMAGE;
};
