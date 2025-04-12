import { useState } from "react";
import styles from "./contactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Email sent successfully");
        // Clear the form inputs
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        console.error("Error sending email:", result);
        toast.error(`Error sending email: ${result.message}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(`Error sending email: ${error.message}`);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <h2>Get in Touch</h2>
      <p>
        Have questions about our AI chatbot solutions? Contact us today and our
        team will be happy to help.
      </p>
      <form
        id="contact-form"
        className={styles.contactForm}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button className={styles.formButton} type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
}
