import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import App from './App.jsx';
import Create from './Components/Create.jsx';
import Header from './Components/Header.jsx';
import Post from './Components/Post.jsx'; 
import Edit from './Components/Edit.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/create' element={<Create />} />
        <Route path='/post/:id' element={<Post/>} />
        <Route path='/edit/:id' element={<Edit />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
