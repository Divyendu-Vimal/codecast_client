import React, { useState, useEffect } from "react";
import Client from "./Client";
import Editor from "./Editor";

const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Divyendu" },
    { socketId: 2, username: "Shukla" }
  ]);

  const languageTemplates = {
    javascript: "// Write your JavaScript code here...",
    python: "# Write your Python code here...",
    cpp: "// Write your C++ code here..."
  };

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(languageTemplates["javascript"]);

  useEffect(() => {
    setCode(languageTemplates[language]);
  }, [language]);

  return (
    <div className="container-fluid vh-100" style={styles.containerFluid}>
      <div className="row h-100">
        <div
          className="col-md-3 bg-dark text-light d-flex flex-column h-100"
          style={styles.sidebar}
        >
          <h3 className="mx-auto">CodeCast</h3>
          <hr style={styles.hr} />

          {/* client list container */}
          <div className="d-flex flex-column overflow-auto">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>

          {/* buttons */}
          <div className="mt-auto">
            <hr />
            <button className="btn btn-success">Copy RoomID</button>
            <button className="btn btn-danger mt-2 mb-2 px-3 btn-block">Leave Room</button>
          </div>
        </div>

        <div className="col-md-9 text-light d-flex flex-column h-100">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <select
              className="form-select bg-dark text-light"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.select}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          <Editor language={language} code={code} setCode={setCode} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  containerFluid: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  sidebar: {
    boxShadow: '2px 0px 4px rgba(0,0,0,0.5)'
  },
  hr: {
    marginTop: '0rem'
  },
  select: {
    width: '150px'
  },
};

export default EditorPage;
