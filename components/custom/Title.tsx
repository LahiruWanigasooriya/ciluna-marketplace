import { cn } from "@/utils/classes"; 
interface LabelProps {
  className?: string;
  title: string;
}

const Title: React.FC<LabelProps> = ({ className='lg:text-[52px]', title }) => {
  return (
    <span className={cn(" font-kaiseiBold font-[700] lg:text-[52px]", className)}>
      {title}
    </span>
  );
};

export default Title;
