import { test, expect } from "playwright-test-coverage";

test("test", async ({ page }) => {
  await page.goto("/notFound");
  await expect(
    page.getByText(
      "It looks like we have dropped a pizza on the floor. Please try another page."
    )
  ).toBeVisible();
});
