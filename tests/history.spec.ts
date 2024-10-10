import { test, expect } from "playwright-test-coverage";

test("test", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "History" }).click();
  const header = page.getByRole("heading", { name: "Mama Rucci, my my" });
  await expect(header).toBeVisible();
});
