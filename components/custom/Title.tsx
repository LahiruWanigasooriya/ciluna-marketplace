import { cn } from "@/utils/classes"; 
interface LabelProps {
  className?: string;
  title: string;
}

const Title: React.FC<LabelProps> = ({ className='text-base lg:text-2xl', title }) => {
  return (
    <span className={cn(" font-interSemiBold font-[700] text-base lg:text-2xl", className)}>
      {title}
    </span>
  );
};

export default Title;
