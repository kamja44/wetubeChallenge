const videoContainer = document.getElementById("videoController");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelector(".deleteBtn");

const addComment = (text, id) => {
  console.log(id);
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  const icon = document.createElement("i");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  const deleteSpan = document.createElement("span");
  deleteSpan.innerText = `❌`;
  span.innerText = ` ${text}`;
  deleteSpan.dataset.id = id;
  deleteSpan.dataset.videoid = videoContainer.dataset.id;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteSpan);
  videoComments.prepend(newComment);
  deleteSpan.addEventListener("click", handleDelete);
  deleteSpan.className = "deleteBtn";
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
  if (response.status === 201) {
    const { newComment } = await response.json();
    addComment(text, newComment);
  }
};
const handleDelete = async (event) => {
  console.log(event.target.dataset);
  const { id, videoid } = event.target.dataset;
  const response = await fetch(`/api/videos/${videoid}/comments/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, videoid }),
  });
  if (response.status === 200) {
    event.target.parentNode.remove();
  }
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteBtn) {
  deleteBtn.addEventListener("click", handleDelete);
}
