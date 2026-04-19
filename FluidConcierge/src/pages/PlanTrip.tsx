import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripApi, aiApi } from '../services/api';
import { TEST_USER_ID, BUDGET_VALUES } from '../types/trip';

type BudgetSlider = 1 | 2 | 3;
type TravelStyle = 'Ẩm thực' | 'Thư giãn' | 'Phiêu lưu' | 'Văn hóa' | 'Mua sắm' | 'Về đêm';

const BUDGET_MAP: Record<BudgetSlider, keyof typeof BUDGET_VALUES> = {
  1: 'budget',
  2: 'standard',
  3: 'luxury',
};

const BUDGET_LABELS: Record<BudgetSlider, string> = {
  1: 'Tiết kiệm',
  2: 'Tiêu chuẩn',
  3: 'Cao cấp',
};

const STYLE_OPTIONS: { icon: string; text: TravelStyle; bgClass: string }[] = [
  { icon: 'restaurant', text: 'Ẩm thực', bgClass: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  { icon: 'nature_people', text: 'Thư giãn', bgClass: 'bg-secondary-fixed text-on-secondary-fixed' },
  { icon: 'hiking', text: 'Phiêu lưu', bgClass: 'bg-primary-fixed text-on-primary-fixed' },
  { icon: 'museum', text: 'Văn hóa', bgClass: 'bg-surface-container-highest text-on-surface' },
  { icon: 'shopping_bag', text: 'Mua sắm', bgClass: 'bg-surface-container-highest text-on-surface' },
  { icon: 'nightlife', text: 'Về đêm', bgClass: 'bg-surface-container-highest text-on-surface' },
];

const VN_DESTINATIONS = ['Hội An', 'Đà Lạt', 'Phú Quốc', 'Hạ Long', 'Đà Nẵng', 'Hà Nội', 'Sapa'];

export default function PlanTrip() {
  const navigate = useNavigate();

  // Form state
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budgetSlider, setBudgetSlider] = useState<BudgetSlider>(2);
  const [travelers, setTravelers] = useState(2);
  const [selectedStyles, setSelectedStyles] = useState<TravelStyle[]>(['Thư giãn']);

  // AI Assist state
  const [aiDescription, setAiDescription] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAiParse = async () => {
    if (!aiDescription.trim()) return;
    setIsParsing(true);
    setError(null);
    try {
      const result = await aiApi.parseTrip(aiDescription);
      
      if (result.destination) setDestination(result.destination);
      if (result.startDate) setStartDate(result.startDate);
      if (result.endDate) setEndDate(result.endDate);
      if (result.travelers) setTravelers(result.travelers);
      
      if (result.budgetTier) {
        if (result.budgetTier === 'budget') setBudgetSlider(1);
        else if (result.budgetTier === 'standard') setBudgetSlider(2);
        else if (result.budgetTier === 'luxury') setBudgetSlider(3);
      }

      if (result.travelStyles && result.travelStyles.length > 0) {
        setSelectedStyles(result.travelStyles as TravelStyle[]);
      }
    } catch (err: unknown) {
      setError('Không thể phân tích mô tả của bạn. Thử lại sau nhé.');
    } finally {
      setIsParsing(false);
    }
  };

  const toggleStyle = (style: TravelStyle) => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const buildPreferences = () => {
    const parts: string[] = [];
    if (origin) parts.push(`Khởi hành từ: ${origin}`);
    parts.push(`Số người: ${travelers}`);
    if (selectedStyles.length > 0) parts.push(`Phong cách: ${selectedStyles.join(', ')}`);
    return parts.join('. ');
  };

  const handleGenerate = async () => {
    if (!destination || !startDate || !endDate) {
      setError('Vui lòng điền đầy đủ điểm đến và ngày đi.');
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setError('Ngày về phải sau ngày đi.');
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const budgetKey = BUDGET_MAP[budgetSlider];
      const budgetValue = BUDGET_VALUES[budgetKey];

      // Step 1: Create trip
      const trip = await tripApi.create({
        userId: TEST_USER_ID,
        title: `${destination} – ${startDate}`,
        destination,
        startDate,
        endDate,
        budget: budgetValue,
      });

      // Step 2: Generate AI itinerary
      await tripApi.generate(trip.id, {
        preferences: buildPreferences(),
      });

      // Step 3: Navigate to itinerary view
      navigate(`/itinerary/${trip.id}`);
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message ?? 'Đã có lỗi xảy ra.'
          : 'Không thể kết nối đến server. Vui lòng kiểm tra backend đang chạy.';
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-8 pb-24 px-4 flex flex-col items-center min-h-[calc(100vh-64px)]">
      {/* Progress Stepper */}
      <div className="w-full max-w-2xl mb-12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold shadow-lg shadow-primary/20">1</div>
            <span className="text-[0.6875rem] font-semibold text-primary uppercase tracking-widest">Cơ bản</span>
          </div>
          <div className="flex-1 h-[2px] bg-primary-container mx-4 mb-6"></div>
          <div className="flex flex-col items-center gap-2 opacity-50">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-bold">2</div>
            <span className="text-[0.6875rem] font-semibold text-on-surface uppercase tracking-widest">Đoàn người</span>
          </div>
          <div className="flex-1 h-[2px] bg-surface-container-highest mx-4 mb-6"></div>
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-bold">3</div>
            <span className="text-[0.6875rem] font-semibold text-on-surface uppercase tracking-widest">Sở thích</span>
          </div>
        </div>
      </div>

      {/* Wizard Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form Area (Left) */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-sm border border-outline-variant/10">
          <section className="space-y-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-on-surface">Bạn muốn đi đâu?</h1>
              <p className="text-on-surface-variant">Cho chúng tôi biết điểm xuất phát và điểm đến mơ ước.</p>
            </div>

            {/* AI Assist Box */}
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Trợ lý AI Điền Form</h3>
              </div>
              <div className="relative">
                <textarea
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  placeholder="Ví dụ: Tôi muốn đi du lịch Đà Lạt 3 ngày vào cuối tuần này với người yêu, mức giá trung bình, thích ăn uống và chụp ảnh..."
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px] resize-none outline-none"
                />
                <button
                  onClick={handleAiParse}
                  disabled={isParsing || !aiDescription.trim()}
                  className="absolute bottom-3 right-3 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
                >
                  {isParsing ? (
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  ) : (
                    <span className="material-symbols-outlined text-sm">send</span>
                  )}
                  {isParsing ? 'Đang phân tích...' : 'Điền nhanh'}
                </button>
              </div>
              <p className="text-[10px] text-on-surface-variant italic">Mô tả kỳ nghỉ của bạn bằng ngôn ngữ tự nhiên, AI sẽ tự động điền các ô phía dưới.</p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="flex items-center gap-3 bg-error-container/20 border border-error/20 text-on-error-container rounded-xl px-4 py-3 text-sm font-medium">
                <span className="material-symbols-outlined text-error">error</span>
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface pl-1">Khởi hành từ</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">my_location</span>
                  <input
                    type="text"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    placeholder="vd. Hồ Chí Minh"
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all placeholder:text-outline/60 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface pl-1">Đến điểm đến <span className="text-error">*</span></label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">explore</span>
                  <input
                    type="text"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    placeholder="vd. Hội An, Việt Nam"
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all placeholder:text-outline/60 outline-none"
                  />
                </div>
                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {VN_DESTINATIONS.slice(0, 4).map(d => (
                    <button
                      key={d}
                      onClick={() => setDestination(d + ', Việt Nam')}
                      className="text-xs px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed hover:opacity-80 transition-opacity font-medium"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface pl-1">Ngày khởi hành <span className="text-error">*</span></label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">calendar_today</span>
                  <input
                    type="date"
                    value={startDate}
                    min={today}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface pl-1">Ngày trở về <span className="text-error">*</span></label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">calendar_month</span>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate || today}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-highest rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-semibold mb-6">Đoàn &amp; Ngân sách</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-on-surface">Mức ngân sách</label>
                    <span className="text-primary font-bold">{BUDGET_LABELS[budgetSlider]}</span>
                  </div>
                  <div className="px-2">
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={budgetSlider}
                      onChange={e => setBudgetSlider(Number(e.target.value) as BudgetSlider)}
                      className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary outline-none"
                    />
                    <div className="flex justify-between mt-4 text-[0.6875rem] font-bold text-outline uppercase tracking-tighter">
                      <span>Tiết kiệm</span>
                      <span>Tiêu chuẩn</span>
                      <span>Cao cấp</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-on-surface">Số người</label>
                  <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl">
                    <button
                      onClick={() => setTravelers(t => Math.max(1, t - 1))}
                      className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold">{travelers}</span>
                      <span className="text-[0.6875rem] text-outline font-medium">Người</span>
                    </div>
                    <button
                      onClick={() => setTravelers(t => Math.min(20, t + 1))}
                      className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-semibold mb-6">Phong cách du lịch</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STYLE_OPTIONS.map(style => {
                  const isSelected = selectedStyles.includes(style.text);
                  return (
                    <button
                      key={style.text}
                      onClick={() => toggleStyle(style.text)}
                      className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all group ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-outline-variant/20 hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${style.bgClass}`}>
                        <span className="material-symbols-outlined">{style.icon}</span>
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'group-hover:text-primary'}`}>
                        {style.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-10 flex flex-col items-center gap-6">
              <button
                id="btn-generate-itinerary"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all group disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isGenerating ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    AI đang lên kế hoạch...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    Tạo Lịch Trình AI
                  </>
                )}
              </button>

              {isGenerating ? (
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
                  </div>
                  <span className="text-xs font-medium tracking-wide uppercase">AI đang phân tích và lên kế hoạch...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-on-surface-variant opacity-60">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span className="text-xs font-medium tracking-wide uppercase">Trợ lý AI sẵn sàng</span>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Contextual Sidebar (Right) */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-surface-container-low rounded-xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-on-surface">Điểm đến nổi bật</h3>
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hoi_An_Covered_Bridge.jpg/1280px-Hoi_An_Covered_Bridge.jpg"
                alt="Hội An"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Đang thịnh hành</span>
                <span className="text-white font-bold text-xl">Hội An, Việt Nam</span>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">verified_user</span>
                <p className="text-sm text-on-surface-variant">Gợi ý cá nhân hóa dựa trên <span className="font-semibold text-on-surface">phong cách của bạn</span>.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">eco</span>
                <p className="text-sm text-on-surface-variant">Ưu tiên phương tiện thân thiện môi trường và trải nghiệm địa phương.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">currency_exchange</span>
                <p className="text-sm text-on-surface-variant">Budget được tính toán phù hợp với giá cả Việt Nam.</p>
              </li>
            </ul>
          </div>

          {/* Help Card */}
          <div className="p-8 bg-surface-container-lowest border border-outline-variant/20 rounded-xl">
            <h4 className="font-bold mb-2">Cần tư vấn thêm?</h4>
            <p className="text-sm text-on-surface-variant mb-6">AI của chúng tôi sẽ giúp bạn tìm những điểm ẩn phù hợp với cá tính.</p>
            <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              Chat với Trợ lý <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
