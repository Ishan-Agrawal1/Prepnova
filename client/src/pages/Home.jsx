import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";
import { FileText, Mic, Laptop, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="home-layout">
      <Navbar />

      <div className="home-content">

        {/* HERO */}
        <motion.section 
          className="hero flex flex-col items-center justify-center text-center py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Don't Just Practice. Perform.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            AI-powered interview preparation platform to analyze, improve, and master your skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Start Analysis</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">Try Interview</Button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* FEATURES */}
        <motion.section 
          className="features grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.8 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.03, y: -5 }}>
            <Card className="h-full bg-card/80 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">AI Resume Analyzer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm">Get instant feedback and score your resume.</CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.03, y: -5 }}>
            <Card className="h-full bg-card/80 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">AI Mock Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm">Practice with voice & video AI interviews.</CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.03, y: -5 }}>
            <Card className="h-full bg-card/80 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Laptop className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Aptitude & Coding</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm">Company-level practice tests and coding challenges.</CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.03, y: -5 }}>
            <Card className="h-full bg-card/80 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Progress Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm">Track your improvement and performance.</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* DASHBOARD */}
        <motion.section 
          className="dashboard grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="bg-card/80 backdrop-blur-md border-secondary/30">
              <CardHeader>
                <CardTitle className="text-foreground">Resume Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden border border-border">
                  <motion.div className="bg-primary h-full" initial={{ width: "0%" }} animate={{ width: "80%" }} transition={{ delay: 1.5, duration: 1 }}></motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="bg-card/80 backdrop-blur-md border-secondary/30">
              <CardHeader>
                <CardTitle className="text-foreground">Interview Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden border border-border">
                  <motion.div className="bg-secondary h-full" initial={{ width: "0%" }} animate={{ width: "65%" }} transition={{ delay: 1.7, duration: 1 }}></motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}