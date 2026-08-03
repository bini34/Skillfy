import Modal from './Modal.jsx';
import Button from './Button.jsx';
import { cn } from '../../lib/cn.js';

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title       = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  destructive  = false,
  loading      = false,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm" closeOnBackdrop={!loading}>
      {description && (
        <p className="text-sm text-gray-600 mb-6">{description}</p>
      )}
      <div className={cn('flex gap-3', destructive ? 'flex-row-reverse' : 'flex-row justify-end')}>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          {cancelLabel}
        </Button>
        <Button
          variant={destructive ? 'danger' : 'primary'}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
