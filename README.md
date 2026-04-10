<img src="https://github.com/kevreth/SpoonFeeder/assets/47391465/af633b8b-d0df-421b-a699-36f7a90abb19" alt="SpoonFeeder logo" width="200" height="200">

# SpoonFeeder

_programmed instruction on overdrive_

SpoonFeeder is programmed instruction software that takes advantage of recent advances in gamification. SpoonFeeder breaks learning content into a few simple slides, asks concept-checking questions, and then offers exercises of various types, such as multiple choice, gap fill, and sort.

## Advantages

1. Using continuous questioning to engage active learning
2. Rapid progress through easy input. All the questions are closed-form, often requiring one click to respond to, saving time.
3. Randomization of exercise order and for certain questions, response choices, to minimize work copying in classrooms.
4. Anyone can create content

SpoonFeeder is not designed to assess learners' ability to expound on a topic. The idea is to quickly commit concepts and rote material to the brain for later contemplation. An ideal use would be in a flipped classroom, where learners know the material fairly well before class and use class time to find gaps in their knowledge, collaborate with other students, and instructors can use higher-level teaching methods like dialectics. SpoonFeeder leaves instructors free to focus on high-level thinking skills.

## Roles

- test preparation,
- corporate training programs,
- continuing education,
- professional development,
- learning languages, and, to a lesser extent,
- common skills like money management, cooking, or sports rules.

## Uses

- replace most textbook content, with exceptions including open-form questions like short answer and essays;
- replace lectures involving concepts and terms;
- teach any subject involving book learning;
- create one-off quizzes and assignments; and
- convey information as text, images, audio, or video.

## Status

SpoonFeeder remains in an early pre-release state. Although functional, it's missing major features and the user interface needs attention.

## Installation for development

1. Install Node if not already installed, platforms vary.
2. Update Node and npm:

`npm i -g npm`

`npm i -g node`

3. Install quasar if not already installed (on Linux, precede with `sudo`):

`npm i -g @quasar/cli`

4. Clone the project

`git clone https://github.com/kevreth/SpoonFeeder.git`

5. `cd Spoonfeeder`

6. `npm install`

7. Start the project

`quasar dev`

## Docker installation

Build the SpoonFeeder image from the Dockerfile in the Spoonfeeder repository

`docker build -t spoonfeeder https://github.com/kevreth/SpoonFeeder.git#main`

Create and run a container

`docker run -d -p 9000:9000 --name spoonfeeder-run spoonfeeder`

or run the below to see updates everytime you make changes
`docker run -d -p 9000:9000 --name spoonfeeder-run -v $(pwd):/app spoonfeeder`

Navigating to http://localhost:9000 should display Spoonfeeder.

### Run a shell in the container

`docker exec -it spoonfeeder-run bash`

## Building with a specific course

By default, the app builds with the `test` course.

```bash
# Build with default (test) course
quasar build
OR
quasar dev

# Build with a specific course
COURSE=history quasar dev
```

The course name must match a folder in your courses directory.

## Running on a real Android device

### Prerequisites

- Android Studio installed with Android SDK
- On your phone: go to **Settings > About Phone** and tap **Build Number** 7 times to enable Developer Options
- Then go to **Settings > Developer Options** and enable **USB Debugging**

### Connect your real phone Android

Choose one of two methods:

**Option A — USB cable**

1. Connect your phone via USB
2. Accept the "Allow USB Debugging" prompt on your phone

**Option B — Wireless (no USB required, Android 11+)**

1. Go to **Settings > Developer Options > Wireless Debugging** and turn it ON
2. Tap **"Pair device with QR code"**
3. Open Android Studio → open the device manager → scan the QR code shown

Confirm connection:

```bash
adb devices
```

### Build and run

```bash
yarn android:build
yarn android:deploy
```
