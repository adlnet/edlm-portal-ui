
import Footer from '../Footer';
import Header from '../Header';
import StaticSideNav from '../StaticSideNav';

export default function DefaultLayout({ children, footerLocation }) {

  return (
    <>
    < Header />
    <div className={'flex relative custom-scroll min-h-screen'}>
      <StaticSideNav />
      <div className='w-5/6  max-w-7xl mx-auto pr-8 sm:pr-6 lg:pr-10'>
        {children} 
      </div>
    </div>
    <Footer location={footerLocation} />
    </>
  );
}
