import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Dashboard = ({ auth }) => {
    return (
        <>
            <Head title="Dashboard" />
            <div className="py-6">
                <div className="px-1 mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Dashboard.layout = (page) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Dashboard
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Dashboard;
