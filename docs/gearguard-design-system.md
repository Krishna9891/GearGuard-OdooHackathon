# GearGuard Design System

## Theme Specification

**Theme:** Modern Industrial SaaS
**Target Users:** Maintenance technicians, managers, engineers

---

## 1. COLOR PALETTE

### Primary Colors (Brand Identity)

```
PRIMARY BLUE (Main Brand Color)
- Primary 600: #2563EB (Buttons, Headers, Active States)
- Primary 500: #3B82F6 (Links, Icons)
- Primary 400: #60A5FA (Hover States)
- Primary 300: #93C5FD (Borders, Subtle Highlights)
- Primary 100: #DBEAFE (Backgrounds, Cards)
- Primary 50: #EFF6FF (Page Backgrounds)

Usage:
- Main navigation background: Primary 600
- Primary action buttons: Primary 600
- Links and interactive elements: Primary 500
- Card borders on hover: Primary 300
```

### Semantic Colors (Status & Feedback)

```
SUCCESS GREEN (Repaired, Completed, Active)
- Success 600: #16A34A
- Success 500: #22C55E
- Success 100: #DCFCE7
- Success 50: #F0FDF4

WARNING ORANGE (In Progress, Medium Priority)
- Warning 600: #EA580C
- Warning 500: #F97316
- Warning 100: #FFEDD5
- Warning 50: #FFF7ED

DANGER RED (Critical, Scrap, Overdue)
- Danger 600: #DC2626
- Danger 500: #EF4444
- Danger 100: #FEE2E2
- Danger 50: #FEF2F2

INFO YELLOW (New, Pending)
- Info 600: #CA8A04
- Info 500: #EAB308
- Info 100: #FEF3C7
- Info 50: #FEFCE8

NEUTRAL GRAY (Text, Backgrounds, Borders)
- Gray 900: #111827 (Primary Text)
- Gray 800: #1F2937 (Headers)
- Gray 700: #374151 (Secondary Text)
- Gray 600: #4B5563 (Muted Text)
- Gray 500: #6B7280 (Placeholder Text)
- Gray 400: #9CA3AF (Disabled Text)
- Gray 300: #D1D5DB (Borders)
- Gray 200: #E5E7EB (Dividers)
- Gray 100: #F3F4F6 (Card Background)
- Gray 50: #F9FAFB (Page Background)
```

### Accent Colors

```
ACCENT PURPLE (Premium Features, Analytics)
- Accent 600: #7C3AED
- Accent 500: #8B5CF6
- Accent 100: #EDE9FE

ACCENT TEAL (Preventive Maintenance)
- Accent 600: #0D9488
- Accent 500: #14B8A6
- Accent 100: #CCFBF1
```

---

## 2. TYPOGRAPHY

### Font Families

```
PRIMARY FONT (UI Text):
- Family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Usage: All UI elements, body text, buttons, forms

MONOSPACE FONT (Technical Data):
- Family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace
- Weights: 400, 500, 600
- Usage: Serial numbers, request IDs, timestamps, codes
```

### Font Sizes & Line Heights

```
HEADINGS:
- H1: 36px / 40px (Page Titles)
  Font Weight: 700, Color: Gray 900

- H2: 30px / 36px (Section Headers)
  Font Weight: 700, Color: Gray 800

- H3: 24px / 32px (Card Titles)
  Font Weight: 600, Color: Gray 800

- H4: 20px / 28px (Subsections)
  Font Weight: 600, Color: Gray 700

- H5: 18px / 28px (Small Headers)
  Font Weight: 600, Color: Gray 700

BODY TEXT:
- Large: 16px / 24px (Primary Content)
  Font Weight: 400, Color: Gray 700

- Base: 14px / 20px (Default Text)
  Font Weight: 400, Color: Gray 700

- Small: 12px / 16px (Labels, Captions)
  Font Weight: 500, Color: Gray 600

- Tiny: 11px / 16px (Metadata, Timestamps)
  Font Weight: 400, Color: Gray 500

TECHNICAL TEXT (Monospace):
- Request IDs: 14px / 20px, Weight: 500
- Serial Numbers: 13px / 18px, Weight: 500
- Timestamps: 12px / 16px, Weight: 400
```

---

## 3. COMPONENT DESIGN PATTERNS

### Buttons

