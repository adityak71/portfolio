import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { MotionPreferenceProvider } from '@/hooks/useMotionPreference';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://thisisaditya.vercel.app'),
  title: {
    default: 'Aditya Kumar | Software Engineer & Full-Stack Developer',
    template: '%s | Aditya Kumar',
  },
  description:
    'Aditya Kumar is a Full-Stack Developer & Computer Science student building scalable applications with Next.js, React, Node.js, and PostgreSQL.',
  keywords: [
    'Aditya Kumar',
    'Software Engineer',
    'Full-Stack Developer',
    'Web Developer',
    'Next.js',
    'React',
    'Node.js',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Aditya Kumar', url: 'https://thisisaditya.vercel.app' }],
  creator: 'Aditya Kumar',
  publisher: 'Aditya Kumar',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thisisaditya.vercel.app',
    title: 'Aditya Kumar | Software Engineer & Full-Stack Developer',
    description:
      'Full-stack applications with Next.js, React, Node.js, and PostgreSQL. View my projects, skills, and resume.',
    siteName: 'Aditya Kumar Portfolio',
    images: [
      {
        url: '/assets/profile/profile.png',
        width: 800,
        height: 600,
        alt: 'Aditya Kumar - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Kumar | Software Engineer & Full-Stack Developer',
    description:
      'Full-stack applications with Next.js, React, Node.js, and PostgreSQL. View my projects, skills, and resume.',
    images: ['/assets/profile/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aditya Kumar',
    url: 'https://thisisaditya.vercel.app',
    image: 'https://thisisaditya.vercel.app/assets/profile/profile.png',
    sameAs: [
      'https://github.com/adityak71',
      'https://linkedin.com/in/adityak71'
    ],
    jobTitle: 'Software Engineer & Full-Stack Developer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Lovely Professional University'
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <MotionPreferenceProvider>
          {children}
        </MotionPreferenceProvider>
        <Analytics />
      </body>
    </html>
  );
}

