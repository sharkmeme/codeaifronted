import { Router } from "express";
import { supabase } from "@shared/supabase";
import { mailer } from "../utils/mailer";
import { rateLimiter, sanitizeInput, sanitizeEmail } from "../middleware/security";
import { z } from "zod";

const router = Router();

const isProduction = process.env.NODE_ENV === 'production';

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20).optional().or(z.literal('')),
  socials: z.string().max(500).optional().or(z.literal('')),
  projectType: z.string().min(1, "Project type is required").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  extraInfo: z.string().max(2000).optional().or(z.literal('')),
});

router.post("/", rateLimiter, async (req, res) => {
  try {
    console.log("=== INCOMING REQUEST BODY ===");
    console.log(JSON.stringify(req.body, null, 2));
    
    const validation = leadSchema.safeParse(req.body);
    
    if (!validation.success) {
      console.log("=== VALIDATION FAILED ===");
      console.log(JSON.stringify(validation.error.errors, null, 2));
      
      return res.status(400).json({ 
        success: false,
        error: "Invalid input data",
        details: isProduction ? undefined : validation.error.errors
      });
    }

    const sanitizedEmail = sanitizeEmail(req.body.email);
    if (!sanitizedEmail) {
      return res.status(400).json({ 
        success: false,
        error: "Invalid email address" 
      });
    }

    const sanitizedData = {
      name: sanitizeInput(req.body.name),
      email: sanitizedEmail,
      phone: req.body.phone ? sanitizeInput(req.body.phone) : null,
      socials: req.body.socials ? sanitizeInput(req.body.socials) : null,
      project_type: sanitizeInput(req.body.projectType),
      description: sanitizeInput(req.body.description),
      extra_info: req.body.extraInfo ? sanitizeInput(req.body.extraInfo) : null,
    };

    const { data, error } = await supabase
      .from("leads")
      .insert([sanitizedData])
      .select();

    if (error) {
      if (!isProduction) {
        console.error("Supabase error:", error);
      }
      return res.status(500).json({ 
        success: false,
        error: "Unable to save lead. Please try again." 
      });
    }

    if (!isProduction) {
      console.log("✅ Lead saved to Supabase");
    }

    res.json({ success: true });

    setImmediate(async () => {
      try {
        await mailer.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.ALERT_EMAIL,
          subject: "New Lead Submission - Bunnycode.ai",
          text: `
New lead received from bunnycode.ai:

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || 'N/A'}
Social Media: ${sanitizedData.socials || 'N/A'}
Project Type: ${sanitizedData.project_type}
Description: ${sanitizedData.description}
Extra Info: ${sanitizedData.extra_info || 'N/A'}
  `,
        });
        
        if (!isProduction) {
          console.log("Email notification sent");
        }
      } catch (err) {
        if (!isProduction) {
          console.error("Email send error:", err);
        }
      }
    });
  } catch (err) {
    if (!isProduction) {
      console.error("Server error:", err);
    }
    return res.status(500).json({ 
      success: false,
      error: "An error occurred. Please try again later." 
    });
  }
});

export default router;
