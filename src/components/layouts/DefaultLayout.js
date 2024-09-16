// import { useConfig } from '../../hooks/useConfig';
import SideNav from '../SideNav';
import StaticSideNav from '../StaticSideNav';

export default function DefaultLayout({ children, footerLocation }) {
  // useConfig();
  return (
    <div className={'flex relative custom-scroll min-h-screen'}>
      {/* <SideNav /> */}
      <StaticSideNav />
      <div className='w-5/6 max-w-7xl mx-auto pr-8 sm:pr-6 lg:pr-10'>{children}</div>
      {/* <Footer location={footerLocation} /> */}
    </div>
  );
}
