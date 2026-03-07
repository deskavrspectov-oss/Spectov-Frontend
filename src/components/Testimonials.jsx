import React from "react";
import "../Styles/Testimonials.css";
import microsoft from "../assets/company/microsoft_logo.jpg";
import vnest from "../assets/company/vnest_logo.jpg";
import fortis from "../assets/company/fortis_logo.jpg";
import startupwala from "../assets/company/startupwala_logo.jpg";
import ey from "../assets/company/ey.png";
import welluno from "../assets/company/welluno.png";
import tcs from "../assets/company/tcs.png";
// Add correct Nokia logo if available, otherwise remove it
import nokia from "../assets/company/nokia.png";

// Reusable Marquee component – now handles duplicate keys safely
const Marquee = ({ children, reverse = false, speed = 20 }) => {
  // Convert children to array (in case a single child is passed)
  const childrenArray = React.Children.toArray(children);

  // Render two copies with unique keys
  const content = (
    <>
      {childrenArray.map((child, index) =>
        React.cloneElement(child, { key: `marquee-1-${index}` })
      )}
      {childrenArray.map((child, index) =>
        React.cloneElement(child, { key: `marquee-2-${index}` })
      )}
    </>
  );

  return (
    <div
      className={`marquee ${reverse ? "reverse" : ""}`}
      style={{ animationDuration: `${speed}s` }}
    >
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
    { src: nokia, name: "Nokia" },  // Replace with correct import
    { src: welluno, name: "Welluno" },
    { src: tcs, name: "TCS" },
    { src: ey, name: "EY" },
  ];

  return (
    <section className="testimonial_container" aria-label="Testimonials from our valuable clients">
      <h2 className="testimonial_title">Our Valuable Clients</h2>

      <div className="review_container">
        <div className="testimonial_customers">
          <Marquee speed={25}>
            {customers.map((customer, index) => (
              <div key={index} className="testimonial_card">
                <img
                  src={customer.src}
                  alt={`${customer.name} logo`}
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;