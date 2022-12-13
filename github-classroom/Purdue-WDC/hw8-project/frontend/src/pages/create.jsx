import {useState} from "react";
import {Link} from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    setError("");
    e.preventDefault();
    const requestData = JSON.stringify({title, content, password});
    const headers = {"content-type": "application/json"};
    const response = await fetch("http://localhost:3000/blog/create-post", {
      method: "post",
      headers,
      body: requestData
    });

     const json = await response.json();

    if (json.error) {
      setError(json.error);
      return;
    }
    
    setDone(true);
  }
  if (error) {
    return (
      <div>Incorrect Password!
        <div>
        <Link to="/">Return to home page</Link>
        </div>
      </div>
    );
  }
  
  if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <div>
        <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        type="password"></input>
      </div>
      <button>Post</button>
    </form>
  );
}
