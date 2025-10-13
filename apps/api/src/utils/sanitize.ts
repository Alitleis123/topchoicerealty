import { z } from 'zod';

// HTML sanitization to prevent XSS
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/&/g, '&amp;'); // This should be last
}

// Sanitize user input for database storage
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .slice(0, 10000); // Limit length
}

// Validate and sanitize MongoDB ObjectId
export function validateObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

// Sanitize phone number
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d\s\-\+\(\)]/g, '').trim();
}

// Create a sanitization schema for common inputs
export const sanitizedStringSchema = z
  .string()
  .transform(sanitizeInput)
  .refine((val) => val.length > 0, 'Input cannot be empty');

export const sanitizedEmailSchema = z
  .string()
  .email()
  .transform((email) => email.toLowerCase().trim());

export const sanitizedPhoneSchema = z
  .string()
  .transform(sanitizePhone)
  .refine((phone) => phone.length >= 10, 'Invalid phone number format');
