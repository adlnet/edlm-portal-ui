import { Spinner } from 'flowbite-react';

 // This component handles loading states across pages
export default function PageContentWrapper({ 
  isLoading, 
  children, 
  className = '',
  minHeight = 'min-h-[200px]'
}) {
  if (isLoading) {
    return (
      <div className={`flex justify-center items-center ${minHeight} ${className}`}>
        <Spinner color='purple' size='lg' />
      </div>
    );
  }

  return <>{children}</>;
}
