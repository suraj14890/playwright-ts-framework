import { test, expect } from '@playwright/test';

const BASE = 'https://restful-booker.herokuapp.com';
let token: string;                          // shared by all tests in this file

// 1. GET A TOKEN ONCE — like collecting your hotel key card at reception
test.beforeAll(async ({ request }) => {     // request = Playwright's built-in API fixture
  const res = await request.post(`${BASE}/auth`, {
    data: { username: 'admin', password: 'password123' },   // the body we send
  });
  expect(res.status()).toBe(200);
  token = (await res.json()).token;         // read the token from the response
  console.log('Token:', token);
});

// 2. CREATE → READ → DELETE (chaining calls)
test('create, read and delete a booking @smoke', async ({ request }) => {
  // CREATE (POST)
  const create = await request.post(`${BASE}/booking`, {
    data: {
      firstname: 'Suraj', lastname: 'S', totalprice: 500, depositpaid: true,
      bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    },
    timeout: 10_000,                        // per-request timeout: fail if no reply in 10 s
  });
  expect(create.status()).toBe(200);
  const { bookingid } = await create.json();   // save the new id for the next calls
  console.log('Created booking', bookingid);

  // READ (GET)
  const get = await request.get(`${BASE}/booking/${bookingid}`);
  expect(get.ok()).toBeTruthy();                              // ok() = status 200–299
  const body = await get.json();
  expect(body.firstname).toBe('Suraj');                       // check the DATA, not just the status
  expect(body.totalprice).toBe(500);

  // DELETE — needs the token
  const del = await request.delete(`${BASE}/booking/${bookingid}`, {
    headers: { Cookie: `token=${token}` },  // this API takes the token as a cookie
  });
  expect(del.status()).toBe(201);           // this API returns 201 on delete

  // CONFIRM it's gone
  const after = await request.get(`${BASE}/booking/${bookingid}`);
  expect(after.status()).toBe(404);         // Not Found
});

// 3. NEGATIVE TEST — delete without the key card
test('delete without a token is rejected', async ({ request }) => {
  const res = await request.delete(`${BASE}/booking/1`);
  expect(res.status()).toBe(403);           // Forbidden
});