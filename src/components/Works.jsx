import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, image }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="group w-full bg-gradient-to-b from-[#1e2632] to-[#192027] rounded-2xl border border-stone-700 hover:border-blue-500/50 p-5 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative h-[230px] w-full mb-5 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="flex flex-col items-center px-2">
        <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2">
          {name}
        </h3>
        <p className="text-sm md:text-base text-[#a0a8b7] text-center leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div variants={textVariant()} className="text-center mb-12">
        <h2 className={`${styles.sectionHeadText} text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}>
          Features Of SpectoV
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-lg md:text-xl text-[#a0a8b7] max-w-3xl mx-auto text-center mb-16 leading-relaxed"
      >
        Welcome to our product showcase! It's a carefully curated collection
        of features that highlight the innovative solutions and cutting-edge
        technology we bring to the table.
      </motion.p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Works;