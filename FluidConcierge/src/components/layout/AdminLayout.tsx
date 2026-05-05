import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-[#101415] text-on-surface flex min-h-screen font-body antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Admin Canvas */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-8 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl h-16 border-b border-slate-800 shadow-sm font-['Plus_Jakarta_Sans'] font-medium">
          <div className="flex items-center gap-6">
            <span className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-500">fluid</span>
              TripPlanner Admin
            </span>
            <nav className="hidden lg:flex items-center gap-1 ml-8">
              <NavLink to="/" className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm">App</NavLink>
              <NavLink to="/admin/users" className={({ isActive }) => `px-4 py-2 rounded-full text-sm transition-all ${isActive ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'}`}>Users</NavLink>
              <NavLink to="/admin/places" className={({ isActive }) => `px-4 py-2 rounded-full text-sm transition-all ${isActive ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'}`}>Places</NavLink>
              <NavLink to="/admin/config" className={({ isActive }) => `px-4 py-2 rounded-full text-sm transition-all ${isActive ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'}`}>AI Config</NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:bg-slate-800 rounded-full p-2 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-slate-400">notifications</span>
            </button>
            <button className="hover:bg-slate-800 rounded-full p-2 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-slate-400">chat_bubble</span>
            </button>
            <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold text-sm active:scale-95 transition-transform">
              New Itinerary
            </button>
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-800">
               <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-tight">{user?.name || 'Admin'}</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{user?.role || 'Full Access'}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-95 border border-slate-800"
                title="Logout"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
