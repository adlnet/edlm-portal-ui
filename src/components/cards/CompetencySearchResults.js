'use strict';

export default function CompetencySearchResult({ result }) {

    return (
        <div className="border-2 border-blue-200 mb-2 rounded-lg">
            <div className="flex bg-slate-200 font-bold border-b-2 border-blue-200">
                <h1 className="m-2 text-lg">{result[0].name}</h1>
            </div>
            <div className="flex-row">
                <p className="m-2 bg-slate-200 p-2 font-bold italic rounded-lg">
                    Definition: {result[0].desc}
                </p>
                <ul className="mb-2 ml-4 text-sm list">
                    {result[1].map((child)=>(
                        <li className="ml-4 mb-2"> <span className="font-bold">{child.name}:</span> {child.desc}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}