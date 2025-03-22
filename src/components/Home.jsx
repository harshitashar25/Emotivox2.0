import { useState } from "react";
import Header from "./Header";
import TaskCard from "./TaskCard";
import { HiVolumeUp, HiOutlineMicrophone, HiOutlineDocumentText } from "react-icons/hi";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClick = (task) => {
    setSelectedTask(task);
  };

  const tasks = [
    { 
      name: "Text-to-Speech", 
      color: "from-blue-500 to-blue-700",
      icon: HiVolumeUp,
      description: "Convert text into natural-sounding speech.",
      link: "/text-to-speech"
    },
    { 
      name: "Voice Cloning", 
      color: "from-green-500 to-green-700",
      icon: HiOutlineMicrophone,
      description: "Create a digital copy of a voice.",
      link: "/voice-cloning"
    },
    { 
      name: "Speech-to-Text", 
      color: "from-yellow-500 to-yellow-700",
      icon: HiOutlineDocumentText,
      description: "Convert spoken language into written text.",
      link: "/speech-to-text"
    },
  ];

  return (
    <div className="bg-gradient-to-b from-teal-800 via-teal-600 to-teal-100 min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Header />

        {/* Title Animation */}
        <div className="mt-30 text-center text-gray-900">
          <h2 className="text-3xl md:text-5xl font-bold drop-shadow-md text-white">
            <TypeAnimation
              sequence={[
                "AI Voice Services", 2000,
                "Revolutionizing Speech Technology", 2000,
                "Unlock the Power of AI Voice", 2000,
                "",
              ]}
              speed={50}
              repeat={Infinity}
            />
          </h2>

          <p className="text-gray-700 max-w-2xl mx-auto mt-4 text-lg">
            Choose an AI-powered voice service and elevate your digital experience.
          </p>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {tasks.map((task, index) => (
            <div 
              key={task.name}
              className="transform transition-all duration-300 hover:-translate-y-3 hover:shadow-lg"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <TaskCard 
                taskName={task.name} 
                gradientColor={task.color}
                Icon={task.icon}
                description={task.description}
                link={task.link}
                isSelected={selectedTask === task.name}
                onClick={() => handleClick(task.name)}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 max-w-2xl mx-auto mt-4 text-lg">
            Ready to build the future of voice technology?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
