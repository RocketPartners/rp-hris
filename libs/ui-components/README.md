# @rp-hris/ui-components

A comprehensive React UI component library built with Tailwind CSS for the RP-HRIS application.

## Installation

The library is available as `@rp-hris/ui-components` within the monorepo.

```tsx
import { Button, Input, Card, Badge } from '@rp-hris/ui-components';
```

## Components

### Button

A versatile button component with multiple variants, sizes, and states.

```tsx
import { Button } from '@rp-hris/ui-components';

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowIcon />}>Next</Button>

// Loading state
<Button loading loadingText="Saving...">Save</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `loadingText`: string
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode
- `fullWidth`: boolean

---

### Input

A form input component with label, error, and hint support.

```tsx
import { Input } from '@rp-hris/ui-components';

// Basic usage
<Input placeholder="Enter your name" />

// With label
<Input label="Email" type="email" placeholder="you@example.com" />

// With error
<Input label="Username" error="Username is required" />

// With hint
<Input label="Password" type="password" hint="Must be at least 8 characters" />

// Sizes
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
```

**Props:**
- `label`: string
- `error`: string
- `hint`: string
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- All standard input attributes

---

### Card

A container component for grouping related content.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@rp-hris/ui-components';

<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Without padding
<Card padding="none">...</Card>

// Shadow variants
<Card shadow="sm">Small shadow</Card>
<Card shadow="lg">Large shadow</Card>

// Without border
<Card border={false}>No border</Card>
```

**Props:**
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `shadow`: 'none' | 'sm' | 'md' | 'lg'
- `border`: boolean
- `rounded`: boolean

---

### Badge

A small label component for status indicators and counts.

```tsx
import { Badge } from '@rp-hris/ui-components';

// Variants
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="lg">Large</Badge>

// Rounded (pill)
<Badge rounded>Rounded</Badge>

// With dot indicator
<Badge dot>Online</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `rounded`: boolean
- `dot`: boolean

---

### Alert

A component for displaying messages and notifications.

```tsx
import { Alert } from '@rp-hris/ui-components';

// Variants
<Alert variant="info">Informational message</Alert>
<Alert variant="success">Success message</Alert>
<Alert variant="warning">Warning message</Alert>
<Alert variant="error">Error message</Alert>

// With title
<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>

// Dismissible
<Alert variant="info" dismissible onDismiss={() => console.log('dismissed')}>
  Click the X to dismiss
</Alert>

// With custom icon
<Alert variant="info" icon={<CustomIcon />}>
  Custom icon alert
</Alert>

// Without icon
<Alert variant="info" icon={null}>
  No icon alert
</Alert>
```

**Props:**
- `variant`: 'info' | 'success' | 'warning' | 'error'
- `title`: string
- `dismissible`: boolean
- `onDismiss`: () => void
- `icon`: ReactNode | null

---

### Select

A dropdown select component.

```tsx
import { Select } from '@rp-hris/ui-components';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

<Select options={options} placeholder="Select an option" />

// With label
<Select label="Country" options={countries} />

// With error
<Select label="Department" options={departments} error="Please select a department" />

// Sizes
<Select size="sm" options={options} />
<Select size="lg" options={options} />
```

**Props:**
- `options`: Array<{ value: string; label: string; disabled?: boolean }>
- `label`: string
- `error`: string
- `placeholder`: string
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean

---

### Textarea

A multi-line text input component.

```tsx
import { Textarea } from '@rp-hris/ui-components';

// Basic usage
<Textarea placeholder="Enter your message" />

// With label
<Textarea label="Description" rows={4} />

// With error
<Textarea label="Comments" error="Comments are required" />

// Resize options
<Textarea resize="none" />
<Textarea resize="vertical" />
<Textarea resize="horizontal" />
<Textarea resize="both" />
```

**Props:**
- `label`: string
- `error`: string
- `hint`: string
- `resize`: 'none' | 'vertical' | 'horizontal' | 'both'
- `fullWidth`: boolean

---

### Checkbox

A checkbox input component with label and description support.

```tsx
import { Checkbox } from '@rp-hris/ui-components';

// Basic usage
<Checkbox label="I agree to the terms" />

