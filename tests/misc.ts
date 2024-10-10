import { expect } from "playwright-test-coverage";

export const logoutUser = async (page: any) => {
  await page.goto("http://localhost:5173/");

  const logoutButton = page.getByText("Logout");

  // Ensure "Logout" button is visible after login
  await expect(logoutButton).toBeVisible();

  // Perform logout action
  await logoutButton.click();

  const loginButton = page.getByText("Login");
  const registerButton = page.getByText("Register");

  // Ensure "Login" and "Register" buttons are visible after logging out
  await expect(loginButton).toBeVisible();
  await expect(registerButton).toBeVisible();

  // Ensure "Logout" button is no longer visible after logging out
  await expect(logoutButton).not.toBeVisible();
};

export const loginUser = async (page: any) => {
  await page.goto("http://localhost:5173/");

  // Use getByText to select the elements based on visible text
  const loginButton = page.getByText("Login");
  const registerButton = page.getByText("Register");

  // Ensure the login and register elements are visible
  await expect(loginButton).toBeVisible();
  await expect(registerButton).toBeVisible();

  // Perform login action
  await loginButton.click();
  await page.getByPlaceholder("Email address").fill("a@gmail.com");
  await page.getByPlaceholder("Password").fill("Password123!");

  // Click on the "Login" button after entering credentials
  const loginButton2 = page.getByRole("button", { name: "Login" });
  await expect(loginButton2).toBeVisible();
  await loginButton2.click();

  const logoutButton = page.getByText("Logout");

  // Ensure "Logout" button is visible after login
  await expect(logoutButton).toBeVisible();
};

export const registerUser = async (page: any) => {
  // Mock the register API call
  // await page.route("**/api/auth", async (route) => {
  //   expect(route.request().method()).toBe("POST");
  //   const postData = route.request().postData();
  //   const requestBody = postData ? JSON.parse(postData) : null;

  //   expect(requestBody).toEqual({
  //     name: "a",
  //     email: "a@gmail.com",
  //     password: "Password123!",
  //   });

  //   // Fulfill the route with mock data
  //   await route.fulfill({
  //     status: 200,
  //     contentType: "application/json",
  //     body: JSON.stringify(registerResponse),
  //   });
  // });

  // Navigate to the page
  await page.goto("http://localhost:5173/");

  // Click on the "Register" link
  await page.getByRole("link", { name: "Register" }).click();

  // Expect the "Welcome to the party" text to be visible
  await expect(page.locator("text=Welcome to the party")).toBeVisible();

  // Validate that the "Full name" input field is visible
  const fullNameInput = page.getByPlaceholder("Full name");
  await expect(fullNameInput).toBeVisible();

  // Validate that the "Email address" input field is visible
  const emailInput = page.getByPlaceholder("Email address");
  await expect(emailInput).toBeVisible();

  // Validate that the "Password" input field is visible
  const passwordInput = page.getByPlaceholder("Password");
  await expect(passwordInput).toBeVisible();

  // Fill in the "Full name" field and verify the value
  await fullNameInput.click();
  await fullNameInput.fill("a");
  await expect(fullNameInput).toHaveValue("a");

  // Fill in the "Email address" field and verify the value
  await emailInput.click();
  await emailInput.fill("a@gmail.com");
  await expect(emailInput).toHaveValue("a@gmail.com");

  // Fill in the "Password" field and verify the value
  await passwordInput.click();
  await passwordInput.fill("Password123!");
  await expect(passwordInput).toHaveValue("Password123!");

  // Click the "Register" button
  const registerButton = page.getByRole("button", { name: "Register" });
  await expect(registerButton).toBeVisible();
  await registerButton.click();
};

export const orderPizza = async (page) => {
  // Expect the "Order now" button to be visible
  const orderNowButton = page.getByRole("link", { name: "Order" });
  await expect(orderNowButton).toBeVisible();

  // Click the "Order now" button
  await orderNowButton.click();

  const header = page.getByRole("heading", { name: "Awesome is a click away" });
  await expect(header).toBeVisible();

  const checkoutButton = page.getByRole("button", { name: "Checkout" });

  // Expect the "Checkout" button to be disabled initially
  await expect(checkoutButton).toBeDisabled();

  // Expect the combo box to have "choose store" initially selected
  const comboBox = page.getByRole("combobox");
  await expect(comboBox).toHaveValue(""); // Assuming an empty string represents "choose store"

  // Select a store (in this case, the store with value "2")
  await comboBox.selectOption("SLC");

  // Expect the combo box to have value "2" after selection
  await expect(comboBox).toHaveValue("1");

  // Expect the "Checkout" button to be disabled still
  await expect(checkoutButton).toBeDisabled();

  // Click the pizza link for "Image Description Pepperoni"
  const pizzaLink = page.getByRole("link", {
    name: "Image Description Pepperoni",
  });
  await pizzaLink.click();

  // After selecting a pizza, expect the "Checkout" button to be enabled
  await expect(checkoutButton).toBeEnabled();

  // Click the "Checkout" button
  await checkoutButton.click();
};

export const makePayment = async (page) => {
  const makePaymentButton = page.getByRole("button", { name: "Pay now" });
  await expect(makePaymentButton).toBeVisible();
  await makePaymentButton.click();
};

export const cancelOrder = async (page) => {
  const cancelOrderButton = page.getByRole("button", { name: "Cancel" });
  await expect(cancelOrderButton).toBeVisible();
  await cancelOrderButton.click();
};

export const loginDinerUser = async (page) => {
  const loginButton = page.getByText("Login");
  await expect(loginButton).toBeVisible();

  await loginButton.click();
  await page.getByPlaceholder("Email address").fill("d@jwt.com");
  await page.getByPlaceholder("Password").fill("diner");
  await page.getByPlaceholder("Password").press("Enter");
  const loggedInHeader = page.getByRole("heading", {
    name: "The web's best pizza",
  });
  await expect(loggedInHeader).toBeVisible();
};

export const logoutDinerUser = async (page) => {
  const logoutButton = page.getByText("Logout");
  await expect(logoutButton).toBeVisible();
  await logoutButton.click();
  const loginButton = page.getByText("Login");
  await expect(loginButton).toBeVisible();
};
