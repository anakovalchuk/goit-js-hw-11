import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorImage from "../img/error-notification.svg";

// console.log(flatpickr);
// console.log(iziToast);

const startBtn = document.querySelector("button");
const datePicker = document.querySelector("#datetime-picker");
const timeValues = document.querySelectorAll(".value");

startBtn.disabled = true;

let userSelectedDate = "";
let currentDate = "";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {

    userSelectedDate = selectedDates[0];
    currentDate = Date.now();

    if (userSelectedDate.getTime() < currentDate) {

      startBtn.disabled;
      
      iziToast.show({
        title: "",
        iconUrl: `${errorImage}`,
        message: "Please choose a date in the future",
        messageColor: "white",
        messageSize: "16px",
        backgroundColor: "red",
        position: "topRight",
      })
    } else {

      startBtn.disabled = false;
      
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener("click", handleStart);

  function handleStart() {
    
    const intervalId = setInterval(() => {

      startBtn.disabled = true;
      datePicker.disabled = true;

      currentDate = Date.now();
      const deltaTime = userSelectedDate.getTime() - currentDate;
      const deltaTimeConvert = convertMs(deltaTime);

      if (deltaTime > 0) {

        const time = [...timeValues];

      time[0].textContent = String(deltaTimeConvert.days).padStart(2, '0');
      time[1].textContent = String(deltaTimeConvert.hours).padStart(2, '0');
      time[2].textContent = String(deltaTimeConvert.minutes).padStart(2, '0');
      time[3].textContent = String(deltaTimeConvert.seconds).padStart(2, '0');

    } else {

      clearInterval(intervalId);
      datePicker.disabled = false;

    }
  }, 1000);
  }

  function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  


