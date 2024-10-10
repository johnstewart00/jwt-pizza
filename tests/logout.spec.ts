import { test } from "playwright-test-coverage";
import { loginUser, logoutUser, registerUser } from "./misc";

// Test with Playwright network mocking
test("test", async ({ page }) => {
  await registerUser(page);
  await loginUser(page);
  await logoutUser(page);
});
