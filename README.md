## Welcome to G18's PeerPrep

<p align="center">
  <img src="https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g18/blob/312a990be27b7cf13a296c08d3d90d4557776620/web-admin-dashboard/src/assets/logo.png" alt="logo" width="300px">
</p>

Meet Peer Prep, the ultimate hub for collaborative learning and problem-solving! Peer Prep stands as a dynamic web application that empowers users to effortlessly connect with fellow learners at the same proficiency level. Together, you'll delve into thoughtfully curated questions and amplify your problem-solving prowess. Our platform boasts innovative features that facilitate smooth collaboration with peers, enabling real-time discussions via our integrated chat feature. Additionally, you can visualize your code using our built-in code pad. We've streamlined the process of finding the perfect study partner, ensuring you team up with individuals who share your passion for problem-solving and maintain a similar proficiency level. With Peer Prep's interactive platform, effective and enjoyable learning is guaranteed. Embark on this exhilarating journey to enhance your skills, any time, from anywhere, right here on Peer Prep!

## Features

1. Collaborate real time with other users on a live-code editor with syntax-highlighting, code error validation, code execution, and even a collaborative whiteboard to draw out your ideas.

2. Match with other users based on question difficulty and your proficiency level.

3. Chat with other users.

4. Authentication with email and password, Google OAuth.

5. See list of questions that you have attempted/submitted.

6. See the details of the questions that you have attempted so you can collate your learning points.

7. Customise personal profile (IP).

## Tech Stack

Frontend: React, TypeScript, ShadCN, Axios, TailwindCss

Server: Node, Express, Nest

Databases: MongoDB, PostgreSQL

Cloud: Google Cloud Platform

Message Broker: RabbitMQ

CI/CD Tools: Github Actions

## Steps

### Deployed version
To simulate 2 sessions, open the app through the following link: http://34.87.154.192:4173/#/ on 2 different incognito Chrome Tabs.

### Local Version
Software Required

NodeJS
Docker

Ensure that Docker is running on your machine.
Ensure that you are not on NUS wifi.
Ensure ports 4173, 3000, 4000, 4001, 4002, 5001, 6001, 7001, 15672 and 5672 are available on your machine.

#### Installation

Navigate into the `ay2324s1-course-assessment-g18` directory from the downloaded
release.

```bash
cd ay2324s1-course-assessment-g18
```

From the directory, execute the following commands and rename dockerfile.txt to dockerfile after deleting the dockerfile in web-admin-dashboard 
```bash
cd ./question-service
docker build -t rgonslayer/peerprep-question:1.0 .
```
```bash
cd ../user-service
docker build -t rgonslayer/peerprep-user:1.1 .
```
```bash
cd ../auth-service
docker build -t rgonslayer/peerprep-auth:1.0 .
```
```bash
cd ../history-service
docker build -t adrielsoh/peerprep-history:1.0 .
```
```bash
cd ../chat-service
docker build -t adrielsoh/peerprep-chat:1.0 .
```
```bash
cd ../upload-service
docker build -t rgonslayer/peerprep-upload:1.0 .
```
```bash
cd ../matching-service
docker build -t rgonslayer/peerprep-matching:1.0 .
```
```bash
cd ../web-admin-dashboard
docker build -t rgonslayer/peerprep:1.0 .
```
```bash
cd ..
docker compose up
```
visit localhost:4173 on 2 different incognito Chrome Tabs to simulate two sessions


## Important Notes

1. Make sure your terminal active directory is pointing to the project folder e.g. `/ay2324s1-course-assessment-g18/web-admin-dashboard` before running any `npm` commands
2. Google Authentication only works when running locally as we need to purchase a domain name to enable functionality on the deployed version.

## Final Report
[G18-Report](https://docs.google.com/document/d/1jQaBQejdzOHXN0YGrbYafIHkK3kcv_RwvhhPPIs9vbY/edit?usp=sharing)

