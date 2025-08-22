import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import apiRouter from './api';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api', apiRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
