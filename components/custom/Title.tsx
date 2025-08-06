import { cn } from "@/utils/classes"; 
interface LabelProps {
  className?: string;
  title: string;
}
const titles=[
  { name: "Mr"},
  { name: "Mrs"},
  { name: "Miss"},
  { name: "Dr"},
];
interface TitleProps{
  value: string;
  onChange: (field:string,value:string)=>void;
}

const Title: React.FC<LabelProps> = ({ className='text-base lg:text-2xl', title }) => {

  return (
    <span className={cn(" font-interSemiBold font-[700] text-base lg:text-2xl", className)}>
      {title}
    </span>
  );
};

export default Title;

