import { IQuestion } from "./ts/interfaces/global_interfaces";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onSave: (question: IQuestion) => void;
  onClose: (isClosed: boolean) => void;
  question?: IQuestion;
}

export default function FormEdit({ open, onClose, onSave, question }: Props) {
  const { register, handleSubmit, reset } = useForm<IQuestion>({
    defaultValues: question,
  });
  useEffect(() => {
    if (question?.id) {
      reset(question);
    }
  }, [question, reset]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Add new Question"}</DialogTitle>
      <form onSubmit={handleSubmit(onSave)}>
        <DialogContent>
          <TextField
            placeholder="Question"
            {...register("questionText")}
            label="Question"
            sx={{ width: "100%", mb: "30px" }}
          ></TextField>
          <TextField
            placeholder="Right Answere"
            {...register("answerTrue")}
            label="Right Answere"
            sx={{ width: "50%", mb: "10px" }}
          ></TextField>
          <TextField
            placeholder="Wrong Answere"
            {...register("answerWrong1")}
            label="Wrong Answere"
            sx={{ width: "50%", mb: "10px" }}
          ></TextField>
          <TextField
            placeholder="Wrong Answere"
            {...register("answerWrong2")}
            label="Wrong Answere"
            sx={{ width: "50%", mb: "10px" }}
          ></TextField>
          <TextField
            placeholder="Wrong Answere"
            {...register("answerWrong3")}
            label="Wrong Answere"
            sx={{ width: "50%", mb: "10px" }}
          ></TextField>
          <DialogActions>
            <Button color="primary" type="submit">
              Save
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                onClose(false);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
}
