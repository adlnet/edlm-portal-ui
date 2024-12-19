'use strict';

import Stepper from "@/components/Stepper";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import CollectionCard from "@/components/cards/CollectionCard";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState} from "react";
import CheckMessageCard from "@/components/cards/CheckMessageCard";
import ShareIcon from "@/public/icons/shareIcon.svg";

export default function LearningPlan() {

  const router = useRouter();
  const { user } = useAuth();

  // 3 steps for learning plan
  const steps = ['30 Days', '60 Days', '90 Days'];

  const LEARNING_PLAN_DECRIPTION = 'This Learning Plan phase onboards new AOs and familiarizes them with DOT&E policies and procedures by providing a robust foundation through comprehensive onboarding requirements and policy resources. This phase will ensure that new AOs gain a thorough understanding of the organizational standards, operational guidelines, and essential procedures necessary for their roles.';

  const [copy, setCopy] = useState('');

  // Card dropdown menu options
  const getMenuItems = id => [
    {
      icon: <Image src={ShareIcon} alt='Share' />,
      label: 'Share',
      onClick: () => handleShare(id),
    },
  ];

  // Mock data for collection card component
  const data = [
    {
      id: 1,
      name: 'Phase I (30 Days)',
      description: 'This phase is phase I.',
      experiences: [],
      public: true,
    },
    {
      id: 2,
      name: 'Phase II (30-60 Days)',
      description: 'This phase is phase II.',
      experiences: [],
      public: true,
    },
    {
      id: 3,
      name: 'Phase III (60-90 Days)',
      description: 'This phase is phase III.',
      experiences: [],
      public: true,
    },
  ];

  const handleShare = id => {
    navigator.clipboard.writeText(`${window.origin}/learner/lists/${id}`)
    .then(() => {
      setCopy('Copied Successfully!');
      setTimeout(() => {
        setCopy('');
      }, 2000);
    })
    .catch(() => {
      setCopy('Failed to copy');
      setTimeout(() => {
        setCopy('');
      }, 2000);
    });
  };

  useEffect(() => {
    if (!user) router.push('/');
    // if (isError && error.response.status === 403) router.push('/403');
    // if (isError && error.response.status === 401) router.push('/401');
  }, []);

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          <div className='mb-4'>
            <h1 className='text-2xl font-bold leading-normal text-gray-900'>Onboarding Learning Plan</h1>
          </div>

          <div className='mb-4 rounded-lg bg-gray-100 p-4 italic text-black text-base font-semibold leading-tight'>
            {LEARNING_PLAN_DECRIPTION}
          </div>

          <Stepper steps={steps} />

          <div className= 'grid grid-cols-1 md:grid-cols-3 gap-8 pb-20'>
          {data?.map((cardItem, i) => (
            <CollectionCard
              key={i}
              title={cardItem.name}
              itemsCount={cardItem.experiences.length}
              description={cardItem.description}
              isPublic={cardItem.public}
              cardDetailLink={`/learner/learningPlan/${cardItem.id}`}
              menuItems= {getMenuItems(cardItem.id)}
            />
          ))}
        </div>
        <CheckMessageCard message={copy} />
        </div>

      </div>
    </DefaultLayout>
  )
}
