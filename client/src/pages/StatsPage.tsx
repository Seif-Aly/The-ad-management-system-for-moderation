import { useQuery } from "@tanstack/react-query";
import {
  getStatsSummary,
  getActivityChart,
  getDecisionsChart,
  getCategoriesChart,
} from "../api/api";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";

export default function StatsPage() {
  const { data: summary } = useQuery({
    queryKey: ["stats-summary"],
    queryFn: () => getStatsSummary({ period: "week" }),
  });

  const { data: activity } = useQuery({
    queryKey: ["stats-activity"],
    queryFn: () => getActivityChart({ period: "week" }),
  });

  const { data: decisions } = useQuery({
    queryKey: ["stats-decisions"],
    queryFn: () => getDecisionsChart({ period: "week" }),
  });

  const { data: categories } = useQuery({
    queryKey: ["stats-categories"],
    queryFn: () => getCategoriesChart({ period: "week" }),
  });

  return (
    <Box sx={{ p: 4, minHeight: "100vh", background: "#f5f6fa" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Панель статистики
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{ borderRadius: 4, boxShadow: "0 6px 25px rgba(0,0,0,0.06)" }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Общий обзор
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ mb: 1 }}>
                Проверено: <strong>{summary?.totalReviewed ?? "—"}</strong>
              </Typography>

              <Typography sx={{ mt: 2 }}>Одобрено</Typography>
              <LinearProgress
                variant="determinate"
                value={summary?.approvedPercentage ?? 0}
                sx={{
                  height: 10,
                  borderRadius: 2,
                  my: 1,
                  "& .MuiLinearProgress-bar": { backgroundColor: "#4caf50" },
                }}
              />

              <Typography sx={{ mt: 2 }}>Отклонено</Typography>
              <LinearProgress
                variant="determinate"
                value={summary?.rejectedPercentage ?? 0}
                sx={{
                  height: 10,
                  borderRadius: 2,
                  my: 1,
                  "& .MuiLinearProgress-bar": { backgroundColor: "#f44336" },
                }}
              />

              <Typography sx={{ mt: 2 }}>Доработка</Typography>
              <LinearProgress
                variant="determinate"
                value={summary?.requestChangesPercentage ?? 0}
                sx={{
                  height: 10,
                  borderRadius: 2,
                  my: 1,
                  "& .MuiLinearProgress-bar": { backgroundColor: "#ff9800" },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            sx={{ borderRadius: 4, boxShadow: "0 6px 25px rgba(0,0,0,0.06)" }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Активность по дням
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {activity ? (
                <Box>
                  {activity.map((d) => (
                    <Box key={d.date} sx={{ mb: 2 }}>
                      <Typography sx={{ mb: 0.5 }}>{d.date}</Typography>

                      <LinearProgress
                        variant="determinate"
                        value={d.approved * 10}
                        sx={{
                          height: 8,
                          borderRadius: 2,
                          mb: 0.6,
                          "& .MuiLinearProgress-bar": { background: "#4caf50" },
                        }}
                      />

                      <LinearProgress
                        variant="determinate"
                        value={d.rejected * 10}
                        sx={{
                          height: 8,
                          borderRadius: 2,
                          mb: 0.6,
                          "& .MuiLinearProgress-bar": { background: "#f44336" },
                        }}
                      />

                      <LinearProgress
                        variant="determinate"
                        value={d.requestChanges * 10}
                        sx={{
                          height: 8,
                          borderRadius: 2,
                          "& .MuiLinearProgress-bar": { background: "#ff9800" },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">Нет данных</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{ borderRadius: 4, boxShadow: "0 6px 25px rgba(0,0,0,0.06)" }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Категории
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {categories ? (
                Object.entries(categories).map(([cat, val]) => (
                  <Box key={cat} sx={{ mb: 1.5 }}>
                    <Typography sx={{ mb: 0.4 }}>{cat}</Typography>

                    <LinearProgress
                      variant="determinate"
                      value={Math.min(val * 10, 100)}
                      sx={{
                        height: 8,
                        borderRadius: 2,
                        "& .MuiLinearProgress-bar": { background: "#1976d2" },
                      }}
                    />
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">Нет данных</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{ borderRadius: 4, boxShadow: "0 6px 25px rgba(0,0,0,0.06)" }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Решения модерации
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {decisions ? (
                <Box>
                  <Typography sx={{ mb: 1 }}>
                    Одобрено: <strong>{decisions.approved}</strong>
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    Отклонено: <strong>{decisions.rejected}</strong>
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    Доработка: <strong>{decisions.requestChanges}</strong>
                  </Typography>
                </Box>
              ) : (
                <Typography color="text.secondary">Нет данных</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
