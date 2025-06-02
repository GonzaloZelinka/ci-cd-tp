/**
 * Main application entry point
 * A simple TypeScript demo for CI/CD pipeline
 */

export function getMessage(): string {
  return "Hello World from TypeScript CI/CD Demo!";
}

export function getVersion(): string {
  return "1.0.0";
}

export function main(): void {
  console.log(getMessage());
  console.log(`Version: ${getVersion()}`);
  console.log("🚀 CI/CD Pipeline Demo - Running successfully!");
}

// Execute main function
main();
