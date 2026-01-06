'use strict';

export default function SaveAndContinueBtn ({ onClick, disabled, loading, buttonText = 'Save & Continue' }) {
  // Accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !disabled && !loading) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button 
      className={`${disabled ? 'opacity-50' : 'opacity-100'} rounded-lg inline-flex justify-center items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-90'} transition-opacity bg-transparent border-none p-0`}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || loading}
      aria-label={buttonText}
    >
      <div className="pt-2 pb-[7px] px-3 bg-[#00509F] overflow-hidden rounded-lg outline outline-1 outline-[#135F9B] outline-offset-[-1px] justify-center items-center gap-2 flex">
        <div className="text-center justify-center flex flex-col text-white text-base font-medium leading-[22.4px]">
          {loading ? 'Saving...' : buttonText}
        </div>
      </div>
    </button>
  );
};
