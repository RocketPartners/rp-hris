import React, { ReactNode, createContext, useContext } from 'react';

type PaddingSize = 'none' | 'sm' | 'md' | 'lg';

export const CardContext = createContext<{ padding: PaddingSize } | null>(null);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    return { padding: 'md' as PaddingSize };
  }
  return context;
};

export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: PaddingSize;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  border?: boolean;
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const headerSpacingStyles = {
  none: '',
  sm: 'pb-3 mb-3',
  md: 'pb-4 mb-4',
  lg: 'pb-6 mb-6',
};

const footerSpacingStyles = {
  none: '',
  sm: 'pt-3 mt-3',
  md: 'pt-4 mt-4',
  lg: 'pt-6 mt-6',
};

const shadowStyles = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

const roundedStyles = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
} = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  border = true,
}) => {
  return (
    <CardContext.Provider value={{ padding }}>
      <div
        className={`
          bg-white
          ${paddingStyles[padding]}
          ${shadowStyles[shadow]}
          ${roundedStyles[rounded]}
          ${border ? 'border border-gray-200' : ''}
          ${className}
        `}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  const { padding } = useCardContext();
  const borderClass = padding === 'none' ? '' : 'border-b border-gray-200';
  return (
    <div className={`${borderClass} ${headerSpacingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
};

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  const { padding } = useCardContext();
  const borderClass = padding === 'none' ? '' : 'border-t border-gray-200';
  return (
    <div className={`${borderClass} ${footerSpacingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

Card.displayName = 'Card';
CardHeader.displayName = 'Card.Header';
CardBody.displayName = 'Card.Body';
CardFooter.displayName = 'Card.Footer';
