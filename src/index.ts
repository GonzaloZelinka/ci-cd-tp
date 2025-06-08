/**
 * Dynamic Personal Dashboard
 * A live dashboard with dynamic content for GitHub Pages
 */

export interface DashboardData {
  timestamp: string;
  uptime: number;
  version: string;
  status: string;
}

export function getCurrentTime(): string {
  return new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

export function getUptime(): number {
  // Simulate uptime since app start
  return Date.now() - (Date.now() - 86400000); // 24 hours ago
}

export function getDashboardData(): DashboardData {
  return {
    timestamp: getCurrentTime(),
    uptime: getUptime(),
    version: "2.0.0",
    status: "🟢 Online",
  };
}

export function generateQuote(): string {
  const quotes = [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "The only way to do great work is to love what you do.",
    "Innovation distinguishes between a leader and a follower.",
  ];

  const today = new Date().getDate();
  return quotes[today % quotes.length];
}

export function main(): void {
  const data = getDashboardData();
  console.log("🚀 Dynamic Dashboard Starting...");
  console.log(`Timestamp: ${data.timestamp}`);
  console.log(`Version: ${data.version}`);
  console.log(`Status: ${data.status}`);
  console.log(`Quote: ${generateQuote()}`);
  console.log("✅ Dashboard ready for GitHub Pages!");
}

// Execute main function
main();
