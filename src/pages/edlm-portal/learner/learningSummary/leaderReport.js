'use strict';
import { 
    ArrowLongDownIcon, 
    ArrowLongUpIcon, 
    ArrowUpOnSquareStackIcon, 
    BookOpenIcon, 
    BookmarkIcon, 
    BookmarkSquareIcon,
    UserIcon 
} from '@heroicons/react/24/outline';
import { useCourseProgressDetail } from '@/hooks/useCourseProgressDetail';
import CollectionTable from "@/components/tables/collectionsTable/CollectionTable";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import LearnerTable from '@/components/tables/LearnerTable';
import ProgressCard from "@/components/cards/ProgressCard";



// Mock data for development

const columns = [
    {label: 'LAST NAME', accessor: 'lastName'},
    {label: 'FIRST NAME', accessor: 'firstName'},
    {label: 'COURSES TAKEN', accessor: 'coursesTaken'},
    {label: 'MOST RECENT COURSE', accessor: 'mostRecentCourse'},
    {label: 'STATUS', accessor: 'status'}
];

const totalLearners = 1247;
const totalLearnChange = 12;
const coursesInSession = 156;
const coursesChange = 8;
const collectionsCreated = 56;
const collectionsChange = -3;

const learnerData = [
    { lastName: "Donlon", firstName: "Matthew", coursesTaken: "21", mostRecentCourse: "Program Test & Evaluation Strategy", status: "In Progress" },
    { lastName: "Johnson", firstName: "Emily", coursesTaken: "15", mostRecentCourse: "Advanced Project Management", status: "Completed" },
    { lastName: "Patel", firstName: "Ravi", coursesTaken: "10", mostRecentCourse: "Risk Analysis Fundamentals", status: "In Progress" },
    { lastName: "Chen", firstName: "Sophia", coursesTaken: "18", mostRecentCourse: "Leadership Development", status: "Completed" },
    { lastName: "Martinez", firstName: "Carlos", coursesTaken: "12", mostRecentCourse: "Agile Methodologies", status: "Not Started" },
    { lastName: "Nguyen", firstName: "Linh", coursesTaken: "20", mostRecentCourse: "Data Security Essentials", status: "In Progress" },
    { lastName: "Smith", firstName: "Jessica", coursesTaken: "13", mostRecentCourse: "Strategic Communications", status: "Completed" },
    { lastName: "Williams", firstName: "James", coursesTaken: "17", mostRecentCourse: "Cybersecurity Essentials", status: "Not Started" },
    { lastName: "Kim", firstName: "Daniel", coursesTaken: "11", mostRecentCourse: "AI Integration Fundamentals", status: "In Progress" },
    { lastName: "Lee", firstName: "Ava", coursesTaken: "16", mostRecentCourse: "Innovation Workshop", status: "Completed" },
    { lastName: "Brown", firstName: "Olivia", coursesTaken: "19", mostRecentCourse: "Contract Negotiation", status: "In Progress" },
    { lastName: "Garcia", firstName: "Miguel", coursesTaken: "14", mostRecentCourse: "Change Management", status: "Not Started" },
    { lastName: "Rodriguez", firstName: "Elena", coursesTaken: "7", mostRecentCourse: "Cultural Awareness Training", status: "Completed" },
    { lastName: "Wilson", firstName: "Benjamin", coursesTaken: "9", mostRecentCourse: "Effective Time Management", status: "In Progress" },
    { lastName: "Thomas", firstName: "Grace", coursesTaken: "23", mostRecentCourse: "Business Ethics", status: "Completed" },
    { lastName: "Harris", firstName: "David", coursesTaken: "18", mostRecentCourse: "Advanced Data Analytics", status: "In Progress" },
    { lastName: "Clark", firstName: "Natalie", coursesTaken: "10", mostRecentCourse: "Digital Marketing", status: "Completed" },
    { lastName: "Lewis", firstName: "Samuel", coursesTaken: "24", mostRecentCourse: "Cloud Computing Basics", status: "In Progress" },
    { lastName: "Robinson", firstName: "Hannah", coursesTaken: "13", mostRecentCourse: "Presentation Skills", status: "Not Started" },
    { lastName: "Walker", firstName: "Isaac", coursesTaken: "16", mostRecentCourse: "Organizational Behavior", status: "Completed" },
    { lastName: "Young", firstName: "Sophie", coursesTaken: "12", mostRecentCourse: "Quality Management", status: "In Progress" },
    { lastName: "King", firstName: "Liam", coursesTaken: "8", mostRecentCourse: "Negotiation Tactics", status: "Completed" },
    { lastName: "Wright", firstName: "Amelia", coursesTaken: "15", mostRecentCourse: "Performance Coaching", status: "In Progress" },
    { lastName: "Lopez", firstName: "Gabriel", coursesTaken: "11", mostRecentCourse: "Conflict Resolution", status: "Not Started" },
    { lastName: "Hill", firstName: "Mia", coursesTaken: "17", mostRecentCourse: "IT Infrastructure", status: "In Progress" },
    { lastName: "Scott", firstName: "Andrew", coursesTaken: "20", mostRecentCourse: "Process Improvement", status: "Completed" },
    { lastName: "Green", firstName: "Ella", coursesTaken: "10", mostRecentCourse: "Finance Principles", status: "In Progress" },
    { lastName: "Adams", firstName: "Jack", coursesTaken: "13", mostRecentCourse: "Customer Experience Strategy", status: "Completed" },
    { lastName: "Baker", firstName: "Lucy", coursesTaken: "19", mostRecentCourse: "Regulatory Compliance", status: "Not Started" },
    { lastName: "Gonzalez", firstName: "Victoria", coursesTaken: "14", mostRecentCourse: "Sustainability Fundamentals", status: "In Progress" }
];

