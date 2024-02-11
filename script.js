let userName; // Variable to store the user's name

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("namePopup");
  const btn = document.getElementById("submitName");
  const span = document.getElementsByClassName("close")[0];
  const wrapper = document.querySelector(".wrapper"); // Ensure this is defined to control visibility
  const question = document.querySelector(".question");
  const gif = document.querySelector(".gif");

  btn.onclick = function() {
    modal.style.display = "none";
    userName = document.getElementById("nameInput").value;
    wrapper.style.display = "block"; // Show the main content
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  const yesBtn = document.querySelector(".yes-btn");
  const noBtn = document.querySelector(".no-btn");

  yesBtn.addEventListener("click", () => {
    sendData(userName, "Yes");
    question.innerHTML = "Yay, see you on the 18th!";
    gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";
  });

  noBtn.addEventListener("mouseover", () => {
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;
  
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
  
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
  });

  function sendData(name, response) {
    const timestamp = new Date().toISOString();
    fetch("/.netlify/functions/storeResponse", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, response, timestamp }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }
});

