import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/navigation/TopNav';
import HomeView from './views/HomeView';
import ReviewView from './views/ReviewView';
import QuoteView from './views/QuoteView';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <TopNav />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/reviews" element={<ReviewView />} />
          <Route path="/quote" element={<QuoteView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegistrationView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
