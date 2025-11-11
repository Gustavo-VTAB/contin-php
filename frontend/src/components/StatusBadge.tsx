interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 'active';
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      isActive 
        ? 'bg-green-900 text-green-300' 
        : 'bg-red-900 text-red-300'
    }`}>
      {isActive ? 'Ativo' : 'Inativo'}
    </span>
  );
}