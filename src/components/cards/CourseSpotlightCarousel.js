// 'use strict';

import {Button, Card} from 'flowbite-react';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';

export default function CourseSpotlight({ course }) {
  const { Course, meta } = {
    ...course,
  };
  const config = useConfig();
  const router = useRouter();
  const { user } = useAuth();

  const title = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_title, course));
  }, [config.isSuccess, config.data]);

  const description = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_description, course));
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
    <div>
      <Card className="w-80 h-80 rounded-xl" >
        <div className=''>
          <h5 className="text-l font-bold justify-left tracking-tight text-gray-900 dark:text-white">
            {title || Course?.CourseTitle}
          </h5>
        </div>
        <p className="font-normal text-sm text-gray-600 dark:text-gray-400">
            {description?.length > 175 ?
                `${description?.substring(0, 175)}...` : description}
        </p>
        <Button onClick={handleClick} className="flex ml-32 justify-center bg-blue-900 hover:bg-blue-600">
            View more
        </Button>
      </Card>
    </div>
  )
}
