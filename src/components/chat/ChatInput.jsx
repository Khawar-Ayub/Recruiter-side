import React, { useEffect, useState } from "react";
import database from "../../firebase";
import { useSelector } from "react-redux";
//import { ref, set } from "firebase/database";
import { ref, set, push, child, onValue } from "firebase/database";

export default function ChatInput() {
  const user = useSelector((state) => state.user.value);
  const [message, setMessage] = useState("hello");
  const [myMessages, setMyMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [userID, setUserID] = useState();
  const [receiverEmail, setReceiverEmail] = useState("");
  //   const sendMessage = () => {
  //     set(ref(database, "/user/message" + user.id), {
  //       message: message,
  //       user: user.email,
  //     });
  //   };
  const sendMessage = () => {
    // set(ref(database, "users/user" + user.id), {
    //   email: user.email,
    // });
    push(child(ref(database), "chat/messages"), {
      message: message,
      user: user.email,
      receiverEmail: receiverEmail,
    });
    push(child(ref(database), `users/user${user.id}/` + receiverEmail), {
      email: user.email,
      message: message,
      receiverEmail: receiverEmail,
    });
  };
  const getMessages = () => {
    onValue(child(ref(database), "chat/messages"), (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let messages = Object.values(data);
        console.log("messages", messages);
      }
    });
  };
  //get user messages
  const getUserMessages = () => {
    onValue(
      child(ref(database), `users/user${user.id}/` + userID),
      (snapshot) => {
        let data = snapshot.val();
        if (data) {
          let messages = Object.values(data);
          setMyMessages(messages);
        }
      }
    );
    onValue(
      child(ref(database), `users/user${userID}/` + user.id),
      (snapshot) => {
        let data = snapshot.val();
        if (data) {
          let messages = Object.values(data);
          setUserMessages(messages);
        }
      }
    );
  };
  useEffect(() => {
    getUserMessages();
  }, []);
  return (
    <div>
      <input
        type={"text"}
        placeholder={"Enter receivers email"}
        onChange={(e) => setReceiverEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <input
        type="text"
        placeholder="Type user id for messages"
        onChange={(e) => setUserID(e.target.value)}
      />
      <button onClick={getUserMessages}>Get Messages</button>
      <div>
        <h1>My Messages</h1>
        {myMessages.map((message) => (
          <div>
            <p>{message.message}</p>
          </div>
        ))}
        <h1>User Messages</h1>
        {userMessages.map((message) => (
          <div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
