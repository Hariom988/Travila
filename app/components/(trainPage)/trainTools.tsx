"use client";
import {
  MegaphoneIcon,
  MapIcon,
  BellAlertIcon,
  ViewColumnsIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const TOOLS = [
  {
    id: 1,
    title: "Platform Locator",
    desc: "Know platform number before you reach",
    icon: MegaphoneIcon,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    id: 2,
    title: "Coach Position",
    desc: "Check coach distance from engine",
    icon: MapIcon,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    id: 3,
    title: "Seat Map",
    desc: "View layout of 1A, 2A, 3A, SL",
    icon: ViewColumnsIcon,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    id: 4,
    title: "Station Alarm",
    desc: "Get wake-up calls before arrival",
    icon: BellAlertIcon,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
];

export default function TrainTools() {
  return (
    <div className="w-full max-w-275 mx-auto px-3 md:px-0 mb-24 font-sans">
      <div className="mb-8">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 px-1">
          Smart Travel Tools
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              className={`bg-white p-4 rounded-xl border ${tool.border} shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center md:items-start md:text-left`}
            >
              <div
                className={`w-10 h-10 rounded-full ${tool.bg} flex items-center justify-center mb-3`}
              >
                <tool.icon className={`h-5 w-5 ${tool.color}`} />
              </div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1">
                {tool.title}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-500 leading-tight">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-5 md:p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-4 z-10">
          <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <ShieldCheckIcon className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold mb-1">
              Safety & 24x7 Helpline
            </h3>
            <p className="text-xs md:text-sm text-gray-300 max-w-md">
              For any medical emergency, security issue, or grievance during
              your journey, help is just a call away.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto z-10">
          <button className="flex-1 cursor-pointer md:flex-none flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
            <PhoneIcon className="h-4 w-4" />
            <span>Call 139</span>
          </button>
          <button className="flex-1 cursor-pointer md:flex-none flex items-center justify-center gap-2 border border-white/20 bg-white/5 text-white px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-white/10 transition-colors">
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );
}
