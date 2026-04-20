import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { exploreApi } from '../services/api';
import type { ExploreItem } from '../services/api';
import ExploreCard from '../components/explore/ExploreCard';
import FilterBar from '../components/explore/FilterBar';

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
    <div className="min-h-screen bg-surface-container-lowest pb-24">
      {/* Hero Header */}
      <div className="bg-primary pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6"
          >
            Khám phá hành trình tiếp theo
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Tìm nguồn cảm hứng từ những trải nghiệm độc đáo khắp Việt Nam, được cá nhân hóa riêng cho bạn bởi AI.
          </motion.p>
          
          <div className="mt-12 max-w-3xl mx-auto relative group">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline group-hover:text-primary transition-colors">search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Bạn muốn đi đâu hoặc làm gì? (vd: Phú Quốc, Beach...)"
              className="w-full pl-16 pr-8 py-6 rounded-full bg-white text-lg shadow-2xl focus:ring-4 focus:ring-white/20 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3">
            <FilterBar
              tags={ALL_TAGS}
              selectedTags={selectedTags}
              onToggleTag={toggleTag}
              onClear={() => setSelectedTags([])}
              duration={duration}
              onDurationChange={setDuration}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            {/* Recommended Section */}
            {recommended.length > 0 && selectedTags.length === 0 && !search && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <h2 className="text-2xl font-bold text-on-surface">Dành riêng cho bạn</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommended.map(item => (
                    <ExploreCard key={item.id} item={item} onPlan={handlePlan} />
                  ))}
                </div>
              </section>
            )}

            {/* Trending Section */}
            {trending.length > 0 && selectedTags.length === 0 && !search && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                  <h2 className="text-2xl font-bold text-on-surface">Đang thịnh hành</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trending.map(item => (
                    <ExploreCard key={item.id} item={item} onPlan={handlePlan} />
                  ))}
                </div>
              </section>
            )}

            {/* All Items Section */}
            <section className="space-y-6 pb-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-on-surface">Tất cả trải nghiệm</h2>
                </div>
                <span className="text-xs font-bold text-outline-variant uppercase">{filteredItems.length} kết quả</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExploreCard item={item} onPlan={handlePlan} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredItems.length === 0 && (
                <div className="py-20 text-center">
                  <span className="material-symbols-outlined text-outline-variant text-6xl mb-4">search_off</span>
                  <p className="text-on-surface-variant font-medium">Không tìm thấy trải nghiệm nào phù hợp. Thử xóa bộ lọc nhé!</p>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Explore;