```
PRIMARY BUTTON (Main Actions):
- Background: Primary 600 (#2563EB)
- Text: White, 14px, Weight: 600
- Padding: 12px 24px
- Border Radius: 8px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover: Background Primary 700, Shadow: 0 4px 6px rgba(0,0,0,0.1)
- Active: Background Primary 800, Scale: 0.98
- Disabled: Background Gray 300, Text Gray 500, No Shadow
- Transition: all 0.2s ease

Examples:
- "Create Request", "Save Equipment", "Assign Technician"

SECONDARY BUTTON (Cancel, Alternative Actions):
- Background: White
- Border: 2px solid Gray 300
- Text: Gray 700, 14px, Weight: 600
- Padding: 11px 23px (adjusted for border)
- Border Radius: 8px
- Hover: Background Gray 50, Border Gray 400
- Active: Background Gray 100

SUCCESS BUTTON (Complete, Approve):
- Background: Success 600 (#16A34A)
- Text: White, 14px, Weight: 600
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Background Success 700

DANGER BUTTON (Delete, Scrap):
- Background: Danger 600 (#DC2626)
- Text: White, 14px, Weight: 600
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Background Danger 700

GHOST BUTTON (Subtle Actions):
- Background: Transparent
- Text: Primary 600, 14px, Weight: 600
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Background Primary 50

ICON BUTTON (Small Actions):
- Size: 40px × 40px
- Background: Transparent
- Icon: 20px, Color: Gray 600
- Border Radius: 8px
- Hover: Background Gray 100, Icon Color Primary 600
- Active: Background Gray 200
```

### Cards

```
BASE CARD:
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px rgba(0,0,0,0.05)
- Hover: Shadow: 0 4px 12px rgba(0,0,0,0.08), Border: Gray 300
- Transition: all 0.25s ease

EQUIPMENT CARD:
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 16px
- Padding: 20px
- Shadow: 0 2px 4px rgba(0,0,0,0.04)
- Header Section:
  - Equipment Image: 48px × 48px circle, Background Gray 100
  - Name: 18px Bold, Gray 900
  - Serial Number: 12px Monospace, Gray 500
- Body Section:
  - Status Badge: Top-right corner
  - Location: 14px, Gray 600, Icon prefix
  - Department: 14px, Gray 600
- Footer Section:
  - Smart Button: Primary 600, Count Badge
- Hover State:
  - Translate Y: -4px
  - Shadow: 0 8px 16px rgba(0,0,0,0.1)
  - Border: Primary 300

KANBAN CARD (Request Card):
- Background: White
- Border: 2px solid Gray 200
- Border Radius: 12px
- Padding: 16px
- Shadow: 0 2px 6px rgba(0,0,0,0.06)
- Cursor: grab (when dragging: grabbing)

Card Structure:
1. Priority Badge (Top-right): Star icon + Color
2. Request Number (Monospace, 12px, Gray 500)
3. Subject (16px Bold, Gray 900)
4. Equipment Name (14px, Gray 600, Wrench icon)
5. Technician Avatar (32px circle, bottom-left)
6. Scheduled Date (12px, Gray 500, bottom-right)

Overdue Style:
- Border: 2px solid Danger 500
- Background: Danger 50
- Pulsing animation on border

Dragging Style:
- Opacity: 0.8
- Scale: 1.05
- Shadow: 0 12px 24px rgba(0,0,0,0.2)
- Rotate: 2deg

STAT CARD (KPI Dashboard):
- Background: Gradient (Primary 50 to White)
- Border: None
- Border Radius: 16px
- Padding: 24px
- Shadow: 0 4px 8px rgba(0,0,0,0.04)

Structure:
- Icon: 48px, Color matching stat type, Background colored circle
- Label: 14px, Gray 600, Uppercase
- Value: 36px, Bold, Gray 900
- Trend Arrow: Small icon with percentage
```

### Forms & Inputs

