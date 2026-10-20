const { test, expect } = require("@playwright/test");

test("GET - post lao", async ({ request }) => {
  const res = await request.get("https://jsonplaceholder.typicode.com/posts/1");

  expect(res.status()).toBe(200);

  const data = await res.json();
  console.log(data);
  expect(data.id).toBe(1);
});

test("POST - naya post banao", async ({ request }) => {
  const res = await request.post("https://jsonplaceholder.typicode.com/posts", {
    data: { title: "Paritosh", body: "Hello", userId: 1 },
  });

  expect(res.status()).toBe(201);

  const data = await res.json();
  console.log(data);
  expect(data.title).toBe("Paritosh");
});

test("DELETE - post hatao", async ({ request }) => {
  const res = await request.delete(
    "https://jsonplaceholder.typicode.com/posts/1",
  );

  expect(res.status()).toBe(200);
});
