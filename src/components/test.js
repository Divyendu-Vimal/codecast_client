import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Editor, useMonaco } from '@monaco-editor/react';

import 'fabricjs-react';
import './App.css';

const socket = io.connect('http://localhost:4000');

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [messages, setMessages] = useState([]);

  const [section, setSection] = useState('code'); // Define section and setSection

  useEffect(() => {
    socket.on('codeChange', (newCode) => {
      setCode(newCode);
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    

    return () => {
      socket.off('codeChange');
      socket.off('message');
      socket.off('draw');
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit('codeChange', newCode);
  };

  const handleRunCode = async () => {
    const response = await fetch('/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, code }),
    });

    const result = await response.json();
    setOutput(result.output);
  };

  

  const handleMessageSend = (message) => {
    socket.emit('message', message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <button onClick={() => setSection('code')}>Code</button>
        <button onClick={() => setSection('output')}>Output</button>
        <button onClick={() => setSection('chat')}>Chat</button>
        
      </div>
      <div className="main">
        {section === 'code' && (
          <div>
            <Editor
              height="90vh"
              language={language}
              value={code}
              onChange={(value) => handleCodeChange(value)}
            />
            <div>
              <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
              <button onClick={handleRunCode}>Run</button>
            </div>
          </div>
        )}
        {section === 'output' && (
          <div>
            <h3>Output:</h3>
            <pre>{output}</pre>
          </div>
        )}
        {section === 'chat' && (
          <div>
            <h3>Chat:</h3>
            <div>
              {messages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleMessageSend(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        )}
        {section === 'draw' && (
          <div>
            <canvas id="canvas" width="800" height="600" style={{ border: '1px solid #000' }}></canvas>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
