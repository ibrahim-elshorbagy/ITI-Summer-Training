import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, books, success }) {
    const deleteBook = (book) => {
        if (!window.confirm("Are you sure you want to delete the book?")) {
            return;
        }

        router.delete(route("book.destroy", book.id));
    };

        const borrow = (book) => {
        // if (!window.confirm("Are you sure you want to delete the book?")) {
        //     return;
        // }

        // router.delete(route("book.destroy", book.id));
    };

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB"); // This will format the date to DD/MM/YYYY
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                        Books
                    </h2>
                    <Link
                        href={route("book.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                            {success}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-black rtl:text-right dark:text-gray-100">
                                    <thead className="text-xs text-black uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-100">
                                        <tr>
                                            <th className="px-3 py-3 text-left">ID</th>
                                            <th className="px-3 py-3 text-left">Title</th>
                                            <th className="px-3 py-3 text-left">Author</th>
                                            <th className="px-3 py-3 text-left">Description</th>
                                            <th className="px-3 py-3 text-left">Updated At</th>
                                            <th className="px-3 py-3 text-left">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {books.map((book) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                                key={book.id}
                                            >
                                                <td className="px-3 py-2">{book.id}</td>
                                                <td className="px-3 py-2">{book.title}</td>
                                                <td className="px-3 py-2">{book.author}</td>
                                                <td className="px-3 py-2">{book.description}</td>
                                                <td className="px-3 py-2">{formatDate(book.updated_at)}</td>

                                                {auth.user.roles == 'admin' && (
                                                    <td className="px-3 py-2">
                                                        <Link
                                                            href={route("book.show", book.id)}
                                                            className="mx-1 font-medium text-emerald-600 hover:underline"
                                                        >
                                                            Show
                                                        </Link>
                                                        <Link
                                                            href={route("book.edit", book.id)}
                                                            className="mx-1 font-medium text-blue-600 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteBook(book)}
                                                            className="mx-1 font-medium text-red-600 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                )}
                                                {auth.user.roles == 'student' && (
                                                    <td className="px-3 py-2">
                                                        <Link
                                                            href={route("books.show", book.id)}
                                                            className="mx-1 font-medium text-emerald-600 hover:underline"
                                                        >
                                                            Show
                                                        </Link>
                                                        <button
                                                            onClick={() => borrow(book)}
                                                            className="mx-1 font-medium text-blue-600 hover:underline"
                                                        >
                                                            borrow
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

