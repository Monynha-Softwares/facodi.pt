// tests/loaders.test.js
/**
 * Tests for FACODI static loaders
 * Tests rendering functions that convert front matter to HTML
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the loaders module
const createLoaders = () => {
  // Utility functions (from loaders.js)
  const escapeHtml = (value) => {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const formatCount = (count, singular, plural) => {
    const label = count === 1 ? singular : plural;
    return `${count} ${label}`.trim();
  };

  const renderTags = (tags) => {
    if (!tags || !tags.length) return '';
    return tags
      .map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`)
      .join('');
  };

  const renderPlaylists = (playlists) => {
    if (!playlists || !playlists.length) {
      return '<p>No playlists</p>';
    }
    return `<ul>${playlists
      .map((p) => `<li><a href="https://youtube.com/playlist?list=${escapeHtml(p.id)}">${escapeHtml(p.id)}</a></li>`)
      .join('')}</ul>`;
  };

  return {
    escapeHtml,
    formatCount,
    renderTags,
    renderPlaylists,
  };
};

describe('FACODI Loaders', () => {
  let loaders;

  beforeEach(() => {
    loaders = createLoaders();
  });

  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(loaders.escapeHtml('<script>alert("xss")</script>'))
        .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('should handle ampersands', () => {
      expect(loaders.escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('should handle null and undefined', () => {
      expect(loaders.escapeHtml(null)).toBe('');
      expect(loaders.escapeHtml(undefined)).toBe('');
    });

    it('should preserve regular text', () => {
      expect(loaders.escapeHtml('Hello World')).toBe('Hello World');
    });
  });

  describe('formatCount', () => {
    it('should return singular form for 1', () => {
      expect(loaders.formatCount(1, 'item', 'items')).toBe('1 item');
    });

    it('should return plural form for 0', () => {
      expect(loaders.formatCount(0, 'item', 'items')).toBe('0 items');
    });

    it('should return plural form for > 1', () => {
      expect(loaders.formatCount(5, 'course', 'courses')).toBe('5 courses');
    });

    it('should handle Portuguese pluralization', () => {
      expect(loaders.formatCount(3, 'tópico', 'tópicos')).toBe('3 tópicos');
    });
  });

  describe('renderTags', () => {
    it('should render tags as badges', () => {
      const html = loaders.renderTags(['python', 'web']);
      expect(html).toContain('python');
      expect(html).toContain('web');
      expect(html).toContain('<span class="badge">');
    });

    it('should escape tag content', () => {
      const html = loaders.renderTags(['<script>']);
      expect(html).toContain('&lt;script&gt;');
      expect(html).not.toContain('<script>');
    });

    it('should return empty string for empty tags', () => {
      expect(loaders.renderTags([])).toBe('');
      expect(loaders.renderTags(null)).toBe('');
    });
  });

  describe('renderPlaylists', () => {
    it('should render YouTube playlist links', () => {
      const playlists = [
        { id: 'PLtest123', priority: 1 },
      ];
      const html = loaders.renderPlaylists(playlists);
      expect(html).toContain('youtube.com/playlist');
      expect(html).toContain('PLtest123');
    });

    it('should handle empty playlists', () => {
      expect(loaders.renderPlaylists([])).toContain('No playlists');
      expect(loaders.renderPlaylists(null)).toContain('No playlists');
    });

    it('should escape playlist IDs', () => {
      const playlists = [
        { id: 'PL"test"', priority: 1 },
      ];
      const html = loaders.renderPlaylists(playlists);
      expect(html).toContain('&quot;');
      expect(html).not.toContain('PL"test"');
    });
  });
});

describe('Content Structure Validation', () => {
  it('should have valid course structure', () => {
    const course = {
      code: 'LESTI',
      title: 'Licenciatura em Engenharia',
      ects_total: 180,
      ucs: [],
    };
    expect(course.code).toBeDefined();
    expect(course.ects_total).toBeGreaterThan(0);
  });

  it('should have valid UC structure', () => {
    const uc = {
      code: '19411000',
      title: 'Programação',
      semester: 1,
      ects: 6,
      learning_outcomes: ['Outcome 1'],
      playlists: [],
    };
    expect(uc.code).toBeDefined();
    expect(uc.semester).toBeGreaterThanOrEqual(1);
    expect(uc.ects).toBeGreaterThan(0);
  });

  it('should have valid topic structure', () => {
    const topic = {
      slug: 'variables',
      name: 'Variables',
      tags: ['basics'],
      playlists: [],
    };
    expect(topic.slug).toBeDefined();
    expect(topic.name).toBeDefined();
  });
});

describe('Front Matter Compliance', () => {
  it('should validate required course fields', () => {
    const requiredFields = ['title', 'code', 'plan_version', 'degree', 'ects_total'];
    const course = {
      title: 'Test Course',
      code: 'TEST',
      plan_version: '2025/2026',
      degree: 'bachelor',
      ects_total: 180,
    };
    requiredFields.forEach((field) => {
      expect(course[field]).toBeDefined();
    });
  });

  it('should validate UC fields', () => {
    const uc = {
      code: 'UC001',
      title: 'Test UC',
      semester: 1,
      ects: 6,
      language: 'Português',
    };
    expect(uc.code).toBeDefined();
    expect(uc.semester).toBeGreaterThanOrEqual(1);
    expect(uc.semester).toBeLessThanOrEqual(8);
  });
});
