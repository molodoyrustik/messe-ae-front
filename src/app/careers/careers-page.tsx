'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Header from '@/components/Header';
import FooterSection from '@/components/landing/FooterSection';
import JobCard, { Job } from '@/components/JobCard';
import JobCardMobile from '@/components/JobCardMobile';
import JobModal from '@/components/JobModal';

// Mock jobs data - only 3 jobs as per design
const jobs: Job[] = [
  {
    id: '1',
    title: 'Quantity surveyor',
    department: 'Operations',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '5+ years',
    description: 'As a Quantity Surveyor specialized in events and exhibitions, you will play a crucial role in managing the costs and budgets associated with our projects. You will work closely with the project management team to ensure that financial aspects are meticulously controlled, and resources are optimally allocated. Your expertise will be instrumental in ensuring the profitability and success of our events and exhibitions.',
    requirements: [
      'Bachelors degree in Quantity Surveying, Construction Management, or a related field',
      'Membership in the Society of Engineers – UAE is mandatory',
      'Proven experience as a Quantity Surveyor, preferably with a focus on events and exhibitions',
      'AutoCAD proficiency',
      'Proficiency in using quantity surveying software and tools',
      'Strong analytical and numerical skills, with attention to detail',
      'Excellent communication and negotiation abilities',
      'Knowledge of relevant building codes, regulations, and industry standards'
    ],
    responsibilities: [
      'Prepare accurate and detailed cost estimates for events and exhibition projects',
      'Develop and manage project budgets, ensuring alignment with client expectations and company profitability targets',
      'Oversee the tendering process, including the preparation of tender documents, evaluation of bids, and negotiation with suppliers and contractors',
      'Source and select subcontractors, suppliers, and vendors based on cost, quality, and reliability',
      'Administer contracts and agreements with subcontractors, suppliers, and vendors',
      'Ensure compliance with contractual terms and conditions, and manage variations as required',
      'Monitor project costs and expenditures against approved budgets',
      'Provide regular financial reports to project management, highlighting any variances and proposing corrective actions',
      'Identify opportunities for cost optimization and value engineering without compromising quality or client satisfaction',
      'Identify potential risks related to costs, and develop strategies to mitigate them',
      'Maintain a proactive approach to risk management throughout the project lifecycle',
      'Maintain accurate and organized records of all financial transactions, contracts, and project-related documentation'
    ],
  },
  {
    id: '2',
    title: 'Project manager',
    department: 'Operations',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'Serve as the lead point of contact for all customer account management matters, Build and maintain strong, long-lasting client relationships, Negotiate contracts and close agreements to maximize profits',
    requirements: [
      'Experience in Project Management in the Exhibition or Event industry over 3 years',
      'Intermediate proficiency in architect software (CAD)',
      'Intermediate proficiency in graphic design software (Photoshop, Adobe Illustrator)',
      'Excellent interpersonal, presentation and communication skills with the ability to interact with residential and commercial clients, contractors, and suppliers confidently',
      'Ability to manage multiple project requirements concurrently',
      'MS Office proficiency, with a solid working knowledge of Excel',
      'Knowledge of mid-large scale B2B exhibitions and conferences',
      'A hands-on approach and an excellent problem solver',
      'English language level B2 and above',
      'A valid UAE driving license is mandatory. Currently residing in UAE',
      'Ability to work over the weekends if necessary',
      'Bachelor\'s degree'
    ],
    responsibilities: [
      'Serve as the lead point of contact for all customer account management matters',
      'Build and maintain strong, long-lasting client relationships',
      'Negotiate contracts and close agreements to maximize profits',
      'Develop trusted advisor relationships with key accounts, customer stakeholders and executive sponsors',
      'Ensure the timely and successful delivery of our solutions according to customer needs and objectives',
      'Develop new business with existing clients and/or identify areas of improvement to meet sales quotas',
      'Prepare reports on account status',
      'Collaborate with the sales team to identify and grow opportunities within the territory',
      'Being metrics-driven with strong ownership and focus',
      'Assist with challenging client requests or issue escalations as needed',
      'Coordinate with Account Executives to create customized sales plans for key clients'
    ],
  },
  {
    id: '3',
    title: 'Equipment Design Engineer',
    department: 'Engineering',
    location: 'Dubai, UAE',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'We are looking for a technically skilled Equipment Design Engineer for Exhibition Stands to join our dynamic team. In this role, you will be responsible for conceptualizing, designing and ensuring completion drawings on time. You will work closely with project manager, production team and other stakeholders to ensure that all design requirements are met and that the final product aligns with the client\'s vision. You will be expected to provide guidance and support to the production team throughout the project lifecycle.',
    requirements: [
      'Strong understanding of design principles and production processes',
      'Proficiency in design software and tools: AutoCAD (SOLIDWORKS and Bazis Mebelshik is a plus)',
      'Knowledge of safety regulations and standards',
      'Ability to work effectively under pressure and meet tight deadlines. Readiness for overtime',
      'Attention to detail and a keen eye for quality and details',
      'Flexibility to work evenings, weekends, and holidays as required',
      'Fluency in English (Russian is a plus)',
      'UAE driving license and personal car required'
    ],
    responsibilities: [
      'Create detailed technical drawings and specifications for exhibition equipment in specialized programs',
      'Prepare a list of materials and accessories necessary for purchasing and creating exhibition equipment',
      'Close interaction with the production team on the production',
      'Oversee the installation and dismantling of exhibition stands and equipment',
      'Ensure all technical aspects of the exhibition stands and equipment are integrated and functioning properly',
      'Manage project timelines to ensure on-time delivery',
      'Ensure compliance with safety regulations and standards',
      'Maintain accurate project documentation and records'
    ],
  },
];

