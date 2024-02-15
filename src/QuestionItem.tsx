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
import { useState } from "react";

interface Props {
  questionText: string;
  answerTrue: string;
  answerWrong1: string;
  answerWrong2: string;
  answerWrong3: string;
  question: IQuestion;
  onDialog: (open: boolean, question: IQuestion) => void;
  onEdit: (open: boolean, question: IQuestion) => void;
  onClicked: (question: IQuestion) => void;
}

export default function QuestionItem(props: Props) {
  const [selectedButton, setSelectedButton] = useState<{
    id: number;
  }>({
    id: 0,
  });

  const handleButtonClick = (buttonID: number) => {
    if (selectedButton.id === buttonID) {
      setSelectedButton({ id: 0 });
    } else {
      setSelectedButton({ id: buttonID });
    }
  };
  return (
    <Container sx={{ width: "30%", margin: "1.5%" }}>
      <Grid item>
        <Card>
          <CardContent sx={{ padding: "10px, 5px" }}>
            <Typography sx={{ textAlign: "center" }}>
              {props.questionText}
            </Typography>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                className={selectedButton.id === 1 ? "selected" : ""}
                onClick={() => {
                  handleButtonClick(1);
                  props.question.chosenAnswere = props.answerWrong1;
                  props.onClicked(props.question);
                }}
              >
                {props.answerWrong1}
              </Button>
              <Button
                className={selectedButton.id === 2 ? "selected" : ""}
                onClick={() => {
                  handleButtonClick(2);
                  props.question.chosenAnswere = props.answerWrong2;
                  props.onClicked(props.question);
                }}
              >
                {props.answerWrong2}
              </Button>
              <Button
                className={selectedButton.id === 3 ? "selected" : ""}
                onClick={() => {
                  handleButtonClick(3);
                  props.question.chosenAnswere = props.answerTrue;
                  props.onClicked(props.question);
                }}
              >
                {props.answerTrue}
              </Button>
              <Button
                className={selectedButton.id === 4 ? "selected" : ""}
                onClick={() => {
                  handleButtonClick(4);
                  props.question.chosenAnswere = props.answerWrong3;
                  props.onClicked(props.question);
                }}
              >
                {props.answerWrong3}
              </Button>
            </Container>
          </CardContent>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
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
          </Container>
        </Card>
      </Grid>
    </Container>
  );
}
