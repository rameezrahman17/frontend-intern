import * as Icons from 'lucide-react';

interface Props {
  name: string;
  size?: number;
  className?: string;
}

export default function DynamicIcon({ name, size = 24, className = '' }: Props) {
  const Icon = (Icons as Record<string, any>)[name.trim()] ?? Icons.BookOpen;
  return <Icon size={size} className={className} />;
}
