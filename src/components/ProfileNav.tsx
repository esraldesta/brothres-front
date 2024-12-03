'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLinks({ id }: { id: string }) {
  const pathname = usePathname()

  return (
    <nav className='bg-blue-100 my-5 rounded-lg pl-10 w-full justify-start py-4 flex gap-x-3'>

      <Link
        className={`px-3 py-2 ${pathname === `/profile/${id}` ? 'text-blue-700 border-blue-700 border-b-4' : ''}`}
        href={`/profile/${id}`}
      >
        Home
      </Link>

      <Link
        className={`px-3 py-2 ${pathname === `/profile/${id}/blogs` ? 'text-blue-700 border-blue-700 border-b-4' : ''}`}
        href={`/profile/${id}/blogs`}
      >
        Blogs
      </Link>

      <Link
        className={`px-3 py-2 ${pathname === `/profile/${id}/videos` ? 'text-blue-700 border-blue-700 border-b-4' : ''}`}
        href={`/profile/${id}/videos`}
      >
        Videos
      </Link>
    </nav>
  )
}
