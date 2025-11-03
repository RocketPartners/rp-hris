import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API', user: {
        id: "1",
        name: "John Doe",
        email: "john@gmail.com"
      }});
  });
})
