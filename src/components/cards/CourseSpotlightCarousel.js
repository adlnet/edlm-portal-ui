// 'use strict';

import { backendHost } from '@/config/endpoints';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import Link from 'next/link';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import Carousel from 'react-grid-carousel'
import {Card, Button} from 'flowbite-react';



export default function CourseSpotlight({ course }) {
  const { Course, meta, Technical_Information, Course_Instance } = {
    ...course,
  };
  const config = useConfig();
  const router = useRouter();
  const { user } = useAuth();

  const thumbnail = useMemo(() => {
    return (
      Course_Instance?.Thumbnail ||
      Technical_Information?.Thumbnail ||
      (config?.data?.course_img_fallback &&
        `${backendHost}${config?.data.course_img_fallback}`) ||
      null
    );
  }, [Course_Instance, Technical_Information, config]);

  const title = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_title, course));
  }, [config.isSuccess, config.data]);

  const provider = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_provider, course));
  }, [config.isSuccess, config.data]);

  const description = useMemo(() => {
    return (getDeeplyNestedData(config.data?.course_information?.course_description, course));
  }, [config.isSuccess, config.data]);

  const handleClick = useCallback(
    (e) => {
      if (!user)
        return router.push(`/learner/course/${meta.metadata_key_hash || meta.id}`);

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
          id: `${window.origin}/learner/course/${meta.id}`,
          definitionName: title || Course.CourseTitle,
          description: removeHTML(getDeeplyNestedData(config.data?.course_information?.course_description, course)) || Course.CourseShortDescription,
        },
        resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
        resultExtValue: meta.metadata_key_hash || meta.id,
      };
      xAPISendStatement(context);
      router.push('/learner/course/' + (meta.metadata_key_hash || meta.id));
    },
    [Course, meta, user]
  );

  return (
    // <Link href={`/learner/course/${meta.metadata_key_hash || meta.id}`} passHref>
    <div>
                <Card className="w-80 h-fit rounded-xl" >
                  {/* <Image src={armyImage}  alt='' className=' object-fill h-50 w-150'/> */}
                  <div className=''>
                    <h5 className="text-2xl font-bold justify-left tracking-tight text-gray-900 dark:text-white">
                      {title || Course?.CourseTitle}
                    </h5>
                  </div>
                  <p className="font-normal text-sm text-gray-600 dark:text-gray-400">
                      {description?.length > 250 ?
                          `${description?.substring(0, 250)}...` : description}
                      {/* {description } */}
                  </p>
                  <Button onClick={handleClick} className="flex ml-32 justify-center bg-blue-900 hover:bg-blue-600">
                      View more
                  </Button>
                </Card>
    </div>
    // </Link>
  )
}
