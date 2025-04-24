import { useLocation, useNavigate } from 'react-router-dom';
import Header from "./Components/Header";
import Home from "./Components/Home";
import './index.css'; // Make sure this is imported for CSS

function App() {
  const location = useLocation(); // Get the current location (path)
  const isCreatePage = location.pathname === '/create' || location.pathname === '/post/:id';

  // Apply flexbox only if we're on the '/create' page
  const containerClass = isCreatePage ? 'flex-body' : '';

  return (
    <div className={containerClass}>
      <div className='background'>
        <img src="/images/Banner-2.jpg" alt="Description" className='banner' />
        <div className='banner-text'>
          <h2 className='slogan-design '> 
            Connect, engage and accelerate the conversation together
          </h2>

          <a href="#home" className="banner-btn banner-text">
            <button>EXPLORE NOW</button>
          </a>

        </div>
      </div>
      <Home/>
    </div>
  );
}

export default App;
