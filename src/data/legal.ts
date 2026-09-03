/**
 * Legal copy.
 *
 * These are working documents written to be accurate about what this website
 * actually does — the contact form, the résumé upload, the absence of
 * advertising trackers. They are not a substitute for review by a qualified
 * adviser in each operating jurisdiction (India and the United States) before
 * launch. Edit the content here; the pages render from it.
 */

export type LegalSection = { heading: string; paragraphs: string[] };

export const lastUpdated = "September 2026";

export const privacySections: LegalSection[] = [
  {
    heading: "What this policy covers",
    paragraphs: [
      "This policy explains what personal information Spright Software Systems collects through this website, why we collect it, and what we do with it. It applies to sprightsoft.com and to the enquiry and talent-network forms on it.",
      "It does not cover information you give us through a signed client or candidate agreement, which is governed by that agreement.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "From the contact form: your name, company, email address, optional phone number, the service you are interested in, and the message you write.",
      "From the talent-network form: your name, email address, phone number, location, primary area of expertise, years of experience, an optional LinkedIn profile URL, an optional résumé, and any message you add.",
      "We do not run advertising trackers or third-party analytics profiling on this site, and we do not sell personal information to anyone.",
    ],
  },
  {
    heading: "Why we use it",
    paragraphs: [
      "Enquiry details are used to respond to your enquiry and to discuss the hiring requirement you have described.",
      "Talent-network details are used to assess your profile against roles we are recruiting for and to contact you about opportunities that match. Where a role is a genuine match, we share relevant details of your profile with the client concerned — and we ask you first.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Enquiry correspondence is retained while the conversation is live and for a reasonable period afterwards for business records.",
      "Candidate profiles are retained while they remain relevant to the roles we recruit for. You can ask us to remove yours at any time and we will do so.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask us for a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it. Write to hr@sprightsoft.com and we will respond.",
      "Depending on where you live, you may have additional statutory rights over your personal information. We will honour them.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "Form submissions are transmitted over HTTPS and validated on the server before being delivered to our team by email. Uploaded résumés are restricted by file type and size and are not stored on this website.",
      "No transmission over the internet is entirely without risk, but we take reasonable technical and organisational measures to protect what you send us.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about this policy, or any request relating to your personal information, should go to hr@sprightsoft.com or to either of the office addresses listed in the footer of this site.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "Using this website",
    paragraphs: [
      "By accessing sprightsoft.com you agree to these terms. If you do not agree with them, please do not use the site.",
      "You may view, download and print material from this site for your own reference and for evaluating our services. You may not republish it, sell it, or present it as your own.",
    ],
  },
  {
    heading: "Accuracy of information",
    paragraphs: [
      "We take care to keep the information on this site accurate and current, but it is provided for general information. It does not form part of any contract and should not be relied on as the sole basis for a commercial decision.",
      "Descriptions of services, hiring models and timelines are indicative. The terms of any engagement are set out in the agreement signed for it.",
    ],
  },
  {
    heading: "Submissions you make",
    paragraphs: [
      "When you submit an enquiry, a profile or a résumé, you confirm the information is accurate and that you are entitled to share it with us.",
      "Do not submit confidential information belonging to a third party, or any material that is unlawful, misleading or infringing.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The Spright Software Systems name, the content of this site and its design are owned by Spright Software Systems or used under licence. Nothing on the site grants you a licence to use them.",
    ],
  },
  {
    heading: "Links to other sites",
    paragraphs: [
      "Where we link to a third-party website we do so for convenience. We do not control those sites and are not responsible for their content or their privacy practices.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, Spright Software Systems is not liable for indirect or consequential loss arising from your use of this website. Nothing in these terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We may update these terms from time to time. The version published on this page is the one that applies. Questions should go to hr@sprightsoft.com.",
    ],
  },
];
