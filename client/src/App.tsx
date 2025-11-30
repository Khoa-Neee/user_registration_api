import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-primary">
            User Registration
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-muted-foreground transition hover:text-foreground">
              Home
            </Link>
            <Link to="/register" className="text-muted-foreground transition hover:text-foreground">
              Sign Up
            </Link>
            <Link to="/login" className="text-muted-foreground transition hover:text-foreground">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} User Registration System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
