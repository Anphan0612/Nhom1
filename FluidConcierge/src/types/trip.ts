// Trip status enum matching backend TripStatus
export type TripStatus = 'DRAFT' | 'GENERATING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

// Budget tier for UI slider (maps to budget value)
export type BudgetTier = 'budget' | 'standard' | 'luxury';

export const BUDGET_VALUES: Record<BudgetTier, number> = {
  budget: 2000000,
  standard: 5000000,
  luxury: 15000000,
};

export const BUDGET_LABELS: Record<BudgetTier, string> = {
  budget: 'Tiết kiệm',
  standard: 'Tiêu chuẩn',
  luxury: 'Cao cấp',
};

// Hardcoded test user ID (matching DataSeeder.java)
export const TEST_USER_ID = '11111111-1111-1111-1111-111111111111';

// --- API Response Types (mirrors backend DTOs) ---

export interface TripResponse {
  id: string;
  userId: string;
  title: string;
  destination: string;
  startDate: string; // ISO date string "YYYY-MM-DD"
  endDate: string;
  budget: number;
  status: TripStatus;
  createdAt: string; // ISO datetime string
}

export interface ActivityResponse {
  id: string;
  itineraryId: string;
  name: string;
  description: string;
  location: string;
  startTime: string; // "HH:mm:ss"
  endTime: string;
  cost: number;
  activityOrder: number;
}

export interface ItineraryResponse {
  id: string;
  tripId: string;
  dayNumber: number;
  date: string; // ISO date string
  summary: string;
  activities: ActivityResponse[];
}

export interface GenerateResponse {
  tripId: string;
  aiLogId: number;
  message: string;
}

// --- API Request Types ---

export interface CreateTripRequest {
  userId: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export interface GenerateRequest {
  preferences?: string;
  promptVersion?: string;
  language?: string;
}

export interface RegenerateRequest {
  feedback?: string;
  promptVersion?: string;
  language?: string;
}

export interface ActivityRequest {
  name: string;
  description?: string;
  location?: string;
  startTime: string; // "HH:mm:ss"
  endTime: string;
  cost: number;
  activityOrder: number;
}

export interface ActivityUpdateRequest {
  name?: string;
  description?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  cost?: number;
  activityOrder?: number;
}

