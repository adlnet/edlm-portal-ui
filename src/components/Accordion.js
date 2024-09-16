import React, { useState } from 'react'

const Accordion = ({ acctitle, accdescription }) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return (
        <div className='py-2'>
            <button 
                onClick={() => setAccordionOpen(!accordionOpen)} 
                className='flex justify-left w-full'
            >
                {/*{accordionOpen ? <span>-&nbsp;&nbsp;</span> : <span>+&nbsp;&nbsp;</span>} */}
                <svg
                    className='mt-1.5 fill-purple shrink-0 ml-8'
                    width='16'
                    height='16'
                    xmlns='http://www.w3.org/2000.svg'
                >
                    <rect 
                      y='7'
                      width='16'
                      height='2'
                      rx='1'
                      className={`transform origin-center transition duration-200 ease-out ${
                      accordionOpen && '!rotate-180'
                      }`}
                    />
                    <rect
                      y='7'
                      width='16'
                      height='2'
                      rx='1'
                      className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                        accordionOpen && '!rotate-180'
                      }`} 
                      />
                </svg>


                <span className='ml-2 mb-0 text-lg font-bold'>{acctitle}</span>  
                             
            </button>
            <div 
                className={`grid overflow-hidden transition-all duration 300 ease-in-out text-slate-600 text sm ${
                    accordionOpen 
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div 
                    className='flex flex-col overflow-hidden pt-2 text-gray-600 ml-20'>{
                        accdescription}
                </div>
                
            </div>
        </div>
   )
};

export default Accordion;