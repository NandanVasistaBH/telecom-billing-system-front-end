import { MemoryRouter } from 'react-router-dom';
import TelecomBillingSystem from '../TelecomBillingSystem.js';
 
 
 
 // Adjust the import according to your file structure
import CustomerLogin from '../../pages/CustomerLogin.jsx';
 
 
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
 
 
 
 
 
// Mocking the useNavigate hook from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),  // Ensure to retain actual implementations of other functions
  useNavigate: () => mockedNavigate,  // Mock only useNavigate
 }));
 
// describe('TelecomBillingSystem Component', () => {
//   test('navigates to customer login page on link click', () => {
//     // Wrapping the component with MemoryRouter to provide routing context
//     render(
//       <MemoryRouter>
//         <TelecomBillingSystem />
//       </MemoryRouter>
//     );
//     const roleSelector = screen.getByTestId('role-selector');
// const customerButton = within(roleSelector).getByText(/Customer/i);
// fireEvent.click(customerButton);
 
 
//     // // fireEvent.click(screen.getByText(/Customer/i)); // Select 'Customer' role
//     // fireEvent.select(screen.getByText(/Customer/i));
//     fireEvent.click(screen.getByText(/Account/i)); // Open Account dropdown
 
//     // Check for Login and Register links in the dropdown
//     expect(screen.getByText(/Customer Login/i)).toBeInTheDocument();
//     expect(screen.getByText(/Customer Registration/i)).toBeInTheDocument()
//   });
// });
 
test("Accessing the customer role",()=>{
    render(
    <MemoryRouter><TelecomBillingSystem/></MemoryRouter>);
    const customerButton = screen.getByRole('button', { name: /Customer/i });
   
    // Click the Customer button
    fireEvent.click(customerButton);
 
    // Verify if the button is active or selectedRole is set to 'customer'
    // Example verification: check if the button has the 'active' class
    expect(customerButton).toHaveClass('active');
 
   
});test('renders CustomerLogin component', () => {
    render(
      <MemoryRouter>
        <CustomerLogin />
      </MemoryRouter>
    );
 
    // Check if the login form and relevant elements are present
    // expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Forgot Password?/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Don't have an account\? Register/i })).toBeInTheDocument();
  });
 
  test('submits form with valid data and shows confetti', async () => {
    const mockedNavigate = useNavigate();
    const { getByLabelText, getByRole, findByText } = render(
      <MemoryRouter>
        <CustomerLogin />
      </MemoryRouter>
    );
 
    fireEvent.change(getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/Password:/i), { target: { value: 'testpass' } });
 
    fireEvent.click(getByRole('button', { name: /Login/i }));
 
    // Simulate successful login response
     // Confetti should be visible
  });
 
  test('shows error message on login failure', async () => {
    // Mock fetch to return an error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
 
    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <CustomerLogin />
      </MemoryRouter>
    );
 
    fireEvent.change(getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/Password:/i), { target: { value: 'testpass' } });
 
    fireEvent.click(getByRole('button', { name: /Login/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/Invalid username or password\./i)).toBeInTheDocument();
    });
  });
  test('shows confetti on successful login', async () => {
    const { getByLabelText, getByRole, findByText } = render(
      <MemoryRouter>
        <CustomerLogin />
      </MemoryRouter>
    );
 
    fireEvent.change(getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/Password:/i), { target: { value: 'testpass' } });
 
    // Simulate successful login response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('valid-token'),
      })
    );
 
    fireEvent.click(getByRole('button', { name: /Login/i }));
 
    // await waitFor(() => {
    //   expect(screen.getByText(/Confetti/i)).toBeInTheDocument();
    // });
  });