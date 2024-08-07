import * as fs from "fs";
import * as path from "path";

const logFilePath = path.join(process.cwd(), "logs", "chat.log");

// Ensure the logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function logMessage(message: string, role: string): void {
  const timestamp = formatDate(new Date());
  const logEntry = `${timestamp} | ${role} - ${message}\n`;
  fs.appendFileSync(logFilePath, logEntry, "utf8");
}
