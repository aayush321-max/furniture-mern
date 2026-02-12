









import "./Contact.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaInstagram, FaFacebookF, FaTwitter,FaWhatsapp } from "react-icons/fa";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    if (!nameRegex.test(name)) {
      toast.error("Name should contain only letters");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter valid email");
      return;
    }

    if (message.length < 10) {
      toast.error("Message must be 10+ characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Support request sent ✅");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact">
      <h2 className="contact-title">Help & Support</h2>

      <div className="contact-grid">

        {/* INFO */}
        <div className="contact-card">
          <h3>Customer Support</h3>
          <p>
            Need help with orders, refunds, or products?  
            Our FurniLux support team is ready to assist.
          </p>
          <p>
  <b>Email:</b>{" "}
  <a href="mailto:support@furnilux.com">
    support@furnilux.com
  </a>
</p>

<p>
  <b>Customer Care:</b>{" "}
  <a href="tel:+919876543210">
    +91 98765 43210
  </a>
</p>

<p>
  <b>Landline:</b>{" "}
  <a href="tel:01145678900">
    011-4567-8900
  </a>
</p>

<p><b>Working Hours:</b> Mon–Sat (10AM – 7PM)</p>

<p style={{ color: "green" }}>
  ✔ 24/7 Chat Support Available
</p>

    
          <div className="contact-social">
            <a href="https://instagram.com" target="_blank"
            rel="noopener noreferrer">

              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank"
            rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank"
            rel="noopener noreferrer">
              <FaTwitter />
              
            </a>
            <a
  href="https://wa.me/919876543210"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaWhatsapp />
</a>
            
          </div>
        </div>

        {/* SUPPORT FORM */}
        <div className="contact-card">
          <h3>Submit a Request</h3>

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* NEW SUBJECT DROPDOWN */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>General Inquiry</option>
            <option>Order Issue</option>
            <option>Refund Request</option>
            <option>Product Help</option>
            <option>Delivery Problem</option>
          </select>

          <textarea
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendMessage} disabled={loading}>
            {loading ? "Sending..." : "Submit Request"}
          </button>
        </div>

        {/* MAP */}
        <div className="contact-card map-box">
          <h3>Our Location</h3>
          <iframe
            title="map"
            src="https://www.google.com/maps?q=New%20Delhi&output=embed"
          ></iframe>
        </div>

      </div>
    </section>
  );
}

export default Contact;