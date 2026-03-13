import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#ffffff",
        backgroundImage:
          "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(5, 51, 156, 0.12), transparent)",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={3}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          {/* ── Eyebrow tag ── */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: "100px",
              border: "1.5px solid rgba(5,51,156,0.25)",
              backgroundColor: "rgba(5,51,156,0.06)",
              color: "#05339C",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Bangladesh National Identity Portal
          </Box>

          {/* ── Headline ── */}
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(2.8rem, 9vw, 3.8rem)",
              fontWeight: 800,
              color: "#0d1b3e",
              textAlign: "center",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            e-Bangla&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "inherit",
                fontWeight: "inherit",
                letterSpacing: "inherit",
                lineHeight: "inherit",
                color: "#05339C",
              }}
            >
              Identity
            </Typography>
          </Typography>

          {/* ── Sub-heading ── */}
          <Typography
            sx={{
              textAlign: "center",
              color: "#4a5a80",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              width: { sm: "100%", md: "75%" },
            }}
          >
            Your secure gateway to Bangladesh's digital identity ecosystem.
            Verify, manage, and access government services — all in one place.
          </Typography>

          {/* ── CTA buttons ── */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            useFlexGap
            sx={{ pt: 1 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                minWidth: 160,
                backgroundColor: "#05339C",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "10px",
                px: 4,
                py: 1.5,
                boxShadow: "0 4px 20px rgba(5,51,156,0.35)",
                "&:hover": {
                  backgroundColor: "#03248a",
                  boxShadow: "0 6px 28px rgba(5,51,156,0.45)",
                },
                transition: "all 0.25s ease",
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                minWidth: 160,
                borderColor: "#05339C",
                color: "#05339C",
                fontWeight: 700,
                borderRadius: "10px",
                px: 4,
                py: 1.5,
                "&:hover": {
                  borderColor: "#03248a",
                  backgroundColor: "rgba(5,51,156,0.06)",
                },
                transition: "all 0.25s ease",
              }}
            >
              Learn More
            </Button>
          </Stack>

          {/* ── Legal note ── */}
          <Typography
            variant="caption"
            sx={{ textAlign: "center", color: "#6b7a99" }}
          >
            By clicking &quot;Get Started&quot; you agree to our&nbsp;
            <Link href="#" sx={{ color: "#05339C", fontWeight: 600 }}>
              Terms &amp; Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

