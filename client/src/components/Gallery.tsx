import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const LOCAL_FALLBACK = "/mnt/data/9fda0f0e-36ae-46d8-a47c-c37c488fa1ea.png";

export default function Gallery({ images }: { images: string[] }) {
  const safeImages = (
    images && images.length > 0 ? images : [LOCAL_FALLBACK]
  ).map((src, idx) => ({ src, id: idx }));

  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((i) => (i + 1) % safeImages.length);
  const select = (i: number) => setIndex(i);

  return (
    <Box className="gallery" sx={{ width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 6,
          bg: "background.paper",
        }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={safeImages[index].src + index}
            src={safeImages[index].src}
            alt={`image-${index}`}
            initial={{ opacity: 0, y: 8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.995 }}
            transition={{ duration: 0.45 }}
            style={{
              width: "100%",
              height: 420,
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              const t = e.currentTarget;
              if (t.src !== LOCAL_FALLBACK) t.src = LOCAL_FALLBACK;
            }}
          />
        </AnimatePresence>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 12,
            transform: "translateY(-50%)",
            zIndex: 10,
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={prev}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.85)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
              boxShadow: 3,
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: 12,
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          <IconButton
            onClick={next}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.85)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
              boxShadow: 3,
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box
        className="thumbnails"
        sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center" }}
      >
        {safeImages.map((img, i) => (
          <motion.button
            key={img.src + i}
            onClick={() => select(i)}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex items-center justify-center rounded-lg overflow-hidden ${
              i === index ? "ring-2 ring-primary" : ""
            }`}
            style={{
              border: "none",
              padding: 0,
              background: "transparent",
              cursor: "pointer",
              width: 96,
              height: 64,
              boxShadow:
                i === index
                  ? "0 8px 20px rgba(99,102,241,0.12)"
                  : "0 6px 14px rgba(16,24,40,0.06)",
              borderRadius: 8,
            }}
          >
            <img
              src={img.src}
              alt={`thumb-${i}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                const t = e.currentTarget;
                if (t.src !== LOCAL_FALLBACK) t.src = LOCAL_FALLBACK;
              }}
            />
          </motion.button>
        ))}
      </Box>
    </Box>
  );
}
