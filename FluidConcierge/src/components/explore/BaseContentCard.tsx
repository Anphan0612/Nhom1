import React from 'react';
import { motion } from 'framer-motion';
import type { SharedContentResponse } from '../../types/trip';
import ImageCarousel from './ImageCarousel';

export interface BaseContentCardProps {
  item: SharedContentResponse;
  onUpvote?: (id: string) => void;
  onClick?: (item: SharedContentResponse) => void;
  onImageOpen?: (images: string[], index: number) => void;
  children?: React.ReactNode;
  className?: string;
  imageClassName?: string;
}

const BaseContentCard: React.FC<BaseContentCardProps> = ({
  item,
  onUpvote,
  onClick,
  onImageOpen,
  children,
  className = "",
  imageClassName = "h-40 w-full"
}) => {
  const images = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls : [];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onClick?.(item)}
      className={`bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-100/50 shadow-sm hover:shadow-md transition-all group flex flex-col cursor-pointer ${className}`}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <ImageCarousel 
          images={images} 
          className={imageClassName} 
          onImageClick={(index) => {
            if (onImageOpen) {
              onImageOpen(images, index);
            }
          }}
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Rating and Title Section should be handled in children for maximum flexibility, 
            but common parts like rating badge can be shared if they look identical. */}
        {children}

        <div className="flex-1" />

        {/* Common Footer: User info and Upvote button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-emerald-100/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
              {item.user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-slate-500">{item.user.name}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpvote?.(item.id);
            }}
            className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">stars</span>
            <span className="text-xs font-bold">{item.totalVotes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BaseContentCard;
