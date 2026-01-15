# FACODI Accessibility Roadmap (WCAG 2.1 AA Compliance)

## Current Status

✅ **Partial Compliance** - Level A mostly achieved, need Level AA improvements

### What's Already Good
- [x] Skip-to-content link (visually-hidden-focusable)
- [x] Semantic HTML5 structure
- [x] ARIA labels on navigation
- [x] Role="main" on main content
- [x] Language attribute on HTML
- [x] Mobile responsive (accessible on small screens)
- [x] Keyboard navigation working (tab through links)

### What Needs Improvement

| Issue | Level | Priority | Impact |
|-------|-------|----------|--------|
| Focus indicators not visible | A | High | Keyboard users can't see where they are |
| Missing ARIA landmarks | A | High | Screen readers can't navigate sections |
| Insufficient color contrast | AA | High | Low vision users struggle |
| No form labels on language selector | A | High | Can't identify form fields |
| Missing alt text on images | A | Medium | Images not described |
| No heading hierarchy consistency | A | Medium | Screen readers can't navigate structure |
| Links not descriptive | AA | Medium | "Click here" instead of context |
| No error descriptions on forms | A | Low | Forms not usable |

---

## Phase 2 Implementation Plan

### 1. CSS Focus Indicators ✅ TODO

Add to `assets/css/facodi.css`:

```css
/* Visible focus indicators for keyboard navigation */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid #0d6efd;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Skip to content link */
a.visually-hidden-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### 2. Semantic Landmarks ✅ TODO

Update `layouts/_default/baseof.html`:

```html
<body>
  <a class="visually-hidden-focusable" href="#main-content">
    {{ i18n "common.skipToContent" }}
  </a>
  
  <header role="banner">
    <!-- Navigation here -->
  </header>
  
  <nav role="navigation" aria-label="Main">
    <!-- Nav links -->
  </nav>
  
  <main id="main-content" role="main">
    <!-- Page content -->
  </main>
  
  <aside role="complementary">
    <!-- Sidebar if present -->
  </aside>
  
  <footer role="contentinfo">
    <!-- Footer -->
  </footer>
</body>
```

### 3. Color Contrast Review ⏳ TODO

**Current tokens to audit:**
- Primary colors (buttons, links)
- Text on backgrounds
- Badges and labels
- Warning/error messages

**WCAG AA requires:**
- Normal text: 4.5:1 ratio
- Large text: 3:1 ratio

**Recommended tools:**
- WebAIM Contrast Checker
- Lighthouse DevTools
- WAVE Browser Extension

### 4. Form Labels ✅ TODO

Language selector in header needs labels:

```html
<label for="language-select" class="visually-hidden">
  {{ i18n "common.language" }}
</label>
<select id="language-select">
  <option value="pt">Português</option>
  <option value="en">English</option>
  <option value="es">Español</option>
</select>
```

### 5. Image Alt Text ⏳ TODO

Update course/topic pages:

```html
<!-- Before -->
<img src="/image.jpg" class="course-thumbnail">

<!-- After -->
<img 
  src="/image.jpg" 
  alt="Course thumbnail: Introduction to Biology"
  class="course-thumbnail">
```

### 6. Heading Hierarchy ✅ TODO

Ensure proper H1→H2→H3 structure:

```html
<!-- Page structure -->
<h1>{{ .Title }}</h1>  <!-- One per page -->

<section>
  <h2>Course Details</h2>  <!-- Next level -->
  
  <h3>Learning Outcomes</h3>  <!-- Next level -->
  <ul>
    <li>Outcome 1</li>
  </ul>
  
  <h3>Topics</h3>  <!-- Same level as sibling -->
</section>
```

### 7. Link Text ✅ TODO

Make links descriptive:

```html
<!-- Before (bad) -->
<a href="/courses/course1">Click here</a> for more info

<!-- After (good) -->
<a href="/courses/course1">View course details</a>
```

### 8. Error Handling ⏳ TODO

For future forms:

```html
<!-- Form field with error -->
<div class="form-group">
  <label for="email">Email:</label>
  <input 
    id="email" 
    type="email" 
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-error">
  
  <p id="email-error" role="alert" class="text-danger">
    Email must be valid format (user@example.com)
  </p>
