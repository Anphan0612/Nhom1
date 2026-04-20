import React from 'react';
import { motion } from 'framer-motion';
import type { ExploreItem } from '../../services/api';
import TagBadge from './TagBadge';

interface ExploreCardProps {
  item: ExploreItem;
  onPlan: (item: ExploreItem) => void;
}

const ExploreCard: React.FC<ExploreCardProps> = ({ item, onPlan }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-outline-variant/10 h-full flex flex-col"
    >
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <TagBadge label={item.type} variant="glass" />
        </div>
        
        {/* Popularity score if high */}
        {item.popularityScore >= 9.5 && (
          <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-1.5 shadow-lg">
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">{item.destination}</span>
          <h3 className="text-white text-xl font-bold line-clamp-1">{item.title}</h3>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
            <TagBadge key={tag} label={tag} variant="secondary" />
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">Ngân sách</span>
            <span className="text-sm font-bold text-on-surface">
              {item.minBudget.toLocaleString()} - {item.maxBudget.toLocaleString()} <span className="text-[10px]">VND</span>
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">Thời gian</span>
            <div className="flex items-center gap-1 text-sm font-bold text-on-surface">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {item.durationDays} ngày
            </div>
          </div>
        </div>

        <button
          onClick={() => onPlan(item)}
          className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-2 group-hover:gap-3"
        >
          Lên kế hoạch ngay
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ExploreCard;
