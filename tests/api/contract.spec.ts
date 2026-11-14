import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const BASE = 'https://restful-booker.herokuapp.com';

// THE CONTRACT: the agreed shape of a booking (the passport form)
const bookingSchema = {
  type: 'object',
  required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates'],
  properties: {
    firstname:   { type: 'string' },
    lastname:    { type: 'string' },
    totalprice:  { type: 'number' },
    depositpaid: { type: 'boolean' },
    bookingdates: {
      type: 'object',
      required: ['checkin', 'checkout'],
      properties: {
        checkin:  { type: 'string' },
        checkout: { type: 'string' },
      },
    },
  },
};

test('booking response matches the contract', async ({ request }) => {
  // create a booking so we know one exists
  const create = await request.post(`${BASE}/booking`, {
    data: {
      firstname: 'Suraj', lastname: 'S', totalprice: 500, depositpaid: true,
      bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    },
  });
  const { bookingid } = await create.json();

  const res = await request.get(`${BASE}/booking/${bookingid}`);
  const body = await res.json();

  const validate = new Ajv().compile(bookingSchema);   // turn the schema into a checker function
  const isValid = validate(body);                      // true if the body matches the contract

  expect(isValid, JSON.stringify(validate.errors)).toBe(true);   // on failure, show exactly what broke
});