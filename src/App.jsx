import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  // Set initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-base-200">
          <Navbar />
          <main className="grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
