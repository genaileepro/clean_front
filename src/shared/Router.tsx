import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import CommissionWrite from '../pages/CommissionWrite';
import CommissionList from '../pages/CommissionList';
import CommissionDetail from '../pages/CommissionDetail';
import UserOrders from '../pages/UserOrders';
import MyPage from '../pages/Mypage';
import Home from '../pages/Home';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicOnlyRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Public Only Routes (for non-authenticated users) */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected Routes (for authenticated users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mypage/:email" element={<MyPage />} />
          <Route path="/commissionwrite" element={<CommissionWrite />} />
          <Route path="/commissionlist" element={<CommissionList />} />
          <Route path="/commissiondetail/:id" element={<CommissionDetail />} />
          <Route path="/userorders" element={<UserOrders />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;