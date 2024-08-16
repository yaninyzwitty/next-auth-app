import {CheckCircle2Icon} from "lucide-react";
type Props = {
  message?: string;
};
function FormSuccess({message}: Props) {
  if (!message) return;
  return (
    <div className="p-3 bg-emerald-500/15 text-emerald-500 flex space-x-2">
      <CheckCircle2Icon className="size-4 " />
      <p className="text-sm font-medium"> {message}</p>
    </div>
  );
}

export default FormSuccess;
