import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { communityApi } from '../services/api';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'ACTIVITY' | 'TRIP';
  refId: string;
  title: string;
  subtitle?: string;
  onSuccess: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  type,
  refId,
  title,
  subtitle,
  onSuccess
}) => {
  const [rating, setRating] = useState<number>(5);
  const [description, setDescription] = useState('');
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const contentObj = type === 'ACTIVITY' 
        ? { description, tip }
        : { description, tip: '' }; // Trip might just need description for now
        
      await communityApi.shareContent({
        type,
        refId,
        rating,
        content: JSON.stringify(contentObj)
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to share:', error);
      alert('Chia sẻ thất bại, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-6"
          >
            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-emerald-100">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 px-8 py-6 border-b border-emerald-100/50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-emerald-500 text-3xl">
                    {type === 'ACTIVITY' ? 'local_activity' : 'flight_takeoff'}
                  </span>
                  <h2 className="text-2xl font-black text-emerald-950 font-display">
                    Chia sẻ {type === 'ACTIVITY' ? 'Trải nghiệm' : 'Chuyến đi'}
                  </h2>
                </div>
                <p className="text-emerald-800 font-medium">{title}</p>
                {subtitle && <p className="text-emerald-600/70 text-sm mt-1">{subtitle}</p>}
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-3">Đánh giá của bạn</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                      >
                        <span 
                          className={`material-symbols-outlined text-4xl ${star <= rating ? 'text-yellow-400' : 'text-slate-200'}`}
                          style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-emerald-900 mb-2">
                    {type === 'ACTIVITY' ? 'Cảm nhận nhanh' : 'Mô tả chuyến đi'}
                  </label>
                  <textarea
                    required
                    rows={type === 'ACTIVITY' ? 2 : 4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={type === 'ACTIVITY' ? "Tuyệt vời, món ăn rất ngon..." : "Chuyến đi 3 ngày 2 đêm cực chill..."}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-emerald-950 placeholder:text-emerald-900/30 resize-none bg-emerald-50/30"
                  />
                </div>

                {type === 'ACTIVITY' && (
                  <div>
                    <label className="block text-sm font-bold text-emerald-900 mb-2">Tips / Kinh nghiệm bỏ túi (Tùy chọn)</label>
                    <input
                      type="text"
                      value={tip}
                      onChange={(e) => setTip(e.target.value)}
                      placeholder="Nên đi vào lúc 5h chiều để ngắm hoàng hôn..."
                      className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-emerald-950 placeholder:text-emerald-900/30 bg-emerald-50/30"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-emerald-50">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-4 rounded-xl font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">send</span>
                        Chia sẻ ngay
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
