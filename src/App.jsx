import { useCallback, useEffect, useState } from "@lynx-js/react";

import "./App.css";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";

export function App() {
  const [alterLogo, setAlterLogo] = useState(false);
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchQuote() {
    setIsLoading(true);
    try {
      // Using random ID to get different quotes (1-30)
      const randomId = Math.floor(Math.random() * 30) + 1;
      const response = await fetch(`https://dummyjson.com/quotes/${randomId}`);
      const json = await response.json();
      setQuote({
        content: json?.quote,
        author: json?.author,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      // Fallback quote in case the API fails
      setQuote({
        content: "Talk is cheap. Show me the code.",
        author: "Linus Torvalds",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.info("Hello, ReactLynx");
    fetchQuote();
  }, []);

  const onTap = useCallback(() => {
    "background only";
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  const handleRefresh = useCallback(() => {
    "background only";
    fetchQuote();
  }, []);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? <image src={reactLynxLogo} className="Logo--react" /> : <image src={lynxLogo} className="Logo--lynx" />}
          </view>
          <text className="Title">Random Quotes</text>
          <view className="QuoteContainer">
            <view className="QuoteCard">
              {quote ? (
                <>
                  <text className="QuoteText">"{quote.content}"</text>
                  <text className="QuoteAuthor">— {quote.author}</text>
                </>
              ) : (
                <text className="QuoteLoading">Loading quote...</text>
              )}
            </view>
            <view className={`RefreshButton ${isLoading ? "RefreshButton--loading" : ""}`} bindtap={handleRefresh}>
              <text className="RefreshIcon">{isLoading ? "+" : "⟳"}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  );
}
