import CalenderIcon from '@/public/icons/calenderIcon.svg';
import Image from 'next/image';
export default function Stepper({ steps }) {

  return (
    <div className='w-full py-2'>
      <div className='relative'>
        <div className='flex justify-around px-0 mb-4 '>
          {steps.map((step, i) => (
            <div key={`${step}-${i}`} className='flex flex-col items-center'>
              <span className=' h-5 text-[#1f3764] text-xl font-bold leading-normal text-nowrap'>{step}</span>
           </div>
          ))}
        </div>

        <div className='relative mb-1'>
          <div className='absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-400'></div>
          <div className='flex justify-around px-0'>
            {steps.map((step, i) => (
              <div key={i} className='w-6 h-6 p-[3px] bg-[#88b4d9] rounded-[50px] border-2 border-white justify-center items-center gap-2.5 inline-flex '>
                <Image src={CalenderIcon} alt='calender icon' className='w-2.5 h-2.5 relative' />
              </div>
          ))}
          </div>
        </div>
      </div>
  </div>
  )
}
