import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className = '', size = 24 }: DynamicIconProps) {
  // Map database string to standard Lucide icons
  // Standardize naming (e.g. Brain, Atom, Server, Code)
  const iconName = name.trim();
  
  // Resolve component dynamically
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.BookOpen;

  return <IconComponent className={className} size={size} />;
}
