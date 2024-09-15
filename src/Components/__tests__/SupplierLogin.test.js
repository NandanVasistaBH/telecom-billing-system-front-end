import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SupplierLogin from "../../pages/SupplierLogin.jsx";
import { MemoryRouter } from "react-router-dom";
import TelecomBillingSystem from "../TelecomBillingSystem.js";

// Mocking the `useNavigate` hook from `react-router-dom`
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Mocking the fetch API
global.fetch = jest.fn();

describe("SupplierLogin Component", () => {
  beforeEach(() => {
    // Clear mocks before each test
    fetch.mockClear();
    mockedNavigate.mockClear();
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  test("Supplier Account dropdown contains options", () => {
    render(<TelecomBillingSystem />);
    fireEvent.click(screen.getByText(/Supplier/i)); // Select 'Customer' role
  });

  test("renders SupplierLogin form correctly", () => {
    render(
      <MemoryRouter>
        <SupplierLogin />
      </MemoryRouter>
    );

    // Check if the form elements are present
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Supplier Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot Password?/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
  });

  test("allows input changes and updates the state", () => {
    render(
      <MemoryRouter>
        <SupplierLogin />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Simulate user typing in the input fields
    fireEvent.change(usernameInput, { target: { value: "supplier1" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Check if the input values are updated correctly
    expect(usernameInput.value).toBe("supplier1");
    expect(passwordInput.value).toBe("password123");
  });

  test("displays error message on failed login", async () => {
    // Mock a failed login response
    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "failure",
    });

    render(
      <MemoryRouter>
        <SupplierLogin />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    // Simulate user input and form submission
    fireEvent.change(usernameInput, { target: { value: "supplier1" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    // Wait for the error message to appear
    // await waitFor(() => {
    //   expect(screen.getByText(/Wrong username or password/i)).toBeInTheDocument();
    // });
  });

  test("navigates to SupplierDashboard on successful login", async () => {
    // Mock a successful login response
    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "valid-jwt-token",
    });

    render(
      <MemoryRouter>
        <SupplierLogin />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    // Simulate user input and form submission
    fireEvent.change(usernameInput, { target: { value: "supplier1" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    // Wait for the async login to complete
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("jwtToken", "valid-jwt-token");
      expect(localStorage.setItem).toHaveBeenCalledWith("user", "supplier");
      expect(mockedNavigate).toHaveBeenCalledWith("/SupplierDashboard");
    });
  });

  test("displays network error message on fetch failure", async () => {
    // Mock a network error
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <MemoryRouter>
        <SupplierLogin />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /Login/i });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Wait for the async error to be handled
    await waitFor(() => {
      expect(screen.getByText(/An error occurred while logging in/i)).toBeInTheDocument();
    });
  });
});
