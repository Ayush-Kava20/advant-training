import reactImg from "./assets/react-core-concepts.png";
import {CORE_CONCEPTS, EXAMPLES} from "./data";
import Footer from "./components/Footer.jsx";
import CoreConsepts from "./components/Coreconcepts.jsx";
import TabButton from "./components/TabButton.jsx";
import {useState} from "react";

function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
    // console.log(selectedButton);
  }

  return (<div>
    <header>
      <img src={reactImg} alt="Stylized atom"/>
      <h1>React Essentials</h1>
      <p>
        Fundamental React concepts you will need for almost any app you are going to build!
      </p>
    </header>
    <main>
      <h2>Time to get started!</h2>
    </main>

    <main>
      <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {CORE_CONCEPTS.map((conceptItem)=>{
            return <CoreConsepts key={conceptItem.title} {...conceptItem} />
          })}
          {/* <CoreConsepts {...CORE_CONCEPTS[0]}/>
          <CoreConsepts {...CORE_CONCEPTS[1]}/>
          <CoreConsepts {...CORE_CONCEPTS[2]}/>
          <CoreConsepts {...CORE_CONCEPTS[3]}/> */}
        </ul>
      </section>
      <section id="examples">
        <h2>Examples</h2>
        <menu>
          {/* <TabButton title="Component"/> */}

          <TabButton isSelect={selectedTopic === 'components'}    onSelect={() => handleSelect("components")}>
            Components
          </TabButton>
          <TabButton isSelect={selectedTopic === 'jsx'}  onSelect={() => handleSelect("jsx")}>JSX</TabButton>
          <TabButton isSelect={selectedTopic === 'props'}  onSelect={() => handleSelect("props")}>Props</TabButton>
          <TabButton isSelect={selectedTopic === 'state'}  onSelect={() => handleSelect("state")}>State</TabButton>
        </menu>
        {
          !selectedTopic
            ? (<p>
              Please select the topic</p>)
            : (<div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>)
        }
      </section>
    </main>
    <Footer/>
  </div>);
}

export default App;
