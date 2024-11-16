# Overview

As a (future) software developer, I aim to continue improving my skills in JavaScript by building applications that interact with external APIs. The software I have developed demonstrates the use of asynchronous JavaScript to fetch and manage exchange rate data. By creating this software, I wanted to practice with axios for making HTTP requests, handling responses, and implementing basic caching mechanisms to optimize performance.

The purpose of writing this software was to create a simple service that fetched exchange rate data from an external API and cached the results for faster subsequent access. The main goal was to better understand API integration, caching strategies, and asynchronous programming in JavaScript.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

To develop this software, I used:

Text Editor: Visual Studio Code(VS Code) for writing and editing the code.
Programming Language: JavaScript, using async/await for handling asynchronous operations.
Libraries:
    Axios: A promise-based HTTP client used for making API requests.
Node.js: I used Node.js to run the server-side JavaScript that interacts with the API.

The software fetches live exchange rates from exchangerate-api.com API and uses basic caching to avoid redundant API calls, improving efficiency. 

# Useful Websites

Here are some resources that were helpful during the development of this project:

https://axios-http.com/docs/intro - Axios Documentation, for understanding how to use axios to make HTTP requests.
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous - MDN Web Docs, to learn more about asynchronous programming in JavaScript and async/await.
https://www.exchangerate-api.com/ - The API used to get live exchange rates.

# Future Work

There are several improvements and features I plan to add to this software:

Error Handling: Improve error handling to cover more edge cases, such as network failures or invalid API responses.
User Interface: Build a front-end interface where users can input currencies and get real-time conversion results.
Currency Selection: Allow users to choose any two currencies from a list, not just USD as the base.
Rate History: Implement a feature to track historical exchange rates and display trends over time.
Performance Optimization: Explore more advanced caching techniques to optimize data fetching and reduce server load.