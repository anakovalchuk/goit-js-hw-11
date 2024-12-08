import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorImage from "../img/error-notification.svg";
import successImage from "../img/success.svg";

const form = document.querySelector(".form");

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {

      setTimeout(() => {
        if(state === "fulfilled") {
          resolve(delay);
        } else {
          reject(delay);
        }
    }, delay)
  });


promise

.then((delay) => {
  iziToast.success({
    title: "",
    iconUrl: `${successImage}`,
    messageSize: "16px",
    backgroundColor: "green",
    messageColor: "white",
    message: `Fulfilled promise in ${delay}ms`,
    position: 'topRight',
  });
})

.catch((delay) => {
  iziToast.error({
    title: "",
    messageSize: "16px",
    backgroundColor: "red",
    iconUrl: `${errorImage}`,
    messageColor: "white",
    message: `Rejected promise in ${delay}ms`,
    position: "topRight",
  });
});
}



