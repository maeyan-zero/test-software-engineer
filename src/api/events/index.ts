import express from "express";

export function createEventRouter() {
  const router = express.Router();

  router.post("/", (req, res) => {
    res.send();
  });

  return router;
}
