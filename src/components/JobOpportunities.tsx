import { ExternalLink, GraduationCap, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Job {
  id: string;
  company: string;
  role: string;
  type: 'Internship' | 'Full-time';
  location: string;
  eligibility: string;
  applyLink: string;
  postedAt: string;
  expiresAt: string;
}

export function JobOpportunities() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & filter state
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Internship' | 'Full-time'>('All');

  useEffect(() => {
    fetch('https://opensheet.elk.sh/1XQpGNK8aJOPE5X-gfz1Lbx9rvfVqgNjT8IGiH24tVZE/Jobs') // Replace with your OpenSheet JSON URL
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Active + sorted jobs
  const today = new Date();
  const activeJobs = jobs.filter((job) => new Date(job.expiresAt) >= today);

  const sortedJobs = [...activeJobs].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );

  const isNewJob = (postedAt: string) => {
    const diff = (Date.now() - new Date(postedAt).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  };

  // Filtered jobs based on search + type
  const filteredJobs = sortedJobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === 'All' || job.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="job-opportunities px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Job & Internship Opportunities
          </h2>
          <p className="text-lg text-gray-600">
            Fresh opportunities updated regularly. Apply before the deadline!
          </p>
        </div>
      {/* Search + Filter UI */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        {/* Search Input */}
        <div className="w-full sm:w-2/3 relative">
          <input
            type="text"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>

        {/* Type Filter Dropdown */}
        <div className="w-full sm:w-1/3 relative">
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as 'All' | 'Internship' | 'Full-time')
            }
            className="w-full px-4 py-3 border rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="All">All</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Loading state */}
      {loading && <p className="text-center text-gray-500">Loading opportunities...</p>}

      {/* Jobs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between bg-white"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  {isNewJob(job.postedAt) && (
                    <span className="text-green-600 text-sm font-semibold">New!</span>
                  )}
                </div>

                <p className="text-gray-600 font-medium">{job.company}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{job.eligibility}</span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm">{job.type}</p>
              </div>

              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-4"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
      </div>

      {/* Empty state */}
      {!loading && filteredJobs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No active opportunities right now.</p>
      )}
    </div>
  );
}
