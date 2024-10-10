import { test, expect } from "playwright-test-coverage";
import { loginUser } from "./misc";

test("test", async ({ page }) => {
  await page.goto("/");
  await loginUser(page);
  await page.getByRole("link", { name: "KC" }).click();
  const header = page.getByRole("heading", { name: "Your pizza kitchen" });
  await expect(header).toBeVisible();
});