```
TEXT INPUT:
- Background: White
- Border: 1px solid Gray 300
- Border Radius: 8px
- Padding: 12px 16px
- Font Size: 14px, Color: Gray 900
- Placeholder: Gray 400
- Focus:
  - Border: 2px solid Primary 500
  - Shadow: 0 0 0 3px rgba(59,130,246,0.1)
- Error:
  - Border: 2px solid Danger 500
  - Shadow: 0 0 0 3px rgba(239,68,68,0.1)
- Disabled:
  - Background: Gray 50
  - Border: Gray 200
  - Text: Gray 400

SELECT DROPDOWN:
- Same as text input
- Arrow Icon: 16px, Gray 400, right-aligned
- Dropdown Menu:
  - Background: White
  - Border: 1px solid Gray 200
  - Border Radius: 8px
  - Shadow: 0 4px 12px rgba(0,0,0,0.1)
  - Max Height: 300px, Scrollable
- Option:
  - Padding: 10px 16px
  - Hover: Background Primary 50
  - Selected: Background Primary 100, Text Primary 700

TEXTAREA:
- Same as text input
- Min Height: 120px
- Resize: vertical

CHECKBOX:
- Size: 20px × 20px
- Border: 2px solid Gray 300
- Border Radius: 4px
- Checked:
  - Background: Primary 600
  - Border: Primary 600
  - Checkmark: White
- Focus: Shadow: 0 0 0 3px rgba(59,130,246,0.1)

RADIO BUTTON:
- Size: 20px × 20px
- Border: 2px solid Gray 300
- Border Radius: 50%
- Checked:
  - Border: Primary 600
  - Inner Dot: 10px, Primary 600
- Focus: Shadow: 0 0 0 3px rgba(59,130,246,0.1)

LABEL:
- Font Size: 14px
- Font Weight: 600
- Color: Gray 700
- Margin Bottom: 8px
- Required asterisk: Danger 500

ERROR MESSAGE:
- Font Size: 12px
- Color: Danger 600
- Icon: Alert circle, 14px
- Margin Top: 6px
```

### Badges & Tags

```
STATUS BADGE:
- Padding: 6px 12px
- Border Radius: 9999px (full rounded)
- Font Size: 12px
- Font Weight: 600
- Letter Spacing: 0.025em
- Uppercase

NEW:
- Background: Info 100 (#FEF3C7)
- Text: Info 700 (#A16207)
- Border: 1px solid Info 300

IN PROGRESS:
- Background: Warning 100 (#FFEDD5)
- Text: Warning 700 (#C2410C)
- Border: 1px solid Warning 300

REPAIRED:
- Background: Success 100 (#DCFCE7)
- Text: Success 700 (#15803D)
- Border: 1px solid Success 300

SCRAP:
- Background: Danger 100 (#FEE2E2)
- Text: Danger 700 (#B91C1C)
- Border: 1px solid Danger 300

ACTIVE:
- Background: Success 50
- Text: Success 600
- Dot: 8px circle, Success 500, pulsing animation

UNDER MAINTENANCE:
- Background: Warning 50
- Text: Warning 600
- Dot: 8px circle, Warning 500

SCRAPPED:
- Background: Gray 100
- Text: Gray 600
- Line-through text

PRIORITY BADGE:
- Size: 24px × 24px
- Border Radius: 4px
- Icon: 16px

CRITICAL:
- Background: Danger 600
- Icon: Diamond, White
- Animation: Pulse glow

HIGH:
- Background: Warning 600
- Icon: Star, White

MEDIUM:
- Background: Primary 500
- Icon: Circle, White

LOW:
- Background: Gray 400
- Icon: Minus, White

COUNT BADGE (Smart Button):
- Size: 20px × 20px
- Background: Danger 500
- Text: White, 11px, Bold
- Border Radius: 9999px
- Position: absolute, top-right of parent
- Border: 2px solid White
- Animation: Scale pulse when count changes
```

### Tables

```
TABLE CONTAINER:
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 12px
- Shadow: 0 1px 3px rgba(0,0,0,0.05)
- Overflow: hidden

TABLE HEADER:
- Background: Gray 50
- Border Bottom: 2px solid Gray 200
- Padding: 16px 20px
- Font Size: 12px
- Font Weight: 700
- Color: Gray 700
- Text Transform: Uppercase
- Letter Spacing: 0.05em

TABLE ROW:
- Border Bottom: 1px solid Gray 100
- Padding: 16px 20px
- Font Size: 14px
- Color: Gray 700
- Hover: Background Gray 50
- Transition: background 0.15s ease

TABLE CELL:
- Padding: 16px 20px
- Vertical Align: middle

ACTIONS COLUMN:
- Text Align: right
- Icon buttons: 32px × 32px
- Gap: 8px
```

### Navigation

