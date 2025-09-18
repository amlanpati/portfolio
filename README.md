# portfolio# Amlan Pati - Interactive Personal Portfolio

A dynamic and responsive personal portfolio website designed to showcase projects and skills through a unique, interactive user experience. This project emphasizes modern web technologies, including advanced CSS animations, responsive design principles, and dynamic state management with JavaScript.

## ✨ Live Demo

➡️ **[View the live site here!](https://amlanpati.github.io/portfolio/)** _(<- Replace with your actual link)_

---

## 📸 Preview

*(It's highly recommended to add a GIF or screenshot of your website here. You can use a tool like [ScreenToGif](https://www.screentogif.com/) to record your screen.)*

![A GIF showing the interactive cursor effect on desktop and the theme toggle on mobile.](https://your-gif-or-image-link.com)

---

## 🛠️ Features

This portfolio is designed with a mobile-first approach but provides a distinct, enhanced experience for desktop users.

### 🖥️ Desktop Experience:
* **Interactive Hero Section:** A cursor-based masking effect that reveals a different background image, creating an engaging "spotlight" effect.
* **Custom Cursor:** A custom icon that follows the mouse within the hero section, enhancing the interactive feel.
* **Pulsating Animation:** The reveal area gently pulses to draw attention and add a dynamic touch.
* **Navbar Hover Effect:** An aesthetic "decode" text scrambling animation on navigation links when hovered.

### 📱 Mobile & Tablet Experience:
* **Fully Responsive:** The layout, typography, and interactive elements are optimized for a seamless experience on all screen sizes.
* **Light/Dark Theme Toggle:** As cursor effects are not possible on touch devices, the functionality is replaced with a theme switcher. The toggle button swaps the main hero image between a "light mode" (smiling photo) and a "dark mode" (normal photo).
* **Persistent Theme:** Remembers the user's theme choice on their next visit by using the browser's `localStorage`.
* **Collapsible Hamburger Menu:** A clean, functional dropdown menu ensures easy navigation on smaller devices without cluttering the screen.

---

## 💻 Technologies Used

This project was built from scratch using core web technologies:

* **HTML5:** For the semantic structure of the website.
* **CSS3:** For all styling, layout, and animations.
    * **Flexbox** for responsive alignment.
    * **CSS Variables** for theme management and dynamic properties.
    * **@property (Houdini)** for animating custom properties like `--radius`.
    * **Keyframe Animations** for the pulse and glitch effects.
    * **Media Queries** for creating the distinct desktop and mobile layouts.
* **JavaScript (ES6+):** For all interactivity and state management.
    * **DOM Manipulation** to control all dynamic elements.
    * **Event Listeners** for mouse movements (`mousemove`), clicks, and window resizing (`resize`).
    * **localStorage API** for saving the user's theme preference.

---
