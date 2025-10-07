import { User } from '../lib/types';
import profileImage from '../assets/topchoicerealtypfp.jpg';

interface AgentCardProps {
  agent: User;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border-2 border-gold/20">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <span className="text-gold mr-2">👤</span> Contact Agent
      </h3>

      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={profileImage}
          alt={agent.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-gold shadow-lg"
        />

        <div className="flex-1 w-full">
          <h4 className="font-bold text-xl text-gray-900">{agent.name}</h4>
          {agent.bio && (
            <p className="text-sm text-gray-600 mt-2 p-3 bg-white rounded-lg border-l-4 border-gold">
              {agent.bio}
            </p>
          )}

          <div className="mt-4 space-y-3 bg-white p-4 rounded-lg">
            <a 
              href={`mailto:${agent.email}`} 
              className="flex items-center justify-center text-sm text-gray-700 hover:text-gold transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-2 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="group-hover:underline">{agent.email}</span>
            </a>

            <a 
              href={`tel:${agent.phone}`} 
              className="flex items-center justify-center text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              📞 {agent.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

