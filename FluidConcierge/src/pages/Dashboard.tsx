import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripApi } from '../services/api';
import { TEST_USER_ID } from '../types/trip';
import type { TripResponse } from '../types/trip';

const STATUS_LABELS: Record<string, string> = {
  DRAFT:      'Nháp',
  GENERATING: 'Đang tạo',
  ACTIVE:     'Hoạt động',
  COMPLETED:  'Hoàn thành',
  CANCELLED:  'Đã hủy',
};

const STATUS_CLASS: Record<string, string> = {
  DRAFT:      'bg-surface-container-highest text-on-surface-variant',
  GENERATING: 'bg-secondary-fixed text-on-secondary-fixed',
  ACTIVE:     'bg-primary-fixed text-on-primary-fixed',
  COMPLETED:  'bg-tertiary-fixed text-on-tertiary-fixed',
  CANCELLED:  'bg-error-container text-on-error-container',
};

const DESTINATION_IMAGES: Record<string, string> = {
  'hội an': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hoi_An_Covered_Bridge.jpg/640px-Hoi_An_Covered_Bridge.jpg',
  'đà lạt': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Da_Lat_panorama.jpg/640px-Da_Lat_panorama.jpg',
  'phú quốc': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Phu_Quoc_island.jpg/640px-Phu_Quoc_island.jpg',
  'hạ long': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ha_Long_Bay_Junk_Boat.jpg/640px-Ha_Long_Bay_Junk_Boat.jpg',
  'đà nẵng': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Da_Nang_City.jpg/640px-Da_Nang_City.jpg',
};

function getImageForDestination(destination: string): string {
  const lower = destination.toLowerCase();
  for (const [key, url] of Object.entries(DESTINATION_IMAGES)) {
    if (lower.includes(key)) return url;
  }
  return `https://lh3.googleusercontent.com/aida-public/AB6AXuBkF-Z9gpc6o79QSRGm32SxyoZBR7JyAbmNWxoTWjCJ1fTz5KVKLRb14R2QA63E3vn1ZYWQdSDmLrYkuewfIVcLNaeMgZ3QaQsEjwT_8sincE_c-7hdsP-qRFb_5CagNcDg8ttX72r-91tertmOLxucSUsyjSaA3nkY-s4jAbdct5jpZLIqLTfdHbxICREIKgzFoevx_2EUIAPHsOe7NapW2-2j6j0si1MNiuB28eDZdWM6LRemZfI-U4fDVrhnSWu24LN8Jy6w6hc`;
}

function calcDays(start: string, end: string): number {
  return Math.abs(new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24) + 1;
}

// ── Skeleton loader ─────────────────────────────────────────────────────────

function TripCardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden animate-pulse">
      <div className="h-64 bg-surface-container-high"></div>
      <div className="p-6 space-y-3">
        <div className="h-5 bg-surface-container-high rounded w-3/4"></div>
        <div className="h-4 bg-surface-container-high rounded w-full"></div>
        <div className="h-4 bg-surface-container-high rounded w-2/3"></div>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<TripResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripApi.getAll(TEST_USER_ID)
      .then(setTrips)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalDays = trips.reduce((sum, t) => sum + calcDays(t.startDate, t.endDate), 0);
  const totalBudget = trips.reduce((sum, t) => sum + Number(t.budget), 0);

  return (
    <div className="pt-8 px-8 pb-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative mb-16 rounded-xl overflow-hidden min-h-[320px] flex items-center p-12 bg-slate-900">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hoi_An_Covered_Bridge.jpg/1280px-Hoi_An_Covered_Bridge.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            Bạn muốn đi đâu <span className="text-primary-container">tiếp theo?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8 font-body">
            Sức mạnh AI sẽ giúp bạn lên kế hoạch chuyến đi hoàn hảo. Từ điểm ẩn đến trải nghiệm cao cấp, để chúng tôi lo từng chi tiết.
          </p>
          <button
            id="btn-create-trip"
            onClick={() => navigate('/plan')}
            className="group flex items-center gap-3 bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-primary/40 hover:scale-105 transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            Tạo chuyến đi mới
          </button>
        </div>
      </section>

      {/* Stats & Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-low p-6 rounded-xl border border-transparent hover:bg-surface-container transition-colors">
            <p className="text-sm font-label text-on-surface-variant font-semibold uppercase tracking-wider mb-2">Tổng chuyến đi</p>
            <h3 className="text-4xl font-bold text-on-surface">{loading ? '—' : trips.length}</h3>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border border-transparent hover:bg-surface-container transition-colors">
            <p className="text-sm font-label text-on-surface-variant font-semibold uppercase tracking-wider mb-2">Tổng số ngày</p>
            <h3 className="text-4xl font-bold text-on-surface">{loading ? '—' : Math.round(totalDays)}</h3>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border border-transparent hover:bg-surface-container transition-colors">
            <p className="text-sm font-label text-on-surface-variant font-semibold uppercase tracking-wider mb-2">Ngân sách tổng</p>
            <h3 className="text-4xl font-bold text-primary">
              {loading ? '—' : new Intl.NumberFormat('vi-VN', { notation: 'compact', maximumFractionDigits: 1 }).format(totalBudget * 25000) + 'đ'}
            </h3>
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
        {loading ? (
          [1, 2, 3].map(i => <TripCardSkeleton key={i} />)
        ) : (
          <>
            {trips.map(trip => (
              <div
                key={trip.id}
                onClick={() => navigate(`/itinerary/${trip.id}`)}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-[0px_12px_32px_rgba(25,28,30,0.06)] transition-all cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getImageForDestination(trip.destination)}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x480?text=' + encodeURIComponent(trip.destination); }}
                  />
                  <div className={`absolute top-4 right-4 ${STATUS_CLASS[trip.status] ?? STATUS_CLASS.DRAFT} px-3 py-1 rounded-full text-xs font-bold font-label uppercase`}>
                    {STATUS_LABELS[trip.status] ?? trip.status}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-on-surface">{trip.title}</h4>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                      {new Date(trip.startDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-6">{trip.destination}</p>
                  <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {Math.round(calcDays(trip.startDate, trip.endDate))} ngày
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">payments</span>
                      {new Intl.NumberFormat('vi-VN', { notation: 'compact', maximumFractionDigits: 0 }).format(Number(trip.budget) * 25000)}đ
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Add New Trip Skeleton */}
        <div
          onClick={() => navigate('/plan')}
          className="group border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-8 hover:bg-surface-container-low transition-all cursor-pointer h-full min-h-[400px]"
        >
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">add_circle</span>
          </div>
          <h4 className="text-xl font-bold text-on-surface mb-2">Lên kế hoạch mới</h4>
          <p className="text-sm text-on-surface-variant text-center max-w-[200px]">Chia sẻ ước mơ của bạn và AI sẽ lên lộ trình.</p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/plan')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <span className="material-symbols-outlined text-2xl">chat_bubble</span>
      </button>
    </div>
  );
}
