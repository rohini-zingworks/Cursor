'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserIcon,
  BeakerIcon,
  DocumentTextIcon,
  CommandLineIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-20 h-full bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-0 -translate-x-full'}
      `}>
        {/* Logo and Toggle Button */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-semibold">Dandi AI</span>
          </Link>
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            {isOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Sidebar Content - Only visible when sidebar is open */}
        <div className={`${isOpen ? 'block' : 'hidden'} h-full`}>
          {/* Personal Dropdown */}
          <div className="p-3">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="w-full px-3 py-2 text-left flex items-center justify-between rounded-md hover:bg-gray-100"
            >
              <span className="text-gray-700">Personal</span>
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-3 space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                pathname === '/dashboard'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <HomeIcon className="h-5 w-5" />
              <span>Overview</span>
            </Link>

            <div className="relative">
              <button
                className={`w-full flex items-center justify-between space-x-3 px-3 py-2 rounded-md ${
                  pathname.startsWith('/dashboard/account')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <UserIcon className="h-5 w-5" />
                  <span>My Account</span>
                </div>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>

            <Link
              href="/dashboard/research-assistant"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                pathname === '/dashboard/research-assistant'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BeakerIcon className="h-5 w-5" />
              <span>Research Assistant</span>
            </Link>

            <Link
              href="/dashboard/research-reports"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                pathname === '/dashboard/research-reports'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <DocumentTextIcon className="h-5 w-5" />
              <span>Research Reports</span>
            </Link>

            <Link
              href="/dashboard/api-playground"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                pathname === '/dashboard/api-playground'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CommandLineIcon className="h-5 w-5" />
              <span>API Playground</span>
            </Link>

            <Link
              href="/dashboard/documentation"
              className={`flex items-center justify-between px-3 py-2 rounded-md ${
                pathname === '/dashboard/documentation'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <BookOpenIcon className="h-5 w-5" />
                <span>Documentation</span>
              </div>
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </Link>
          </nav>

          {/* User Profile */}
          <div className="p-3 border-t border-gray-200 mt-auto">
            <div className="flex items-center space-x-3 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                R
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Rohini Nagtilak</p>
              </div>
              <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button - Always visible when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow-lg"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      )}
    </>
  );
} 