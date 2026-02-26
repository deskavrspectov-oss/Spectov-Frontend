import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.message) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "SpectoV",
          from_email: form.email,
          to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert(
            "Thank you for reaching out to us. We will get back to you as soon as possible😊."
          );

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      id="contact"
      className="flex flex-col xl:flex-row gap-6 overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-6 xl:mt-8 border border-gray-200 shadow-xl"
    >
      {/* Left side – Contact form */}
      <div className="flex flex-col xl:flex-1 xl:w-1/2">
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-6"
        >
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-gray-800">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="rounded-lg border border-gray-300 bg-white/50 px-5 py-3 font-medium text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <span className="mt-1 text-sm font-medium text-red-500">
                {errors.name}
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="mb-2 font-medium text-gray-800">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="rounded-lg border border-gray-300 bg-white/50 px-5 py-3 font-medium text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <span className="mt-1 text-sm font-medium text-red-500">
                {errors.email}
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="mb-2 font-medium text-gray-800">Your Message</span>
            <textarea
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="rounded-lg border border-gray-300 bg-white/50 px-5 py-3 font-medium text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-400"
            />
            {errors.message && (
              <span className="mt-1 text-sm font-medium text-red-500">
                {errors.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            className="w-fit rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-bold text-white shadow-md shadow-blue-500/30 outline-none transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>

      {/* Right side – Image */}
      <div className="w-full xl:w-1/2 flex justify-center xl:justify-end items-center">
        <div className="relative w-full max-w-md xl:max-w-none xl:w-full max-h-96 group">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
          <img
            src="/c2.png"
            alt="Contact"
            className="relative w-full h-auto rounded-2xl border-4 border-white shadow-2xl object-contain max-h-96"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");