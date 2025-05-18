import { Info } from "phosphor-react";
import { useEffect } from "react";
import { ToastContainer } from "./style";

type ToastType = "success" | "error" | "info";

interface MessageBoxProps {
  type: ToastType;
  title: string;
  message: string;
  onClose: () => void;
}

export function ToastMessage({
  type,
  title,
  message,
  onClose,
}: MessageBoxProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer type={type}>
      <div>
        <Info size={18} />
      </div>
      <div>
        <p>
          <strong>{title}</strong>
        </p>
        <p>{message}</p>
      </div>
    </ToastContainer>
  );
}
