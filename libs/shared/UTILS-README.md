# Shared Utility Functions - Usage Summary

I've created a comprehensive set of reusable utility functions for your HRIS application! 🎉

## 📦 What's Included

### 5 Categories of Utils:
1. **String Utils** - Text formatting, capitalization, name handling
2. **Date Utils** - Date formatting, calculations, validations
3. **Array Utils** - Grouping, sorting, deduplication
4. **Validation Utils** - Email, phone, empty checks
5. **Number Utils** - Currency formatting, percentages, rounding

## 📚 Documentation Files

1. **`QUICK-REFERENCE.md`** - Fast lookup table with examples
2. **`lib/utils/EXAMPLES.md`** - Comprehensive guide with detailed use cases

## 💻 Code Examples

### API Examples
- **`apps/rp-hris-api/src/app/example.controller.ts`**
  - Employee creation with validation
  - Leave request processing
  - Payroll report generation
  - Employee statistics

### Web Examples
- **`apps/rp-hris-web/src/app/example-components.tsx`**
  - EmployeeCard component
  - LeaveRequestForm with validation
  - EmployeeForm with email/phone validation
  - EmployeeDashboard with stats
  - DepartmentEmployeeList with filtering

## 🚀 How to Use

Import from the shared package:

```typescript
import { 
  formatFullName, 
  formatCurrency, 
  daysBetween,
  isValidEmail 
} from '@rp-hris/shared';
```

## 🎯 Common HRIS Use Cases

✅ **Employee Management**
- Format names: `formatFullName(firstName, lastName)`
- Validate emails: `isValidEmail(email)`
- Validate PH mobile: `isValidPhilippineMobile(phone)`

✅ **Leave Management**
- Calculate duration: `daysBetween(startDate, endDate)`
- Validate dates: `isPast(date)`, `isFuture(date)`
- Format dates: `formatDate(date)`

✅ **Payroll**
- Format currency: `formatCurrency(50000)` → ₱50,000.00
- Calculate percentages: `calculatePercentage(value, total)`
- Round amounts: `roundTo(amount, 2)`

✅ **Reporting**
- Group by department: `groupBy(employees, 'department')`
- Sort employees: `sortBy(employees, 'lastName')`
- Get unique values: `unique(array)`

## ✨ Features

- ✅ Fully typed with TypeScript
- ✅ JSDoc comments for IntelliSense
- ✅ Philippine-specific (currency, mobile validation)
- ✅ Works in both API and Web apps
- ✅ Tree-shakeable (import only what you need)

## 📖 Next Steps

1. Check out `QUICK-REFERENCE.md` for a fast lookup
2. Read `lib/utils/EXAMPLES.md` for detailed examples
3. Try the example code in `example.controller.ts` and `example-components.tsx`
4. Start using these utils in your actual code!

Happy coding! 🚀
