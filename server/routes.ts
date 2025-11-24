import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.ADMIN_API_KEY) {
  throw new Error(
    "ADMIN_API_KEY environment variable is required in production. " +
    "Please set this secret in your Replit environment."
  );
}

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'dev-admin-key';

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/leads", async (req, res) => {
    try {
      const apiKey = req.headers['x-api-key'];
      
      if (!apiKey || apiKey !== ADMIN_API_KEY) {
        return res.status(401).json({ 
          success: false, 
          error: "Unauthorized access" 
        });
      }
      
      const leads = await storage.getLeads();
      res.json({ success: true, leads });
    } catch (error) {
      if (!isProduction) {
        console.error("Error fetching leads:", error);
      }
      res.status(500).json({ 
        success: false, 
        error: "Unable to fetch leads" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
