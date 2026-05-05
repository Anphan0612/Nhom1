import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function UserLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isDashboard = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-background text-on-surface flex min-h-screen font-body">
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* TopNavBar */}
        <header className="sticky top-0 w-full z-50 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-8 flex justify-between items-center border-b border-outline-variant/5">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-600 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>fluid</span>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-headline hidden md:block">TripPlanner</span>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex items-center bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full border border-outline-variant/10">
            <NavLink 
              to="/explore" 
              className={({ isActive }) => `px-6 py-1.5 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'}`}
            >
              Explore
            </NavLink>
            <NavLink 
              to="/" 
              className={({ isActive }) => `px-6 py-1.5 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'}`}
            >
              My Trips
            </NavLink>
            <NavLink 
              to="/plan" 
              className={({ isActive }) => `px-6 py-1.5 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'}`}
            >
              Plan New
            </NavLink>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-outline-variant/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user?.name || 'User'}</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{user?.role || 'Guest'}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-95"
                title="Logout"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-x-hidden relative">
          <Outlet />
        </div>
      </main>

      {/* Mobile Navigation Shell */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl flex justify-around items-center h-20 px-4 border-t border-slate-100 dark:border-slate-800 z-50">
        <NavLink to="/" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter font-label">Home</span>
        </NavLink>
        <NavLink to="/explore" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter font-label">Explore</span>
        </NavLink>
        <NavLink to="/plan" className="-mt-12 bg-primary rounded-full p-4 shadow-lg shadow-primary/40 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-3xl">add</span>
        </NavLink>
        <NavLink to="/saved" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">favorite</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter font-label">Saved</span>
        </NavLink>
        <NavLink to="/profile" className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter font-label">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
