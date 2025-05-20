import React, { useState } from "react";
import UploadForm from "../../frontend/src/components/UploadForm";
import SkillsDisplay from "../../frontend/src/components/SkillsDisplay";

function App() {
  const [skills, setSkills] = useState([]);

  return (
    <div className="App">
      <h1>Resume Skill Extractor</h1>
      <UploadForm setSkills={setSkills} />
      <SkillsDisplay skills={skills} />
    </div>
  );
}

export default App;
