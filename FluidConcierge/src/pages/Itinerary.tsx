import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripApi, itineraryApi, activityApi } from '../services/api';
import type { TripResponse, ItineraryResponse, ActivityResponse } from '../types/trip';
import EditActivityModal from '../components/EditActivityModal';

const CATEGORY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  default: { bg: 'bg-primary-fixed', text: 'text-on-primary-fixed', label: 'Hoạt động' },
  food: { bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed', label: 'Ẩm thực' },
  sightseeing: { bg: 'bg-primary-fixed', text: 'text-on-primary-fixed', label: 'Tham quan' },
  nature: { bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed', label: 'Thiên nhiên' },
};

function formatTime(timeStr: string | null | undefined): string {
  if (!timeStr) return '';
  return timeStr.substring(0, 5); // "HH:mm:ss" → "HH:mm"
}

function formatCurrency(amount: number): string {
  if (amount === 0) return 'Miễn phí';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' });
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ActivityCard({ activity, onEdit, onDelete }: {
  activity: ActivityResponse;
  onEdit: (activity: ActivityResponse) => void;
  onDelete: (activityId: string) => void;
}) {
  const style = CATEGORY_STYLES.default;
  return (
    <div className="relative group">
      <div className="absolute -left-[1.375rem] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-white dark:ring-slate-900"></div>
      <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low transition-all">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                {formatTime(activity.startTime)}
                {activity.endTime ? ` – ${formatTime(activity.endTime)}` : ''}
              </span>
              <div className={`${style.bg} px-3 py-1 rounded-full`}>
                <span className={`text-[10px] font-bold ${style.text} uppercase tracking-wider`}>{style.label}</span>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-on-surface mt-1">{activity.name}</h4>
            {activity.description && (
              <p className="text-sm text-on-surface-variant line-clamp-2 mt-1">{activity.description}</p>
            )}
            {activity.location && (
              <p className="text-xs text-outline mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">location_on</span>
                {activity.location}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-bold text-on-surface">{formatCurrency(activity.cost)}</span>
          </div>
        </div>
      </div>

      {/* Action buttons below card (show on hover) */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onEdit(activity)}
          className="p-2 bg-primary text-white rounded-lg hover:scale-105 cursor-pointer transition-all shadow-md"
          title="Chỉnh sửa"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          className="p-2 bg-error text-white rounded-lg hover:scale-105 cursor-pointer transition-all shadow-md"
          title="Xóa"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
        </button>
      </div>
    </div>
  );
}

function DaySection({ itinerary, isFirst, onAddActivity, onRegenerateDay, onEditActivity, onDeleteActivity }: {
  itinerary: ItineraryResponse;
  isFirst: boolean;
  onAddActivity: (itineraryId: string) => void;
  onRegenerateDay: (itineraryId: string) => void;
  onEditActivity: (activity: ActivityResponse) => void;
  onDeleteActivity: (activityId: string, itineraryId: string) => void;
}) {
  const [expanded, setExpanded] = useState(isFirst);
  const dayTotal = itinerary.activities.reduce((s, a) => s + (a.cost || 0), 0);

  return (
    <section className={`rounded-xl p-8 shadow-sm ${expanded ? 'bg-surface-container-lowest' : 'bg-surface-container-low border border-outline-variant/10'}`}>
      <button
        className="w-full flex items-center justify-between mb-0 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-4">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${expanded ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant'}`}>
            {String(itinerary.dayNumber).padStart(2, '0')}
          </div>
          <div>
            <h3 className={`text-xl font-headline font-semibold ${expanded ? 'text-on-surface' : 'text-on-surface/60'}`}>
              {itinerary.summary || `Ngày ${itinerary.dayNumber}`}
            </h3>
            <p className={`text-sm ${expanded ? 'text-on-surface-variant' : 'text-on-surface-variant/60'}`}>
              {formatDate(itinerary.date)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!expanded && dayTotal > 0 && (
            <span className="text-sm font-semibold text-on-surface-variant">{formatCurrency(dayTotal)}</span>
          )}
          <span className="material-symbols-outlined text-on-surface-variant">
            {expanded ? 'expand_less' : 'expand_more'}
          </span>
        </div>
      </button>

      {expanded && (
        <>
          <div className="relative pl-6 space-y-10 mt-8 before:content-[''] before:absolute before:left-[1.375rem] before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
            {itinerary.activities.length === 0 ? (
              <p className="text-sm text-on-surface-variant italic">Chưa có hoạt động nào được lên kế hoạch.</p>
            ) : (
              [...itinerary.activities]
                .sort((a, b) => (a.activityOrder ?? 0) - (b.activityOrder ?? 0))
                .map(activity => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onEdit={onEditActivity}
                    onDelete={(activityId) => onDeleteActivity(activityId, itinerary.id)}
                  />
                ))
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => onAddActivity(itinerary.id)}
              className="flex-1 py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary font-semibold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Thêm hoạt động
            </button>
            <button
              onClick={() => onRegenerateDay(itinerary.id)}
              className="px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">refresh</span>
              Tạo lại ngày này
            </button>
          </div>
        </>
      )}
    </section>
  );
}

// ── Loading skeleton ────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="p-8 min-h-[calc(100vh-64px)] animate-pulse">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="h-10 bg-surface-container-high rounded-xl w-64"></div>
        <div className="h-6 bg-surface-container-high rounded-xl w-96"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-surface-container-low rounded-xl"></div>
            ))}
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="h-48 bg-surface-container-low rounded-xl"></div>
            <div className="h-64 bg-surface-container-low rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Generating state overlay ────────────────────────────────────────────────

function GeneratingOverlay() {
  return (
    <div className="p-8 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-primary-container border-t-primary animate-spin"></div>
        <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-on-surface">AI đang lên kế hoạch...</h2>
        <p className="text-on-surface-variant">Đang phân tích điểm đến và tạo lịch trình tối ưu</p>
      </div>
      <div className="flex gap-2">
        {['Nghiên cứu địa điểm', 'Tối ưu lộ trình', 'Tính toán ngân sách'].map((step, i) => (
          <span key={i} className="text-xs bg-surface-container px-3 py-1 rounded-full text-on-surface-variant animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function Itinerary() {
  const { id: tripId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<TripResponse | null>(null);
  const [itineraries, setItineraries] = useState<ItineraryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit modal state
  const [editingActivity, setEditingActivity] = useState<ActivityResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItineraryId, setCurrentItineraryId] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) return;
    let interval: ReturnType<typeof setInterval>;

    const fetchData = async () => {
      try {
        const [tripData, itineraryData] = await Promise.all([
          tripApi.getById(tripId),
          itineraryApi.getByTrip(tripId),
        ]);
        setTrip(tripData);
        setItineraries(itineraryData);

        // Poll while still GENERATING
        if (tripData.status === 'GENERATING') {
          interval = setInterval(async () => {
            const refreshed = await tripApi.getById(tripId);
            setTrip(refreshed);
            if (refreshed.status !== 'GENERATING') {
              clearInterval(interval);
              const freshItineraries = await itineraryApi.getByTrip(tripId);
              setItineraries(freshItineraries);
            }
          }, 3000);
        }
      } catch {
        setError('Không thể tải dữ liệu lịch trình. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => clearInterval(interval);
  }, [tripId]);

  // Warn user if they try to leave while generating
  useEffect(() => {
    const isGeneratingState = trip?.status === 'GENERATING' || isRegenerating;
    if (!isGeneratingState) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [trip?.status, isRegenerating]);

  const handleRegenerate = async () => {
    if (!tripId) return;
    setIsRegenerating(true);
    try {
      await tripApi.regenerate(tripId, { feedback: 'Vui lòng tạo lại lịch trình với gợi ý mới.', language: 'Vietnamese' });
      const freshItineraries = await itineraryApi.getByTrip(tripId);
      setItineraries(freshItineraries);
    } catch {
      setError('Không thể tạo lại lịch trình.');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleEditActivity = (activity: ActivityResponse) => {
    setEditingActivity(activity);
    setIsEditModalOpen(true);
  };

  const handleAddActivity = (itineraryId: string) => {
    setCurrentItineraryId(itineraryId);
    setEditingActivity(null);
    setIsEditModalOpen(true);
  };

  const handleDeleteActivity = async (activityId: string, itineraryId: string) => {
    if (!confirm('Bạn có chắc muốn xóa hoạt động này?')) return;
    try {
      await activityApi.delete(itineraryId, activityId);
      const freshItineraries = await itineraryApi.getByTrip(tripId!);
      setItineraries(freshItineraries);
    } catch {
      setError('Không thể xóa hoạt động.');
    }
  };

  const handleSaveActivity = async () => {
    if (!tripId) return;
    const freshItineraries = await itineraryApi.getByTrip(tripId);
    setItineraries(freshItineraries);
    setIsEditModalOpen(false);
  };

  const handleRegenerateDay = async (itineraryId: string) => {
    if (!confirm('Tạo lại ngày này? Các hoạt động hiện tại sẽ bị thay thế.')) return;
    if (!tripId) return;
    try {
      await itineraryApi.regenerateDay(tripId, itineraryId, { language: 'Vietnamese' });
      const freshItineraries = await itineraryApi.getByTrip(tripId);
      setItineraries(freshItineraries);
    } catch {
      setError('Không thể tạo lại ngày này.');
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (trip?.status === 'GENERATING') return <GeneratingOverlay />;

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-6">
        <span className="material-symbols-outlined text-6xl text-error">error</span>
        <p className="text-on-surface-variant text-center">{error}</p>
        <div className="flex gap-4">
          <button onClick={() => window.location.reload()} className="px-6 py-3 bg-surface-container-high text-on-surface rounded-full font-bold hover:bg-surface-container-highest transition-colors">
            Thử lại
          </button>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors">
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (!trip) return null;

  const sortedItineraries = [...itineraries].sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <div className="p-8 min-h-[calc(100vh-64px)] bg-[#f7f9fb] dark:bg-background">
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
            <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Chuyến đi của tôi</button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-medium text-primary">{trip.destination}</span>
          </nav>
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
            Chuyến đi {trip.destination}
          </h1>
          <div className="flex items-center gap-6 mt-4 flex-wrap">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sky-600">calendar_today</span>
              <span className="font-medium">{new Date(trip.startDate).toLocaleDateString('vi-VN')} – {new Date(trip.endDate).toLocaleDateString('vi-VN')}</span>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${trip.status === 'ACTIVE' ? 'bg-secondary-fixed text-on-secondary-fixed' :
                trip.status === 'COMPLETED' ? 'bg-primary-fixed text-on-primary-fixed' :
                  'bg-surface-container-highest text-on-surface-variant'
              }`}>
              {trip.status === 'ACTIVE' ? 'Đang hoạt động' : trip.status === 'COMPLETED' ? 'Hoàn thành' : trip.status}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-lowest text-on-surface font-semibold rounded-full border border-outline-variant/15 hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined">share</span>
            Chia sẻ
          </button>
          <button
            id="btn-regenerate"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isRegenerating ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined">auto_awesome</span>
            )}
            {isRegenerating ? 'Đang tạo lại...' : 'Tạo lại'}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Daily Timeline */}
        <div className="lg:col-span-7 space-y-8">
          {sortedItineraries.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-xl p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4 block">hourglass_empty</span>
              <p className="text-on-surface-variant">Lịch trình đang được tạo, vui lòng đợi...</p>
            </div>
          ) : (
            sortedItineraries.map((itinerary, idx) => (
              <DaySection
                key={itinerary.id}
                itinerary={itinerary}
                isFirst={idx === 0}
                onAddActivity={handleAddActivity}
                onRegenerateDay={handleRegenerateDay}
                onEditActivity={handleEditActivity}
                onDeleteActivity={handleDeleteActivity}
              />
            ))
          )}
        </div>

        {/* Right Column: Stats */}
        <div className="lg:col-span-5 space-y-8">
          {/* Stats Summary */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-headline font-semibold text-on-surface mb-6">Thông tin</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Hoạt động</span>
                <p className="text-lg font-bold text-on-surface mt-1">{itineraries.flatMap(i => i.activities).length} địa điểm</p>
              </div>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="bg-gradient-to-br from-secondary/10 to-primary/5 rounded-xl p-8 border border-primary/10 relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-white/90 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Gợi ý AI</span>
              <h4 className="text-lg font-headline font-bold text-on-surface mb-2">Muốn thay đổi gì không?</h4>
              <p className="text-sm text-on-surface-variant mb-6">Nhấn "Tạo lại" để AI tạo một lịch trình mới cho cùng chuyến đi này.</p>
              <button
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="px-6 py-2 bg-primary text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-70"
              >
                {isRegenerating ? 'Đang tạo...' : 'Tạo lại ngay'}
              </button>
            </div>
            <span
              className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-primary/5 rotate-12"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >lightbulb</span>
          </div>
        </div>
      </div>

      {/* Edit Activity Modal */}
      <EditActivityModal
        activity={editingActivity}
        itineraryId={currentItineraryId || ''}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveActivity}
      />
    </div>
  );
}
