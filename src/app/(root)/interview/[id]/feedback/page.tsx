import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Feedback } from "@/types/index";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.actions";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");
  
  const feedback: Feedback | null = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  console.log("Feedback:", feedback);

  if (!feedback) {
    return (
      <section className="section-feedback">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">No feedback available</h1>
          <p className="text-gray-500">Check back later once feedback is generated.</p>
          <Button className="mt-4">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </section>
    );
  }
  
  return (
    <section className="section-feedback">
      <div className="flex flex-col items-center justify-center text-center">
  <h1 className="text-4xl font-extrabold">
    <span className="block mt-6">INTERVIEW FEEDBACK</span>
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-[#aecde6] capitalize">
      {interview.role} Interview
    </span>
  </h1>
</div>

      <div className="flex flex-row justify-center ">
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <p>
              Interview Score:{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-[#aecde6] capitalize font-bold">
                {feedback?.totalScore}
                /100
              </span>
            </p>
             {/* Date */}
            <p> 
               ({feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"})
             
            </p>

          </div>

       
          <div className="flex flex-row gap-2 text-s">

          
          </div>
        </div>
      </div>

      <hr />

      <p>{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4">
        <h2 className="text-amber-100 capitalize">
          Breakdown of the Interview:</h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index}>
            <p className="font-bold text-[#aecde6]">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-amber-100 capitalize">
          Strengths</h3>
        <ul>
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-amber-100 capitalize">
          Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center gap-4">
        <Link href={`/dashboard`}>
                    <button
                      type="submit"
                      className="glass-button w-fit rounded-full px-6 py-2 text-white font-semibold text-lg glow-text">
                      Back to Dashboard
                    </button>
          </Link>
          <Link href={`/interview/${id}`}>
            <button
            type="submit"
            className="glass-button w-fit bg-white/10 text-black font-semibold rounded-full px-6 py-2 text-lg border border-white/20 hover:bg-white/20 transition"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fde68a, #aecde6)",
              backgroundClip: "padding-box",
              border: `1px solid rgba(255, 255, 255, 0.2)`,
              boxShadow:
              `inset 0 0.05em 0 #ffffff0d,
                0 0.05em 0 #ffffff0a,
                0 0.1em 0 #ffffff0a,
                0 0.25em 0 #cccccc10,
                0 0.3em 0 #bbbbbb10,
                0 0.4em 0 #aaaaaa10,
                0 0.45em 0 #99999910,
                0 0.5em 0.5em #ffffff05`,
            }}
          >
           Retake Interview
          </button>
          </Link>
        
      </div>
    </section>
  );
};

export default Feedback;