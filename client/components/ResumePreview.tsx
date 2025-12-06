import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import CleanTemplate from "./templates/CleanTemplate";
import RetroTemplate from "./templates/RetroTemplate";
import BoldTemplate from "./templates/BoldTemplate";

export default function ResumePreview({ resume }: any) {
  const templates: any = {
    classic: <ClassicTemplate resume={resume} />,
    minimal: <MinimalTemplate resume={resume} />,
    clean: <CleanTemplate resume={resume} />,
    retro: <RetroTemplate resume={resume} />,
    bold: <BoldTemplate resume={resume} />,
  };

  return (
    <div className="w-full flex justify-center">
      <div className="
        w-full max-w-[800px] bg-white 
        border-4 border-[#0D0D0D] 
        shadow-[10px_10px_0_#0D0D0D] 
        rounded-xl p-10
      ">
        {templates[resume.template]}
      </div>
    </div>
  );
}
