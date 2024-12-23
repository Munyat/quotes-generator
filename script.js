// Select DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.querySelector(".new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

//show loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hise loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Fetch and display a new quote
async function getQuote() {
  loading();
  const apiUrl = "https://api.realinspire.tech/v1/quotes/random";
  try {
    const response = await fetch(apiUrl);
    const quoteData = await response.json();
    displayQuote(quoteData[0]);
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteText.textContent = "Could not fetch a quote.";
    authorText.textContent = "";
  }
}
function displayQuote(quote) {
  complete();
  // Check the API response for actual content and author fields
  const quoteContent = quote.content || "No quote available.";
  const quoteAuthor = quote.author || "Unknown author.";

  if (quoteContent.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Update DOM elements
  quoteText.textContent = quoteContent;
  authorText.textContent = quoteAuthor;
}
function tweetQuote() {
  const twitterUrl = `https://x.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On load
getQuote();
