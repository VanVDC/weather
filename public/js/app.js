const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherform.addEventListener("submit", (e) => {
  const city = search.value;

  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + city)
    .then((res) => {
      res
        .json()
        .then((data) => {
          const address = data.address;
          messageOne.textContent = address.toUpperCase();
          messageTwo.textContent = data.forecast;
        })
        .catch((err) => (messageOne.textContent = err));
    })
    .catch((err) => (messageOne.textContent = err));
  e.preventDefault();
});
