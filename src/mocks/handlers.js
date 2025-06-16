// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const { username, password } = await req.json();

    if (username === 'admin' && password === 'admin123') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'mock-token',
          role: 'admin'
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        error: 'Credenciales inválidas'
      })
    );
  }),
];




