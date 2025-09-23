'use strict';
import { Button } from 'flowbite-react';
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/router';
import { useState } from 'react';
import CompetencyDevPlan from "@/components/CompetencyDevPlan";
import CreateLearningPlan from '@/pages/edlm-portal/learner/learningPlan/createLearningPlan';
import DefaultLayout from "@/components/layouts/DefaultLayout";
import backupData from '@/public/backup_competencies.json';


// Helper function that returns all parent competencies
function findParents({Competencies}){
  const parentComps = []
  
  Competencies.forEach((comp) =>{
    if (comp['parent'].length === 0)
      parentComps.push(comp);
  })

  return parentComps
}

export default function DevelopmentPlan() {

  const router = useRouter();

  const [showCreatePlan, setShowCreatePlan] = useState(false);

  const Competencies = backupData;

  const ParentComps = findParents({Competencies});

  console.log(ParentComps)

  if (showCreatePlan) {
    return <CreateLearningPlan />;
  }

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          <h1 className='text-center text-xl p-2'>
            Create Your Individual Development Plan
          </h1>
          <h2 className='text-center text-xl pt-2 pb-8 font-bold'>
            Let&apos;s build a personalized learning journey to advance your career within DOT&E
          </h2>
          <div className='flex flex-col border rounded-xl'>
            <div className="bg-blue-700 text-white rounded-t-xl p-4"> 
              <h1 className="text-xl font-bold pt-2 pb-4"> Understanding DOT&E Core Competencies </h1>
              <p className="text-lg">
                As an Action Officer in DOT&E, your professional growth is guided by six essential core competencies. 
                These competencies represent the critical knowledge, skills, and abilities needed to excel in your role 
                and advance your career within the Department of Defense.
              </p>
            </div>
            <div className="flex flex-wrap p-4">
              {ParentComps.map((comp, idx) => (
                <CompetencyDevPlan key={idx} competency={comp}/>
              ))}
            </div>
            <div className="p-4">
              <div className="border-t pt-2"></div>
              <div className='flex flex-row justify-between pt-4'>
                <Button 
                  className='flex justify-center bg-blue-300 hover:bg-blue-600' 
                  onClick={() =>{router.push('/edlm-portal/learner/learningPlan/')}}
                >
                  Cancel
                </Button>
                <Button 
                  className='flex justify-center bg-blue-900 hover:bg-blue-600 ml-2' 
                  onClick={() =>{}}
                >
                  Start Role Based Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
