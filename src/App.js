// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// import Layout from './components/Layout';
// // import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Templates from './pages/Templates';
// import Categories from './pages/Categories';
// import Users from './pages/Users';
// import Subscriptions from './pages/Subscriptions';
// import AuthPage from './pages/AuthPage';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/login" />;
// };

// function App() {
//   const token = localStorage.getItem('token');

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/authpage" element={token ? <Navigate to="/dashboard" /> : <AuthPage />} />
//           {/* <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} /> */}
//           <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
//             <Route index element={<Navigate to="/dashboard" />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="templates" element={<Templates />} />
//             <Route path="categories" element={<Categories />} />
//             <Route path="users" element={<Users />} />
//             <Route path="subscriptions" element={<Subscriptions />} />
//           </Route>
//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//         <ToastContainer position="top-right" autoClose={3000} />
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Subscriptions from './pages/Subscriptions';
import AuthPage from './pages/AuthPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/authpage" />;
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth page: signup/login */}
          <Route
            path="/authpage"
            element={token ? <Navigate to="/dashboard" /> : <AuthPage />}
          />

          {/* Main App Layout with Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="templates" element={<Templates />} />
            <Route path="categories" element={<Categories />} />
            <Route path="users" element={<Users />} />
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to={token ? "/dashboard" : "/authpage"} />} />
        </Routes>

        {/* Toast notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
