import { test, expect } from "playwright-test-coverage";
import { loginUser } from "./misc";

const goToAdminDashboard = async (page: any) => {
  const adminLink = page.getByText("Admin");
  await expect(adminLink).toBeVisible();
  await adminLink.click();
};

const deleteFranchise = async (page: any, name: string) => {
  await page.route("*/**/api/franchise/:franchiseId", async (route) => {
    const res = { message: "franchise deleted" };
    expect(route.request().method()).toBe("DELETE");
    await route.fulfill({ json: res });
  });
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
  await page.route("*/**/api/franchise", async (route) => {
    if (route.request().method() === "POST") {
      const req = { name: "bobbyJoes", admins: [{ email: "d@jwt.com" }] };
      const res = {
        name: "bobbyJoes",
        admins: [{ email: "d@jwt.com", id: 3, name: "Kai Chen" }],
        id: 1,
      };
      expect(route.request().postDataJSON()).toMatchObject(req);
      await route.fulfill({ json: res });
    } else {
      const res = [
        {
          id: 2,
          name: "pizzaPocket",
          admins: [{ id: 4, name: "bobbyJoes", email: "d@jwt.com" }],
          stores: [{ id: 4, name: "SLC", totalRevenue: 0 }],
        },
      ];
      expect(route.request().method()).toBe("GET");
      await route.fulfill({ json: res });
    }
  });

  await loginUser(page, "admin");
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
  await adminEmailAddressInput.fill("d@jwt.com");
  const submitButton = page.getByRole("button", { name: "Create" });
  await expect(submitButton).toBeVisible();
  await submitButton.click();
  const franchise = page.getByText("bobbyJoes");
  await expect(franchise).toBeVisible();
  await deleteFranchise(page, "bobbyJoes");
});
