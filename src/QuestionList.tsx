import useQuestions from "./useQuestions";
import QuestionItem from "./QuestionItem";
import { Grid } from "@mui/material";
import { IQuestion } from "./ts/interfaces/global_interfaces";

export default function QuestionList() {
  const [questions] = useQuestions();
  console.log(questions);
  return( <Grid container spacing={2}>
    {" "}
    {(questions as IQuestion[])
      .map((question: IQuestion): JSX.Element => {
        return (
          <QuestionItem
            key={question.id}
            text={question.text}
            answerTrue= {question.answerTrue}
            answerWrong1 =  {question.answerWrong1}
            answerWrong2 = {question.answerWrong2}
            answerWrong3 = {question.answerWrong3}
          />
        );
      })}
  </Grid>
}