// components/ScrollProgress.tsx
interface ScrollProgressProps {
  progress: number
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div className="scroll-indicator">
      <div 
        className="scroll-progress" 
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}