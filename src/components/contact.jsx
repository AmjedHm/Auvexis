import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true, msg: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);

    emailjs
      .send(
        "service_hye0tag",   // Your service ID
        "template_vdohs0r",  // Your template ID
        {
          user_name: name,
          user_email: email,
          user_message: message,
        },
        "Y_ie0yBoeGFqIYs9O"  // Your public key
      )
      .then(
        () => {
          setToast({ show: true, success: true, msg: "Message sent! ✅" });
          clearState();
          setSending(false);
          setTimeout(() => setToast({ ...toast, show: false }), 3000);
        },
        (error) => {
          console.log(error.text);
          setToast({ show: true, success: false, msg: "Failed to send ❌" });
          setSending(false);
          setTimeout(() => setToast({ ...toast, show: false }), 3000);
        }
      );
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>

              {/* Contact Form */}
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-custom btn-lg" disabled={sending}>
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span><i className="fa fa-map-marker"></i> Address</span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span><i className="fa fa-phone"></i> Phone</span> {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span><i className="fa fa-envelope-o"></i> Email</span>{" "}
                {props.data ? <a href={`mailto:${props.data.email}`}>{props.data.email}</a> : "loading"}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li><a href={props.data ? props.data.facebook : "/"}><i className="fa fa-facebook"></i></a></li>
                  <li><a href={props.data ? props.data.linkedin : "/"}><i className="fa fa-linkedin"></i></a></li>
                  <li><a href={props.data ? props.data.instagram : "/"}><i className="fa fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`toast ${toast.success ? "toast-success" : "toast-error"}`}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "15px 25px",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: "500",
            zIndex: 9999,
            backgroundColor: toast.success ? "#070d22" : "#080d22",
            animation: "fadeInOut 3s forwards",
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* Footer */}
      <div id="footer">
        <div className="container text-center">
          <p>© 2026 AUVEXIS Robotics — Autonomous Systems for Modern Industries</p>
        </div>
      </div>

      {/* Inline keyframes animation */}
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
};