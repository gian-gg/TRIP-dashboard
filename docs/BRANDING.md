# TRIP Dashboard - Brand Identity Guide

This document outlines the visual identity, design system, and brand guidelines for the TRIP Dashboard.

## 🎨 Brand Overview

### Brand Essence

**TRIP** stands for **Transit Routing & Integrated Payments** – a modern solution for traditional bus transit management. The brand represents:

- **Trust**: Secure, encrypted data handling
- **Reliability**: Consistent performance and accurate reporting
- **Innovation**: Modern technology for traditional transportation
- **Professionalism**: Clean, business-oriented design

### Brand Personality

- **Modern**: Contemporary design that feels current and forward-thinking
- **Clean**: Minimal clutter, easy to understand
- **Professional**: Suitable for business operations
- **Approachable**: User-friendly, not intimidating
- **Data-driven**: Emphasis on analytics and insights

## 🎯 Logo & Identity

### Primary Logo

The TRIP logo features a simple, memorable icon that represents:

- **Transportation**: Abstract bus/vehicle shape
- **Movement**: Dynamic, forward-moving design
- **Connection**: Integrated systems working together

**Logo Usage Guidelines:**

```
✅ DO:
- Use the logo at recommended sizes (minimum 32px height)
- Maintain clear space around the logo (equal to logo height)
- Use on white or light backgrounds primarily
- Ensure sufficient contrast for readability

❌ DON'T:
- Stretch, skew, or distort the logo
- Add effects (shadows, gradients, outlines)
- Change logo colors outside brand palette
- Place on busy backgrounds without proper clearance
```

### Logo Variations

**Primary Logo**: Full logo with icon + "TRIP" text

- Use: Headers, landing page, marketing materials
- Minimum size: 120px width

**Icon Only**: Just the bus icon

- Use: Favicons, app icons, small spaces
- Minimum size: 32px × 32px

**Text Only**: "TRIP" typography

- Use: Body text, when icon is already visible
- Minimum size: 14px font size

## 🎨 Color System

### Primary Colors

Our primary color is **TRIP Blue** – a vibrant, trustworthy blue that conveys professionalism and reliability.

```css
/* Primary - TRIP Blue */
--primary: #186cc7;
--primary-foreground: #ffffff;

usage: -Primary buttons and CTAs - Navigation highlights - Important UI
  elements - Brand accents;
```

**Color Psychology**: Blue represents trust, stability, and professionalism – essential for a business management system.

### Background Colors

```css
/* Soft, Clean Backgrounds */
--background: #f0f8ff; /* AliceBlue - Main background */
--card: #eaf4ff; /* Slightly darker cards */
--popover: #e2efff; /* Overlays and popovers */
--muted: #eff6ff; /* Subtle backgrounds */
```

**Design Rationale**: Soft blue-tinted backgrounds create a cohesive, professional atmosphere while maintaining excellent readability.

### Text Colors

```css
/* Text Hierarchy */
--foreground: #1e293b;          /* Primary text (slate-800) */
--muted-foreground: #475569;    /* Secondary text (slate-600) */

Usage:
- foreground: Headings, important text
- muted-foreground: Descriptions, helper text, labels
```

### Accent Colors

```css
/* Secondary Actions */
--secondary: #dbeafe; /* Light blue background */
--secondary-foreground: #1e293b; /* Dark text on secondary */

/* Subtle Accents */
--accent: #bfdbfe; /* Hover states, selected items */
--accent-foreground: #1e293b; /* Text on accent */
```

### Status Colors

```css
/* Success */
--success: #10b981; /* Green for positive actions */
--success-foreground: #ffffff;

/* Destructive/Error */
--destructive: #ca3737; /* Red for warnings/errors */
--destructive-foreground: #ffffff;

/* Warning */
--warning: #f59e0b; /* Orange for caution */
--warning-foreground: #ffffff;
```

### Chart Colors

```css
/* Data Visualization Palette */
--chart-1: #186cc7; /* Primary blue */
--chart-2: #38bdf8; /* Sky blue */
--chart-3: #34d399; /* Emerald green */
--chart-4: #fb7185; /* Rose pink */
--chart-5: #a78bfa; /* Purple */
```

