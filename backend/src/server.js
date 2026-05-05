import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import client from 'prom-client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Endpoint métriques — utilisé par Prometheus
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
app.use('/api/todos', todoRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});

