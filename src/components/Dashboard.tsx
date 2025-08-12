import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[200px] bg-gray-800 text-white flex flex-col p-4 fixed top-0 left-0 h-full">
        <h1 className="text-xl font-bold mb-8 text-center">EMS</h1>
        <nav className="flex flex-col space-y-2">
          <Link
            to="/"
            className="px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/manage-employees"
            className="px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            Manage Employees
          </Link>
          <Link
            to="/dashboard/category"
            className="px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            Category
          </Link>
          <Link
            to="/dashboard/profile"
            className="px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/logout"
            className="px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-[200px]">
        {/* Navbar */}
        <header className="bg-gray-800 text-white shadow-md px-6 py-3 flex items-center justify-between fixed top-0 left-[200px] right-0 z-10">
          <h1 className="text-xl font-bold">Employee Management System</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Welcome, Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="mt-[60px] p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