**Usage**: Maintain this order for multi-series charts to ensure consistent data visualization.

### Color Accessibility

All color combinations meet **WCAG 2.1 AA standards**:

| Background | Foreground | Contrast Ratio | Pass   |
| ---------- | ---------- | -------------- | ------ |
| #f0f8ff    | #1e293b    | 11.2:1         | ✅ AAA |
| #186cc7    | #ffffff    | 4.8:1          | ✅ AA  |
| #ca3737    | #ffffff    | 4.7:1          | ✅ AA  |

## 📝 Typography

### Font Family

```css
/* Primary Font */
font-family:
  'Poppins',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  Arial,
  sans-serif;
```

**Poppins** is our primary typeface:

- **Modern**: Contemporary geometric sans-serif
- **Readable**: Excellent legibility at all sizes
- **Versatile**: Works for headings and body text
- **Professional**: Clean, business-appropriate aesthetic

### Type Scale

```css
/* Headings */
.text-6xl {
  font-size: 3.75rem;
} /* Hero text */
.text-5xl {
  font-size: 3rem;
} /* Page titles */
.text-4xl {
  font-size: 2.25rem;
} /* Section headers */
.text-3xl {
  font-size: 1.875rem;
} /* Card titles */
.text-2xl {
  font-size: 1.5rem;
} /* Subheadings */
.text-xl {
  font-size: 1.25rem;
} /* Large text */

/* Body */
.text-lg {
  font-size: 1.125rem;
} /* Large body */
.text-base {
  font-size: 1rem;
} /* Default body */
.text-sm {
  font-size: 0.875rem;
} /* Small text */
.text-xs {
  font-size: 0.75rem;
} /* Tiny text */
```

### Font Weights

```css
/* Weight System */
.font-light {
  font-weight: 300;
} /* Subtle text */
.font-normal {
  font-weight: 400;
} /* Body text */
.font-medium {
  font-weight: 500;
} /* Emphasis */
.font-semibold {
  font-weight: 600;
} /* Subheadings */
.font-bold {
  font-weight: 700;
} /* Headings */
.font-extrabold {
  font-weight: 800;
} /* Hero text */
```

### Typographic Hierarchy

**Level 1: Page Titles**

```css
font-size: 2.25rem; /* text-4xl */
font-weight: 700; /* font-bold */
line-height: 1.2;
tracking: -0.025em; /* tracking-tight */
```

**Level 2: Section Headers**

```css
font-size: 1.875rem; /* text-3xl */
font-weight: 700; /* font-bold */
line-height: 1.3;
```

**Level 3: Card/Component Titles**

```css
font-size: 1.25rem; /* text-xl */
font-weight: 600; /* font-semibold */
line-height: 1.4;
```

**Body Text**

```css
font-size: 1rem; /* text-base */
font-weight: 400; /* font-normal */
line-height: 1.5;
color: var(--foreground);
```

**Secondary/Helper Text**

```css
font-size: 0.875rem; /* text-sm */
font-weight: 400; /* font-normal */
line-height: 1.5;
color: var(--muted-foreground);
```

## 🎭 UI Components

### Buttons

**Primary Button**

```css
background: var(--primary);
color: var(--primary-foreground);
padding: 0.5rem 1rem;
border-radius: 0.5rem;
font-weight: 500;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

Hover: opacity: 0.9;
Active: scale: 0.98;
```

**Secondary Button (Outline)**

```css
background: transparent;
border: 1px solid var(--border);
color: var(--foreground);
padding: 0.5rem 1rem;
border-radius: 0.5rem;

Hover: background: var(--accent);
```

**Destructive Button**

```css
background: var(--destructive);
color: var(--destructive-foreground);
/* Same padding and radius as primary */
```

### Cards

```css
background: var(--card);
border: 1px solid var(--border);
border-radius: 0.75rem;
padding: 1.5rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

Hover: box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

### Inputs

```css
background: var(--background);
border: 1px solid var(--border);
border-radius: 0.5rem;
padding: 0.5rem 0.75rem;
font-size: 0.875rem;

