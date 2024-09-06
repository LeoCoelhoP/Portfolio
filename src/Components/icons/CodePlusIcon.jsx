import React from 'react';

export default function CodePlusIcon({ className, size }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      fill='none'
    >
      <path d='M7 8l-4 4l4 4' />
      <path d='M17 8l4 4l-4 4' />
      <path d='M14 4l-4 16' />
    </svg>
  );
}
