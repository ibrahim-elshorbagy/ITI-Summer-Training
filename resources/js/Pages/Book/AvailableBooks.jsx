import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function AvailableBooks({ auth, books, success, danger }) {
    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB"); // This will format the date to DD/MM/YYYY
    };

    const deleteBook = (book) => {
    const confirmationMessage = "Are you sure you want to delete the Book?";

    if (!window.confirm(confirmationMessage)) {
        return;
    }

    router.delete(route("book.destroy", book), {
        onSuccess: (page) => {
        setVisibleSuccess(page.props.success);
        },
    });
};


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                        Available Books
                    </h2>

                    {auth.user.roles[0] == "admin" && <Link
                        href={route("book.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>}
                </div>
            }
        >
            <div className="py-12">
                { JSON.stringify() }
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                            {success}
                        </div>
                    )}
                    {danger && (
                        <div className="px-4 py-2 mb-4 text-white bg-red-500 rounded">
                            {danger}
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

                                                <td className="px-3 py-2">
                                                    <Link
                                                        href={route("book.show", book.id)}
                                                        className="mx-1 font-medium text-emerald-600 hover:underline"
                                                    >
                                                        Show
                                                    </Link>
                                                    {auth.user.roles[0] == "admin" && <Link
                                                        href={route("book.edit", book.id)}
                                                        className="mx-1 font-medium text-indigo-600 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    }{auth.user.roles[0] == "admin" &&
                                                    <button
                                                        onClick={(e) => deleteBook(book.id)}
                                                        className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                                                    >
                                                        Delete
                                                    </button>}

                                                    {auth.user.roles == 'student' && (
                                                        <button
                                                            onClick={() => router.post(route("book.borrow", book.id))}
                                                            className="mx-1 font-medium text-blue-600 hover:underline"
                                                        >
                                                            Borrow
                                                        </button>
                                                    )}
                                                </td>
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
