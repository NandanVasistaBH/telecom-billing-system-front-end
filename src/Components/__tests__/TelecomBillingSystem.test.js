import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
 
// import '@testing-library/jest-dom/extend-expect';
import TelecomBillingSystem from '../TelecomBillingSystem';
// Mock modules
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <a>{children}</a>,
}));
 
describe('TelecomBillingSystem', () => {
  test('renders without crashing and shows initial UI', () => {
    render(
      <MemoryRouter>
        <TelecomBillingSystem />
      </MemoryRouter>
    );
 
    // Check if the component renders correctly
    expect(screen.getByText('TeleBillPro')).toBeInTheDocument();
    const customerButton = screen.getByRole('button', { name: /Customer/i });
   
    fireEvent.click(customerButton);
 
    expect(customerButton).toHaveClass('active');
    const supplierButton = screen.getByRole('button', { name: /Supplier/i });
   
   
    fireEvent.click(supplierButton);
 
 
    expect(supplierButton).toHaveClass('active');
    const AdminButton = screen.getByRole('button', { name: /Admin/i });
   
 
    fireEvent.click(AdminButton);
 
    expect(AdminButton).toHaveClass('active');
   
  });
 
  test('selects a role and displays corresponding options', () => {
    render(
      <MemoryRouter>
        <TelecomBillingSystem />
      </MemoryRouter>
    );
 
    // Select Customer role
    fireEvent.click(screen.getByText('Customer'));
 
    // Check if customer options are visible
    expect(screen.getByText('View Plans')).toBeInTheDocument();
 
    expect(screen.getByText('Account')).toBeInTheDocument();
  });
 
  test('opens and closes dropdowns correctly', () => {
    render(
      <MemoryRouter>
        <TelecomBillingSystem />
      </MemoryRouter>
    );
 
    // Select Customer role
    fireEvent.click(screen.getByText('Customer'));
 
    // Open View Plans dropdown
    fireEvent.click(screen.getByText('View Plans'));
    expect(screen.getByText('Prepaid')).toBeInTheDocument();
    expect(screen.getByText('Postpaid')).toBeInTheDocument();
 
    // Close View Plans dropdown
    fireEvent.click(screen.getByText('View Plans'));
    expect(screen.queryByText('Prepaid')).toBeNull();
    expect(screen.queryByText('Postpaid')).toBeNull();
  });
 
  test('navigates to the correct page on role selection', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);
 
    render(
      <MemoryRouter>
        <TelecomBillingSystem />
      </MemoryRouter>
    );
 
    // Select Customer role
    fireEvent.click(screen.getByText('Customer'));
 
    // Open View Plans dropdown and select Prepaid
    fireEvent.click(screen.getByText('View Plans'));
    fireEvent.click(screen.getByText('Prepaid'));
 
    // Check if navigate was called correctly
    expect(navigate).toHaveBeenCalledWith('/prepaid');
  });
 
 
  test('navigates to login pages for Supplier and Admin roles', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);
 
    render(
      <MemoryRouter>
        <TelecomBillingSystem />
      </MemoryRouter>
    );
 
    // Select Supplier role
    fireEvent.click(screen.getByText('Supplier'));
    expect(navigate).toHaveBeenCalledWith('/supplierlogin');
 
    // Select Admin role
    fireEvent.click(screen.getByText('Admin'));
    expect(navigate).toHaveBeenCalledWith('/adminlogin');
  });
 
});