</div>
```

---

## Testing Checklist

### Keyboard Navigation ⌨️
- [ ] Tab through all interactive elements
- [ ] Shift+Tab goes backwards
- [ ] Enter/Space activates buttons
- [ ] Arrow keys work in menus
- [ ] Escape closes modals
- [ ] Focus always visible

### Screen Reader (NVDA/JAWS)
- [ ] Page structure understandable
- [ ] All buttons/links have names
- [ ] Images have alt text
- [ ] Form fields labeled
- [ ] Tables have headers
- [ ] Landmarks announced

### Color Contrast
- [ ] All text readable (4.5:1 or 3:1 for large)
- [ ] No info conveyed by color alone
- [ ] Focus indicators visible on all backgrounds

### Responsive & Mobile
- [ ] Touch targets at least 44x44px
- [ ] Readable at 200% zoom
- [ ] Works with browser zoom
- [ ] Mobile menu keyboard accessible

### Visual Design
- [ ] Consistent spacing/alignment
- [ ] Proper heading hierarchy
- [ ] Links distinguishable from text
- [ ] Focus indicators clear

---

## Tools for Testing

### Browser Extensions
- **WAVE** - Identifies accessibility errors
- **Axe DevTools** - Detailed accessibility audit
- **Lighthouse** - Built into Chrome DevTools
- **NVDA** - Free screen reader (Windows)
- **JAWS** - Professional screen reader (paid)

### Automated Testing
```bash
# Install axe DevTools
npm install --save-dev @axe-core/react

# Run accessibility audit
npm run a11y-check
```

### Manual Testing Checklist
```
□ Can tab through entire page?
□ Do all buttons have labels?
□ Are headings in logical order (H1→H2→H3)?
□ Can you use keyboard only?
□ Do colors have enough contrast?
□ Are form fields properly labeled?
□ Do error messages make sense?
□ Is skip link working?
□ Are images described?
```

---

## WCAG 2.1 Level AA Requirements

### Level A (Minimum)
- Text alternatives for images
- Keyboard accessible
- Distinguishable (colors, contrast)
- Understandable (language, navigation)

### Level AA (Enhanced)
- Enhanced contrast (4.5:1 normal text)
- Consistent navigation
- Consistent identification
- Focus visible
- Labels or instructions

### Level AAA (Excellence)
- Higher contrast (7:1)
- Sign language (videos)
- Reduced motion

**FACODI Target: Level AA** (highest practical)

---

## Implementation Priority

### Phase 2.1: Critical (Weeks 1-2)
1. Add `:focus-visible` styles (30 min)
2. Fix heading hierarchy (1 hour)
3. Audit color contrast (2 hours)
4. Add image alt text (2 hours)

### Phase 2.2: Important (Weeks 2-3)
1. Add form labels (1 hour)
2. Improve link text (1 hour)
3. Add ARIA landmarks (1 hour)
4. Test with screen reader (2 hours)

### Phase 2.3: Nice-to-have (Weeks 3-4)
1. Add high contrast mode
2. Add text sizing controls
3. Implement reduced motion preferences
4. Add captions to videos

---

## Reference Links

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Resources](https://webaim.org/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Bootstrap Accessibility](https://getbootstrap.com/docs/5.3/getting-started/accessibility/)
- [Doks Accessibility](https://getdoks.org/reference/accessibility/)

---

## Success Criteria

- [ ] Keyboard navigation works on all pages
- [ ] WAVE shows 0 errors
- [ ] Lighthouse accessibility score ≥ 90
- [ ] Manual screen reader test passes
- [ ] Color contrast ratio meets AA standard
- [ ] All forms properly labeled
- [ ] Focus indicators visible
- [ ] No automated accessibility violations

---

## Ongoing Maintenance

- Add a11y checks to PR validation
- Regular audits (monthly)
- Test with real assistive tech users
- Monitor and fix issues quickly
- Keep dependencies updated
- Document accessibility decisions
