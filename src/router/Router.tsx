import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../components/pages/Home';
import { memo } from 'react';
import Near from '../components/pages/Near';
import Region from '../components/pages/Region';
import Community from '../components/pages/Community';
import BookMark from '../components/pages/BookMark';
import MyPage from '../components/pages/MyPage';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';
import Footer from '../components/layout/Footer';
import PlaceDetail from '@/components/pages/PlaceDetail';
import CommunityDetail from '@/components/pages/CommunityDetail';

const Router = () => {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/signup'];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/near" element={<Near />} />
        <Route path="/near/detail/:id" element={<PlaceDetail />} />
        <Route path="/region/:locationName" element={<Region />} />
        <Route path="/region/detail/:id" element={<PlaceDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/detail/:id" element={<CommunityDetail />} />
        <Route path="/bookmark" element={<BookMark />} />
        <Route path="/bookmark/detail/:id" element={<PlaceDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default memo(Router);
