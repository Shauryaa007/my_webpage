export interface Job {
  id: string;
  company: string;
  role: string;
  type: 'Internship' | 'Full-time';
  location: string;
  eligibility: string;
  applyLink: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  playlistLink: string;
  thumbnail?: string;
}

export interface LinkedInPost {
  id: string;
  title: string;
  preview: string;
  date: string;
  postLink: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
