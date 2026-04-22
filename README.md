# ✈️ FluidConcierge: AI-Powered Trip Planner

FluidConcierge is a modern, intelligent trip planning application that leverages Generative AI to create personalized travel itineraries. By simply describing your dream vacation in natural language, the system intelligently parses your intent and generates a detailed, day-by-day plan.

![Project Banner](https://img.shields.io/badge/Status-95%25%20Complete-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-Spring%20Boot%20%7C%20React%20%7C%20OpenRouter-blue)

## ✨ Key Features

- **🤖 AI Trip Generation**: Describe your trip (destination, duration, budget, style) and let the AI build the perfect itinerary using OpenRouter (LLM).
- **📝 Natural Language Parsing**: Uses advanced prompt engineering to extract structured data from free-form user descriptions.
- **🛠️ Interactive Itineraries**: 
  - Add, Edit, or Delete activities manually.
  - **Regenerate Single Day**: Don't like a specific day? Ask the AI to regenerate just that day with new feedback.
- **💎 Premium UI/UX**: Built with Material Design 3 principles, featuring smooth animations (Framer Motion) and a responsive layout.
- **🏗️ Clean Architecture**: Backend follows strict dependency inversion and domain-driven design principles for scalability.

## 🛠️ Technology Stack

### Backend
- **Language**: Java 21
- **Framework**: Spring Boot 3.x
- **AI Integration**: OpenRouter API (Access to GPT-4, Claude 3, etc.)
- **Persistence**: Spring Data JPA (H2/PostgreSQL)
- **Communication**: Spring WebClient for reactive API calls

### Frontend
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Material Design 3 vibes
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites
- JDK 21 or higher
- Node.js 18+ & npm
- OpenRouter API Key (placed in `tripplanner/.env`)

### 1. Setup Backend
```bash
cd tripplanner
# Add your OPENROUTER_API_KEY to .env
mvn spring-boot:run
```
The backend will start on `http://localhost:8081`.

### 2. Setup Frontend
```bash
cd FluidConcierge
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## 🏗️ Architecture Overview

The project implements **Clean Architecture** to ensure a separation of concerns:
- **Domain**: Pure business logic and models (Trip, Itinerary, Activity).
- **Application**: Use cases (GenerateTrip, ParseDescription) and Orchestrators.
- **Infrastructure**: External integrations (OpenRouter, Database, WebConfig).
- **Interface/Web**: REST Controllers and DTOs.

## 📊 Status
Current implementation is approximately **95% complete** for core features. 
See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for detailed progress and technical notes.

---

Developed by **Nhom1**
