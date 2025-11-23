import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema, type InsertLead } from "@shared/schema";

export function ContactForm() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertLead) => {
    try {
      await apiRequest("POST", "/api/leads", data);
      
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Success!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
    } catch (error: any) {
      const errorMessage = error.details 
        ? error.details.map((e: any) => e.message).join(", ")
        : error.message || "Failed to submit form. Please try again.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleNewMessage = () => {
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center" data-testid="form-success-message">
        <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
        <h3 className="text-2xl font-heading font-bold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">We'll get back to you shortly.</p>
        <Button
          onClick={handleNewMessage}
          variant="outline"
          data-testid="button-send-another"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto" data-testid="contact-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm uppercase tracking-wide">Name *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your name"
                    data-testid="input-name"
                    className="bg-card"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm uppercase tracking-wide">Email *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="your@email.com"
                    data-testid="input-email"
                    className="bg-card"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm uppercase tracking-wide">Company (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Your company name (optional)"
                  data-testid="input-company"
                  className="bg-card"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm uppercase tracking-wide">Message *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us about your automation needs..."
                  rows={6}
                  data-testid="input-message"
                  className="bg-card resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="max-w-md mx-auto w-full text-sm uppercase tracking-wider"
          disabled={form.formState.isSubmitting}
          data-testid="button-submit-form"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}
