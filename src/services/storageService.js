import {
  HISTORY_STORAGE_KEY,
  BOXES_STORAGE_KEY,
  MOVEMENTS_STORAGE_KEY,
  THEME_STORAGE_KEY
} from "../utils/constants.js";

export function loadHistory() {
  try {
    const savedHistory = JSON.parse(
      localStorage.getItem(HISTORY_STORAGE_KEY) || "[]"
    );
    return Array.isArray(savedHistory)
      ? savedHistory.filter((item) => item && item.number)
      : [];
  } catch (error) {
    console.warn("Não foi possível carregar o histórico.", error);
    return [];
  }
}

export function saveHistory(history) {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

export function removeHistory() {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
}

export function loadBoxes() {
  try {
    return JSON.parse(localStorage.getItem(BOXES_STORAGE_KEY) || "[]");
  } catch (error) {
    console.warn("Não foi possível carregar as caixas.", error);
    return [];
  }
}

export function saveBoxes(boxes) {
  localStorage.setItem(BOXES_STORAGE_KEY, JSON.stringify(boxes));
}

export function loadMovements() {
  try {
    return JSON.parse(localStorage.getItem(MOVEMENTS_STORAGE_KEY) || "[]");
  } catch (error) {
    console.warn("Não foi possível carregar as movimentações.", error);
    return [];
  }
}

export function saveMovements(movements) {
  localStorage.setItem(MOVEMENTS_STORAGE_KEY, JSON.stringify(movements));
}

export function loadTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || "light";
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