const popularCollections = [
    {id: 0, name: "Operating Environment and System Design", subs: 45},
    {id: 1, name: "Test Planning, Execution and Evaluation", subs: 38},
    {id: 2, name: "Leadership", subs: 25}
]

const popularCourses = [
    {id: 0, name: "Advanced Combat Systems Analysis", saves: 156},
    {id: 1, name: "Cyber Warfare Defense Strategies", saves: 38},
    {id: 2, name: "Aircraft Testing and Evaluation", saves: 25},
    {id: 3, name: "Naval Weapons Systems", saves: 18 }
]

const topSharedCourses = [
    {id: 0, name: "Combat Systems Fundamentals", shares: 156},
    {id: 1, name: "Cybersecurity Essentials", shares: 135},
    {id: 2, name: "Aviation Testing Track", shares: 115},
]

export default function LeaderReport() {

  return (
    <DefaultLayout>
      <div className='p-6'>
        <div className='bg-white rounded-lg shadow p-4 mb-4'>
            <h1 className='text-gray-900 text-2xl font-bold leading-normal pb-6'>Leader&apos;s Report</h1>
            {/* Overview Table */}
            
            {/* <LearnerTable /> */}

            <div className='bg-white rounded-lg shadow p-4 mb-4 shadow'>
                <h1 className='text-gray-900 text-xl font-bold leading-normal pb-2'>Learner Overview</h1>
                <CollectionTable data={learnerData} edit={false} columns={columns} rowsPerPage={5} />
            </div>
            {/* Learner Engagement section*/}
            <div className='bg-white rounded-lg shadow p-4 mb-4 shadow'>
                <h1 className='text-gray-900 text-xl font-bold leading-normal pb-2'>Learner Engagement</h1>
                <div className='grid grid-cols-3 gap-2'>
                    {/* Total Learners */}
                    <div className='bg-gray-100 p-4 pt-6 rounded-md'>
                        <UserIcon class="h-9 w-9 text-gray-900" />
                        <p className='text-3xl font-bold pt-1'>{totalLearners}</p>
                        <p> Total Learners </p>
                        { totalLearnChange >= 0 ?
                            <div className='text-green-500 flex flex-row items-center'> 
                                <ArrowLongUpIcon class="h-4 w-4"/>
                                <p>{totalLearnChange}% from last month</p>
                            </div> :
                            <div className='text-red-500 flex flex-row items-center'> 
                                <ArrowLongDownIcon class="h-4 w-4"/>
                                <p>{Math.abs(totalLearnChange)}% from last month</p>
                            </div>
                        } 
                    </div>
                    {/* Courses in Session */}
                    <div className='bg-gray-100 p-4 pt-6 rounded-md'>
                        <BookOpenIcon class="h-9 w-9 text-gray-900" />
                        <p className='text-3xl font-bold'>{coursesInSession}</p>
                        <p> Total Learners </p>
                        {coursesChange >= 0 ?
                            <div className='text-green-500 flex flex-row items-center'> 
                                <ArrowLongUpIcon class="h-4 w-4"/>
                                <p>{coursesChange}% from last month</p>
                            </div> :
                            <div className='text-red-500 flex flex-row items-center'> 
                                <ArrowLongDownIcon class="h-4 w-4"/>
                                <p>{Math.abs(coursesChange)}% from last month</p>
                            </div>
                        } 
                    </div> 
                    {/* Collections created */}
                    <div className='bg-gray-100 p-4 pt-6 rounded-md'>
                        <BookmarkIcon class="h-9 w-9 text-gray-900" />
                        <p className='text-3xl font-bold'>{collectionsCreated}</p>
                        <p> Collections Created </p>
                        { collectionsChange >= 0 ?
                            <div className='text-green-500 flex flex-row items-center'> 
                                <ArrowLongUpIcon class="h-4 w-4"/>
                                <p>{collectionsChange}% from last month</p>
                            </div> :
                            <div className='text-red-500 flex flex-row items-center'> 
                                <ArrowLongDownIcon class="h-4 w-4"/>
                                <p>{Math.abs(collectionsChange)}% from last month</p>
                            </div>
                        } 
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className='grid grid-cols-2 gap-2'>
                {/* Most Viewed */}
                <div className='bg-white rounded-lg shadow p-4 shadow'>
                    <p className='text-lg text-gray-900 font-bold'>Top 3 Most-Viewed Courses</p>
                </div>

                {/* Popular Collections */}
                <div className='bg-white rounded-lg shadow p-4 shadow'>
                    <div className='flex flex-row items-center'>
                        <BookmarkIcon class='h-6 w-6'/>
                        <p className='text-lg text-gray-900 font-bold pl-2'>Popular Collections</p>
                    </div>
                    {popularCollections.map((collection) => (
                        <div key={collection.id} className='bg-gray-100 rounded-md py-2 px-4 mt-4'>
                            <p>{collection.name}</p>
                            <p className='text-[#4883B4]'>{collection.subs} Subscribers</p>     
                        </div>
                    ))}
                </div>

                {/* Popular Saved Courses */}
                <div className='bg-white rounded-lg shadow p-4 shadow'>
                    <div className='flex flex-row items-center'>
                        <BookmarkSquareIcon class='h-6 w-6'/>
                        <p className='text-lg text-gray-900 font-bold pl-2'>Popular Saved Courses</p>
                    </div>
                    {popularCourses.map((course) => (
                        <div key={course.id} className='bg-gray-100 rounded-md py-2 px-4 mt-4'>
                            <p>{course.name}</p>
                            <p className='text-[#4883B4]'>{course.saves} Saves</p>     
                        </div>
                    ))}
                </div>

                {/* Top Shared */}
                <div className='bg-white rounded-lg shadow p-4 shadow'>
                    <div className='flex flex-row items-center'>
                        <ArrowUpOnSquareStackIcon class='h-6 w-6'/>
                        <p className='text-lg text-gray-900 font-bold pl-2'>Top Shared Courses</p>
                    </div>
                    {topSharedCourses.map((course) => (
                        <div key={course.id} className='bg-gray-100 rounded-md py-2 px-4 mt-4'>
                            <p>{course.name}</p>
                            <p className='text-[#4883B4]'>Shared {course.shares} times</p>     
                        </div>
                    ))}
                </div>
            </div>
        </div>
     </div>
    </DefaultLayout>
  )
}
