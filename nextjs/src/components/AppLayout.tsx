"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {
    Home,
    User,
    Menu,
    X,
    ChevronDown,
    LogOut,
    Key, Files, LucideListTodo, Database, CheckSquare, Globe, BarChart3,
    Target, Package, Repeat, ChevronRight,
} from 'lucide-react';
import { useGlobal } from "@/lib/context/GlobalContext";
import { createSPASassClient } from "@/lib/supabase/client";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const [collapsedSections, setCollapsedSections] = useState<{[key: string]: boolean}>({});
    const pathname = usePathname();
    const router = useRouter();


    const { user } = useGlobal();

    const handleLogout = async () => {
        try {
            const client = await createSPASassClient();
            await client.logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const handleChangePassword = async () => {
        router.push('/app/user-settings')
    };

    const getInitials = (email: string) => {
        const parts = email.split('@')[0].split(/[._-]/);
        return parts.length > 1
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : parts[0].slice(0, 2).toUpperCase();
    };

    const toggleSection = (sectionKey: string) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    const productName = process.env.NEXT_PUBLIC_PRODUCTNAME;

    const navigationSections = [
        {
            items: [
                { name: 'Homepage', href: '/app', icon: Home },
                { name: 'Alzay\'s Dashboard', href: '/app/teacher-dashboard', icon: BarChart3 },
            ]
        },
        {
            title: 'Consultants',
            items: [
                { name: 'Consultant Dashboard', href: '/consultant-dashboard', icon: BarChart3 },
                { name: 'Client Acquisition', href: '/app/client-acquisition', icon: Target },
                { name: 'Client Service', href: '/app/client-service', icon: Package },
                { name: 'Client Retention', href: '/app/client-retention', icon: Repeat },
                { name: 'Daily Tasks', href: '/app/daily-tasks', icon: CheckSquare },
                { name: 'Dream 100 Database', href: '/app/dream100', icon: Database },
                { name: 'Client Portal Demo', href: '/app/client-portal-demo', icon: Globe },
            ]
        },
        {
            title: 'Other',
            items: [
                { name: 'Example Storage', href: '/app/storage', icon: Files },
                { name: 'Example Table', href: '/app/table', icon: LucideListTodo },
                { name: 'User Settings', href: '/app/user-settings', icon: User },
            ]
        },
    ];

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-100">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-30 flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

                <div className="h-16 flex items-center justify-between px-4 border-b">
                    <span className="text-xl font-semibold text-primary-600">{productName}</span>
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-4 px-2 flex-1">
                    {navigationSections.map((section, sectionIndex) => {
                        const sectionKey = 'key' in section ? section.key as string : `section-${sectionIndex}`;
                        const isCollapsed = collapsedSections[sectionKey];
                        const isCollapsible = 'collapsible' in section ? section.collapsible as boolean : false;
                        
                        return (
                            <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-6' : ''}>
                                {section.title && (
                                    <div 
                                        className={`px-2 mb-2 flex items-center justify-between ${
                                            isCollapsible ? 'cursor-pointer hover:bg-gray-50 rounded-md' : ''
                                        }`}
                                        onClick={isCollapsible ? () => toggleSection(sectionKey) : undefined}
                                    >
                                        <div className="flex items-center">
                                            {('numberIcon' in section && section.numberIcon) ? (
                                                <div className="w-6 h-6 mr-2 bg-primary-100 text-primary-700 rounded flex items-center justify-center text-sm font-medium">
                                                    {section.numberIcon as string}
                                                </div>
                                            ) : null}
                                            <h3 className="text-base font-medium text-gray-900">
                                                {section.title}
                                            </h3>
                                        </div>
                                        {isCollapsible && (
                                            <ChevronRight 
                                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                                                    isCollapsed ? '' : 'rotate-90'
                                                }`}
                                            />
                                        )}
                                    </div>
                                )}
                                <div className={`space-y-1 ${isCollapsible && isCollapsed ? 'hidden' : ''}`}>
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        const indentClass = ('numberIcon' in section && section.numberIcon) ? 'ml-8' : '';
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${indentClass} ${
                                                    isActive
                                                        ? 'bg-primary-50 text-primary-600'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                            >
                                                <item.icon
                                                    className={`mr-3 h-5 w-5 ${
                                                        isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                                                    }`}
                                                />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </nav>

                {/* User Card at bottom of sidebar */}
                <div className="px-2 pb-4">
                    <div className="relative">
                        <button
                            onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                            className="flex items-center space-x-3 w-full p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-700 font-medium">
                                    {user ? getInitials(user.email) : '??'}
                                </span>
                            </div>
                            <div className="flex-1 text-left truncate">
                                <p className="font-medium truncate">{user?.email || 'Loading...'}</p>
                            </div>
                            <ChevronDown className="h-4 w-4 flex-shrink-0"/>
                        </button>

                        {isUserDropdownOpen && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-md shadow-lg border">
                                <div className="p-3 border-b border-gray-100">
                                    <p className="text-xs text-gray-500">Signed in as</p>
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            setUserDropdownOpen(false);
                                            handleChangePassword()
                                        }}
                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        <Key className="mr-3 h-4 w-4 text-gray-400"/>
                                        Change Password
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setUserDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut className="mr-3 h-4 w-4 text-red-400"/>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <div className="lg:pl-64">
                <div className="sticky top-0 z-10 flex items-center h-16 bg-white shadow-sm px-4">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <Menu className="h-6 w-6"/>
                    </button>
                </div>

                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}