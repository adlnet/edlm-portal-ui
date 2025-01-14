import { axiosInstance } from '@/config/axiosConfig';
import { candidateList } from '@/config/endpoints';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import Card from '@/components/Card';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Head from 'next/head'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Spotlight from '@/components/cards/SpotlightCard';
import armyImage from '@/public/Army.png'
import armyImage1 from '@/public/Army1.jpg'
import armyImage2 from '@/public/Army2.jpg'
import headerImage from '@/public/Abstact1.png';

export default function Home() {
  const router = useRouter();
  const [spotlightData, setSpotlightData] = useState(null);
  
  useEffect(() => {
    axiosInstance
      .get(candidateList)
      .then((res) => {
        setSpotlightData(res.data);
      })
      .catch((err) => {
          console.log(err);
      });
  }, []);

  return (
    <DefaultLayout>
      <Head>
        <title>EDLM Portal</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className='flex flex-col mt-8'>
        <div className='py-4 text-xl font-bold'>Welcome, Talent Manager, Andrea Wilson! </div>
        <div className='bg-white shadow-md'>

          <div className='flex flex-row justify-between'>
            <div className='w-1/2 m-5'> 
              <div className='pt-2 text-lg font-bold'>Talent Management Dashboard </div>
              <div className='pt-2 text-gray-600'>The hub for searching for talent and planning for their development. </div>
              <div className='pt-12'>
                <Button onClick={()=>{router.push("/talentManager/talentFinder")}}>
                  <div className='flex flex-row gap-2 w-full'> <p className='pt-0.5'>Learn More</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                </Button>
              </div>
            </div>
            <div className='max-h-36'>
              <Image src={headerImage} height={150} alt='' className='rounded-lg m-5 max-w-1/2'/>
            </div>
          </div>
        </div>

        <div className='flex flex-row'>
          <Card title={"Fill Vacancies"} description={"Find the right talent at the time-of-need"} image={armyImage}
            buttonLabel={"Talent Finder"} route={"/talentManager/talentFinder"}/>

          <Card title={"Upskill your Talent"} description={"Find the best learning talent for an individual’s unique needs"} image={armyImage2}
            buttonLabel={"Build a Plan"} route={"/talentManager/trainingPlan"}/>

          <Card title={"View your Reports "} description={"Check out your saved reports or create new ones"} image={armyImage1}
            buttonLabel={"Reports"} route={"/talentManager/reports"}/>
        </div>

        <div className='flex flex-col'>
            <p className='text-xl font-semibold h-6 pt-4'>My In-Progress Planning</p>
            <p className='flex pt-3 mt-4 font-sans line-clamp-6 text-gray-500'>
              See your saved or curated lists of of talent or create a new list 
            </p>
        </div>

        <div className='flex flex-col justify-center w-full mt-4 px-2 max-w-7xl mx-auto mb-12'>
          <div className='inline-flex overflow-x-auto gap-6 pb-4 custom-scroll'>
            {spotlightData && spotlightData?.map((course) => {
              return <Spotlight course={course} key={spotlightData?.name} />;
            })}
          </div>
        </div>

      </div>
      {/* <Footer /> */}
    </DefaultLayout>
  );
  
}
