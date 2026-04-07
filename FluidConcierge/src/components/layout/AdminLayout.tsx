import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="bg-[#101415] text-on-surface flex min-h-screen font-body antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Admin Sidebar */}
      <aside className="flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-slate-800 bg-slate-950 font-['Plus_Jakarta_Sans'] z-40">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>fluid</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Concierge AI</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Admin Terminal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all duration-300 hover:translate-x-1 rounded-xl"
          >
            <span className="material-symbols-outlined">home</span>
            <span>Back to App</span>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:translate-x-1 ${
                isActive
                  ? 'text-sky-400 bg-sky-500/10 rounded-r-full border-r-2 border-sky-500 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-xl'
              }`
            }
          >
            <span className="material-symbols-outlined" style={location.pathname === '/admin/users' ? { fontVariationSettings: "'FILL' 1" } : {}}>group</span>
            <span>Users</span>
          </NavLink>
          <NavLink
            to="/admin/places"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:translate-x-1 ${
                isActive
                  ? 'text-sky-400 bg-sky-500/10 rounded-r-full border-r-2 border-sky-500 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-xl'
              }`
            }
          >
            <span className="material-symbols-outlined" style={location.pathname === '/admin/places' ? { fontVariationSettings: "'FILL' 1" } : {}}>map</span>
            <span>Places</span>
          </NavLink>
          <NavLink
            to="/admin/config"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:translate-x-1 ${
                isActive
                  ? 'text-sky-400 bg-sky-500/10 rounded-r-full border-r-2 border-sky-500 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-xl'
              }`
            }
          >
            <span className="material-symbols-outlined">psychology</span>
            <span>AI Config</span>
          </NavLink>
        </nav>
        <div className="mt-auto p-4 border-t border-slate-900/50">
          <div className="px-4 py-2 mb-4">
            <button className="w-full py-3 px-4 bg-primary-container text-on-primary-container rounded-xl font-semibold text-sm hover:brightness-110 transition-all">
              Generate Report
            </button>
          </div>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-xl transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
        </div>
      </aside>

      {/* Admin Canvas */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-8 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl h-16 border-b border-slate-800 shadow-sm font-['Plus_Jakarta_Sans'] font-medium">
          <div className="flex items-center gap-6">
            <span className="text-lg font-semibold text-white">Admin Panel</span>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-sm">search</span>
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-slate-900 border-none rounded-full py-1.5 pl-10 pr-4 text-sm w-64 focus:ring-1 focus:ring-sky-500 text-slate-200"
              />
            </div>
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
            <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden ml-2">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCpqmpH3yd1dgD9BJN_Sy3Pi68cSWEB_ykUnlCrxL-JQgbAoUEbEg5czZAUbo76Q5q9ENEuqH-IkCBlXuk_Qt2VfvpngCOA9-KNwCT1ok_UARf0_Xr5Mkn9veEMS7-wbuXVrnvrP2g7ZKV-uD-8jJCZbYqn31gS6K3nIcdcX2Wb8JqclYg6MZBY18hExCrXSx5l0uadMI5Dpz6XMMCNWRqxxtqhU8S1irP3qmLKZ9CS45dTv38zDTy1aYEjzGITrB3uIR68loJUbw" 
                className="w-full h-full object-cover"
                alt="Admin Avatar"
              />
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
