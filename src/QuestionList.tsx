import useQuestions from "./useQuestions";
import QuestionItem from "./QuestionItem";
import { Grid, Fab, Container } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { IQuestion } from "./ts/interfaces/global_interfaces";
import FormEdit from "./FormEdit";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";

export default function QuestionList() {
  const [questions, handleAdd, handleDelete] = useQuestions();
  const [formDialog, setFormDialog] = useState<{
    open: boolean;
    question?: IQuestion;
    isNew?: boolean;
  }>({ open: false, isNew: true });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    question: IQuestion | null;
  }>({ open: false, question: null });

  const handleDialog = (open: boolean, question: IQuestion) => {
    if (open) {
      setDeleteDialog({ open: true, question });
    } else {
      setDeleteDialog({ open: false, question: null });
    }
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
            (handleDelete as (movie: IQuestion) => Promise<void>)(
              deleteDialog.question
            );
          }
          setDeleteDialog({ open: false, question: null });
        }}
      ></DeleteDialog>
      <FormEdit
        open={formDialog.open}
        onSave={(question: IQuestion) => {
          setFormDialog({ open: false, question: undefined, isNew: false });
          (handleAdd as (question: IQuestion, isNew: boolean) => Promise<void>)(
            question,
            formDialog.isNew!
          );
        }}
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
    </Container>
  );
}
