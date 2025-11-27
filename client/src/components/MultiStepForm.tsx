import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronLeft, ChevronRight, Check, Loader2, Sparkles } from "lucide-react";
import { getApiUrl } from "@/lib/api";

// Form data type matching backend exactly
interface FormData {
  name: string;
  email: string;
  phone: string;
  socials: string;
  projectType: string;
  description: string;
  extraInfo: string;
}

// Country type for phone selector
interface Country {
  name: string;
  code: string;
  dial: string;
  flag: string;
}

// Complete list of countries with dial codes and flag emojis
const COUNTRIES: Country[] = [
  { name: "Afghanistan", code: "AF", dial: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "AL", dial: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", dial: "+213", flag: "🇩🇿" },
  { name: "Andorra", code: "AD", dial: "+376", flag: "🇦🇩" },
  { name: "Angola", code: "AO", dial: "+244", flag: "🇦🇴" },
  { name: "Antigua and Barbuda", code: "AG", dial: "+1-268", flag: "🇦🇬" },
  { name: "Argentina", code: "AR", dial: "+54", flag: "🇦🇷" },
  { name: "Armenia", code: "AM", dial: "+374", flag: "🇦🇲" },
  { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
  { name: "Austria", code: "AT", dial: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "AZ", dial: "+994", flag: "🇦🇿" },
  { name: "Bahamas", code: "BS", dial: "+1-242", flag: "🇧🇸" },
  { name: "Bahrain", code: "BH", dial: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", code: "BD", dial: "+880", flag: "🇧🇩" },
  { name: "Barbados", code: "BB", dial: "+1-246", flag: "🇧🇧" },
  { name: "Belarus", code: "BY", dial: "+375", flag: "🇧🇾" },
  { name: "Belgium", code: "BE", dial: "+32", flag: "🇧🇪" },
  { name: "Belize", code: "BZ", dial: "+501", flag: "🇧🇿" },
  { name: "Benin", code: "BJ", dial: "+229", flag: "🇧🇯" },
  { name: "Bhutan", code: "BT", dial: "+975", flag: "🇧🇹" },
  { name: "Bolivia", code: "BO", dial: "+591", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "BA", dial: "+387", flag: "🇧🇦" },
  { name: "Botswana", code: "BW", dial: "+267", flag: "🇧🇼" },
  { name: "Brazil", code: "BR", dial: "+55", flag: "🇧🇷" },
  { name: "Brunei", code: "BN", dial: "+673", flag: "🇧🇳" },
  { name: "Bulgaria", code: "BG", dial: "+359", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "BF", dial: "+226", flag: "🇧🇫" },
  { name: "Burundi", code: "BI", dial: "+257", flag: "🇧🇮" },
  { name: "Cambodia", code: "KH", dial: "+855", flag: "🇰🇭" },
  { name: "Cameroon", code: "CM", dial: "+237", flag: "🇨🇲" },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
  { name: "Cape Verde", code: "CV", dial: "+238", flag: "🇨🇻" },
  { name: "Central African Republic", code: "CF", dial: "+236", flag: "🇨🇫" },
  { name: "Chad", code: "TD", dial: "+235", flag: "🇹🇩" },
  { name: "Chile", code: "CL", dial: "+56", flag: "🇨🇱" },
  { name: "China", code: "CN", dial: "+86", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", dial: "+57", flag: "🇨🇴" },
  { name: "Comoros", code: "KM", dial: "+269", flag: "🇰🇲" },
  { name: "Congo (DRC)", code: "CD", dial: "+243", flag: "🇨🇩" },
  { name: "Congo (Republic)", code: "CG", dial: "+242", flag: "🇨🇬" },
  { name: "Costa Rica", code: "CR", dial: "+506", flag: "🇨🇷" },
  { name: "Croatia", code: "HR", dial: "+385", flag: "🇭🇷" },
  { name: "Cuba", code: "CU", dial: "+53", flag: "🇨🇺" },
  { name: "Cyprus", code: "CY", dial: "+357", flag: "🇨🇾" },
  { name: "Czech Republic", code: "CZ", dial: "+420", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", dial: "+45", flag: "🇩🇰" },
  { name: "Djibouti", code: "DJ", dial: "+253", flag: "🇩🇯" },
  { name: "Dominica", code: "DM", dial: "+1-767", flag: "🇩🇲" },
  { name: "Dominican Republic", code: "DO", dial: "+1-809", flag: "🇩🇴" },
  { name: "Ecuador", code: "EC", dial: "+593", flag: "🇪🇨" },
  { name: "Egypt", code: "EG", dial: "+20", flag: "🇪🇬" },
  { name: "El Salvador", code: "SV", dial: "+503", flag: "🇸🇻" },
  { name: "Equatorial Guinea", code: "GQ", dial: "+240", flag: "🇬🇶" },
  { name: "Eritrea", code: "ER", dial: "+291", flag: "🇪🇷" },
  { name: "Estonia", code: "EE", dial: "+372", flag: "🇪🇪" },
  { name: "Eswatini", code: "SZ", dial: "+268", flag: "🇸🇿" },
  { name: "Ethiopia", code: "ET", dial: "+251", flag: "🇪🇹" },
  { name: "Fiji", code: "FJ", dial: "+679", flag: "🇫🇯" },
  { name: "Finland", code: "FI", dial: "+358", flag: "🇫🇮" },
  { name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
  { name: "Gabon", code: "GA", dial: "+241", flag: "🇬🇦" },
  { name: "Gambia", code: "GM", dial: "+220", flag: "🇬🇲" },
  { name: "Georgia", code: "GE", dial: "+995", flag: "🇬🇪" },
  { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
  { name: "Ghana", code: "GH", dial: "+233", flag: "🇬🇭" },
  { name: "Greece", code: "GR", dial: "+30", flag: "🇬🇷" },
  { name: "Grenada", code: "GD", dial: "+1-473", flag: "🇬🇩" },
  { name: "Guatemala", code: "GT", dial: "+502", flag: "🇬🇹" },
  { name: "Guinea", code: "GN", dial: "+224", flag: "🇬🇳" },
  { name: "Guinea-Bissau", code: "GW", dial: "+245", flag: "🇬🇼" },
  { name: "Guyana", code: "GY", dial: "+592", flag: "🇬🇾" },
  { name: "Haiti", code: "HT", dial: "+509", flag: "🇭🇹" },
  { name: "Honduras", code: "HN", dial: "+504", flag: "🇭🇳" },
  { name: "Hong Kong", code: "HK", dial: "+852", flag: "🇭🇰" },
  { name: "Hungary", code: "HU", dial: "+36", flag: "🇭🇺" },
  { name: "Iceland", code: "IS", dial: "+354", flag: "🇮🇸" },
  { name: "India", code: "IN", dial: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩" },
  { name: "Iran", code: "IR", dial: "+98", flag: "🇮🇷" },
  { name: "Iraq", code: "IQ", dial: "+964", flag: "🇮🇶" },
  { name: "Ireland", code: "IE", dial: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "IL", dial: "+972", flag: "🇮🇱" },
  { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
  { name: "Ivory Coast", code: "CI", dial: "+225", flag: "🇨🇮" },
  { name: "Jamaica", code: "JM", dial: "+1-876", flag: "🇯🇲" },
  { name: "Japan", code: "JP", dial: "+81", flag: "🇯🇵" },
  { name: "Jordan", code: "JO", dial: "+962", flag: "🇯🇴" },
  { name: "Kazakhstan", code: "KZ", dial: "+7", flag: "🇰🇿" },
  { name: "Kenya", code: "KE", dial: "+254", flag: "🇰🇪" },
  { name: "Kiribati", code: "KI", dial: "+686", flag: "🇰🇮" },
  { name: "Kosovo", code: "XK", dial: "+383", flag: "🇽🇰" },
  { name: "Kuwait", code: "KW", dial: "+965", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "KG", dial: "+996", flag: "🇰🇬" },
  { name: "Laos", code: "LA", dial: "+856", flag: "🇱🇦" },
  { name: "Latvia", code: "LV", dial: "+371", flag: "🇱🇻" },
  { name: "Lebanon", code: "LB", dial: "+961", flag: "🇱🇧" },
  { name: "Lesotho", code: "LS", dial: "+266", flag: "🇱🇸" },
  { name: "Liberia", code: "LR", dial: "+231", flag: "🇱🇷" },
  { name: "Libya", code: "LY", dial: "+218", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "LI", dial: "+423", flag: "🇱🇮" },
  { name: "Lithuania", code: "LT", dial: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", code: "LU", dial: "+352", flag: "🇱🇺" },
  { name: "Macau", code: "MO", dial: "+853", flag: "🇲🇴" },
  { name: "Madagascar", code: "MG", dial: "+261", flag: "🇲🇬" },
  { name: "Malawi", code: "MW", dial: "+265", flag: "🇲🇼" },
  { name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾" },
  { name: "Maldives", code: "MV", dial: "+960", flag: "🇲🇻" },
  { name: "Mali", code: "ML", dial: "+223", flag: "🇲🇱" },
  { name: "Malta", code: "MT", dial: "+356", flag: "🇲🇹" },
  { name: "Marshall Islands", code: "MH", dial: "+692", flag: "🇲🇭" },
  { name: "Mauritania", code: "MR", dial: "+222", flag: "🇲🇷" },
  { name: "Mauritius", code: "MU", dial: "+230", flag: "🇲🇺" },
  { name: "Mexico", code: "MX", dial: "+52", flag: "🇲🇽" },
  { name: "Micronesia", code: "FM", dial: "+691", flag: "🇫🇲" },
  { name: "Moldova", code: "MD", dial: "+373", flag: "🇲🇩" },
  { name: "Monaco", code: "MC", dial: "+377", flag: "🇲🇨" },
  { name: "Mongolia", code: "MN", dial: "+976", flag: "🇲🇳" },
  { name: "Montenegro", code: "ME", dial: "+382", flag: "🇲🇪" },
  { name: "Morocco", code: "MA", dial: "+212", flag: "🇲🇦" },
  { name: "Mozambique", code: "MZ", dial: "+258", flag: "🇲🇿" },
  { name: "Myanmar", code: "MM", dial: "+95", flag: "🇲🇲" },
  { name: "Namibia", code: "NA", dial: "+264", flag: "🇳🇦" },
  { name: "Nauru", code: "NR", dial: "+674", flag: "🇳🇷" },
  { name: "Nepal", code: "NP", dial: "+977", flag: "🇳🇵" },
  { name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", dial: "+64", flag: "🇳🇿" },
  { name: "Nicaragua", code: "NI", dial: "+505", flag: "🇳🇮" },
  { name: "Niger", code: "NE", dial: "+227", flag: "🇳🇪" },
  { name: "Nigeria", code: "NG", dial: "+234", flag: "🇳🇬" },
  { name: "North Korea", code: "KP", dial: "+850", flag: "🇰🇵" },
  { name: "North Macedonia", code: "MK", dial: "+389", flag: "🇲🇰" },
  { name: "Norway", code: "NO", dial: "+47", flag: "🇳🇴" },
  { name: "Oman", code: "OM", dial: "+968", flag: "🇴🇲" },
  { name: "Pakistan", code: "PK", dial: "+92", flag: "🇵🇰" },
  { name: "Palau", code: "PW", dial: "+680", flag: "🇵🇼" },
  { name: "Palestine", code: "PS", dial: "+970", flag: "🇵🇸" },
  { name: "Panama", code: "PA", dial: "+507", flag: "🇵🇦" },
  { name: "Papua New Guinea", code: "PG", dial: "+675", flag: "🇵🇬" },
  { name: "Paraguay", code: "PY", dial: "+595", flag: "🇵🇾" },
  { name: "Peru", code: "PE", dial: "+51", flag: "🇵🇪" },
  { name: "Philippines", code: "PH", dial: "+63", flag: "🇵🇭" },
  { name: "Poland", code: "PL", dial: "+48", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", dial: "+351", flag: "🇵🇹" },
  { name: "Qatar", code: "QA", dial: "+974", flag: "🇶🇦" },
  { name: "Romania", code: "RO", dial: "+40", flag: "🇷🇴" },
  { name: "Russia", code: "RU", dial: "+7", flag: "🇷🇺" },
  { name: "Rwanda", code: "RW", dial: "+250", flag: "🇷🇼" },
  { name: "Saint Kitts and Nevis", code: "KN", dial: "+1-869", flag: "🇰🇳" },
  { name: "Saint Lucia", code: "LC", dial: "+1-758", flag: "🇱🇨" },
  { name: "Saint Vincent", code: "VC", dial: "+1-784", flag: "🇻🇨" },
  { name: "Samoa", code: "WS", dial: "+685", flag: "🇼🇸" },
  { name: "San Marino", code: "SM", dial: "+378", flag: "🇸🇲" },
  { name: "Sao Tome and Principe", code: "ST", dial: "+239", flag: "🇸🇹" },
  { name: "Saudi Arabia", code: "SA", dial: "+966", flag: "🇸🇦" },
  { name: "Senegal", code: "SN", dial: "+221", flag: "🇸🇳" },
  { name: "Serbia", code: "RS", dial: "+381", flag: "🇷🇸" },
  { name: "Seychelles", code: "SC", dial: "+248", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "SL", dial: "+232", flag: "🇸🇱" },
  { name: "Singapore", code: "SG", dial: "+65", flag: "🇸🇬" },
  { name: "Slovakia", code: "SK", dial: "+421", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", dial: "+386", flag: "🇸🇮" },
  { name: "Solomon Islands", code: "SB", dial: "+677", flag: "🇸🇧" },
  { name: "Somalia", code: "SO", dial: "+252", flag: "🇸🇴" },
  { name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", dial: "+82", flag: "🇰🇷" },
  { name: "South Sudan", code: "SS", dial: "+211", flag: "🇸🇸" },
  { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "LK", dial: "+94", flag: "🇱🇰" },
  { name: "Sudan", code: "SD", dial: "+249", flag: "🇸🇩" },
  { name: "Suriname", code: "SR", dial: "+597", flag: "🇸🇷" },
  { name: "Sweden", code: "SE", dial: "+46", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", dial: "+41", flag: "🇨🇭" },
  { name: "Syria", code: "SY", dial: "+963", flag: "🇸🇾" },
  { name: "Taiwan", code: "TW", dial: "+886", flag: "🇹🇼" },
  { name: "Tajikistan", code: "TJ", dial: "+992", flag: "🇹🇯" },
  { name: "Tanzania", code: "TZ", dial: "+255", flag: "🇹🇿" },
  { name: "Thailand", code: "TH", dial: "+66", flag: "🇹🇭" },
  { name: "Timor-Leste", code: "TL", dial: "+670", flag: "🇹🇱" },
  { name: "Togo", code: "TG", dial: "+228", flag: "🇹🇬" },
  { name: "Tonga", code: "TO", dial: "+676", flag: "🇹🇴" },
  { name: "Trinidad and Tobago", code: "TT", dial: "+1-868", flag: "🇹🇹" },
  { name: "Tunisia", code: "TN", dial: "+216", flag: "🇹🇳" },
  { name: "Turkey", code: "TR", dial: "+90", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "TM", dial: "+993", flag: "🇹🇲" },
  { name: "Tuvalu", code: "TV", dial: "+688", flag: "🇹🇻" },
  { name: "Uganda", code: "UG", dial: "+256", flag: "🇺🇬" },
  { name: "Ukraine", code: "UA", dial: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
  { name: "Uruguay", code: "UY", dial: "+598", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "UZ", dial: "+998", flag: "🇺🇿" },
  { name: "Vanuatu", code: "VU", dial: "+678", flag: "🇻🇺" },
  { name: "Vatican City", code: "VA", dial: "+379", flag: "🇻🇦" },
  { name: "Venezuela", code: "VE", dial: "+58", flag: "🇻🇪" },
  { name: "Vietnam", code: "VN", dial: "+84", flag: "🇻🇳" },
  { name: "Yemen", code: "YE", dial: "+967", flag: "🇾🇪" },
  { name: "Zambia", code: "ZM", dial: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", dial: "+263", flag: "🇿🇼" },
];

// Workflow options for multi-select
const WORKFLOW_OPTIONS = [
  "Lead Generation",
  "SEO & Content Automation",
  "AI Chatbot",
  "AI Phone Bot",
  "Property Listing Automation",
  "Appointment Booking",
  "CRM Automation",
  "Social Media Automation",
  "Email Follow-ups",
];

// Client type options
const CLIENT_TYPES = [
  "Private person",
  "Content creator",
  "Agency",
  "Business",
];

// Timeline options
const TIMELINE_OPTIONS = [
  "ASAP (1-3 days)",
  "This week",
  "This month",
  "Just exploring",
];

// Budget options
const BUDGET_OPTIONS = [
  "< €300",
  "€300–€600",
  "€600–€1,200",
  "€1,200–€3,000",
  "€3,000+",
  "Not sure yet",
];

// Use environment-aware API URL (local in dev, production URL in prod)
const API_ENDPOINT = "/api/leads";

export function MultiStepForm() {
  // Form state
  const [step, setStep] = useState(0); // 0 = intro, 1-9 = steps, 10 = success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    socials: "",
    projectType: "",
    description: "",
    extraInfo: "",
  });

  // Phone country selector state
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find(c => c.code === "DE") || COUNTRIES[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);

  // Client type state
  const [clientType, setClientType] = useState("");
  const [otherClientType, setOtherClientType] = useState("");

  // Workflow multi-select state
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [otherWorkflow, setOtherWorkflow] = useState("");
  const [showOtherWorkflow, setShowOtherWorkflow] = useState(false);
  const [workflowOpen, setWorkflowOpen] = useState(false);

  // Timeline and budget
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");

  // Total steps (not counting intro and success)
  const totalSteps = 9;
  const progressPercent = step === 0 ? 0 : Math.min((step / totalSteps) * 100, 100);

  // Partial submission after step 2 - send only name and email
  async function submitPartial() {
    try {
      await fetch(getApiUrl(API_ENDPOINT), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: "",
          socials: "",
          projectType: "Partial - awaiting completion",
          description: "Partial submission",
          extraInfo: "",
        }),
      });
    } catch {
      // Silent fail for partial submission
    }
  }

  // Final submission
  async function submitFinal() {
    setLoading(true);
    setError("");

    // Combine phone
    const fullPhone = phoneNumber ? `${selectedCountry.dial} ${phoneNumber}` : "";

    // Combine project type from client type and workflows
    const workflows = [...selectedWorkflows];
    if (showOtherWorkflow && otherWorkflow) {
      workflows.push(otherWorkflow);
    }
    const projectTypeValue = `Client: ${clientType === "Other" ? otherClientType : clientType}; Workflows: ${workflows.join(", ")}`;

    // Combine extra info
    const extraInfoValue = `Timeline: ${timeline}; Budget: ${budget}`;

    const payload: FormData = {
      name: formData.name,
      email: formData.email,
      phone: fullPhone,
      socials: formData.socials,
      projectType: projectTypeValue,
      description: formData.description,
      extraInfo: extraInfoValue,
    };

    try {
      const res = await fetch(getApiUrl(API_ENDPOINT), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setStep(10); // Success screen
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Navigation
  function nextStep() {
    // Validation for each step
    if (step === 1 && !formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (step === 2 && !formData.email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (step === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (step === 4 && !clientType) {
      setError("Please select a client type");
      return;
    }
    if (step === 4 && clientType === "Other" && !otherClientType.trim()) {
      setError("Please specify your client type");
      return;
    }
    if (step === 5 && selectedWorkflows.length === 0 && !otherWorkflow.trim()) {
      setError("Please select at least one workflow");
      return;
    }
    if (step === 6 && !formData.description.trim()) {
      setError("Please describe your biggest bottleneck");
      return;
    }
    if (step === 7 && !timeline) {
      setError("Please select a timeline");
      return;
    }
    if (step === 8 && !budget) {
      setError("Please select a budget range");
      return;
    }

    setError("");

    // Partial submission after email step
    if (step === 2) {
      submitPartial();
    }

    // Final submission on last step
    if (step === 9) {
      submitFinal();
      return;
    }

    setStep(step + 1);
  }

  function prevStep() {
    setError("");
    if (step > 0) setStep(step - 1);
  }

  // Render step content
  function renderStep() {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground" data-testid="heading-intro">
              Welcome to Bunnycode.ai
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Thanks for being an innovator and taking the next step toward automating your work. 
              Before we begin, answer a few quick questions.
            </p>
            <Button 
              size="lg" 
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-12"
              data-testid="button-start"
            >
              Start
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" data-testid="heading-step-1">
                What's your name?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                We'd love to know who we're talking to.
              </p>
            </div>
            <Input
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="text-lg py-6"
              autoFocus
              data-testid="input-name"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" data-testid="heading-step-2">
                What's your email?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                We'll use this to send you updates and get in touch.
              </p>
            </div>
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="text-lg py-6"
              autoFocus
              data-testid="input-email"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" data-testid="heading-step-3">
                Phone number (optional)
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                For quick follow-ups if needed.
              </p>
            </div>
            <div className="flex gap-2">
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={countryOpen}
                    className="w-[140px] justify-between shrink-0"
                    data-testid="button-country-select"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.dial}</span>
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search country..." data-testid="input-country-search" />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-[300px]">
                          {COUNTRIES.map((country) => (
                            <CommandItem
                              key={country.code}
                              value={`${country.name} ${country.dial}`}
                              onSelect={() => {
                                setSelectedCountry(country);
                                setCountryOpen(false);
                              }}
                              className="cursor-pointer"
                              data-testid={`country-option-${country.code}`}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedCountry.code === country.code ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              <span className="mr-2">{country.flag}</span>
                              <span className="flex-1">{country.name}</span>
                              <span className="text-muted-foreground text-sm">{country.dial}</span>
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Input
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d\s-]/g, ""))}
                className="flex-1 text-lg py-6"
                data-testid="input-phone"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" data-testid="heading-step-4">
                What type of client are you?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                This helps us tailor our approach.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CLIENT_TYPES.map((type) => (
                <Button
                  key={type}
                  variant={clientType === type ? "default" : "outline"}
                  className="h-auto py-4 px-4 text-left justify-start"
                  onClick={() => {
                    setClientType(type);
                    setOtherClientType("");
                  }}
                  data-testid={`button-client-${type.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {type}
                </Button>
              ))}
              <Button
                variant={clientType === "Other" ? "default" : "outline"}
                className="h-auto py-4 px-4 text-left justify-start col-span-2"
                onClick={() => setClientType("Other")}
                data-testid="button-client-other"
              >
                Other
              </Button>
            </div>
            {clientType === "Other" && (
              <Input
                type="text"
                placeholder="Please specify..."
                value={otherClientType}
                onChange={(e) => setOtherClientType(e.target.value)}
                className="mt-4"
                autoFocus
                data-testid="input-client-other"
              />
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" data-testid="heading-step-5">
                What workflows do you want to automate?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Select all that apply.
              </p>
            </div>
            <Popover open={workflowOpen} onOpenChange={setWorkflowOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={workflowOpen}
                  className="w-full justify-between h-auto min-h-[48px] py-3 px-4"
                  data-testid="button-workflow-select"
                >
                  <span className="text-left flex-1 truncate">
                    {selectedWorkflows.length > 0
                      ? `${selectedWorkflows.length} workflow${selectedWorkflows.length > 1 ? "s" : ""} selected`
                      : "Select workflows..."}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search workflows..." data-testid="input-workflow-search" />
                  <CommandList>
                    <CommandEmpty>No workflow found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-[280px]">
                        {WORKFLOW_OPTIONS.map((workflow) => (
                          <CommandItem
                            key={workflow}
                            value={workflow}
                            onSelect={() => {
                              if (selectedWorkflows.includes(workflow)) {
                                setSelectedWorkflows(selectedWorkflows.filter((w) => w !== workflow));
                              } else {
                                setSelectedWorkflows([...selectedWorkflows, workflow]);
                              }
                            }}
                            className="cursor-pointer"
                            data-testid={`workflow-${workflow.toLowerCase().replace(/[\s&]+/g, "-")}`}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <Checkbox
                                checked={selectedWorkflows.includes(workflow)}
                                className="pointer-events-none"
                              />
                              <span className="flex-1">{workflow}</span>
                            </div>
                          </CommandItem>
                        ))}
                        <CommandItem
                          value="Other"
                          onSelect={() => setShowOtherWorkflow(!showOtherWorkflow)}
                          className="cursor-pointer"
                          data-testid="workflow-other"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Checkbox
                              checked={showOtherWorkflow}
                              className="pointer-events-none"
                            />
                            <span className="flex-1">Other</span>
                          </div>
                        </CommandItem>
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedWorkflows.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedWorkflows.map((workflow) => (
                  <span
                    key={workflow}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                  >
                    {workflow}
                    <button
                      type="button"
                      onClick={() => setSelectedWorkflows(selectedWorkflows.filter((w) => w !== workflow))}
                      className="ml-1 hover:text-destructive"
                      data-testid={`remove-workflow-${workflow.toLowerCase().replace(/[\s&]+/g, "-")}`}
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}
            {showOtherWorkflow && (
              <Input
                type="text"
                placeholder="Describe your workflow..."
                value={otherWorkflow}
                onChange={(e) => setOtherWorkflow(e.target.value)}
                className="mt-2"
                autoFocus
                data-testid="input-workflow-other"
              />
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" data-testid="heading-step-6">
                What's your biggest bottleneck?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Tell us about the main challenge you're facing.
              </p>
            </div>
            <Textarea
              placeholder="Describe your biggest bottleneck or challenge..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[120px] resize-none"
              autoFocus
              data-testid="input-description"
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" data-testid="heading-step-7">
                What's your timeline?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                When do you need this automation running?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TIMELINE_OPTIONS.map((option) => (
                <Button
                  key={option}
                  variant={timeline === option ? "default" : "outline"}
                  className="h-auto py-4 px-4 text-left justify-start"
                  onClick={() => setTimeline(option)}
                  data-testid={`button-timeline-${option.toLowerCase().replace(/[\s()–-]+/g, "-")}`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" data-testid="heading-step-8">
                What's your budget range?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                This helps us recommend the right solution.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BUDGET_OPTIONS.map((option) => (
                <Button
                  key={option}
                  variant={budget === option ? "default" : "outline"}
                  className="h-auto py-4 px-4 text-left justify-start"
                  onClick={() => setBudget(option)}
                  data-testid={`button-budget-${option.toLowerCase().replace(/[€<>\s–+]+/g, "-")}`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2" data-testid="heading-step-9">
                Instagram username (optional)
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                We'd love to connect with you there too!
              </p>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
              <Input
                type="text"
                placeholder="yourusername"
                value={formData.socials}
                onChange={(e) => setFormData({ ...formData, socials: e.target.value.replace(/^@/, "") })}
                className="pl-8 text-lg py-6"
                data-testid="input-instagram"
              />
            </div>
          </div>
        );

      case 10:
        return (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground" data-testid="heading-success">
              Thank you!
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              We'll analyze your answers and get back to you shortly. 
              Keep an eye on your inbox!
            </p>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      {step > 0 && step < 10 && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      )}

      {/* Step content */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
        {renderStep()}

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm" data-testid="text-error">
            {error}
          </div>
        )}

        {/* Navigation buttons */}
        {step > 0 && step < 10 && (
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex-1"
                disabled={loading}
                data-testid="button-back"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            <Button
              onClick={nextStep}
              className="flex-1"
              disabled={loading}
              data-testid="button-next"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : step === 9 ? (
                <>
                  Submit
                  <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Skip button for optional fields */}
        {(step === 3 || step === 9) && (
          <Button
            variant="ghost"
            onClick={() => {
              setError("");
              if (step === 9) {
                submitFinal();
              } else {
                setStep(step + 1);
              }
            }}
            className="w-full mt-3 text-muted-foreground"
            disabled={loading}
            data-testid="button-skip"
          >
            Skip this step
          </Button>
        )}
      </div>
    </div>
  );
}
