# AI Trip Planner

A custom built app that uses Google's Gemini AI and Place Finder to help create suggestions for users looking for a budget friendly trip. 

![Alt text](/src/assets/readme-img-1.png?raw=true "Screenshot 1")
![Alt text](/src/assets/readme-img-2.png?raw=true "Screenshot 2")
![Alt text](/src/assets/readme-img-3.png?raw=true "Screenshot 3")

## Installation

Simply download the the code and run it using:

```bash
npm run dev
```

Make sure the env keys are correctly configured. Below are the links that you would need to visit and sign up to in order for the app to work.

https://console.cloud.google.com/ <br/>
https://aistudio.google.com/ <br/>
https://console.firebase.google.com/ <br/>

## Issues

Current issue is that the API Keys are currently exposed to the browser but this is only for testing purposes, for future improvements a backend system or a serverless system can be considered in order for better protection against exposure to sensitive information.