import React from 'react'
import Agent from "@/components/agent";
import { getCurrentUser } from '@/lib/actions/auth.action';

const page = async () => {
    const user = await getCurrentUser();

  return (
    <>
<section className='mt-8'>
        <Agent 
        userName={user?.name} 
        userId={user?.id} 
        profileImage={user?.profileURL}
        type="generate" />
        
        </section>
    </>
  )
}

export default page