const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, retries = 3, delayMs = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) return await response.json();
        console.warn(`Attempt ${i + 1} failed, retrying...`);
      } catch (err) {
        console.error(`Error on attempt ${i + 1}:`, err);
      }
      await delay(delayMs * (i + 1)); // Exponential backoff
    }
    throw new Error("Max retries reached. API unavailable.");
}

module.exports = {
    fetchWithRetry
}