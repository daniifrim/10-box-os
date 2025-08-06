# 10-box OS Design System & Style Guide

*Version 1.0 - Generated from codebase analysis*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Brand Foundation](#brand-foundation)
3. [Design Tokens](#design-tokens)
4. [Typography](#typography)
5. [Color System](#color-system)
6. [Component Library](#component-library)
7. [Layout & Spacing](#layout--spacing)
8. [Business Logic UI Patterns](#business-logic-ui-patterns)
9. [Accessibility Guidelines](#accessibility-guidelines)
10. [Development Guidelines](#development-guidelines)

---

## Introduction

### Purpose & Scope

The 10-box OS design system provides a comprehensive guide for maintaining visual and functional consistency across the entire application. This style guide documents the actual implementation details found in the codebase, including components built with shadcn/ui, custom styling patterns, and business-specific UI conventions.

### Design Philosophy

The 10-box OS follows a clean, professional aesthetic optimized for business consultants and their clients. The design prioritizes:

- **Clarity**: Information hierarchy that makes complex business processes understandable
- **Efficiency**: Streamlined workflows with minimal cognitive load
- **Trust**: Professional appearance that instills confidence in business relationships
- **Accessibility**: WCAG compliant components ensuring universal usability

### Framework Stack

- **UI Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Component Base**: shadcn/ui components built on Radix UI
- **Icon Library**: Lucide React icons
- **Color System**: HSL-based semantic tokens with theme variants

---

## Brand Foundation

### Product Identity

**10-box OS** is a web-based platform for implementing the proprietary 10-box business framework. The visual identity reflects professionalism, structure, and growth.

### Brand Colors

The system supports multiple theme variations, allowing consultants to customize their branding while maintaining consistency:

- **Default Theme**: Blue-based professional palette
- **Alternative Themes**: Available for consultant branding (green, purple, coral themes)

### Logo Usage

- Product name displayed as `{productName}` with gradient text treatment
- Typography: `text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500`
- Usage: Navigation headers, login pages, branding elements

---

## Design Tokens

### Color Tokens

The application uses CSS custom properties for consistent theming across all components.

#### Primary Colors
```css
--color-primary-50: #fef7f2
--color-primary-100: #fdede3
--color-primary-200: #fbd8c2
--color-primary-300: #f7b896
--color-primary-400: #f18d68
--color-primary-500: #e76d44
--color-primary-600: #D96E4B /* Main brand color */
--color-primary-700: #b85a3a
--color-primary-800: #9a4a31
--color-primary-900: #7e3d2a
```

#### Secondary Colors (Neutral Grays)
```css
--color-secondary-50: #f8fafc
--color-secondary-100: #f1f5f9
--color-secondary-200: #e2e8f0
--color-secondary-300: #cbd5e1
--color-secondary-400: #94a3b8
--color-secondary-500: #64748b
--color-secondary-600: #475569
--color-secondary-700: #334155
--color-secondary-800: #1e293b
--color-secondary-900: #0f172a
```

#### shadcn/ui Semantic Tokens
```css
/* Light Theme */
--background: 0 0% 100%
--foreground: 0 0% 3.9%
--primary: 0 0% 9%
--primary-foreground: 0 0% 98%
--secondary: 0 0% 96.1%
--secondary-foreground: 0 0% 9%
--muted: 0 0% 96.1%
--muted-foreground: 0 0% 45.1%
--accent: 0 0% 96.1%
--accent-foreground: 0 0% 9%
--destructive: 0 84.2% 60.2%
--destructive-foreground: 0 0% 98%
--border: 0 0% 89.8%
--input: 0 0% 89.8%
--ring: 0 0% 3.9%
--radius: 0.5rem
```

### Spacing Scale

Follows Tailwind CSS default spacing scale:

```css
/* Common spacing values used */
space-y-1      /* 0.25rem - 4px */
space-y-1.5    /* 0.375rem - 6px */
space-y-2      /* 0.5rem - 8px */
space-y-3      /* 0.75rem - 12px */
space-y-4      /* 1rem - 16px */
space-y-6      /* 1.5rem - 24px */
gap-2          /* 8px grid/flex gap */
gap-4          /* 16px grid/flex gap */
gap-8          /* 32px grid/flex gap */
```

### Border Radius

Consistent radius scale:

```css
rounded-sm     /* calc(0.5rem - 4px) = 4px */
rounded-md     /* calc(0.5rem - 2px) = 6px */
rounded-lg     /* 0.5rem = 8px - Primary radius */
rounded-xl     /* 0.75rem = 12px */
rounded-full   /* 9999px - Pills and avatars */
```

---

## Typography

### Font Stack

Default system font stack optimized for cross-platform consistency:
```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif
```

### Type Scale

#### Headings
```css
text-5xl md:text-6xl  /* Hero: 48px-60px mobile, 60px-72px desktop */
text-3xl             /* Section: 30px */
text-2xl             /* Card Title: 24px */
text-xl              /* Subtitle: 20px */
text-lg              /* Large body: 18px */
```

#### Body Text
```css
text-base            /* Default: 16px desktop, 16px mobile */
text-sm              /* Small: 14px - Most UI text */
text-xs              /* Extra small: 12px - Metadata */
md:text-sm           /* Responsive: 16px mobile, 14px desktop */
```

#### Font Weights
```css
font-medium          /* 500 - UI elements, buttons */
font-semibold        /* 600 - Card titles, important labels */
font-bold            /* 700 - Headings, emphasis */
```

### Typography Usage Patterns

#### Navigation & Headers
```css
/* Product name */
.brand-name {
  @apply text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent;
}

/* Page headings */
.page-heading {
  @apply text-3xl font-bold mb-4;
}

/* Card titles */
.card-title {
  @apply text-2xl font-semibold leading-none tracking-tight;
}
```

#### Content Hierarchy
```css
/* Section descriptions */
.section-description {
  @apply text-sm text-muted-foreground;
}

/* Meta information */
.text-meta {
  @apply text-xs text-gray-500;
}
```

---

## Color System

### Theme Variations

The application supports multiple theme variations for consultant branding:

#### Default/Orange Theme
- Primary: Warm Orange (`#D96E4B`)
- Use: Default installation, warm/professional feeling

#### Sage/Green Theme (theme-sass2)
- Primary: Forest Green (`#5c8a5c`)
- Secondary: Warm Gray
- Accent: Terracotta
- Use: Natural, growth-oriented consultants

#### Ocean Theme (theme-sass3)
- Primary: Ocean Blue (`#0c98d0`)
- Secondary: Sandy Neutrals
- Accent: Coral Sunset
- Use: Creative, dynamic consultants

#### Purple Theme
- Primary: Purple (`#a855f7`)
- Use: Innovation, premium positioning

### Status Color Conventions

#### Task Completion Status
Following the PRD requirements for daily task tracking:

```css
/* Green: All tasks completed */
.status-green {
  @apply bg-green-50 text-green-700 border-green-200;
}

/* Yellow: Some tasks incomplete (< 3 days) */
.status-yellow {
  @apply bg-yellow-50 text-yellow-700 border-yellow-200;
}

/* Red: Multiple overdue (> 3 days) */
.status-red {
  @apply bg-red-50 text-red-700 border-red-200;
}
```

#### Role-Based Color Coding
```css
/* Teacher role */
.role-teacher {
  @apply bg-purple-50 text-purple-700 border-purple-200;
}

/* Consultant role */
.role-consultant {
  @apply bg-primary-50 text-primary-700 border-primary-200;
}

/* Client role */
.role-client {
  @apply bg-green-50 text-green-700 border-green-200;
}
```

### Color Usage Guidelines

#### Primary Colors (Warm Orange Palette)
- **primary-600** (#D96E4B): Main action buttons, active navigation, brand elements
- **primary-50** (#fef7f2): Light backgrounds, subtle highlights, card hover states
- **primary-100** (#fdede3): Soft background accents, subtle borders
- **primary-700** (#b85a3a): Hover states for primary actions, darker brand elements
- **primary-500** (#e76d44): Interactive elements, links, secondary brand usage

#### Secondary/Gray Colors
- **gray-100**: Page backgrounds
- **gray-50**: Card hover states, subtle backgrounds
- **gray-600**: Body text, secondary information
- **gray-900**: High contrast text, important labels

#### Semantic Colors
- **green-500**: Success states, completed tasks
- **yellow-500**: Warning states, incomplete tasks
- **red-600**: Error states, overdue tasks, destructive actions

---

## Component Library

### Base Components (shadcn/ui)

#### Button Component
```typescript
// Button variants and sizes
buttonVariants = {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  }
}
```

**Usage Examples:**
```jsx
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="icon"><Menu /></Button>
```

#### Card Component
```jsx
// Card structure
<Card className="rounded-lg border bg-card text-card-foreground shadow-sm">
  <CardHeader className="flex flex-col space-y-1.5 p-6">
    <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
      Title
    </CardTitle>
    <CardDescription className="text-sm text-muted-foreground">
      Description
    </CardDescription>
  </CardHeader>
  <CardContent className="p-6 pt-0">
    Content
  </CardContent>
  <CardFooter className="flex items-center p-6 pt-0">
    Footer
  </CardFooter>
</Card>
```

#### Input Components
```jsx
// Input field
<Input 
  type="text" 
  placeholder="Enter text..."
  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background"
/>

// Textarea
<Textarea 
  placeholder="Enter description..."
  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2"
/>
```

#### Alert Component
```jsx
<Alert variant="default">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is an informational alert.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

#### Dialog Component
```jsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Application-Specific Components

#### Navigation Layout (AppLayout.tsx)
```jsx
// Sidebar navigation pattern
<div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-30">
  <div className="h-16 flex items-center justify-between px-4 border-b">
    <span className="text-xl font-semibold text-primary-600">{productName}</span>
  </div>
  <nav className="mt-4 px-2 space-y-1">
    {navigation.map((item) => (
      <Link
        href={item.href}
        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
          isActive 
            ? 'bg-primary-50 text-primary-600' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-500' : 'text-gray-400'}`} />
        {item.name}
      </Link>
    ))}
  </nav>
</div>
```

#### User Avatar Pattern
```jsx
// User avatar with initials
<div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
  <span className="text-primary-700 font-medium">
    {getInitials(user.email)}
  </span>
</div>
```

#### Pricing Card Pattern
```jsx
<Card className={`relative flex flex-col ${tier.popular ? 'border-primary-500 shadow-lg' : ''}`}>
  {tier.popular && (
    <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-primary-500 text-white text-sm rounded-full">
      Most Popular
    </div>
  )}
  <CardHeader>
    <CardTitle>{tier.name}</CardTitle>
    <CardDescription>{tier.description}</CardDescription>
  </CardHeader>
  <CardContent className="flex-grow flex flex-col">
    <div className="mb-6">
      <span className="text-4xl font-bold">{formatPrice(tier.price)}</span>
      <span className="text-gray-600 ml-2">/month</span>
    </div>
    <ul className="space-y-3 mb-8 flex-grow">
      {tier.features.map((feature) => (
        <li key={feature} className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  </CardContent>
</Card>
```

---

## Layout & Spacing

### Grid Systems

#### Main Application Layout
```css
/* Two-column layout with sidebar */
.app-layout {
  @apply min-h-screen bg-gray-100;
}

.app-sidebar {
  @apply fixed inset-y-0 left-0 w-64 bg-white shadow-lg;
}

.app-main {
  @apply lg:pl-64;
}
```

#### Content Grid Patterns
```css
/* Feature grid */
.features-grid {
  @apply grid md:grid-cols-2 lg:grid-cols-3 gap-8;
}

/* Stats grid */
.stats-grid {
  @apply grid grid-cols-2 md:grid-cols-4 gap-8;
}

/* Quick actions */
.actions-grid {
  @apply grid gap-4 md:grid-cols-2;
}
```

### Responsive Breakpoints

Following Tailwind CSS breakpoint system:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Common Spacing Patterns

#### Page Layout
```css
/* Page container */
.page-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Section spacing */
.section {
  @apply py-24 bg-gray-50;
}

/* Card content */
.card-content {
  @apply space-y-6 p-6;
}
```

#### Component Spacing
```css
/* Navigation items */
.nav-items {
  @apply mt-4 px-2 space-y-1;
}

/* Form groups */
.form-group {
  @apply space-y-3 mb-8;
}

/* Button groups */
.button-group {
  @apply flex gap-4 justify-center;
}
```

---

## Business Logic UI Patterns

### 10-Box Framework Representation

#### Box Status Indicators
Based on PRD requirements for daily task tracking:

```jsx
// Status color mapping
const getStatusColor = (completionRate, daysBehind) => {
  if (completionRate === 100) return 'text-green-600 bg-green-50 border-green-200'; // 🟢
  if (daysBehind < 3) return 'text-yellow-600 bg-yellow-50 border-yellow-200';      // 🟡
  return 'text-red-600 bg-red-50 border-red-200';                                 // 🔴
};

// Status indicator component
<div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(rate, days)}`}>
  {getStatusText(rate, days)}
</div>
```

#### User Role Hierarchy Visualization
```jsx
// Teacher dashboard - overview of all consultants
<Card>
  <CardHeader>
    <CardTitle>Consultant Overview</CardTitle>
    <CardDescription>Daily task completion tracking</CardDescription>
  </CardHeader>
  <CardContent>
    {consultants.map(consultant => (
      <div key={consultant.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
        <div className="flex items-center gap-3">
          <UserAvatar user={consultant} />
          <div>
            <div className="font-medium">{consultant.name}</div>
            <div className="text-sm text-gray-500">{consultant.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BoxStatusIndicator box="2" status={consultant.box2Status} />
          <BoxStatusIndicator box="3" status={consultant.box3Status} />
          <BoxStatusIndicator box="4" status={consultant.box4Status} />
        </div>
      </div>
    ))}
  </CardContent>
</Card>
```

#### Dream 100 Database UI Patterns
```jsx
// Dream 100 contact list with status
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Contact
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Next Contact
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {contacts.map(contact => (
        <tr key={contact.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-900">{contact.name}</div>
              <div className="text-sm text-gray-500">{contact.company}</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <DecisionStatusBadge decision={contact.latestDecision} />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {formatDate(contact.nextContactDate)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

#### Client Portal Milestone Tracking
```jsx
// Client portal milestone progress
<div className="space-y-4">
  {milestones.map((milestone, index) => (
    <div key={milestone.id} className="flex items-start gap-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
        milestone.completed 
          ? 'bg-green-100 text-green-600' 
          : index === currentMilestone 
            ? 'bg-primary-100 text-primary-600'
            : 'bg-gray-100 text-gray-400'
      }`}>
        {milestone.completed ? '✓' : index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`font-medium ${milestone.completed ? 'text-green-600' : 'text-gray-900'}`}>
          {milestone.title}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {milestone.description}
        </div>
        {milestone.documents && milestone.documents.length > 0 && (
          <div className="mt-2 space-x-2">
            {milestone.documents.map(doc => (
              <a key={doc.id} href={doc.url} className="text-sm text-primary-600 hover:underline">
                📄 {doc.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  ))}
</div>
```

### Import/Export UI Patterns

#### CSV Upload Interface
```jsx
<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
  <input
    type="file"
    accept=".csv,.xlsx,.xls"
    className="hidden"
    onChange={handleFileUpload}
    ref={fileInputRef}
  />
  <div className="space-y-2">
    <Upload className="h-8 w-8 text-gray-400 mx-auto" />
    <div className="text-sm text-gray-600">
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="text-primary-600 hover:text-primary-700 font-medium"
      >
        Choose a file
      </button>
      {' '}or drag and drop
    </div>
    <div className="text-xs text-gray-500">
      CSV, XLSX files up to 10MB
    </div>
  </div>
</div>
```

#### Data Validation Preview
```jsx
<div className="mt-4 border rounded-lg overflow-hidden">
  <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
    Preview (showing first 10 rows)
  </div>
  <div className="divide-y divide-gray-200">
    {previewData.map((row, index) => (
      <div key={index} className={`p-3 ${
        row.errors.length > 0 
          ? 'bg-red-50 border-l-4 border-red-400' 
          : row.warnings.length > 0 
            ? 'bg-yellow-50 border-l-4 border-yellow-400'
            : 'bg-green-50 border-l-4 border-green-400'
      }`}>
        <div className="flex justify-between items-start">
          <div className="text-sm">
            <strong>{row.name}</strong> - {row.email}
          </div>
          {row.errors.length > 0 && (
            <div className="text-xs text-red-600">
              {row.errors.join(', ')}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
```

---

## Accessibility Guidelines

### Color Accessibility

#### Contrast Requirements
All color combinations meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio minimum
- Large text: 3:1 contrast ratio minimum
- UI components: 3:1 contrast ratio minimum

#### Color Independence
- Never rely solely on color to convey information
- Use icons, text labels, and patterns alongside color coding
- Status indicators include both color and text/icons

### Keyboard Navigation

#### Focus Management
```css
/* Focus ring for interactive elements */
.focus-ring {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2;
}

/* Skip links */
.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background border border-border rounded-md px-4 py-2 z-50;
}
```

#### Tab Order
- Logical tab sequence through interactive elements
- Skip links for main content navigation
- Modal focus trapping implemented

### Screen Reader Support

#### Semantic HTML
```jsx
// Proper heading hierarchy
<h1>Page Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection Title</h3>

// Form labels
<label htmlFor="email" className="text-sm font-medium">
  Email Address
</label>
<input id="email" type="email" aria-describedby="email-help" />
<div id="email-help" className="text-xs text-gray-500">
  We'll never share your email
</div>

// Button descriptions
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// Status updates
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

### Mobile Accessibility

#### Touch Targets
- Minimum 44px touch targets for interactive elements
- Adequate spacing between clickable items
- Large enough text for readability (16px minimum)

#### Responsive Typography
```css
/* Mobile-first typography */
.responsive-text {
  @apply text-base md:text-sm; /* 16px mobile, 14px desktop */
}

/* Scalable interface elements */
.mobile-friendly-nav {
  @apply h-16 /* 64px minimum touch target */;
}
```

---

## Development Guidelines

### CSS Architecture

#### Tailwind CSS Conventions
```css
/* Utility-first approach */
.component {
  @apply flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow;
}

/* Custom component patterns */
@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700 transition-colors;
  }
  
  .input-primary {
    @apply border-secondary-300 focus:border-primary-500 focus:ring-primary-500;
  }
}
```

#### CSS Variables for Theming
```css
/* Theme-aware components */
.themed-card {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-200);
  color: var(--color-primary-700);
}
```

### Component Development

#### TypeScript Patterns
```typescript
// Component props with variants
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

// Status type definitions
type TaskStatus = 'completed' | 'incomplete' | 'overdue'
type UserRole = 'teacher' | 'consultant' | 'client'
type BoxNumber = 2 | 3 | 4 // Only track boxes 2-4 in MVP
```

#### Component Composition
```jsx
// Composable card pattern
export const DashboardCard = ({ children, ...props }) => (
  <Card {...props}>
    {children}
  </Card>
)

// Specialized variants
export const StatusCard = ({ status, children, ...props }) => (
  <DashboardCard className={cn(getStatusStyles(status), props.className)} {...props}>
    {children}
  </DashboardCard>
)
```

### State Management Patterns

#### Context Usage
```typescript
// Global context for user state
const GlobalContext = createContext({
  user: null,
  loading: true,
  setUser: (user) => {},
})

// Custom hook for accessing global state
export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobal must be used within GlobalContextProvider')
  }
  return context
}
```

### Performance Guidelines

#### Optimization Techniques
```jsx
// Lazy loading for heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data)
}, [data])

// Callback memoization
const handleClick = useCallback((id) => {
  onItemClick(id)
}, [onItemClick])
```

#### Image Optimization
```jsx
// Next.js Image component usage
import Image from 'next/image'

<Image
  src="/consultant-logo.png"
  alt="Consultant Logo"
  width={200}
  height={100}
  priority={false}
  placeholder="blur"
/>
```

### Testing Considerations

#### Component Testing
```typescript
// Test component variants
describe('Button', () => {
  it('renders with correct variant styles', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})

// Test accessibility
it('has proper ARIA attributes', () => {
  render(<Button aria-label="Close dialog"><X /></Button>)
  expect(screen.getByLabelText('Close dialog')).toBeInTheDocument()
})
```

#### Business Logic Testing
```typescript
// Test status calculations
describe('getTaskStatus', () => {
  it('returns green for completed tasks', () => {
    expect(getTaskStatus(5, 5, 0)).toBe('completed')
  })
  
  it('returns red for overdue tasks', () => {
    expect(getTaskStatus(2, 5, 4)).toBe('overdue')
  })
})
```

### File Organization

#### Directory Structure
```
src/
├── components/
│   ├── ui/                    # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── AppLayout.tsx          # Layout components
│   ├── AuthAwareButtons.tsx   # Business logic components
│   └── ...
├── app/                       # Next.js app router pages
├── lib/
│   ├── context/              # React context providers
│   ├── supabase/            # Database clients
│   ├── utils.ts             # Utility functions
│   └── types.ts             # Type definitions
└── styles/
    └── globals.css          # Global styles and CSS variables
```

#### Naming Conventions
- **Components**: PascalCase (`UserAvatar`, `TaskStatusIndicator`)
- **Files**: kebab-case for pages (`user-settings/page.tsx`)
- **CSS Classes**: kebab-case (`task-status`, `user-avatar`)
- **Variables**: camelCase (`isLoading`, `userEmail`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_UPLOAD_SIZE`)

---

## Conclusion

This style guide represents the current implementation of the 10-box OS design system. It should be updated as new components are added and patterns evolve. The focus remains on maintaining consistency, accessibility, and the professional aesthetic that supports the business consultant user base.

For questions about implementation or to propose changes to the design system, refer to the codebase examples provided throughout this guide.

---

*Last updated: Generated from codebase analysis*