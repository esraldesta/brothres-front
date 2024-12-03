import EditProfilePic from '@/components/main/forms/Edit Profile/EditProfilePic';
import { authFetch } from '@/lib/authFetch';
import React, { Suspense } from 'react'

export default async function page() {
  return (
    <EditSuspense/>
  )
}


async function EditSuspense() {
    const userData = await authFetch("auth/full-profile");
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-14">
          <EditProfilePic userData={userData} />
        </div>
      </Suspense>
    );
  }
