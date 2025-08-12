import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/login', async ({ request }) => {
    const { username, password } = await request.json();

    console.log('🛠 MSW recibió:', { username, password });

    if (username === 'admin' && password === 'admin123') {
      return HttpResponse.json(
        { token: 'mock-token', role: 'admin' },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { error: 'Credenciales inválidas' },
      { status: 401 }
    );
  }),
];





