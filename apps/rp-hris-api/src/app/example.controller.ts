/**
 * Example: Using shared utilities in the API
 * This demonstrates practical usage in a NestJS controller
 */

import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  BadRequestException 
} from '@nestjs/common';
import {
  formatFullName,
  toTitleCase,
  daysBetween,
  formatDate,
  isPast,
  isEmpty,
  isValidEmail,
  isValidPhilippineMobile,
  formatCurrency,
  calculatePercentage,
  groupBy,
  sortBy,
} from '@rp-hris/shared';

// Example DTOs
interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  department: string;
  salary: number;
}

interface CreateLeaveRequestDto {
  employeeId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

@Controller('examples')
export class ExampleController {
  
  /**
   * Example 1: Employee Creation with Validation
   * Uses: isValidEmail, isValidPhilippineMobile, isEmpty, formatFullName, toTitleCase
   */
  @Post('employees')
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    // Validation using shared utils
    if (isEmpty(dto.firstName) || isEmpty(dto.lastName)) {
      throw new BadRequestException('Name fields cannot be empty');
    }

    if (!isValidEmail(dto.email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (!isValidPhilippineMobile(dto.mobileNumber)) {
      throw new BadRequestException(
        'Invalid Philippine mobile number. Use format: 09XXXXXXXXX'
      );
    }

    // Format data using shared utils
    const employee = {
      ...dto,
      fullName: formatFullName(dto.firstName, dto.lastName),
      department: toTitleCase(dto.department),
      formattedSalary: formatCurrency(dto.salary),
    };

    // In real app, save to database
    return {
      message: 'Employee created successfully',
      data: employee,
    };
  }

  /**
   * Example 2: Leave Request Processing
   * Uses: daysBetween, isPast, isFuture, formatDate, isEmpty
   */
  @Post('leave-requests')
  async createLeaveRequest(@Body() dto: CreateLeaveRequestDto) {
    const { startDate, endDate, reason } = dto;

    // Validation
    if (isEmpty(reason)) {
      throw new BadRequestException('Leave reason is required');
    }

    if (isPast(new Date(startDate))) {
      throw new BadRequestException('Cannot request leave for past dates');
    }

    // Calculate duration
    const duration = daysBetween(new Date(startDate), new Date(endDate));

    if (duration < 1) {
      throw new BadRequestException('End date must be after start date');
    }

    if (duration > 30) {
      throw new BadRequestException('Cannot request more than 30 days at once');
    }

    // Format response
    return {
      message: 'Leave request created',
      data: {
        ...dto,
        duration: `${duration} days`,
        startDate: formatDate(new Date(startDate)),
        endDate: formatDate(new Date(endDate)),
        status: 'pending',
      },
    };
  }

  /**
   * Example 3: Payroll Report
   * Uses: formatCurrency, calculatePercentage, groupBy, sortBy
   */
  @Get('payroll-report')
  async getPayrollReport() {
    // Mock employee data
    const employees = [
      { id: 1, name: 'Juan Dela Cruz', department: 'Engineering', salary: 50000, taxRate: 15 },
      { id: 2, name: 'Maria Santos', department: 'HR', salary: 45000, taxRate: 15 },
      { id: 3, name: 'Pedro Reyes', department: 'Engineering', salary: 60000, taxRate: 20 },
      { id: 4, name: 'Ana Garcia', department: 'Sales', salary: 40000, taxRate: 12 },
      { id: 5, name: 'Jose Mercado', department: 'Sales', salary: 55000, taxRate: 18 },
    ];

    // Calculate payroll details
    const payrollData = employees.map(emp => {
      const taxAmount = (emp.salary * emp.taxRate) / 100;
      const netPay = emp.salary - taxAmount;
      const taxPercentage = calculatePercentage(taxAmount, emp.salary);

      return {
        ...emp,
        grossPay: formatCurrency(emp.salary),
        taxAmount: formatCurrency(taxAmount),
        netPay: formatCurrency(netPay),
        taxPercentage: `${taxPercentage}%`,
      };
    });

    // Group by department
    const byDepartment = groupBy(payrollData, 'department');

    // Sort by salary (descending)
    const sortedBySalary = sortBy(employees, 'salary', 'desc');

    return {
      totalEmployees: employees.length,
      byDepartment,
      topEarners: sortedBySalary.slice(0, 3).map(e => ({
        name: e.name,
        salary: formatCurrency(e.salary),
      })),
      payrollDetails: payrollData,
    };
  }

  /**
   * Example 4: Employee Statistics
   * Uses: Multiple utils combined
   */
  @Get('employees/:id/stats')
  async getEmployeeStats(@Param('id') _id: string) {
    // Mock data
    const employee = {
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      hireDate: new Date('2023-01-15'),
      salary: 50000,
      leaveBalance: 15,
      totalLeave: 20,
    };

    const today = new Date();
    const daysEmployed = daysBetween(employee.hireDate, today);
    const yearsEmployed = Math.floor(daysEmployed / 365);

    return {
      employee: {
        fullName: formatFullName(employee.firstName, employee.lastName),
        hireDate: formatDate(employee.hireDate),
        tenure: `${yearsEmployed} years (${daysEmployed} days)`,
      },
      compensation: {
        monthlySalary: formatCurrency(employee.salary),
        annualSalary: formatCurrency(employee.salary * 12),
      },
      leave: {
        balance: `${employee.leaveBalance} days`,
        used: `${employee.totalLeave - employee.leaveBalance} days`,
        utilizationRate: `${calculatePercentage(
          employee.totalLeave - employee.leaveBalance,
          employee.totalLeave
        )}%`,
      },
    };
  }
}
