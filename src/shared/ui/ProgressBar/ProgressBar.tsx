'use client'

import { useIsFetching } from '@tanstack/react-query'

export function ProgressBar() {
  const isFetching = useIsFetching()

  if (!isFetching) return null

  return (
    <div className="fixed top-0 left-0 z-50 h-[3px] w-full overflow-hidden bg-transparent">
      <div className="bg-primary h-full w-full origin-left animate-progress" />
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(0.7);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
