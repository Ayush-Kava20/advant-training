import reactImg from "./assets/react-core-concepts.png"
import {CORE_CONCEPTS } from "./data"
import Footer from "./components/Footer.jsx";
import CoreConsepts from "./components/Coreconcepts.jsx"
import TabButton from "./components/TabButton.jsx"


function App() {
  function handleSelect(selectedButton){
    console.log(selectedButton);
  }
  
  return (
    <div>
      <header>
        <img src={reactImg} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          Fundamental React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
      <main>
        <h2>Time to get started!</h2>
      </main>

      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConsepts {...CORE_CONCEPTS[0]} />
            <CoreConsepts {...CORE_CONCEPTS[1]} />
            <CoreConsepts {...CORE_CONCEPTS[2]} />
            <CoreConsepts {...CORE_CONCEPTS[3]} />
          </ul>

        </section>
        <section id="examples">
            <h2>Examples</h2>
            <menu>
              {/* <TabButton title="Component"/> */}

              <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
              <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
              <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
              <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
            </menu>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
