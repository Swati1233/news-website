import React from "react";
import NewsSection from "./NewsSection"; //Import the NewsSection component
import "./App.css"; // Import CSS for App styling

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the News Website</h1>
      </header>
      <NewsSection />
    </div>
  );
};

export default App;
