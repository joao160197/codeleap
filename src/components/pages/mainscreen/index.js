import "./styles.css";
import React, { useState } from 'react';



const Mainscreen = () =>{


  const [Post_placeholder, setPost] = useState('');
  const [Content_placeholder, setContent] = useState('');

  const postData = () => {
    fetch("https://dev.codeleap.co.uk/careers/?format=api")
    console.log(Post_placeholder);
    console.log(Content_placeholder);
 }

  const input = document.querySelector('.Post_placeholder' && '.Content_placeholder');
  const button = document.querySelector('.create');

  const validateInput = ({target}) =>{
    if (target.value.length > 0) {
      button.removeAttribute('disabled');
      return;
    }
    
      button.setAttribute('disabled', '');
  }

  input.addEventListener('input', validateInput);

  

  
  return (
    <body>
     <header><h1>CodeLeap Network</h1></header>
     <div className="MainScreen">
     <div className="post-section">
      <h2 className="SecondTitle">What’s on your mind?</h2>
      <h3 className="post_title">Title</h3>
      <input className="Post_placeholder" type="text" placeholder="Hello world" onChange={(e) => setPost(e.target.value)}/>
      <h3 className="content">Content</h3>
      <input className="Content_placeholder" type="text" placeholder="Content here" onChange={(e) => setContent(e.target.value)}/>
      <button onClick={postData} className="create" disabled type="submit">Create</button>
     </div>
     </div>
    </body>
  );
}

export default Mainscreen;
