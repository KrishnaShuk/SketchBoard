"use client";

import Link from "next/link";
import { Button } from "@repo/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, PenTool, Users, Zap } from "lucide-react";
import Image from "next/image";
import heroImage from "@/assets/hero-whiteboard.jpg"; 

const Squiggle = () => (
  <svg
    className="absolute bottom-0 left-0 w-full h-2 text-primary"
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M2 5.5C20.42 -2.5 79.58 8.5 98 2"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.8 }}
    />
  </svg>
);

// Define the shape of the component's props
interface LandingPageClientProps {
  isLoggedIn: boolean;
}

export function LandingPageClient({ isLoggedIn }: LandingPageClientProps) {
  const features = [
    {
      icon: PenTool,
      title: "Intuitive Sketching",
      description: "Draw freely with tools that feel natural and responsive. Your ideas, your way.",
    },
    {
      icon: Users,
      title: "Real-Time Collaboration",
      description: "Work together on the same canvas from anywhere in the world. See changes instantly.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "No lag, no waiting. Built for performance so your creativity can flow uninterrupted.",
    },
  ];

  return (
    <div className="font-sans">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl sm:text-7xl font-bold font-handwriting tracking-tight">
            Turn Ideas into Reality.
          </h1>
          <h2 className="mt-4 text-5xl sm:text-7xl font-bold font-handwriting tracking-tight">
            Visually.{" "}
            <span className="relative inline-block">
              Together.
              <Squiggle />
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mt-8 text-lg text-muted-foreground">
            SketchBoard is a free, open-source digital whiteboard for sketching hand-drawn diagrams. Perfect for brainstorming, wireframing, and collaborative design.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button className="group bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 text-lg py-3 px-6">
                  Go to Your Dashboard
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button className="group bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 text-lg py-3 px-6">
                  Start Drawing Free
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* Image Preview Section */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative rounded-xl border border-border shadow-2xl shadow-primary/10 overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-surface"></div>
          <Image
            src={heroImage}
            alt="An example of a collaborative design sketch on the SketchBoard app"
            priority
            className="w-full"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-handwriting">Everything you need. Nothing you don't.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to get out of your way and let you create.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="p-8 bg-surface border border-border rounded-lg"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-md border border-primary/20">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-6 font-sans text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}