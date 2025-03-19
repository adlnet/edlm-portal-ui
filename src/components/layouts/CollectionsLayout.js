'use strict'
import CollectionsTabBar from "@/components/buttons/CollectionsTabBar"
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function CollectionsLayout({ children, title }) {
  const tabs = [
    { name: 'My Collections', href: '/edlm-portal/learner/lists/owned' },
    { name: 'My Subscriptions', href: '/edlm-portal/learner/lists/subscribed' },
    { name: 'Saved Searches', href: '/edlm-portal/learner/lists/savedSearches' },
  ]

  return (
    <DefaultLayout>
      <div className='bg-white shadow-md p-5 py-0 w-full mb-5 rounded-xl m-4 -my-6 overflow-clip'>
        <div className='mt-10 pb-4 py-4'>
          <div className='text-2xl font-bold'>{title}</div> 
          <div className='py-3'>
            <div className="h-[35px] justify-start items-center gap-6 inline-flex">
              <CollectionsTabBar tabs={tabs} />
            </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
  );
}