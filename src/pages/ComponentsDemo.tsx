import { useState } from "react";
import { Code } from "lucide-react";
import CodeBlock from "@/components/Personal/CodeBlock";

interface ComponentDemoProps {
  children?: React.ReactNode;
  code: string;
  showCode?: boolean;
}

const ComponentDemo = ({ children, code }: ComponentDemoProps) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  return (
    <div
      className="rounded-lg overflow-hidden shadow-sm border transition-colors duration-250"
      style={{
        backgroundColor: "var(--preview-bg)",
        borderColor: "var(--preview-border)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 border-b transition-colors duration-250"
        style={{
          backgroundColor: "var(--preview-header-bg)",
          borderColor: "var(--preview-border)",
        }}
      >
        <span
          className="text-sm font-medium"
          style={{ color: "var(--preview-text)" }}
        >
          Preview
        </span>
        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors duration-250"
          style={{
            backgroundColor: "var(--preview-btn-bg)",
            color: "var(--preview-text)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--preview-btn-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--preview-btn-bg)";
          }}
        >
          <Code size={14} />
          {isCodeVisible ? "Hide Code" : "View Code"}
        </button>
      </div>

      <div
        className="py-20 px-4 flex items-center justify-center transition-colors duration-250"
        style={{
          backgroundColor: "var(--preview-bg)",
          color: "var(--text-color)",
        }}
      >
        {children}
      </div>

      {isCodeVisible && (
        <div
          className="border-t transition-colors duration-250"
          style={{ borderColor: "var(--preview-border)" }}
        >
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;
