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

interface Props {
  open: boolean;
  onSave: (question: IQuestion) => void;
  onClose: (isClosed: boolean) => void;
  question?: IQuestion;
}

export default function FormEdit({ open, onClose, onSave, question }: Props) {
  const { register, handleSubmit } = useForm<IQuestion>({
    defaultValues: question,
  });
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Add new Question"}</DialogTitle>
      <form onSubmit={handleSubmit(onSave)}>
        <DialogContent>
          <TextField
            placeholder="Question"
            {...register("questionText")}
          ></TextField>
          <TextField
            placeholder="Right Answere"
            {...register("answerTrue")}
          ></TextField>
          <TextField
            placeholder="Wrong Answere"
            {...register("answerWrong1")}
          ></TextField>
          <TextField
            placeholder="Wrong Answere"
            {...register("answerWrong2")}
          ></TextField>
          <TextField
            placeholder="Wrong Answere"
            {...register("answerWrong3")}
          ></TextField>
          <DialogActions>
            <Button color="primary" type="submit">
              Save
            </Button>
            <Button color="secondary" onClick={() => onClose(false)}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
}
