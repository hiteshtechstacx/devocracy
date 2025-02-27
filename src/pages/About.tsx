
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle, Globe, Users, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Rahul Sharma",
      role: "Founder & CEO",
      description: "Blockchain expert with 10+ years of experience in security systems."
    },
    {
      name: "Priya Patel",
      role: "CTO",
      description: "Former security researcher with expertise in cryptographic systems."
    },
    {
      name: "Aditya Kumar",
      role: "Head of Design",
      description: "UX specialist focused on creating accessible and secure interfaces."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "DevoCracy was founded with a mission to make voting more secure and accessible."
    },
    {
      year: "2021",
      title: "First Pilot Program",
      description: "Successfully conducted pilot voting programs across 5 universities in India."
    },
    {
      year: "2022",
      title: "Major Funding",
      description: "Secured ₹10 crore in funding to expand operations across India."
    },
    {
      year: "2023",
      title: "National Recognition",
      description: "Recognized by the Indian government for innovation in digital governance."
    }
  ];

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 flex justify-center"
              >
                <Logo size="lg" />
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About <span className="text-gradient">DevoCracy</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                DevoCracy is a pioneering platform that combines blockchain technology with user-friendly interfaces 
                to create the most secure, transparent, and accessible voting system for India.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  To revolutionize democratic processes in India by providing a secure, transparent, and accessible 
                  platform for voting that leverages the power of blockchain technology.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  className="glass-morphism p-6 rounded-xl text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-primary/20 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Security</h3>
                  <p className="text-muted-foreground">
                    Implementing cutting-edge blockchain security to ensure votes cannot be tampered with.
                  </p>
                </motion.div>
                
                <motion.div
                  className="glass-morphism p-6 rounded-xl text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-primary/20 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                  <p className="text-muted-foreground">
                    Making voting accessible to every Indian citizen, regardless of location or technical expertise.
                  </p>
                </motion.div>
                
                <motion.div
                  className="glass-morphism p-6 rounded-xl text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-primary/20 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Privacy</h3>
                  <p className="text-muted-foreground">
                    Ensuring voter privacy while maintaining the integrity and transparency of the voting process.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 px-4 bg-muted/10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind DevoCracy, committed to transforming the democratic process in India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="glass-morphism p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-primary text-sm text-center mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-center">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* History Timeline */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The key milestones in our mission to revolutionize voting in India.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex mb-8 last:mb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-4 md:mr-8">
                    <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="glass-morphism p-4 md:p-6 rounded-xl">
                      <span className="text-primary text-sm font-semibold">{milestone.year}</span>
                      <h3 className="text-lg font-medium mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 px-4 bg-muted/10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The core principles that guide our work and decision-making.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div
                className="glass-morphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in creating systems that are inherently trustworthy through transparency and 
                  verifiability, so that citizens can have confidence in democratic processes.
                </p>
              </motion.div>
              
              <motion.div
                className="glass-morphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3">Innovation & Excellence</h3>
                <p className="text-muted-foreground">
                  We are committed to continuous innovation and technical excellence, always 
                  seeking better solutions to complex problems in democratic systems.
                </p>
              </motion.div>
              
              <motion.div
                className="glass-morphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We design our systems to be accessible to all citizens of India, regardless of technical 
                  literacy, physical ability, or geographic location.
                </p>
              </motion.div>
              
              <motion.div
                className="glass-morphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3">Social Impact</h3>
                <p className="text-muted-foreground">
                  We measure our success not just by technical achievements, but by our positive 
                  impact on democratic participation and civic engagement across India.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
