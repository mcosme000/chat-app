"use strict";

//IMPORT DATA FROM EXTERNAL JS FILE
import data from "./data.js";
console.log(data);

//set the active chat
let activeChat = 1;

// FORM THINGS //
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const chatroom = document.getElementsByClassName("chat-room");

// OTHER ELEMENTS //
let chatname = document.getElementById("chatname");
const contactCards = document.getElementsByClassName("contact-card");
const contactNames = document.getElementsByClassName("contact-name");
const lastMessages = document.getElementsByClassName("last-message");
const chats = document.getElementsByClassName("chat");
const colors = document.getElementsByClassName("colors")[0].children;
const cameraIcon = document.getElementById("camera-icon");
const photoOverlay = document.getElementById("photo-upload");
const photoArray = document.getElementsByClassName("photo-container");
const sendPhotoBtn = document.getElementById("send-photos");
// - - - - - ACTIONS - - - - - //

// SHOW / HIDE OVERLAY TO UPDLOAD PHOTOS
cameraIcon.addEventListener("click", () => {
  photoOverlay.classList.toggle("hidden");
});

// SET SCROLL BAR TO BOTTOM OF CHAT DIV
//I need to add the id "visible" everytime I swtich between chats
let objDiv = document.getElementById("visible");

const scrollDown = () => {
  objDiv.scrollTop = objDiv.scrollHeight;
};

//Get the ID of each contact:
for (let i = 0; i < contactCards.length; i++) {
  contactCards[i].addEventListener("click", () => {
    let contactId = contactCards[i].getAttribute("id");
    checkID(contactId);
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
  //hide the upload photo overlay:
  photoOverlay.classList.add("hidden");

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
  chatname.innerHTML = contactNames[activeChat - 1].innerHTML;
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

//get reply message:

//set timeout function depending on chat:
const setDelay = () => {
  let chatTitle = contactNames[activeChat - 1].innerHTML.toLocaleLowerCase();
  let delay = data[chatTitle].delay;
  setTimeout(function () {
    console.log(`I am ${chatTitle} and I'm sending a meesage with ${delay}`);
    getReplyMessage();
  }, delay);
};

const getReplyMessage = () => {
  console.log("REply message incomingggg");
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
  scrollDown();
  // getResponse();
  updateLastMessage(message);
  setDelay();
};

//CREATE MESSAGE WITH PHOTOS TO SEND
const sendPhotos = (arr) => {
  console.log(`Sending photos: ${arr}`);
  let messageContainer = document.createElement("DIV");
  messageContainer.classList = "message-photo align-right padding-right";
  let messagePhoto = document.createElement("DIV");
  messagePhoto.classList = "grid";
  //create img elements:
  let photoImg;
  for (let i = 0; i < arr.length; i++) {
    photoImg = document.createElement("IMG");
    photoImg.setAttribute("src", arr[i]);
    messagePhoto.appendChild(photoImg);
  }

  if (arr.length === 1) {
    photoImg.classList = "radius";
    messagePhoto.classList.remove("grid");
  } else if (arr.length % 2 !== 0) {
    messagePhoto.classList.add("grid-3");
  }

  messageContainer.appendChild(messagePhoto);
  chats[activeChat - 1].appendChild(messageContainer);

  //set the grid layout depending on number of photos:

  //fix scroll bar down:
  scrollDown();
};

//GET UPLOAD PHOTOS FROM PHOTO ARRAY
let sendPhotoArray = [];
for (let i = 0; i < photoArray.length; i++) {
  photoArray[i].addEventListener("click", () => {
    photoArray[i].children[0].classList.toggle("selected");
    let photoAtt = photoArray[i].children[0].getAttribute("src");

    if (sendPhotoArray.includes(photoAtt)) {
      sendPhotoArray = sendPhotoArray.filter((photo) => {
        return photo !== photoAtt;
      });
    } else {
      sendPhotoArray.push(photoAtt);
    }

    if (sendPhotoArray.length === 0) {
      sendPhotoBtn.disabled = true;
      sendPhotoBtn.style.background = "#EBEBEB";
    } else {
      sendPhotoBtn.disabled = false;
      sendPhotoBtn.style.background = "#3c3ce1";
      sendPhotoBtn.style.color = "#fff";
      sendPhotoBtn.style.cursor = "pointer";
    }
    console.log(sendPhotoArray);
  });
}

sendPhotoBtn.addEventListener("click", (e) => {
  for (let i = 0; i < photoArray.length; i++) {
    if (photoArray[i].children[0].classList.contains("selected")) {
      console.log(photoArray[i].children[0].classList.toggle("selected"));
    }
  }
  e.preventDefault();
  console.log(photoArray.length);
  if (sendPhotoArray.length === 0) {
    console.log("there are no photos to send");
  } else {
    sendPhotos(sendPhotoArray);
    //format the array
    sendPhotoArray = [];

    //default settings
    sendPhotoBtn.disabled = true;
    sendPhotoBtn.style.background = "#EBEBEB";
    photoOverlay.classList.toggle("hidden");
  }
});

//CHANGE BACKGROUND COLOR
const changeBackground = (color) => {
  chatroom[activeChat - 1].style.backgroundColor = color;
};

for (let i = 0; i < colors.length; i++) {
  colors[i].addEventListener("click", () => {
    const colorsArr = ["#D6D6FF", "#DBFFDB", "#FFFCBC", "#FFE7E7", "#efefef"];
    changeBackground(colorsArr[i]);
  });
}

//getting replies from the data object
// const getResponse = () => {
//   console.log(data[chatname.toLocaleLowerCase()]);
// };

scrollDown();
