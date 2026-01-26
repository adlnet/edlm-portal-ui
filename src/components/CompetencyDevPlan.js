'use strict';


export default function CompetencyDevPlan({ competency }) {

  const competencyName = competency.name || '';
  const competencyDesc = competency.desc || competency.description || '';

  const compName = competencyName.includes(':') ? competencyName.split(':')[1].trim() : competencyName;

  const match = competencyName.match(/#(\d+[A-Za-z]?)/);
  const compNumber = match ? match[1] : '';

  return (
    <div className="flex flex-row w-1/2 pb-2">
      <div className="">
        <div className="bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center text-blue-700 font-bold mt-1">
          {compNumber}
        </div>
      </div>
      <div className="flex flex-col pl-2">
        <div className="font-bold">{compName}</div>
        <p className="text-sm">{competencyDesc}</p>
      </div>
    </div>
  )
};
