import React from 'react';

export default function ReturnIcon({ className, size }) {
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
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M9 14l-4 -4l4 -4' />
      <path d='M5 10h11a4 4 0 1 1 0 8h-1' />
    </svg>
  );
}
