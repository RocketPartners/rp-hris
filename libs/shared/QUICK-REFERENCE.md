# Shared Utils - Quick Reference Guide

## 🚀 Quick Import

```typescript
import { 
  // String utils
  capitalize, toTitleCase, truncate, formatFullName,
  
  // Date utils
  formatDate, daysBetween, isPast, isFuture, addDays,
  
  // Array utils
  groupBy, unique, chunk, sortBy,
  
  // Validation utils
  isEmpty, isValidEmail, isValidPhilippineMobile, isNumeric,
  
  // Number utils
  formatCurrency, roundTo, calculatePercentage, clamp
} from '@rp-hris/shared';
```

---

## 📚 Function Reference

### String Utils

| Function | Parameters | Returns | Example |
|----------|-----------|---------|---------|
| `capitalize` | `str: string` | `string` | `capitalize('hello')` → `'Hello'` |
| `toTitleCase` | `str: string` | `string` | `toTitleCase('hello world')` → `'Hello World'` |
| `truncate` | `str: string, maxLength: number` | `string` | `truncate('Long text...', 10)` → `'Long text...'` |
| `formatFullName` | `firstName: string, lastName: string` | `string` | `formatFullName('Juan', 'Cruz')` → `'Juan Cruz'` |

### Date Utils

| Function | Parameters | Returns | Example |
|----------|-----------|---------|---------|
| `formatDate` | `date: Date` | `string` | `formatDate(new Date())` → `'2025-11-04'` |
| `daysBetween` | `startDate: Date, endDate: Date` | `number` | `daysBetween(date1, date2)` → `5` |
| `isPast` | `date: Date` | `boolean` | `isPast(new Date('2020-01-01'))` → `true` |
| `isFuture` | `date: Date` | `boolean` | `isFuture(new Date('2030-01-01'))` → `true` |
| `addDays` | `date: Date, days: number` | `Date` | `addDays(new Date(), 7)` → 7 days from now |

### Array Utils

| Function | Parameters | Returns | Example |
|----------|-----------|---------|---------|
| `groupBy` | `array: T[], key: keyof T` | `Record<string, T[]>` | `groupBy(employees, 'department')` |
| `unique` | `array: T[]` | `T[]` | `unique([1, 2, 2, 3])` → `[1, 2, 3]` |
| `chunk` | `array: T[], size: number` | `T[][]` | `chunk([1,2,3,4], 2)` → `[[1,2], [3,4]]` |
| `sortBy` | `array: T[], key: keyof T, order?: 'asc'\|'desc'` | `T[]` | `sortBy(items, 'name', 'asc')` |

### Validation Utils

| Function | Parameters | Returns | Example |
|----------|-----------|---------|---------|
| `isEmpty` | `value: unknown` | `boolean` | `isEmpty('')` → `true` |
| `isValidEmail` | `email: string` | `boolean` | `isValidEmail('test@example.com')` → `true` |
| `isValidPhilippineMobile` | `phone: string` | `boolean` | `isValidPhilippineMobile('09123456789')` → `true` |
| `isNumeric` | `value: unknown` | `boolean` | `isNumeric('123')` → `true` |

### Number Utils

| Function | Parameters | Returns | Example |
|----------|-----------|---------|---------|
| `formatCurrency` | `amount: number` | `string` | `formatCurrency(50000)` → `'₱50,000.00'` |
| `roundTo` | `value: number, decimals?: number` | `number` | `roundTo(3.14159, 2)` → `3.14` |
| `calculatePercentage` | `value: number, total: number` | `number` | `calculatePercentage(25, 100)` → `25` |
| `clamp` | `value: number, min: number, max: number` | `number` | `clamp(150, 0, 100)` → `100` |

---

## 💡 Common Use Cases

### 1. Employee Name Formatting
```typescript
const fullName = formatFullName(employee.firstName, employee.lastName);
const position = toTitleCase(employee.position);
```

### 2. Leave Duration Calculation
```typescript
const duration = daysBetween(leaveRequest.startDate, leaveRequest.endDate);
```

### 3. Form Validation
```typescript
if (!isValidEmail(email)) {
  throw new Error('Invalid email');
}

if (!isValidPhilippineMobile(phone)) {
  throw new Error('Invalid mobile number');
}
```

### 4. Currency Display
```typescript
const salary = formatCurrency(50000); // ₱50,000.00
```

### 5. Group Employees by Department
```typescript
const byDepartment = groupBy(employees, 'department');
// { "Engineering": [...], "HR": [...] }
```

### 6. Calculate Attendance Rate
```typescript
const rate = calculatePercentage(presentDays, totalDays);
// Example: 90.91% if present 20 out of 22 days
```

### 7. Sort and Display
```typescript
const sorted = sortBy(employees, 'lastName', 'asc');
```

### 8. Date Validation
```typescript
if (isPast(leaveDate)) {
  throw new Error('Cannot select past dates');
}
```

---

## 🎯 HRIS-Specific Examples

### Payroll Calculation
```typescript
const grossPay = hoursWorked * hourlyRate;
const taxAmount = roundTo((grossPay * taxRate) / 100);
const netPay = roundTo(grossPay - taxAmount);

console.log(`Gross: ${formatCurrency(grossPay)}`);
console.log(`Tax: ${formatCurrency(taxAmount)}`);
console.log(`Net: ${formatCurrency(netPay)}`);
```

### Leave Balance Display
```typescript
const usedLeave = totalLeave - leaveBalance;
const utilizationRate = calculatePercentage(usedLeave, totalLeave);

console.log(`Used: ${usedLeave} days (${utilizationRate}%)`);
console.log(`Remaining: ${leaveBalance} days`);
```

### Employee Tenure
```typescript
const daysEmployed = daysBetween(hireDate, new Date());
const yearsEmployed = Math.floor(daysEmployed / 365);

console.log(`${yearsEmployed} years with company (${daysEmployed} days)`);
```

### Department Statistics
```typescript
const grouped = groupBy(employees, 'department');
const departments = Object.keys(grouped);

departments.forEach(dept => {
  const count = grouped[dept].length;
  const avgSalary = grouped[dept].reduce((sum, e) => sum + e.salary, 0) / count;
  
  console.log(`${dept}: ${count} employees, avg salary: ${formatCurrency(avgSalary)}`);
});
```

---

## 📝 Tips

1. **Always validate user input** - Use validation utils before processing
2. **Format consistently** - Use the same formatters across API and Web
3. **Handle edge cases** - Check for empty values, null dates, etc.
4. **Type safety** - All utilities are fully typed with TypeScript
5. **Tree shaking** - Import only what you need for optimal bundle size

---

## 📖 More Examples

See detailed examples in:
- `/libs/shared/src/lib/utils/EXAMPLES.md` - Comprehensive guide
- `/apps/rp-hris-api/src/app/example.controller.ts` - API examples
- `/apps/rp-hris-web/src/app/example-components.tsx` - React examples
