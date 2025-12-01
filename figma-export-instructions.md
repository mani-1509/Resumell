# Figma Export Instructions for Resumell Onboarding

This document provides detailed guidelines for exporting Figma designs to match the React component implementation.

## Design File Structure

### Top-Level Organization
```
Resumell Onboarding [File]
├── 📱 Screens [Page]
├── 🎨 Components [Page]
├── 🎭 Icons & Assets [Page]
└── 📐 Design Tokens [Page]
```

## Screen Frames (in "Screens" Page)

### Naming Convention
All screen frames should follow: `[ScreenID]-[Breakpoint]-[State]`

### Required Frames

#### 1. Splash Screen
- **Frame Names:**
  - `splash-mobile-initial` (375×812px)
  - `splash-tablet-initial` (768×1024px)
  - `splash-desktop-initial` (1440×900px)
  - `splash-mobile-slow-network` (skeleton state)
  
- **Layers:**
  - `logo` (component instance: Logo/Animated)
  - `tagline` (text: "Build. Upgrade. Get hired.")
  - `subtitle` (text: paragraph)
  - `cta-primary` (component: Button/Primary)
  - `cta-secondary` (component: Button/Ghost)

#### 2. Auth Choice
- **Frame Names:**
  - `auth-mobile-initial` (375×812px)
  - `auth-tablet-initial` (768×1024px)
  - `auth-desktop-initial` (1440×900px)
  - `auth-mobile-error` (with error state)
  
- **Layers:**
  - `header` (component: Header/Simple with back button)
  - `heading` (text: "Let's get you started")
  - `oauth-google` (component: Button/OAuth/Google)
  - `oauth-linkedin` (component: Button/OAuth/LinkedIn)
  - `divider` (with "or" text)
  - `email-signup` (component: Button/Secondary)
  - `privacy-note` (text with shield icon)

#### 3. Quick Preferences - Step A
- **Frame Names:**
  - `prefs-step-a-mobile` (375×812px)
  - `prefs-step-a-tablet` (768×1024px)
  - `prefs-step-a-desktop` (1440×900px)
  
- **Layers:**
  - `wizard-header` (component: Header/Wizard, step 1/3)
  - `heading` (text: "What brings you here?")
  - `hint` (text: microcopy)
  - `chip-selector` (component: ChipSelector with 4 options)
  - `wizard-footer` (component: Footer/Wizard)

#### 4. Quick Preferences - Step B
- **Frame Names:**
  - `prefs-step-b-mobile` (375×812px)
  - `prefs-step-b-tablet` (768×1024px)
  - `prefs-step-b-desktop` (1440×900px)
  
- **Layers:**
  - `wizard-header` (step 2/3)
  - `desired-role` (component: Input/Typeahead)
  - `target-company` (component: Input/Text)
  - `experience-level` (component: RadioGroup)
  - `wizard-footer`

#### 5. Quick Preferences - Step C
- **Frame Names:**
  - `prefs-step-c-mobile` (375×812px)
  - `prefs-step-c-tablet` (768×1024px)
  - `prefs-step-c-desktop` (1440×900px)
  - `prefs-step-c-upload-active` (with file uploader visible)
  
- **Layers:**
  - `wizard-header` (step 3/3)
  - `resume-source-cards` (component: CardSelector/Grid)
  - `file-uploader` (component: FileUploader, visible state)
  - `wizard-footer`

#### 6. Quick Profile
- **Frame Names:**
  - `profile-mobile` (375×812px)
  - `profile-tablet` (768×1024px)
  - `profile-desktop` (1440×900px)
  
- **Layers:**
  - `header` (component: Header/Simple)
  - `name-input` (component: Input/Text)
  - `email-input` (component: Input/Email, disabled variant)
  - `location-input` (component: Input/Text)
  - `skills-input` (component: Input/Tags)
  - `privacy-toggle` (component: Toggle)
  - `cta-save` (component: Button/Primary)

#### 7. Walkthrough
- **Frame Names:**
  - `walkthrough-mobile` (375×812px)
  - `walkthrough-tablet` (768×1024px)
  - `walkthrough-desktop` (1440×900px)
  - `walkthrough-desktop-complete` (all tasks done)
  
- **Layers:**
  - `header` (component: Header/Simple with close)
  - `progress-bar` (component: ProgressBar)
  - `checklist-cards` (3× component: ProgressCard)
  - `cta-later` (text link)

