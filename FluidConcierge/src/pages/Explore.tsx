import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { exploreApi } from '../services/api';
import type { ExploreItem } from '../services/api';
import ExploreCard from '../components/explore/ExploreCard';
import FilterBar from '../components/explore/FilterBar';

// Import hero images from src/assets
import dalatImg from '../assets/dalat.jpg';
import danangImg from '../assets/danang.jpg';
import halongImg from '../assets/halong.jpg';
import sapaImg from '../assets/sapa.jpg';

const ALL_TAGS = ['Chill', 'Nature', 'Thư giãn', 'Adventure', 'Phiêu lưu', 'Luxury', 'Beach', 'Family', 'Modern', 'Văn hóa', 'History', 'Food', 'Ẩm thực'];

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState<ExploreItem[]>([]);
  const [trending, setTrending] = useState<ExploreItem[]>([]);
  const [allItems, setAllItems] = useState<ExploreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentHeroBg, setCurrentHeroBg] = useState(0);

  const HERO_BGS = [
    '/assets/explore/hanoi_culture.png',
    danangImg,
    '/assets/explore/phuquoc_luxury.png',
    dalatImg,
    halongImg,
    sapaImg,
    '/assets/explore/danang_modern.png',
    '/assets/explore/dalat_adventure.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroBg((prev) => (prev + 1) % HERO_BGS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [recRes, trendRes, allRes] = await Promise.all([
          exploreApi.getRecommendations(),
          exploreApi.getTrending(),
          exploreApi.getAll({ page: 0, size: 50 })
        ]);
        setRecommended(recRes);
        setTrending(trendRes);
        setAllItems(allRes.content);
      } catch (error) {
        console.error('Failed to fetch explore data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlan = (item: ExploreItem) => {
    navigate('/plan', {
      state: {
        destination: item.destination,
        durationDays: item.durationDays,
        tags: item.tags,
        budget: item.maxBudget
      }
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.destination.toLowerCase().includes(search.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(t => item.tags.includes(t));
    const matchesDuration = !duration || item.durationDays === duration;
    return matchesSearch && matchesTags && matchesDuration;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <div className="pt-32 pb-48 px-6 relative overflow-hidden bg-emerald-950">
        {/* Animated Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[100%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[80%] bg-teal-400/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroBg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: `url(${HERO_BGS[currentHeroBg]})` }}
          />
        </AnimatePresence>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-background" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-md"
          >
            <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em]">AI-Powered Travel Planner</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 font-display leading-[1.1]"
          >
            Hành trình mới, <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Cảm hứng mới.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-emerald-100/70 text-lg md:text-2xl max-w-2xl mx-auto font-sans font-medium mb-12"
          >
            Tìm nguồn cảm hứng từ những trải nghiệm độc đáo, được cá nhân hóa bởi trí tuệ nhân tạo.
          </motion.p>
          
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 group-hover:text-emerald-400 transition-colors text-2xl">search</span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && search.trim()) {
                    navigate('/plan', { state: { destination: search.trim() } });
                  }
                }}
                placeholder="Khám phá điểm đến (vd: Đà Lạt, Phú Quốc...)"
                className="w-full pl-16 pr-8 py-7 rounded-[2rem] bg-white text-xl shadow-2xl focus:ring-0 transition-all outline-none text-emerald-950 font-sans font-bold placeholder:text-emerald-900/30"
              />
              <button 
                onClick={() => search.trim() && navigate('/plan', { state: { destination: search.trim() } })}
                className="absolute right-3 top-3 bottom-3 px-8 bg-emerald-900 text-emerald-50 rounded-2xl font-black text-sm hover:bg-emerald-800 transition-colors active:scale-95"
              >
                Bắt đầu
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <FilterBar 
          tags={ALL_TAGS}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          onClear={() => setSelectedTags([])}
          duration={duration}
          onDurationChange={setDuration}
        />

        <div className="mt-16 space-y-16">
          {/* Recommended Section */}
          {recommended.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h2 className="text-2xl font-bold text-text">Dành riêng cho bạn</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommended.map(item => (
                  <ExploreCard key={item.id} item={item} onPlan={() => handlePlan(item)} />
                ))}
              </div>
            </section>
          )}

          {/* Trending Section */}
          {trending.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary">trending_up</span>
                <h2 className="text-2xl font-bold text-text">Xu hướng hiện nay</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trending.map(item => (
                  <ExploreCard key={item.id} item={item} onPlan={() => handlePlan(item)} />
                ))}
              </div>
            </section>
          )}

          {/* All Items Grid */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary">grid_view</span>
              <h2 className="text-2xl font-bold text-text">Tất cả hành trình</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode='popLayout'>
                {filteredItems.map(item => (
                  <ExploreCard key={item.id} item={item} onPlan={() => handlePlan(item)} />
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Explore;

