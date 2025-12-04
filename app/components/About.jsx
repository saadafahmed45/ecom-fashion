import React from "react";

const About = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Content */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-md text-gray-600 leading-relaxed mb-4">
            We are passionate about delivering high-quality products and
            creating seamless digital experiences. Our mission is to help
            businesses grow through innovative solutions and modern design.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With a dedicated team and years of experience, we ensure that every
            project is crafted with care, creativity, and a deep focus on user
            satisfaction.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src="https://images.pexels.com/photos/5205659/pexels-photo-5205659.jpeg"
            alt="About Image"
            className="rounded-2xl shadow-lg w-full max-w-sm object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
