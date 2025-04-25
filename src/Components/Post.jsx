import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase'; // Adjust the path if needed

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setPost(data);
    }
  }

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    if (!error) setComments(data);
  }

  async function handleAddComment() {
    if (!newComment.trim()) return;

    const { error } = await supabase.from('comments').insert([
      { post_id: id, text: newComment }
    ]);

    if (!error) {
      setNewComment('');
      fetchComments();
    }
  }

  async function handleUpvote() {
    const newUpvotes = post.upvotes + 1;

    const { error } = await supabase
      .from('posts')
      .update({ upvotes: newUpvotes })
      .eq('id', id);

    if (!error) {
      setPost({ ...post, upvotes: newUpvotes });
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm('Delete this post?');
    if (confirmDelete) {
      await supabase.from('posts').delete().eq('id', id);
      navigate('/');
    }
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-container">
      <h1>{post.title}</h1>

      {post.image_url && (
        <img src={post.image_url} alt="post" className="post-image" />
      )}

      <p className="post-content">{post.content}</p>

      <p><strong>Upvotes:</strong> {post.upvotes}</p>

      <div className="btn-group">
        <button onClick={handleUpvote}>Upvote</button>
        <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <div className="comments-section">
        <ul className="comment-list">
          {comments.map(comment => (
            <li key={comment.id}> {comment.text}</li>
          ))}
        </ul>
        </div>

        <div className='comment-attribute'>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
        />
        <button className="comment-submit" onClick={handleAddComment}>
          Post Comment
        </button>
        </div>
      </div>
  );
}

export default Post;
