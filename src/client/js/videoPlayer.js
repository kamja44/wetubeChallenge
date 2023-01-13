const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreen = document.getElementById("fullScreen");
const fullScreenIcon = fullScreen.querySelector("i");
const videoController = document.getElementById("videoController");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
timeline.value = 0;
const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};
const handleMute = (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteIcon.classList = "fas fa-volume-up";
  }
  if (volumeValue === 0) {
    muteIcon.classList = "fas fa-volume-mute";
  }
  volumeValue = value;
  video.volume = value;
};
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);
const handleLoadedMetadata = () => {
  totalTime.innerText = `${formatTime(Math.floor(video.duration))}`;
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currentTime.innerText = `${formatTime(Math.floor(video.currentTime))} `;
  timeline.value = Math.floor(video.currentTime);
};
const handleTilelineChange = (event) => {
  const {
    target: { value },
  } = event;
  timeline.currentTime = value;
};
const handleFullScreen = (event) => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoController.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};
const hideControls = () => videoControls.classList.remove("showing");
const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};
const handleKeyDown = (event) => {
  const { code } = event;
  if (code === "Space") {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    playIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
  }
  if (code === "KeyM") {
    handleMute();
  }
};
const handleEnded = async () => {
  const { id } = videoController.dataset;
  await fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayClick);
timeline.addEventListener("input", handleTilelineChange);
fullScreen.addEventListener("click", handleFullScreen);
videoController.addEventListener("mousemove", handleMouseMove);
videoController.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keydown", handleKeyDown);
video.addEventListener("ended", handleEnded);
