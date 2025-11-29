# **Portfolio Website**

This repository contains the source code for the personal portfolio website of **Raja Babu Dubey**, a Senior Software Engineer specializing in UI, scalable frontend architectures, and performance optimization.

The project is built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, focusing on a clean, dark-themed aesthetic with smooth, professional animations.

## **🚀 Features**

* **JSON-Driven Content**: All text, projects, experience, and skills are stored in a central portfolioData object within Portfolio.tsx. Updating the site is as simple as editing this JSON structure.  
* **Reactive & Responsive**: Fully responsive design that works seamlessly on mobile, tablet, and desktop.  
* **Smooth Animations**: Utilizes framer-motion for scroll-triggered reveal animations and interactive hover states.  
* **Dark Mode Aesthetic**: A sleek, high-contrast dark theme with gradient accents (Red/Blue/Purple).  
* **Dynamic Navigation**: The navbar automatically resizes and changes opacity upon scrolling.  
* **Optimized Performance**: Uses lightweight icons from lucide-react and native CSS transitions.

## **🛠️ Tech Stack**

* **Frontend Library**: React (v18+)  
* **Language**: TypeScript  
* **Styling**: Tailwind CSS  
* **Animations**: Framer Motion  
* **Icons**: Lucide React

## **📂 Project Structure**

The entire application logic resides in a single, self-contained file for ease of portability in this environment, but logically it is structured as follows:

* **portfolioData**: The "Database" of the site. Modify this object to update:  
  * Personal Info (Name, Title, Links)  
  * Hero Section Text  
  * Skills List  
  * Experience Timeline  
  * Project Showcases  
  * Education Details  
* **Components**:  
  * Navbar: Responsive navigation with mobile drawer.  
  * Hero: Introduction with animated badges and CTAs.  
  * Expertise: Grid layout for technical skills.  
  * ResumePreview: A stylized, paper-like preview of the resume content.  
  * Experience: Vertical timeline of professional history.  
  * Projects: Grid of project cards with hover effects.  
  * Education: List of academic background.  
  * Contact: Contact form and social links.

## **🔧 Setup & Installation**

To run this project locally:

1. **Install Dependencies**:  
   npm install react react-dom framer-motion lucide-react  
   \# Ensure Tailwind CSS is configured in your project

2. **Run Development Server**:  
   npm run dev

## **📝 Customization**

To customize the content, locate the portfolioData constant at the top of Portfolio.tsx:

const portfolioData \= {  
  personal: {  
    name: "Your Name",  
    title: "Your Title",  
    // ...  
  },  
  // ...  
};

Changes made here will instantly reflect across the entire website.