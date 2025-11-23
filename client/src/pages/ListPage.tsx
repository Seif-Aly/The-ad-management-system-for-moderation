import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAds } from "../api/api";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { statusRU } from "../utils/status";

export default function ListPage() {
  const nav = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["ads", { page, search, status, categoryId }],
    queryFn: () =>
      getAds({
        page,
        search,
        status,
        categoryId,
      }),
  });

  const ads = data?.ads ?? [];
  const pagination = data?.pagination;

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
        Объявления
      </Typography>

      <Card
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 4,
          boxShadow: 6,
        }}
        className="bg-white/60 backdrop-blur"
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center" }}
          className="flex flex-col lg:flex-row gap-4 lg:gap-6"
        >
          <TextField
            label="Поиск"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />

          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              multiple
              label="Статус"
              value={status}
              onChange={(e) => setStatus(e.target.value as string[])}
              renderValue={(val) => val.join(", ")}
            >
              <MenuItem value="pending">На модерации</MenuItem>
              <MenuItem value="approved">Одобрено</MenuItem>
              <MenuItem value="rejected">Отклонено</MenuItem>
              <MenuItem value="draft">Черновик</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Категория</InputLabel>
            <Select
              label="Категория"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <MenuItem value="">Все категории</MenuItem>
              <MenuItem value="1">Недвижимость</MenuItem>
              <MenuItem value="2">Транспорт</MenuItem>
              <MenuItem value="4">Услуги</MenuItem>
              <MenuItem value="5">Животные</MenuItem>
              <MenuItem value="7">Детское</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={() => {
              setSearch("");
              setStatus([]);
              setCategoryId("");
              setPage(1);
            }}
          >
            Сброс
          </Button>
        </Stack>
      </Card>

      {isLoading && <Typography>Загрузка...</Typography>}

      {!isLoading && ads.length === 0 && (
        <Typography variant="h6" sx={{ mt: 4 }}>
          Ничего не найдено
        </Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {ads.map((ad) => (
          <motion.div
            key={ad.id}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: 8,
                cursor: "pointer",
              }}
              onClick={() => nav(`/item/${ad.id}`)}
              className="overflow-hidden bg-white/60 backdrop-blur"
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  ad.images?.[0] ??
                  "/mnt/data/9fda0f0e-36ae-46d8-a47c-c37c488fa1ea.png"
                }
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  t.src = "/mnt/data/9fda0f0e-36ae-46d8-a47c-c37c488fa1ea.png";
                }}
                sx={{ objectFit: "cover" }}
              />

              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1 }}
                  className="truncate"
                >
                  {ad.title}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  {ad.price.toLocaleString()} ₽
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    label={statusRU[ad.status]}
                    size="small"
                    color={
                      ad.status === "approved"
                        ? "success"
                        : ad.status === "rejected"
                          ? "error"
                          : "warning"
                    }
                    sx={{ textTransform: "capitalize" }}
                  />

                  {ad.priority === "urgent" && (
                    <Chip
                      label="Срочно"
                      size="small"
                      color="error"
                      variant="outlined"
                    />
                  )}
                </Stack>

                <Typography
                  sx={{ mt: 1, fontSize: 14, color: "text.secondary" }}
                >
                  {new Date(ad.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {!!pagination && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={pagination.totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
}
