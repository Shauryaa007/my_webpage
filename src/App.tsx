import { About } from './components/About';
import { Community } from './components/Community';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { JobOpportunities } from './components/JobOpportunities';
import { LastYoutubeVideosEmbed } from './components/LastYoutubeVideosEmbed';
import { LinkedInPosts } from './components/LinkedInPosts';
// import { SocialLinks } from './components/SocialLinks';
import { YouTubeCourses } from './components/YouTubeCourses';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <LastYoutubeVideosEmbed/>
      {/* <SocialLinks /> */}
      <JobOpportunities />
      <YouTubeCourses />
      <LinkedInPosts />
      <Community />
      <Footer />
    </div>
  );
}

export default App;
