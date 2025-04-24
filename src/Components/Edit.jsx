import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.log(error);
      setError("Error fetching post");
    } else {
      setTitle(data.title);
      setContent(data.content);
      setImageUrl(data.image_url || '');
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        content,
        image_url: imageUrl,
      })
      .eq('id', id);

    if (error) {
      console.log(error);
      setError("Error updating post");
    } else {
      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    }
  };

  return (
    <div className="create-container">
      <h2 className='create-heading'>Edit Post</h2>
      <form onSubmit={handleUpdate} className="create-form">
        <label>Title (required):</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Content (optional):</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label>Image URL (optional):</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button className="create-submit" type="submit">Update Post</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Edit;
