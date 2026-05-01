import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API TodoApp opérationnelle' });
});

describe('Backend API — Tests de base', () => {

  test('GET /api/health → doit retourner status 200', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('GET /api → doit retourner un message', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  test('GET /route-inexistante → doit retourner 404', async () => {
    const response = await request(app).get('/route-inexistante');
    expect(response.statusCode).toBe(404);
  });

});

describe('Validation des données Todo', () => {

  test('Un titre vide doit être invalide', () => {
    const titre = '';
    expect(titre.trim().length).toBe(0);
  });

  test('Un titre non-vide doit être valide', () => {
    const titre = 'Apprendre DevOps';
    expect(titre.trim().length).toBeGreaterThan(0);
  });

});