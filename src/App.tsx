import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { VITE_API_URL } from "./config";

function App() {
  const [concepts, setConcepts] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [studyPlanId, setStudyPlanId] = useState<string>("");

  const completeSession = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${VITE_API_URL}/sessions/complete`, {
    // await fetch(`http://localhost:3000/api/sessions/today`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        sessionId,
        studyPlanId,
      }),
    });
  };

  const getTasks = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${VITE_API_URL}/sessions/today`, {
    // const response = await fetch(`http://localhost:3000/api/sessions/today`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("🥑 ~ getTasks ~ data:", data);
    setConcepts(data.concepts);
    setSessionId(data.sessionId);
    setStudyPlanId(data.studyPlanId);
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

        {sessionId && (
          <div
            style={{
              padding: "1rem 2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={completeSession}>Complete leasson</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
