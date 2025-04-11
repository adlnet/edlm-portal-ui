import DefaultLayout from '@/components/layouts/DefaultLayout';

export default function Help() {
  return (
    <DefaultLayout>
      <div className='mt-10 pb-20'>
        <h1 className='pb-4 border-b mb-8 text-3xl font-semibold'>Help</h1>
        <h2 className='text-xl font-semibold'>Purpose</h2>
        <p className='pb-4 mb-2'>
          {' '}
          The EDLM Portal, TM features aim to enhance the readiness of the Department of Defense, and optimize talent management and personnel programs, relevant training and education, world class health care, quality family support, and force resilience through diversity, inclusion, and equal opportunity. 
        </p>
        <h2 className='text-xl font-semibold'>Features</h2>
        <p className='mb-2'>
          {' '}
          Effortlessly navigate through a vast pool of qualified professionals within the DoD. Our advanced search capabilities enable you to pinpoint the exact skills and expertise  you  need, ensuring you find the right talent for any  mission.

        </p>
        <p className='mb-2'>
          {' '}
          Gain valuable insights into the talent landscape across the DoD. Our robust analytics tools provide a comprehensive overview of available skills, allowing you to make informed decisions and strategically plan for the future workforce needs.
        </p>

      </div>
    </DefaultLayout>
  );
}
