import {AlertTriangle} from "lucide-react";
type Props = {
  message?: string;
};
function FormError({message}: Props) {
  if (!message) return;
  return (
    <div className="p-3 bg-rose-500/15 text-rose-500 flex space-x-2">
      <AlertTriangle className="size-4 " />
      <p className="text-sm font-medium"> {message}</p>
    </div>
  );
}

export default FormError;
