import './App.css';
import SearchBar from './components/Header/Search';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen dark">
        <SearchBar />
        <Body />
      </div>
      <Footer />
    </>
  );
}

export default App;
