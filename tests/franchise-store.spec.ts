import { test, expect } from "playwright-test-coverage";
import { loginUser } from "./misc";

let stores = [{ id: 4, name: "SLC", totalRevenue: 0 }];

test("test create and delete store", async ({ page }) => {
  // mock get all franchises
  await page.route("*/**/api/franchise/*", async (route) => {
    const res = [
      {
        id: 4,
        name: "pizzaPocket",
        admins: [{ id: 4, name: "Kai Chen", email: "d@jwt.com" }],
        stores: stores,
      },
    ];
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: res });
  });

  // Mock the POST request to create a store
  await page.route("*/**/api/franchise/*/store", async (route) => {
    const res = { id: 4, franchiseId: 1, name: "bobby" };
    expect(route.request().method()).toBe("POST");
    stores.push({ id: 4, name: "bobby", totalRevenue: 0 });
    await route.fulfill({ json: res });
  });

  // Go to the main page and login as franchisee
  await page.goto("/");
  await loginUser(page, "franchisee");

  // Navigate to the franchise section
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();

  // Validate the header is visible
  const header = page.getByRole("heading", { name: "pizzaPocket" });
  await expect(header).toBeVisible();

  // Create a store
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

  // Ensure the new store is visible
  const store = page.getByText("bobby");
  await expect(store).toBeVisible();

  // Delete the store
  await deleteStore(page, "bobby");
});

const deleteStore = async (page, name) => {
  // Mock DELETE store API
  await page.route("*/**/api/franchise/*/store", async (route) => {
    expect(route.request().method()).toBe("DELETE");
    const res = { message: "store deleted" };
    stores = stores.filter((store) => store.name !== name);
    await route.fulfill({ json: res });
  });

  // Locate the store row containing the given name
  const storeRow = page.locator(`tr:has-text("${name}")`);

  // Ensure the store exists before proceeding
  await expect(storeRow).toBeVisible();

  // Find and click the "Close" button within the row
  const closeButton = storeRow.locator('button:has-text("Close")');
  await expect(closeButton).toBeVisible();
  await closeButton.click();

  // Confirm store deletion
  const header = page.getByRole("heading", { name: "Sorry to see you go" });
  await expect(header).toBeVisible();
  const confirmCloseButton = page.getByRole("button", { name: "Close" });
  await expect(confirmCloseButton).toBeVisible();
  await confirmCloseButton.click();

  // Verify the store was removed
  await expect(storeRow).not.toBeVisible();
};
