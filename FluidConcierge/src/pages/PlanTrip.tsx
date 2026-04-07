export default function PlanTrip() {
  return (
    <div className="pt-8 pb-24 px-4 flex flex-col items-center min-h-[calc(100vh-64px)]">
      {/* Progress Stepper */}
      <div className="w-full max-w-2xl mb-12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold shadow-lg shadow-primary/20">1</div>
            <span className="text-[0.6875rem] font-semibold text-primary uppercase tracking-widest">Basics</span>
          </div>
          <div className="flex-1 h-[2px] bg-primary-container mx-4 mb-6"></div>
          <div className="flex flex-col items-center gap-2 opacity-50">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-bold">2</div>
            <span className="text-[0.6875rem] font-semibold text-on-surface uppercase tracking-widest">Travelers</span>
          </div>
          <div className="flex-1 h-[2px] bg-surface-container-highest mx-4 mb-6"></div>
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-bold">3</div>
            <span className="text-[0.6875rem] font-semibold text-on-surface uppercase tracking-widest">Preferences</span>
          </div>
        </div>
      </div>

      {/* Wizard Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form Area (Left) */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-sm border border-outline-variant/10">
          <section className="space-y-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-on-surface">Where are we going?</h1>
              <p className="text-on-surface-variant">Tell us your starting point and your dream destination.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface pl-1">Starting From</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">my_location</span>
                  <input type="text" placeholder="e.g. London, UK" className="w-full pl-12 pr-4 py-4 bg-surface-container-highest rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all placeholder:text-outline/60 outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface pl-1">To Destination</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">explore</span>
                  <input type="text" placeholder="e.g. Kyoto, Japan" className="w-full pl-12 pr-4 py-4 bg-surface-container-highest rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all placeholder:text-outline/60 outline-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface pl-1">Departure Date</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">calendar_today</span>
                  <input type="date" className="w-full pl-12 pr-4 py-4 bg-surface-container-highest rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface pl-1">Return Date</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">calendar_month</span>
                  <input type="date" className="w-full pl-12 pr-4 py-4 bg-surface-container-highest rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all outline-none" />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-semibold mb-6">Group & Budget</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-on-surface">Budget Level</label>
                    <span className="text-primary font-bold">Standard</span>
                  </div>
                  <div className="px-2">
                    <input type="range" min="1" max="3" defaultValue="2" className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary outline-none" />
                    <div className="flex justify-between mt-4 text-[0.6875rem] font-bold text-outline uppercase tracking-tighter">
                      <span>Budget</span>
                      <span>Standard</span>
                      <span>Luxury</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-on-surface">Travelers</label>
                  <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl">
                    <button className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-105 active:scale-95 transition-all">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold">2</span>
                      <span className="text-[0.6875rem] text-outline font-medium">People</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-105 active:scale-95 transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-semibold mb-6">Travel Style</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: 'restaurant', text: 'Foodie', bgClass: 'bg-tertiary-fixed text-on-tertiary-fixed' },
                  { icon: 'nature_people', text: 'Relaxing', bgClass: 'bg-secondary-fixed text-on-secondary-fixed', selected: true },
                  { icon: 'hiking', text: 'Adventure', bgClass: 'bg-primary-fixed text-on-primary-fixed' },
                  { icon: 'museum', text: 'Culture', bgClass: 'bg-surface-container-highest text-on-surface' },
                  { icon: 'shopping_bag', text: 'Shopping', bgClass: 'bg-surface-container-highest text-on-surface' },
                  { icon: 'nightlife', text: 'Nightlife', bgClass: 'bg-surface-container-highest text-on-surface' },
                ].map((style, i) => (
                  <button key={i} className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all group ${style.selected ? 'border-primary bg-primary/5' : 'border-outline-variant/20 hover:border-primary/50 hover:bg-primary/5'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${style.bgClass}`}>
                      <span className="material-symbols-outlined">{style.icon}</span>
                    </div>
                    <span className={`text-sm font-medium ${style.selected ? 'text-primary' : 'group-hover:text-primary'}`}>{style.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-10 flex flex-col items-center gap-6">
              <button className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all group">
                <span className="material-symbols-outlined animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                Generate AI Itinerary
              </button>
              
              {/* Loading State Indicator */}
              <div className="flex items-center gap-3 text-on-surface-variant opacity-60">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
                </div>
                <span className="text-xs font-medium tracking-wide uppercase">Assistant is standing by...</span>
              </div>
            </div>
          </section>
        </div>

        {/* Contextual Sidebar (Right) */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-surface-container-low rounded-xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-on-surface">Trip Highlights</h3>
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv0LqK4hBB6MGmUSKEVb4jtK_tAxR7LXgAVeDyDLUJ2MfEyiuH10cSkrLdiAK4c7IQXbJne2AfldH0NQ7nQZkpXzjKFAVp9LX5qx03_SMnqMaoIChyxPaQbL7y9erqvMk0HpAViQnGqMpEwNjMESXNarscCaK1Kd4caN9HtBEDC8Hl5KcCUDPdb-PJojE6eYkEKEpQHV0ba4kutjKLQV7L8d_tTtElEOWCsNj1UdiCBqM3xso1VwHuIol1zBULC5Pukkr_bfin6kU" alt="Kyoto temple view" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Trending Destination</span>
                <span className="text-white font-bold text-xl">Kyoto, Japan</span>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">verified_user</span>
                <p className="text-sm text-on-surface-variant">Personalized curation based on <span className="font-semibold text-on-surface">Relaxation</span> preference.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">eco</span>
                <p className="text-sm text-on-surface-variant">Eco-friendly transport options prioritized for city travel.</p>
              </li>
            </ul>
          </div>

          {/* Help Card */}
          <div className="p-8 bg-surface-container-lowest border border-outline-variant/20 rounded-xl">
            <h4 className="font-bold mb-2">Need advice?</h4>
            <p className="text-sm text-on-surface-variant mb-6">Our concierge AI can help you find hidden gems that match your personality.</p>
            <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              Chat with Concierge <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
