import React from 'react'
import Agent from "@/components/Agent";
import { getCurrentUser } from '@/lib/actions/auth.action';

const page = async () => {
    const user = await getCurrentUser();

  return (
    <>
    <h3>Generated Practice Interview</h3>
<section className='mt-10'>
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