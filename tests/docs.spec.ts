import { test, expect } from "playwright-test-coverage";

test("test", async ({ page }) => {
  await page.goto("/docs");
  const header = page.getByRole("heading", { name: "JWT Pizza API" });
  await expect(header).toBeVisible();
  await expect(page.getByText("Register a new user")).toBeVisible();
});
