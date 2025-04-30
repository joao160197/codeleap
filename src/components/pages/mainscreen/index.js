import "./styles.css";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Mainscreen = () => {
  const [postPlaceholder, setPostPlaceholder] = useState("");
  const [contentPlaceholder, setContentPlaceholder] = useState("");
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deletingEntry, setDeletingEntry] = useState(null);
  const words = ["first", "second", "third", "fourth", "fifth"];

  const currentUser = localStorage.getItem("currentUser");
  const API_URL = "https://dev.codeleap.co.uk/careers/";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      const sorted = response.data.results.sort(
        (a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)
      );
      setEntries(sorted);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  const addEntry = async () => {
    try {
      const response = await axios.post(API_URL, {
        username: currentUser,
        title: postPlaceholder,
        content: contentPlaceholder,
      });

      const newPost = response.data;
      setEntries((prevEntries) => [newPost, ...prevEntries]);
      setPostPlaceholder("");
      setContentPlaceholder("");
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry({ ...entry });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(`${API_URL}${editingEntry.id}/`, {
        title: editingEntry.title,
        content: editingEntry.content,
      });
      setEditingEntry(null);
      fetchPosts();
    } catch (error) {
      console.error("Erro ao editar post:", error);
    }
  };

  const handleDelete = (entry) => {
    setDeletingEntry(entry);
  };

  const handleConfirmDelete = async (entryToDelete) => {
    try {
      await axios.delete(`${API_URL}${entryToDelete.id}/`);
      setDeletingEntry(null);
      fetchPosts();
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  const isPostOwner = (username) => {
    return username?.trim().toLowerCase() === currentUser?.trim().toLowerCase();
  };

  const getMinutesPassed = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const minutes = Math.max(0, Math.floor(diffMs / 60000));
    return minutes;
  };

  return (
    <body>
      <header>
        <h1 className="CodeLeap">CodeLeap Network</h1>
      </header>
      <div className="MainScreen">
        <div className="post-section">
          <h2 className="SecondTitle">What’s on your mind?</h2>
          <h3 className="post_title">Title</h3>
          <input
            className="Post_placeholder"
            type="text"
            placeholder="Hello world"
            value={postPlaceholder}
            onChange={(e) => setPostPlaceholder(e.target.value)}
          />
          <h3 className="content">Content</h3>
          <input
            className="Content_placeholder"
            type="text"
            placeholder="Content here"
            value={contentPlaceholder}
            onChange={(e) => setContentPlaceholder(e.target.value)}
          />
          <button
            onClick={addEntry}
            className="create"
            disabled={!(postPlaceholder && contentPlaceholder)}
            type="submit"
          >
            Create
          </button>
        </div>

        <div className="entry-container">
          {entries.map((entry, index) => (
            <div className="entry" key={entry.id}>
              <div className="post-teste">
                {`my ${words[index % words.length]} post at CodeLeap Network!`}
                {isPostOwner(entry.username) && (
                  <div className="entry-actions">
                    <button
                      className="buttom-edit"
                      onClick={() => handleEdit(entry)}
                    >
                      <BiEdit />
                    </button>
                    <button
                      className="buttom-delet"
                      onClick={() => handleDelete(entry)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                )}
              </div>
              <div className="postagem">
              <p className="post-minute">
              <span className="username">@{entry.username}</span>
              <span className="timestamp">{getMinutesPassed(entry.created_datetime)} minutes ago</span>
              </p>
                <h2>{entry.title}</h2>
                <p>{entry.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingEntry && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Item</h2>
            <h3 className="post_title">Title</h3>
            <input
              className="edit_placeholder"
              type="text"
              value={editingEntry.title}
              onChange={(e) =>
                setEditingEntry({ ...editingEntry, title: e.target.value })
              }
            />
            <h3 className="content">Content</h3>
            <input
              className="edit_placeholder2"
              value={editingEntry.content}
              onChange={(e) =>
                setEditingEntry({ ...editingEntry, content: e.target.value })
              }
            />
            <button
              className="cancel-buttom"
              onClick={() => setEditingEntry(null)}
            >
              Cancel
            </button>
            <button className="save-buttom" onClick={handleSaveEdit}>
              Save
            </button>
          </div>
        </div>
      )}

      {deletingEntry && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="delete-title">
              Are you sure you want to delete this item?
            </h2>
            <button
              className="cancel-buttom"
              onClick={() => setDeletingEntry(null)}
            >
              Cancel
            </button>
            <button
              className="delete-buttom"
              onClick={() => handleConfirmDelete(deletingEntry)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </body>
  );
};

export default Mainscreen;
