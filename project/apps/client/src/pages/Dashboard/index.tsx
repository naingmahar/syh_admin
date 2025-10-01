import { useNavigate } from "react-router-dom";
import { Icon, IconKey, IconsSize } from "../../componet/atoms/icons";

const DashboardScreen = () => {

    const navigate = useNavigate();

    return (
      <div className="flex min-h-screen bg-gray-100 p-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          {/* <header className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
              Add New Book
            </button>
          </header> */}
  
          {/* Widgets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Books Widget */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-500 justify-center flex items-center">
                Total Books
                <button onClick={()=>navigate("/owner/books")} className="ml-2 justify-center  text-blue-600 px-2 py-1 rounded-full text-xs">
                    <Icon icon={IconKey.edit} size={IconsSize.normal} className="text-gray-600" />
                </button>
              </h3>
              <p className="mt-2 text-4xl font-bold text-gray-900">1,250</p>

            </div>
  
            {/* Total Users Widget */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-500 justify-center flex items-center">
                Total Users
                <button className="ml-2 justify-center  text-blue-600 px-2 py-1 rounded-full text-xs">
                    <Icon icon={IconKey.info} size={IconsSize.normal} className="text-green-400" />
                </button>
              </h3>
              <p className="mt-2 text-4xl font-bold text-gray-900">5,800</p>
            </div>
  
            {/* Total Ad Views Widget */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-500">Total Ad Views</h3>
              <p className="mt-2 text-4xl font-bold text-gray-900">25,400</p>
            </div>
          </div>
  
          {/* Recent Books List */}
          {/* <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Books</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published Date</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">The Silent Patient</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alex Michaelides</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2019</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                      <a href="#" className="ml-4 text-red-600 hover:text-red-900">Delete</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Where the Crawdads Sing</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Delia Owens</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2018</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                      <a href="#" className="ml-4 text-red-600 hover:text-red-900">Delete</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Project Hail Mary</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Andy Weir</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2021</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                      <a href="#" className="ml-4 text-red-600 hover:text-red-900">Delete</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>
    );
  };
  
  export default DashboardScreen;