import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Show = ({ auth, book }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="relative flex flex-col items-center">
                    <h2 className="pb-2 mb-4 text-2xl font-semibold leading-tight text-gray-900 border-b-2 border-blue-200 dark:text-gray-100 dark:border-blue-600">
                        {`${book.title}`}
                    </h2>

                    {auth.user.roles == "admin" && (
                        <Link
                            href={route("book.edit", book.id)}
                            className="absolute right-0 px-3 py-1 text-white transition-all bg-blue-500 rounded shadow bottom-6 hover:bg-blue-600"
                        >
                            Edit
                        </Link>
                    )}
                </div>
            }
        >
            <div>
                <div className="container pb-10 mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Author: {book.author}
                            </h3>
                            <p className="mt-4 text-gray-600 text-md dark:text-gray-300">
                                {book.description}
                            </p>

                            <img
                                src={`http://127.0.0.1:8000${book.cover_photo_url}`}
                                alt={`${book.title} cover`}
                                className="w-48 h-auto mx-auto mb-6 rounded shadow-lg"
                              />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