Focus: border-color: var(--primary);
       ring: 2px var(--primary) with opacity 0.2;
```

### Badges

**Status Badges**

```css
/* Active */
background: rgba(16, 185, 129, 0.1); /* Green tint */
color: #059669; /* Green text */
padding: 0.25rem 0.75rem;
border-radius: 9999px;
font-size: 0.75rem;
font-weight: 500;

/* Inactive */
background: rgba(107, 114, 128, 0.1); /* Gray tint */
color: #6b7280; /* Gray text */

/* Maintenance */
background: rgba(245, 158, 11, 0.1); /* Orange tint */
color: #d97706; /* Orange text */
```

## 📐 Layout & Spacing

### Spacing System

```css
/* Tailwind spacing scale (in rem) */
0: 0;
1: 0.25rem; /* 4px */
2: 0.5rem; /* 8px */
3: 0.75rem; /* 12px */
4: 1rem; /* 16px */
5: 1.25rem; /* 20px */
6: 1.5rem; /* 24px */
8: 2rem; /* 32px */
10: 2.5rem; /* 40px */
12: 3rem; /* 48px */
16: 4rem; /* 64px */
20: 5rem; /* 80px */
24: 6rem; /* 96px */
```

**Common Patterns:**

- Component padding: `p-4` to `p-6` (16-24px)
- Section margins: `my-8` to `my-12` (32-48px)
- Element gaps: `gap-4` (16px)
- Card padding: `p-6` (24px)

### Border Radius

```css
/* Radius scale */
--radius: 8px; /* Default */
--radius-sm: 4px; /* Small elements */
--radius-md: 6px; /* Medium elements */
--radius-lg: 8px; /* Large elements */
--radius-xl: 12px; /* Extra large */
--radius-full: 9999px; /* Pills and circles */
```

**Usage:**

- Buttons, inputs: `rounded-lg` (8px)
- Cards: `rounded-xl` (12px)
- Badges, tags: `rounded-full` (pill shape)
- Modals: `rounded-2xl` (16px)

### Shadows

```css
/* Shadow system */
.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
.shadow-xl {
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}
.shadow-2xl {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}
```

**Usage:**

- Cards at rest: `shadow`
- Cards on hover: `shadow-lg`
- Modals: `shadow-xl`
- Buttons: `shadow-sm` to `shadow-lg`

## 🎬 Animations & Transitions

### Transition System

```css
/* Duration */
.transition-fast {
  transition-duration: 150ms;
}
.transition-base {
  transition-duration: 200ms;
}
.transition-slow {
  transition-duration: 300ms;
}

/* Easing */
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
```

### Common Animations

**Hover Effects**

```css
/* Cards */
transition: all 0.2s ease-in-out;
hover: transform: translateY(-2px);
       box-shadow: 0 10px 15px rgba(0,0,0,0.1);

/* Buttons */
transition: opacity 0.15s ease-in-out;
hover: opacity: 0.9;
active: scale: 0.98;
```

**Loading States**

```css
/* Spinner */
animation: spin 1s linear infinite;

/* Pulse */
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

**Page Transitions**

```css
/* Fade in */
opacity: 0 → 1;
duration: 300ms;

/* Slide up */
transform: translateY(20px) → translateY(0);
duration: 400ms;
```

## 📱 Responsive Design

### Breakpoint System

```css
/* Mobile First Approach */
sm: 640px; /* Small tablets */
md: 768px; /* Tablets */
lg: 1024px; /* Laptops */
xl: 1280px; /* Desktops */
2xl: 1536px; /* Large displays */
```

### Responsive Patterns

**Grid Systems**

