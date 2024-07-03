import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Home.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate(); 

  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if(!roomID || !username){
      toast.error("Both the field is required");
      return;
    }
    console.log(`Joining room ${roomID} as ${username}`);
    navigate(`/editor/:${roomID}` , {
      state: { username },
    });
    toast.success("Room is created");
  };

  const handleGenerateRoomID = (e) => {
    e.preventDefault();
    const newRoomID = uuidv4();
    setRoomID(newRoomID);
    toast.success("Room Id is generated")
  };

  return (
    <div className="home-container">
      <div className="code-screens">
        <img src="hero-img.png" alt="CodeCast" />
      </div>

      <div className="input-fields">
        <span>CodeCast</span>
        <input
          type="text"
          placeholder="Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleJoin}>Join</button>
        <button onClick={handleGenerateRoomID}>Generate Unique Room ID</button>
      </div>
    </div>
  );
};

export default Home;
