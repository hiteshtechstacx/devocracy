
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <>
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="glass-morphism p-8 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
              
              <div className="space-y-6 text-muted-foreground">
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
                  <p>
                    At BlockAuth, we are committed to providing a frictionless authentication experience while respecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our blockchain-based authentication service for voting systems.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Information We Collect</h2>
                  <p className="mb-3">
                    To provide our blockchain authentication service, we collect minimal information:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Blockchain wallet addresses for authentication purposes</li>
                    <li>Basic account information such as username</li>
                    <li>Authentication events and timestamps for security purposes</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">How We Use Your Information</h2>
                  <p className="mb-3">
                    We only use the collected information to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Verify your identity through blockchain authentication</li>
                    <li>Provide secure access to voting systems</li>
                    <li>Maintain and improve the security of our service</li>
                    <li>Comply with legal requirements</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">We Do Not Sell Your Data</h2>
                  <p>
                    <strong>We do not sell, trade, or rent your personal information to third parties.</strong> Our business model is based on providing secure authentication services, not monetizing user data. Any information we collect is solely used to provide and improve our authentication service.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Blockchain Privacy</h2>
                  <p>
                    Our blockchain-based authentication system is designed with privacy in mind. While blockchain transactions are publicly visible, we implement privacy-enhancing technologies to minimize the exposure of personally identifiable information on the blockchain.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Data Security</h2>
                  <p>
                    We employ industry-standard security measures to protect your information. The decentralized nature of blockchain technology provides additional security through its immutable and transparent properties, making unauthorized access and data tampering extremely difficult.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Data Retention</h2>
                  <p>
                    We retain your information only for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. When your data is no longer needed, we will securely delete or anonymize it.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Your Rights</h2>
                  <p className="mb-3">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>The right to access your personal information</li>
                    <li>The right to correct inaccurate information</li>
                    <li>The right to delete your information</li>
                    <li>The right to restrict or object to processing</li>
                    <li>The right to data portability</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes through our website or other communication channels.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">Contact Us</h2>
                  <p>
                    If you have any questions or concerns about our Privacy Policy or how we handle your personal information, please contact us at privacy@blockauth.com.
                  </p>
                </section>
                
                <p className="text-sm text-muted-foreground pt-4 border-t border-white/10">
                  Last Updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Privacy;
