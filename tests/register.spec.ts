import { test } from "playwright-test-coverage";
import { registerUser } from "./misc";

test("test", async ({ page }) => {
  await registerUser(page);
});
