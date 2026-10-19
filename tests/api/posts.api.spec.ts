import { test, expect } from '@playwright/test';

// API pública sin autenticación. Los POST/PUT/DELETE son simulados: la API
// responde como si hubiera guardado, pero no persiste nada.
test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

type Post = { userId: number; id: number; title: string; body: string };

test.describe('API /posts', () => {
  test('GET /posts devuelve la lista completa', async ({ request }) => {
    const response = await request.get('/posts');

    expect(response.status()).toBe(200);
    const posts: Post[] = await response.json();
    expect(posts).toHaveLength(100);
  });

  test('GET /posts/1 devuelve un post con el contrato esperado', async ({ request }) => {
    const response = await request.get('/posts/1');

    expect(response.ok()).toBeTruthy();
    const post: Post = await response.json();
    expect(post).toMatchObject({
      id: 1,
      userId: 1,
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('GET /posts/99999 devuelve 404 si el recurso no existe', async ({ request }) => {
    const response = await request.get('/posts/99999');

    expect(response.status()).toBe(404);
  });

  test('POST /posts crea un recurso y devuelve 201', async ({ request }) => {
    const payload = { title: 'Post de prueba', body: 'Contenido de prueba', userId: 1 };

    const response = await request.post('/posts', { data: payload });

    expect(response.status()).toBe(201);
    const created: Post = await response.json();
    expect(created).toMatchObject(payload);
    expect(created.id).toBeDefined();
  });

  test('PUT /posts/1 actualiza el recurso', async ({ request }) => {
    const payload = { id: 1, title: 'Título editado', body: 'Cuerpo editado', userId: 1 };

    const response = await request.put('/posts/1', { data: payload });

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(payload);
  });

  test('DELETE /posts/1 responde 200', async ({ request }) => {
    const response = await request.delete('/posts/1');

    expect(response.status()).toBe(200);
  });
});