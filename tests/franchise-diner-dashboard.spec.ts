import { test, expect } from "playwright-test-coverage";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  const header = page.getByRole("heading", {
    name: "So you want a piece of the pie?",
  });
  await expect(header).toBeVisible();

  const header2 = page.getByRole("heading", {
    name: "Unleash Your Potential",
  });
  await expect(header2).toBeVisible();

  const loginLink = page.getByRole("link", { name: "login", exact: true });
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  const loginHeader = page.getByRole("heading", { name: "Welcome back" });
  await expect(loginHeader).toBeVisible();
});
