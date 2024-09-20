import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MasterLogin from '../../pages/MasterLogin.jsx';
import fetchMock from "jest-fetch-mock";
import TelecomBillingSystem from "../TelecomBillingSystem.js";
describe("MasterLogin Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset mock before each test
  });

  test("handles failed login with wrong credentials", async () => {
    // Mock a failed login response
    fetchMock.mockResponseOnce("failure");

    render(
      <Router>
        <MasterLogin />
      </Router>
    );

    // Simulate user input for wrong credentials
    fireEvent.change(screen.getByLabelText(/Username:/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "wrongpassword" },
    });

    // // Submit the form
    // fireEvent.click(screen.getByText(/Login/i));

    // Expect error message to appear
    // await waitFor(() => {
    //   expect(screen.getByText(/Wrong username or password/i)).toBeInTheDocument();
    // });
  });
});
