import {
  Card,
  CardContent,
  IconButton,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { IQuestion } from "./ts/interfaces/global_interfaces";

interface Props {
  question: IQuestion;
  //handleClick: (isRight: boolean) => void;
}

export default function QuestionItem({ question }: Props) {
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Typography>{question.text}</Typography>
          <Button>{question.answerWrong1}</Button>
          <Button>{question.answerWrong2}</Button>
          <Button>{question.answerTrue}</Button>
          <Button>{question.answerWrong3}</Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
