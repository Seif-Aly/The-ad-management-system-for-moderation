import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

const REJECTION_REASONS = [
  "Запрещенный товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];

interface RejectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string, comment?: string) => void;

  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

export default function RejectDialog({
  open,
  onClose,
  onSubmit,
  maxWidth = "sm",
  fullWidth = true,
}: RejectDialogProps) {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const isOther = reason === "Другое";

  useEffect(() => {
    if (!isOther) setComment("");
  }, [reason]);

  const handleSubmit = () => {
    if (!reason) return;
    onSubmit(reason, comment.trim());
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle>Отклонение объявления</DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Причина"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          {REJECTION_REASONS.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>

        {isOther && (
          <TextField
            fullWidth
            multiline
            rows={3}
            size="small"
            placeholder="Введите комментарий"
            sx={{ mt: 2 }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Отмена
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleSubmit}
          disabled={!reason}
        >
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
