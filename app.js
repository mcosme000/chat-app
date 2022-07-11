"use strict";

// FORM THINGS //
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const chatContainer = document.getElementById("chatroom");

//getting the input
submit.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(input.value);
  let message = input.value;
  createMessage(message);
  input.value = "";
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
};
