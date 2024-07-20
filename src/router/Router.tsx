import { Routes, Route } from 'react-router-dom';
import Home from '../components/pages/Home';
import { memo } from 'react';
import Near from '../components/pages/Near';
import Region from '../components/pages/Region';
import Community from '../components/pages/Community';
import BookMark from '../components/pages/BookMark';
import MyPage from '../components/pages/MyPage';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';
import PopularList from '../components/layout/PopularList';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/near" element={<Near />} />
      <Route path="/popular" element={<PopularList />} />
      <Route path="/region" element={<Region />} />
      <Route path="/community" element={<Community />} />
      <Route path="/bookmark" element={<BookMark />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default memo(Router);
