# Aditya Kumar - Portfolio

![Portfolio Preview](./public/assets/profile/profile.png)

## Overview
This is the personal portfolio of Aditya Kumar, a Software Engineer and Full-Stack Developer currently studying Computer Science at Lovely Professional University. The portfolio showcases my skills, experience, and major projects, demonstrating my ability to build scalable, full-stack web applications.

**Live Website:** [https://thisisaditya.vercel.app](https://thisisaditya.vercel.app)

## Features
- **Modern UI/UX:** A sleek, dark-themed minimal design with subtle animations.
- **Responsive Layout:** Works flawlessly across desktops, tablets, and mobile devices.
- **Custom Cursor & Smooth Scrolling:** Incorporates custom user interactions for a premium feel.
- **Dynamic Projects Showcase:** Displays key projects with tech stacks and links.
- **Integrated Contact Form:** Uses EmailJS to seamlessly handle inquiries without a dedicated backend.

## Tech Stack
- **Framework:** Next.js (React 19)
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React & React Icons
- **Scrolling:** Lenis (React-Lenis)
- **Email:** EmailJS

## Architecture & Project Structure
- src/app/ - Next.js App Router (Layouts, Pages, SEO configs).
- src/components/ - Reusable UI components and major sections (Hero, About, Projects, etc.).
- src/data/ - JSON files storing dynamic content (Personal info, Skills, Projects) allowing for easy future expansion without modifying the React code.
- public/ - Static assets including images, CV, and videos.

## SEO
The portfolio follows strict SEO guidelines:
- **Metadata:** Dynamic metadata with title, description, and keywords configured in Next.js.
- **Canonical URLs:** Properly defined to avoid duplicate content indexing.
- **Sitemap & Robots.txt:** Auto-generated structured for search engines.
- **Structured Data:** Uses JSON-LD (Schema.org Person) on the homepage to accurately reflect the developer's identity.
- **Open Graph & Twitter Cards:** Configured with a default profile image to ensure excellent preview rendering when sharing on social media.
- **Semantic HTML:** Proper use of <main>, <section>, <header>, <h1>, <h2>, and <nav> tags.

## Performance
- Font optimization with @fontsource-variable.
- Efficient client-side components wrapped carefully.
- Native system cursor overridden responsibly.

## Accessibility
- Proper ARIA attributes and focus management.
- Responsive design ensuring zoom scaling without breaking the layout.
- High contrast default colors.

## Development

1. Clone the repository:
   `ash
   git clone https://github.com/adityak71/portfolio.git
   cd portfolio
   `

2. Install dependencies:
   `ash
   npm install
   `

3. Setup environment variables by copying .env.example:
   `ash
   cp .env.example .env.local
   `
   Add your valid EmailJS credentials.

4. Start the development server:
   `ash
   npm run dev
   `

## Environment Variables
- NEXT_PUBLIC_EMAILJS_SERVICE_ID
- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

Do NOT expose your real values in GitHub. A .env.example file is provided for reference.

## Deployment
Deployed on [Vercel](https://vercel.com).
To deploy, connect your GitHub repository to Vercel and it will automatically handle the build commands (
pm run build) and deployment configurations.

## Future Improvements
- **High Priority:**
  - Add more detailed technical writeups and project case studies.
  - Expand the Experience section as professional experience grows.
- **Medium Priority:**
  - Introduce an engineering blog/articles section to share learnings.
  - Implement dynamic project data fetching via a headless CMS.
- **Low Priority:**
  - Add GitHub activity stats / heatmaps.
  - Multi-language support.

