import React from 'react';

interface ContextMenuProps {
  row: Record<string, any>;
  column: { key: string };
  onClose: () => void;
  onDeleteRow: () => void;
  onCopyCell: () => void;
}

export function ContextMenu({ onClose, onDeleteRow, onCopyCell }: ContextMenuProps) {
  const menuItems = [
    { label: 'Copy cell', action: onCopyCell },
    { label: 'Delete row', action: onDeleteRow }
  ];

  return (
    <div className="absolute bg-white shadow-lg rounded-lg py-1 z-50 min-w-[160px] border">
      {menuItems.map(({ label, action }) => (
        <button
          key={label}
          onClick={() => {
            action();
            onClose();
          }}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
