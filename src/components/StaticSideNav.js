import { Tooltip } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useState } from "react";
import BookIcon from '@/public/icons/bookIcon.svg';
import ChevronDownIcon from '@/public/icons/chevronDownIcon.svg';
import ClipboardCheckIcon from '@/public/icons/clipboardCheckIcon.svg';
import FileBarIcon from '@/public/icons/fileBarIcon.svg';
import HomeIcon from '@/public/icons/homeIcon.svg';
import Image from 'next/image';
import LifeBuoyIcon from '@/public/icons/lifeBuoyIcon.svg';
import OutdentIcon from '@/public/icons/outdentIcon.svg';
import SearchIcon from '@/public/icons/searchIcon.svg';

//Mock role
const isLeader = true

export default function StaticSideNav() {

    const router = useRouter();

    // const [showLearningSummary, setShowLearningSummary] = useState(true);
    const [showCollections, setShowCollections] = useState(false);
    const [activeBtn, setActiveBtn] = useState(null);

    const moodleLeaderReportUrl = process.env.NEXT_PUBLIC_MOODLE_LEADER_REPORT_URL;

    // Check if it is active path
    const isActivePath = path => router.pathname === path;

    const handleSidebarClick = (btn, path) => {
        setActiveBtn(btn);
        if (path) {
            router.push(path);
        }
    };

    const renderNavBtn = (btn, path, icon, label, active = true) => {
        const navBtn = (
            <button 
                className={`w-[221px] h-10 py-1.5 rounded-lg justify-start items-center inline-flex cursor-pointer text-[#111928] disabled:text-gray-500 disabled:hover:bg-white hover:bg-gray-100 ${activeBtn === btn || isActivePath(path) ? 'bg-blue-50' : ''}`} 
                onClick={() => handleSidebarClick(btn, path)} onKeyDown={e => e.key === 'Enter' && handleSidebarClick(btn, path)} 
                tabIndex={0} 
                disabled={!active}
            >
                <div className="grow shrink basis-0 h-10 px-2 py-1.5 rounded-lg justify-start items-center flex">
                    <div className="grow shrink basis-0 h-6 justify-start items-center gap-3 flex">
                        <Image src={icon} alt={label}/>
                        <div className="text-base font-medium leading-normal">{label}</div>
                    </div>
                </div>
            </button>
        );
        return navBtn;
    }

    const renderDropdownBtn = (btn, path, label, disable = false) => (
        <div className={`w-[210px] h-10 flex-col justify-center rounded-lg items-center gap-2.5 inline-flex hover:bg-gray-100 ${activeBtn === btn || isActivePath(path) ? 'bg-[#f4f3f6]' : ''}`} onClick={() => !disable && handleSidebarClick(btn, path)} onKeyDown={e => e.key === 'Enter' && !disable && handleSidebarClick(btn, path)} role="button" tabIndex={0}>
            <div className="w-[133px] text-[#111928] text-base font-medium leading-normal">{label}</div>
        </div>
    );

    return (
        <div className="h-full sticky top-0 shadow">
            <div className="w-60 h-screen pt-px bg-white flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch flex-col justify-start items-start gap-2 inline-flex">
                    <div className='self-stretch px-4 pt-2 pb-2 border-b border-gray-200 flex-col justify-center items-center gap-2 flex'>
                        {renderNavBtn('home', '/edlm-portal', HomeIcon, 'Home')}
                    </div>
                    <div className="self-stretch px-4 pb-2 border-b border-gray-200 flex-col justify-center items-center gap-2 flex">
                        
                        {renderNavBtn('search', '/edlm-portal/learner/search', SearchIcon, 'Search')}
                        {renderNavBtn('learningPlan', '/edlm-portal/learner/learningPlan', ClipboardCheckIcon, 'Learning Plans')}                        
                        {isLeader && (
                            renderNavBtn('leadersReport', '/edlm-portal/learner/learningSummary/leaderReport', FileBarIcon ,"Leader's Report")
                        )}
                        {!isLeader && (
                            renderNavBtn('leadersReport', '/edlm-portal/learner/learningSummary', FileBarIcon ,"My Learning Summary")
                        )}
                        {/* <div className={`w-[221px] p-2 rounded-lg flex-col justify-start items-center cursor-pointer`}>
                            <div className="justify-start items-center flex" onClick={() => setShowLearningSummary(!showLearningSummary)} onKeyDown={e => e.key === 'Enter' && setShowLearningSummary(!showLearningSummary)} role="button" tabIndex={0}>
                                <div className="grow shrink basis-0 h-6 justify-start items-center gap-3 flex">
                                    <Image src={FileBarIcon} alt='Learning Summary' />
                                    <div className="text-[#111928] text-base font-medium leading-normal">Learning Summary</div>
                                </div>
                                <div className="mx-1.5">
                                    <Image src={ChevronDownIcon} alt='Chevron' />
                                </div>
                            </div>
                            {showLearningSummary && (
                                <>
                                    <div className='text-nowrap'>
                                        {renderDropdownBtn('myLearningSummary', '/edlm-portal/learner/learningSummary', 'My Learning Summary')}
                                    </div>
                                    <div className='text-nowrap'>
                                        {renderDropdownBtn('leadersReport', '/edlm-portal/learner/learningSummary/leaderReport', "Leader's Report")}
                                    </div>
                                </>
                            )}
                        </div> */}

                        <div className={`w-[221px] p-2 rounded-lg flex-col justify-start items-center cursor-pointer`}>
                            <div className="justify-start items-center flex" onClick={() => setShowCollections(!showCollections)} onKeyDown={e => e.key === 'Enter' && setShowCollections(!showCollections)} role="button" tabIndex={0}>
                                <div className="grow shrink basis-0 h-6 justify-start items-center gap-3 flex">
                                    <Image src={OutdentIcon} alt='Collections' />
                                    <div className="text-[#111928] text-base font-medium leading-normal">Collections</div>
                                </div>
                                <div className="mx-1.5">
                                    <Image src={ChevronDownIcon} alt='Chevron' />
                                </div>
                            </div>
                            {showCollections && (
                                <>
                                    {renderDropdownBtn('myCollections', '/edlm-portal/learner/lists/owned', 'My Collections')}
                                    {renderDropdownBtn('mySubscriptions', '/edlm-portal/learner/lists/subscribed', 'My Subscriptions')}
                                    {renderDropdownBtn('savedSearches', '/edlm-portal/learner/lists/savedSearches', 'Saved Searches')}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="self-stretch h-20 px-3 flex-col justify-start items-start gap-2 inline-flex cursor-pointer">
                    {renderNavBtn('additional', null, BookIcon, 'Additional Resources', false)}
                    {renderNavBtn('help', null, LifeBuoyIcon, 'Help', false)}
                </div>
            </div>
        </div>
    );
}