// src/components/LayoutWrapper.jsx
export default function LayoutWrapper({ children, className = "" }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}