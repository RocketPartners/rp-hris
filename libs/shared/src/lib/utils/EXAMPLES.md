# Utility Functions Usage Examples

This document provides practical examples of how to use the shared utility functions in both the API and Web applications.

## 📦 Installation

All utilities are available from the `@rp-hris/shared` package:

```typescript
import { 
  formatCurrency, 
  daysBetween, 
  isValidEmail,
  // ... other utilities
} from '@rp-hris/shared';
```

---

## 🔤 String Utils

### API Examples

```typescript
// app.controller.ts - Formatting employee names
import { formatFullName, toTitleCase } from '@rp-hris/shared';

@Get('employees/:id')
async getEmployee(@Param('id') id: string) {
  const employee = await this.employeeService.findOne(id);
  
  return {
    ...employee,
    fullName: formatFullName(employee.firstName, employee.lastName),
    department: toTitleCase(employee.department), // "HUMAN RESOURCES" → "Human Resources"
  };
}
```

```typescript
// notification.service.ts - Truncating messages
import { truncate } from '@rp-hris/shared';

async sendNotification(userId: string, message: string) {
  const shortMessage = truncate(message, 100); // For SMS or push notifications
  await this.smsService.send(userId, shortMessage);
}
```

### Web Examples

```typescript
// EmployeeCard.tsx - Display employee names
import { formatFullName, capitalize } from '@rp-hris/shared';

export function EmployeeCard({ employee }) {
  return (
    <div className="employee-card">
      <h3>{formatFullName(employee.firstName, employee.lastName)}</h3>
      <p>{capitalize(employee.position)}</p>
    </div>
  );
}
```

```typescript
// NotificationList.tsx - Truncate long notifications
import { truncate } from '@rp-hris/shared';

export function NotificationList({ notifications }) {
  return (
    <ul>
      {notifications.map(notif => (
        <li key={notif.id}>
          {truncate(notif.message, 80)}
        </li>
      ))}
    </ul>
  );
}
```

---

## 📅 Date Utils

### API Examples

```typescript
// leave.controller.ts - Calculate leave duration
import { daysBetween, formatDate, isPast } from '@rp-hris/shared';

@Post('leave-requests')
async createLeaveRequest(@Body() dto: CreateLeaveDto) {
  const duration = daysBetween(dto.startDate, dto.endDate);
  
  if (isPast(dto.startDate)) {
    throw new BadRequestException('Cannot request leave for past dates');
  }
  
  return this.leaveService.create({
    ...dto,
    duration,
    formattedStartDate: formatDate(dto.startDate),
  });
}
```

```typescript
// payroll.service.ts - Calculate pay periods
import { addDays, daysBetween } from '@rp-hris/shared';

calculatePayPeriod(startDate: Date) {
  const endDate = addDays(startDate, 15); // Bi-monthly
  const workDays = daysBetween(startDate, endDate);
  
  return {
    startDate,
    endDate,
    workDays,
  };
}
```

### Web Examples

```typescript
// LeaveRequestForm.tsx - Display leave duration
import { daysBetween, formatDate } from '@rp-hris/shared';
import { useState } from 'react';

export function LeaveRequestForm() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  const duration = startDate && endDate 
    ? daysBetween(startDate, endDate) 
    : 0;
  
  return (
    <form>
      <input type="date" onChange={(e) => setStartDate(new Date(e.target.value))} />
      <input type="date" onChange={(e) => setEndDate(new Date(e.target.value))} />
      <p>Duration: {duration} days</p>
    </form>
  );
}
```

```typescript
// UpcomingBirthdays.tsx - Filter future dates
import { isFuture, addDays, formatDate } from '@rp-hris/shared';

export function UpcomingBirthdays({ employees }) {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  
  const upcoming = employees.filter(emp => {
    const birthday = new Date(emp.birthDate);
    birthday.setFullYear(today.getFullYear());
    return isFuture(birthday) && birthday <= nextWeek;
  });
  
  return (
    <div>
      {upcoming.map(emp => (
        <div key={emp.id}>
          {emp.name} - {formatDate(emp.birthDate)}
        </div>
      ))}
    </div>
  );
}
```

---

## 🔢 Array Utils

### API Examples

```typescript
// employee.service.ts - Group employees by department
import { groupBy, sortBy } from '@rp-hris/shared';

async getEmployeesByDepartment() {
  const employees = await this.employeeRepository.find();
  return groupBy(employees, 'department');
  // Result: { "Engineering": [...], "HR": [...], "Sales": [...] }
}
```

```typescript
// report.service.ts - Sort and paginate
import { sortBy, chunk } from '@rp-hris/shared';

async generateReport() {
  const data = await this.dataService.getAll();
  const sorted = sortBy(data, 'salary', 'desc');
  const pages = chunk(sorted, 50); // 50 items per page
  
  return pages;
}
```

