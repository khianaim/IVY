import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.actions";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="relative min-h-screen">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <HeroGeometric showTitle={false} />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full px-4 md:px-6 py-12 text-white">
        {/* Your Interviews Section */}
        <section className="flex flex-col gap-6 mt-8">
          <h2 className="text-xl font-semibold">Your Interviews</h2>
          <div className="interviews-section">
            {hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard
                  key={`${interview.id}-${interview.role}`}
                  userId={user?.id}
                  id={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <p>You haven&apos;t taken any interviews yet</p>
            )}
          </div>
        </section>

        {/* Take Interviews Section */}
        <section className="flex flex-col gap-6 mt-12">
          <h2 className="text-xl font-semibold">Take Interviews</h2>
          <div className="interviews-section">
            {hasUpcomingInterviews ? (
              allInterview?.map((interview) => (
                <InterviewCard
                  key={`${interview.id}-${interview.role}`}
                  userId={user?.id}
                  id={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <p>There are no interviews available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
