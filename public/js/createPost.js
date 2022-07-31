const newFormHandler = async (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const postContent = document.querySelector("#post-content").value.trim();

  if (title && postContent) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, post_content: postContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector("#submitButton")
  .addEventListener("click", newFormHandler);
