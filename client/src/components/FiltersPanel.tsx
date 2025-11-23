import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";

interface FiltersProps {
  search: string;
  onSearch: (v: string) => void;

  category: string;
  onCategory: (v: string) => void;

  status: string[];
  onStatus: (v: string[]) => void;

  onReset: () => void;
}

const categories = [
  { value: "", label: "Все категории" },
  { value: "Электроника", label: "Электроника" },
  { value: "Недвижимость", label: "Недвижимость" },
];

const statusOptions = [
  { value: "pending", label: "На модерации" },
  { value: "approved", label: "Одобрено" },
  { value: "rejected", label: "Отклонено" },
  { value: "draft", label: "Черновик" },
];

export default function FiltersPanel({
  search,
  onSearch,
  category,
  onCategory,
  status,
  onStatus,
  onReset,
}: FiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
        mb: 2,
      }}
    >
      <TextField
        label="Поиск"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        size="small"
        sx={{ minWidth: 200 }}
        autoComplete="off"
      />

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="category-label">Категория</InputLabel>
        <Select
          labelId="category-label"
          label="Категория"
          value={category}
          onChange={(e) => onCategory(e.target.value)}
        >
          {categories.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 240 }}>
        <InputLabel id="status-label">Статус</InputLabel>
        <Select
          labelId="status-label"
          multiple
          value={status}
          onChange={(e) => onStatus(e.target.value as string[])}
          input={<OutlinedInput label="Статус" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={
                    statusOptions.find((s) => s.value === value)?.label || value
                  }
                  size="small"
                />
              ))}
            </Box>
          )}
        >
          {statusOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={onReset}
      >
        Сбросить
      </Button>
    </Box>
  );
}