```
TOP NAVBAR:
- Height: 64px
- Background: White
- Border Bottom: 1px solid Gray 200
- Shadow: 0 1px 3px rgba(0,0,0,0.05)
- Padding: 0 32px
- Z-index: 1000

Structure:
- Left: Logo + App Name (20px Bold)
- Center: Search Bar (max-width 500px)
- Right: Notifications + User Avatar Menu

SIDEBAR NAVIGATION:
- Width: 260px
- Background: Gray 900 (Dark Mode) or White (Light Mode)
- Border Right: 1px solid Gray 200
- Padding: 24px 16px
- Height: calc(100vh - 64px)

Navigation Item:
- Padding: 12px 16px
- Border Radius: 8px
- Font Size: 14px
- Font Weight: 500
- Color: Gray 700 (Light) or Gray 300 (Dark)
- Icon: 20px, Left-aligned with 12px gap
- Hover: Background Gray 100 (Light) or Gray 800 (Dark)
- Active:
  - Background Primary 50 (Light) or Primary 900 (Dark)
  - Text: Primary 700 (Light) or Primary 300 (Dark)
  - Border Left: 3px solid Primary 600

BREADCRUMB:
- Font Size: 14px
- Color: Gray 600
- Separator: "/" or ">" in Gray 400
- Current Page: Gray 900, No link
- Links: Hover to Primary 600
```

### Modals & Dialogs

```
MODAL OVERLAY:
- Background: rgba(0,0,0,0.5)
- Backdrop Filter: blur(4px)
- Z-index: 2000
- Animation: Fade in 0.2s

MODAL CONTAINER:
- Background: White
- Border Radius: 16px
- Shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)
- Max Width: 600px (Default), 900px (Large)
- Padding: 0
- Animation: Scale from 0.95 to 1, fade in 0.3s

MODAL HEADER:
- Padding: 24px 32px
- Border Bottom: 1px solid Gray 200
- Title: 20px Bold, Gray 900
- Close Button: Top-right, 32px × 32px, Icon 20px

MODAL BODY:
- Padding: 32px
- Max Height: calc(100vh - 200px)
- Overflow Y: auto

MODAL FOOTER:
- Padding: 20px 32px
- Border Top: 1px solid Gray 200
- Background: Gray 50
- Buttons: Right-aligned, Gap 12px

CONFIRMATION DIALOG:
- Max Width: 400px
- Icon: 48px, Warning/Danger color, centered
- Message: 16px, Gray 700, centered
- Actions: Centered, horizontal buttons
```

### Charts & Graphs

```
CHART CONTAINER:
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px rgba(0,0,0,0.05)

CHART HEADER:
- Title: 18px Bold, Gray 900
- Subtitle: 14px, Gray 600
- Margin Bottom: 24px

BAR CHART:
- Bar Color: Primary 500
- Bar Hover: Primary 600
- Bar Radius: 4px (top corners)
- Grid Lines: Gray 200, Dashed
- Axis Labels: 12px, Gray 600

PIE/DONUT CHART:
- Segment Colors:
  - New: Info 500
  - In Progress: Warning 500
  - Repaired: Success 500
  - Scrap: Danger 500
- Stroke: White, 2px
- Hover: Scale 1.05, Opacity 0.8

LEGEND:
- Font Size: 12px
- Color Indicator: 12px × 12px square, Border Radius 2px
- Gap: 8px between label and indicator
- Layout: Horizontal, wrap
```

---

## 4. LAYOUT & SPACING

### Grid System

```
CONTAINER MAX WIDTHS:
- Small: 640px
- Medium: 768px
- Large: 1024px
- XL: 1280px
- 2XL: 1536px

PAGE PADDING:
- Mobile: 16px
- Tablet: 24px
- Desktop: 32px

SECTION SPACING:
- Between sections: 48px (Desktop), 32px (Mobile)
- Between cards: 24px
- Between form fields: 20px
- Between buttons: 12px

CARD GRID:
- Columns: 1 (Mobile), 2 (Tablet), 3 (Desktop), 4 (Large Desktop)
- Gap: 24px
```

### Responsive Breakpoints

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: 1024px - 1280px
Large Desktop: > 1280px
```

---

## 5. VISUAL EFFECTS

### Shadows

```
ELEVATION 1 (Cards, Inputs):
- box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)

ELEVATION 2 (Dropdowns, Tooltips):
- box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)

ELEVATION 3 (Modals, Popovers):
- box-shadow: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)

ELEVATION 4 (Dialogs):
- box-shadow: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)

INNER SHADOW (Pressed Buttons):
- box-shadow: inset 0 2px 4px rgba(0,0,0,0.06)
```

### Animations

```
FADE IN:
- Opacity: 0 to 1
- Duration: 0.3s
- Timing: ease-out

SLIDE IN (FROM BOTTOM):
- Transform: translateY(20px) to translateY(0)
- Opacity: 0 to 1
- Duration: 0.4s
- Timing: cubic-bezier(0.4, 0, 0.2, 1)

