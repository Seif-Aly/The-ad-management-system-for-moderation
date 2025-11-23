import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdById, approveAd, rejectAd, requestChanges } from "../api/api";
import {
  Box,
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { motion } from "framer-motion";
import Gallery from "../components/Gallery";
import RejectDialog from "../components/RejectDialog";
import type { Advertisement } from "../types";
import { formatDate } from "../utils/date";
import { actionRU } from "../utils/actions";
import { statusRU } from "../utils/status";

export default function ItemPage(): JSX.Element {
  const { id } = useParams();
  const nav = useNavigate();
  const qc = useQueryClient();
  const [rejectOpen, setRejectOpen] = useState(false);

  const {
    data: ad,
    isLoading,
    isError,
  } = useQuery<Advertisement>({
    queryKey: ["ad", id],
    queryFn: ({ signal }) => getAdById(id as string, signal),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 2,
  });

  const approve = useMutation({
    mutationFn: () => approveAd(id as string),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ads"] }),
  });

  const reject = useMutation({
    mutationFn: (vars: { reason: string; comment?: string }) =>
      rejectAd(id as string, vars),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["ads"] });
      qc.invalidateQueries({ queryKey: ["ad", id] });
      setRejectOpen(false);
    },
  });

  const reqChanges = useMutation({
    mutationFn: (vars: { reason: string; comment?: string }) =>
      requestChanges(id as string, vars),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ads"] }),
  });

  if (isLoading) {
    return (
      <Box sx={{ p: 6, textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          Загрузка объявления
        </Typography>
      </Box>
    );
  }

  if (isError || !ad) {
    return (
      <Box sx={{ p: 6, textAlign: "center" }}>
        <Typography variant="h6">Объявление не найдено</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Button size="small" onClick={() => nav("/list")} className="mb-4">
          ← Назад к списку
        </Button>
      </motion.div>

      <Box
        sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}
        className="flex flex-col lg:flex-row"
      >
        <Card
          sx={{ flex: 1, borderRadius: 3, boxShadow: 8 }}
          className="bg-white/60 backdrop-blur-sm"
        >
          <CardContent>
            <Gallery images={ad.images ?? []} />

            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Typography variant="h3" sx={{ mt: 3, fontWeight: 700 }}>
                {ad.title}
              </Typography>
            </motion.div>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                {ad.price?.toLocaleString()} ₽
              </Typography>

              <Chip
                label={ad.priority === "urgent" ? "Срочно" : "Обычное"}
                color={ad.priority === "urgent" ? "error" : "default"}
                sx={{ textTransform: "uppercase", fontWeight: 700 }}
              />

              <Chip
                label={statusRU[ad.status]}
                variant="outlined"
                sx={{ textTransform: "capitalize", ml: 1 }}
                color={
                  ad.status === "approved"
                    ? "success"
                    : ad.status === "rejected"
                      ? "error"
                      : "warning"
                }
              />
            </Stack>

            <Typography
              sx={{
                mt: 3,
                color: "text.secondary",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              {ad.description}
            </Typography>

            <Typography variant="h6" sx={{ mt: 4 }}>
              Характеристики
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box
              className="p-4 rounded-2xl"
              sx={{
                background: "linear-gradient(180deg,#fff,#fbfbff)",
                boxShadow: 3,
              }}
            >
              <table style={{ width: "100%", borderSpacing: 12 }}>
                <tbody>
                  {Object.entries(ad.characteristics ?? {}).map(([k, v]) => (
                    <tr key={k}>
                      <td style={{ fontWeight: 700, width: 170 }}>{k}</td>
                      <td style={{ color: "text.secondary" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            <Typography
              variant="caption"
              sx={{ display: "block", mt: 2, color: "text.secondary" }}
            >
              Создано {formatDate(ad.createdAt)} • Обновлено{" "}
              {formatDate(ad.updatedAt)}
            </Typography>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: 360 }}
        >
          <Card sx={{ borderRadius: 3, boxShadow: 8 }}>
            <CardContent>
              <Typography variant="h6">Продавец</Typography>

              <Box sx={{ mt: 1, color: "text.secondary" }}>
                <div>Имя: {ad.seller?.name ?? "—"}</div>
                <div>Рейтинг: {ad.seller?.rating ?? "—"}</div>
                <div>
                  Создан:{" "}
                  {ad.seller?.registeredAt
                    ? formatDate(ad.seller.registeredAt)
                    : "—"}
                </div>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<DoneAllIcon />}
                    color="success"
                    disabled={approve.isPending}
                    onClick={() => approve.mutate()}
                    sx={{ fontWeight: 700 }}
                  >
                    Одобрить
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    startIcon={<CloseIcon />}
                    onClick={() => setRejectOpen(true)}
                    disabled={reject.isPending}
                    sx={{ fontWeight: 700 }}
                  >
                    Отклонить
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }}>
                  <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    startIcon={<AutorenewIcon />}
                    onClick={() =>
                      reqChanges.mutate({
                        reason: "Другое",
                        comment: "Нужно улучшить описание",
                      })
                    }
                    disabled={reqChanges.isPending}
                    sx={{ fontWeight: 700 }}
                  >
                    На доработку
                  </Button>
                </motion.div>
              </Box>

              <Typography variant="h6" sx={{ mt: 3 }}>
                История модерации
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ maxHeight: 260, overflow: "auto", pr: 1 }}>
                {(ad.moderationHistory ?? []).map((h) => (
                  <Box
                    key={h.id}
                    sx={{
                      p: 2,
                      mb: 1,
                      borderRadius: 2,
                      background: "#faf9ff",
                      boxShadow: 1,
                    }}
                  >
                    <Typography sx={{ fontWeight: 700 }}>
                      {h.moderatorName}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {actionRU[h.action] ?? h.action} •{" "}
                      {formatDate(h.timestamp)}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      {h.reason || h.comment || ""}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      <RejectDialog
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onSubmit={(reason, comment) => reject.mutate({ reason, comment })}
      />
    </Box>
  );
}
