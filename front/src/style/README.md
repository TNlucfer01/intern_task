# 🎨 Beginner Style & Design Tokens Guide

Welcome! This folder provides a simple, **pure CSS** design token setup powered by **Tailwind CSS v4**.

No complicated JavaScript or TypeScript configuration needed — just edit colors in `theme.css` and use the class names directly in your React JSX!

---

## 📁 What's in this folder?

```
src/style/
├── theme.css   <-- Change colors, fonts, radius, and shadows here
├── base.css    <-- Basic HTML & body defaults
└── README.md   <-- This quick guide
```

---

## ⚡ Quick Cheat Sheet (Classes You Can Use)

### 1. Buttons
```tsx
// Primary Button
<button className="bg-primary hover:bg-primary-hover text-white rounded-btn px-4 py-2 shadow-soft">
  Click Me
</button>

// Secondary Button
<button className="bg-secondary hover:bg-secondary-hover text-white rounded-btn px-4 py-2">
  Explore
</button>
```

### 2. Cards
```tsx
<div className="bg-card rounded-card border border-border-line p-6 shadow-card">
  <h2 className="text-text-main text-lg font-bold">Card Title</h2>
  <p className="text-text-muted text-sm mt-1">Some description text</p>
</div>
```

### 3. Alert / Feedback Badges
```tsx
// Success Badge
<span className="bg-success-light text-success font-medium px-3 py-1 rounded-pill text-xs">
  Completed
</span>

// Error Alert
<div className="bg-error-light text-error border border-error rounded-btn p-3 text-sm">
  Invalid credentials. Please try again.
</div>
```

---

## 🛠️ How do I customize my colors?

Open `theme.css` and simply change any hex color code:

```css
/* Change your main button color from indigo to blue: */
--color-primary: #3b82f6;
--color-primary-hover: #2563eb;
```

Save the file, and your whole website will instantly update!
