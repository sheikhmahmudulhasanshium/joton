// src/app/(routes)/privacy/page.tsx

import { Inter } from 'next/font/google';
import Footer from "@/app/components/common/footer";
import { Header } from "@/app/components/common/header";
import BasicBodyProvider from "@/app/components/providers/basic-body-provider";
import BasicPageProvider from "@/app/components/providers/basic-page-provider";

const inter = Inter({ subsets: ['latin'] });

const PrivacyPolicy = () => {
  return (
    <BasicPageProvider fontClassName={inter.className}>
      <BasicBodyProvider header={<Header variant="landing" />} footer={<Footer />}>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="prose dark:prose-invert max-w-4xl mx-auto">
            <h1>Privacy Policy</h1>
            <p className="lead">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="p-4 mb-6 rounded-lg border border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20">
              <p className="font-bold text-yellow-800 dark:text-yellow-300">
                IMPORTANT NOTICE: This is a demonstration project for portfolio purposes only.
              </p>
              <p className="text-yellow-700 dark:text-yellow-400">
                This website, &ldquo;JOTON&rdquo;, is not a real company or a functional Healthcare Management System. It is a non-commercial project for experimental and demonstration use. No real data should be entered or is expected to be stored on this platform.
              </p>
            </div>

            <h2>1. Project Scope and Purpose</h2>
            <p>
              This website and its associated services (collectively, &ldquo;JOTON&rdquo;) are a non-commercial, experimental portfolio project created by <strong>Sheikh Mahmudul Hasan Shium</strong>. The primary purpose of this project is to showcase technical skills and design concepts in web application development.
            </p>

            <h2>2. Data Handling and Fictional Information</h2>
            <p>
              We do not knowingly collect, store, or process any real personal, medical, or sensitive information. All data you see within the platform—such as patient names, staff details, appointments, and medical records—is entirely fictional and generated for demonstration purposes.
            </p>
            <p>
              <strong>Under no circumstances should you enter real patient data, personal identification numbers, financial information, or any other sensitive personal data into this system.</strong>
            </p>

            <h2>3. Use of AI-Generated Content</h2>
            <p>
              To create a realistic user experience, this project utilizes artificially generated data and images. Content such as user profiles, patient histories, and imagery are products of AI models and do not represent real individuals or events.
            </p>

            <h2>4. Security and Scams</h2>
            <p>
              While this project implements standard authentication flows for demonstration, it is not designed with production-grade security and should not be treated as a secure platform. Please be aware that JOTON is not a real service. <strong>Do not be scammed by anyone claiming to represent JOTON for commercial purposes.</strong> This platform will never ask you for payment or real personal information.
            </p>

            <h2>5. Disclaimer of Liability</h2>
            <p>
              The owner and creator of this project, <strong>Sheikh Mahmudul Hasan Shium</strong>, shall not be held responsible for any data loss, misuse, or any legal issues that may arise from the use or misuse of this demonstration platform. Your use of this experimental service is entirely at your own risk.
            </p>
            
            {/* --- THIS SECTION HAS BEEN UPDATED --- */}
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this project or this Privacy Policy, please feel free to contact the owner, Sheikh Mahmudul Hasan Shium, through the contact form on{' '}
              <a 
                href="https://iamshium.vercel.app/#text-me" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                his personal portfolio website
              </a>.
            </p>
          </article>
        </div>
      </BasicBodyProvider>
    </BasicPageProvider>
  );
}
 
export default PrivacyPolicy;