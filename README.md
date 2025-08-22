# ShuddhPath - Clean Air Route Optimization Platform

## Overview

ShuddhPath is an AI-powered platform that provides clean air route optimization for urban travel. It combines real-time air quality data with geospatial routing to suggest the cleanest travel paths, contributing to better health outcomes and environmental awareness.

## Features

- **Clean Route Planning**: AI-optimized routes prioritizing air quality
- **Real-time AQI Monitoring**: Live air quality data integration
- **Geospatial Visualization**: Interactive maps with ArcGIS
- **Predictive Analytics**: ML-based air quality forecasting
- **Multi-modal Routing**: Support for walking, cycling, and driving

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ArcGIS Maps SDK** for geospatial visualization
- **NextAuth.js** for authentication

### Backend
- **Node.js** with TypeScript
- **Express.js** API server
- **Prisma ORM** with PostgreSQL
- **Redis** for caching

### Machine Learning
- **Python** with pandas, XGBoost
- **scikit-learn** for preprocessing
- **Jupyter** for data exploration

### Infrastructure
- **Docker** for containerization
- **PostgreSQL with PostGIS** for spatial data
- **Redis** for session management

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- Docker and Docker Compose
- ArcGIS API Key
- Google OAuth credentials

### Installation

1. **Clone the repository**
git clone https://github.com/your-org/shuddhpath-project.git
cd shuddhpath-project


2. **Install dependencies**
npm run install:all
npm run ml:setup


3. **Setup environment**
cp .env.local.example .env.local

Edit .env.local with your API keys


4. **Start infrastructure**
npm run docker:up


5. **Train ML model**
npm run ml:pipeline

6. **Start development servers**
npm run dev


The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## Project Structure

shuddhpath-project/
├── app/ # Next.js frontend application
├── server/ # Node.js backend API
├── ml/ # Python ML pipeline
│ ├── src/ # ML scripts
│ ├── data/ # Dataset storage
│ ├── models/ # Trained models
│ └── notebooks/ # Jupyter notebooks
├── docker-compose.yml # Infrastructure setup
└── package.json # Root package configuration


## API Documentation

### AQI Endpoints
- `GET /api/aqi/current` - Current air quality data
- `GET /api/aqi/forecast` - Air quality predictions
- `GET /api/aqi/stations` - Monitoring station data

### Routing Endpoints
- `POST /api/routing/optimize` - Clean route calculation
- `GET /api/routing/alternatives` - Route alternatives

## ML Pipeline

### Data Processing
1. **Data Cleaning**: `ml/src/clean_data.py`
2. **Feature Engineering**: `ml/src/feature_engineering.py`  
3. **Model Training**: `ml/src/train_model.py`

### Model Features
- Temporal patterns (hour, day, month)
- Weather conditions (temperature, humidity)
- Historical air quality trends
- Geospatial context

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Variables

Required environment variables:

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
DATABASE_URL=

## Acknowledgments

- Clear Skies Challenge 2025 by IIT Tirupati
- Google AirView+ for air quality data
- ArcGIS for geospatial capabilities
- Department of Science & Technology, Government of India