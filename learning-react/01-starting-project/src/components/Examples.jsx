import { useState } from "react";
import TabButton from "../components/TabButton.jsx";
import { EXAMPLES} from "../data";
import Section from "./Section.jsx";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  return (
  
  <Section id="examples" title="Examples" >
    {/* <h2>Examples</h2> */}
    <menu>
      {/* <TabButton title="Component"/> */}

      <TabButton isSelect={selectedTopic === "components"} onClick={() => handleSelect("components")}>
        Components
      </TabButton>
      <TabButton isSelect={selectedTopic === "jsx"} onClick={() => handleSelect("jsx")}>
        JSX
      </TabButton>
      <TabButton isSelect={selectedTopic === "props"} onClick={() => handleSelect("props")}>
        Props
      </TabButton>
      <TabButton isSelect={selectedTopic === "state"} onClick={() => handleSelect("state")}>
        State
      </TabButton>
    </menu>
    {
      !selectedTopic
        ? (<p>Please select the topic</p>)
        : (<div id="tab-content">
          <h3>{EXAMPLES[selectedTopic].title}</h3>
          <p>{EXAMPLES[selectedTopic].description}</p>
          <pre>
            <code>{EXAMPLES[selectedTopic].code}</code>
          </pre>
        </div>)
    }
  </Section>);
}
