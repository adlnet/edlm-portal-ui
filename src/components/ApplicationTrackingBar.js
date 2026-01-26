'use strict'

import FileExportOutlineWhite from '@/public/icons/fileExportOutlineWhite.svg';
import Image from 'next/image';
import MessageDotsOutlineGray from '@/public/icons/messageDotsOutlineGray.svg';
import MessageDotsOutlineWhite from '@/public/icons/messageDotsOutlineWhite.svg';
import UserGroupOutlineGray from '@/public/icons/usersGroupOutlineGray.svg';
import UserGroupOutlineWhite from '@/public/icons/usersGroupOutlineWhite.svg';

export default function ApplicationTrackingBar({ stage }) {
    return (
      <div className="flex flex-col items-center mt-4">
        <div className="flex flex-row w-[70%] items-center">
          {stage === 'Initiated' && (
            <>
              <div className="bg-navy-700 p-3 rounded-full">
                <Image src={FileExportOutlineWhite} alt="File Export" className="w-5 h-5" />
              </div>
              <hr className="border-t border-navy-700 border-4 flex-grow"></hr>
              <div className="bg-gray-100 p-3 rounded-full">
                <Image src={MessageDotsOutlineGray} alt="Message Dots" className="w-5 h-5" />
              </div>
              <hr className="border-t border-gray-100 border-4 flex-grow"></hr>
              <div className="bg-gray-100 p-3 rounded-full">
                <Image src={UserGroupOutlineGray} alt="User Group" className="w-5 h-5" />
              </div>
            </>
          )}
          {stage === 'Evaluation' && (
            <>
              <div className="bg-navy-700 p-3 rounded-full">
                <Image src={FileExportOutlineWhite} alt="File Export" className="w-5 h-5" />
              </div>
              <hr className="border-t border-navy-700 border-4 flex-grow"></hr>
              <div className="bg-navy-700 p-3 rounded-full">
                <Image src={MessageDotsOutlineWhite} alt="Message Dots" className="w-5 h-5" />
              </div>
              <hr className="border-t border-navy-700 border-4 flex-grow"></hr>
              <div className="bg-gray-100 p-3 rounded-full">
                <Image src={UserGroupOutlineGray} alt="User Group" className="w-5 h-5" />
              </div>
            </>
          )}
          {stage === 'Review' && (
            <>
              <div className="bg-navy-700 p-3 rounded-full">
                <Image src={FileExportOutlineWhite} alt="File Export" className="w-5 h-5" />
              </div>
              <hr className="border-t border-navy-700 border-4 flex-grow"></hr>
              <div className="bg-navy-700 p-3 rounded-full">
                <Image src={MessageDotsOutlineWhite} alt="Message Dots" className="w-5 h-5" />
              </div>
              <hr className="border-t border-navy-700 border-4 flex-grow"></hr>
              <div className="bg-navy-700 p-3 rounded-full">
                <Image src={UserGroupOutlineWhite} alt="User Group" className="w-5 h-5" />
              </div>
            </>
          )}
        </div>
      </div>
    )
}