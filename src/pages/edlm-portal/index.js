'use strict';
import Home from '@/pages/edlm-portal/learner/index';
export default function IntialPage() {
  return (
    <>
     {/* Dont redirect to login page on P1 */}
     <Home />
    </>
  );
}