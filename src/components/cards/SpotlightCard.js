import Image from 'next/image';
import Link from 'next/link';
import image from '@/public/list1.png'

export default function Spotlight({ course }) {

  console.log(course)
  return (
    <Link href={`/talentManager/talentFinder/filters/alignment`} passHref legacyBehavior>
        <div className="h-108 w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-64 my-6">
            <div className='flex items-center justify-center px-3'>
              <Image src={image} height={100} alt='' className='rounded-lg m-5'/>
            </div>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{course?.name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">
                  {course.lastViewed ? course.lastViewed : <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate"> Viewed 1 day ago</p>}
                </p>
            </div>
        </div>
    </Link>
  );
}
