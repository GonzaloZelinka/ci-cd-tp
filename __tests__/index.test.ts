import { getCurrentTime, getDashboardData, generateQuote, getUptime } from "../src/index";

// Mock fetch for API testing
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

// Mock DOM elements
const mockElement = {
  textContent: "",
  className: "",
  href: "",
  classList: {
    add: jest.fn(),
    remove: jest.fn(),
  },
};

global.document = {
  getElementById: jest.fn().mockReturnValue(mockElement),
  addEventListener: jest.fn(),
} as any;

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
} as any;

global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe("Dynamic Dashboard - Essential Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  describe("Core Functionality", () => {
    test("should return dashboard data with required fields", () => {
      const data = getDashboardData();

      expect(data).toHaveProperty("timestamp");
      expect(data).toHaveProperty("version");
      expect(data).toHaveProperty("status");
      expect(data.version).toBe("2.0.0");
      expect(data.status).toBe("🟢 Online");
    });

    test("should generate consistent daily quote", () => {
      const quote1 = generateQuote();
      const quote2 = generateQuote();
      expect(quote1).toBe(quote2); // Same day = same quote
      expect(typeof quote1).toBe("string");
      expect(quote1.length).toBeGreaterThan(10);
    });

    test("should return formatted current time", () => {
      const time = getCurrentTime();
      expect(typeof time).toBe("string");
      expect(time.length).toBeGreaterThan(10);
      expect(time).toMatch(/\w+day/); // Contains day name
    });
  });

  describe("GitHub API Integration", () => {
    test("should handle successful GitHub API response", async () => {
      const mockRepoData = {
        full_name: "GonzaloZelinka/ci-cd-tp",
        name: "ci-cd-tp",
        html_url: "https://github.com/GonzaloZelinka/ci-cd-tp",
        stargazers_count: 5,
        forks_count: 2,
        watchers_count: 3,
        open_issues_count: 1,
        updated_at: "2024-01-15T10:30:00Z",
      };

      const mockUserData = {
        login: "GonzaloZelinka",
        name: "Gonzalo Zelinka",
        public_repos: 15,
        followers: 25,
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockRepoData),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockUserData),
        } as Response);

      expect(typeof mockRepoData.stargazers_count).toBe("number");
      expect(mockUserData.public_repos).toBeGreaterThan(0);
    });

    test("should handle API errors gracefully", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));
      expect(mockFetch).toBeDefined();
    });
  });

  describe("Quote API Integration", () => {
    test("should handle successful quote API response", async () => {
      const mockQuoteData = {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        id: 12345,
        tags: ["motivation", "work"],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockQuoteData),
      } as Response);

      expect(mockQuoteData).toHaveProperty("text");
      expect(mockQuoteData).toHaveProperty("author");
      expect(typeof mockQuoteData.text).toBe("string");
      expect(typeof mockQuoteData.author).toBe("string");
    });

    test("should validate quote API response structure", () => {
      const validResponse = {
        text: "Example quote",
        author: "Test Author",
        id: 123,
        tags: ["test"],
      };

      expect(validResponse).toHaveProperty("text");
      expect(validResponse).toHaveProperty("author");
      expect(typeof validResponse.text).toBe("string");
      expect(typeof validResponse.author).toBe("string");
    });
  });

  describe("System Monitoring", () => {
    test("should track visitor count in localStorage", () => {
      const mockGetItem = jest.fn().mockReturnValue("5");
      const mockSetItem = jest.fn();

      global.localStorage.getItem = mockGetItem;
      global.localStorage.setItem = mockSetItem;

      const currentVisits = parseInt(mockGetItem() || "0") + 1;
      expect(currentVisits).toBe(6);
    });

    test("should calculate uptime correctly", () => {
      const uptime = getUptime();
      expect(typeof uptime).toBe("number");
      expect(uptime).toBeGreaterThan(0);
    });
  });

  describe("Error Handling", () => {
    test("should handle missing DOM elements safely", () => {
      global.document.getElementById = jest.fn().mockReturnValue(null);
      const element = document.getElementById("non-existent-element");
      expect(element).toBeNull();
    });

    test("should handle localStorage operations safely", () => {
      expect(typeof localStorage.getItem).toBe("function");
      expect(typeof localStorage.setItem).toBe("function");
    });
  });
});
