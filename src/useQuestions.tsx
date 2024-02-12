import { useState, useEffect } from "react";
import { IQuestion } from "./ts/interfaces/global_interfaces";

export default function useQuestions() {
  const [questions, setQuestion] = useState<IQuestion[]>([]);
  const [err, setErr] = useState<Error | null>(null);

  useEffect(() => {
    const options = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    (async () => {
      try {
        const data = await fetch("/questions", options);
        if (!data.ok) {
          throw new Error("Sorry, we couldn't connect to our server!");
        }
        setQuestion((await data.json()) as IQuestion[]);
      } catch (error) {
        setErr(error as Error);
      }
    })();
  }, [setQuestion]);
  return [questions];
}
