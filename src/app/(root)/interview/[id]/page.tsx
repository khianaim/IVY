import { redirect } from "next/navigation";

import Agent from "@/components/agent";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.actions";
import { getCurrentUser } from "@/lib/actions/auth.action";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
    <div className=" flex flex-row gap-4 justify-between mt-4">
        <div className="flex flex-row gap-4 items-center
        max-sm:flex-col">


        <div className="flex flex-row gap-4 items-center">
            <h3 className="capitalize">

            {interview.role} Interview

            </h3>

            </div>
        </div>
            <p className="bg-dark-200 px-4 py-2 rounded-lg 
            h-fit capitalize">
            {interview.type}
            </p>
    </div>
    
    <Agent 
        userName={user?.name || ''}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}  
        feedbackId={feedback?.id} 
        />
    </>
  );
};

export default InterviewDetails;