# Test Suite Skeleton for Resumell Onboarding

This document outlines the testing strategy and provides skeleton test cases for the Resumell onboarding flow.

## Testing Stack

### Unit & Component Tests
- **Framework:** Jest
- **React Testing:** React Testing Library
- **Coverage Target:** 80%+

### E2E Tests
- **Framework:** Playwright
- **Browsers:** Chromium, Firefox, WebKit
- **Coverage:** Critical user paths

### Accessibility Tests
- **Tool:** axe-core via jest-axe
- **Standard:** WCAG 2.1 AA

---

## Directory Structure

```
resumell/
├── __tests__/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── ChipSelector.test.tsx
│   │   ├── FileUploader.test.tsx
│   │   ├── Modal.test.tsx
│   │   ├── OAuthButton.test.tsx
│   │   ├── TypeaheadInput.test.tsx
│   │   └── ... (other component tests)
│   ├── screens/
│   │   ├── Splash.test.tsx
│   │   ├── AuthChoice.test.tsx
│   │   ├── QuickPreferences.test.tsx
│   │   ├── QuickProfile.test.tsx
│   │   ├── Walkthrough.test.tsx
│   │   └── Completion.test.tsx
│   ├── integration/
│   │   ├── onboarding-flow.test.tsx
│   │   └── api-integration.test.tsx
│   └── utils/
│       ├── test-utils.tsx
│       └── mock-data.ts
├── e2e/
│   ├── onboarding-complete.spec.ts
│   ├── onboarding-skip.spec.ts
│   ├── oauth-flow.spec.ts
│   ├── file-upload.spec.ts
│   └── accessibility.spec.ts
├── jest.config.js
└── playwright.config.ts
```

---

## Jest Configuration

### jest.config.js
```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|@expo)/)',
  ],
  collectCoverageFrom: [
    'component-stubs/**/*.{ts,tsx}',
    'screens/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### jest.setup.js
```javascript
import '@testing-library/jest-native/extend-expect';
import 'jest-axe/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

// Global test utilities
global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));
```

---

## Unit Tests

### Button.test.tsx
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../component-stubs/Button';

describe('Button Component', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <Button label="Click me" onClick={jest.fn()} />
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label="Click me" onClick={handleClick} />
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label="Click me" onClick={handleClick} disabled={true} />
    );
    const button = getByText('Click me').closest('button');
    expect(button).toBeDisabled();
  });

  it('shows loading state', () => {
    const { getByText } = render(
      <Button label="Click me" onClick={jest.fn()} loading={true} />
    );
    expect(getByText('⏳')).toBeTruthy();
  });

  it('applies correct variant styles', () => {
    const { getByText } = render(
      <Button label="Primary" onClick={jest.fn()} variant="primary" />
    );
    const button = getByText('Primary').closest('button');
    expect(button).toHaveStyle({ background: expect.stringContaining('gradient') });
  });
});
```

### ChipSelector.test.tsx
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ChipSelector } from '../component-stubs/ChipSelector';

