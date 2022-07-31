"use strict";

// IMPORT DATA FROM EXTERNAL JS FILE//
// import data from "./data.js";
// console.log(data);

// FORM THINGS //
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const chatroom = document.getElementsByClassName("chat-room");

// OTHER ELEMENTS //
let chatname = document.getElementById("chatname");
const contactCards = document.getElementsByClassName("contact-card");
const contactNames = document.getElementsByClassName("contact-name");
const lastMessages = document.getElementsByClassName("last-message");
console.log(lastMessages[0].innerHTML);
const chats = document.getElementsByClassName("chat");
const colors = document.getElementsByClassName("colors")[0].children;
console.log(colors);

//set the active chat
let activeChat = 1;

// - - - - - ACTIONS - - - - - //

// SET SCROLL BAR TO BOTTOM OF CHAT DIV
//I need to add the id "chatroom" everytime I swtich between chats
var objDiv = document.getElementById("visible");
objDiv.scrollTop = objDiv.scrollHeight;

//Get the ID of each contact:
for (let i = 0; i < contactCards.length; i++) {
  contactCards[i].addEventListener("click", () => {
    let contactId = contactCards[i].getAttribute("id");
    checkID(contactId);
    // get the contact name:
    // console.log(contactCards[i]);
    //
  });
}

//check if contactID and chatroomID are the same:
const checkID = (contactId) => {
  //getting the attribute from each chat room
  for (let i = 0; i < chatroom.length; i++) {
    let chatId = chatroom[i].getAttribute("id");

    // to get the last element where the ID is:
    chatId = chatId[chatId.length - 1];

    // Check if contactID and chatID are the same.
    if (contactId === chatId) {
      switchChat(contactId);
    }
  }
};

// - - - SWITCHING BETWEEN CHATS - - -
const switchChat = (number) => {
  //First, hide the active chat:
  chatroom[activeChat - 1].classList.add("hidden");

  //Second, remove the class "hidden":
  chatroom[number - 1].classList.remove("hidden");

  //Remove id="visible" from active chat:
  chatroom[activeChat - 1].children[0].removeAttribute("id");

  //Add id="visible" to the new chat room:
  chatroom[number - 1].children[0].setAttribute("id", "visible");

  // contactBackground();
  contactCards[activeChat - 1].classList.remove("active");
  contactCards[number - 1].classList.add("active");
  //Update the objDiv variable to set the scroll to bottom:
  objDiv = document.getElementById("visible");
  objDiv.scrollTop = objDiv.scrollHeight;

  //Last, update the active chat:
  activeChat = number;

  //Update the chat title:
  chatname.innerHTML = contactNames[number - 1].innerHTML;
};

//getting the input
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let message = input.value;
  // check if the input is empty to prevent sending empty messages
  if (message.trim().length !== 0) {
    createMessage(message);
    input.value = "";
  }
});

//Updating the last message on contact card
const updateLastMessage = (message) => {
  console.log(`updating message... ${message}`);
  lastMessages[activeChat - 1].innerHTML = message;
};

//creating messages!!
const createMessage = (message) => {
  //get the current chat:
  console.log(`I am creating a message...: ${message}`);
  //create elements:
  let messageCard = document.createElement("DIV");
  messageCard.classList = "message-card align-right";
  let messageContainer = document.createElement("DIV");
  messageContainer.classList = "message-container";
  let div = document.createElement("DIV");
  let newMessage = document.createElement("P");
  newMessage.classList = "message message-right";
  newMessage.innerHTML = message;
  //append elements:
  messageCard.appendChild(messageContainer);
  messageContainer.appendChild(div);
  div.appendChild(newMessage);
  //apend everything in the chat element!!
  chats[activeChat - 1].appendChild(messageCard);
  // Fix scroll bar down
  objDiv.scrollTop = objDiv.scrollHeight;
  // getResponse();
  updateLastMessage(message);
};

//CHANGE BACKGROUND COLOR
const changeBackground = (color) => {
  console.log(color);
  chatroom[activeChat - 1].style.backgroundColor = color;
};

for (let i = 0; i < colors.length; i++) {
  colors[i].addEventListener("click", () => {
    const colorsArr = ["#D6D6FF", "#DBFFDB", "#FFFCBC", "#FFE7E7", "#efefef"];
    console.log(colors[i]);
    console.log(colorsArr[i]);
    changeBackground(colorsArr[i]);
  });
}

//getting replies from the data object
// const getResponse = () => {
//   console.log(data[chatname.toLocaleLowerCase()]);
// };
