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
      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen p-4 gap-2 bg-slate-50 dark:bg-slate-900 w-64 shrink-0 border-r border-outline-variant/10 z-40">
        <div className="px-4 py-6 mb-4">
          <h1 className="text-lg font-bold text-sky-600 font-headline">TripPlanner</h1>
          <p className="text-xs text-on-surface-variant">Premium Trip Planning</p>
        </div>
        <nav className="flex-1 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-transform duration-200 hover:scale-[1.02] ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`
            }
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              dashboard
            </span>
            Dashboard
          </NavLink>
        </nav>
        <div className="mt-auto pt-6 space-y-2 border-t border-outline-variant/10">
          <NavLink
            to="/plan"
            className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 scale-100 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Trip
          </NavLink>
          <NavLink
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl hover:scale-[1.02] transition-all"
          >
            <span className="material-symbols-outlined">admin_panel_settings</span>
            Admin Panel
          </NavLink>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* TopNavBar */}
        <header className="sticky top-0 w-full z-50 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-8 flex justify-between items-center border-b border-outline-variant/5">
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
             
              <NavLink to="/" className={isDashboard ? "text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400 pb-1" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"}>
                My Trips
              </NavLink>
              <NavLink to="/plan" className={location.pathname === '/plan' ? "text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400 pb-1" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"}>
                Plan New
              </NavLink>
            </div>
            {!isDashboard && <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-headline lg:hidden">TripPlanner</span>}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all">
              <span className="material-symbols-outlined">settings</span>
            </button>
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
