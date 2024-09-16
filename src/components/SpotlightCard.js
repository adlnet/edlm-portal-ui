import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/card-header.png'

export default function Spotlight({ course }) {

  return (
    <Link href={`/course/${course.title}`} passHref>
        <div className="h-108 w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='flex items-center justify-center px-3'>
              <Image src={image} height={100} alt='' className='rounded-lg m-5'/>
            </div>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{course?.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">
                  {course?.lastViewed}
                </p>
            </div>
        </div>
    </Link>
  );
}
