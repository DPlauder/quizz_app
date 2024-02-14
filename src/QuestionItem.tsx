import { IQuestion } from "./ts/interfaces/global_interfaces";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";

interface Props {
  questionText: string;
  answerTrue: string;
  answerWrong1: string;
  answerWrong2: string;
  answerWrong3: string;
  question: IQuestion;
  onDialog: (open: boolean, question: IQuestion) => void;
  onEdit: (open: boolean, question: IQuestion) => void;

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
          <IconButton
            color="primary"
            aria-label="delete-question"
            onClick={() => {
              props.onDialog(true, props.question);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="edit-movie"
            onClick={() => props.onEdit(true, props.question)}
          >
            <Edit />
          </IconButton>
        </Card>
      </Grid>
    </Container>
  );
}
