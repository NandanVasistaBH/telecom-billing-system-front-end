import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I view my monthly invoices?",
      answer: "You can view your invoices by logging in and going to Customer Dashboard.",
    },
    {
      question: "How can I pay my bill online?",
      answer: "Go to the 'Payments' section, select an invoice, and follow the steps to pay online.",
    },
    {
      question: "Can I download invoices as PDFs?",
      answer: "Yes, invoices can be downloaded from the 'Billing History' section.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support via the ContactUs section in your account. We offer support through phone and email.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, and RazorPay as options available via our payment gateway.",
    },
    {
      question: "Is my payment data secure?",
      answer: "All transactions are secured with industry-standard encryption methods.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleAnswer(index)}>
            <span>{faq.question}</span>
            <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
          </div>
          <div className={`faq-answer ${activeIndex === index ? "show" : ""}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
