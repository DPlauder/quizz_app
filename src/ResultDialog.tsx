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
  onClose: (isClosed: boolean) => void;
}

export default function ResultDialog({ open, points, onClose }: Props) {
  return (
    <Dialog open={open}>
      <DialogTitle>RESULT</DialogTitle>
      <DialogContent>
        <DialogContentText>{points}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
