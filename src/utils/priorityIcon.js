import { 
    Bars3Icon,
    ChevronDoubleDownIcon, 
    ChevronDoubleUpIcon, 
    ChevronDownIcon, 
    ChevronUpIcon
} from '@heroicons/react/24/outline';

export default function priorityIcon(priority) {
    if (priority === 'Lowest') {
        return <ChevronDoubleDownIcon className='h-6 w-6 text-green-500'/>
    } else if (priority === 'Low') {
        return <ChevronDownIcon className='h-6 w-6 text-green-500'/>
    } else if (priority === 'Medium') {
        return <Bars3Icon className='h-6 w-6 text-yellow-800'/>
    } else if (priority === 'High') {
        return <ChevronUpIcon className='h-6 w-6 text-green-500'/>
    } else if (priority === 'Highest') {
        return <ChevronDoubleUpIcon className='h-6 w-6 text-red-500'/>
    } else {
        return null;
    }
}
