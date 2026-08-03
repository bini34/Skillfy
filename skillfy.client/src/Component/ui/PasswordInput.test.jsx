import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordInput from './PasswordInput.jsx';

describe('PasswordInput', () => {
  it('renders as password type by default', () => {
    render(<PasswordInput id="pwd" />);
    expect(document.getElementById('pwd')).toHaveAttribute('type', 'password');
  });

  it('toggles to text when show button is clicked', async () => {
    render(<PasswordInput id="pwd2" />);
    const toggle = screen.getByRole('button', { name: /show password/i });
    await userEvent.click(toggle);
    expect(document.getElementById('pwd2')).toHaveAttribute('type', 'text');
  });

  it('toggle button label changes after click', async () => {
    render(<PasswordInput />);
    const toggle = screen.getByRole('button', { name: /show password/i });
    await userEvent.click(toggle);
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<PasswordInput error="Password is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Password is required');
  });

  it('sets aria-invalid when error', () => {
    render(<PasswordInput id="pwd3" error="Too short" />);
    expect(document.getElementById('pwd3')).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts user input', async () => {
    render(<PasswordInput id="pwd4" />);
    const input = document.getElementById('pwd4');
    await userEvent.type(input, 'Secret123!');
    expect(input).toHaveValue('Secret123!');
  });
});
