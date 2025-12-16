'use-strict';

import { ArrowLongRightIcon, ChevronRightIcon, PencilSquareIcon, XMarkIcon} from '@heroicons/react/24/outline';
import { Button } from 'flowbite-react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { convertIntToTimeline } from '@/utils/convertTimelineToInt';
import { useEffect, useMemo, useState } from 'react';
import { useLearningPlan } from '@/hooks/learningPlan/useLearningPlan';
import { useMultipleCompAndKsaDesc } from '@/hooks/useCompOrKsaDesc';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import DevelopmentGoal from '@/components/cards/DevelopmentGoal';
import React from 'react';

export default function Plan () {

  const router = useRouter();
  const { planId } = router.query;

  const [showSuccess, setShowSuccess] = React.useState(router.query.updated === '1');

  const handleClose = () => {
    setShowSuccess(false);

    // Remove the ?updated param (and any other queries are preserved)
    const { updated, ...rest } = router.query;
    router.replace({
      pathname: router.pathname,
      query: rest
    }, undefined, { shallow: true });
  };

  React.useEffect(() => {
    // Show message if ?updated=1 appears in URL
    if (router.query.updated === '1') setShowSuccess(true);
  }, [router.query.updated]);

  const { data: plan, error} = useLearningPlan(planId);

  const getKsaReferences = goal => {
    const ksas = goal.ksas || [];
    const eccrKsas = ksas.map(ksa => ksa.eccr_ksa);
    return eccrKsas.filter(Boolean);
  };

  const getGoalKsaReferences = goals => {
    return goals.flatMap(getKsaReferences);
  };
  
  // Get all ECCR references (both competencies and KSAs) from the plan
  const eccrReference = useMemo(() => {
    if (!plan?.competencies) return [];
    const refs = [];
    
    plan.competencies.forEach(competency => {
      if (competency.eccr_competency) {
        refs.push(competency.eccr_competency);
      }

      // Add KSA ECCR references
      const goals = competency.goals || [];
      const ksaRefs = getGoalKsaReferences(goals);
      refs.push(...ksaRefs);
    });
    
    return refs;
  }, [plan]);

  const { data: descriptions } = useMultipleCompAndKsaDesc(eccrReference);

  const transformKsa = (ksa, descriptions) => {
    const ksaData = descriptions?.find(item => item.id === ksa.eccr_ksa);
    return {
      title: ksa.ksa_name,
      desc: ksaData?.description || '',
      currLvl: ksa.current_proficiency,
      targetLvl: ksa.target_proficiency,
    };
  };

  const transformGoal = (goal, competency, descriptions) => ({
    id: goal.id,
    desc: goal.goal_name,
    priority: competency.priority,
    timeline: convertIntToTimeline(goal.timeline) || goal.timeline,
    resources: goal.resources_support || [],
    obstacles: goal.obstacles || [],
    resourcesOther: goal.resources_support_other,
    obstaclesOther: goal.obstacles_other,
    ksaList: goal.ksas?.map(ksa => transformKsa(ksa, descriptions)) || [],
    courseList: goal.courses?.map(course => ({
      title: course.course_name,
    })) || [],
  });

  const getOrCreateCompetency = (reformattedCompetency, competency) => {
    if (!reformattedCompetency[competency.id]) {
      reformattedCompetency[competency.id] = {
        id: competency.id,
        name: competency.plan_competency_name,
        priority: competency.priority,
        goals: []
      };
    }
    return reformattedCompetency[competency.id];
  };

  const competenciesWithGoals = useMemo(() => {
    if (!plan?.competencies) return [];
    
    const reformattedCompetency = {};

    plan.competencies.forEach((competency) => {
      const competencyObj = getOrCreateCompetency(reformattedCompetency, competency);
      
      const transformedGoals = competency.goals?.map(goal => 
        transformGoal(goal, competency, descriptions)
      ) || [];
      
      competencyObj.goals.push(...transformedGoals);
    });
    
    return Object.values(reformattedCompetency);
  }, [plan, descriptions]);

  if (!plan || error) {
    return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          No Learning Plans with that ID were found.
        </div>
      </div>
    </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>

          <div className='flex flex-row text-blue-700 items-center gap-2 mb-4'>
            <button onClick={() => {router.push('/edlm-portal/learner/learningPlan/')}}>Learning Plans</button>
            <ChevronRightIcon className='h-4 w-4'></ChevronRightIcon>
            <p>{plan.name}</p>
          </div>

          {showSuccess ? (
            <div className="flex flex-col p-4 mt-2 mb-4 bg-green-100 rounded-lg w-full"> 
              <div className="flex flex-row justify-between pb-2">
                <div className="flex flex-row items-center">
                  <CheckCircleIcon className="w-6 h-6 text-green-900"/>
                  <div className="text-lg text-green-900 font-bold pl-2">Learning Plan Updated Successfully!</div>
                </div>
                <button
                  type="button"
                  aria-label="Dismiss"
                  className=""
                  onClick={handleClose}
                >
                  <XMarkIcon class='w-6 h-6 text-green-900' />
                </button>
              </div>
              <div className="text-green-900 text-medium">
                  Your personalized development plan has been updated and is ready to guide your career growth.
              </div>

            </div>
          ) : (
            <></>
          )}

          <div className='w-full flex flex-row items-center justify-end pb-4 pr-1'>
            <button
              className='text-blue-700 hover:text-blue-400'
              onClick={()=> router.push(`/edlm-portal/learner/learningPlan/edit/${planId}`)}
            >
              <div className='flex flex-row'>
                <PencilSquareIcon class='h-5 w-5'/>
                <p className='pl-1'>Edit</p>
              </div>
            </button>
          </div>
 
          <div className='border border-gray-300 flex flex-row py-6 px-4 rounded-lg items-center justify-between mb-6'>  
            <h1 className='font-bold text-gray-900 text-xl'>{plan.name}</h1>
            <div className='text-sm bg-blue-50 text-blue-700 rounded-md px-2 py-1'>{plan.timeframe}</div>
          </div>

        {competenciesWithGoals?.map((competency) => (
          <DevelopmentGoal key={competency.id} competency={competency} />
        ))}

          <div className='p-4 border rounded-lg border-gray-300 mt-6'>
            <div className='font-bold pb-6 text-xl text-gray-900'>Next Steps</div>
            <div className='text-gray-890 pb-3'>Keep progressing with your development plan and explore additional resources.</div>
            <div className='flex flex-row gap-4'>
              <div className='flex flex-col w-1/3 border border-gray-300 rounded-lg py-4 px-6 items-center'>
                <div className='pb-2 font-bold text-lg'>Track Your Progress</div>
                <div className='text-sm pb-8 flex-wrap text-center'>Monitor your development through the Learning Plan page and update your progress as you complete courses.</div>
                <button 
                  className='flex flex-row items-center gap-2 border border-blue-600 rounded-lg py-1 px-3 text-sm hover:bg-blue-100 text-blue-600'
                  onClick={()=> {}}
                > View My Plans <ArrowLongRightIcon className='h-4 w-4' /> </button>
              </div>
              <div className='flex flex-col w-1/3 border border-gray-300 rounded-lg p-3 py-4 px-6 items-center'>
                <div className='pb-2 font-bold text-lg'>Explore Course Catalog</div>
                <div className='text-sm pb-8 flex-wrap text-center'>Browse additional courses and resources to supplement your development plan with more learning opportunities.</div>
                <button 
                  className='flex flex-row items-center gap-2 border border-blue-600 rounded-lg py-1 px-3 text-sm hover:bg-blue-100 text-blue-600'
                  onClick={()=> {}}
                > Browse Collections <ArrowLongRightIcon className='h-4 w-4' /> </button>
              </div>
              <div className='flex flex-col w-1/3 border border-gray-300 rounded-lg p-3 py-4 px-6 items-center'>
                <div className='pb-2 font-bold text-lg'>Add from Collections</div>
                <div className='text-sm pb-8 flex-wrap text-center'>Access your saved collections to add curated courses and resources to enhance your development plan.</div>
                <button 
                  className='flex flex-row items-center gap-2 border border-blue-600 rounded-lg py-1 px-3 text-sm hover:bg-blue-100 text-blue-600'
                  onClick={()=> {}}
                > View Collections <ArrowLongRightIcon className='h-4 w-4' /> </button>
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-end pt-8'>
            <Button 
              className='flex justify-center bg-blue-100 text-blue-900 hover:bg-blue-300' 
              onClick={() =>{}}
            >
              Export 
            </Button>
            <Button 
              className='flex justify-center bg-blue-900 hover:bg-blue-600 ml-2' 
              onClick={() =>{router.push('/edlm-portal/learner/learningPlan/')}}
            >
              Return to Learning Plans
            </Button>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
}
