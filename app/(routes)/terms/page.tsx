// app/terms/page.tsx

import { Header } from "@/app/components/common/header";
import Footer from "@/app/components/common/footer";
import BasicBodyProvider from "@/app/components/providers/basic-body-provider";
import BasicPageProvider from "@/app/components/providers/basic-page-provider";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const TermsPage = () => {
  return (
    <BasicPageProvider fontClassName={inter.className}>
      <BasicBodyProvider header={<Header variant="landing" />} footer={<Footer />}>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="prose dark:prose-invert max-w-4xl mx-auto">
            <h1>Terms and Conditions</h1>
            <p className="lead">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to JOTON (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)! These Terms of Service (&ldquo;Terms&rdquo;, &ldquo;Terms of Service&rdquo;) govern your use of our web pages located at [Your Website URL] operated by JOTON.
            </p>
            <p>
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here [Link to Privacy Policy Page].
            </p>

            <h2>2. User Accounts</h2>
            <p>
              When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on our Service.
            </p>
            
            <h2>3. Prohibited Uses</h2>
            <p>
              You agree not to use the Service:
            </p>
            <ul>
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any &ldquo;junk mail&rdquo;, &ldquo;chain letter,&rdquo; &ldquo;spam,&rdquo; or any other similar solicitation.</li>
            </ul>

            <h2>4. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.
            </p>
            
            <h2>5. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
            </p>

            <h2>6. Changes to Service</h2>
            <p>
              We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              Please send your feedback, comments, requests for technical support by email: <strong>support@joton.com</strong>.
            </p>
          </article>
        </div>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
};

export default TermsPage;