#### 8. Completion Modal
- **Frame Names:**
  - `completion-mobile` (375×812px)
  - `completion-tablet` (768×1024px)
  - `completion-desktop` (1440×900px)
  
- **Layers:**
  - `modal-overlay` (component: Modal/Overlay)
  - `modal-content` (component: Modal/Content)
  - `celebration-icon` (64×64px check circle)
  - `tip-card` (component: Card/Tip)
  - `cta-dashboard` (component: Button/Primary)
  - `cta-analysis` (component: Button/Secondary)

---

## Component Library (in "Components" Page)

### Component Naming Convention
`[ComponentName]/[Variant]/[State]`

### Required Components

#### Buttons
- `Button/Primary/Default`
- `Button/Primary/Hover`
- `Button/Primary/Active`
- `Button/Primary/Disabled`
- `Button/Primary/Loading`
- `Button/Secondary/Default`
- `Button/Secondary/Hover`
- `Button/Ghost/Default`
- `Button/OAuth/Google`
- `Button/OAuth/LinkedIn`

**Properties to expose:**
- `label` (text)
- `fullWidth` (boolean)
- `icon` (instance swap - optional)

#### Inputs
- `Input/Text/Default`
- `Input/Text/Focused`
- `Input/Text/Error`
- `Input/Text/Disabled`
- `Input/Typeahead/Default`
- `Input/Typeahead/Open` (with suggestions dropdown)
- `Input/Email/Default`
- `Input/Tags/Default`
- `Input/Tags/WithTags`

**Properties:**
- `label` (text)
- `placeholder` (text)
- `value` (text)
- `error` (boolean)
- `errorMessage` (text)

#### Selectors
- `ChipSelector/MultiSelect`
- `ChipSelector/SingleSelect`
- `Chip/Unselected`
- `Chip/Selected`
- `RadioGroup/Vertical`
- `RadioButton/Unselected`
- `RadioButton/Selected`
- `CardSelector/Grid`
- `CardSelector/Card/Default`
- `CardSelector/Card/Selected`

#### Upload
- `FileUploader/Idle`
- `FileUploader/DragOver`
- `FileUploader/Uploading` (with progress bar)
- `FileUploader/Success`
- `FileUploader/Error`

**Properties:**
- `progress` (number 0-100)
- `fileName` (text)
- `fileSize` (text)

#### Feedback
- `Toast/Success`
- `Toast/Error`
- `Toast/Warning`
- `Toast/Info`
- `InlineError/Error`
- `InlineError/Warning`
- `ProgressCard/Incomplete`
- `ProgressCard/InProgress`
- `ProgressCard/Complete`
- `ProgressBar/Default`

#### Layout
- `Modal/Overlay`
- `Modal/Content`
- `Modal/Small`
- `Modal/Large`
- `Header/Simple`
- `Header/Wizard`
- `Footer/Wizard`

#### Loading
- `SkeletonLoader/Splash`
- `SkeletonLoader/Card`
- `SkeletonLoader/Text`

---

## Icons & Assets (in "Icons & Assets" Page)

### Icon Naming: `icon-[name]-[size]`

#### Required Icons (24×24px default)
- `icon-logo-120` (animated logo, 120×120px)
- `icon-logo-96`
- `icon-logo-80`
- `icon-google-20`
- `icon-linkedin-20`
- `icon-shield-16`
- `icon-document-add-24`
- `icon-sparkles-24`
- `icon-compass-24`
- `icon-chat-bubble-24`
- `icon-code-24`
- `icon-palette-24`
- `icon-chart-24`
- `icon-briefcase-24`
- `icon-upload-48`
- `icon-linkedin-48`
- `icon-document-48`
- `icon-map-24`
- `icon-check-circle-64`
- `icon-lightbulb-24`

**Export:** SVG, 1x and 2x PNG

#### Illustrations
- `illustration-confetti` (animated confetti effect)
- `illustration-empty-state`

---

## Design Tokens (in "Design Tokens" Page)

Create a single frame: `design-tokens-reference`

