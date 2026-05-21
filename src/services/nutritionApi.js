const API_BASE = import.meta.env.VITE_NUTRITION_API_BASE || "/api/nutrition";

export async function fetchNutrition(query, { signal } = {}) {
  const trimmedQuery = query.trim();
  const url = `${API_BASE}?query=${encodeURIComponent(trimmedQuery)}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

async function getErrorMessage(response) {
  if (response.status === 401 || response.status === 403) {
    return "API key ไม่ถูกต้องหรือไม่มีสิทธิ์ใช้งาน";
  }

  if (response.status === 429) {
    return "เรียกใช้งาน API ถี่เกินไป กรุณาลองใหม่อีกครั้ง";
  }

  try {
    const data = await response.json();
    return data.error || data.message || "ไม่สามารถดึงข้อมูลโภชนาการได้";
  } catch {
    return "ไม่สามารถดึงข้อมูลโภชนาการได้";
  }
}
