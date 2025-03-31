// 'use strict';

import { backendHost } from '@/config/endpoints';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseSpotlight({ course }) {
  const { Course, meta, Technical_Information, Course_Instance } = {
    ...course,
  };
  const config = useConfig();
  const router = useRouter();
  const { user } = useAuth();

  const title = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_title, course));
  }, [config.isSuccess, config.data]);

  const provider = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_provider, course));
  }, [config.isSuccess, config.data]);

  const handleClick = useCallback(
    (e) => {
      if (!user)
        return router.push(`/edlm-portal/learner/course/${meta.metadata_key_hash || meta.id}`);

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
          id: `${window.origin}/edlm-portal/learner/course/${meta.id}`,
          definitionName: title || Course.CourseTitle,
          description: removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, course)) || Course.CourseShortDescription,
        },
        resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
        resultExtValue: meta.metadata_key_hash || meta.id,
      };
      xAPISendStatement(context);
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
