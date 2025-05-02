import "./styles.css";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Mainscreen = () => {
  const [postPlaceholder, setPostPlaceholder] = useState("");
  const [contentPlaceholder, setContentPlaceholder] = useState("");
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deletingEntry, setDeletingEntry] = useState(null);
  const [likes, setLikes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const currentUser = localStorage.getItem("currentUser");
  const API_URL = "https://dev.codeleap.co.uk/careers/";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      const sorted = response.data.results.sort(
        (a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)
      );
      setEntries(sorted);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEntry = async () => {
    try {
      await axios.post(API_URL, {
        username: currentUser,
        title: postPlaceholder,
        content: contentPlaceholder,
      });
      setPostPlaceholder("");
      setContentPlaceholder("");
      fetchPosts();
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  };

  const handleEdit = (entry) => setEditingEntry({ ...entry });

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

  const handleDelete = (entry) => setDeletingEntry(entry);

  const handleConfirmDelete = async (entryToDelete) => {
    try {
      await axios.delete(`${API_URL}${entryToDelete.id}/`);
      setDeletingEntry(null);
      fetchPosts();
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  const isPostOwner = (username) =>
    username?.trim().toLowerCase() === currentUser?.trim().toLowerCase();

  const getMinutesPassed = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    return Math.max(0, Math.floor((now - created) / 60000));
  };

  const toggleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const totalPages = Math.ceil(entries.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = entries.slice(indexOfFirst, indexOfLast);

  const userPostCounts = {};

  return (
    <div>
      <header>
        <h1 className="CodeLeap">CodeLeap Network</h1>
      </header>
      <div className="MainScreen">
        {isLoading ? (
          <div className="post-section">
            <div className="skeleton-header" style={{ width: '60%' }} />
            <div className="skeleton-line" style={{ width: '100%', height: '40px' }} />
            <div className="skeleton-line" style={{ width: '100%', height: '60px', marginTop: '10px' }} />
            <div className="skeleton-line short" style={{ width: '120px', height: '32px', marginTop: '20px' }} />
          </div>
        ) : (
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
        )}

        <div className="entry-container">
          {isLoading ? (
            entries.length === 0 ? (
              <></>
            ) : (
              entries.slice(indexOfFirst, indexOfLast).map((_, i) => (
                <div className="entry skeleton-card" key={i}>
                  <div className="post-teste skeleton-title" />
                  <div className="postagem">
                    <div className="skeleton-line skeleton-user" />
                    <div className="skeleton-line skeleton-h2" />
                    <div className="skeleton-line skeleton-p" />
                    <div className="skeleton-line skeleton-p" />
                  </div>
                </div>
              ))
            )
          ) : (
            currentPosts.map((entry) => {
              const username = entry.username;
              userPostCounts[username] = (userPostCounts[username] || 0) + 1;
              const postNumber = userPostCounts[username];
              const wordIndex = Math.min(postNumber - 1, 4);
              const postLabel = `my ${["first", "second", "third", "fourth", "fifth"][wordIndex]} post at CodeLeap Network!`;

              return (
                <div className="entry" key={entry.id}>
                  <div className="post-teste">
                    <span>{postLabel}</span>
                    {isPostOwner(username) && (
                      <div className="entry-actions">
                        <button className="buttom-edit" onClick={() => handleEdit(entry)}>
                          <BiEdit />
                        </button>
                        <button className="buttom-delet" onClick={() => handleDelete(entry)}>
                          <MdDeleteForever />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="postagem">
                    <div className="post-minute">
                      <span className="author">@{username}</span>
                      <span>{getMinutesPassed(entry.created_datetime)} minutes ago</span>
                    </div>
                    <h2>{entry.title}</h2>
                    <p>{entry.content}</p>
                    <div className="like-section">
                      <button onClick={() => toggleLike(entry.id)}>
                        {likes[entry.id] ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                      </button>
                      <span>{likes[entry.id] ? 1 : 0} like{likes[entry.id] ? "" : "s"}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
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
              onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
            />
            <h3 className="content">Content</h3>
            <input
              className="edit_placeholder2"
              type="text"
              value={editingEntry.content}
              onChange={(e) => setEditingEntry({ ...editingEntry, content: e.target.value })}
            />
            <button className="cancel-buttom" onClick={() => setEditingEntry(null)}>
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
            <button className="cancel-buttom" onClick={() => setDeletingEntry(null)}>
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
    </div>
  );
};

export default Mainscreen;
