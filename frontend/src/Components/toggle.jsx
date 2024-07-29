import React from 'react';

const Switcher = ({ isChecked, onToggle }) => {
  return (
    <label className='flex cursor-pointer select-none items-center'>
      <div className='relative'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={onToggle}
          className='sr-only'
        />
        <div className='block h-8 w-14 rounded-full border border-[#BFCEFF] bg-[#EAEEFB] '></div>
        <div className={`dot absolute left-1 top-1 h-6 w-6 rounded-full transition ${isChecked ? 'translate-x-full bg-indigo-600' : ''}`}></div>
      </div>
    </label>
  );
};

export default Switcher;