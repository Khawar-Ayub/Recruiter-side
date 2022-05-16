import React, { useEffect, useState } from "react";
import database from "../../firebase";
import { useSelector } from "react-redux";
//import { ref, set } from "firebase/database";
import { ref, set, push, child, onValue } from "firebase/database";

export default function ChatInput() {
  const user = useSelector((state) => state.user.value);
  const [message, setMessage] = useState("hello");
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [userID, setUserID] = useState();
  const [chat, setChat] = useState();
  //const [exists, setExists] = useState();
  const [receiverEmail, setReceiverEmail] = useState("");

  const sendMessage = async () => {
    // set(ref(database, "users/user" + user.id), {
    //   email: user.email,
    // });
    // let data;
    // //console.log(await checkChat());
    // onValue(
    //   ref(database, `chat/${user.id}-${receiverEmail}` + user.id),
    //   (snapshot) => {
    //     data = snapshot.exists();
    //     console.log(data);
    //     //var exists=data;
    //   }
    // );
    // console.log("data", data);
    const now = new Date().getTime();
    console.log(now);
    var chatID = `626a38d101604067a6138fc5-62221bb93fec6560904a1164`;
    push(child(ref(database), "chat/" + chatID), {
      text: message,
      avatar:
        "http://3.13.164.94:5000/api/file/public/uploads/file-1646809812464.jpg",
      email: "626a38d101604067a6138fc5",
      name: "Medicos Connect",
      receiver: "62221bb93fec6560904a1164",
      read: 0,
      _id: now,
      createdAt: now,
      order: -1 * now,
      type: "Support",
      uid: "626a38d101604067a6138fc5",
      username: "Medicos Connect",
    });
    //console.log(exists);
    storeLastMessages(chatID, now);
  };
  // function to check if chat already exists
  // const checkChat = async () => {
  //   return child(ref(database), `chat/${user.id}-${userID}`, (snapshot) => {
  //     if (snapshot.val() !== null) {
  //       setExists(true);
  //       return true;
  //     } else {
  //       setExists(false);
  //       return false;
  //     }
  //   });
  // };
  const storeLastMessages = (chatID, now) => {
    set(
      ref(database, `users/626a38d101604067a6138fc5/62221bb93fec6560904a1164`),
      {
        email: "626a38d101604067a6138fc5",
        lastMessage: message,
        name: "Medicos Connect",
        //receiverID: receiverEmail,
        profile_url:
          "https://api-dev.medicosconnect.com/public/uploads/file-1651062197246.jpg",
        id: chatID,
        createdAt: now,
        seen: false,
        type: "Support",
      }
    );
    set(
      ref(database, `users/62221bb93fec6560904a1164/626a38d101604067a6138fc5`),
      {
        email: "626a38d101604067a6138fc5",
        lastMessage: message,
        //receiverID: receiverEmail,
        id: chatID,
        profile_url:
          "https://api-dev.medicosconnect.com/public/uploads/file-1651062197246.jpg",
        createdAt: now,
        seen: false,
        type: "Support",
        name: "Medicos Connect",
      }
    );
  };
  const getChat = async (chat) => {
    // console.log(await checkChat());
    // console.log(exists);
    onValue(child(ref(database), "chat/" + chat), (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let messages = Object.values(data);
        console.log("messages", messages);
        setMessages(messages);
      }
    });
  };
  //get user messages
  const getUserMessages = () => {
    onValue(child(ref(database), `users/${user.id}`), (snapshot) => {
      let data = snapshot.val();
      //console.log("data", data);
      if (data) {
        let lastMessages = Object.entries(data);
        setLastMessages(lastMessages);
      }
    });
    onValue(child(ref(database), `users/${userID}/` + user.id), (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let messages = Object.values(data);
        setUserMessages(messages);
      }
    });
  };
  const onSend = (id) => {
    console.log("id", id);
    const now = new Date().getTime();
    push(child(ref(database), id), {
      message: message,
      user: user.email,
      receiverID: receiverEmail,
      createdAt: now,
    });
    storeLastMessages(id, now);
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
        {lastMessages.map((message, i) => (
          <div key={i}>
            <p
              onClick={() => {
                console.log("chat id", message[1].id, message);
                setChat(message[1].id);
                setReceiverEmail(message[0]);
                getChat(message[1].id);
              }}
            >
              {message[0]}: {message[1].lastMessage}
            </p>
          </div>
        ))}
        <h1>User Messages</h1>
        {userMessages.map((message, i) => (
          <div key={i}>
            <p>{message.message}</p>
          </div>
        ))}
        <h1>Chat</h1>
        {messages.map((message, i) => (
          <div key={i}>
            <p>{message.text}</p>
          </div>
        ))}
        <input
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => onSend(chat)}>Send</button>
      </div>
    </div>
  );
}
