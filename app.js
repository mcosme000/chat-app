"use strict";

// IMPORT DATA FROM EXTERNAL JS FILE//
import data from "./data.js";
console.log(data);

// FORM THINGS //
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const chatContainer = document.getElementById("chatroom");
const chatroom = document.getElementsByClassName("chat-room");
console.log(chatroom);

// OTHER ELEMENTS //
const chatname = document.getElementById("chatname").innerHTML;
const contactCards = document.getElementsByClassName("contact-card");
// console.log(contactCards.length);

// - - - - - ACTIONS - - - - - //

// SET SCROLL BAR TO BOTTOM OF CHAT DIV
var objDiv = document.getElementById("chatroom");
objDiv.scrollTop = objDiv.scrollHeight;

//Get the ID of each contact:
for (let i = 0; i < contactCards.length; i++) {
  contactCards[i].addEventListener("click", () => {
    let contactId = contactCards[i].getAttribute("id");
    console.log(contactId);
    switchChat(contactId);
  });
}

//check if contactID and chatroomID are the same:
const switchChat = (contactId) => {
  //getting the attribute from each chat room
  for (let i = 0; i < chatroom.length; i++) {
    let chatId = chatroom[i].getAttribute("id");
    chatId = chatId[chatId.length - 1];
    if (contactId === chatId) {
      chatroom[i].classList.add("hidden");
      chatroom[contactId].classList.remove("hidden");
    }
  }
  console.log(`Changing chat to chat nº${contactId}`);
};

// //change visibility of chatroom:
// const visibility = () => {
//   for (let i = 0; i < chatroom.length; i++) {
//     chatroom[i].classList = "hidden";
//   }
// };

//getting the input
submit.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(input.value);
  let message = input.value;
  // check if the input is empty to prevent sending empty messages
  if (message.trim().length !== 0) {
    createMessage(message);
    input.value = "";
  }
});

//creating messages!!
const createMessage = (message) => {
  console.log(`I am creating a message...: ${message}`);
  let messageCard = document.createElement("DIV");
  messageCard.classList = "message-card align-right";
  let messageContainer = document.createElement("DIV");
  messageContainer.classList = "message-container";
  let newMessage = document.createElement("DIV");
  newMessage.classList = "message message-right";
  newMessage.innerHTML = message;
  messageCard.appendChild(messageContainer);
  messageContainer.appendChild(newMessage);
  chatContainer.appendChild(messageCard);
  // Fix scroll bar down
  objDiv.scrollTop = objDiv.scrollHeight;
  getResponse();
};

//getting replies from the data object
const getResponse = () => {
  console.log(data[chatname.toLocaleLowerCase()]);
};
