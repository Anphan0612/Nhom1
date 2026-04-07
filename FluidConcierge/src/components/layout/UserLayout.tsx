import { ReactNode } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function UserLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <div className="bg-background text-on-surface flex min-h-screen font-body">
      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen p-4 gap-2 bg-slate-50 dark:bg-slate-900 w-64 shrink-0 border-r border-outline-variant/10 z-40">
        <div className="px-4 py-6 mb-4">
          <h1 className="text-lg font-bold text-sky-600 font-headline">Fluid Concierge</h1>
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
          <NavLink
            to="/destinations"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl hover:scale-[1.02] transition-all"
          >
            <span className="material-symbols-outlined">map</span>
            Destinations
          </NavLink>
          <NavLink
            to="/itinerary/tokyo"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-transform duration-200 hover:scale-[1.02] ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`
            }
          >
            <span className="material-symbols-outlined">event_note</span>
            Itineraries
          </NavLink>
          <NavLink
            to="/budget"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl hover:scale-[1.02] transition-all"
          >
            <span className="material-symbols-outlined">payments</span>
            Budget
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
              <NavLink to="/explore" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Explore
              </NavLink>
              <NavLink to="/" className={isDashboard ? "text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400 pb-1" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"}>
                My Trips
              </NavLink>
              <NavLink to="/plan" className={location.pathname === '/plan' ? "text-sky-600 dark:text-sky-400 font-semibold border-b-2 border-sky-600 dark:border-sky-400 pb-1" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"}>
                Plan New
              </NavLink>
            </div>
            {!isDashboard && <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-headline lg:hidden">Fluid Concierge</span>}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-all">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden ml-2 border border-outline-variant/20">
              <img
                alt="User profile avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0HD1G5HGz0HGXmJfrmUwtZKUEUBfVvkAMwKq4XuN0-meLc2UjnUXW4DDKKRKfCt4WX-stsIgdstQ-Sg6NmhgNDqalM75Jc5PMAFl8d_00pi6jFOxLZrlg2jCU3J6tAM4B4Riqa8IUVL8te_YkvECoMcnJvur6fhFdfPITG4BYx7-NryPSIEanjDalP2jCIr0DDeuTJWPrYmaFV689xjljtMc6dEbdBr-R1FZZe3pM7jpSBQ8NQnwCTJsfGJ31myoyGtvyU7YpKJc"
                className="w-full h-full object-cover"
              />
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
