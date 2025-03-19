'use strict';

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState} from "react";
import { useInterestLists } from "@/hooks/useInterestLists";
import { useRouter } from "next/router";
import { useUserOwnedLists } from "@/hooks/useUserOwnedLists";
import CheckMessageCard from "@/components/cards/CheckMessageCard";
import CollectionCard from "@/components/cards/CollectionCard";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import ShareIcon from "@/public/icons/shareIcon.svg";
import Stepper from "@/components/Stepper";

export default function LearningPlan() {

  const router = useRouter();
  const { user } = useAuth();

  const interestLists = useInterestLists();
  const ownedLists = useUserOwnedLists();

  // May need to sort this list 
  const learningPlans = []

  // Searching the unowned collections for learning plans
  for (let i = 0; i < interestLists?.data?.length; i++){
    if (interestLists?.data[i]?.name === 'Phase I: First 30 Days' ||
        interestLists?.data[i]?.name === 'Phase II: First 90 Days' ||
        interestLists?.data[i]?.name === 'Phase III: After 90 Days'){
      learningPlans.push(interestLists?.data[i])
    }
  }

  // Searching the owned collections for learning plans
  for (let i = 0; i < ownedLists?.data?.length; i++){
    if (ownedLists?.data[i]?.name === 'Phase I: First 30 Days' ||
        ownedLists?.data[i]?.name === 'Phase II: First 90 Days' ||
        ownedLists?.data[i]?.name === 'Phase III: After 90 Days'){
      learningPlans.push(ownedLists?.data[i])
    }
  }

  // 3 steps for learning plan
  const steps = ['30 Days', '90 Days', '90+ Days'];

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

  // Add back 401 and 403 error when we have live data
  useEffect(() => {
    if (!user) router.push('/');
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
          {learningPlans?.map((cardItem) => (
            <CollectionCard
              key={cardItem.id}
              title={cardItem.name}
              itemsCount={cardItem.experiences.length}
              description={cardItem.description}
              isPublic={cardItem.public}
              cardDetailLink={`/learner/lists/${cardItem.id}`}
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
