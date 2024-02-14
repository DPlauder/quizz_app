import useQuestions from "./useQuestions";
import QuestionItem from "./QuestionItem";
import { Grid, Fab, Container, Button } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { IQuestion } from "./ts/interfaces/global_interfaces";
import FormEdit from "./FormEdit";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import ResultDialog from "./ResultDialog";

export default function QuestionList() {
  const [questions, handleAdd, handleDelete] = useQuestions();
  const [formDialog, setFormDialog] = useState<{
    open: boolean;
    question?: IQuestion;
    isNew?: boolean;
    id?: string;
  }>({ open: false, isNew: true });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    question: IQuestion | null;
  }>({ open: false, question: null });
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [points, setPoints] = useState(0);

  const handleDialog = (open: boolean, question: IQuestion) => {
    if (open) {
      setDeleteDialog({ open: true, question });
    } else {
      setDeleteDialog({ open: false, question: null });
    }
  };
  const handleEditDialog = (open: boolean, question: IQuestion) => {
    console.log("hello edit", question);
    if (open) {
      setFormDialog({ open: true, question, id: question.id });
    } else {
      setFormDialog({ open: false, question: undefined });
    }
  };
  const [chosenAnswers, setChosenAnswers] = useState<IQuestion[]>([]);

  const clickButtonHandler = (question: IQuestion) => {
    const index = chosenAnswers.findIndex(
      (answer) => question.id === answer.id
    );
    if (index !== -1) {
      const copyAnswer = [...chosenAnswers];
      copyAnswer[index].chosenAnswere = question.chosenAnswere;
      setChosenAnswers(copyAnswer);
    } else {
      setChosenAnswers([...chosenAnswers, question]);
    }
  };

  const handleCheckAnswers = () => {
    let totalPoints = 0;

    chosenAnswers.map((question) => {
      if (question.answerTrue === question.chosenAnswere) {
        totalPoints += 1;
      }
    });

    setPoints(totalPoints);
    setResultDialogOpen(true);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {" "}
        {(questions as IQuestion[]).map((question: IQuestion): JSX.Element => {
          return (
            <QuestionItem
              key={question.id}
              questionText={question.questionText}
              answerTrue={question.answerTrue}
              answerWrong1={question.answerWrong1}
              answerWrong2={question.answerWrong2}
              answerWrong3={question.answerWrong3}
              question={question}
              onDialog={handleDialog}
              onEdit={handleEditDialog}
              onClicked={clickButtonHandler}
            />
          );
        })}
      </Grid>
      <DeleteDialog
        title="Delete Element"
        text={`Do you really want to delete question "${deleteDialog.question?.questionText}"`}
        open={deleteDialog.open}
        onConfirm={(isComfirmed) => {
          if (isComfirmed && deleteDialog.question) {
            (handleDelete as (question: IQuestion) => Promise<void>)(
              deleteDialog.question
            );
          }
          setDeleteDialog({ open: false, question: null });
        }}
      ></DeleteDialog>
      <FormEdit
        onSave={(question: IQuestion) => {
          setFormDialog({
            open: false,
            question: undefined,
            isNew: false,
            id: question.id,
          });
          (
            handleAdd as (
              question: IQuestion,
              isNew: boolean,
              id: string
            ) => Promise<void>
          )(question, formDialog.isNew!, formDialog.id!);
        }}
        open={formDialog.open}
        onClose={() => setFormDialog({ open: false, question: undefined })}
        question={formDialog.question}
      ></FormEdit>
      <Fab
        color="primary"
        onClick={() => {
          setFormDialog({ open: true, question: undefined, isNew: true });
        }}
        sx={{
          position: "fixed",
          right: "50%",
          bottom: "10%",
          transform: "translateX(-50%)",
        }}
      >
        <Add />
      </Fab>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckAnswers}
        sx={{
          position: "fixed",
          right: "50%",
          bottom: "20%",
          transform: "translateX(-50%)",
        }}
      >
        Check Answers
      </Button>
      <ResultDialog
        open={resultDialogOpen}
        points={points}
        onClose={setResultDialogOpen}
      />
    </Container>
  );
}
