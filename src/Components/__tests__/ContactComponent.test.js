import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactUs from '../ContactUs'; // Adjust the path as necessary
import TelecomBillingSystem from '../TelecomBillingSystem';
describe('ContactUs Component', () => {
  beforeEach(() => {
    render(<ContactUs />);
  });

//   test('renders the title', () => {
//     const title = screen.getByText(/get in touch/i);
//     expect(title).toBeInTheDocument();
//   });

  test('renders the introduction text', () => {
    const introText = screen.getByText(/want to get in touch\?/i);
    expect(introText).toBeInTheDocument();
  });

  test('renders the sales contact card', () => {
    const salesHeading = screen.getByText(/talk to sales/i);
    const salesDescription = screen.getByText(/interested in our plans\?/i);
    const salesLink = screen.getByText(/\+91 7671976676/i);

    expect(salesHeading).toBeInTheDocument();
    expect(salesDescription).toBeInTheDocument();
    expect(salesLink).toBeInTheDocument();
  });

  test('renders the customer support contact card', () => {
    const supportHeading = screen.getByText(/contact customer support/i);
    const supportDescription = screen.getByText(/sometimes you need a little help/i);
    const supportLink = screen.getByText(/telebillprosupport@company.com/i);

    expect(supportHeading).toBeInTheDocument();
    expect(supportDescription).toBeInTheDocument();
    expect(supportLink).toBeInTheDocument();
  });

  test('contains phone and chat icons', () => {
    const phoneIcon = screen.getByLabelText(/phone/i);
    const chatIcon = screen.getByLabelText(/chat/i);

    expect(phoneIcon).toBeInTheDocument();
    expect(chatIcon).toBeInTheDocument();
  });
});