export default function CareersPageContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Header />
      
      {/* Hero Section - Mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, pt: '1.5rem' }}>
        {/* Title and Description */}
        <Box sx={{ mb: '2rem', px: '1rem' }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 700,
              fontSize: '2.25rem',
              lineHeight: '2.75rem',
              color: '#262626',
              mb: '1rem',
            }}
          >
            Join our team
          </Typography>

          <Typography
            component="div"
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              letterSpacing: '0.02rem',
              color: '#000',
              '& .company-name': {
                color: '#262626',
                fontWeight: 400,
              },
              '& .email-link': {
                color: '#656CAF',
                fontWeight: 700,
                textDecoration: 'underline',
              },
            }}
          >
            At <span className="company-name">messe.ae</span>, we believe that our success is driven by our people. We are always on the lookout for talented, passionate and entrepreneurial exhibition professionals who share our commitment to excellence.
            <br /><br />
            As a member of our team, you will have the opportunity to work on exciting projects across the globe, delivering quality exhibition solutions that exceed our clients&apos; expectations. We offer a collaborative and supportive work environment where innovation and creativity are encouraged and rewarded.
            <br /><br />
            If you are looking for a company where you can achieve your greatest career goals and ambitions, we would love to hear from you. Please send your resume to <span className="email-link">hello@messe.ae</span> and let&apos;s start the conversation.
            <br /><br />
            Join us in our journey to shape the future of exhibitions!
          </Typography>
        </Box>

        {/* Image - Full Width */}
        <Box
          sx={{
            width: '100%',
            aspectRatio: '896 / 464',
            overflow: 'hidden',
            backgroundColor: '#F5F5F5',
            mb: '1.5rem',
          }}
        >
          <Box
            component="img"
            src="/careers.png"
            alt="Join our team"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>

      {/* Hero Section - Desktop */}
      <Container maxWidth="xl" sx={{ display: { xs: 'none', md: 'block' }, pt: '3.75rem', pb: '4rem', px: { xs: '1rem', md: '2.5rem' } }}>
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              alignItems: 'stretch',
              mb: '3.375rem',
            }}
          >
            {/* Left Content Block */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* Title */}
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 700,
                  fontSize: '3rem',
                  lineHeight: '3.75rem',
                  color: '#262626',
                  mb: '0.75rem',
                }}
              >
                Join our team
              </Typography>

              {/* Description */}
              <Typography
                component="div"
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 400,
                  fontSize: '1rem',
                  fontStyle: 'normal',
                  lineHeight: '1.5rem',
                  letterSpacing: '0.02rem',
                  color: '#000',
                  '& .company-name': {
                    color: '#262626',
                    fontWeight: 400,
                  },
                  '& .email-link': {
                    color: '#656CAF',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  },
                }}
              >
                At <span className="company-name">messe.ae</span>, we believe that our success is driven by our people. We are always on the lookout for talented, passionate and entrepreneurial exhibition professionals who share our commitment to excellence.
                <br /><br />
                As a member of our team, you will have the opportunity to work on exciting projects across the globe, delivering quality exhibition solutions that exceed our clients&apos; expectations. We offer a collaborative and supportive work environment where innovation and creativity are encouraged and rewarded.
                <br /><br />
                If you are looking for a company where you can achieve your greatest career goals and ambitions, we would love to hear from you. Please send your resume to <span className="email-link">hello@messe.ae</span> and let&apos;s start the conversation.
                <br /><br />
                Join us in our journey to shape the future of exhibitions!
              </Typography>
            </Box>

            {/* Right Image */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                gridColumn: 'span 2',
                aspectRatio: '896 / 464',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                backgroundColor: '#F5F5F5',
              }}
            >
              <Image
                src="/careers.png"
                alt="Join our team"
                fill
                style={{
                  objectFit: 'cover',
                }}
                priority
              />
            </Box>
          </Box>

          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', md: '2.25rem' },
              lineHeight: { xs: '2rem', md: '2.5rem' },
              letterSpacing: '0.01em',
              color: '#262626',
              mb: { xs: '1rem', md: '2rem' },
            }}
          >
            Our vacancies
          </Typography>

          {/* Desktop Job Cards Grid */}
          <Box
            sx={{
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
            }}
          >
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={() => handleJobClick(job)} />
            ))}
          </Box>
      </Container>

      {/* Mobile Vacancies Section */}
      <Container maxWidth="xl" sx={{ display: { xs: 'block', md: 'none' }, pb: 0, px: '1rem' }}>
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 700,
              fontSize: '1.5rem',
              lineHeight: '2rem',
              letterSpacing: '0.01em',
              color: '#262626',
              mt: '1.5rem',
              mb: '1rem',
            }}
          >
            Our vacancies
          </Typography>

          {/* Mobile Job Cards */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              gap: '0.75rem',
              width: '100%',
            }}
          >
            {jobs.map((job) => (
              <JobCardMobile key={job.id} job={job} onClick={() => handleJobClick(job)} />
            ))}
          </Box>
      </Container>

      {/* Job Modal */}
      {selectedJob && (
        <JobModal
          job={selectedJob}
          open={modalOpen}
          onClose={handleCloseModal}
          isMobile={isMobile}
        />
      )}

      <FooterSection />
    </Box>
  );
}