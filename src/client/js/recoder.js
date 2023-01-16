const startBtn = document.getElementById("startBtn");
const video = document.querySelector("#preview");
const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 50, height: 50 },
  });
  video.srcObject = stream;
  console.log(video.srcObject);
  video.play();
};

startBtn.addEventListener("click", handleStart);
