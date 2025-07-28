import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Cards from "./components/Cards.jsx";
import Examples from "./components/Examples.jsx";

function App() {
  return (
    <div>
      <Header/>
      <main>
        <h2>Time to get started!</h2>
        <Cards/>
        <Examples/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