// With description
<Checkbox 
  label="Marketing emails" 
  description="Receive updates about new features and promotions"
/>

// With error
<Checkbox label="Accept terms" error="You must accept the terms" />

// Sizes
<Checkbox size="sm" label="Small" />
<Checkbox size="lg" label="Large" />
```

**Props:**
- `label`: string
- `description`: string
- `error`: string
- `size`: 'sm' | 'md' | 'lg'

---

### Avatar

A component for displaying user avatars with images or initials.

```tsx
import { Avatar, AvatarGroup } from '@rp-hris/ui-components';

// With image
<Avatar src="/path/to/image.jpg" alt="John Doe" />

// With initials (fallback when no image)
<Avatar name="John Doe" />

// Sizes
<Avatar size="xs" name="JD" />
<Avatar size="sm" name="JD" />
<Avatar size="md" name="JD" />
<Avatar size="lg" name="JD" />
<Avatar size="xl" name="JD" />

// Shapes
<Avatar shape="circle" name="JD" />
<Avatar shape="square" name="JD" />

// With status indicator
<Avatar name="JD" status="online" />
<Avatar name="JD" status="offline" />
<Avatar name="JD" status="busy" />
<Avatar name="JD" status="away" />

// Avatar group
<AvatarGroup max={3}>
  <Avatar name="John Doe" />
  <Avatar name="Jane Smith" />
  <Avatar name="Bob Wilson" />
  <Avatar name="Alice Brown" />
</AvatarGroup>
```

**Props (Avatar):**
- `src`: string
- `alt`: string
- `name`: string
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `shape`: 'circle' | 'square'
- `status`: 'online' | 'offline' | 'busy' | 'away'

**Props (AvatarGroup):**
- `max`: number
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

---

### Spinner

A loading indicator component.

```tsx
import { Spinner } from '@rp-hris/ui-components';

// Basic usage
<Spinner />

// Sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />

// Variants
<Spinner variant="primary" />
<Spinner variant="secondary" />
<Spinner variant="white" />

// With label
<Spinner label="Loading..." />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'primary' | 'secondary' | 'white'
- `label`: string

---

### Tabs

A tabbed navigation component.

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@rp-hris/ui-components';

// Basic usage
<Tabs defaultIndex={0}>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab disabled>Tab 3 (Disabled)</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
    <TabPanel>Content 3</TabPanel>
  </TabPanels>
</Tabs>

// Controlled
const [index, setIndex] = useState(0);
<Tabs index={index} onChange={setIndex}>
  ...
</Tabs>

// Variants
<Tabs variant="line">...</Tabs>
<Tabs variant="enclosed">...</Tabs>
<Tabs variant="pills">...</Tabs>

// Orientations
<Tabs orientation="horizontal">...</Tabs>
<Tabs orientation="vertical">...</Tabs>
```

**Props (Tabs):**
- `defaultIndex`: number
- `index`: number (controlled)
- `onChange`: (index: number) => void
- `variant`: 'line' | 'enclosed' | 'pills'
- `orientation`: 'horizontal' | 'vertical'

---

### Modal

A dialog/modal component for overlays.

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@rp-hris/ui-components';

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>Modal Title</ModalHeader>
  <ModalBody>
    <p>Modal content goes here</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button>Confirm</Button>
  </ModalFooter>
</Modal>

// Sizes
<Modal size="sm" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="md" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="lg" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="xl" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="full" isOpen={isOpen} onClose={onClose}>...</Modal>

// Options
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  closeOnOverlayClick={false}  // Don't close when clicking backdrop
  closeOnEscape={false}         // Don't close on Escape key
  showCloseButton={false}       // Hide the X button
>
  ...
</Modal>
```

**Props (Modal):**
- `isOpen`: boolean (required)
- `onClose`: () => void (required)
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `closeOnOverlayClick`: boolean (default: true)
- `closeOnEscape`: boolean (default: true)
- `showCloseButton`: boolean (default: true)

---

## Running unit tests

Run `nx test @rp-hris/ui-components` to execute the unit tests via [Vitest](https://vitest.dev/).

## Building

Run `nx build @rp-hris/ui-components` to build the library.
