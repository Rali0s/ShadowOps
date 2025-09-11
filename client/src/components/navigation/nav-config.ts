import { 
  Brain, 
  Target, 
  BookOpen, 
  Settings, 
  Zap, 
  FileText, 
  Home,
  GraduationCap,
  FlaskConical
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: any;
  protected: boolean;
  description?: string;
}

export const navigationConfig: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    protected: false,
    description: 'Landing page'
  },
  {
    href: '/blackbriar-training',
    label: 'Blackbriar Training',
    icon: Target,
    protected: true,
    description: 'HUMINT protocols'
  },
  {
    href: '/ops-manual',
    label: 'Ops Manual',
    icon: BookOpen,
    protected: true,
    description: 'Operational guides'
  },
  {
    href: '/neural-matrix',
    label: 'Neural Matrix',
    icon: Brain,
    protected: true,
    description: 'Core system'
  },
  {
    href: '/frequency-generator',
    label: 'Frequency Generator',
    icon: Zap,
    protected: true,
    description: 'Binaural beats'
  },
  {
    href: '/ksp-dossier',
    label: 'KSP Dossier',
    icon: FileText,
    protected: true,
    description: 'Classified docs'
  },
  {
    href: '/scientific-method',
    label: 'Scientific Method',
    icon: Settings,
    protected: true,
    description: 'Research methodology'
  },
  {
    href: '/education',
    label: 'Education Materials',
    icon: GraduationCap,
    protected: true,
    description: 'Training resources'
  },
  {
    href: '/methodology',
    label: 'Methodology',
    icon: FlaskConical,
    protected: true,
    description: 'Research methods'
  }
];