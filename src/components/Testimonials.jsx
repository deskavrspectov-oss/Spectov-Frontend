import React from "react";
import "../Styles/Testimonials.css";
import microsoft from "../assets/company/microsoft_logo.jpg";
import vnest from "../assets/company/vnest_logo.jpg";
import fortis from "../assets/company/fortis_logo.jpg";
import startupwala from "../assets/company/startupwala_logo.jpg";

// Reusable Marquee component for DRY code
const Marquee = ({ children, reverse = false, speed = 20 }) => {
  // Duplicate children to ensure seamless loop (double the content)
  // For very wide screens, you might need more copies; but two is usually enough.
  const content = (
    <>
      {children}
      {children}
    </>
  );

  return (
    <div className={`marquee ${reverse ? "reverse" : ""}`} style={{ animationDuration: `${speed}s` }}>
      <div className="marquee_content">{content}</div>
    </div>
  );
};

const Testimonials = () => {
  const customers = [
    { src: microsoft, name: "Microsoft" },
    { src: vnest, name: "Vnest" },
    { src: fortis, name: "Fortis" },
    { src: startupwala, name: "Startupwala" },
  ];

  const reviews = [
    { name: "John Doe", rating: 5, text: "Great service, highly recommended! They went above and beyond to ensure we were satisfied." },
    { name: "Jane Smith", rating: 4, text: "Very good experience overall. Quick response times and professional team." },
    { name: "Mike Johnson", rating: 5, text: "Excellent support and great quality. Will definitely use again!" },
    { name: "Sarah Lee", rating: 5, text: "Outstanding! The team delivered exactly what we needed." }, // Added extra review for demonstration
  ];

  return (
    <section className="testimonial_container" aria-label="Testimonials from our valuable clients">
      <h2 className="testimonial_title">Our Valuable Clients</h2>

      <div className="review_container">
        {/* Customer Logos Marquee */}
        <div className="testimonial_customers">
          <Marquee speed={25}> {/* Slower speed for logos */}
            {customers.map((customer, index) => (
              <div key={index} className="testimonial_card">
                <img src={customer.src} alt={`${customer.name} logo`} loading="lazy" />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Reviews Marquee (opposite direction) */}
        <div className="testimonial_reviews">
          <Marquee reverse speed={20}>
            {reviews.map((review, index) => (
              <div key={index} className="review_card">
                <div className="review_avatar" role="img" aria-label="User avatar"></div>
                <div className="review_content">
                  <div className="review_name">{review.name}</div>
                  <div className="review_rating" aria-label={`Rating: ${review.rating} out of 5`}>
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <div className="review_text">{review.text}</div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;