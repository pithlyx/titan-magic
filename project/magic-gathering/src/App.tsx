import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import "./App.css"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CardDisplay from "./components/Body/CardDisplay";
import DynamicContainer from "./components/Body/DynamicContainer";

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

    calculateHeights();

    window.addEventListener("resize", calculateHeights);

    return () => {
      window.removeEventListener("resize", calculateHeights);
    }
  }, []);

    const [cardsData, setCardsData] = useState([]);
  const [page, setPage] = useState(1);
  console.log(cardsData)
  const fetchData = () => {
    fetch(
      `http://localhost:1337/api/mongo/mtg/all-cards/en/face/${page}?limit=100`
    )
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => setCardsData((prevData) => [...prevData, ...data.data]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData(page);
  }, []);


  return (
    <Router>
      <div className="flex flex-col max-h-screen min-h-screen dark bg-bg">
        <Header height={headerHeight} />
        <Routes>
          <Route path="/route/:page1/:page2" element={<DynamicContainer bodyHeight={bodyHeight} cardsData={cardsData} fetchData={fetchData}/>} />
          <Route path="/" element={<CardDisplay cardScale={2} fetchData={fetchData} cardsData={cardsData}/>} />
        </Routes>
        <Footer height={footerHeight} />
      </div>
    </Router>
  );
}

export default App;
