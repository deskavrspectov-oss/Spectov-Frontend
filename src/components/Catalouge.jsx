// import React from "react";
// import Card from "./Card";
// import "../Styles/Catalouge.css";
// import cardimg1 from "../assets/signlang.jpg";
// import cardimg2 from "../assets/hologram.jpg";
// import cardimg3 from "../assets/banner.jpg";

// const cardsData = [
//   {
//     image: cardimg1,
//     title: "Real-Time Sign Language Translation",
//     paragraph:
//       "Uses advanced AI and machine learning to convert spoken language into sign language in real-time, displayed on AR glasses.",
//   },
//   {
//     image: cardimg2,
//     title: "Gesture Input and Speech Translation",
//     paragraph:
//       "Features a LiDAR sensor to interpret hand gestures, translating them into spoken language for seamless two-way communication.",
//   },
//   {
//     image: cardimg3,
//     title: "Versatile and Personalizable",
//     paragraph:
//       "Detachable frame with interchangeable frames using magnetic connectors, allowing users to personalize their device.",
//   },
// ];

// const Catalouge = () => {
//   return (
//     <div className="catalouge_container">
//       {/* <div className='catalouge_title'>
//         Product Highlights
//       </div> */}
//       <div className="catalouge_main">
//         {cardsData.map((card, index) => (
//           <Card
//             key={index}
//             image={card.image}
//             title={card.title}
//             paragraph={card.paragraph}
//             isImageLeft={index % 2 === 0} // Alternates image position
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Catalouge;

import React from "react";
import cardimg1 from "../assets/signlang.jpg";
import cardimg2 from "../assets/hologram.jpg";
import cardimg3 from "../assets/banner.jpg";

const cardsData = [
  {
    image: cardimg1,
    title: "Real-Time Sign Language Translation",
    paragraph:
      "Uses advanced AI and machine learning to convert spoken language into sign language in real-time, displayed on AR glasses.",
  },
  {
    image: cardimg2,
    title: "Gesture Input and Speech Translation",
    paragraph:
      "Features a LiDAR sensor to interpret hand gestures, translating them into spoken language for seamless two-way communication.",
  },
  {
    image: cardimg3,
    title: "Versatile and Personalizable",
    paragraph:
      "Detachable frame with interchangeable frames using magnetic connectors, allowing users to personalize their device.",
  },
];

const Catalouge = () => {
  return (
    <section className="bg-black py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Optional title - commented out to match original */}
        {/* <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Product Highlights
        </h2> */}

        <div className="space-y-12">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`
                flex flex-col md:flex-row items-center gap-8
                ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}
                bg-gradient-to-br from-[#1e2632] to-[#192027]
                rounded-2xl border border-stone-700 p-6 md:p-8
                shadow-xl hover:shadow-2xl transition-shadow duration-300
              `}
            >
              {/* Image */}
              <div className="w-full md:w-64 flex-shrink-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-auto rounded-xl object-cover shadow-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-base md:text-lg text-[#a0a8b7] leading-relaxed">
                  {card.paragraph}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalouge;