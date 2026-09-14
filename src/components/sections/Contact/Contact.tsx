"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, staggerItem, fadeInUp, VIEWPORT_MARGIN } from "@/config/animations";
import contactData from "@/data/contact.json";
import type { ContactData } from "@/types";

const data = contactData as ContactData;

const Contact = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || serviceId === "your_service_id") {
      // EmailJS not configured — open mailto instead
      const formData = new FormData(form);
      const subject = encodeURIComponent((formData.get("subject") as string) || "Portfolio Contact");
      const body = encodeURIComponent((formData.get("message") as string) || "");
      window.open(`mailto:${data.contact_options[0]?.value}?subject=${subject}&body=${body}`);
      setFormState("sent");
      setTimeout(() => setFormState("idle"), 3000);
      return;
    }

    try {
      setFormState("sending");
      await emailjs.sendForm(serviceId, templateId, form, {
        publicKey: publicKey,
      });
      setFormState("sent");
      form.reset();
      setTimeout(() => setFormState("idle"), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <>
      <SectionHeader number="08" eyebrow="Get In Touch" title="Contact" />

      <div className="grid gap-8 lg:grid-cols-5" style={{ maxWidth: 960, marginInline: "auto" }}>
        {/* Contact cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: VIEWPORT_MARGIN }}
          className="lg:col-span-2 space-y-4"
        >
          {data.contact_options.map((option) => (
            <motion.a
              key={option.id}
              variants={staggerItem}
              href={option.link}
              target={option.type !== "email" ? "_blank" : undefined}
              rel={option.type !== "email" ? "noopener noreferrer" : undefined}
              className="glass-card p-4 flex items-center gap-4 group"
              style={{ display: "flex" }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgb(var(--ch-blue) / 0.12)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                {option.type === "linkedin" && <FaLinkedin size={18} />}
                {option.type === "github" && <FaGithub size={18} />}
                {option.type === "whatsapp" && <FaWhatsapp size={18} />}
                {option.type === "email" && <FaEnvelope size={18} />}
                {/* Fallback */}
                {["linkedin", "github", "whatsapp", "email"].indexOf(option.type) === -1 && <Mail size={18} />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                  {option.label}
                </p>
                <p className="text-sm truncate" style={{ color: "var(--color-text-secondary)" }}>
                  {option.value}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact form */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: VIEWPORT_MARGIN }}
          className="lg:col-span-3"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-field">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="form-input"
              />
            </div>
            <div className="form-field">
              <textarea
                name="message"
                placeholder="Your message..."
                rows={5}
                required
                className="form-input"
                style={{ resize: "vertical" }}
              />
            </div>
            <button
              type="submit"
              disabled={formState === "sending"}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm"
            >
              {formState === "sending" && "Sending..."}
              {formState === "sent" && (
                <>
                  <CheckCircle size={16} />
                  Sent!
                </>
              )}
              {formState === "error" && (
                <>
                  <AlertCircle size={16} />
                  Error — Try Again
                </>
              )}
              {formState === "idle" && (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