describe('ChipSelector Component', () => {
  const mockOptions = [
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' },
  ];

  it('renders all options', () => {
    const { getByText } = render(
      <ChipSelector options={mockOptions} selected={[]} onChange={jest.fn()} />
    );
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
    expect(getByText('Option 3')).toBeTruthy();
  });

  it('allows multi-select when multi is true', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <ChipSelector 
        options={mockOptions} 
        selected={[]} 
        onChange={handleChange} 
        multi={true}
      />
    );
    
    fireEvent.click(getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith(['1']);
    
    fireEvent.click(getByText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith(['2']);
  });

  it('enforces maxSelection limit', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <ChipSelector 
        options={mockOptions} 
        selected={['1', '2']} 
        onChange={handleChange} 
        multi={true}
        maxSelection={2}
      />
    );
    
    fireEvent.click(getByText('Option 3'));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
```

### FileUploader.test.tsx
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FileUploader } from '../component-stubs/FileUploader';

describe('FileUploader Component', () => {
  it('renders upload area', () => {
    const { getByText } = render(
      <FileUploader 
        accept=".pdf,.docx" 
        maxSize={10485760} 
        onUpload={jest.fn()} 
        onParseError={jest.fn()} 
      />
    );
    expect(getByText(/Drop your resume here/i)).toBeTruthy();
  });

  it('validates file size', () => {
    const onParseError = jest.fn();
    const { container } = render(
      <FileUploader 
        accept=".pdf" 
        maxSize={1000} 
        onUpload={jest.fn()} 
        onParseError={onParseError} 
      />
    );
    
    const file = new File(['content'], 'large.pdf', { type: 'application/pdf' });
    Object.defineProperty(file, 'size', { value: 10000 });
    
    const input = container.querySelector('input[type="file"]');
    fireEvent.change(input!, { target: { files: [file] } });
    
    expect(onParseError).toHaveBeenCalled();
  });

  it('validates file type', () => {
    const onParseError = jest.fn();
    const { container } = render(
      <FileUploader 
        accept=".pdf" 
        maxSize={10485760} 
        onUpload={jest.fn()} 
        onParseError={onParseError} 
      />
    );
    
    const file = new File(['content'], 'file.txt', { type: 'text/plain' });
    const input = container.querySelector('input[type="file"]');
    fireEvent.change(input!, { target: { files: [file] } });
    
    expect(onParseError).toHaveBeenCalled();
  });
});
```

---

## Screen Tests

### Splash.test.tsx
```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import SplashScreen from '../screens/Splash';

describe('Splash Screen', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<SplashScreen />);
    expect(getByText('Build. Upgrade. Get hired.')).toBeTruthy();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SplashScreen />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('displays primary and secondary CTAs', () => {
    const { getByText } = render(<SplashScreen />);
    expect(getByText('Get Started')).toBeTruthy();
    expect(getByText('Preview')).toBeTruthy();
  });

  it('tracks onboarding_started event on mount', () => {
    const trackEvent = jest.fn();
    render(<SplashScreen trackEvent={trackEvent} />);
    expect(trackEvent).toHaveBeenCalledWith('onboarding_started', expect.any(Object));
  });
});
```

### QuickPreferences.test.tsx
```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import QuickPreferencesScreen from '../screens/QuickPreferences';

describe('Quick Preferences Screen', () => {
  it('renders step 1 initially', () => {
    const { getByText } = render(<QuickPreferencesScreen />);
    expect(getByText('What brings you here?')).toBeTruthy();
  });

  it('advances to step 2 when continue is clicked', async () => {
    const { getByText } = render(<QuickPreferencesScreen />);
    
    // Select at least one goal
    fireEvent.click(getByText('Build new resume'));
    
    // Click continue
    fireEvent.click(getByText('Continue'));
    
    await waitFor(() => {
      expect(getByText('Tell us about your goals')).toBeTruthy();
    });
  });

  it('prevents advancing without required selections', () => {
    const { getByText, queryByText } = render(<QuickPreferencesScreen />);
    
    const continueButton = getByText('Continue');
    fireEvent.click(continueButton);
    
    // Should still be on step 1
    expect(queryByText('What brings you here?')).toBeTruthy();
  });

  it('allows going back to previous step', async () => {
    const { getByText, getByLabelText } = render(<QuickPreferencesScreen />);
    
    // Complete step 1
    fireEvent.click(getByText('Build new resume'));
    fireEvent.click(getByText('Continue'));
    
    await waitFor(() => {
      expect(getByText('Tell us about your goals')).toBeTruthy();
    });
    
    // Go back
    fireEvent.click(getByLabelText('Go back to previous step'));
    
    await waitFor(() => {
      expect(getByText('What brings you here?')).toBeTruthy();
    });
  });
});
```

---

## Integration Tests

### onboarding-flow.test.tsx
```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingFlow from '../OnboardingFlow';

describe('Complete Onboarding Flow', () => {
  it('completes full onboarding journey', async () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <OnboardingFlow />
      </NavigationContainer>
    );
    
    // Splash
    expect(getByText('Build. Upgrade. Get hired.')).toBeTruthy();
    fireEvent.click(getByText('Get Started'));
    
    // Auth
    await waitFor(() => {
      expect(getByText("Let's get you started")).toBeTruthy();
    });
    fireEvent.click(getByText('Continue with Google'));
    
    // Preferences Step 1
    await waitFor(() => {
      expect(getByText('What brings you here?')).toBeTruthy();
    });
    fireEvent.click(getByText('Improve existing resume'));
    fireEvent.click(getByText('Continue'));
    
    // Preferences Step 2
    await waitFor(() => {
      expect(getByPlaceholderText('e.g., Frontend Engineer, Product Designer')).toBeTruthy();
    });
    fireEvent.changeText(
      getByPlaceholderText('e.g., Frontend Engineer, Product Designer'),
      'Frontend Engineer'
    );
    fireEvent.click(getByText('1-3 years'));
    fireEvent.click(getByText('Continue'));
    
    // Preferences Step 3
    await waitFor(() => {
      expect(getByText('Upload resume')).toBeTruthy();
    });
    fireEvent.click(getByText('Start from scratch'));
    fireEvent.click(getByText('Continue'));
    
    // Verify completion
    await waitFor(() => {
      expect(getByText("You're all set!")).toBeTruthy();
    });
  });
});
```

---

## Playwright E2E Tests

### playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:19006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run web',
    url: 'http://localhost:19006',
    reuseExistingServer: !process.env.CI,
  },
});
```

### onboarding-complete.spec.ts
```typescript
import { test, expect } from '@playwright/test';

