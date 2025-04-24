import { useState, useEffect } from 'react';
import { supabase } from '../supabase'; // Adjust the path to your supabase file
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]); // State to store posts
  const [error, setError] = useState(null); // State to store errors
  const [sortBy, setSortBy] = useState('created_at'); // State to store sorting option
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  // Fetch posts from Supabase when component mounts or when sortBy changes
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortBy, { ascending: false }); // Sorting posts by `sortBy` field

      if (error) {
        setError(error.message); // Set error message if any
      } else {
        setPosts(data); // Set posts data if successful
      }
    };

    fetchPosts();
  }, [sortBy]); // Fetch posts whenever the sorting option changes

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id='home' className="home-container">
      <h2 className="home-heading">Home Feed</h2>

      <div className="sort-container input-effect">
      <input
        type="text"
        placeholder="Search posts by title"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className='sort-toggle'>

        <label>Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Creation Time</option>
          <option value="upvotes">Upvotes</option>
        </select>
        </div>
      </div>


      {error && <p className="error">{error}</p>}
      {filteredPosts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul className="posts-list">
          {filteredPosts.map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-header">
                <h3>{post.title}</h3>
                <p>Created: {new Date(post.created_at).toLocaleString()}</p>
              </div>
              <p>Upvotes: {post.upvotes}</p>
              <Link to={`/post/${post.id}`} className="view-post">
                View Post
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home; 