import { test, expect } from "playwright-test-coverage";

const logInAdmin = async (page: any) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByPlaceholder("Email address").click();
  await page.getByPlaceholder("Email address").fill("a@jwt.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("admin");
  await page.getByPlaceholder("Password").press("Enter");
};

const goToAdminDashboard = async (page: any) => {
  const adminLink = page.getByRole("link", { name: "Admin" });
  await expect(adminLink).toBeVisible();
  await adminLink.click();
};

const deleteFranchise = async (page: any, name: string) => {
  // Locate the franchise row containing the given name
  const franchiseRow = page.locator(`tr:has-text("${name}")`);

  // Ensure the franchise exists before proceeding
  await expect(franchiseRow).toBeVisible();

  // Find the "Close" button within the row
  const closeButton = franchiseRow.locator('button:has-text("Close")');
  await expect(closeButton).toBeVisible();

  // Click the "Close" button to delete the franchise
  await closeButton.click();

  const header = page.getByRole("heading", { name: "Sorry to see you go" });
  await expect(header).toBeVisible();
  const confirmCloseButton = page.getByRole("button", { name: "Close" });
  await expect(confirmCloseButton).toBeVisible();
  await confirmCloseButton.click();

  // Optionally, you can verify the franchise was removed
  await expect(franchiseRow).not.toBeVisible();
};

test("add franchise", async ({ page }) => {
  await logInAdmin(page);
  await goToAdminDashboard(page);
  const adminHeader = page.getByRole("heading", {
    name: "Mama Ricci's kitchen",
  });
  await expect(adminHeader).toBeVisible();
  const addFranchise = page.getByRole("button", { name: "Add Franchise" });
  await expect(addFranchise).toBeVisible();
  await addFranchise.click();
  const header = page.getByRole("heading", { name: "Create Franchise" });
  await expect(header).toBeVisible();
  const nameInput = page.getByPlaceholder("franchise name");
  await expect(nameInput).toBeVisible();
  await nameInput.click();
  await nameInput.fill("bobbyJoes");
  const adminEmailAddressInput = page.getByPlaceholder(
    "franchisee admin email"
  );
  await expect(adminEmailAddressInput).toBeVisible();
  await adminEmailAddressInput.click();
  await adminEmailAddressInput.fill("a@jwt.com");
  const submitButton = page.getByRole("button", { name: "Create" });
  await expect(submitButton).toBeVisible();
  await submitButton.click();
  const franchise = page.getByText("bobbyJoes");
  await expect(franchise).toBeVisible();
  await deleteFranchise(page, "bobbyJoes");
});
