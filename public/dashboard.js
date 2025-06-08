// ============================================================================
// DASHBOARD CONFIGURATION & CONSTANTS
// ============================================================================

const DASHBOARD_CONFIG = {
  github: {
    username: "GonzaloZelinka",
    repo: "ci-cd-tp",
    apiUrl: "https://api.github.com",
  },
  quotes: {
    apiUrl: "https://thequoteshub.com/api/",
    cacheKey: "daily-quote-cache",
    cacheDateKey: "daily-quote-date",
  },
  app: {
    version: "2.0.0",
    name: "Dynamic Personal Dashboard",
  },
  intervals: {
    clock: 1000, // 1 second
    session: 60000, // 1 minute
  },
};

const STORAGE_KEYS = {
  visits: "dashboard-visits",
  pageLoads: "page-loads",
};

// Fallback quotes in case API fails
const FALLBACK_QUOTES = [
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    text: "The future belongs to those who learn more skills and combine them in creative ways.",
    author: "Robert Greene",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
];

const TECH_FACTS = [
  "The first computer bug was an actual bug - a moth trapped in a Harvard Mark II computer in 1947.",
  "The term 'Wi-Fi' doesn't actually stand for anything - it's just a catchy name!",
  "Google processes over 8.5 billion searches per day.",
  "The first domain name ever registered was symbolics.com in 1985.",
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "The '@' symbol was used in email addresses because it was the only preposition available on the keyboard.",
  "The first YouTube video was uploaded on April 23, 2005, and was called 'Me at the zoo'.",
  "GitHub was founded in 2008 and now hosts over 200 million repositories.",
  "The world's first website (info.cern.ch) is still online today.",
  "TypeScript was first released by Microsoft in 2012 to add static typing to JavaScript.",
];

// ============================================================================
// GLOBAL STATE
// ============================================================================

const startTime = Date.now();

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function safeSetContent(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = content;
  } else {
    console.warn(`Element with id '${elementId}' not found`);
  }
}

function safeSetAttribute(elementId, attribute, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element[attribute] = value;
  } else {
    console.warn(`Element with id '${elementId}' not found`);
  }
}

