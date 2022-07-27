const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#comment-name").value.trim();
  const needed_funding = document.querySelector("#comments").value.trim();
  const description = document.querySelector("#comment-desc").value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create comment");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete comments");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".comment-list")
  .addEventListener("click", delButtonHandler);
