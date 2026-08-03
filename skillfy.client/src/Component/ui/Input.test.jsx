import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input.jsx';

describe('Input', () => {
  it('renders label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('associates label with input via id', () => {
    render(<Input label="Email" id="email-field" />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute('id', 'email-field');
  });

  it('shows error message with role=alert', () => {
    render(<Input label="Email" error="Invalid email" />);
    const errorEl = screen.getByRole('alert');
    expect(errorEl).toHaveTextContent('Invalid email');
  });

  it('adds aria-invalid when error is set', () => {
    render(<Input label="Email" error="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows required indicator when required', () => {
    render(<Input label="Email" required />);
    expect(screen.getByText('(required)')).toBeInTheDocument();
  });

  it('shows description text', () => {
    render(<Input label="Email" description="We will never share your email" />);
    expect(screen.getByText(/never share/i)).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText(/email/i);
    await userEvent.type(input, 'hello@example.com');
    expect(input).toHaveValue('hello@example.com');
  });
});
