//variables
import { allVideos } from "./js/videos";
let index = 0;
const video = document.querySelector(".movie__video");
const playButton = document.querySelector(".button__play");
const prevButton = document.querySelector(".button__prev");
const nextButton = document.querySelector(".button__next");
const rangeInput = document.querySelector(".range__input");
const timer = document.querySelector(".range__timer");
//events
window.addEventListener("load", () => addFirstVideo(allVideos, index));
playButton.addEventListener("click", () => {
  playVideo();
});
video.addEventListener("timeupdate", () => {
  updateTimer();
  moveRangeInput();
  videIsEndign();
});
rangeInput.addEventListener("input", () => {
  video.currentTime = (rangeInput.value * video.duration) / 100;
});
prevButton.addEventListener("click", () => {
  index--; //|| (index = allVideos.length - 1); // last index
  if (index < 0) {
    index = allVideos.length - 1;
  }
  addNextVideo(index);
  console.log(index);
});
nextButton.addEventListener("click", () => {
  index++;
  addNextVideo(index);
  if (index >= allVideos.length) {
    index = -1;
  }
  console.log(index);
});
//functions
function addFirstVideo(arr, index) {
  video.setAttribute("src", arr[index].video);
  video.setAttribute("poster", arr[index].poster);
}
function playVideo() {
  if (video.paused) {
    video.play();
    playButton.classList.add("button-active");
    playButton.firstElementChild.classList.remove("fa-play");
    playButton.firstElementChild.classList.add("fa-pause");
  } else {
    video.pause();
    playButton.classList.remove("button-active");
    playButton.firstElementChild.classList.remove("fa-pause");
    playButton.firstElementChild.classList.add("fa-play");
  }
}
function updateTimer() {
  let time = video.currentTime;
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  timer.textContent = `${minutes}:${seconds}`;
}
function moveRangeInput() {
  rangeInput.value = Number((video.currentTime / video.duration) * 100);
}
function addNextVideo(i = 0) {
  video.play();
  playVideo();
  addFirstVideo(allVideos, i);
}
function videIsEndign() {
  try {
    if (video.ended) {
      video.play();
      playVideo();
    }
  } catch (error) {}
}
