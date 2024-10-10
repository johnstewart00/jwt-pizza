import { test, expect } from "playwright-test-coverage";

test("home page", async ({ page }) => {
  await page.goto("/");

  expect(await page.title()).toBe("JWT Pizza");
  const heading = page.getByRole("heading", { name: "The web's best pizza" });
  expect(heading).toBeVisible();
});
