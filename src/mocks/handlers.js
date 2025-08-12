import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/login', async ({ request }) => {
    const { username, password } = await request.json();

    if (username === 'admin' && password === 'admin123') {
      return HttpResponse.json(
        { token: 'mock-token-123', role: 'admin' },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: 'Credenciales inválidas' },
      { status: 401 }
    );
  }),

  http.get('/protected-data', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (authHeader === 'Bearer mock-token-123') {
      return HttpResponse.json(
        { secret: 'Este es un dato protegido', time: new Date().toISOString() },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: 'No autorizado' },
      { status: 401 }
    );
  }),
];