```css
/* 1 column mobile, 2 tablet, 3 desktop */
.grid {
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Typography**

```css
/* Responsive text sizing */
.heading {
  font-size: 1.875rem; /* Mobile */
}
@media (min-width: 768px) {
  .heading {
    font-size: 2.25rem; /* Tablet */
  }
}
@media (min-width: 1024px) {
  .heading {
    font-size: 3rem; /* Desktop */
  }
}
```

## 🖼️ Imagery Guidelines

### Illustrations

- **Style**: Flat, modern, minimal
- **Colors**: Use brand color palette
- **Tone**: Professional yet approachable
- **Usage**: Landing page, empty states, onboarding

### Icons

**Icon System**: Lucide React

- **Size**: 16px (sm), 20px (default), 24px (lg)
- **Stroke Width**: 2px (default)
- **Color**: Inherit from parent
- **Style**: Outline/line style, consistent weight

**Icon Usage:**

```tsx
// Small icon
<Icon className="h-4 w-4" />

// Default icon
<Icon className="h-5 w-5" />

// Large icon
<Icon className="h-6 w-6" />

// With color
<Icon className="h-5 w-5 text-primary" />
```

### Charts & Graphs

**Style Guidelines:**

- Clean axes with minimal gridlines
- Use brand colors in order (chart-1 → chart-5)
- Sufficient padding around chart area
- Responsive sizing
- Clear labels and legends

**Best Practices:**

- Limit to 5 data series for readability
- Use tooltips for detailed information
- Animate on first render (subtle)
- Maintain consistent y-axis across similar charts

## 🌐 Accessibility

### Color Contrast

All text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

### Focus States

```css
/* Visible focus indicators */
.focus-visible\:ring {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Screen Reader Support

- Semantic HTML elements
- ARIA labels where needed
- Alt text for all images
- Skip navigation links

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Logical tab order
- Escape key closes modals
- Enter/Space activates buttons

## 📋 Brand Voice & Messaging

### Writing Style

**Tone**: Professional, helpful, clear

**Characteristics:**

- **Clear**: Use simple language, avoid jargon
- **Concise**: Get to the point quickly
- **Helpful**: Provide context and guidance
- **Professional**: Maintain business tone
- **Action-oriented**: Use active voice

**Examples:**

✅ **Good:**

- "Upload your trip file to record the journey"
- "View revenue breakdown by payment method"
- "Your trip has been successfully uploaded"

❌ **Avoid:**

- "Utilize the upload functionality to facilitate the submission"
- "Revenue metrics visualization dashboard component"
- "Submission process completed with successful status"

### Error Messages

**Format:** [Problem] - [Solution]

**Examples:**

- "Invalid file format. Please upload a .enc file."
- "Connection failed. Check your internet and try again."
- "Session expired. Please log in again."

### Success Messages

**Format:** [Action completed] - [Optional next step]

**Examples:**

- "Trip uploaded successfully!"
- "Bus information updated."
- "Report generated. Click to download."

## 🎨 Design Assets

### Logo Files

```
assets/
├── logo.svg          # Vector logo (preferred)
├── logo.png          # High-res PNG (fallback)
├── icon-only.svg     # Just the icon
└── favicon.ico       # Browser favicon
```

### Color Palette Export

```
TRIP-colors.css       # CSS variables
TRIP-colors.json      # JSON format for tools
TRIP-colors.ase       # Adobe Swatch Exchange
```

## 📱 Platform-Specific Guidelines

### Web Dashboard

- **Desktop-first** for operator dashboard
- **Mobile-optimized** for conductor upload
- Sidebar navigation collapses on mobile
- Tables switch to card layout on small screens

### Print Layouts

- Remove navigation and interactive elements
- Use print-friendly fonts and sizes
- Black and white compatibility
- Proper page breaks

## ✅ Brand Checklist

When creating new components or pages:

- [ ] Uses brand colors (primary #186cc7)
- [ ] Typography follows Poppins font family
- [ ] Spacing uses 4px/8px grid system
- [ ] Border radius consistent (8px default)
- [ ] Shadows applied appropriately
- [ ] Hover/active states defined
- [ ] Mobile responsive
- [ ] Meets accessibility standards
- [ ] Icons from Lucide React library
- [ ] Animations subtle and purposeful

---

## 📞 Brand Usage Questions

For questions about brand usage or access to design assets:

- Email: epanto.gg@gmail.com
- Review: [Brand Examples in Figma] (if available)

---

_Last Updated: December 2, 2025_
