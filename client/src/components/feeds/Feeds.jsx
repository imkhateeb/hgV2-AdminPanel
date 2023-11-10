import { FaPlus } from 'react-icons/fa';

const data = [
  { id: '2026UG0000', name: 'Student 1', createdOn: '7-11-2023', enrolled: 'Paid', topic: 'Demo text' },
  { id: '2026UG0000', name: 'Student 1', createdOn: '7-11-2023', enrolled: 'Unpaid', topic: 'Demo text' },
  // ... more data
];

const Feeds = () => {
  return (
    <div className="bg-bgSecondary rounded-lg p-8 min-h-screen text-white">
      <div className="mx-auto">
        <div className="flex justify-between items-center my-3 md:my-5">
          <h2 className="text-4xl max-md:text-3xl max-sm:text-2xl font-bold">Announcements</h2>
          <button
            type="button"
            className="py-2 px-5 text-white bg-pink-600 flex items-center gap-2 rounded-md"
          ><FaPlus /> Add New</button>
        </div>
        <div className="flex justify-between my-3 md:my-5">
          <div>
            <input type='text' placeholder='Search here...' />
          </div>
          <div className='flex gap-2'>
            <span>Filters</span>
            <span>UI/UX</span>
            <span>SD</span>
            <span>Blockchain</span>
            <span>AI/ML</span>
          </div>
          <div className='flex items-center gap-1 py-2 px-4 bg-slate-600 rounded-md'>
            Sort by: 
            <select className='bg-transparent outline-none'>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3">Feed</th>
                <th className="text-left px-6 py-3">Created On</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Upvotes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-gray-800">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.createdOn}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm ${item.enrolled === 'Paid'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                        }`}
                    >
                      {item.enrolled}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.topic}</td>
                  <td className="px-6 py-4">...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span>Show result:</span>
          {/* Pagination component would go here */}
        </div>
      </div>
    </div>
  );
};

export default Feeds;
