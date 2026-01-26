'use-strict'

const statusStyles = {
  "In Progress": "bg-blue-100 text-blue-800 font-semibold rounded px-3 py-1 inline-block text-xs",
  "Completed": "bg-green-100 text-green-800 font-semibold rounded px-3 py-1 inline-block text-xs",
  "Not Started": "bg-gray-100 text-gray-800 font-semibold rounded px-3 py-1 inline-block text-xs",
  "Delivered": "bg-green-100 text-green-800 font-semibold rounded px-3 py-1 inline-block text-xs",
};

const ApplicationTrackingTable = ({applicationData}) => {


  return (
    <div className="bg-white">
      {/* Table Header */}
      <div className='flex flex-row'> 
        <h2 className="font-bold text-navy-700 border-b-2 border-navy-700 pb-2 mb-1 w-1/4 text-center">Track Current Applications</h2>
        <div className="grow border-b-2 border-gray-100 mb-1"></div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-700 font-bold">
              <th className="py-4 px-4">PERSON</th>
              <th className="py-4 px-4">TASK</th>
              <th className="py-4 px-4">STATUS</th>
              <th className="py-4 px-4">STATUS DATE</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {applicationData.length > 0 ? (
              applicationData.map((row) => (
                <tr key={row.id} className={`border-b ${row.status === 'Pending' ? 'bg-gray-50' : ''}`}>
                  <td className="py-2 px-4 flex-col gap-1">
                    <p className='text-gray-cool-700 font-bold'>{row.name}</p>
                    <p className='text-gray-500 text-xs'>{row.email}</p>
                  </td>
                  <td className="py-5 px-4">{row.task}</td>
                  <td className="py-5 px-4">
                    <span className={statusStyles[row.status] || statusStyles["Not Started"]}>{row.status}</span>
                  </td>
                  <td className="py-5 px-4">{row.statusDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-5 px-4" colSpan={4}>No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTrackingTable;