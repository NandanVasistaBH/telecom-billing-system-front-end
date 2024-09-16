// AdminLogin.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLogin from "../AdminLogin.jsx";
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

describe("AdminLogin Component", () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  test("Admin Account dropdown contains options", () => {
    render(<TelecomBillingSystem />);
    fireEvent.click(screen.getByText(/Admin/i)); // Select 'Customer' role
  });

  test("renders AdminLogin form correctly", () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );

    // Check if the form elements are present
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test("allows input changes and updates the state", () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Simulate user typing in the input fields
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Check if the input values are updated correctly
    expect(usernameInput.value).toBe("admin");
    expect(passwordInput.value).toBe("password123");
  });

  test("navigates to admin dashboard on successful login", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "fake-jwt-token",
    });

    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByText('Login');

    // Simulate user input and form submission
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    // Wait for the async login to complete
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("jwtToken", "fake-jwt-token");
      expect(mockedNavigate).toHaveBeenCalledWith("/admindashboard");
    });
  });

  test("displays an error if the fetch call fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Wait for the async error to be handled
    await waitFor(() => {
      expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    });
  });
});
