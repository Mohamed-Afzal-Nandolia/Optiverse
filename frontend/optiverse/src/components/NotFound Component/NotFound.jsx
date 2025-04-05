import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";

const quotes = [
  "It's not a bug, it's a feature.",
  "404: The code elves are on strike.",
  "You must be lost. Here's a map: 🗺️",
  "The page ran away with the spoon.",
  "Looks like you're off the grid, Neo.",
];

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      quote: quotes[Math.floor(Math.random() * quotes.length)],
    };
  }

  componentDidMount() {
    // Auto redirect after 5 seconds
    this.timeout = setTimeout(() => {
      this.setState({ redirect: true });
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 transition duration-300">
        <h1 className="text-9xl font-extrabold tracking-widest text-white-600 dark:text-white">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-4 text-center max-w-md">
          {this.state.quote}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
          Redirecting you in 5 seconds...
        </p>
        <Link
          to="/"
          className="bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-2 rounded transition duration-200 hover:opacity-90 shadow-sm"
          >
          Go Now
        </Link>
      </div>
    );
  }
}

export default NotFound;
