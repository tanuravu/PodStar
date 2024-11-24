import React from 'react';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';
import bgVideo from '../assets/background-video.mp4';

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Section */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 w-full">
        {/* Main Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Title and Logo */}
          <div className="w-full md:w-5/6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl font-bold text-center md:text-left text-white"
            >
              Create & listen the <br />
              <span className="flex justify-center md:justify-start items-end">
                p
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img src={logo} alt="podcast" className="h-12 md:h-16" />
                </motion.span>
                dcast
              </span>
            </motion.h1>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="hidden md:block w-1/6"
          >
            {/* <div className="py-1 px-2 bg-white border border-black text-xl font-semibold rounded-full text-center -rotate-90 text-black">
              Scroll Down
            </div> */}
          </motion.div>
        </motion.div>

        {/* Subheading Section */}
        <div className="md:w-5/6 mt-6 md:mt-12 flex flex-col items-center md:items-start lg:relative left-20 ml-12">
          <p className="font-semibold text-white text-center md:text-left">
            Listen to the most popular podcasts on just one platform - <b>PodDeck</b>
          </p>
          <button className="px-6 py-4 bg-tealGray text-white font-semibold rounded-full mt-6">
            Login to listen
          </button>
          <div className="w-full flex justify-center md:justify-end md:relative md:bottom-14">
            <p className="text-white-600 font-bold mt-4 md:mt-6 text-center md:text-right">
              Our app contains more than 2000 podcasts for you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