SCALE PULSE (Badge Count):
- Transform: scale(1) to scale(1.1) to scale(1)
- Duration: 0.6s
- Timing: ease-in-out
- Iteration: infinite

SHIMMER (Loading):
- Background: Linear gradient moving left to right
- Colors: Gray 100 to Gray 200 to Gray 100
- Duration: 1.5s
- Timing: ease-in-out
- Iteration: infinite

BOUNCE (Success Feedback):
- Transform: scale(1) to scale(1.2) to scale(0.9) to scale(1)
- Duration: 0.5s
- Timing: cubic-bezier(0.68, -0.55, 0.265, 1.55)

HOVER LIFT (Cards):
- Transform: translateY(0) to translateY(-4px)
- Duration: 0.25s
- Timing: ease-out

DRAG CURSOR:
- Cursor: grab (idle)
- Cursor: grabbing (active)
- Scale: 1.05 (while dragging)
- Opacity: 0.8 (while dragging)
```

### Glassmorphism (Premium Cards)

```
GLASS CARD:
- Background: rgba(255, 255, 255, 0.7)
- Backdrop Filter: blur(10px) saturate(180%)
- Border: 1px solid rgba(255, 255, 255, 0.3)
- Shadow: 0 8px 32px rgba(0, 0, 0, 0.1)

Usage: Dashboard KPI cards, featured equipment
```

### Gradients

```
PRIMARY GRADIENT:
- Linear: from Primary 600 to Primary 400
- Angle: 135deg
- Usage: Hero sections, premium buttons

SUCCESS GRADIENT:
- Linear: from Success 600 to Success 400
- Angle: 135deg

SUNSET GRADIENT (Dashboard Background):
- Linear: from Primary 50 via Purple 50 to Pink 50
- Angle: 180deg
```

---

## 6. ICONOGRAPHY

### Icon Library
**Recommended:** Lucide React or Heroicons

### Icon Sizes

```
TINY: 14px (Inline text icons)
SMALL: 16px (Form labels, badges)
MEDIUM: 20px (Buttons, navigation)
LARGE: 24px (Cards, section headers)
XL: 32px (Empty states)
2XL: 48px (Modal headers, KPI cards)
3XL: 64px (Hero sections)
```

### Icon Colors

```
PRIMARY: Gray 600 (default)
ACTIVE: Primary 600
MUTED: Gray 400
DANGER: Danger 600
SUCCESS: Success 600
WARNING: Warning 600
```

### Key Icons Mapping

```
Equipment: Wrench, Tool, Cog
Request: ClipboardList, AlertCircle
Calendar: Calendar, Clock
Dashboard: LayoutDashboard, BarChart2
Team: Users, UserGroup
User: User, UserCircle
Settings: Settings, Sliders
Notification: Bell, AlertTriangle
Success: CheckCircle, Check
Error: XCircle, AlertCircle
Warning: AlertTriangle
Info: Info, HelpCircle
Search: Search, Filter
Edit: Edit2, Pencil
Delete: Trash2, X
Download: Download, ArrowDown
Upload: Upload, ArrowUp
More: MoreHorizontal, MoreVertical
```

---

## 7. DARK MODE

### Dark Mode Palette

```
BACKGROUNDS:
- Primary: #0F172A (Slate 900)
- Secondary: #1E293B (Slate 800)
- Tertiary: #334155 (Slate 700)

TEXT:
- Primary: #F1F5F9 (Slate 100)
- Secondary: #CBD5E1 (Slate 300)
- Muted: #64748B (Slate 500)

BORDERS:
- Default: #334155 (Slate 700)
- Subtle: #1E293B (Slate 800)

COMPONENT ADJUSTMENTS:
- Cards: Background Slate 800, Border Slate 700
- Inputs: Background Slate 900, Border Slate 600
- Buttons: Primary stays same, Secondary uses Slate 700
- Hover states: Lighten by 1-2 shades
```

---

## 8. SPECIFIC PAGE DESIGNS

### Login Page

```
LAYOUT:
- Full screen split: Left (50%) = Hero/Branding, Right (50%) = Form
- Mobile: Stacked vertical

LEFT SECTION (Hero):
- Background: Gradient (Primary 600 to Purple 600)
- Logo: White, 48px
- Tagline: "Streamline Your Maintenance Workflow"
- Font: 36px Bold, White
- Illustration: 3D machine/gear graphic (optional)

