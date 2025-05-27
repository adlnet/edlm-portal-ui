// 'use strict';

import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

  const provider = useMemo(() => {
    return removeHTML(getDeeplyNestedData(config.data?.course_information?.course_provider, course));
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
    <Link href={`/edlm-portal/learner/course/${meta.metadata_key_hash || meta.id}`} passHref>
      <div
        onClick={handleClick}
        role='button'
        tabIndex='0'
        aria-hidden='true'
        className="px-5 py-[19px] bg-gray-500 rounded-lg shadow flex-col justify-start items-start gap-2.5 inline-flex cursor-pointer transform transition-shadow duration-150 ease-in-out text-white h-[228px] w-[387px] hover:shadow-lg"
      >
        <div className="w-[330px] relative">
          <div className="w-full flex flex-col">
            <div className="text-white text-xl font-bold leading-normal">
              {title || Course?.CourseTitle}
            </div>
          </div>
          <div>
            <span className="text-white text-base font-medium leading-normal">Provider: </span>
            <span className="text-white text-base font-medium leading-normal">
              {provider || Course?.CourseProviderName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
