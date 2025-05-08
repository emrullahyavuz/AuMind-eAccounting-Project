import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectAuth, 
  selectUser, 
  selectIsAuthenticated, 
  selectCurrentCompany,
  logout,
  setCurrentCompany 
} from '../store/slices/authSlice';
import { useLoginMutation, useChangeCompanyMutation } from '../store/api/authApi';

// Auth Custom hook
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentCompany = useSelector(selectCurrentCompany);
  
  const [loginMutation] = useLoginMutation();
  const [changeCompanyMutation] = useChangeCompanyMutation();

  const handleLogin = async (credentials) => {
    // Get selected company ID from localStorage if exists
    const selectedCompanyId = localStorage.getItem('selectedCompanyId');
    
    // If there's a selected company, include it in the login request
    if (selectedCompanyId) {
      credentials.companyId = selectedCompanyId;
      localStorage.removeItem('selectedCompanyId'); // Clear after use
    }

    await loginMutation(credentials).unwrap();
    navigate('/dashboard');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  const handleChangeCompany = async (companyId) => {
    const result = await changeCompanyMutation(companyId).unwrap();
    if (result.isSuccessful && result.data) {
      // Update token in localStorage
      localStorage.setItem('token', result.data.token);
      // Update token in Redux store
      dispatch(setCurrentCompany(result.data));
    }
  };

  return {
    auth,
    user,
    isAuthenticated,
    currentCompany,
    login: handleLogin,
    logout: handleLogout,
    changeCompany: handleChangeCompany,
  };
};