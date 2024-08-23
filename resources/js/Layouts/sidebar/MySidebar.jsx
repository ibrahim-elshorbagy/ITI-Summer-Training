import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { MdDashboard, MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
    FaChartBar,
} from "react-icons/fa";
import SideNavLink from "@/Components/SideNavLink";
import { MdOutlineLibraryBooks } from "react-icons/md";

import { Link } from "@inertiajs/react";

const MySidebar = ({ user }) => {
    const [collapsed, setCollapsed] = useState(false);

    const sections = [
        {
            title: "Dashboard",
            links: [
                {
                    text: "dashboard",
                    href: "admin.dashboard",
                    icon: <MdDashboard />,
                    roles: ["admin"],
                },
                 {
                    text: "dashboard",
                    href: "student.dashboard",
                    icon: <MdDashboard />,
                    roles: ["student"],
                },
                {
                    text: "Books",
                    href: "book.index",
                    icon: <MdOutlineLibraryBooks />,
                    roles: ["admin"],
                },
                 {
                    text: "Books",
                    href: "books.index",
                    icon: <MdOutlineLibraryBooks />,
                    roles: ["student"],
                },
            ],
            icon: <MdDashboard />,
            roles: ["admin", "student"],
        },
    ];

    const filteredSections = sections
        .map((section) => ({
            ...section,
            links: section.links.filter((link) =>
                link.roles.some((role) => user.roles.includes(role))
            ),
        }))
        .filter(
            (section) =>
                section.roles.some((role) => user.roles.includes(role)) &&
                section.links.length > 0
        );

    return (
        <div>
            <Sidebar
                collapsed={collapsed}
                width="270px"
                collapsedWidth="80px"
                className="h-full transition-all duration-300 bg-white dark:bg-gray-800"
                transitionDuration={300}
                backgroundColor="white dark:bg-gray-800"
            >
                <div className="flex items-center justify-between p-4 overflow-hidden">
                    <h1
                        className={`flex gap-2 text-xl font-bold text-gray-800 dark:text-white transition-all duration-300 ${
                            collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                        }`}
                    >
                        <FaChartBar className="text-3xl text-blue-500" />
                        <span>DashMaster</span>
                    </h1>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 ${
                            collapsed ? "rotate-180" : ""
                        }`}
                    >
                        <MdChevronLeft
                            size={24}
                            className="text-gray-600 dark:text-gray-400"
                        />
                    </button>
                </div>
                <div className="px-6 pt-2">
                    <hr className="border-gray-300 dark:border-gray-900" />
                </div>
                <Menu
                    iconShape="square"
                    className="pt-2 text-gray-700 dark:text-white"
                >
                    {filteredSections.map((section, index) => (
                        <SubMenu
                            key={index}
                            icon={section.icon}
                            label={section.title}
                            className="py-2 my-2 text-gray-800 dark:text-white dark:hover:text-white hover:text-black"
                        >
                            {section.links.map((link, idx) => (
                                <SideNavLink
                                        href={route(link.href)}
                                        active={route().current(link.href)}
                                    >
                                <MenuItem
                                    key={idx}
                                    icon={link.icon}
                                    className="py-2 my-1 text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-black"
                                >

                                        <span className="cursor-pointer">{link.text}</span>
                                </MenuItem>
                            </SideNavLink>

                            ))}

                        </SubMenu>
                    ))}
                </Menu>
                <div className="px-6 pb-8">
                    <hr className="border-gray-300 dark:border-gray-900" />
                </div>
                <Link href={route("profile.edit")}>
                    <div className="flex items-center pt-2 pl-6 overflow-hidden ">
                        <div
                            className={`flex items-center ${
                                collapsed ? "" : "gap-3"
                            }`}
                        >
                            <img
                                className="rounded-full w-9 h-9"
                                src={user.profile_photo_url}
                                alt="User avatar"
                            />
                            {!collapsed && (
                                <div className="overflow-hidden">
                                    <div className="overflow-hidden text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap text-ellipsis">
                                        {user.name}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {user.email}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            </Sidebar>
        </div>
    );
};

export default MySidebar;
