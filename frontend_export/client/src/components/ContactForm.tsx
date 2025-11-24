import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import { getApiUrl } from "@/lib/api";
import { insertLeadSchema, type InsertLead } from "@shared/schema";

export function ContactForm() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertLead) => {
    try {
      const response = await fetch(getApiUrl("/api/leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: "",
          socials: "",
          projectType: "Contact Form",
          description: data.message,
          extraInfo: ""
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again.");
      }
      
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Success!",
        description: "Message sent! We'll get back to you soon.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-sm:space-y-3 max-w-2xl mx-auto" data-testid="contact-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-sm:gap-3 max-sm:grid-cols-1">
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
                    className="bg-card dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-500 max-sm:w-full max-sm:text-sm max-sm:p-3"
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
                    className="bg-card dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-500 max-sm:w-full max-sm:text-sm max-sm:p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  className="bg-card resize-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-500 max-sm:w-full max-sm:text-sm max-sm:p-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="max-w-md mx-auto w-full text-sm uppercase tracking-wider py-2.5 max-sm:w-full max-sm:py-3 bg-[#3f80f5] hover:bg-[#3069d5] dark:bg-blue-600 dark:hover:bg-blue-500"
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
