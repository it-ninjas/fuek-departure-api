import express from 'express';

const router = express.Router();

router.get("/", function (_req, res, next) {
  res.render("index", { title: "Departure API" });
});

export const indexRoutes = router;
