"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contact.errors.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contact.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.errors.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.errors.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 backdrop-blur-sm transition-all duration-300 focus:border-neon-red/50 focus:outline-none focus:ring-1 focus:ring-neon-red/30 focus:shadow-[0_0_15px_rgba(255,23,68,0.1)]";
  const errorClasses = "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/30";

  return (
    <SectionWrapper id="contact" title={t.contact.title}>
      <motion.p
        variants={itemVariants}
        className="mx-auto mb-10 max-w-lg text-center text-[var(--text-secondary)]"
      >
        {t.contact.subtitle}
      </motion.p>

      <motion.div variants={itemVariants} className="mx-auto max-w-lg">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass neon-border rounded-xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neon-red/10"
              >
                <svg
                  className="h-8 w-8 text-neon-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </motion.div>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {t.contact.success}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              noValidate
              className="glass neon-border space-y-5 rounded-xl p-6 sm:p-8"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
                >
                  {t.contact.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`${inputClasses} ${errors.name ? errorClasses : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
                >
                  {t.contact.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`${inputClasses} ${errors.email ? errorClasses : ""}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
                >
                  {t.contact.message}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClasses} resize-none ${errors.message ? errorClasses : ""}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                icon={
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                }
              >
                {t.contact.send}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
