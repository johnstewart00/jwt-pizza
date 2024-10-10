import { test, expect } from "playwright-test-coverage";

test("test", async ({ page }) => {
  await page.route("*/**/api/docs", async (route) => {
    const res = {
      version: 1,
      endpoints: [
        {
          method: "POST",
          path: "/api/auth",
          description: "Register a new user",
          response: {
            user: {
              id: 2,
              name: "pizza diner",
              email: "d@jwt.com",
              roles: [
                {
                  role: "diner",
                },
              ],
            },
            token: "tttttt",
          },
        },
      ],
      config: {},
    };
    await route.fulfill({ json: res });
  });
  await page.goto("/docs");
  const header = page.getByRole("heading", { name: "JWT Pizza API" });
  await expect(header).toBeVisible();
  const register = page.getByText("Register a new user");
  await expect(register).toBeVisible();
});
