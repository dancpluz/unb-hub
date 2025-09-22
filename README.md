<p align="center">
  <picture>
    <img width="25%" src="src/assets/icon.png">
  </picture>
</p>

## 📚 About

Welcome to UNB Hub, a mobile application developed for the Information Systems course at the University of Brasília\! Our goal is to simplify the academic lives of students by offering a set of essential tools for organization and planning. This project stands out for its use of AI to optimize the requirements engineering and prototyping process for new features.

UNB Hub was born from the need to centralize various useful functions for university life. Conceived in React Native, this project went through an extensive design process in Figma, where all screens, business rules, and requirements were meticulously defined. The current phase culminated in the implementation of the Class Schedule feature, showcasing the practical application of Generative AI to aid in software development.

Currently, we have focused on implementing the **Class Schedule** functionality, which allows you to visualize your class times and subjects intuitively. We have ambitions to integrate other tools like a calendar and a to-do list in the future.

## 📌 Features

  * **Intelligent Class Schedule:** Visualize your subjects and weekly class times.
  * **Add Subjects:** Add new classes with time and weekday selectors.
  * **Customization:** Choose personalized colors for your subjects.
  * **Data Storage:** Data is saved locally using SQLite.
  * **Design:** Modern and responsive interface with Tailwind CSS.
  * **Academic Calendar (WIP):** Stay updated with important events and deadlines.
  * **Personal To-do List (WIP):** Organize your tasks and commitments.
  * **Flowchart Generator (WIP):** Create and visualize course flowcharts.

## 🛠 Built With

<p align="left">
   <img src="https://skillicons.dev/icons?i=react,figma,typescript,tailwind,sqlite" /\>
</p>

  * **React Native** - Mobile development framework.
  * **Expo** - Tool for simplifying React Native development.
  * **Figma** - Design tool for interface prototyping.
  * **SQLite** - Local database for data storage.
  * **NativeWind** - Enables the use of Tailwind CSS in React Native.
  * **React Hook Form** - For managing forms.
  * **Deepseek-R1 (LLM)** - Used for requirements engineering and prototyping with AI.

## 👨‍💻 How to Run

**Prerequisites:**

  * Node.js (v18+).
  * Expo CLI (`npm install -g expo-cli`).
  * Mobile device with [Expo Go](https://expo.dev/client) or an Android/iOS emulator.

<!-- end list -->

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dancpluz/unb-hub/
    ```
    ```bash
    cd unb-hub
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the application:**
    ```bash
    expo start
    ```
4.  **Scan the QR code** with Expo Go (Android/iOS) or press `a` for Android, `i` for iOS, or `w` for web.

## ⚠️ Common Issues

  * **Build error (NativeWind):**

    ```bash
    npx expo start -c
    ```

  * **Database:**
    The database is created automatically on the first run of the application.

## 👥 Group / Author(s)

This project was developed with the collaboration of:

  * **Pedro**
  * **Hudson**
  * [**Daniel Luz**](https://github.com/dancpluz)

## 🤝 Contributions / Acknowledgements

We are immensely grateful to our colleagues Pedro and Hudson for their dedication and teamwork. A special thanks to the Information Systems professor at UnB for their guidance and for introducing the concept of generative AI into the software development process.

## 📄 Report and Demo

  * **AI Documentation:** Explore the application of generative AI in the requirements engineering process [here](https://www.overleaf.com/read/zdffjhnzjhqh#28fac5).
  * **Video Demonstration:** Watch the demo of the Class Schedule functionality [here](https://youtube.com/shorts/V0HpSU5ZNlg).
  * **Figma Design:** See the complete prototype of the UNB Hub screens [here](https://www.figma.com/design/A7y8MxSt8B3qqO8Fu388FM/Trabalho-SI?node-id=1-3&t=IFIq4A2Lw2ThRbXB-1).

## ⚠ WIP

This project is still in development, with several planned features for the future.

<details><summary>To-Do List</summary>

  * [x] Definition of requirements and business rules.
  * [x] Complete prototyping of screens in Figma.
  * [x] Implementation of the Class Schedule functionality.
  * [x] Incorporation of generative AI in the requirements engineering for the Class Schedule.
  * [ ] Implementation of the academic calendar.
  * [ ] Development of the personal to-do list.
  * [ ] Creation of the flowchart generator.
  * [ ] Integration with the University of Brasília system for subject import.
  * [ ] User interface refinement.
  * [ ] Testing and performance optimization.
</details>
