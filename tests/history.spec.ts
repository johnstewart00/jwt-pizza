import { test, expect } from "playwright-test-coverage";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "History" }).click();
  const header = page.getByRole("heading", { name: "Mama Rucci, my my" });
  await expect(header).toBeVisible();
});
