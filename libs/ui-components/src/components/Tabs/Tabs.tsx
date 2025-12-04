import React, { ReactNode, useState } from 'react';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active tab id. When provided, the component operates in controlled mode. */
  activeId?: string;
  /** Default active tab id for uncontrolled mode. Ignored when activeId is provided. */
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId: controlledActiveId,
  defaultActiveId,
  onChange,
  variant = 'default',
  fullWidth = false,
  className = '',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(defaultActiveId || items[0]?.id);
  
  // Use controlled activeId when provided, otherwise use internal state
  const isControlled = controlledActiveId !== undefined;
  const activeId = isControlled ? controlledActiveId : internalActiveId;

  const handleTabClick = (id: string) => {
    if (!isControlled) {
      setInternalActiveId(id);
    }
    onChange?.(id);
  };

  const getTabStyles = (isActive: boolean, isDisabled: boolean) => {
    const base = 'inline-flex items-center px-4 py-2 font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
    
    if (isDisabled) {
      return `${base} cursor-not-allowed opacity-50`;
    }

    switch (variant) {
      case 'pills':
        return `${base} rounded-md ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`;
      case 'underline':
        return `${base} border-b-2 ${
          isActive
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
        }`;
      default:
        return `${base} border-b-2 -mb-px ${
          isActive
            ? 'border-blue-600 text-blue-600 bg-white'
            : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
        }`;
    }
  };

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className={className}>
      <div
        className={`
          flex ${fullWidth ? 'w-full' : ''}
          ${variant === 'default' ? 'border-b border-gray-200' : ''}
          ${variant === 'pills' ? 'gap-2' : ''}
        `}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && handleTabClick(item.id)}
            disabled={item.disabled}
            className={`
              ${getTabStyles(activeId === item.id, !!item.disabled)}
              ${fullWidth ? 'flex-1 justify-center' : ''}
            `}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{activeItem?.content}</div>
    </div>
  );
};

Tabs.displayName = 'Tabs';
