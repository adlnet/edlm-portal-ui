'use strict';
import { 
    ArrowLongDownIcon, 
    ArrowLongUpIcon, 
    ArrowUpOnSquareStackIcon, 
    BookOpenIcon, 
    BookmarkIcon, 
    BookmarkSquareIcon,
    EyeIcon,
    UserIcon 
} from '@heroicons/react/24/outline';
import { removeHTML } from '@/utils/cleaning';
import { useTopSavedCourses } from '@/hooks/useTopSavedCourses';
import { useTopSubscribedCollections } from '@/hooks/useTopSubscribedCollections';
import DefaultLayout from "@/components/layouts/DefaultLayout";
import LearnerTable from '@/components/tables/LearnerTable';

// Mock data for development
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
  { lastName: "Gonzalez", firstName: "Victoria", coursesTaken: "14", mostRecentCourse: "Sustainability Fundamentals", status: "In Progress" },

  { lastName: "Donlon2", firstName: "Matthew", coursesTaken: "21", mostRecentCourse: "Program Test & Evaluation Strategy", status: "In Progress" },
  { lastName: "Johnson2", firstName: "Emily", coursesTaken: "15", mostRecentCourse: "Advanced Project Management", status: "Completed" },
  { lastName: "Patel2", firstName: "Ravi", coursesTaken: "10", mostRecentCourse: "Risk Analysis Fundamentals", status: "In Progress" },
  { lastName: "Chen2", firstName: "Sophia", coursesTaken: "18", mostRecentCourse: "Leadership Development", status: "Completed" },
  { lastName: "Martinez2", firstName: "Carlos", coursesTaken: "12", mostRecentCourse: "Agile Methodologies", status: "Not Started" },
  { lastName: "Nguyen2", firstName: "Linh", coursesTaken: "20", mostRecentCourse: "Data Security Essentials", status: "In Progress" },
  { lastName: "Smith2", firstName: "Jessica", coursesTaken: "13", mostRecentCourse: "Strategic Communications", status: "Completed" },
  { lastName: "Williams2", firstName: "James", coursesTaken: "17", mostRecentCourse: "Cybersecurity Essentials", status: "Not Started" },
  { lastName: "Kim2", firstName: "Daniel", coursesTaken: "11", mostRecentCourse: "AI Integration Fundamentals", status: "In Progress" },
  { lastName: "Lee2", firstName: "Ava", coursesTaken: "16", mostRecentCourse: "Innovation Workshop", status: "Completed" },
  { lastName: "Brown2", firstName: "Olivia", coursesTaken: "19", mostRecentCourse: "Contract Negotiation", status: "In Progress" },
  { lastName: "Garcia2", firstName: "Miguel", coursesTaken: "14", mostRecentCourse: "Change Management", status: "Not Started" },
  { lastName: "Rodriguez2", firstName: "Elena", coursesTaken: "7", mostRecentCourse: "Cultural Awareness Training", status: "Completed" },
  { lastName: "Wilson2", firstName: "Benjamin", coursesTaken: "9", mostRecentCourse: "Effective Time Management", status: "In Progress" },
  { lastName: "Thomas2", firstName: "Grace", coursesTaken: "23", mostRecentCourse: "Business Ethics", status: "Completed" },
  { lastName: "Harris2", firstName: "David", coursesTaken: "18", mostRecentCourse: "Advanced Data Analytics", status: "In Progress" },
  { lastName: "Clark2", firstName: "Natalie", coursesTaken: "10", mostRecentCourse: "Digital Marketing", status: "Completed" },
  { lastName: "Lewis2", firstName: "Samuel", coursesTaken: "24", mostRecentCourse: "Cloud Computing Basics", status: "In Progress" },
  { lastName: "Robinson2", firstName: "Hannah", coursesTaken: "13", mostRecentCourse: "Presentation Skills", status: "Not Started" },
  { lastName: "Walker2", firstName: "Isaac", coursesTaken: "16", mostRecentCourse: "Organizational Behavior", status: "Completed" },
  { lastName: "Young2", firstName: "Sophie", coursesTaken: "12", mostRecentCourse: "Quality Management", status: "In Progress" },
  { lastName: "King2", firstName: "Liam", coursesTaken: "8", mostRecentCourse: "Negotiation Tactics", status: "Completed" },
  { lastName: "Wright2", firstName: "Amelia", coursesTaken: "15", mostRecentCourse: "Performance Coaching", status: "In Progress" },
  { lastName: "Lopez2", firstName: "Gabriel", coursesTaken: "11", mostRecentCourse: "Conflict Resolution", status: "Not Started" },
  { lastName: "Hill2", firstName: "Mia", coursesTaken: "17", mostRecentCourse: "IT Infrastructure", status: "In Progress" },
  { lastName: "Scott2", firstName: "Andrew", coursesTaken: "20", mostRecentCourse: "Process Improvement", status: "Completed" },
  { lastName: "Green2", firstName: "Ella", coursesTaken: "10", mostRecentCourse: "Finance Principles", status: "In Progress" },
  { lastName: "Adams2", firstName: "Jack", coursesTaken: "13", mostRecentCourse: "Customer Experience Strategy", status: "Completed" },
  { lastName: "Baker2", firstName: "Lucy", coursesTaken: "19", mostRecentCourse: "Regulatory Compliance", status: "Not Started" },
  { lastName: "Gonzalez2", firstName: "Victoria", coursesTaken: "14", mostRecentCourse: "Sustainability Fundamentals", status: "In Progress" },

  { lastName: "Donlon3", firstName: "Matthew", coursesTaken: "21", mostRecentCourse: "Program Test & Evaluation Strategy", status: "In Progress" },
  { lastName: "Johnson3", firstName: "Emily", coursesTaken: "15", mostRecentCourse: "Advanced Project Management", status: "Completed" },
  { lastName: "Patel3", firstName: "Ravi", coursesTaken: "10", mostRecentCourse: "Risk Analysis Fundamentals", status: "In Progress" },
  { lastName: "Chen3", firstName: "Sophia", coursesTaken: "18", mostRecentCourse: "Leadership Development", status: "Completed" },
  { lastName: "Martinez3", firstName: "Carlos", coursesTaken: "12", mostRecentCourse: "Agile Methodologies", status: "Not Started" },
  { lastName: "Nguyen3", firstName: "Linh", coursesTaken: "20", mostRecentCourse: "Data Security Essentials", status: "In Progress" },
  { lastName: "Smith3", firstName: "Jessica", coursesTaken: "13", mostRecentCourse: "Strategic Communications", status: "Completed" },
  { lastName: "Williams3", firstName: "James", coursesTaken: "17", mostRecentCourse: "Cybersecurity Essentials", status: "Not Started" },
  { lastName: "Kim3", firstName: "Daniel", coursesTaken: "11", mostRecentCourse: "AI Integration Fundamentals", status: "In Progress" },
  { lastName: "Lee3", firstName: "Ava", coursesTaken: "16", mostRecentCourse: "Innovation Workshop", status: "Completed" },
  { lastName: "Brown3", firstName: "Olivia", coursesTaken: "19", mostRecentCourse: "Contract Negotiation", status: "In Progress" },
  { lastName: "Garcia3", firstName: "Miguel", coursesTaken: "14", mostRecentCourse: "Change Management", status: "Not Started" },
  { lastName: "Rodriguez3", firstName: "Elena", coursesTaken: "7", mostRecentCourse: "Cultural Awareness Training", status: "Completed" },
  { lastName: "Wilson3", firstName: "Benjamin", coursesTaken: "9", mostRecentCourse: "Effective Time Management", status: "In Progress" },
  { lastName: "Thomas3", firstName: "Grace", coursesTaken: "23", mostRecentCourse: "Business Ethics", status: "Completed" },
  { lastName: "Harris3", firstName: "David", coursesTaken: "18", mostRecentCourse: "Advanced Data Analytics", status: "In Progress" },
  { lastName: "Clark3", firstName: "Natalie", coursesTaken: "10", mostRecentCourse: "Digital Marketing", status: "Completed" },
  { lastName: "Lewis3", firstName: "Samuel", coursesTaken: "24", mostRecentCourse: "Cloud Computing Basics", status: "In Progress" },
  { lastName: "Robinson3", firstName: "Hannah", coursesTaken: "13", mostRecentCourse: "Presentation Skills", status: "Not Started" },
  { lastName: "Walker3", firstName: "Isaac", coursesTaken: "16", mostRecentCourse: "Organizational Behavior", status: "Completed" },
  { lastName: "Young3", firstName: "Sophie", coursesTaken: "12", mostRecentCourse: "Quality Management", status: "In Progress" },
  { lastName: "King3", firstName: "Liam", coursesTaken: "8", mostRecentCourse: "Negotiation Tactics", status: "Completed" },
  { lastName: "Wright3", firstName: "Amelia", coursesTaken: "15", mostRecentCourse: "Performance Coaching", status: "In Progress" },
  { lastName: "Lopez3", firstName: "Gabriel", coursesTaken: "11", mostRecentCourse: "Conflict Resolution", status: "Not Started" },
  { lastName: "Hill3", firstName: "Mia", coursesTaken: "17", mostRecentCourse: "IT Infrastructure", status: "In Progress" },
  { lastName: "Scott3", firstName: "Andrew", coursesTaken: "20", mostRecentCourse: "Process Improvement", status: "Completed" },
  { lastName: "Green3", firstName: "Ella", coursesTaken: "10", mostRecentCourse: "Finance Principles", status: "In Progress" },
  { lastName: "Adams3", firstName: "Jack", coursesTaken: "13", mostRecentCourse: "Customer Experience Strategy", status: "Completed" },
  { lastName: "Baker3", firstName: "Lucy", coursesTaken: "19", mostRecentCourse: "Regulatory Compliance", status: "Not Started" },
  { lastName: "Gonzalez3", firstName: "Victoria", coursesTaken: "14", mostRecentCourse: "Sustainability Fundamentals", status: "In Progress" },

  { lastName: "Donlon4", firstName: "Matthew", coursesTaken: "21", mostRecentCourse: "Program Test & Evaluation Strategy", status: "In Progress" },
  { lastName: "Johnson4", firstName: "Emily", coursesTaken: "15", mostRecentCourse: "Advanced Project Management", status: "Completed" },
  { lastName: "Patel4", firstName: "Ravi", coursesTaken: "10", mostRecentCourse: "Risk Analysis Fundamentals", status: "In Progress" },
  { lastName: "Chen4", firstName: "Sophia", coursesTaken: "18", mostRecentCourse: "Leadership Development", status: "Completed" },
  { lastName: "Martinez4", firstName: "Carlos", coursesTaken: "12", mostRecentCourse: "Agile Methodologies", status: "Not Started" },
  { lastName: "Nguyen4", firstName: "Linh", coursesTaken: "20", mostRecentCourse: "Data Security Essentials", status: "In Progress" },
  { lastName: "Smith4", firstName: "Jessica", coursesTaken: "13", mostRecentCourse: "Strategic Communications", status: "Completed" },
  { lastName: "Williams4", firstName: "James", coursesTaken: "17", mostRecentCourse: "Cybersecurity Essentials", status: "Not Started" },
  { lastName: "Kim4", firstName: "Daniel", coursesTaken: "11", mostRecentCourse: "AI Integration Fundamentals", status: "In Progress" },
  { lastName: "Lee4", firstName: "Ava", coursesTaken: "16", mostRecentCourse: "Innovation Workshop", status: "Completed" },
  { lastName: "Brown4", firstName: "Olivia", coursesTaken: "19", mostRecentCourse: "Contract Negotiation", status: "In Progress" },

  // up to 91 entries, continue with the same pattern as above
  { lastName: "Garcia4", firstName: "Miguel", coursesTaken: "14", mostRecentCourse: "Change Management", status: "Not Started" },
  { lastName: "Rodriguez4", firstName: "Elena", coursesTaken: "7", mostRecentCourse: "Cultural Awareness Training", status: "Completed" },
  { lastName: "Wilson4", firstName: "Benjamin", coursesTaken: "9", mostRecentCourse: "Effective Time Management", status: "In Progress" },
  { lastName: "Thomas4", firstName: "Grace", coursesTaken: "23", mostRecentCourse: "Business Ethics", status: "Completed" },
  { lastName: "Harris4", firstName: "David", coursesTaken: "18", mostRecentCourse: "Advanced Data Analytics", status: "In Progress" },
  { lastName: "Clark4", firstName: "Natalie", coursesTaken: "10", mostRecentCourse: "Digital Marketing", status: "Completed" },
  { lastName: "Lewis4", firstName: "Samuel", coursesTaken: "24", mostRecentCourse: "Cloud Computing Basics", status: "In Progress" },
  { lastName: "Robinson4", firstName: "Hannah", coursesTaken: "13", mostRecentCourse: "Presentation Skills", status: "Not Started" },
  { lastName: "Walker4", firstName: "Isaac", coursesTaken: "16", mostRecentCourse: "Organizational Behavior", status: "Completed" },
  { lastName: "Young4", firstName: "Sophie", coursesTaken: "12", mostRecentCourse: "Quality Management", status: "In Progress" },
  { lastName: "King4", firstName: "Liam", coursesTaken: "8", mostRecentCourse: "Negotiation Tactics", status: "Completed" },
  { lastName: "Wright4", firstName: "Amelia", coursesTaken: "15", mostRecentCourse: "Performance Coaching", status: "In Progress" },
  { lastName: "Lopez4", firstName: "Gabriel", coursesTaken: "11", mostRecentCourse: "Conflict Resolution", status: "Not Started" },
  { lastName: "Hill4", firstName: "Mia", coursesTaken: "17", mostRecentCourse: "IT Infrastructure", status: "In Progress" },
  { lastName: "Scott4", firstName: "Andrew", coursesTaken: "20", mostRecentCourse: "Process Improvement", status: "Completed" },
  { lastName: "Green4", firstName: "Ella", coursesTaken: "10", mostRecentCourse: "Finance Principles", status: "In Progress" },
  { lastName: "Adams4", firstName: "Jack", coursesTaken: "13", mostRecentCourse: "Customer Experience Strategy", status: "Completed" },
  { lastName: "Baker4", firstName: "Lucy", coursesTaken: "19", mostRecentCourse: "Regulatory Compliance", status: "Not Started" },
  { lastName: "Gonzalez4", firstName: "Victoria", coursesTaken: "14", mostRecentCourse: "Sustainability Fundamentals", status: "In Progress" },

  // Continue like this, incrementing the lastName suffix up to "Gonzalez7"
  // Because 91/30 = 3 full cycles + 1 extra
  { lastName: "Donlon5", firstName: "Matthew", coursesTaken: "21", mostRecentCourse: "Program Test & Evaluation Strategy", status: "In Progress" },
  { lastName: "Johnson5", firstName: "Emily", coursesTaken: "15", mostRecentCourse: "Advanced Project Management", status: "Completed" },
  { lastName: "Patel5", firstName: "Ravi", coursesTaken: "10", mostRecentCourse: "Risk Analysis Fundamentals", status: "In Progress" },
  { lastName: "Chen5", firstName: "Sophia", coursesTaken: "18", mostRecentCourse: "Leadership Development", status: "Completed" },
  { lastName: "Martinez5", firstName: "Carlos", coursesTaken: "12", mostRecentCourse: "Agile Methodologies", status: "Not Started" },
  { lastName: "Nguyen5", firstName: "Linh", coursesTaken: "20", mostRecentCourse: "Data Security Essentials", status: "In Progress" },
  { lastName: "Smith5", firstName: "Jessica", coursesTaken: "13", mostRecentCourse: "Strategic Communications", status: "Completed" },
  { lastName: "Williams5", firstName: "James", coursesTaken: "17", mostRecentCourse: "Cybersecurity Essentials", status: "Not Started" },
  { lastName: "Kim5", firstName: "Daniel", coursesTaken: "11", mostRecentCourse: "AI Integration Fundamentals", status: "In Progress" },
  { lastName: "Lee5", firstName: "Ava", coursesTaken: "16", mostRecentCourse: "Innovation Workshop", status: "Completed" },
  { lastName: "Brown5", firstName: "Olivia", coursesTaken: "19", mostRecentCourse: "Contract Negotiation", status: "In Progress" },

  // Final set to reach 91
  { lastName: "Garcia5", firstName: "Miguel", coursesTaken: "14", mostRecentCourse: "Change Management", status: "Not Started" },
  { lastName: "Rodriguez5", firstName: "Elena", coursesTaken: "7", mostRecentCourse: "Cultural Awareness Training", status: "Completed" },
  { lastName: "Wilson5", firstName: "Benjamin", coursesTaken: "9", mostRecentCourse: "Effective Time Management", status: "In Progress" },
  { lastName: "Thomas5", firstName: "Grace", coursesTaken: "23", mostRecentCourse: "Business Ethics", status: "Completed" },
  { lastName: "Harris5", firstName: "David", coursesTaken: "18", mostRecentCourse: "Advanced Data Analytics", status: "In Progress" },
  { lastName: "Clark5", firstName: "Natalie", coursesTaken: "10", mostRecentCourse: "Digital Marketing", status: "Completed" },
  { lastName: "Lewis5", firstName: "Samuel", coursesTaken: "24", mostRecentCourse: "Cloud Computing Basics", status: "In Progress" },
  { lastName: "Robinson5", firstName: "Hannah", coursesTaken: "13", mostRecentCourse: "Presentation Skills", status: "Not Started" },
  { lastName: "Walker5", firstName: "Isaac", coursesTaken: "16", mostRecentCourse: "Organizational Behavior", status: "Completed" },
  { lastName: "Young5", firstName: "Sophie", coursesTaken: "12", mostRecentCourse: "Quality Management", status: "In Progress" },
  { lastName: "King5", firstName: "Liam", coursesTaken: "8", mostRecentCourse: "Negotiation Tactics", status: "Completed" },
  { lastName: "Wright5", firstName: "Amelia", coursesTaken: "15", mostRecentCourse: "Performance Coaching", status: "In Progress" },
  { lastName: "Lopez5", firstName: "Gabriel", coursesTaken: "11", mostRecentCourse: "Conflict Resolution", status: "Not Started" },
  { lastName: "Hill5", firstName: "Mia", coursesTaken: "17", mostRecentCourse: "IT Infrastructure", status: "In Progress" },
  { lastName: "Scott5", firstName: "Andrew", coursesTaken: "20", mostRecentCourse: "Process Improvement", status: "Completed" },
  { lastName: "Green5", firstName: "Ella", coursesTaken: "10", mostRecentCourse: "Finance Principles", status: "In Progress" },
  { lastName: "Adams5", firstName: "Jack", coursesTaken: "13", mostRecentCourse: "Customer Experience Strategy", status: "Completed" },
  { lastName: "Baker5", firstName: "Lucy", coursesTaken: "19", mostRecentCourse: "Regulatory Compliance", status: "Not Started" },
  { lastName: "Gonzalez5", firstName: "Victoria", coursesTaken: "14", mostRecentCourse: "Sustainability Fundamentals", status: "In Progress" }
];

