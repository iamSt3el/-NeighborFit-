import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Landing from './Landing';

const Home = () => {
  // For now, Home will render the Landing page
  // In the future, this could redirect or show a different home page for logged-in users
  return <Landing />;
};

export default Home;