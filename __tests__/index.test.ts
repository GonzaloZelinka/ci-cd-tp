import { getMessage, getVersion } from "../src/index";

describe("TypeScript CI/CD Demo Tests", () => {
  test("should return correct greeting message", () => {
    const message = getMessage();
    expect(message).toBe("Hello World from TypeScript CI/CD Demo!");
  });

  test("should return correct version", () => {
    const version = getVersion();
    expect(version).toBe("1.0.0");
  });

  test("message should contain Hello World", () => {
    const message = getMessage();
    expect(message).toContain("Hello World");
  });

  test("message should contain CI/CD", () => {
    const message = getMessage();
    expect(message).toContain("CI/CD");
  });
});
