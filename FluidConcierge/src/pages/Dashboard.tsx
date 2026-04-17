export default function Dashboard() {
  return (
    <div className="pt-8 px-8 pb-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative mb-16 rounded-xl overflow-hidden min-h-[320px] flex items-center p-12 bg-slate-900">
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDin-_YnOBifZleUazCoHY4Mv0sjupaVBXAQlzkh4dERZALQvApRYTj7Cq_f6rp8LnQTicqD7fvjIkyIDneIuEkxdMi2zlx1zpY3MPiBsjdbUXIj9KGmEfWHAKCJUwG6r8Qbk6BnJB5KzsW3fg421ynngX3zOFwF34cno2byWxUa9_OxDK-ja53ip8_AigbOg91G9vDTHLNLy-DcnbZWO2ZFMWF6Eb9CxWh7IDyk6PoZeor_kRv-9gHVxp-yX9088uO6aSYJ-Cqipk')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            Where will you <span className="text-primary-container">wander</span> next?
          </h2>
          <p className="text-lg text-slate-300 mb-8 font-body">
            Harness the power of AI to craft your perfect journey. From hidden gems to luxury stays, we handle the details.
          </p>
          <button className="group flex items-center gap-3 bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-primary/40 hover:scale-105 transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            Create New Trip
          </button>
        </div>
      </section>

      {/* Stats & Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-low p-6 rounded-xl border border-transparent hover:bg-surface-container transition-colors">
            <p className="text-sm font-label text-on-surface-variant font-semibold uppercase tracking-wider mb-2">Total Trips</p>
            <h3 className="text-4xl font-bold text-on-surface">5</h3>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border border-transparent hover:bg-surface-container transition-colors">
            <p className="text-sm font-label text-on-surface-variant font-semibold uppercase tracking-wider mb-2">Total Days Traveled</p>
            <h3 className="text-4xl font-bold text-on-surface">24</h3>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border border-transparent hover:bg-surface-container transition-colors">
            <p className="text-sm font-label text-on-surface-variant font-semibold uppercase tracking-wider mb-2">Budget Spent</p>
            <h3 className="text-4xl font-bold text-primary">$4,200</h3>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-end">
          <div className="bg-surface-container-highest p-1 rounded-full flex gap-1">
            <button className="p-3 bg-surface-container-lowest text-primary rounded-full shadow-sm">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="p-3 text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">calendar_month</span>
            </button>
            <button className="p-3 text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trip Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: '7 Days in Paris',
            date: 'June 12-19',
            desc: 'Art, Gastronomy, and the Seine. A deep dive into the heart of France.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkF-Z9gpc6o79QSRGm32SxyoZBR7JyAbmNWxoTWjCJ1fTz5KVKLRb14R2QA63E3vn1ZYWQdSDmLrYkuewfIVcLNaeMgZ3QaQsEjwT_8sincE_c-7hdsP-qRFb_5CagNcDg8ttX72r-91tertmOLxucSUsyjSaA3nkY-s4jAbdct5jpZLIqLTfdHbxICREIKgzFoevx_2EUIAPHsOe7NapW2-2j6j0si1MNiuB28eDZdWM6LRemZfI-U4fDVrhnSWu24LN8Jy6w6hc',
            badge: 'Luxury',
            badgeClass: 'bg-primary-fixed text-on-primary-fixed',
            icon1: 'flight', text1: 'CDG', icon2: 'hotel', text2: 'Le Meurice'
          },
          {
            title: '3 Days in Tokyo',
            date: 'Aug 05-08',
            desc: 'Futuristic skylines and ancient temples. A fast-paced urban adventure.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwsarMQRaPrUKDWM5kVDYtmbafwbGnvad3dpPmnjdlHuX72VGiXNRzHcK-TUjYjaLGeXsMC5NsYI_nvJPSXkTGyh6G8Yj8WcfP6AzBKbpsbNtljMPknA9r3rfjPK88I7adkTRfQ5x7-YPtDoWMB9QzpAyvY0lZh6WBJrr7_VARsPaDpepUqXw0knyrGAYVJcKAcixmEaXHsiXp20f2JkSDWUi_GO09vY2FT1MNWXwyrqo8zk78f3XAe2tuQL37WKB7bFGpxLZtlKg',
            badge: 'Standard',
            badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
            icon1: 'train', text1: 'Shinkansen', icon2: 'restaurant', text2: 'Sushi Zen'
          },
          {
            title: '5 Days in Bali',
            date: 'Sep 20-25',
            desc: 'Spiritual retreats, surfing, and serenity in the tropical paradise.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4m3Go85Cc6m9ETeXzGwyFafO6B_HhFCfLn9HYVtk1_vvBs0Oi_odi5vMPX9fQH48bks-kaNgzodOHQaTeOk1soBrtagWtB2KKkbeaobRJxf7_f9PgL0QqRMt-zFpbWU-yxVRWTWJsbXhESQpP4DE6rYAPlVCMfOVSuD1T7N-ic8bhMX_hpXn1rS4PojMWwex7YLr1m3SYiwzIdQLAgcVSCuXMTA3OCzKNnM0Y2UfbmPuGPvOXwLizr7Rj1C2CytlSMK2JouzV0PM',
            badge: 'Standard',
            badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
            icon1: 'spa', text1: 'Ubud Spa', icon2: 'beach_access', text2: 'Canggu'
          },
          {
            title: '10 Days in Rome',
            date: 'Oct 10-20',
            desc: 'Reliving history through the Eternal City cobblestone streets.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB68wcP-G_GctIr_ptG04cjKwyIfAulyMONknBQm4jBB3OjVRrgLDDTqygPm8JD30k1x8Jx_xpzMbbpvRx4MF-xAcrB10FbhEA7CzO5kgWoCt3_AYdP3eLmfS-nRoF067FMOIbjvEZkJcmDubX1cByX7sP1fKKUOqPa65vU6GOQ2uyHtOXLAS3HwwcEro6d9aeX8BwCmw7PXLWns83XuCtcaxcg1e1aXZsFei6dp9eGkljCmoRYF47LgllnG4lUpi6cwwOvBS4YiZk',
            badge: 'Luxury',
            badgeClass: 'bg-primary-fixed text-on-primary-fixed',
            icon1: 'history_edu', text1: 'Colosseum', icon2: 'local_pizza', text2: 'Trastevere'
          }
        ].map((trip, i) => (
          <div key={i} className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-[0px_12px_32px_rgba(25,28,30,0.06)] transition-all cursor-pointer">
            <div className="relative h-64 overflow-hidden">
              <img src={trip.img} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className={`absolute top-4 right-4 ${trip.badgeClass} px-3 py-1 rounded-full text-xs font-bold font-label uppercase`}>
                {trip.badge}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold text-on-surface">{trip.title}</h4>
                <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">{trip.date}</span>
              </div>
              <p className="text-sm text-on-surface-variant mb-6">{trip.desc}</p>
              <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">{trip.icon1}</span>{trip.text1}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">{trip.icon2}</span>{trip.text2}</span>
              </div>
            </div>
          </div>
        ))}
        {/* Add New Trip Skeleton */}
        <div className="group border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-8 hover:bg-surface-container-low transition-all cursor-pointer h-full min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">add_circle</span>
          </div>
          <h4 className="text-xl font-bold text-on-surface mb-2">Plan a new journey</h4>
          <p className="text-sm text-on-surface-variant text-center max-w-[200px]">Tell us your dream and we'll build the route.</p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl">chat_bubble</span>
      </button>
    </div>
  );
}
