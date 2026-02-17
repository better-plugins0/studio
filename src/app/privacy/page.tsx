import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - BetterPlugins Hub",
  description: "Read the privacy policy for BetterPlugins Hub.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-invert mx-auto">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">Last updated: July 29, 2024</p>

        <p>Your privacy is important to us. It is BetterPlugins Hub's policy to respect your privacy regarding any information we may collect from you across our website.</p>

        <h2>1. Information we collect</h2>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
        
        <h2>2. How we use your information</h2>
        <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>

        <h2>3. Cookies</h2>
        <p>We use cookies to make our website work. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified.</p>

        <h2>4. Links to other sites</h2>
        <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>

        <h2>5. Your consent</h2>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

        <h2>6. Changes to our Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        
        <h2>7. Contact Us</h2>
        <p>If you have any questions about our Privacy Policy, please contact us through our support channels.</p>
      </div>
    </div>
  );
}
