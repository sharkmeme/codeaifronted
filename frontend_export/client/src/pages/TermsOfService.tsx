import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back-home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="font-heading text-4xl font-bold mb-4" data-testid="heading-terms-of-service">
          Terms of Service
        </h1>
        
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: November 24, 2025
        </p>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Bunnycode.ai (the "Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground">
              Bunnycode.ai provides AI automation services, including but not limited to sales workflow automation, internal operations optimization, and content system development. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
            <p className="text-muted-foreground mb-3">
              You agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and complete information when contacting us</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to any part of the Service</li>
              <li>Not use the Service to transmit any malicious code or harmful content</li>
              <li>Not impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Intellectual Property Rights</h2>
            <p className="text-muted-foreground">
              All content on this website, including text, graphics, logos, images, and software, is the property of Bunnycode.ai or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Service Agreements</h2>
            <p className="text-muted-foreground">
              Any services provided by Bunnycode.ai will be subject to a separate service agreement. The terms of such agreements will govern the specific services provided and may include additional terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, Bunnycode.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless Bunnycode.ai, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Privacy</h2>
            <p className="text-muted-foreground">
              Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Third-Party Services</h2>
            <p className="text-muted-foreground">
              Our Service may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of these external sites. Your use of third-party services is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Modifications to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">13. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">14. Dispute Resolution</h2>
            <p className="text-muted-foreground">
              Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with applicable arbitration rules, except where prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">15. Severability</h2>
            <p className="text-muted-foreground">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">16. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us through our website's contact form.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link to="/">
            <Button data-testid="button-back-home-bottom">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
