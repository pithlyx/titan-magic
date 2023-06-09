import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import "./App.css"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ResizablePanels from "./components/Body/HorizontalResize";
import CardDisplay from "./components/Body/CardDisplay";
import DeckDisplay from "./components/Body/DeckDisplay";

const DynamicComponents = {
  carddisplay: CardDisplay,
  deckdisplay: DeckDisplay
}

function DynamicPanel(bodyHeight) {
  let { page1 = "carddisplay", page2 = "carddisplay" } = useParams();
  page1 = page1.toLowerCase();
  page2 = page2.toLowerCase();

  const Component1 = DynamicComponents[page1];
  const Component2 = DynamicComponents[page2];

  return (
    <ResizablePanels height={bodyHeight}>
      {Component1 && <Component1 />}
      {Component2 && <Component2 />}
    </ResizablePanels>
  );
}

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const calculateHeights = () => {
      const { header, body, footer } = { header: 8, body: 90, footer: 2 };
      console.log(window.innerHeight)
      const headerHeightInPixels = Math.floor((header / 100) * window.innerHeight);
      const bodyHeightInPixels = Math.floor((body / 100) * window.innerHeight);
      const footerHeightInPixels = Math.floor((footer / 100) * window.innerHeight);

      setHeaderHeight(headerHeightInPixels);
      setBodyHeight(bodyHeightInPixels);
      setFooterHeight(footerHeightInPixels);
    }

    // Initial calculation
    calculateHeights();

    // Recalculate heights on window resize
    window.addEventListener("resize", calculateHeights);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateHeights);
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col max-h-screen min-h-screen dark bg-bg">
        <Header height={headerHeight} />
        <Routes>
          <Route path="/route/:page1/:page2" element={<DynamicPanel bodyHeight={bodyHeight}/>} />
          <Route path="/" element={<CardDisplay />} />
        </Routes>
        <Footer height={footerHeight} />
      </div>
    </Router>
  );
}

export default App;
