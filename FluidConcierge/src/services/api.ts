import axios from 'axios';
import type {
  TripResponse,
  ItineraryResponse,
  GenerateResponse,
  CreateTripRequest,
  GenerateRequest,
  RegenerateRequest,
  ActivityResponse,
  ActivityRequest,
  ActivityUpdateRequest,
} from '../types/trip';

// Base API client pointing at Spring Boot backend
const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s timeout — AI generation can be slow
});

// ── Trip endpoints ──────────────────────────────────────────────────────────

export const tripApi = {
  getAll: (userId: string): Promise<TripResponse[]> =>
    apiClient.get(`/trips/user/${userId}`).then(r => r.data),

  getById: (tripId: string): Promise<TripResponse> =>
    apiClient.get(`/trips/${tripId}`).then(r => r.data),

  create: (body: CreateTripRequest): Promise<TripResponse> =>
    apiClient.post('/trips', body).then(r => r.data),

  generate: (tripId: string, body?: GenerateRequest): Promise<GenerateResponse> =>
    apiClient.post(`/trips/${tripId}/generate`, body ?? {}).then(r => r.data),

  regenerate: (tripId: string, body?: RegenerateRequest): Promise<GenerateResponse> =>
    apiClient.post(`/trips/${tripId}/regenerate`, body ?? {}).then(r => r.data),
};

// ── Itinerary endpoints ─────────────────────────────────────────────────────

export const itineraryApi = {
  getByTrip: (tripId: string): Promise<ItineraryResponse[]> =>
    apiClient.get(`/trips/${tripId}/itineraries`).then(r => r.data),

  regenerateDay: (tripId: string, itineraryId: string, body?: RegenerateRequest): Promise<ItineraryResponse> =>
    apiClient.post(`/trips/${tripId}/itineraries/${itineraryId}/regenerate`, body ?? {}).then(r => r.data),
};

// ── Activity endpoints ──────────────────────────────────────────────────────

export const activityApi = {
  create: (itineraryId: string, body: ActivityRequest): Promise<ActivityResponse> =>
    apiClient.post(`/itineraries/${itineraryId}/activities`, body).then(r => r.data),

  update: (itineraryId: string, activityId: string, body: ActivityUpdateRequest): Promise<ActivityResponse> =>
    apiClient.put(`/itineraries/${itineraryId}/activities/${activityId}`, body).then(r => r.data),

  delete: (itineraryId: string, activityId: string): Promise<void> =>
    apiClient.delete(`/itineraries/${itineraryId}/activities/${activityId}`).then(r => r.data),
};

// ── AI assist endpoints ─────────────────────────────────────────────────────

export interface ParseTripResult {
  destination: string | null;
  startDate: string | null;
  endDate: string | null;
  travelers: number | null;
  budgetTier: 'budget' | 'standard' | 'luxury' | null;
  travelStyles: string[];
  rawSummary: string | null;
}

export const aiApi = {
  parseTrip: (description: string): Promise<ParseTripResult> =>
    apiClient.post('/ai/parse-trip', { description }).then(r => r.data),
};

// ── Explore endpoints ────────────────────────────────────────────────────────

export interface ExploreItem {
  id: string;
  title: string;
  destination: string;
  type: 'PLACE' | 'EXPERIENCE' | 'TEMPLATE';
  tags: string[];
  minBudget: number;
  maxBudget: number;
  durationDays: number;
  thumbnailUrl: string;
  popularityScore: number;
}

export interface ExplorePageResponse {
  content: ExploreItem[];
  totalPages: number;
  totalElements: number;
}

export const exploreApi = {
  getAll: (params: {
    destination?: string;
    minBudget?: number;
    maxBudget?: number;
    durationDays?: number;
    tags?: string[];
    page?: number;
    size?: number;
  }): Promise<ExplorePageResponse> =>
    apiClient.get('/explore', { params }).then(r => r.data),

  getTrending: (): Promise<ExploreItem[]> =>
    apiClient.get('/explore/trending').then(r => r.data),

  getRecommendations: (): Promise<ExploreItem[]> =>
    apiClient.get('/explore/recommendation').then(r => r.data),
};

