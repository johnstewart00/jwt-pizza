import { test, expect } from "playwright-test-coverage";

test("test", async ({ page }) => {
  await page.goto("/docs");
  const header = page.getByRole("heading", { name: "JWT Pizza API" });
  await expect(header).toBeVisible();
  const register = page.getByText("Register a new user");
  await expect(register).toBeVisible();
});
