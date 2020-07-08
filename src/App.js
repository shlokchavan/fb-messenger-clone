import React, { useState, useEffect } from "react";
import { FormControl, Input } from "@material-ui/core";

import "./App.css";
import db from "./firebase";
import firebase from "firebase";
import Message from "./Message";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [timestamp, setTimestamp] = useState();
  let hidePage = true;

  useEffect(() => {
    // run once the component loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    // If input is blank this block runs
    const prompt_response = prompt("Please enter your name");
    setUsername(prompt_response == null ? "Guest" : prompt_response);
    hidePage = false;
  }, []);

  const sendMessage = (event) => {
    setTimestamp(new Date().getTime());
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //Logic
    event.preventDefault();
    setMessages([
      ...messages,
      {
        message: input,
        username: username,
        timestamp: timestamp,
      },
    ]);
    setInput("");
  };
  return (
    <div className="App">
      {hidePage === true && (
        <div>
          <div className="app__header">
            <img
              width="100"
              height="100"
              alt="logo"
              src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"
            />
            <h1 className="app__title">Clever Programmers Community!</h1>
            <div className="app__userProfile">
              <img
                width="48"
                height="48"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRerBR3bfynBVdF2gjoii3i_8yI4KOdK5_cxw&usqp=CAU"
                alt="user"
              />
              <h3>Welcome, {username}</h3>
            </div>
          </div>
          <div className="app__Messages">
            <div className="app__todayChip">Today</div>
            <FlipMove>
              {messages.map(({ id, message }) => (
                <Message
                  key={id}
                  timestamp={timestamp}
                  username={username}
                  message={message}
                />
              ))}
            </FlipMove>
          </div>

          <form className="app__form">
            <FormControl className="app__formControl">
              <Input
                className="app__input"
                placeholder="Type a message and press Enter..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />

              <IconButton
                className="app__iconButton"
                disabled={!input}
                onClick={sendMessage}
                type="submit"
                variant="contained"
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </FormControl>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
