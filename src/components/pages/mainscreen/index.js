import "./styles.css";

function Mainscreen() {
  
  return (
    <body>
     <header><h1>CodeLeap Network</h1></header>
     <div className="MainScreen">
     <div className="post-section">
      <h2 className="SecondTitle">What’s on your mind?</h2>
      <h3 className="post_title">Title</h3>
      <input className="Post_placeholder" type="text" placeholder="Hello world" />
      <h3 className="content">Content</h3>
      <input className="Content_placeholder" type="text" placeholder="Content here" />
      <button className="create" disabled type="submit">Create</button>
     </div>
     </div>
    </body>
  );
}

export default Mainscreen;