const mostViewedCourses = [
    {id: 0, name: "Advanced Combat Systems Analysis", views: 487},
    {id: 0, name: "Cyber Warfare Defense Strategies", views: 325},
    {id: 0, name: "Leadership in Testing Operations", views: 226},
    {id: 0, name: "Integrated Testing", views: 180},
    {id: 0, name: "Acquisition Law", views: 150},
]

const topSharedCourses = [
    {id: 0, name: "Combat Systems Fundamentals", shares: 156},
    {id: 1, name: "Cybersecurity Essentials", shares: 135},
    {id: 2, name: "Aviation Testing Track", shares: 115},
]

export default function LeaderReport() {

  const { data: popularCoursesData } = useTopSavedCourses();
  const { data: popularCollectionsData } = useTopSubscribedCollections();

  return (
    <DefaultLayout>
      <div className='p-6'>
        <div className='bg-white rounded-lg shadow p-4 mb-4'>
            <h1 className='text-gray-900 text-2xl font-bold leading-normal pb-6'>Leader&apos;s Report</h1>
            {/* Overview Table */}
            <LearnerTable learnerData={learnerData}/>

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
            <div className='grid grid-cols-2 gap-4'>
                {/* Most Viewed */}
                <div className='bg-white rounded-lg shadow p-4 shadow'>
                    <div className='flex flex-row items-center'>
                        <EyeIcon class='h-6 w-6'/>
                        <p className='text-lg text-gray-900 font-bold pl-2'>Top 5 Most-Viewed Courses</p>
                    </div>
                    {mostViewedCourses.map((course) => (
                        <div key={course.id} className='bg-gray-100 rounded-md py-2 px-4 mt-4'>
                            <p>{course.name}</p>
                            <p className='text-[#4883B4]'>{course.views} Views</p>     
                        </div>
                    ))}
                </div>

                {/* Popular Collections */}
                <div className='bg-white rounded-lg shadow p-4 shadow'>
                    <div className='flex flex-row items-center'>
                        <BookmarkIcon class='h-6 w-6'/>
                        <p className='text-lg text-gray-900 font-bold pl-2'>Popular Collections</p>
                    </div>
                    {popularCollectionsData?.map((collection) => (
                        <div key={collection.id} className='bg-gray-100 rounded-md py-2 px-4 mt-4'>
                            <p>{collection.name}</p>
                            <p className='text-[#4883B4]'>{collection.num_subscribers} Subscribers</p>     
                        </div>
                    ))}
                </div>

                {/* Popular Saved Courses */}
                <div className='bg-white rounded-lg shadow p-4 shadow'>
                    <div className='flex flex-row items-center'>
                        <BookmarkSquareIcon class='h-6 w-6'/>
                        <p className='text-lg text-gray-900 font-bold pl-2'>Popular Saved Courses</p>
                    </div>
                    {popularCoursesData?.map((course) => (
                        <div key={course.metadata_key_hash} className='bg-gray-100 rounded-md py-2 px-4 mt-4'>
                            <p>{removeHTML(course.title)}</p>
                            <p className='text-[#4883B4]'>{course.num_saved} Saves</p>     
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
