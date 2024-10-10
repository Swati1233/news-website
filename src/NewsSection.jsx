
import React, { useEffect, useState } from "react";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=3d4b65826eed45258c082b4b265305b9`,
          )}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const articlesData = JSON.parse(data.contents); // Parse the JSON from the proxy

        if (articlesData.articles) {
          setNews(articlesData.articles.slice(0, 5)); // Show top 5 articles
          setFilteredNews(articlesData.articles.slice(0, 5)); // Initialize filtered news
        } else {
          throw new Error("No articles found");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news");
      }
    };

    fetchNews();
  }, [category]); // Fetch news when category changes

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = news.filter(
      (article) =>
        article.title.toLowerCase().includes(term) ||
        article.description?.toLowerCase().includes(term), // Add optional chaining for description
    );
    setFilteredNews(filtered);
  };

  return (
    <div>
      <h2>Latest News Headlines</h2>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select>
      <input
        type="text"
        placeholder="Search for news..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {filteredNews.map((article, index) => (
            <li key={index}>
              <strong>{article.title}</strong>
              <p>Source: {article.source.name}</p>
              <p>
                Published: {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsSection;
