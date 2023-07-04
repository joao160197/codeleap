import "./styles.css";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const Mainscreen = () => {
  const [postPlaceholder, setPostPlaceholder] = useState("");
  const [contentPlaceholder, setContentPlaceholder] = useState("");
  const [entries, setEntries] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [editingEntry, setEditingEntry] = useState({
    post: "",
    content: "",
    createdAt: null,
    createdBy: ""
  });
  const [editingEntryIndex, setEditingEntryIndex] = useState(-1);
  const [deletingEntry, setDeletingEntry] = useState(null);
  const words = ["first", "second", "third", "fourth", "fifth"];

  const location = useLocation();
  const currentUser = location.state?.createdBy;

  useEffect(() => {
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    const newEntry = {
      post: postPlaceholder,
      content: contentPlaceholder,
      createdAt: new Date(),
      createdBy: currentUser,
    };

    setEntries([...entries, newEntry]);
    setPostPlaceholder("");
    setContentPlaceholder("");
    setPostCount(postCount + 1);
  };

  const getMinutesPassed = (createdAt) => {
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    const minutesPassed = Math.floor(timeDiff / (1000 * 60));
    return minutesPassed;
  };

  const handleEdit = (entryIndex) => {
    const entryToEdit = entries[entryIndex];
    setEditingEntry(entryToEdit);
    setEditingEntryIndex(entryIndex);
  };

  const handleSaveEdit = () => {
    const updatedEntries = [...entries];
    updatedEntries[editingEntryIndex] = editingEntry;
    setEntries(updatedEntries);
    setEditingEntry({
      post: "",
      content: "",
      createdAt: null,
    });
    setEditingEntryIndex(-1);
  };

  const handleDelete = (entry) => {
    setDeletingEntry(entry);
  };

  const handleConfirmDelete = (entryToDelete) => {
    const updatedEntries = entries.filter((entry) => entry !== entryToDelete);
    setEntries(updatedEntries);
    setDeletingEntry(null);
  };

  const isPostOwner = (createdBy) => {
    return createdBy === currentUser;
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
            <div className="entry" key={index}>
              <div className="post-teste">
                {`my ${words[index]} post at CodeLeap Network!`}
                {isPostOwner(entry.createdBy) && (
                  <div className="entry-actions">
                    <button
                      className="buttom-edit"
                      onClick={() => handleEdit(index)}
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
                  {getMinutesPassed(entry.createdAt)} minutes ago
                </p>
                <h2>{entry.post}</h2>
                <p>{entry.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingEntryIndex !== -1 && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Item</h2>
            <h3 className="post_title">Title</h3>
            <input
              className="edit_placeholder"
              type="text"
              placeholder="Hello World"
              value={editingEntry.post}
              onChange={(e) =>
                setEditingEntry({
                  ...editingEntry,
                  post: e.target.value,
                })
              }
            />
            <h3 className="content">Content</h3>
            <input
              className="edit_placeholder2"
              placeholder="Content Here"
              type="text"
              value={editingEntry.content}
              onChange={(e) =>
                setEditingEntry({
                  ...editingEntry,
                  content: e.target.value,
                })
              }
            />
            <button
              className="cancel-buttom"
              onClick={() => setEditingEntryIndex(-1)}
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