### Web Examples

```typescript
// EmployeeList.tsx - Group and sort employees
import { groupBy, sortBy, unique } from '@rp-hris/shared';

export function EmployeeList({ employees }) {
  const grouped = groupBy(employees, 'department');
  
  return (
    <div>
      {Object.entries(grouped).map(([dept, emps]) => (
        <div key={dept}>
          <h2>{dept}</h2>
          <ul>
            {sortBy(emps, 'lastName').map(emp => (
              <li key={emp.id}>{emp.lastName}, {emp.firstName}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

```typescript
// SkillsFilter.tsx - Get unique skills
import { unique } from '@rp-hris/shared';

export function SkillsFilter({ employees }) {
  const allSkills = employees.flatMap(emp => emp.skills);
  const uniqueSkills = unique(allSkills);
  
  return (
    <select>
      {uniqueSkills.map(skill => (
        <option key={skill} value={skill}>{skill}</option>
      ))}
    </select>
  );
}
```

---

## ✅ Validation Utils

### API Examples

```typescript
// employee.controller.ts - Validate input data
import { isValidEmail, isValidPhilippineMobile, isEmpty } from '@rp-hris/shared';

@Post('employees')
async createEmployee(@Body() dto: CreateEmployeeDto) {
  if (!isValidEmail(dto.email)) {
    throw new BadRequestException('Invalid email format');
  }
  
  if (!isValidPhilippineMobile(dto.mobileNumber)) {
    throw new BadRequestException('Invalid Philippine mobile number');
  }
  
  if (isEmpty(dto.firstName) || isEmpty(dto.lastName)) {
    throw new BadRequestException('Name fields cannot be empty');
  }
  
  return this.employeeService.create(dto);
}
```

```typescript
// dto/update-employee.dto.ts - Custom validation
import { isValidEmail, isEmpty } from '@rp-hris/shared';

export class UpdateEmployeeDto {
  email?: string;
  
  validate() {
    if (this.email && !isEmpty(this.email) && !isValidEmail(this.email)) {
      return 'Invalid email format';
    }
    return null;
  }
}
```

### Web Examples

```typescript
// EmployeeForm.tsx - Form validation
import { isValidEmail, isValidPhilippineMobile, isEmpty } from '@rp-hris/shared';
import { useState } from 'react';

