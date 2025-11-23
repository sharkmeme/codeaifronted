import { Router } from "express";
import { db } from "../db";
import { leads } from "../db/schema";

const router = Router();

router.post("/", async (req, res) => {
  try {
    await db.insert(leads).values({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      socials: req.body.socials || null,
      projectType: req.body.projectType,
      description: req.body.description,
      extraInfo: req.body.extraInfo || null,
    });

    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Database error" });
  }
});

export default router;