test.describe('Complete Onboarding Flow', () => {
  test('user completes onboarding successfully', async ({ page }) => {
    await page.goto('/');
    
    // Splash screen
    await expect(page.getByText('Build. Upgrade. Get hired.')).toBeVisible();
    await page.getByRole('button', { name: 'Get Started' }).click();
    
    // Auth screen
    await expect(page.getByText("Let's get you started")).toBeVisible();
    await page.getByRole('button', { name: 'Continue with Google' }).click();
    
    // Mock OAuth success
    await page.evaluate(() => {
      window.postMessage({ type: 'oauth_success', token: 'mock_token' }, '*');
    });
    
    // Preferences - Step A
    await expect(page.getByText('What brings you here?')).toBeVisible();
    await page.getByRole('checkbox', { name: 'Improve existing resume' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Preferences - Step B
    await expect(page.getByText('Tell us about your goals')).toBeVisible();
    await page.getByPlaceholder('e.g., Frontend Engineer').fill('Frontend Engineer');
    await page.getByRole('radio', { name: '1-3 years' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Preferences - Step C
    await expect(page.getByText('How would you like to start?')).toBeVisible();
    await page.getByText('Import from LinkedIn').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Profile (skip)
    await expect(page.getByText('Complete your profile')).toBeVisible();
    await page.getByRole('link', { name: 'Skip for now' }).click();
    
    // Walkthrough
    await expect(page.getByText("Let's get you set up")).toBeVisible();
    await page.getByRole('button', { name: 'Upload now' }).click();
    
    // Verify telemetry
    const telemetryEvents = await page.evaluate(() => window._analyticsEvents);
    expect(telemetryEvents).toContainEqual(
      expect.objectContaining({ event: 'onboarding_completed' })
    );
  });
});
```

### accessibility.spec.ts
```typescript
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
  });

  test('splash screen has no accessibility violations', async ({ page }) => {
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });

  test('auth screen keyboard navigation works', async ({ page }) => {
    await page.getByRole('button', { name: 'Get Started' }).click();
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('aria-label', /Continue with Google/i);
    
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('aria-label', /Continue with LinkedIn/i);
    
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText(/Sign up with Email/i);
  });

  test('modal traps focus correctly', async ({ page }) => {
    // Navigate to completion modal
    await page.evaluate(() => {
      localStorage.setItem('onboarding_state', JSON.stringify({ completed: true }));
    });
    await page.goto('/onboarding/complete');
    
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Tab should stay within modal
    await page.keyboard.press('Tab');
    const firstFocusable = page.locator(':focus');
    
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
    }
    
    const currentFocus = page.locator(':focus');
    expect(await modal.locator(':focus').count()).toBeGreaterThan(0);
  });
});
```

---

## Running Tests

### Install Dependencies
```bash
npm install --save-dev @testing-library/react @testing-library/jest-native jest-axe
npm install --save-dev @playwright/test axe-playwright
```

### Run Commands
```bash
# Unit tests
npm test

# Unit tests with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# E2E tests
npx playwright test

# E2E tests with UI
npx playwright test --ui

# Specific test file
npm test Button.test.tsx
```

---

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Coverage Requirements

- **Unit Tests:** 80%+ for components and utilities
- **Integration Tests:** Cover all critical user paths
- **E2E Tests:** Complete onboarding flow + edge cases
- **Accessibility:** Zero critical violations

---

## Test Maintenance

- Update tests when specs change in `onboarding-spec.json`
- Run tests before every commit (use git hooks)
- Review failed tests in CI before merging
- Keep test data in sync with mock API responses
