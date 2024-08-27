import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
export default function Welcome({ auth }) {

    return (
        <>
            <GuestLayout>
                <Head title={Welcome} />
                <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    <h1 className="text-5xl font-bold">
                       Welcome to Our Library
                    </h1>
                    <p className="flex mt-4 text-lg">
                       Explore our Books
                    </p>
                    <div className="flex gap-2 mt-8 ">

                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
