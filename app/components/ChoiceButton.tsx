import { Button } from '@/components/ui/button';
type ChoiceButtonProps = {
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export default function ChoiceButton({
  children,
  className,
  ...props
}: ChoiceButtonProps) {
  return (
    <Button
      variant="outline"
      className={`cursor-pointer ${className ?? ''}`}
      {...props}
    >
      {children}
    </Button>
  );
}
