export default function Itinerary() {
  return (
    <div className="p-8 min-h-[calc(100vh-64px)] bg-[#f7f9fb] dark:bg-background">
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
            <span>My Trips</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-medium text-primary">Tokyo</span>
          </nav>
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">3 Days in Tokyo</h1>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sky-600">calendar_today</span>
              <span className="font-medium">Oct 12 - Oct 15</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sky-600">payments</span>
              <span className="font-medium">Est. Cost: $1,250</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-lowest text-on-surface font-semibold rounded-full border border-outline-variant/15 hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined">share</span>
            Share
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
            <span className="material-symbols-outlined">edit</span>
            Edit Plan
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Daily Timeline */}
        <div className="lg:col-span-7 space-y-8">
          {/* Day 1 Accordion */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">01</div>
                <div>
                  <h3 className="text-xl font-headline font-semibold text-on-surface">Arrival & Tradition</h3>
                  <p className="text-on-surface-variant text-sm">October 12, Sunday</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">expand_less</span>
            </div>

            {/* Place Cards List */}
            <div className="relative pl-6 space-y-10 before:content-[''] before:absolute before:left-[1.375rem] before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
              {/* Place 1 */}
              <div className="relative group">
                <div className="absolute -left-[1.375rem] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-white dark:ring-slate-900"></div>
                <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low transition-all">
                  <div className="w-full sm:w-40 h-32 rounded-lg overflow-hidden shrink-0">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVZ8Tg1uKIACSeinO3CUQM2eAeld3HqqMxLjAHh6g4OoTIQMuiwOFzd15WdtCZ_wh0HlPrNVPZw7slZhNqzvPKVynyKp5GVQT0lgH0Xo4Fyo3p8NAANMG-2U8fsuVK8dvpvWO06fmjJx62rJ8Wxwc5saFd22-pbFdIdChZpWx-dpJ2qz7D3Bnn8luZRxB6mzw98r8Xg-RJhjb-_B4LRz-KBSHRXYp2b-q1cfeWsy5Lxf0cp3MnWAqAZF2P28jvh__y52Ad7DvR5gw" alt="Tsukiji Outer Market" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">9:00 AM</span>
                        <div className="bg-tertiary-fixed px-3 py-1 rounded-full">
                          <span className="text-[10px] font-bold text-on-tertiary-fixed uppercase tracking-wider">Food</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-on-surface mt-1">Tsukiji Outer Market</h4>
                      <p className="text-sm text-on-surface-variant line-clamp-2 mt-1">Savor the freshest sushi breakfast and explore hundreds of seafood stalls.</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-bold text-on-surface">$45.00</span>
                      <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                        <span className="material-symbols-outlined text-sm">sync</span>
                        Swap
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Place 2 */}
              <div className="relative group">
                <div className="absolute -left-[1.375rem] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-white dark:ring-slate-900"></div>
                <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low transition-all">
                  <div className="w-full sm:w-40 h-32 rounded-lg overflow-hidden shrink-0">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdEsQY1KmtDVE3klxrQx29o-qIFnTBU0Au5Zpz8BnYBJnknJaCaIbikTVwq7oqeQUEO2fIMtdZsn28M8TpGv5qmMHHY15YQalEca9snttve3HV6YORbaVnQwPZ6GxCa1qEAehGtGsDtkAxbs3iWGwzRAeQRWmT5Jjxa7hEwlWT2Yl6PA8vyp5QrvwvzaIDQZkqy5x0827VVss1OPE9jxVTMoh3lEIEJ6jLeFpvMcHUYjkiG1BpsJluNpCWvGe0XZWXZ5cOIVm5Geo" alt="Senso-ji Temple" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">1:30 PM</span>
                        <div className="bg-primary-fixed px-3 py-1 rounded-full">
                          <span className="text-[10px] font-bold text-on-primary-fixed uppercase tracking-wider">Sightseeing</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-on-surface mt-1">Senso-ji Temple</h4>
                      <p className="text-sm text-on-surface-variant line-clamp-2 mt-1">Tokyo's oldest temple. Walk through the Kaminarimon Gate and Nakamise street.</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-bold text-on-surface">Free</span>
                      <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                        <span className="material-symbols-outlined text-sm">sync</span>
                        Swap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Day 2 */}
          <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold text-lg">02</div>
                <div>
                  <h3 className="text-xl font-headline font-semibold text-on-surface/60">Modern Marvels & Neon</h3>
                  <p className="text-on-surface-variant/60 text-sm">October 13, Monday</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
            </div>
          </section>

          {/* Day 3 */}
          <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold text-lg">03</div>
                <div>
                  <h3 className="text-xl font-headline font-semibold text-on-surface/60">Park Serenity & Farewell</h3>
                  <p className="text-on-surface-variant/60 text-sm">October 14, Tuesday</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
            </div>
          </section>
        </div>

        {/* Right Column: Tools */}
        <div className="lg:col-span-5 space-y-8">
          {/* Budget Health */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-headline font-semibold text-on-surface mb-6">Budget Health</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-on-surface-variant">Total Spent</span>
                  <span className="text-lg font-bold text-on-surface">$842 <span className="text-sm font-normal text-on-surface-variant">/ $1,250</span></span>
                </div>
                <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[67%] rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Transport</span>
                  <p className="text-lg font-bold text-on-surface mt-1">$120</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Activities</span>
                  <p className="text-lg font-bold text-on-surface mt-1">$450</p>
                </div>
              </div>
              <button className="w-full py-3 text-primary font-semibold border-2 border-primary/20 rounded-full hover:bg-primary/5 transition-all">
                View Detailed Receipt
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-headline font-semibold text-on-surface">Route Overview</h3>
            </div>
            <div className="h-64 bg-surface-container-low relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaQuC6mEvllsi4vMeVG2oMG4uITNepnasEpsctWC-K4JayAjWqTKxV_n1AgNqS8N9mP82K1-T68-9EgvmWK5orOC8TxHBGSXsHNI4glsS3zv0YZn3R_fSFGrTdELsx9Re9cTaIE3FxugRbUoS66JYsgWSZW_jgSoSqUwcdYAHkLL1_E4eYmW10-t1pkNrz9OTcm2KboS4956tiNw9uLxTTdJ6HNprJqTdd3GRgenCzfOFgiJDkW1TXBorq0EOc7w1ocFzppi0puKk" alt="Map of Tokyo" className="w-full h-full object-cover opacity-60 grayscale" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white shadow-xl ring-4 ring-white animate-pulse">
                    <span className="material-symbols-outlined text-base">location_on</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-surface-container-lowest flex justify-center">
              <button className="text-sm font-bold text-primary flex items-center gap-1">
                Expand Full Map
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="bg-gradient-to-br from-secondary/10 to-primary/5 rounded-xl p-8 border border-primary/10 relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-white/90 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">AI Suggestion</span>
              <h4 className="text-lg font-headline font-bold text-on-surface mb-2">Rain Predicted for Day 2</h4>
              <p className="text-sm text-on-surface-variant mb-6">Should I swap your outdoor Shinjuku Gyoen walk for the TeamLab Planets immersive museum?</p>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-primary text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all">Accept Swap</button>
                <button className="px-6 py-2 bg-white/60 dark:bg-black/60 text-on-surface-variant rounded-full font-bold text-sm transition-all">Dismiss</button>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-primary/5 rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
          </div>
        </div>
      </div>
    </div>
  );
}
