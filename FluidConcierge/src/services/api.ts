import axios from 'axios';
import type {
  TripResponse,
  ItineraryResponse,
  GenerateResponse,
  CreateTripRequest,
  GenerateRequest,
  RegenerateRequest,
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

