function ProgressBar({ progress }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-700">
          Onboarding Progress
        </span>
        <span className="text-xs font-semibold text-gray-700">{progress}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full w-full relative">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
