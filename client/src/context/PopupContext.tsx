import { createContext, useContext, useState } from "react";
import UserDetailsPopup from "@/components/UserDetailsPopup";

const PopupContext = createContext<any>(null);

export const PopupProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [onSubmitCallback, setOnSubmitCallback] = useState<any>(null);

  const openPopup = (callback: any) => {
    setOnSubmitCallback(() => callback);
    setOpen(true);
  };

  return (
    <PopupContext.Provider value={{ openPopup }}>
      {children}

      <UserDetailsPopup
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data: any) => {
          if (onSubmitCallback) onSubmitCallback(data);
          setOpen(false);
        }}
      />
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
