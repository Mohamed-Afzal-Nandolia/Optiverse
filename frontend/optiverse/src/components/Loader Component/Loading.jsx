import { Jelly } from 'ldrs/react'
import 'ldrs/react/Jelly.css'

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#001C3D]">
      <Jelly
        size="40"
        speed="0.9"
        color="white"
      />
    </div>
  );
};
