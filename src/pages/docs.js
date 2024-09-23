import Accordion from '@/components/Accordion';
import Card from '@/components/Card';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import cardImage from '@/public/image.png';
import cardImage1 from '@/public/docs1.png';
import cardImage2 from '@/public/docs4.png';
import cardImage3 from '@/public/docs2.png';


export default function Docs() {
  return (
    <DefaultLayout>
      <div className='mt-10 pb-20'>
        <h1 className='pb-4 border-b mb-8 text-3xl font-semibold'>About</h1>
        <div className='flex flex-row'>

        {/* <Card title={"Getting Started"} 
            image={cardImage} children={<>
                <Accordion acctitle={"What is the EDLM portal?"} accdescription={"The EDLM Portal, TM features aim to enhance the readiness of the Department of Defense, and optimize talent management and personnel programs, relevant training and education, world class health care, quality family support, and force resilience through diversity, inclusion, and equal opportunity. "}/>
                <Accordion acctitle={"How does EDLM support DoD Services?"} accdescription={"The EDLM Portal, TM features aim to enhance the readiness of the Department of Defense, and optimize talent management and personnel programs, relevant training and education, world class health care, quality family support, and force resilience through diversity, inclusion, and equal opportunity. "}/>
                <Accordion acctitle={"How do I find more information on EDLM?"} accdescription={"The EDLM Portal, TM features aim to enhance the readiness of the Department of Defense, and optimize talent management and personnel programs, relevant training and education, world class health care, quality family support, and force resilience through diversity, inclusion, and equal opportunity. "}/>
            </>
          }/> */}

        <Card title={"Getting Started"} 
          image={cardImage3} children={<>
            <div className='flex flex-row py-3 pl-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className='pb-1 underline text-blue-custom ml-2 mb-0 text-lg font-bold justify-left text-left'> What is EDLM?</p>
            </div>
            <div className='flex flex-row py-3 pl-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className='pb-1 underline text-blue-custom ml-2 mb-0 text-lg font-bold justify-left text-left'> How does EDLM support DoD Services?</p>
            </div><div className='flex flex-row py-3 pl-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className='pb-1 underline text-blue-custom ml-2 mb-0 text-lg font-bold justify-left text-left'> How do I find more information on EDLM?</p>
            </div>
          </>
        }/>

        <Card title={"Talent Management Features"} 
          image={cardImage2} children={<>
            <div className='flex flex-row py-3 pl-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className='pb-1 underline text-blue-custom ml-2 mb-0 text-lg font-bold justify-left text-left'> Job Posting Review</p>
            </div>
            <div className='flex flex-row py-3 pl-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className='pb-1 underline text-blue-custom ml-2 mb-0 text-lg font-bold justify-left text-left'> Talent Discovery</p>
            </div><div className='flex flex-row py-3 pl-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className='pb-1 underline text-blue-custom ml-2 mb-0 text-lg font-bold justify-left text-left'> Training Plan for Talent</p>
            </div>
          </>
        }/>

        <Card title={"EDLM Capabilities"} 
          image={cardImage1} children={<>
            <div className='flex flex-row py-3 pl-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className='pb-1 underline text-blue-custom ml-2 mb-0 text-lg font-bold justify-left text-left'> Functional Community Support</p>
            </div>
            <div className='flex flex-row py-3 pl-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className='pb-1 underline text-blue-custom ml-2 mb-0 text-lg font-bold justify-left text-left'> Talent Manager Support</p>
            </div><div className='flex flex-row py-3 pl-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className='pb-1 underline text-blue-custom ml-2 mb-0 text-lg font-bold justify-left text-left'> DoD Learner Support</p>
            </div>
          </>
        }/>

        </div>

      </div>
    </DefaultLayout>
  );
}
