import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal.jsx';

describe('Modal', () => {
  it('does not render when open=false', () => {
    render(<Modal open={false} onClose={vi.fn()} title="Test"><p>Content</p></Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open=true', () => {
    render(<Modal open onClose={vi.fn()} title="Confirm"><p>Are you sure?</p></Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows the title', () => {
    render(<Modal open onClose={vi.fn()} title="Delete course"><p>Body</p></Modal>);
    expect(screen.getByText('Delete course')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Modal open onClose={vi.fn()} title="Test"><p>Modal body content</p></Modal>);
    expect(screen.getByText('Modal body content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Test"><p>Body</p></Modal>);
    await userEvent.click(screen.getByRole('button', { name: /close dialog/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Test"><p>Body</p></Modal>);
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has aria-modal attribute', () => {
    render(<Modal open onClose={vi.fn()} title="Test"><p>Body</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});
