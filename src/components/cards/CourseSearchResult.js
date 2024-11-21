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

export default function SearchResult({ result }) {
  const { user } = useAuth();
  const router = useRouter();
  const config = useConfig();

  const title = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_title, result));
  }, [config.isSuccess, config.data]);

  const subject = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_subject, result));
  }, [config.isSuccess, config.data]);

  const handleClick = useCallback(() => {
    // create the context
    const context = {
      actor: {
        first_name: user?.user?.first_name || 'Anonymous',
        last_name: user?.user?.last_name || 'User',
      },
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/explored',
        display: 'explored',
      },
      object: {
        id: `${window.origin}/learner/course/${result.meta.id}`,
        definitionName: title || result.Course.CourseTitle,
        description: removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, result)) || result.Course.CourseShortDescription,
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: result.meta.id,
    };

    xAPISendStatement(context);
    router.push(`/learner/course/${result.meta.id}`);
  }, [result, user, router]);

  return (
    <div
      className='p-4 bg-white rounded-lg shadow-lg flex flex-col gap-4 hover:shadow-2xl transition-shadow duration-200'
      title={title || result.Course.CourseTitle}
    >
      <div className='flex justify-between items-center'>
        <button
          className='text-xl font-bold text-[#111928] focus:outline-none'
          onClick={handleClick}
        >
          <h3>{title || result.Course.CourseTitle}</h3>
        </button>
        <div className='flex gap-2'>
          <ShareButton
                  id={result.meta.id}
                  courseTitle={title || result.Course.CourseTitle}
                  courseDescription={removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, result)) || removeHTML(result.Course.CourseShortDescription)}
          />
          {user && <SaveModal courseId={result.meta.id} title={title || result.Course.CourseTitle} />}
        </div>
      </div>
      <div className='text-gray-500 text-base'>
        <p className='line-clamp-4 pr-4'>
          {removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, result)) ||removeHTML(result.Course.CourseShortDescription)}
        </p>

        <div className="h-7 justify-start items-center gap-2 inline-flex flex-wrap my-6">
          <div className="justify-start items-center gap-1.5 flex">
            <div className="w-5 h-5 justify-center items-center flex">
              <Image src={StoreIcon} alt="Store" className="w-5 h-5 relative flex-col justify-start items-start flex" />
            </div>
            <div className="text-gray-500 text-sm font-normal leading-tight">
              {getDeeplyNestedData(config.data?.course_information?.course_provider, result) || result.Course.CourseProviderName}
            </div>
          </div>
          <div className="justify-start items-center gap-1.5 flex">
            <div className="w-5 h-5 relative">
              <Image src={ClockIcon} className="w-5 h-5 relative flex-col justify-start items-start flex" />
            </div>
            <div className="text-gray-500 text-sm font-normal  leading-tight">
              {getDeeplyNestedData(config.data?.course_information?.course_time, result) || 'Not available'}
            </div>
          </div>
          <div className="justify-start items-center gap-1.5 flex">
            <div className="w-5 h-5 justify-center items-center flex">
              <Image src={WindowIcon} className="w-5 h-5 relative flex-col justify-start items-start flex" />
            </div>
            <div className="text-gray-500 text-sm font-normal leading-tight">
              {getDeeplyNestedData(config.data?.course_information?.course_deliveryMode, result) || 'Not available'}
            </div>
          </div>

          <div className="w-auto h-7 px-[15px] py-1.5 bg-[#e5efff] rounded-xl justify-center items-center gap-2 flex">
            <div className="text-center text-[#3892f3] text-sm font-normal font-['Roboto'] leading-tight whitespace-nowrap">
              {subject || 'Not available' }
            </div>
          </div>
      </div>
    </div>
  </div>
  );
}
