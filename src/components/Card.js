import { useRouter } from "next/router"
import Image from 'next/image';


export default function Card({ title, description, buttonLabel, children, image }){
    const router = useRouter();
    return(
        <div className='bg-white border rounded-md border-gray-200 p-4 shadow-lg focus:shadow-lg px-10 my-8 mr-4 w-1/3'>
            <div className='max-h-24'>
              <Image src={image} height={150} alt='' className='rounded'/>
            </div>
            <h1 className='flex text-lg font-semibold h-6 pt-4'>
                {title}
            </h1>
            <p className='flex pt-3 mt-4 font-sans line-clamp-6 text-gray-500 h-16'>
                {description}
            </p>
            {children}
            {buttonLabel &&
            <div className='flex align-bottom items-bottom justify-end mt-10'>
                <div className='inline-block align-bottom gap-2'>
                    <button
                        id={'view-course-button-'}
                        className='flex justify-center items-center gap-2 dod-500 w-48 rounded-lg hover:shadow-md text-white bg-purple hover:bg-blue-400 hover:text-white px-2 p-1.5 transform transition-all duration-150 ease-in-out border-dod-500 border-2 focus:ring-2 ring-dod-500 outline-none'
                        title={buttonLabel}
                        // onClick={handleClick}
                    >
                        {buttonLabel}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
            }
        </div>
    )
}