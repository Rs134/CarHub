import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Create() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          content,
          image_url: imageUrl,
          created_at: new Date(),
          upvotes: 0,
        }
      ])

      .select();

    if (error) {
      console.log(error)
      setError("Error creating post")
    } else {
      alert("Post created successfully!");
      navigate('/') 
    }
  }

  return (
    <div className="create-container">
      <h2 className='create-heading'>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="create-form">
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

        <button className="create-submit" type="submit">Create Post</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Create
