"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion} from "framer-motion";
import Link from "next/link";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import Agent from "@/components/agent";
import { Testimonials } from "@/components/Testimonials";

// Variable for Questions in Free interviews
const baseQuestions = [
  "What's your current role?",
  "Tell me about your current work experience or volunteer work, if this is your first job.",
  "Why do you believe you're a good fit for this role?",
];

const getRoleBasedQuestions = (role: string): string[] => {
  let roleSpecificQuestions: string[] = [];

  switch (role.toLowerCase()) {
    case "frontend developer":
      roleSpecificQuestions = [
        "What is React?",
        "Explain the concept of virtual DOM.",
      ];
      break;
    case "full stack developer":
      roleSpecificQuestions = [
        "What is Node.js?",
        "How would you create an API in Express?",
      ];
      break;
    // Add more roles here as needed
    default:
      roleSpecificQuestions = [];
      break;
  }

  return [...baseQuestions, ...roleSpecificQuestions];
};

const HomePage = () => {
  const [showInterview, setShowInterview] = useState(false);
  const [preferredName, setPreferredName] = useState("");
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const interviewSectionRef = useRef<HTMLDivElement | null>(null);

  // Variable for Interview after 'Try Ivy' is clicked
  const handleScrollToInterview = () => {
    setShowInterview(true);
  };

  useEffect(() => {
    if (showInterview && interviewSectionRef.current) {
      interviewSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showInterview]);

    // Variable for Interview information
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleInterviewStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (role.trim()) {
      const generatedQuestions = getRoleBasedQuestions(role);
      setQuestions(generatedQuestions);
      setAnswers(new Array(generatedQuestions.length).fill("")); // Clear previous answers
      setInterviewComplete(false);
      setShowInterviewModal(true);
    } else {
      alert("Please specify your role.");
    }
  };
  
  const handleInterviewComplete = () => {
    const evalResult = evaluatePerformance(answers, questions);
    setEvaluation(evalResult);
    setInterviewComplete(true);
  };


  const InterviewInstructions = () => {
    useEffect(() => {
      const instructions = document.querySelectorAll<HTMLElement>('.instruction');
  
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the element is in view
      };
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      }, options);
  
      instructions.forEach((instruction) => observer.observe(instruction));
  
      return () => {
        instructions.forEach((instruction) => observer.unobserve(instruction));
      };
    }, []);
  
    return null; 
  };

// Variable for elements in Hero Component for Motion
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 1 + i * 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };
  
  return (
  
    <div className="relative">
  {/* Hero Section */}
  <HeroGeometric title1="IVY" title2="AI-Powered Interview Coach">

  <div className="mt-12 flex flex-col items-center gap-8">
  {/* Testimonials Section (1st row) */}
  <motion.div
    custom={0}
    variants={fadeUpVariants}
    initial="hidden"
    animate="visible"
    className="-mt-8"
  >
    <Testimonials />
  </motion.div>

  {/* Buttons Section (2nd row) */}
  <motion.div
    custom={1}
    variants={fadeUpVariants}
    initial="hidden"
    animate="visible"
    className="flex flex-col sm:flex-row justify-center gap-6 mt-2"
  >
    <button
      className="glass-button w-full sm:w-fit rounded-full px-6 py-2 font-semibold text-base sm:text-lg md:text-xl glow-text"
      onClick={handleScrollToInterview}
    >
      Try Ivy
    </button>

    <Link href="/sign-up">
      <button
        className="glass-button w-full sm:w-fit bg-white/10 text-black font-semibold rounded-full px-6 py-2 text-base sm:text-lg md:text-xl border border-white/20 hover:bg-white/20 transition"
        style={{
          backgroundImage: "linear-gradient(to right, #fde68a, #aecde6)",
          backgroundClip: "padding-box",
          border: `1px solid rgba(255, 255, 255, 0.2)`,
        }}
      >
        Start Free
      </button>
    </Link>
  </motion.div>
</div>
  </HeroGeometric>
  
      {/* Interview Modal */}
      {showInterview && (
        <motion.section
          ref={interviewSectionRef}
          key="interview-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute top-full left-0 w-full z-20 bg-black backdrop-blur-2xl shadow-2xl 
          px-4 py-8 sm:px-8 sm:py-12 md:px-16 lg:px-24 xl:px-32"
        >
          <div className="mt-10 max-w-5xl mx-auto">
            <form onSubmit={handleInterviewStart} className="space-y-6 text-white">
            
              <div>
                <label className="block font-medium">How would you like to be addressed?</label>
                <input
                  type="text"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  placeholder="For example: Alejandra, Ale, or Mrs.Matthew etc."
                  className="info mt-2 p-3 w-full rounded-lg bg-black/30 border border-white/20 backdrop-blur-md italic text-sm sm:text-base"
                  required
                />
              </div>

              <InterviewInstructions />
              <div className="interview-instructions">
                <div className="instruction">
                  <strong>DURING THE INTERVIEW:</strong>
                  <p>
                    Please feel free to take notes on the way in which your answers are relayed to you. This is to ensure 
                    you know and understand the correct vocabulary and phrases to use in the future, positioning yourself as a 
                    highly-qualified and well-prepared future employee. You may ask me to repeat what was mentioned before as many 
                    times as you wish. If at any point during the interview you come up with a question that could be posed to you, 
                    feel free to interject and inquire.
                  </p>
                </div>

                <div className="instruction">
                  <strong>AFTER THE INTERVIEW:</strong>
                  <p>
                    You will receive comprehensive, detailed feedback with an overall score, strengths, and areas of improvement in all aspects. You may divert to your dashboard to practice for another interview OR retake the same interview as many times as desired.
                  </p>
                </div>
              </div>

              <div className="flex justify-center -mt-10">
                <button
                  type="submit"
                  className="glass-button w-fit bg-white/10 text-black font-semibold rounded-full px-6 py-2 text-base sm:text-lg md:text-xl border border-white/20 hover:bg-white/20 transition"
                  style={{
                    backgroundImage: "linear-gradient(to right, #fde68a, #aecde6)",
                    backgroundClip: "padding-box",
                    border: `1px solid rgba(255, 255, 255, 0.2)`,
                  }}
                >
                  Start Interview
                </button>
              </div>
            </form>
          </div>
        </motion.section>
      )}

      {/* Modal Showing Interview */}
      {showInterviewModal && questions.length > 0 && (
       <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-transparent backdrop-blur-sm text-center p-4 sm:p-6 rounded-lg w-full max-w-3xl relative mt-4"
          >
            <button
              className="absolute top-1 right-3 text-xl font-bold text-white hover:text-gray-500 cursor-pointer"
              onClick={() => setShowInterviewModal(false)}
            >
              &times;
            </button>
            <div className="card-border">
              <div className="card p-6">
                <Agent
                  userName={preferredName || "Guest"}
                  userId="mockUserId"
                  interviewId="mockInterviewId"
                  type="interview"
                  questions={questions}
                  onComplete={handleInterviewComplete}
                  onAnswerChange={handleAnswerChange}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};


export default HomePage;