export function EmployeeForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!isValidPhilippineMobile(phone)) {
      newErrors.phone = 'Invalid Philippine mobile number (e.g., 09123456789)';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <input 
        type="tel" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {errors.phone && <span className="error">{errors.phone}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

```typescript
// SearchInput.tsx - Check for empty search
import { isEmpty } from '@rp-hris/shared';

export function SearchInput({ onSearch }) {
  const handleSearch = (value: string) => {
    if (isEmpty(value)) {
      onSearch(null); // Clear search
    } else {
      onSearch(value);
    }
  };
  
  return <input onChange={(e) => handleSearch(e.target.value)} />;
}
```

---

## 💰 Number Utils

### API Examples

```typescript
// payroll.service.ts - Calculate salary
import { formatCurrency, roundTo, calculatePercentage } from '@rp-hris/shared';

calculatePayslip(employeeId: string, hoursWorked: number) {
  const hourlyRate = 500;
  const grossPay = roundTo(hoursWorked * hourlyRate);
  
  const taxRate = 15;
  const taxAmount = roundTo((grossPay * taxRate) / 100);
  const netPay = roundTo(grossPay - taxAmount);
  
  return {
    grossPay: formatCurrency(grossPay),
    taxAmount: formatCurrency(taxAmount),
    taxRate: `${taxRate}%`,
    netPay: formatCurrency(netPay),
  };
}
```

```typescript
// attendance.service.ts - Calculate attendance percentage
import { calculatePercentage, roundTo } from '@rp-hris/shared';

async getAttendanceReport(employeeId: string, month: number) {
  const totalDays = 22; // Working days
  const presentDays = await this.countPresentDays(employeeId, month);
  
  return {
    presentDays,
    totalDays,
    attendanceRate: calculatePercentage(presentDays, totalDays),
    // Result: 90.91 (if present 20 out of 22 days)
  };
}
```

### Web Examples

```typescript
// SalaryCard.tsx - Display formatted currency
import { formatCurrency } from '@rp-hris/shared';

export function SalaryCard({ employee }) {
  return (
    <div className="salary-card">
      <h3>Monthly Salary</h3>
      <p className="amount">{formatCurrency(employee.salary)}</p>
      {/* Displays: ₱50,000.00 */}
    </div>
  );
}
```

```typescript
// AttendanceChart.tsx - Show percentages
import { calculatePercentage, roundTo } from '@rp-hris/shared';

export function AttendanceChart({ attendance }) {
  const presentPercentage = calculatePercentage(
    attendance.present, 
    attendance.total
  );
  
  const latePercentage = calculatePercentage(
    attendance.late, 
    attendance.total
  );
  
  return (
    <div className="chart">
      <div className="bar" style={{ width: `${presentPercentage}%` }}>
        Present: {presentPercentage}%
      </div>
      <div className="bar" style={{ width: `${latePercentage}%` }}>
        Late: {latePercentage}%
      </div>
    </div>
  );
}
```

```typescript
// BonusCalculator.tsx - Calculate bonuses with limits
import { clamp, formatCurrency, roundTo } from '@rp-hris/shared';

export function BonusCalculator({ baseSalary, performanceScore }) {
  // Performance score between 0-100
  const normalizedScore = clamp(performanceScore, 0, 100);
  
  // Bonus is 0-50% of base salary
  const bonusPercentage = (normalizedScore / 100) * 50;
  const bonusAmount = roundTo((baseSalary * bonusPercentage) / 100);
  
  return (
    <div>
      <p>Performance Score: {normalizedScore}/100</p>
      <p>Bonus Percentage: {bonusPercentage}%</p>
      <p>Bonus Amount: {formatCurrency(bonusAmount)}</p>
    </div>
  );
}
```

---

## 🔗 Combining Multiple Utils

### API Example - Complete Leave Request Handler

```typescript
// leave.controller.ts
import { 
  daysBetween, 
  formatDate, 
  isPast,
  isEmpty,
  formatFullName 
} from '@rp-hris/shared';

@Post('leave-requests')
async createLeaveRequest(@Body() dto: CreateLeaveDto, @User() user: any) {
  // Validation
  if (isEmpty(dto.reason)) {
    throw new BadRequestException('Leave reason is required');
  }
  
  if (isPast(dto.startDate)) {
    throw new BadRequestException('Cannot request leave for past dates');
  }
  
  // Calculate duration
  const duration = daysBetween(dto.startDate, dto.endDate);
  
  if (duration < 1) {
    throw new BadRequestException('End date must be after start date');
  }
  
  // Check balance
  const employee = await this.employeeService.findOne(user.id);
  if (employee.leaveBalance < duration) {
    throw new BadRequestException('Insufficient leave balance');
  }
  
  // Create leave request
  const leaveRequest = await this.leaveService.create({
    employeeId: user.id,
    employeeName: formatFullName(employee.firstName, employee.lastName),
    startDate: formatDate(dto.startDate),
    endDate: formatDate(dto.endDate),
    duration,
    reason: dto.reason,
  });
  
  return leaveRequest;
}
```

### Web Example - Employee Dashboard

```typescript
// EmployeeDashboard.tsx
import { 
  formatFullName, 
  formatCurrency,
  daysBetween,
  addDays,
  calculatePercentage,
  sortBy 
} from '@rp-hris/shared';

export function EmployeeDashboard({ employee, leaves, attendance }) {
  // Calculate next payday
  const today = new Date();
  const nextPayday = addDays(today, 15);
  const daysUntilPayday = daysBetween(today, nextPayday);
  
  // Sort recent leaves
  const recentLeaves = sortBy(leaves, 'startDate', 'desc').slice(0, 5);
  
  // Calculate attendance rate
  const attendanceRate = calculatePercentage(
    attendance.present,
    attendance.total
  );
  
  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {formatFullName(employee.firstName, employee.lastName)}!</h1>
        <p>{employee.position}</p>
      </header>
      
      <div className="stats">
        <div className="stat-card">
          <h3>Monthly Salary</h3>
          <p>{formatCurrency(employee.salary)}</p>
          <small>Next payday in {daysUntilPayday} days</small>
        </div>
        
        <div className="stat-card">
          <h3>Attendance Rate</h3>
          <p>{attendanceRate}%</p>
          <small>{attendance.present} of {attendance.total} days</small>
        </div>
        
        <div className="stat-card">
          <h3>Leave Balance</h3>
          <p>{employee.leaveBalance} days</p>
        </div>
      </div>
      
      <div className="recent-leaves">
        <h2>Recent Leaves</h2>
        <ul>
          {recentLeaves.map(leave => (
            <li key={leave.id}>
              {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
              ({leave.duration} days)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

---

## 🎯 Best Practices

1. **Import only what you need** - Tree-shaking will remove unused code
2. **Validate early** - Use validation utils at the controller/form level
3. **Consistent formatting** - Use the same formatters across API and Web
4. **Type safety** - All utilities are fully typed with TypeScript
5. **Reusability** - Don't duplicate logic, use these shared utilities

## 📚 Further Reading

- [TypeScript Documentation](https://www.typescriptlang.org/)
- [NestJS Best Practices](https://docs.nestjs.com/)
- [React Best Practices](https://react.dev/)
