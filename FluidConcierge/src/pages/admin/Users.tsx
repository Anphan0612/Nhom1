export default function Users() {
  return (
    <div className="p-10 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">User Management</h1>
          <p className="text-on-surface-variant max-w-lg">Oversee, filter, and manage your concierge ecosystem's travelers and agents.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-surface-container-low p-1 rounded-full">
            <button className="px-5 py-2 rounded-full bg-surface-container-highest text-white text-sm font-semibold transition-all">All Users</button>
            <button className="px-5 py-2 rounded-full text-on-surface-variant hover:text-white text-sm font-semibold transition-all">Active</button>
            <button className="px-5 py-2 rounded-full text-on-surface-variant hover:text-white text-sm font-semibold transition-all">Blocked</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant/30 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 block">Total Users</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">12,482</span>
            <span className="text-primary text-sm font-medium">↑ 12%</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 block">Active Now</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">1,204</span>
            <span className="text-sky-400 text-sm animate-pulse">● Live</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 block">New This Week</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">432</span>
            <span className="text-on-surface-variant text-sm font-medium">+15%</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 block">Flagged Accounts</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-error">24</span>
            <span className="text-on-surface-variant text-sm font-medium">Action Required</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Name</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Last Active</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {[
              { name: "Sarah Jenkins", joined: "Jan 2024", email: "sarah.j@travelconcierge.com", status: "Active", time: "2 mins ago", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6JeUDmDaPC7vBkbXi4FSwMnxmRrOcd8xM4oS0y8LnEz_ax0KGqPhFrWBuilkoFtQQy_fPVR7w5tPT42OnuNCc2hsr4FSHIKIUKd08XnPQS08EWEVZ0us3WSYf7RxFEm9mjFDJu_47bEa1qadkL-oWysU78qhQSHdWnVomeduvCxMe6ogkLcDpV9DYlMDbcRB9wMcM_LTj_tptKc0X76H_NCXlc8aGtrhpBHLbGISHi0er36--s3e-K70V2ufKK7oV60fD5xFmiVE" },
              { name: "Mark Thorne", joined: "Nov 2023", email: "m.thorne@globalnet.io", status: "Blocked", time: "14 days ago", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9FHl0ffOIo55XwViqybRVk_c6MotXrAqdDvFrbexNyxr6tEyNLzQNXhbFaDq8Dy9HCKOjfYkMuQtLVXm_osM0KSZTObDbnAGFFTjjkPvvv7cGfxZqQpXnkKgEL6cuiUa3mRCmL2iis5rH8NILid1UOWgzCDu7MOeypWCE3uolDJLut56zGpAf7qFJ8G79a-vOx91aOypDbgXr5Mgsvc0Al8wrlup62Mn74qFuD0DKQOMkHAB4phqBhUkkHOWZGbofEfhfj4is2do" },
              { name: "Elena Rodriguez", joined: "Feb 2024", email: "elena.rodriguez@vanguard.co", status: "Active", time: "Just now", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRmB6uXX2sNy9b84b-ER-lXomFL2tpNfZT2Iw2cch3LoSo-5kiz9Nqyzx1RwhIT-220xEYTsxKyruDLz8apAdPqkzrxw079LDBekDglOOg2caAttgn4RpA2h8JcWCp5AX3OxcpLHYR1lPZsKxv5HZM0ynvMPF1ZZPH4YREhPsVHM_1_yBUb7wVnQfvktZx-Cprygvbabk2St8iJo2W4aF6lPmC-tlJbgqrRzwS-ClKnm-A7iZk_fTcqEH4jjz5hiUpZEPZzPLeCnY" },
            ].map((user, i) => (
              <tr key={i} className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-white leading-tight">{user.name}</p>
                      <p className="text-xs text-on-surface-variant">Joined {user.joined}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{user.email}</td>
                <td className="px-8 py-5">
                  {user.status === 'Active' ? (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20">Active</span>
                  ) : (
                    <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-full">Blocked</span>
                  )}
                </td>
                <td className="px-8 py-5 text-sm text-on-surface-variant">{user.time}</td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-surface-container-highest rounded-lg text-on-surface-variant transition-all"><span className="material-symbols-outlined">visibility</span></button>
                    {user.status === 'Active' ? (
                      <button className="p-2 hover:bg-error/10 hover:text-error rounded-lg text-on-surface-variant transition-all"><span className="material-symbols-outlined">block</span></button>
                    ) : (
                      <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg text-on-surface-variant transition-all"><span className="material-symbols-outlined">check_circle</span></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-8 py-5 flex items-center justify-between bg-surface-container-low/30 border-t border-outline-variant/10">
          <span className="text-xs font-semibold text-on-surface-variant">Showing 1-3 of 12,482 users</span>
          <div className="flex gap-2">
            <button className="px-4 py-1 border border-outline-variant/20 rounded-full text-xs font-bold text-on-surface-variant hover:bg-surface-container-low">Previous</button>
            <button className="px-4 py-1 border border-outline-variant/20 rounded-full text-xs font-bold text-white bg-surface-container-highest">1</button>
            <button className="px-4 py-1 border border-outline-variant/20 rounded-full text-xs font-bold text-on-surface-variant hover:bg-surface-container-low">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
