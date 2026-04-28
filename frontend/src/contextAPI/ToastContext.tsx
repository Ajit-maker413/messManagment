import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3200);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div style={{ ...containerStyle, borderColor: toast.type === "error" ? "#e74c3c" : toast.type === "success" ? "#2ecc71" : "#3498db" }}>
          <span style={{ fontWeight: 700, marginRight: 8 }}>{toast.type.toUpperCase()}:</span>
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

const containerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 24,
  right: 24,
  backgroundColor: "white",
  color: "#111",
  border: "1px solid",
  borderRadius: 12,
  padding: "14px 18px",
  boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
  zIndex: 1100,
  minWidth: 260,
  maxWidth: 360,
  lineHeight: 1.4,
};
