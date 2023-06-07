import "./App.css"
import Body from "./components/Body/Body"
import Footer from "./components/Footer/Footer"
import SearchBar from "./components/Header/Search"

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen dark">
        <SearchBar />
        <Body />
      </div>
      <Footer />
    </>
  )
}

export default App
