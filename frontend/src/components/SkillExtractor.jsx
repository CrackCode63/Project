import React, { useState } from "react";
import SkillsDisplay from "./SkillsDisplay"; // import your display component

function SkillExtractor() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSkills([]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("https://skillextracter.onrender.com/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const data = await response.json();
      setSkills(data.skills);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while extracting skills.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {loading ? "Extracting..." : "Extract Skills"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {skills.length > 0 && <SkillsDisplay skills={skills} />}
    </div>
  );
}

export default SkillExtractor;
