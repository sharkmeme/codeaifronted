import { Router } from "express";
import { supabase } from "@shared/supabase";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { error } = await supabase.from("leads").insert([
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        socials: req.body.socials || null,
        project_type: req.body.projectType,
        description: req.body.description,
        extra_info: req.body.extraInfo || null,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
