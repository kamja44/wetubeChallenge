const videoContainer = document.getElementById("videoController");
const form = document.getElementById("commentForm");

const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  const icon = document.createElement("i");
  newComment.className = "video__comment";
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  const deleteSpan = document.createElement("span");
  deleteSpan.innerText = `❌`;
  span.innerText = ` ${text}`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteSpan);
  videoComments.prepend(newComment);
};
const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text.trim() === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  console.log(newCommentId);
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text);
  }
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}
