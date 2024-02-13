import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Container,
} from "@mui/material";

interface Props {
  questionText: string;
  answerTrue: string;
  answerWrong1: string;
  answerWrong2: string;
  answerWrong3: string;

  //handleClick: (isRight: boolean) => void;
}

export default function QuestionItem(props: Props) {
  return (
    <Container>
      <Grid item>
        <Card>
          <CardContent>
            <Typography>{props.questionText}</Typography>
            <Button>{props.answerWrong1}</Button>
            <Button>{props.answerWrong2}</Button>
            <Button>{props.answerTrue}</Button>
            <Button>{props.answerWrong3}</Button>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
