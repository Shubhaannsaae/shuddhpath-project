import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  ARC_GIS_API_KEY: process.env.ARC_GIS_API_KEY || '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  ML_MODEL_PATH: process.env.ML_MODEL_PATH || './ml/models/aqi_predictor.joblib',
};

export default config;
