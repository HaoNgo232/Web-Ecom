export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(dateObj);
}

export function formatShortDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);
}
