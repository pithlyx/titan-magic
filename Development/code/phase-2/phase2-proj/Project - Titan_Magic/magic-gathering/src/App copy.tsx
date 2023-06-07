import './App.css';
import Header from './components/Header/Search.tsx';
import Body from './components/Body/Body.tsx';
import Footer from './components/Footer/Footer.tsx';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen h-screen">
        <Header />
        <Body />
      </div>
      <Footer />
    </>
  );
}

export default App;
