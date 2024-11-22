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
// import { Corner } from '@bokeh/bokehjs/build/js/lib/models/common/box_kinds';

export default function SearchResult({ result }) {
  const { user } = useAuth();
  const router = useRouter();
  const config = useConfig();

  const title = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_title, result));
  }, [config.isSuccess, config.data]);

  const competencies = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_competency, result));
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
      className='group hover:text-blue-400 hover:text-shadow cursor-pointer pr-2 pl-1 py-1 rounded-md outline-none focus-within:ring-2 focus-within:ring-blue-500'
      title={title || result.Course.CourseTitle}
    >
      <div className='flex justify-between gap-2 items-center'>
        <button
          className='text-lg font-semibold group-hover:underline w-full text-left focus:outline-none'
          onClick={handleClick}
        >
          <h3>{title || result.Course.CourseTitle}</h3>
        </button>
        <ShareButton
                id={result.meta.id}
                courseTitle={title || result.Course.CourseTitle}
                courseDescription={removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, result)) || removeHTML(result.Course.CourseShortDescription)}
        />
        {user && <SaveModal courseId={result.meta.id} title={title || result.Course.CourseTitle} />}
      </div>
      <div onClick={handleClick} className='text-left' aria-hidden='true'>
        <h4>
          <strong>Provider:&nbsp;</strong>
          {getDeeplyNestedData(config.data?.course_information?.course_provider, result) || result.Course.CourseProviderName}
        </h4>
        <h4>
          <strong>Estimated Time: &nbsp;</strong>
          { getDeeplyNestedData(config.data?.course_information?.course_time, result)  || 'Not available' }
        </h4>
        <h4>
          <strong>Delivery Method: &nbsp;</strong>
          { getDeeplyNestedData(config.data?.course_information?.course_deliveryMode, result) || 'Not available' }
        </h4>
        <div>
          { competencies || 'Not available' }
        </div>
        <p className='line-clamp-4 pr-4'>
          {removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, result)) ||removeHTML(result.Course.CourseShortDescription)}
        </p>
      </div>
    </div>
  );
}
