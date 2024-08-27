import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, book }) {
    const { data, setData, post, errors } = useForm({
        title: book.title || "",
        author:book.author || "",
        description: book.description || "",
        _method: "PUT",

    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("book.update", book.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                        Edit the Book
                    </h2>
                </div>
            }
        >
            <Head title="Create Book" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-black bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700 sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 bg-white shadow dark:bg-gray-800 sm:p-8 sm:rounded-lg"
                        >
                            {/* Book author */}
                            <div className="mt-4">
                                <InputLabel htmlFor="book_author" value="Book Author" className="dark:text-gray-200" />
                                <TextInput
                                    id="book_author"
                                    type="text"
                                    name="author"
                                    value={data.author}
                                    className="block w-full mt-1 dark:bg-gray-700 dark:text-gray-200"
                                    isFocused={true}
                                    onChange={(e) => setData("author", e.target.value)}
                                />
                                <InputError message={errors.author} className="mt-2 dark:text-red-400" />
                            </div>

                            {/* Book Title */}
                            <div className="mt-4">
                                <InputLabel htmlFor="book_title" value="Book Title" className="dark:text-gray-200" />
                                <TextInput
                                    id="book_title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="block w-full mt-1 dark:bg-gray-700 dark:text-gray-200"
                                    isFocused={true}
                                    onChange={(e) => setData("title", e.target.value)}
                                />
                                <InputError message={errors.title} className="mt-2 dark:text-red-400" />
                            </div>

                            {/* Book Description */}
                            <div className="mt-4">
                                <InputLabel htmlFor="book_description" value="Description" className="dark:text-gray-200" />
                                <TextAreaInput
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="block w-full h-48 mt-1 dark:bg-gray-700 dark:text-gray-200"
                                />
                                <InputError message={errors.description} className="mt-2 dark:text-red-400" />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="image_path"
                                    value="Image"
                                />
                                <TextInput
                                    id="image_path"
                                    type="file"
                                    name="image"
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>

                            {/* Form Buttons */}
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("books.available")}
                                    className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow dark:text-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
