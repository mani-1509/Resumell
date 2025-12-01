# Resumell Onboarding Components

This directory contains React/TypeScript component stubs for the Resumell onboarding flow.

## Components Overview

### Core Interactive Components

1. **Button** - Primary, secondary, and ghost button variants with loading states
2. **OAuthButton** - Google and LinkedIn OAuth authentication buttons
3. **ChipSelector** - Multi-select or single-select chip UI for preferences
4. **TypeaheadInput** - Autocomplete input with suggestions and keyboard navigation
5. **FileUploader** - Drag-and-drop file upload with progress tracking
6. **FormWizard** - Multi-step form navigation with progress tracking

### Feedback & Status Components

7. **ProgressCard** - Task cards with completion status and actions
8. **Toast** - Temporary notifications (success, error, warning, info)
9. **InlineError** - Contextual error/warning messages with action buttons
10. **SkeletonLoader** - Loading placeholders for better perceived performance
11. **Modal** - Dialog overlays with focus trapping and accessibility

## Installation & Setup

These components are designed for a React + TypeScript project. To use them:

1. **Install dependencies:**
   ```bash
   npm install react react-dom
   npm install --save-dev @types/react @types/react-dom typescript
   ```

2. **Import components:**
   ```typescript
   import { Button, ChipSelector, Toast } from './component-stubs';
   ```

3. **Use in your app:**
   ```tsx
   <Button
     label="Get Started"
     onClick={() => console.log('clicked')}
     variant="primary"
   />
   ```

## Component Props

### Button
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
}
```

### ChipSelector
```typescript
interface ChipSelectorProps {
  options: Array<{id: string, label: string, icon?: ReactNode}>;
  selected: string[];
  multi?: boolean;
  onChange: (selected: string[]) => void;
  minSelection?: number;
  maxSelection?: number;
}
```

### FileUploader
```typescript
interface FileUploaderProps {
  accept: string;        // e.g., '.pdf,.docx'
  maxSize: number;       // in bytes (10485760 = 10MB)
  onUpload: (file: File) => void;
  onParseError: (error: Error) => void;
}
```

### Modal
```typescript
interface ModalProps {
  title?: string;
  content: React.ReactNode;
  actions?: Array<{label: string, onClick: () => void, variant?: 'primary' | 'secondary'}>;
  onClose?: () => void;
  isOpen?: boolean;
}
```

## Styling

All components use **inline styles** for portability. The design system is based on:

- **Colors:** Neon blue/purple gradient accent, dark background, glassmorphism
- **Typography:** Inter font family, 400 and 600 weights
- **Spacing:** 4px base unit (4, 8, 12, 16, 24, 32, 40, 48, 64)
- **Animation:** 120-240ms for micro-interactions, respects `prefers-reduced-motion`

To customize, modify the inline style objects or extract them to a theme object.

## Accessibility

All components follow WCAG 2.1 AA standards:

- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus management and trapping (modals)
- ✅ Color contrast >= 4.5:1
- ✅ Screen reader announcements via `aria-live`

## Next Steps

1. **Integrate with backend:** Connect form submissions to API endpoints (see `onboarding-spec.json`)
2. **Add state management:** Use React Context or Redux for global state
3. **Unit tests:** Write Jest tests for each component
4. **E2E tests:** Use Playwright for full onboarding flow testing
5. **Figma sync:** Map component props to Figma design tokens

## Notes

- These are **stubs** with basic functionality for rapid prototyping
- Production implementation should include error boundaries, analytics, and proper form validation
- Consider extracting shared styles to a design system library
- Implement proper OAuth flows with backend integration
- Add telemetry hooks as specified in `onboarding-spec.json`
