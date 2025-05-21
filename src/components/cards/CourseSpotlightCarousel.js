// 'use strict';

import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';

export default function CourseSpotlight({ course }) {
  const { Course, meta } = {
    ...course,
  };
  const config = useConfig();
  const router = useRouter();
  const { user } = useAuth();

  const title = useMemo(() => {
    return removeHTML(getDeeplyNestedData(config.data?.course_information?.course_title, course));
  }, [config.isSuccess, config.data]);

  const description = useMemo(() => {
    return removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, course));
  }, [config.isSuccess, config.data]);

  const handleClick = useCallback(
    (e) => {
      if (!user)
        return router.push(`/edlm-portal/learner/course/${meta.metadata_key_hash || meta.id}`);
      
      router.push('/edlm-portal/learner/course/' + (meta.metadata_key_hash || meta.id));
    },
    [Course, meta, user]
  );

  return (
    <div className="w-72 h-64 pb-2 my-2 relative bg-white rounded-lg shadow-md flex flex-col">
      <div className="rounded-t-lg overflow-hidden">
        <div className="px-4 py-3 bg-[#00509F] rounded-t-lg h-20 flex items-center">
          <div className="text-white text-xl font-semibold line-clamp-2">{title || Course?.CourseTitle}</div>
        </div>
      </div>
      <div className="flex-grow px-4 py-2 overflow-hidden">
        <div className="text-black text-opacity-50 text-base font-normal leading-tight line-clamp-5">
          {description || Course?.CourseShortDescription}
        </div>
      </div>
      <div className="px-2 py-2 flex justify-end">
        <div className="px-3 py-2 bg-white rounded-lg inline-flex justify-center items-center gap-2 hover:shadow cursor-pointer" onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' && handleClick()} role="button" tabIndex={0}>
          <span className="text-[#00509F] text-sm font-medium">View more</span>
        </div>
      </div>
    </div>
  )
}
