import React from "react";
import Header from "./Header";
import FlashCard from "./FlashCard";
import HomeQuiz from "./HomeQuiz";
import HomeBlog from "./HomeBlog";
import HomeDashboard from "./HomeDashboard";
import HomeTestimonial from "./HomeTestimonial";
import HomeFaq from "./HomeFaq";
import HomeAllBlog from "./HomeAllBlog";

const Home = ({ aboutRef, featuresRef, faqRef, coursesRef }) => {
  return (
    <div>
      <Header />

      <div ref={aboutRef} className="w-full px-4 mt-8 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-purple-600">
            OVER 200+ RESOURCES
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-3">
            Transform Your Physiotherapy Learning
          </h1>
          <p className="text-gray-600 mt-2">
            Physiohub is a learning platform designed to help budding
            physiotherapists perfect their craft and become industry experts.
          </p>
        </div>
      </div>

      <FlashCard />
      <HomeQuiz />
      <HomeBlog />
      <div ref={featuresRef}>
        <HomeDashboard />
      </div>
      <HomeTestimonial />
      <div ref={faqRef}>
      <HomeFaq />
      </div>

      <div ref={coursesRef}>
      <HomeAllBlog />
      </div>
    </div>
  );
};

export default Home;
