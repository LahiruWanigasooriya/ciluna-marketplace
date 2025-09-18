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


const Title: React.FC<LabelProps> = ({ className='text-[24px] sm:text-[40px] lg:text-[52px]', title }) => {

  return (
    <span className={cn(" font-kaiseiBold font-[700] text-center text-[24px] sm:text-[40px] lg:text-[52px] lg:leading-[60px] text-[#252525]", className)}>
      {title}
    </span>
  );
};

export default Title;

