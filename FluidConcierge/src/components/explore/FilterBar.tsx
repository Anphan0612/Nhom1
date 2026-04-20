import React from 'react';

interface FilterBarProps {
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
  duration: number | null;
  onDurationChange: (days: number | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  tags,
  selectedTags,
  onToggleTag,
  onClear,
  duration,
  onDurationChange,
}) => {
  return (
    <div className="bg-surface-container-low p-6 rounded-3xl space-y-8 sticky top-24">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-on-surface tracking-tight">Bộ lọc phong cách</h4>
          {selectedTags.length > 0 && (
            <button onClick={onClear} className="text-[10px] font-bold text-primary uppercase hover:underline">Xóa tất cả</button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-primary text-on-primary border-primary shadow-md shadow-primary/20'
                    : 'bg-surface-container-highest text-on-surface-variant border-transparent hover:border-primary/30'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-outline-variant/30">
        <h4 className="font-bold text-on-surface tracking-tight">Thời gian chuyến đi</h4>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 5].map((d) => (
            <button
              key={d}
              onClick={() => onDurationChange(duration === d ? null : d)}
              className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                duration === d
                  ? 'bg-primary text-on-primary border-primary shadow-md'
                  : 'bg-surface-container-highest text-on-surface-variant border-transparent'
              }`}
            >
              {d === 5 ? '5+ ngày' : `${d} ngày`}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-[10px] text-on-surface-variant leading-relaxed italic">
            * Chọn nhiều phong cách để AI gợi ý chính xác hơn cho riêng bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