function formatNumber(num) {
  return num.toLocaleString();
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getDayBasedItem(array) {
  const today = new Date().getDate();
  return array[today % array.length];
}

function getTodayString() {
  return new Date().toDateString();
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

async function fetchGitHubData() {
  try {
    const { github } = DASHBOARD_CONFIG;

    // Fetch repository data
    const repoResponse = await fetch(`${github.apiUrl}/repos/${github.username}/${github.repo}`);
    if (!repoResponse.ok) {
      throw new Error(`Repository not accessible: ${repoResponse.status}`);
    }
    const repoData = await repoResponse.json();

    // Fetch user data
    const userResponse = await fetch(`${github.apiUrl}/users/${github.username}`);
    const userData = await userResponse.json();

    return { repo: repoData, user: userData };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}

async function fetchQuoteFromAPI() {
  try {
    console.log("🎯 Fetching fresh quote from Quotes Hub API...");
    const response = await fetch(DASHBOARD_CONFIG.quotes.apiUrl);

    if (!response.ok) {
      throw new Error(`Quote API error: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (data && data.text && data.author) {
      console.log(`✅ Quote fetched: "${data.text.substring(0, 50)}..." - ${data.author}`);
      return {
        text: data.text,
        author: data.author,
        id: data.id,
        tags: data.tags || [],
      };
    } else {
      throw new Error("Invalid quote data structure");
    }
  } catch (error) {
    console.error("Error fetching quote from API:", error);
    return null;
  }
}

// ============================================================================
// UPDATE FUNCTIONS
// ============================================================================

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateString = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  safeSetContent("live-clock", timeString);
  safeSetContent("timezone", dateString);
}

function updateSessionTime() {
  const sessionMinutes = Math.floor((Date.now() - startTime) / 60000);
  safeSetContent("session-time", sessionMinutes);
}

function updateVisitorCount() {
  // Update visits
  let visits = localStorage.getItem(STORAGE_KEYS.visits) || 0;
  visits = parseInt(visits) + 1;
  localStorage.setItem(STORAGE_KEYS.visits, visits);
  safeSetContent("visitor-count", visits);

  // Update page loads
  let pageLoads = localStorage.getItem(STORAGE_KEYS.pageLoads) || 0;
  pageLoads = parseInt(pageLoads) + 1;
  localStorage.setItem(STORAGE_KEYS.pageLoads, pageLoads);
  safeSetContent("page-loads", pageLoads);
}

async function loadDailyQuote() {
  const today = getTodayString();
  const cachedDate = localStorage.getItem(DASHBOARD_CONFIG.quotes.cacheDateKey);
  const cachedQuote = localStorage.getItem(DASHBOARD_CONFIG.quotes.cacheKey);

  // Check if we have a fresh quote for today
  if (cachedDate === today && cachedQuote) {
    try {
      const quote = JSON.parse(cachedQuote);
      displayQuote(quote);
      console.log("📖 Using cached daily quote");
      return;
    } catch (error) {
      console.warn("Error parsing cached quote:", error);
    }
  }

  // Show loading state
  safeSetContent("daily-quote", "Fetching inspirational quote...");

  // Try to fetch fresh quote from API
  const apiQuote = await fetchQuoteFromAPI();

  if (apiQuote) {
    // Cache the quote for today
    localStorage.setItem(DASHBOARD_CONFIG.quotes.cacheKey, JSON.stringify(apiQuote));
    localStorage.setItem(DASHBOARD_CONFIG.quotes.cacheDateKey, today);
    displayQuote(apiQuote);
  } else {
    // Fallback to hardcoded quotes
    console.log("📚 Using fallback quote");
    const fallbackQuote = getDayBasedItem(FALLBACK_QUOTES);
    displayQuote(fallbackQuote);
  }
}

function displayQuote(quote) {
  const quoteElement = document.getElementById("daily-quote");
  if (quoteElement && quote) {
    // Create a nicely formatted quote display
    const quoteText = quote.text.length > 200 ? `${quote.text.substring(0, 200)}...` : quote.text;

    quoteElement.innerHTML = `
      "${quoteText}"
      <br><br>
      <small style="font-style: normal; opacity: 0.8;">— ${quote.author}</small>
    `;
  }
}

function loadNewFact() {
  const fact = getRandomItem(TECH_FACTS);
  safeSetContent("tech-fact", fact);
}

async function loadGitHubStats() {
  const loadingEl = document.getElementById("github-stats");
  const statusEl = document.getElementById("github-status");

  // Show loading state
  if (loadingEl) loadingEl.classList.add("loading");
  safeSetContent("github-status", "🔄 Loading...");
  if (statusEl) statusEl.className = "status-loading";

  try {
    const data = await fetchGitHubData();

    if (data?.repo && data?.user) {
      // Update repository stats
      safeSetContent("repo-name", data.repo.full_name);
      safeSetAttribute("repo-link", "href", data.repo.html_url);
      safeSetContent("repo-link", data.repo.name);
      safeSetContent("repo-stars", `⭐ ${formatNumber(data.repo.stargazers_count)}`);
      safeSetContent("repo-forks", `🍴 ${formatNumber(data.repo.forks_count)}`);
      safeSetContent("repo-watchers", `👀 ${formatNumber(data.repo.watchers_count)}`);
      safeSetContent("repo-issues", `🐛 ${data.repo.open_issues_count}`);

      // Format last update date
      const lastUpdate = new Date(data.repo.updated_at);
      safeSetContent("last-commit", `Last updated: ${lastUpdate.toLocaleDateString()}`);

      // Update user stats
      safeSetContent("user-repos", `📁 ${data.user.public_repos}`);
      safeSetContent("user-followers", `👥 ${data.user.followers}`);
      safeSetContent("user-name", data.user.name || data.user.login);

      // Success status
      safeSetContent("github-status", "🟢 Connected to GitHub API");
      if (statusEl) statusEl.className = "status-online";
    } else {
      throw new Error("No data received");
    }
  } catch (error) {
    console.error("GitHub API Error:", error);

    // Static fallback data
    const { github } = DASHBOARD_CONFIG;
    safeSetContent("repo-name", `${github.username}/${github.repo}`);
    safeSetContent("repo-link", github.repo);
    safeSetAttribute("repo-link", "href", `https://github.com/${github.username}/${github.repo}`);
    safeSetContent("repo-stars", "⭐ --");
    safeSetContent("repo-forks", "🍴 --");
    safeSetContent("repo-watchers", "👀 --");
    safeSetContent("repo-issues", "🐛 --");
    safeSetContent("last-commit", "Repository is private");
    safeSetContent("user-repos", "📁 --");
    safeSetContent("user-followers", "👥 --");
    safeSetContent("user-name", "Gonzalo Zelinka");

    // Error status
    safeSetContent("github-status", "🔒 Repository is private");
    if (statusEl) statusEl.className = "status-error";
  } finally {
    if (loadingEl) loadingEl.classList.remove("loading");
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function initDashboard() {
  console.log(`🚀 ${DASHBOARD_CONFIG.app.name} v${DASHBOARD_CONFIG.app.version} initializing...`);

  // Initial updates
  updateClock();
  updateVisitorCount();
  loadDailyQuote(); // Now fetches from API!
  loadNewFact();
  loadGitHubStats();

  // Update system info
  safeSetContent("deploy-time", new Date().toLocaleString());
  safeSetContent("app-version", DASHBOARD_CONFIG.app.version);

  // Calculate uptime (simulate)
  const uptimeHours = Math.floor(Math.random() * 720) + 24; // 1-30 days
  safeSetContent("uptime", `${uptimeHours} hours`);

  // Set up intervals for real-time updates
  setInterval(updateClock, DASHBOARD_CONFIG.intervals.clock);
  setInterval(updateSessionTime, DASHBOARD_CONFIG.intervals.session);

  console.log(
    `📊 Dashboard ready! Monitoring: ${DASHBOARD_CONFIG.github.username}/${DASHBOARD_CONFIG.github.repo}`
  );
  console.log(`💭 Daily quotes powered by: ${DASHBOARD_CONFIG.quotes.apiUrl}`);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

document.addEventListener("DOMContentLoaded", initDashboard);
