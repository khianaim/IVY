import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { getFeedbackByInterviewId } from '@/lib/actions/general.actions';

import DisplayTechIcons from '@/components/DisplayTechIcons';

import type { InterviewCardProps } from "@/types/index";

const InterviewCard = async ({ id, userId, role, type, techstack, 
  createdAt }: InterviewCardProps) => {
  console.log(id); 

  const feedback =
  userId && id
    ? await getFeedbackByInterviewId({
        interviewId: id,
        userId,
      })
    : null;

  const normalizedType = /mix/gi.test(type) ? 
  'Mixed' : type;
  
  const formattedDate = dayjs(feedback?.createdAt || createdAt || 
  Date.now()).format('MMM D, YYYY');

  return (
    <div className="card-border w-full sm:w-[400px] md:w-[450px] min-h-[400px]">
      <div className="card-interview">
        <div>
        <div className="absolute top-0 right-0 w-fit px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/10 rounded-tr-2xl">
            <p className="badge-text">{normalizedType}</p>
          </div>

         {/* Interview Role */}
          <h3 className="mt-5 capitalize text-white font-extrabold">{role} Interview</h3>
        {/* Date & Score */}
          <div className="flex flex-row gap-2 mt-3 ">
            <div className="flex flex-row">
              <Image src="/calendar.png" alt="calendar" width={22} height={22} />
            </div>
            <p className='text-white'>{formattedDate}</p>
          </div>

          <div className="flex flex-row gap-2 items-cente ">
            <Image src="/star.png" alt="star" width={22} height={22} />
            <p className='text-white'>{feedback?.totalScore || '---'}/100</p>
          </div>
        </div>
        
        {/* Feedback or Placeholder Text */}
        <p className="line-clamp-4 -mt-5 text-white">
          {feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to ace your next one."}
        </p>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

           <button
           className="glass-button w-fit rounded-full px-6 py-2 bg-black font-semibold text-lg glow-text"
          >
            <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
            {feedback ? 'Check Feedback' : 'View Interview'}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
