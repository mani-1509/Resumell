import React from 'react';

interface ChipOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface ChipSelectorProps {
  options: ChipOption[];
  selected: string[];
  multi?: boolean;
  onChange: (selected: string[]) => void;
  minSelection?: number;
  maxSelection?: number;
}

export const ChipSelector: React.FC<ChipSelectorProps> = ({
  options,
  selected,
  multi = false,
  onChange,
  minSelection = 0,
  maxSelection,
}) => {
  const handleChipClick = (chipId: string) => {
    if (multi) {
      if (selected.includes(chipId)) {
        const newSelected = selected.filter(id => id !== chipId);
        if (newSelected.length >= minSelection) {
          onChange(newSelected);
        }
      } else {
        if (!maxSelection || selected.length < maxSelection) {
          onChange([...selected, chipId]);
        }
      }
    } else {
      onChange([chipId]);
    }
  };

  return (
    <div
      role="group"
      aria-label="Selection options"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <button
            key={option.id}
            onClick={() => handleChipClick(option.id)}
            role={multi ? 'checkbox' : 'radio'}
            aria-checked={isSelected}
            style={{
              padding: '10px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600,
              border: '2px solid',
              borderColor: isSelected ? '#6366F1' : 'rgba(255, 255, 255, 0.1)',
              background: isSelected
                ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 120ms ease',
            }}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
