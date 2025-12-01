import React, { useState, useEffect, useRef } from 'react';

interface Suggestion {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

interface TypeaheadInputProps {
  suggestions: Suggestion[];
  onSelect: (item: Suggestion) => void;
  placeholder?: string;
  debounceMs?: number;
  ariaLabel?: string;
}

export const TypeaheadInput: React.FC<TypeaheadInputProps> = ({
  suggestions,
  onSelect,
  placeholder = 'Start typing...',
  debounceMs = 300,
  ariaLabel,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.length > 0) {
        const filtered = suggestions.filter(s =>
          s.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        setIsOpen(filtered.length > 0);
      } else {
        setFilteredSuggestions(suggestions);
        setIsOpen(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, suggestions, debounceMs]);

  const handleSelect = (suggestion: Suggestion) => {
    setInputValue(suggestion.label);
    setIsOpen(false);
    onSelect(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, filteredSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredSuggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsOpen(filteredSuggestions.length > 0)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-expanded={isOpen}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#FFFFFF',
          fontSize: '16px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      />
      {isOpen && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            background: 'rgba(15, 15, 26, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
            listStyle: 'none',
            padding: '8px',
            margin: 0,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              role="option"
              aria-selected={highlightedIndex === index}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
              style={{
                padding: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: highlightedIndex === index
                  ? 'rgba(99, 102, 241, 0.2)'
                  : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              {suggestion.icon}
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{suggestion.label}</div>
                {suggestion.description && (
                  <div style={{ color: '#A1A1AA', fontSize: '12px', marginTop: '2px' }}>
                    {suggestion.description}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
