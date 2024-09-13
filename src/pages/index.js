import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image';
import React from 'react';
import image from '@/public/image.png';
import headerImage from '@/public/Abstact1.png';
import armyImage from '@/public/Army.png'
import armyImage1 from '@/public/Army1.jpg'
import armyImage2 from '@/public/Army2.jpg'
import Button from '@/components/Button';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Card from '@/components/Card';
import Spotlight from '@/components/SpotlightCard';
import StaticSideNav from '@/components/StaticSideNav';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  // const popuarTopics = ["Cyber Security", "Web Developement", "Communications", "Artificial Intelligence", "Management Styles", "Agile Methodology", "Angular", "Leadership", "Data Science", "Unclassified Information", "Python"]
  
  const spotlight = {
    data: [{title: "Cybersecurity", lastViewed: "Viewed 1 hour ago"},
      {title: "Systems Engineer", lastViewed: "Viewed 1 hour ago"},
      {title: "Project Management", lastViewed: "Viewed 2 hour ago"},
      {title: "Upcoming Vaccancies", lastViewed: "Viewed 1 hour ago"},
    ]
  }
  return (
    <DefaultLayout>
      <Head>
        <title>Experience Discovery Service</title>
        <link rel="icon" href="/public/image.png" />
      </Head>
      {/* <SideNav /> */}
      {/* <StaticSideNav /> */}

      <div className='flex flex-col mt-8'>
        <div className='py-4 text-xl font-bold'>Welcome, Talent Manager, Andrea Wilson! </div>
        <div className='bg-white shadow-md'>

          <div className='flex flex-row justify-between'>
            <div className='w-1/2 m-5'> 
              <div className='pt-2 text-lg font-bold'>Talent Management Dashboard </div>
              <div className='pt-2 text-gray-600'>The hub for searching for talent and planning for their development. </div>
              <div className='pt-12'>
                <Button onClick={()=>{router.push("/talentFinder")}} children={
                  <div className='flex flex-row gap-2 w-full'> <p className='pt-0.5'>Learn More</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                }/>
              </div>
            </div>
            <div className='max-h-36'>
              <Image src={headerImage} height={150} alt='' className='rounded-lg m-5 max-w-1/2'/>
            </div>
          </div>
        </div>

        <div className='flex flex-row'>
          <Card title={"Fill Vaccancies"} description={"Find the right talent at the time-of-need"} image={armyImage}
            buttonLabel={"Talent Finder"} route={"/talentFinder"}/>

          <Card title={"Upskill your Talent"} description={"Find the best learning talent for an individual’s unique needs"} image={armyImage2}
            buttonLabel={"Build a Plan"} route={"/trainingPlan"}/>

          <Card title={"View your Reports "} description={"Check out your saved reports or create new ones"} image={armyImage1}
            buttonLabel={"Reports"} route={"/reports"}/>
        </div>

        <div className='flex flex-col'>
            <p className='text-xl font-semibold h-6 pt-4'>My Lists</p>
            <p className='flex pt-3 mt-4 font-sans line-clamp-6 text-gray-500 h-16'>
              See your saved or curated lists of of talent or create a new list 
            </p>
        </div>

        <div className='flex flex-col justify-center w-full mt-4 px-2 max-w-7xl mx-auto mb-12'>
          <div className='inline-flex overflow-x-auto gap-6 pb-4 custom-scroll'>
            {spotlight.data && spotlight.data?.map((course) => {
              return <Spotlight course={course} key={course.title} />;
            })}
          </div>
        </div>

        {/* <div className='bg-white mt-10 shadow-md p-5'>
          <div className='pt-2 mb-5 text-lg font-bold'>16th Air Force (AFCYBER) Unit Snapshot</div>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col pt-2'>
              <div className='text-3xl text-purple pl-4 font-bold text-purple'>44,697</div>
              <div>Airman and Civilian</div>
            </div>
            <div className='flex flex-col pt-2'>
              <div className='text-3xl text-purple pl-6 font-bold text-purple'>117</div>
              <div>Unit Vacancies</div>
            </div>
            <div className='flex flex-col pt-2'>
              <div className='text-3xl text-purple pl-12 font-bold text-red'>3</div>
              <div>Critical Vacancies</div>
            </div>
            <div className='flex flex-col pt-2'>
              <div className='text-3xl text-purple pl-5 font-bold text-red'>35</div>
              <div>Days to Fill</div>
            </div>
            <div className='flex flex-col pt-2'>
              <div className='text-3xl text-purple pl-16 font-bold text-red'>57</div>
              <div>Upcoming Promotions</div>
            </div>
          </div>
        </div>
      
        <div className='bg-white mt-10 shadow-md p-5'>
          <div className='pt-2 mb-5 text-lg font-bold'>Unit Vacancies</div>
          <div className='pl-4 text-lg text-red font-bold'>Immediate Vacancies (Less than 45 days)</div>
              <div >
                <Accordion 
                  acctitle='3 COMSEC Managers'
                  accdescription={<>
                  <p>7/16 Dragon Fang - 9th Reconnaissance Wing</p>
                  <p>08/16 - Dragon Flag EAST - 9th Reconnaissance Wing; 55th Wing</p>
                  <p>08/12 - 09/19 - Dagger Fjord - 95th Reconnaissance Squadron</p> </>}
                />  
                <Accordion 
                  acctitle='2 Cyber Intelligence Planners'
                  accdescription='TBA'
                />

              <div className='pl-4 py-2 text-lg font-bold'>Upcoming Vacancies (45 - 60 Days)</div>
                 <Accordion
                    acctitle='2 Cyber Intelligence PLanners'
                    accdescription='TBA'
                 />
                 <Accordion
                    acctitle='3 Cyber Instructional Curriculum Developers'
                    accdescription='TBA'
                 />
                  <Accordion
                    acctitle='1 Cyber Instructor'
                    accdescription='TBA'
                 />
                 <Accordion
                 acctitle='3 Control Systems Security Specialist'
                 accdescription='TBA'
              />
              </div>
               
        </div>         */}
        

      </div>
            
      {/* <Footer /> */}
    </DefaultLayout>
  );
  
}