### Color Tokens
Create color swatches with exact names:
- `color/primary` (#6366F1)
- `color/accent` (#8B5CF6)
- `color/accent-gradient` (linear 135deg)
- `color/background` (#0F0F1A)
- `color/surface` (rgba(255, 255, 255, 0.05))
- `color/surface-hover` (rgba(255, 255, 255, 0.08))
- `color/text` (#FFFFFF)
- `color/text-secondary` (#A1A1AA)
- `color/success` (#10B981)
- `color/error` (#EF4444)
- `color/warning` (#F59E0B)

### Typography Tokens
Create text style examples:
- `typography/h1` (Inter 600, 28px, line-height 1.2)
- `typography/h2` (Inter 600, 24px, line-height 1.3)
- `typography/h3` (Inter 600, 20px, line-height 1.4)
- `typography/body` (Inter 400, 16px, line-height 1.5)
- `typography/small` (Inter 400, 14px, line-height 1.4)
- `typography/tiny` (Inter 400, 12px, line-height 1.3)

### Spacing Tokens
Create rectangle examples labeled:
- `spacing/xs` (4px)
- `spacing/sm` (8px)
- `spacing/md` (12px)
- `spacing/lg` (16px)
- `spacing/xl` (24px)
- `spacing/2xl` (32px)
- `spacing/3xl` (40px)
- `spacing/4xl` (48px)
- `spacing/5xl` (64px)

### Border Radius Tokens
- `radius/sm` (4px)
- `radius/md` (8px)
- `radius/lg` (12px)
- `radius/xl` (16px)
- `radius/full` (9999px)

### Shadow Tokens
- `shadow/sm` (0 2px 8px rgba(0,0,0,0.1))
- `shadow/md` (0 10px 40px rgba(0,0,0,0.3))
- `shadow/lg` (0 20px 60px rgba(0,0,0,0.5))

---

## Export Settings

### For Screens (Design Handoff)
1. Select all screen frames
2. Export as PNG @2x for visual reference
3. Use Figma's "Dev Mode" to generate code snippets
4. Copy CSS/spacing values for developer handoff

### For Components
1. Create component variants for all states
2. Expose properties using Figma component properties
3. Publish to team library
4. Export component documentation using Figma plugins (e.g., "Component Docs")

### For Icons
1. Flatten vector shapes
2. Export as SVG with "Outline stroke" enabled
3. Export PNG @1x and @2x for fallbacks
4. Ensure viewBox is set correctly (e.g., `0 0 24 24`)

### For Developers
Use Figma plugins to streamline export:
- **Figma Tokens** - Export design tokens as JSON
- **Anima** - Generate React code from designs
- **Similayer** - Batch export with consistent naming

---

## Code Connect Mapping

Map Figma components to React components:

| Figma Component | React Component | File Path |
|----------------|----------------|-----------|
| `Button/Primary` | `<Button variant="primary">` | `component-stubs/Button.tsx` |
| `Button/OAuth/Google` | `<OAuthButton provider="google">` | `component-stubs/OAuthButton.tsx` |
| `ChipSelector` | `<ChipSelector>` | `component-stubs/ChipSelector.tsx` |
| `Input/Typeahead` | `<TypeaheadInput>` | `component-stubs/TypeaheadInput.tsx` |
| `FileUploader` | `<FileUploader>` | `component-stubs/FileUploader.tsx` |
| `Modal` | `<Modal>` | `component-stubs/Modal.tsx` |
| `Toast` | `<Toast>` | `component-stubs/Toast.tsx` |
| `ProgressCard` | `<ProgressCard>` | `component-stubs/ProgressCard.tsx` |

---

## Handoff Checklist for Designers

- [ ] All 8 screen frames created for mobile, tablet, desktop
- [ ] All component variants created with states
- [ ] Design tokens documented in separate page
- [ ] Icons exported as SVG + PNG
- [ ] Component properties exposed (labels, states, etc.)
- [ ] Accessibility annotations added (focus states, ARIA labels)
- [ ] Responsive behavior documented (what collapses/hides)
- [ ] Animation specs documented (duration, easing)
- [ ] Microcopy finalized and reviewed
- [ ] Design review completed with PM and developers

---

## Developer Integration

### Using Exported Designs
1. Import SVG icons into `resumell/assets/icons/`
2. Extract color/typography tokens to `resumell/constants/theme.ts`
3. Map Figma frames to React screen components
4. Reference spacing values from design tokens
5. Implement animations matching Figma prototype specs

### Figma API Integration (Advanced)
For automated sync, use Figma REST API:
```javascript
// Fetch file data
const response = await fetch(
  `https://api.figma.com/v1/files/${fileKey}`,
  { headers: { 'X-Figma-Token': FIGMA_TOKEN } }
);
```

---

## Questions or Issues?

If designs don't match component specs, refer to `onboarding-spec.json` as the source of truth for:
- Screen structure and elements
- Component props and states
- Responsive behavior
- Accessibility requirements

Contact: Design team lead or reference the spec at `Resumell/onboarding-spec.json`
