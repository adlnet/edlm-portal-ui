'use strict';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import SaveModal from '@/components/modals/SaveModal';
import { useConfig } from '@/hooks/useConfig';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import ShareButton from '@/components/buttons/ShareBtn';
import Image from 'next/image';
import StoreIcon from '@/public/store.svg';
import ClockIcon from '@/public/clock.svg';
import WindowIcon from '@/public/window.svg';

//Helper function to extract competencies
function getComps(subjects){

  const comps = subjects?.split(',');
  
  for (let i = 1; i < comps?.length; i++){
    //Trimming whitespace 
    comps[i] = comps[i]?.trim() || '';
    //Accounting for comp #4 with commas
    if (comps[i][0] !== 'C'){
      comps[i-1] = comps[i - 1] + ', ' + comps[i] + ',' + comps[i + 1];
      let removed = comps.splice(i, i+1);
      i--;
    }
    comps[i] = comps[i].replace('4A', '')
    comps[i] = comps[i].replace('4B', '')
    comps[i] = comps[i].replace('4C', '')
    comps[i] = comps[i].replace('4D', '')
    comps[i] = comps[i].replace(/[0-9]/g, '')
    comps[i] = comps[i].replace('Competency #','')
    comps[i] = comps[i].trim()
  }

  //There is probably a way to make this one statement but I don't know how lol
  if (comps && comps.length > 0) {
    comps[0] = comps[0].replace('4A', '')
    comps[0] = comps[0].replace('4B', '')
    comps[0] = comps[0].replace('4C', '')
    comps[0] = comps[0].replace('4D', '')
    comps[0] = comps[0].replace('Competency #', '')
    comps[0] = comps[0].replace(/[0-9]/g, '')
    comps[0] = comps[0].trim()
  }
  
  return comps
}

// const  competencies = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii']

export default function SearchResult({ result, handleCompetencyTag}) {
  const { user } = useAuth();
  const router = useRouter();
  const config = useConfig();

  const title = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_title, result));
  }, [config.isSuccess, config.data]);

  const subject = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_subject, result));
  }, [config.isSuccess, config.data]);

  const competencies = getComps(subject)

  const handleClick = useCallback(() => {
    // create the context
    const context = {
      actor: {
        first_name: user?.user?.first_name,
        last_name: user?.user?.last_name,
      },
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/explored',
        display: 'explored',
      },
      object: {
        id: `${window.origin}/learner/course/${result.meta.id}`,
        definitionName: title,
        description: removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, result)),
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: result.meta.id,
    };

    xAPISendStatement(context);
    router.push(`/learner/course/${result.meta.id}`);
  }, [result, user, router]);

  return (
    <div
      className='p-4 bg-white rounded-lg shadow-xl flex flex-col gap-4 hover:shadow-2xl transition-shadow duration-200'
      title={title}
    >
      <div className='flex justify-between gap-2 items-center'>
        <button
          className='text-xl font-bold text-[#111928] focus:outline-none'
          onClick={handleClick}
        >
          <h3>{title}</h3>
        </button>
        <div className='flex gap-2'>
          <ShareButton
                  id={result.meta.id}
                  courseTitle={title}
                  courseDescription={removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, result))}
          />
          {user && <SaveModal courseId={result.meta.id} title={title} />}
        </div>
      </div>
      <div className='text-gray-500 text-base'>
        <p className='line-clamp-4 pr-4'>
          {removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, result))}
        </p>

        <div className="h-7 justify-start items-center gap-2 inline-flex flex-wrap my-6">
          <div className="justify-start items-center gap-1.5 flex">
            <div className="w-5 h-5 justify-center items-center flex">
              <Image src={StoreIcon} alt="Store" className="w-5 h-5 relative flex-col justify-start items-start flex" />
            </div>
            <div className="text-gray-500 text-sm font-normal leading-tight">
              {getDeeplyNestedData(config.data?.course_information?.course_provider, result)}
            </div>
          </div>
          <div className="justify-start items-center gap-1.5 flex">
            <div className="w-5 h-5 relative">
              <Image src={ClockIcon} alt='Clock' className="w-5 h-5 relative flex-col justify-start items-start flex" />
            </div>
            <div className="text-gray-500 text-sm font-normal  leading-tight">
              {getDeeplyNestedData(config.data?.course_information?.course_time, result)}
            </div>
          </div>
          <div className="justify-start items-center gap-1.5 flex">
            <div className="w-5 h-5 justify-center items-center flex">
              <Image src={WindowIcon} alt='Window' className="w-5 h-5 relative flex-col justify-start items-start flex" />
            </div>
            <div className="text-gray-500 text-sm font-normal leading-tight">
              {getDeeplyNestedData(config.data?.course_information?.course_deliveryMode, result)}
            </div>
          </div>
          { competencies.map((comp) =>{
            return (
              <div className="w-auto h-7 px-[15px] py-1.5 bg-[#e5efff] rounded-xl justify-center items-center gap-2 flex">
                <div className="text-center text-[#3892f3] text-sm font-normal font-['Roboto'] leading-tight whitespace-nowrap">
                  <button
                    className=''
                    onClick={()=> handleCompetencyTag(comp)}
                  >
                    {comp}
                  </button>
                </div>
              </div>
            )
            })
          }
      </div>
    </div>
  </div>
  );
}
