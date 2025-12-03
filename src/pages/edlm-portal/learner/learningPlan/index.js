'use strict';

import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { CompetencyProvider } from '@/contexts/CompetencyContext';
import { useAllLearningPlans } from '@/hooks/learningPlan/useAllLearningPlans';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ActiveCompleteTab from '@/components/buttons/ActiveCompleteTab';
import DefaultLayout from "@/components/layouts/DefaultLayout";
import LearningJourneyCard from "@/components/cards/LearningJourneyCard";
import PageLoadingContentWrapper from '@/components/layouts/PageLoadingContentWrapper';

function LearningPlanContent() {

  const { data: learningPlans, isLoading } = useAllLearningPlans();

  const mockOnboardingJourneys = [
    { id: 2, name: 'Phase I (30 Days)', progress: 100, length: 'DOT&E', description: 'Items for my job in 2025.'},
    { id: 3, name: 'Phase II (60 Days)', progress: 60, length: 'DOT&E', description: 'Things to do in 2025.' },
    { id: 4, name: 'Phase III (90 Days)', progress: 75, length: 'DOT&E', description: 'Other tasks for me.' }
  ]

  const router = useRouter();

  const [activePlans, setActivePlans] = useState(0);
  const [completedPlans, setCompletedPlans] = useState(0);

  const formattedLearningPlans = learningPlans?.map(plan => ({
    id: plan.id,
    name: plan.name,
    progress: 70, // placeholder for now before we have real progress calculation
    length: plan.timeframe,
    created: new Date(plan.created).toLocaleDateString(),
  }))?.sort((a, b) => new Date(a.created) - new Date(b.created));

  useEffect(() => {
    if (formattedLearningPlans) {
      setActivePlans(formattedLearningPlans.filter(plan => plan.progress < 100).length);
      setCompletedPlans(formattedLearningPlans.filter(plan => plan.progress >= 100).length);
    }
  }, [formattedLearningPlans]);

  const tabData = [
    { label: 'Active Plans', count: activePlans },
    { label: 'Completed Plans', count: completedPlans },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          <div className='mb-8'>
            <h1 className='text-2xl font-bold leading-normal text-gray-900 mb-4'>Learning Plans</h1>
            <h2 className=''> Manage and track your individual development plans. </h2>
          </div>

          <ActiveCompleteTab
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            tabs={tabData}
          />

          <div className='mt-4 mb-4 leading-tight'>
            <h1 className="text-xl font-bold pb-4 text-gray-900">Individual Development Plan</h1>
            <p className="text-gray-900 pb-4">
              Create personalized learning journeys tailored to your career goals and skill gaps. 
              These self-directed plans help you identify development areas, set learning objectives, 
              and track progress toward your professional aspirations within DOT&E.
            </p>
          </div>

          <PageLoadingContentWrapper isLoading={isLoading}>
            <div className='grid grid-cols-3 w-100 mb-6 flex-wrap gap-4'>
              
              {formattedLearningPlans?.map((journey) => {
                if (journey.progress < 100 && activeIndex == 0) {
                  return <LearningJourneyCard key={journey.id} journey={journey} />
                }else if (journey.progress >= 100 && activeIndex == 1){
                  return <LearningJourneyCard key={journey.id} journey={journey} />
                }else{
                  return null
                }
              })}

              {!isLoading && activePlans === 0  && activeIndex == 0 && (
                <div className='flex flex-col w-100 justify-center items-center border border-dashed rounded-lg pt-4 pb-10 shadow hover:shadow-lg transition shadow min-h-36'>
                  <ClipboardDocumentListIcon className="h-7 w-7 text-gray-700 mb-4" />
                  <div className='text-center pb-6'>
                    <p className='text-gray-700 pb-3 font-bold'>  No plans yet </p>
                    <p className='text-xs text-gray-800'> Create a new plan to get started</p>
                  </div>
                  <button className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-blue-800 hover:bg-blue-600" 
                          onClick={() => {router.push('/edlm-portal/learner/learningPlan/developmentPlan')}}
                  >
                    + Create New Plan
                  </button>
                </div>
              )}

            </div>

            {!isLoading && activePlans > 0  && activeIndex == 0 && (
              <div className='text-right pr-4'>
                <button className="text-blue-600 hover:text-blue-300 text-lg" 
                        onClick={() => {router.push('/edlm-portal/learner/learningPlan/developmentPlan')}}
                >
                  + Create New Plan
                </button>
              </div>
            )}
          </PageLoadingContentWrapper>

          {/* Learning Phases Section */}
          <div className='mb-4 mt-10 leading-tight'>
            <h1 className="text-xl font-bold text-gray-900 mb-4">DOT&E Onboarding Plans</h1>
            <p className="text-gray-900 pb-4"> 
              This Learning Plan phase onboards new AOs and familiarizes them with DOT&E policies and procedures 
              by providing a robust foundation through comprehensive onboarding requirements and policy resources. 
              This phase will ensure that new AOs gain a thorough understanding of the organizational standards, 
              operational guidelines, and essential procedures necessary for their roles.
            </p>
          </div>
          
          <div className='grid grid-cols-3 w-100 mb-6 gap-4'>
            
            {mockOnboardingJourneys?.map((journey) => {
              if (journey.progress < 100 && activeIndex == 0) {
                return <LearningJourneyCard key={journey.id} journey={journey} />
              }else if (journey.progress >= 100 && activeIndex == 1){
                return <LearningJourneyCard key={journey.id} journey={journey} />
              }else{
                return null
              }
            })}

          </div>        
        </div>
      </div>
    </DefaultLayout>
  )
}

export default function LearningPlan() {
  return (
    <CompetencyProvider>
      <LearningPlanContent />
    </CompetencyProvider>
  );
}
