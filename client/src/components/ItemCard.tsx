import {
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Advertisement } from "../types/index";

interface ItemCardProps {
  ad: Advertisement;
}

export default function ItemCard({ ad }: ItemCardProps) {
  const nav = useNavigate();

  const statusColor: Record<
    string,
    "default" | "success" | "error" | "warning"
  > = {
    pending: "warning",
    approved: "success",
    rejected: "error",
    draft: "default",
  };

  const image =
    ad.images && ad.images.length > 0 ? ad.images[0] : "/wireframe.png";

  return (
    <Card
      sx={{
        transition: "all 0.2s",
        cursor: "pointer",
        "&:hover": {
          boxShadow: 4,
        },
      }}
      onClick={() => nav(`/item/${ad.id}`)}
    >
      <CardContent
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={ad.title}
          sx={{
            width: 150,
            height: 110,
            borderRadius: 1,
            objectFit: "cover",
            backgroundColor: "#f2f2f2",
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" noWrap>
            {ad.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" noWrap>
            {ad.category} • {new Date(ad.createdAt).toLocaleDateString()}
          </Typography>

          <Typography variant="h6" sx={{ mt: 1 }}>
            {ad.price.toLocaleString()} ₽
          </Typography>

          <Chip
            label={ad.status}
            color={statusColor[ad.status]}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>

        <Box>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              nav(`/item/${ad.id}`);
            }}
          >
            Открыть
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
