import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MemberLayout from '../components/members/MemberLayout';
import PartnerLayout from '../components/partners/PartnerLayout';
import Home from '../pages/exclude/Home';
import ServicePage from '../pages/exclude/ServicePage';
import LoginSelector from '../pages/actionbutton/LoginSelector';
import SignUpSelector from '../pages/actionbutton/SignUpSelector';
import Login from '../pages/members/Login';
import SignUp from '../pages/members/SignUp';
import CommissionWrite from '../pages/members/CommissionWrite';
import CommissionList from '../pages/members/CommissionList';
import CommissionDetail from '../pages/members/CommissionDetail';
import UserOrders from '../pages/members/UserOrders';
import MemberInfo from '../pages/members/MemberInfo';
import MemberEdit from '../pages/members/MemberEdit';
import PartnerHome from '../pages/partners/PartnerHome';
import PartnerLogin from '../pages/partners/PartnerLogin';
import PartnerSignUp from '../pages/partners/PartnerSignUp';
import PartnerRecruitment from '../pages/exclude/PartnerRecruitment';
import CommissionCalling from '../pages/partners/CommissionCalling';
import CommissionMatching from '../pages/partners/CommissionMatching';
import MemberHome from '../pages/members/MemberHome';
import Layout from '../components/exclude/Layout';
import PartnerInfo from '../pages/partners/PartnerInfo';
import PartnerEdit from '../pages/partners/PartnerEdit';
import MyEstimates from '../pages/partners/MyEstimates';
import WriteEstimate from '../pages/partners/WriteEstimate';
import EstimateDetail from '../pages/members/EstimateDetail';

const ProtectedRoute: React.FC<{ allowedRole: 'member' | 'partner' }> = ({
  allowedRole,
}) => {
  const { isAuthenticated, loading, member, partner } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/loginselect" />;
  if (allowedRole === 'member' && !member)
    return <Navigate to="/loginselect" />;
  if (allowedRole === 'partner' && !partner)
    return <Navigate to="/loginselect" />;
  return <Outlet />;
};

const PublicOnlyRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

const Router: React.FC = () => {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/ptrecruitment" element={<PartnerRecruitment />} />
        <Route path="/loginselect" element={<LoginSelector />} />
        <Route path="/signupselect" element={<SignUpSelector />} />

        {/* Public Only Routes (for non-authenticated users) */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/ptlogin" element={<PartnerLogin />} />
          <Route path="/ptsignup" element={<PartnerSignUp />} />
        </Route>
      </Route>

      {/* Member Layout */}
      <Route element={<MemberLayout />}>
        {/* Protected Routes (for authenticated members) */}
        <Route element={<ProtectedRoute allowedRole="member" />}>
          <Route path="/memberhome" element={<MemberHome />} />
          <Route path="/member/:email" element={<MemberInfo />} />
          <Route path="/member/:email/edit" element={<MemberEdit />} />
          <Route path="/commissionwrite" element={<CommissionWrite />} />
          <Route path="/commissionlist" element={<CommissionList />} />
          <Route path="/commissiondetail" element={<CommissionDetail />} />
          <Route path="/estimatedetail" element={<EstimateDetail />} />
          <Route path="/userorders" element={<UserOrders />} />
        </Route>
      </Route>

      {/* Partner Layout */}
      <Route element={<PartnerLayout />}>
        {/* Protected Routes (for authenticated partners) */}
        <Route element={<ProtectedRoute allowedRole="partner" />}>
          <Route path="/pthome" element={<PartnerHome />} />
          <Route path="/pt/:email" element={<PartnerInfo />} />
          <Route path="/pt/:email/edit" element={<PartnerEdit />} />
          <Route path="/commissioncalling" element={<CommissionCalling />} />
          <Route path="/writeestimate/:id" element={<WriteEstimate />} />
          <Route path="/myestimates" element={<MyEstimates />} />
          <Route path="/commissionmatching" element={<CommissionMatching />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
