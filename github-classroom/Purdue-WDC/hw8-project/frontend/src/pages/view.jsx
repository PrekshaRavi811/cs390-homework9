import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async function () {
      const req = await fetch("http://localhost:3000/blog/");
      const json = await req.json();
      setPosts(json);
    })();
  }, []);
  //function editpost(title) {}
  async function deletepost(title) {
    const requestData = JSON.stringify({title});
    const headers = {"content-type": "application/json"};
    const response = await fetch("http://localhost:3000/blog/delete", {
      method: "post",
      headers,
      body: requestData,
    });
    const json = await response.json();
    setPosts(json);
  }
  return (
    <div>
      <Link to="/"> Home</Link>
      <div>
        {posts.map((post) => (
          <div
            key={post.title}
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <h2 style={{margin: "0.2rem"}}>{post.title}</h2>
            <div>{post.content}</div>
            <div>
              <button onClick={() => {deletepost(post.title);}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
