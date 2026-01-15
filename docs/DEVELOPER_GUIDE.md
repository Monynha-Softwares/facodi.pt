# FACODI Developer Guide - Static Architecture

## Quick Start

```bash
# Clone and setup
git clone https://github.com/Monynha-Softwares/facodi.pt.git
cd facodi.pt
npm install

# Develop locally
npm run dev
# Open: http://localhost:3000

# Build for production
npm run build
# Output: public/ (ready to deploy)

# Format code
npm run format
```

## Architecture

FACODI is a **pure static site** built with Hugo + Vanilla JavaScript.

```
┌─────────────────────────────────┐
│   Markdown Files (content/)     │
│   with Front Matter             │
└────────────────┬────────────────┘
                 │
                 ↓ (hugo build)
┌─────────────────────────────────┐
│   Static HTML with data-*       │
│   attributes from front matter  │
└────────────────┬────────────────┘
                 │
                 ↓ (browser loads)
┌─────────────────────────────────┐
│   facodiLoaders.initPage()      │
│   reads data attributes &       │
│   renders dynamic content       │
└─────────────────────────────────┘
```

## Content Structure

### Front Matter Format

All markdown files must include front matter:

```yaml
---
title: "Course/UC/Topic Title"
description: "Short description"
# For courses:
code: "COURSE-CODE"
degree: "Bachelor/Master"
ects_total: 120
duration_semesters: 6
plan_version: "2024/2025"
institution: "University Name"
school: "School/Department"
language: "Portuguese"
summary: "Longer summary text"
ucs:
  - code: "UC-CODE1"
    name: "Unit 1"
  
# For UCs:
code: "UC-CODE"
semester: 1
year: 1
ects: 6
language: "Portuguese"
description: "UC description"
prerequisites:
  - "UC-CODE2"
learning_outcomes:
  - "Learning outcome 1"
  - "Learning outcome 2"
playlists:
  - id: "YOUTUBE-PLAYLIST-ID"
    priority: 1
topics:
  - slug: "topic-slug"
    name: "Topic Name"
    summary: "Topic summary"
    tags:
      - "tag1"
      - "tag2"
    playlists:
      - id: "YOUTUBE-PLAYLIST-ID"
        priority: 1
---
# Markdown content goes here
```

### Directory Structure

```
content/
├── courses/
│   ├── course-slug/
│   │   ├── _index.md              # Course page
│   │   └── uc/
│   │       ├── uc-slug/
│   │       │   ├── _index.md      # UC page
│   │       │   └── topic-slug/
│   │       │       └── _index.md  # Topic page
│   │       └── ...
│   └── ...
```

## JavaScript API

### `window.facodiLoaders`

```javascript
// Initialize/refresh page content
facodiLoaders.initPage();

// Refresh when language changes
document.addEventListener('facodi:i18n-change', () => {
  facodiLoaders.refreshPage();
});

// Access rendering utilities (testing)
facodiLoaders._private.escapeHtml(text);
facodiLoaders._private.renderTags(tags);
```

### Data Attributes

Pages automatically get data attributes from front matter:

```html
<body 
  data-course="COURSE-CODE"
  data-plan="2024/2025"
  data-uc="UC-CODE"
  data-topic="topic-slug">
  ...
</body>
```

Embedded data for rendering:

```html
<script id="facodi-course-data" type="application/json">
{
  "summary": "...",
  "ucs": [
    { "code": "UC1", "name": "Unit 1", "semester": 1, ... }
  ]
}
</script>
```

## Common Tasks

### Adding a New Course

1. Create `content/courses/course-slug/_index.md`
2. Add front matter with course details
3. Create `content/courses/course-slug/uc/` directory
4. Add UCs as subdirectories

### Adding UCs to a Course

1. Create `content/courses/course-slug/uc/uc-slug/_index.md`
2. Add UC front matter (code, ects, semester, etc.)
3. Add learning outcomes, playlists, topics
4. Add `.md` content in the file body

### Adding Topics to UC

1. Create `content/courses/course-slug/uc/uc-slug/topic-slug/_index.md`
2. Add topic front matter (slug, name, summary, tags)
3. Reference from UC in `topics:` array
4. Add markdown content

### Adding Translations

Front matter supports multi-language:
```yaml
---
title: "Portuguese Title"
title_en: "English Title"
title_es: "Spanish Title"
---
```

## Styling

### CSS Classes

Course layouts automatically provide:
- `.course-uc-grid` - Grid of UC cards
- `.course-uc-card` - Individual UC card
- `.course-uc-semester` - Semester section
- `.course-uc-year` - Year section

Custom styles in [assets/css/facodi.css](../assets/css/facodi.css)

Bootstrap utilities: Use Bootstrap's built-in classes for responsive design.

## Testing

### Local Testing

```bash
# Test development server
npm run dev

# Open course: http://localhost:3000/courses/course-slug/
# Open UC: http://localhost:3000/courses/course-slug/uc/uc-slug/
# Open Topic: http://localhost:3000/courses/course-slug/uc/uc-slug/topic-slug/
```

### Content Validation

CI automatically validates on PR:
```bash
# Run locally
python3 - << 'EOF'
import os, re
from pathlib import Path

for md in Path('content').rglob('*.md'):
    with open(md) as f:
        if not f.read().startswith('---'):
            print(f"Missing front matter: {md}")
EOF
```

### Build Testing

```bash
npm run build
# Should create: public/ with all HTML files
```

## Debugging

### Browser Console

```javascript
// Check if loaders initialized
console.log(window.facodiLoaders);

// Manual initialize
window.facodiLoaders.initPage();

// Check translations
console.log(document.getElementById('facodi-translations'));
```

### Check Data Attributes

```javascript
// See what data page has
console.log(document.body.dataset);

// Check embedded course data
console.log(document.getElementById('facodi-course-data')?.textContent);
```

## Deployment

### Netlify

Site automatically deploys on push to `main`:
1. GitHub Actions validates content
2. Hugo builds site
3. Netlify publishes from `/public`

### Manual Deploy

```bash
# Build
npm run build

# Deploy to any static host
# Copy contents of `public/` to your host
```

## Performance Tips

- Keep markdown files concise (< 5KB each)
- Optimize images in `assets/images/`
- Use responsive images with srcset
- Minimize JavaScript (already done)
- Cache-bust CSS/JS changes with fingerprints

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Pages not rendering | Check front matter is valid YAML |
| Translations missing | Ensure i18n keys in `FALLBACK_TRANSLATIONS` |
| Layout looks wrong | Clear cache: `rm -rf public resources` |
| Build fails | Check Hugo version matches config |
| Netlify deploy fails | Check build command in netlify.toml |

## Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [Doks Theme](https://getdoks.org/)
- [GitHub Actions](https://docs.github.com/en/actions)

## Support

- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)
- **Contributing**: See [CONTRIBUTING.md](../CONTRIBUTING.md)
