import type { Metadata } from 'next';
import CvShell from './cv-shell';
import { cvData } from './data';

export const metadata: Metadata = {
  title: `${cvData.personalInfo.name} | ${cvData.personalInfo.title}`,
  description: cvData.personalInfo.subtitle,
};

export default function CvPage() {
  return <CvShell />;
}
