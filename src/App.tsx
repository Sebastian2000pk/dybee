import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { VITE_API_URL } from "./config";

function App() {
  const [concepts, setConcepts] = useState<string>("");

  const getTasks = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${VITE_API_URL}/tasks/today`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("🥑 ~ getTasks ~ data:", data);
    setConcepts(data.concepts);
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
      <div style={{ textAlign: "left", padding: "1rem 2rem" }}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {concepts}
        </ReactMarkdown>
      </div>
    </>
  );
}

export default App;