RIGHT SECTION (Form):
- Background: White
- Container: Max-width 400px, Centered
- Title: "Welcome Back", 30px Bold
- Subtitle: "Enter your credentials", 14px Gray 600
- Form Fields: Email, Password (with show/hide toggle)
- Remember Me: Checkbox
- Forgot Password: Link, Primary 600, right-aligned
- Login Button: Full width, Primary 600
- Divider: "OR" with horizontal lines
- Quick Login Buttons: 3 pills for demo roles
  - Background: Gray 100
  - Hover: Gray 200
  - Icon: User role icon + "Login as Technician"
```

### Dashboard

```
LAYOUT:
- Header: Welcome message + Date
- Row 1: 4 KPI Stat Cards (Equal width)
- Row 2: 2 Charts (60% Bar, 40% Pie)
- Row 3: Recent Activity Table (Full width)

KPI CARDS:
- Height: 140px
- Glassmorphism effect
- Icon: Top-left, colored circle background
- Value: Center, 36px Bold
- Label: Bottom, 12px Uppercase
- Trend: Small arrow + percentage

CHARTS:
- White background cards
- Header with title + export button
- Chart area with proper padding
- Legend at bottom

RECENT ACTIVITY:
- Table with 5 most recent items
- Columns: Time, User, Action, Equipment, Status
- Status badges for visual appeal
```

### Kanban Board (Requests Page)

```
LAYOUT:
- Full width, horizontal scroll on mobile
- 4 Columns: New | In Progress | Repaired | Scrap
- Equal width columns with min-width 300px

COLUMN DESIGN:
- Header:
  - Stage name: 16px Bold
  - Count badge: Small circle
  - Background color matching stage
  - Padding: 16px
- Body:
  - Background: Gray 50
  - Padding: 16px
  - Min Height: 600px
  - Gap between cards: 12px
  - Drop zone indicator: Dashed border when dragging

DRAG STATES:
- Drag start: Card lifts with shadow
- Drag over: Column highlights with colored border
- Drop: Smooth animation to new position
```

### Equipment Page

```
LAYOUT:
- Header: Title + "Add Equipment" button
- Filters: Category, Department, Status (horizontal pills)
- Grid: 3 columns on desktop, responsive

EQUIPMENT CARD:
- Image placeholder: 64px circle, Gray 100, Icon centered
- Name: 18px Bold, truncate at 2 lines
- Serial: 12px Monospace, Gray 500
- Location: 14px, Icon + Text
- Status badge: Top-right corner
- Smart button: Bottom, full-width, count badge
- Hover: Lift effect, border glow
```

### Calendar View

```
CALENDAR STYLES:
- Month view default
- Header: Current month/year, navigation arrows
- Day cells: 
  - Size: 120px height
  - Border: 1px solid Gray 200
  - Hover: Background Primary 50
- Events:
  - Small pill shape
  - Truncated text with tooltip on hover
  - Color-coded by team
- Today: Border 2px solid Primary 600
- Selected date: Background Primary 100
```

---

## 9. LOADING & EMPTY STATES

### Loading Indicators

```
SPINNER:
- Size: 32px
- Border: 3px
- Color: Primary 600
- Animation: Spin 1s linear infinite

SKELETON LOADER:
- Background: Gray 200
- Animation: Pulse or shimmer
- Border Radius: Match actual component
- Use for: Cards, tables, forms while data loads

PROGRESS BAR:
- Height: 4px
- Background: Gray 200
- Fill: Primary 600
- Animation: Indeterminate slide
```

### Empty States

```
CONTAINER:
- Centered text and icon
- Max Width: 400px
- Padding: 48px

ICON:
- Size: 64px
- Color: Gray 400
- Matching the empty content type

TITLE:
- 20px Bold, Gray 900
- "No equipment found"

MESSAGE:
- 14px, Gray 600
- "Add your first equipment to get started"

ACTION BUTTON:
- Primary button
- "Add Equipment" with Plus icon
```

---

## 10. ACCESSIBILITY

```
FOCUS STATES:
- All interactive elements must have visible focus
- Style: 2px solid Primary 600, offset 2px
- Border Radius: Match element

CONTRAST RATIOS:
- Text on background: Minimum 4.5:1
- Large text (18px+): Minimum 3:1
- Interactive elements: Minimum 3:1

KEYBOARD NAVIGATION:
- Tab order must be logical
- Modals trap focus
- Escape key closes modals
- Arrow keys navigate menus

SCREEN READER:
- All icons have aria-labels
- Form inputs have associated labels
- Buttons have descriptive text
- Loading states announced
```