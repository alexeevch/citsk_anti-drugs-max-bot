import { Keyboard } from "@maxhub/max-bot-api";
import type { Button } from "@maxhub/max-bot-api/types";

/**
 * Создает inline-клавиатуру с указанным количеством колонок.
 * Если колонки не заданы, количество колонок вычисляется автоматически так,
 * чтобы клавиатура занимала не более 30 строк.
 *
 * @param buttons - Массив кнопок Keyboard.button.*
 * @param columns - Количество колонок в строке (опционально)
 * @returns Keyboard.inlineKeyboard([...])
 */
export function buildInlineKeyboard(buttons: Button[], columns?: number) {
  if (!buttons.length) {
    return Keyboard.inlineKeyboard([]);
  }

  if (!columns) {
    const maxRows = 30;
    const autoColumns = Math.ceil(buttons.length / maxRows);
    columns = Math.max(autoColumns, 1);
  }

  const rows: Button[][] = [];

  for (let i = 0; i < buttons.length; i += columns) {
    rows.push(buttons.slice(i, i + columns));
  }

  return Keyboard.inlineKeyboard(rows);
}
