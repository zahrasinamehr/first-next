import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import { svgColorClasses } from './classes';

import type { SvgColorProps } from './types';

// ----------------------------------------------------------------------

// Helper function to get icon path
const getIconPath = (name: string): string => `/assets/icons/${name}.svg`;

export const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, name, width = 24, height, className, sx, ...other }, ref) => {
    // Validate that either src or name is provided
    if (!src && !name) {
      console.warn('SvgColor: Either "src" or "name" prop must be provided');
      return null;
    }

    // Determine the icon source
    const iconSrc = src || (name ? getIconPath(name) : '');

    return (
      <Box
        ref={ref}
        component="span"
        className={svgColorClasses.root.concat(className ? ` ${className}` : '')}
        sx={{
          width,
          flexShrink: 0,
          height: height ?? width,
          display: 'inline-flex',
          bgcolor: 'currentColor',
          mask: `url(${iconSrc}) no-repeat center / contain`,
          WebkitMask: `url(${iconSrc}) no-repeat center / contain`,
          ...sx,
        }}
        {...other}
      />
    );
  }
);
