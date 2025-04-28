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
          <h1 className="text-1xl font-semibold">No feedback available</h1>
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
  <h1 className="text-2xl font-extrabold mt-6">
    <span className=" text-amber-100 capitalize">
      {interview.role} Interview Feedback
    </span>
  </h1>
</div>

      <div className="flex flex-row justify-center -mt-4">
        <div className="flex flex-row gap-2">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center text-lg">
            <p>
              Performance rate of{" "}
              <span className="text-white capitalize font-bold">
                {feedback?.totalScore}
                %
              </span>
            </p> 
          </div>

       
          <div className="flex flex-row gap-2 text-s">

          
          </div>
        </div>
      </div>

      <hr />

      <p className="flex text-center text-[#fff]">{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4">
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index}>
            <li className="text-[#fff] font-bold">
             {category.name} ({category.score}%)
            </li>
            <p className="mt-2">{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-amber-100 capitalize text-2xl font-extrabold">
          Strengths</p>
        <ul>
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-amber-100 capitalize text-2xl font-extrabold">
          Areas for Improvement</p>
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
                      className="glass-button w-full sm:w-fit rounded-full px-4 py-1 text-white font-semibold text-base sm:text-lg md:text-xl glow-text">
                      Back to Dashboard
                    </button>
          </Link>
          <Link href={`/interview/${id}`}>
            <button
            type="submit"
            className="cursor-pointer glass-button w-full sm:w-fit bg-white/10 text-black font-semibold rounded-full px-4 py-1 text-base sm:text-lg md:text-xl border border-white/20 hover:bg-white/20 transition"
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