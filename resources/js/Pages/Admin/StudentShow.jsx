import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function StudentShow({ auth, user }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`Student - ${user.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Student Details</h1>

              {/* Display the student's image */}
              <div className="mt-4">
                <img
                  src={user.profile_photo_url}
                  alt={`${user.name}'s Profile Picture`}
                  className="w-32 h-32 mx-auto mb-4 rounded-full"
                />
              </div>

              {/* Display other student details */}
              <div className="mt-4">
                <p className="text-gray-900 dark:text-gray-100"><strong>ID:</strong> {user.id}</p>
                <p className="text-gray-900 dark:text-gray-100"><strong>Name:</strong> {user.name}</p>
                <p className="text-gray-900 dark:text-gray-100"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-900 dark:text-gray-100"><strong>Created At:</strong> {user.created_at}</p>
              </div>

              {/* Back to students list link */}
              <div className="mt-6">
                <Link
                  href={route("admin.students")}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Back to Students List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
