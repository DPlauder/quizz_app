import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  points: number;
  maxPoints: number;
  onClose: (isClosed: boolean) => void;
}

export default function ResultDialog({
  open,
  points,
  maxPoints,
  onClose,
}: Props) {
  return (
    <Dialog open={open}>
      <DialogTitle>RESULT</DialogTitle>
      <DialogContent sx={{ width: "400px" }}>
        <DialogContentText sx={{ textAlign: "center" }}>
          You answered {points} of {maxPoints} questions right!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
