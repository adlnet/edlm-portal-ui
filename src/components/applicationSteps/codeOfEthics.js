'use strict'

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';

export function CodeOfEthics({setCurrentStep, applicationType, codeOfEthicsAgreed, setCodeOfEthicsAgreed, codeOfEthicsDate, setCodeOfEthicsDate}) {

  const router = useRouter();

  const handleContinue = () => {
    setCurrentStep(4);
  }

  const handleCheck = () => {
    if (!codeOfEthicsAgreed) {
      const now = new Date();
      setCodeOfEthicsAgreed(true);
      setCodeOfEthicsDate(now);
    }
  };

  function formatDateTime(date) {
    const yy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${yy}.${mm}.${dd} ${hh}:${min}`;
}

  return (
    <>
      {/* Stepper */}
      <div className="flex flex-row items-center gap-2">
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(2)}}
        >
          Privacy Act
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <button 
          className="text-md text-navy-200"
          onClick={() => {setCurrentStep(3)}}
        >
          Code of Ethics
        </button>
        <ChevronRightIcon className='text-navy-200 w-4 h-4'/>
        <p className="text-md text-gray-400">Applicant Info</p>
        <ChevronRightIcon className='text-gray-400 w-4 h-4'/>
        <p className="text-md text-gray-400">CEU Documentation</p>
        <ChevronRightIcon className='text-gray-400 w-4 h-4'/>
        <p className="text-md text-gray-400">Review & Send</p>
      </div>

      <div className="bg-navy-025 text-navy-700 rounded-md py-1 px-3 mt-4 text-sm w-fit">
        {applicationType}
      </div>

      {/* Page Title and Content  */}
      <div className="mt-8">
        <h1 className="text-navy-700 text-2xl font-bold"> Code of Ethics</h1>
        <p className="text-gray-cool-700 text-sm mt-4">
          Please review the following Code of Ethics for Sexual Assault Response Workforce (SARW) Professionals.
        </p>
        
        {/* Code of Ethics Statement */}
        <div className="flex flex-col border border-gray-cool-700 rounded-lg pt-4 px-6 mt-6 text-gray-cool-700 text-sm">
          <p>
            Every DoD Sexual Assault Response Workforce (SARW) Professional must act with integrity, treat all victims of sexual assault 
            crimes with dignity and compassion, and uphold principles of justice for accused and accuser alike.
          </p>
          <p className="mt-4">
            To these ends, this Code will govern the conduct of DoD SARW Professionals:
          </p>
          <p className="mt-4">
            I. In relationships with every victim, the DoD SARW professionals shall:
            <div className="ml-3">
            <p className="pt-1"> 1. Recognize the interests of the victim as a primary responsibility. </p>
            <p className="pt-1"> 2. Respect the victim&apos;s civil and legal rights, subject only to laws requiring disclosure of information to appropriate other sources.</p>
            <p className="pt-1"> 3. Respect the victim&apos;s rights to privacy and confidentiality, subject only to laws requiring disclosure.</p>
            <p className="pt-1"> 4. Respond compassionately to each victim with personalized services.</p>
            <p className="pt-1"> 5. Accept the victim&apos;s statement of events as it is told, withholding opinion or judgment, whether or not a suspected offender has been identified, arrested, convicted, or acquitted.</p>
            <p className="pt-1"> 6. Provide services to every victim, within policy guidelines set by the DoD and the Services, without attributing blame, no matter what the victim&apos;s conduct was at the time of the victimization or at another stage of the victim&apos;s life.</p>
            <p className="pt-1"> 7. Foster maximum self-determination on the part of the victim.</p>
            <p className="pt-1"> 8. Serve as a victim advocate when assigned, and in that capacity, act on behalf of the victim&apos;s stated needs and within policy guidelines set by DoD and the Services.</p>
            <p className="pt-1"> 9. Should one victim&apos;s needs conflict with another&apos;s, act with regard to one victim only after promptly referring the other to another qualified  DoD SARW professional.</p>
            <p className="pt-1">10. Have no personal or sexual relations with victims currently supported by  DoD SARW professionals or with alleged offenders, in recognition that to do so risks exploitation of the knowledge and trust derived from the professional relationship.</p>
            <p className="pt-1">11. Make victim referrals to other resources or services only in the victim&apos;s best interest, avoiding any conflict of interest in the process, and do so in accordance with DoD regulations.</p>
            </div>
          </p>
          <p className="mt-4">
            II. In relationships with colleagues, other professionals, and the public, the  DoD SARW professionals shall:
            <div className="ml-3">
              <p className="pt-1">1. Conduct relationships with colleagues in such a way as to promote mutual respect and improvement of service.</p>
              <p className="pt-1">2. Conduct relationships with allied professionals such that they are given equal respect and dignity as professionals in the victim assistance field.</p>
              <p className="pt-1">3. Take steps to quell negative, insubstantial rumors about colleagues and allied professionals.</p>
              <p className="pt-1">4. Share knowledge and encourage proficiency and excellence in victim assistance among colleagues and allied professionals, paid and volunteer.</p>
              <p className="pt-1">5. Provide professional support, guidance, and assistance to new  DoD SARW professionals to the field in order to promote consistent quality and professionalism in victim assistance.</p>
              <p className="pt-1">6. Obey all applicable Federal, DoD, and Service laws and regulations.</p>
            </div>
          </p>
          <p className="mt-4">
            III. In her or his professional conduct, the SARC/SAPR VA shall:
            <div className="ml-3">
              <p className="pt-1">1. Maintain high personal and professional standards in the capacity of a service provider and advocate for victims.</p>
              <p className="pt-1">2. Seek and maintain a proficiency in the delivery of services to victims.</p>
              <p className="pt-1">3. Not discriminate against any victim, employee, colleague, allied professional, or member of the public on the basis of age, sex, disability, ethnicity, race, national origin, religious belief, or sexual orientation.</p>
              <p className="pt-1">4. In accordance with restricted reporting, applicable privileged communications, and all applicable Federal, DoD, and Service privacy laws and regulations, respect the privacy of information provided by the victims served before, during, and after the course of the professional relationship.</p>
              <p className="pt-1">5. Clearly distinguish in public statements representing one&apos;s personal views from positions adopted by organizations for which she or he works or is a member, in accordance with Service policy.</p>
              <p className="pt-1">6. Not use her or his official position to secure gifts, monetary rewards, or special privileges or advantages.</p>
              <p className="pt-1">7. Notify competent authorities of the conduct of any colleague or allied professional that constitutes mistreatment of a victim or that brings the profession into disrepute.</p>
              <p className="pt-1">8. Notify competent authorities of any conflict of interest that prevents oneself or a colleague from being able to provide competent services to a victim, or from working cooperatively with colleagues or allied professionals in a victim being impartial in the assistance of any victim.</p>
              <p className="pt-1">9. Notify competent authority immediately if charged, arrested, and/or convicted of any criminal activity.</p>
            </div>
          </p>
          <p className="mt-4 mb-6">
            IV. In her or his responsibility to any other profession, the  DoD SARW professional will be bound by the ethical 
            standards of the allied profession of which she or he is a member.
          </p>
          
        </div>

        {/* Code of Ethics Agreement */}
        <div className="flex flex-col border border-gray-cool-700 rounded-lg p-4 mt-6 text-gray-cool-700 text-sm">
          <h1 className="font-bold text-xl"> Certification: </h1>
          <p className="mt-4">
            I, the undersigned applicant, hereby certify that I have read and agree to follow the Code of Professional Ethics for DoD SARW professionals. 
            I understand that the D-SAACP Certification is subject to surrender on demand to my SARW Program Administrator for cause, and this action may be 
            listed in my permanent record.
          </p>
          <div className="flex flex-row items-center gap-2 mt-4">
            <input 
              className="rounded-sm"
              type="checkbox" 
              checked={codeOfEthicsAgreed}
              onChange={(e) => {handleCheck()}}
            />
            <p className="text-gray-900">I acknowledge that I have read and understand the Code of Ethics for DoD SARW Professionals.</p>
          </div>

          {codeOfEthicsAgreed && (<h1 className="text-lg mt-4 font-bold">Acknowledged on {formatDateTime(codeOfEthicsDate)}</h1>)}

        </div>

        {/* Continue Button */}
        <div className="flex w-full justify-end mt-10">
          <button 
            className="flex px-4 py-2 justify-center rounded-md text-white text-sm bg-teal-custom-500 hover:bg-teal-800 disabled:bg-teal-disabled" 
            onClick={handleContinue}
            disabled={!codeOfEthicsAgreed}
          >
            <div className="flex gap-2 items-center justify-end">
              Continue 
            </div>
          </button>
        </div>

        <div className="border-t w-full mt-10"></div>

        <div className="flex flex-row gap-3 text-gray-cool-700 text-sm mt-4">
          <div className="bg-gray-50 px-3 py-1 rounded-md">DD Form 2950-1</div>
          <div className="bg-gray-50 px-3 py-1 rounded-md">FEB 2025</div>
          <div className="bg-gray-50 px-3 py-1 rounded-md">Updated 02/05/2025</div>
          <div className="bg-gray-50 px-3 py-1 rounded-md">Prescribed by DoDD 6495.03, DoDI 6495.03, and DTM 14-001</div>
        </div>

      </div>
    </>
  )
};