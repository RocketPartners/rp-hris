import React, { ReactNode } from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
  children?: ReactNode;
}

const sizeStyles = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-20 w-20 text-2xl',
};

const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const statusStyles = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
};

const statusSizeStyles = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
  '2xl': 'h-4 w-4',
};

/**
 * Extracts initials from a name string.
 * Handles edge cases like empty strings, whitespace-only names, and consecutive spaces.
 * @param name - The name to extract initials from
 * @returns Up to 2 uppercase characters representing the initials, or empty string if no valid characters
 */
const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generates a deterministic background color based on the provided name.
 * Uses a hash function to consistently assign the same color to the same name.
 * 
 * Edge case handling:
 * - Empty strings, whitespace-only, or names with only special characters will 
 *   still produce a valid color (defaults to a distributed selection based on 
 *   character codes, or falls back to a neutral color for truly empty input)
 * 
 * Color selection:
 * - Uses a curated list of distinct colors for better visual differentiation
 * - Colors are chosen to have good contrast against white text
 * 
 * @param name - The name to generate a color for
 * @returns A Tailwind CSS background color class
 */
const getColorFromName = (name: string): string => {
  // Curated color list with distinct hues for better visual differentiation
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-600',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-600',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-600',
    'bg-pink-500',
  ];
  
  // Handle empty or whitespace-only names
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return 'bg-gray-500';
  }
  
  // Use a better hash function (djb2) for more even distribution
  const hash = trimmedName.split('').reduce((acc, char) => {
    return ((acc << 5) + acc) + char.charCodeAt(0);
  }, 5381);
  
  // Ensure positive index
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  rounded = 'full',
  status,
  className = '',
  children,
}) => {
  const showInitials = !src && name;
  const bgColor = name ? getColorFromName(name) : 'bg-gray-400';

  return (
    <div className={`relative inline-flex ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={`${sizeStyles[size]} ${roundedStyles[rounded]} object-cover`}
        />
      ) : showInitials ? (
        <div
          className={`
            ${sizeStyles[size]} ${roundedStyles[rounded]} ${bgColor}
            flex items-center justify-center text-white font-medium
          `}
        >
          {getInitials(name)}
        </div>
      ) : (
        <div
          className={`
            ${sizeStyles[size]} ${roundedStyles[rounded]} bg-gray-200
            flex items-center justify-center text-gray-500
          `}
        >
          {children || (
            <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      )}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 block
            ${statusSizeStyles[size]} ${statusStyles[status]}
            rounded-full ring-2 ring-white
          `}
        />
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
