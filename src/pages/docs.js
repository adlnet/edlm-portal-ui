import Accordion from '@/components/Accordion';
import Card from '@/components/Card';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import cardImage from '@/public/image.png'
export default function Docs() {
  return (
    <DefaultLayout>
      <div className='mt-10 pb-20'>
        <h1 className='pb-4 border-b mb-8 text-3xl font-semibold'>About</h1>
        <div className='flex flex-row'>

        <Card title={"Getting Started"} 
            image={cardImage} children={<>
                {/* <p className='pb-4 mb-2'>
                {' '}
                The EDLM Portal, TM features aim to enhance the readiness of the Department of Defense, and optimize talent management and personnel programs, relevant training and education, world class health care, quality family support, and force resilience through diversity, inclusion, and equal opportunity. 
                </p> */}
                <Accordion acctitle={"What is the EDLM portal?"} accdescription={"The EDLM Portal, TM features aim to enhance the readiness of the Department of Defense, and optimize talent management and personnel programs, relevant training and education, world class health care, quality family support, and force resilience through diversity, inclusion, and equal opportunity. "}/>
            </>
                
            }/>

        <Card title={"Features"} 
            image={cardImage} children={<>
                <p className='pb-4 mb-2'>
                {' '}
                Effortlessly navigate through a vast pool of qualified professionals within the DoD. Our advanced search capabilities enable you to pinpoint the exact skills and expertise  you  need, ensuring you find the right talent for any  mission.
                </p>
            </>
                
            }/>

        <Card title={"Capabilities"} 
            image={cardImage} children={<>
                <p className='pb-4 mb-2'>
                {' '}
                Gain valuable insights into the talent landscape across the DoD. Our robust analytics tools provide a comprehensive overview of available skills, allowing you to make informed decisions and strategically plan for the future workforce needs.
                </p>
            </>
                
            }/>

        </div>

      </div>
    </DefaultLayout>
  );
}
