import { test, expect } from "playwright-test-coverage";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByPlaceholder("Email address").click();
  await page.getByPlaceholder("Email address").fill("f@jwt.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("franchisee");
  await page.getByRole("button", { name: "Login" }).click();
  const mainHeader = page.getByRole("heading", {
    name: "The web's best pizza",
  });
  await expect(mainHeader).toBeVisible();
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  const header = page.getByRole("heading", { name: "pizzaPocket" });
  await expect(header).toBeVisible();

  const createStoreBtn = page.getByRole("button", { name: "Create store" });
  await expect(createStoreBtn).toBeVisible();
  await createStoreBtn.click();
  const header2 = page.getByRole("heading", { name: "Create store" });
  await expect(header2).toBeVisible();
  const nameInput = page.getByPlaceholder("store name");
  await expect(nameInput).toBeVisible();
  await nameInput.click();
  await nameInput.fill("bobby");
  const submitButton = page.getByRole("button", { name: "Create" });
  await expect(submitButton).toBeVisible();
  await submitButton.click();
  const store = page.getByText("bobby");
  await expect(store).toBeVisible();
  await deleteStore(page, "bobby");
});

const deleteStore = async (page: any, name: string) => {
  // Locate the franchise row containing the given name
  const storeRow = page.locator(`tr:has-text("${name}")`);

  // Ensure the franchise exists before proceeding
  await expect(storeRow).toBeVisible();

  // Find the "Close" button within the row
  const closeButton = storeRow.locator('button:has-text("Close")');
  await expect(closeButton).toBeVisible();

  // Click the "Close" button to delete the franchise
  await closeButton.click();

  const header = page.getByRole("heading", { name: "Sorry to see you go" });
  await expect(header).toBeVisible();
  const confirmCloseButton = page.getByRole("button", { name: "Close" });
  await expect(confirmCloseButton).toBeVisible();
  await confirmCloseButton.click();

  // Optionally, you can verify the franchise was removed
  await expect(storeRow).not.toBeVisible();
};
