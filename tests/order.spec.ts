import { test, expect } from "playwright-test-coverage";
import { loginDinerUser, logoutUser, makePayment, orderPizza } from "./misc";

test("test - complete order", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await loginDinerUser(page);
  await orderPizza(page);
  await makePayment(page);
  const header = page.getByRole("heading", { name: "Here is your JWT Pizza!" });
  await expect(header).toBeVisible();
  const verifyBtn = page.getByRole("button", { name: "Verify" });
  await expect(verifyBtn).toBeVisible();
  await verifyBtn.click();
  const verifyCloseBtn = page.getByRole("button", { name: "Close" });
  await expect(verifyCloseBtn).toBeVisible();
  await verifyCloseBtn.click();
  await logoutUser(page);
});
