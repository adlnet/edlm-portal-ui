'use strict';
import { Button } from 'flowbite-react';
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/router';
import CompetencyDevPlan from "@/components/CompetencyDevPlan";
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

  const Competencies = backupData;

  const ParentComps = findParents({Competencies});

  console.log(ParentComps)

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
              <div className="border-t pt-2 pb-4"></div>
              <p className="pb-4">How This Self-Assessment Works</p>
              <div className="flex flex-row bg-yellow-100 p-4 rounded-md border-solid border-2 border-yellow-400">
                <div className="mr-2">
                  <ExclamationCircleIcon class="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <span className="font-bold">Reflect honestly</span> on your current abilities in each competency area. This assessment helps identify where 
                  you are today and where you want to grow. Each competency has tailored learning journeys designed to bridge 
                  the gap between your current proficiency and your career goals.
                </div>
              </div>
              <ul className="pt-4 list-disc pl-5">
                <li className="marker:text-blue-500">Assess your current skill level in each of the 6 core competencies</li>
                <li className="marker:text-blue-500">Set target proficiency levels aligned with your career aspirations</li>
                <li className="marker:text-blue-500">Receive personalized learning journeys with curated courses and resources</li>
                <li className="marker:text-blue-500">Create a structured development plan to achieve your goals</li>
              </ul>

              <div className='flex flex-row justify-between pt-6'>
                <Button 
                  className='flex justify-center bg-blue-900 hover:bg-blue-600' 
                  onClick={() =>{router.push('/edlm-portal/learner/learningPlan/')}}
                >
                  Cancel
                </Button>
                <div className='flex flex-row'>
                  <Button 
                    className='flex justify-center bg-blue-400 hover:bg-blue-700' 
                    onClick={() =>{}}
                  >
                    Skip Assessment
                  </Button>
                  <Button 
                    className='flex justify-center bg-blue-900 hover:bg-blue-600 ml-2' 
                    onClick={() =>{}}
                  >
                    Begin Self-Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}