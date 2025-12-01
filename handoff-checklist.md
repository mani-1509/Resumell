# Resumell Onboarding Handoff Checklist

## For Designers & Product Managers

This checklist ensures a smooth handoff from design to development for the Resumell onboarding flow.

---

### ✅ Design Completeness

- [ ] **All 8 screen frames finalized** (Splash, Auth, Prefs A/B/C, Profile, Walkthrough, Completion) for mobile (375px), tablet (768px), and desktop (1440px) breakpoints
- [ ] **Component library created** in Figma with all variants (Button, Input, ChipSelector, FileUploader, Modal, Toast, etc.) and states (default, hover, active, disabled, loading, error)
- [ ] **Design tokens documented** including colors (#6366F1, #8B5CF6, #0F0F1A), typography (Inter 400/600, sizes 12-28px), spacing (4px base scale), and effects (glassmorphism, gradients, shadows)

---

### ✅ Specifications & Documentation

- [ ] **Microcopy finalized** for all screens, buttons, hints, and error messages—reviewed for tone (friendly, slightly cheeky) and clarity (short sentences, action-focused)
- [ ] **Responsive behavior documented** with explicit notes on what collapses, stacks, hides, or resizes at each breakpoint (use annotations or Figma comments)
- [ ] **Animation specs provided** with duration (120-240ms micro, 400-600ms transitions), easing (cubic-bezier), delay, and `prefers-reduced-motion` fallbacks for logo fade, CTA pulse, modal entrance, etc.

---

### ✅ Accessibility & Compliance

- [ ] **Accessibility annotations added** for focus states (3px ring), ARIA labels (on all interactive elements), keyboard navigation order (tab sequence documented), and screen reader hints (for dynamic content like progress updates)
- [ ] **Color contrast verified** at 4.5:1 minimum for all text on backgrounds using Figma plugins (Stark, Contrast) or manual checks—especially text-secondary (#A1A1AA) on surface colors
- [ ] **Touch targets sized** at minimum 44×44px for mobile interactive elements (buttons, chips, radio buttons, file upload zones) per iOS Human Interface Guidelines

---

### ✅ Developer Handoff Assets

- [ ] **Icons exported** as SVG (with outlined strokes, correct viewBox) and PNG @1x/@2x for all 20+ icons (logo variants, OAuth badges, chip icons, navigation arrows, success/error states)—organized in `assets/icons/` folder with clear naming (`icon-[name]-[size].svg`)

---

### ✅ Review & Validation

- [ ] **Design review completed** with PM, frontend lead, and accessibility specialist—capturing feedback in Figma comments or tickets and resolving blockers (missing states, unclear interactions, edge cases)

---

## Ready to Ship? 🚀

When all checkboxes are complete:
1. **Export Figma file** using instructions in `figma-export-instructions.md`
2. **Share with developers:**
   - Figma link with Dev Mode enabled
   - `onboarding-spec.json` (source of truth)
   - `component-stubs/` directory (React boilerplate)
   - `tests-skeleton.md` (testing requirements)
3. **Schedule kickoff meeting** to walk through flows, answer questions, and align on sprint goals

---

## Questions or Blockers?

- **Design clarifications:** Reference `onboarding-spec.json` sections for detailed layouts, element props, and state transitions
- **Technical feasibility:** Consult with frontend lead—some animations/effects may need web platform adjustments (e.g., backdrop-filter support, reduced motion detection)
- **Accessibility questions:** Review WCAG 2.1 AA guidelines and run designs through automated checkers before handoff

---

**Last Updated:** December 2, 2025  
**Owned By:** Design & Product Team  
**Next Review:** After developer feedback session
