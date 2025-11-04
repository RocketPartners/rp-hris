/**
 * Example: Using shared utilities in React components
 * These are practical examples for the Web app
 */

import React, { useState } from 'react';
import {
  formatFullName,
  toTitleCase,
  daysBetween,
  formatDate,
  isPast,
  isValidEmail,
  isValidPhilippineMobile,
  isEmpty,
  formatCurrency,
  calculatePercentage,
  roundTo,
  groupBy,
  sortBy,
  unique,
} from '@rp-hris/shared';

/**
 * Example 1: Employee Profile Card
 * Uses: formatFullName, toTitleCase, formatCurrency
 */
interface EmployeeCardProps {
  employee: {
    firstName: string;
    lastName: string;
    position: string;
    department: string;
    salary: number;
  };
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="employee-card">
      <h3>{formatFullName(employee.firstName, employee.lastName)}</h3>
      <p className="position">{toTitleCase(employee.position)}</p>
      <p className="department">{toTitleCase(employee.department)}</p>
      <p className="salary">{formatCurrency(employee.salary)}/month</p>
    </div>
  );
}

/**
 * Example 2: Leave Request Form with Validation
 * Uses: daysBetween, formatDate, isPast, isEmpty
 */
export function LeaveRequestForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation using shared utils
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    } else if (isPast(startDate)) {
      newErrors.startDate = 'Cannot select past dates';
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required';
    } else if (startDate && endDate < startDate) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (isEmpty(reason)) {
      newErrors.reason = 'Reason is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate duration
    const duration = startDate && endDate ? daysBetween(startDate, endDate) : 0;

    // Submit (in real app, call API)
    console.log({
      startDate: startDate ? formatDate(startDate) : '',
      endDate: endDate ? formatDate(endDate) : '',
      duration,
      reason,
    });
  };

  const duration = startDate && endDate 
    ? daysBetween(startDate, endDate) 
    : 0;

  return (
    <form onSubmit={handleSubmit} className="leave-form">
      <h2>Request Leave</h2>

      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        {errors.startDate && <span className="error">{errors.startDate}</span>}
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
        {errors.endDate && <span className="error">{errors.endDate}</span>}
      </div>

      {duration > 0 && (
        <div className="duration-info">
          Duration: {duration} day{duration !== 1 ? 's' : ''}
        </div>
      )}

      <div className="form-group">
        <label>Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter leave reason..."
        />
        {errors.reason && <span className="error">{errors.reason}</span>}
      </div>

      <button type="submit">Submit Request</button>
    </form>
  );
}

/**
 * Example 3: Employee Form with Email and Phone Validation
 * Uses: isValidEmail, isValidPhilippineMobile, isEmpty
 */
export function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (isEmpty(formData.firstName)) {
      newErrors.firstName = 'First name is required';
    }

    if (isEmpty(formData.lastName)) {
      newErrors.lastName = 'Last name is required';
    }

    if (isEmpty(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (isEmpty(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!isValidPhilippineMobile(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid Philippine mobile number (e.g., 09123456789)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>Add New Employee</h2>

      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="juan.delacruz@example.com"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="tel"
          value={formData.mobileNumber}
          onChange={(e) => handleChange('mobileNumber', e.target.value)}
          placeholder="09123456789"
        />
        {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
      </div>

      <button type="submit">Add Employee</button>
    </form>
  );
}

/**
 * Example 4: Employee Dashboard with Multiple Utils
 * Uses: formatFullName, formatCurrency, daysBetween, addDays, 
 *       calculatePercentage, sortBy, formatDate
 */
interface DashboardProps {
  employee: {
    firstName: string;
    lastName: string;
    position: string;
    salary: number;
    hireDate: Date;
    leaveBalance: number;
  };
  leaves: Array<{
    id: string;
    startDate: Date;
    endDate: Date;
    status: string;
  }>;
  attendance: {
    present: number;
    total: number;
  };
}

export function EmployeeDashboard({ employee, leaves, attendance }: DashboardProps) {
  // Calculate next payday (assume 15th and 30th)
  const today = new Date();
  const currentDay = today.getDate();
  const nextPayday = currentDay < 15 
    ? new Date(today.getFullYear(), today.getMonth(), 15)
    : new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const daysUntilPayday = daysBetween(today, nextPayday);

  // Calculate tenure
  const daysEmployed = daysBetween(employee.hireDate, today);
  const yearsEmployed = Math.floor(daysEmployed / 365);

  // Sort recent leaves
  const recentLeaves = sortBy(leaves, 'startDate', 'desc').slice(0, 5);

  // Calculate attendance rate
  const attendanceRate = calculatePercentage(attendance.present, attendance.total);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {formatFullName(employee.firstName, employee.lastName)}!</h1>
        <p>{toTitleCase(employee.position)}</p>
        <p className="tenure">
          {yearsEmployed > 0 ? `${yearsEmployed} year${yearsEmployed !== 1 ? 's' : ''} ` : ''}
          with the company
        </p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Monthly Salary</h3>
          <p className="stat-value">{formatCurrency(employee.salary)}</p>
          <small>Next payday in {daysUntilPayday} days</small>
        </div>

        <div className="stat-card">
          <h3>Attendance Rate</h3>
          <p className="stat-value">{roundTo(attendanceRate, 1)}%</p>
          <small>{attendance.present} of {attendance.total} days</small>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </div>

        <div className="stat-card">
          <h3>Leave Balance</h3>
          <p className="stat-value">{employee.leaveBalance} days</p>
          <small>Available for use</small>
        </div>
      </div>

      <div className="recent-leaves">
        <h2>Recent Leave Requests</h2>
        {recentLeaves.length === 0 ? (
          <p>No leave requests yet</p>
        ) : (
          <ul>
            {recentLeaves.map(leave => {
              const duration = daysBetween(leave.startDate, leave.endDate);
              return (
                <li key={leave.id} className={`leave-item ${leave.status}`}>
                  <span className="dates">
                    {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                  </span>
                  <span className="duration">({duration} days)</span>
                  <span className={`status ${leave.status}`}>
                    {toTitleCase(leave.status)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Example 5: Department Employee List
 * Uses: groupBy, sortBy, unique, formatFullName
 */
interface DepartmentListProps {
  employees: Array<{
    id: string;
    firstName: string;
    lastName: string;
    department: string;
    position: string;
  }>;
}

export function DepartmentEmployeeList({ employees }: DepartmentListProps) {
  const [selectedDept, setSelectedDept] = useState<string>('all');

  // Group by department
  const grouped = groupBy(employees, 'department');
  const departments = unique(employees.map(e => e.department)).sort();

  // Filter and sort
  const filteredEmployees = selectedDept === 'all' 
    ? employees 
    : employees.filter(e => e.department === selectedDept);
  
  const sorted = sortBy(filteredEmployees, 'lastName');

  return (
    <div className="department-list">
      <h2>Employees by Department</h2>

      <div className="filters">
        <label>Filter by Department:</label>
        <select 
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="all">All Departments ({employees.length})</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>
              {toTitleCase(dept)} ({grouped[dept]?.length || 0})
            </option>
          ))}
        </select>
      </div>

      <div className="employee-list">
        {sorted.map(emp => (
          <div key={emp.id} className="employee-item">
            <div className="employee-name">
              {formatFullName(emp.firstName, emp.lastName)}
            </div>
            <div className="employee-details">
              <span>{toTitleCase(emp.position)}</span>
              <span className="dept">{toTitleCase(emp.department)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
