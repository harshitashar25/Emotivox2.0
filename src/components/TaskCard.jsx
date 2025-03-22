import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ taskName, gradientColor, Icon, description, link, isSelected }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl shadow-lg cursor-pointer
        transition-all duration-500 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        bg-white dark:bg-gray-800 hover:shadow-xl
        ${isSelected ? 'ring-4 ring-teal-500 ring-opacity-50' : ''}
      `}
    >
      {/* Top Gradient Line */}
      <div className={`h-2 w-full bg-gradient-to-r ${gradientColor}`}></div>

      {/* Card Content */}
      <div className="p-6">
        {/* Icon Section */}
        <div className="flex items-center justify-center mb-4">
          <div className={`p-3 rounded-full bg-gradient-to-r ${gradientColor} text-white`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">
          {taskName}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
          {description}
        </p>

        {/* Try Now Button with Dynamic Link */}
        <div className="mt-6 flex justify-center">
          <Link to={link}>
            <button 
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                bg-gradient-to-r ${gradientColor} text-white
                transform transition-transform duration-300 hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-teal-500
              `}
            >
              Try Now
            </button>
          </Link>
        </div>
      </div>

      {/* Selection Checkmark */}
      {isSelected && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-teal-500 rounded-full p-1">
          <svg 
            className="w-5 h-5 text-white transform transition-transform duration-300 scale-100" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
