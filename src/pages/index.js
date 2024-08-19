import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image';
import React, { useCallback } from 'react';
import image from '@/public/image.png';
import Button from '@/components/Button';
import SideNav from '@/components/SideNav';
import Accordion from '@/components/Accordion';
// import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const popuarTopics = ["Cyber Security", "Web Developement", "Communications", "Artificial Intelligence", "Management Styles", "Agile Methodology", "Angular", "Leadership", "Data Science", "Unclassified Information", "Python"]
  
  return (
    <>
      <Head>
        <title>Experience Discovery Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <SideNav />

      <div className='flex flex-col mx-28'>
        <div className='py-4 text-lg font-bold'>Welcome, Talent Manager, Andrea Wilson! </div>
        <div className='bg-white shadow-md'>

          <div className='flex flex-row justify-between'>
            <div className='w-1/2 m-5'> 
              <div className='pt-2 text-lg font-bold'>Meet the Talent Management Dashboard </div>
              <div className='pt-2 text-gray-600'>The bridge connecting your unit vacancies and talent management tools. </div>
              <div className='pt-12'>
                <Button children={
                  <div className='flex flex-row gap-2 w-full'> Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                }/>
              </div>
            </div>
            <div className='max-h-36'>
              <Image src={image} height={150} alt='' className='rounded-lg m-5'/>
            </div>
          </div>
        </div>

        <div className='bg-white mt-10 shadow-md p-5'>
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
          <div className='pl-4 text-red font-bold'>Immediate Vacancies (Less than 45 days)</div>
          {/* <Accordion title={"Immediate Vacancies (Less than 45 days)"} /> */}
              {/*<div className='p-4 bg-gray-200 rounded-lg'>*/}
              <div >
                <Accordion 
                  acctitle='3 COMSEC Managers'
                  accdescription='7/16 Dragon Fang - 9th Reconnaissance Wing
                  08/16 - Dragon Flag EAST - 9th Reconnaissance Wing; 55th Wing
                  08/12 - 09/19 - Dagger Fjord - 95th Reconnaissance Squadron'
                />  
                <Accordion 
                  acctitle='2 Cyber Intelligence Planners'
                  accdescription='TBA'
                />

              <div className='py-4 text-lg font-bold'>Upcoming Vacancies (45 - 60 Days)</div>
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
               
        </div>        
        

      </div>
            
      {/* <Footer /> */}
    </>
  );
  
}
