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

  async function handleAdd(
    question: IQuestion,
    isNew: boolean = false,
    id?: string
  ): Promise<void> {
    let method = "POST";
    let url = "/questions";
    if (!isNew) {
      method = "PUT";
      url += `/${id}`;
    }
    if (isNew) question.id = Math.floor(Math.random() * 999999999).toString();
    const options = {
      method,
      body: JSON.stringify(question),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(url, options);
    const data = await res.json();

    if (!isNew) {
      setQuestion((prevQuestion) =>
        prevQuestion?.map((prevQuestion) => {
          if (prevQuestion.id === id) {
            return data;
          }
          return prevQuestion;
        })
      );
    } else {
      setQuestion((prevQuestion) => [...prevQuestion, data]);
    }
  }

  async function handleDelete(question: IQuestion) {
    console.log("hello delete", question.id);
    const options = {
      method: "DELETE",
    };
    const res = await fetch(`/questions/${question.id}`, options);
    if (res.ok) {
      setQuestion((prevQuestion) =>
        prevQuestion.filter((prevQuestion) => prevQuestion.id != question.id)
      );
    }
  }
  return [questions, handleAdd, handleDelete];
}
