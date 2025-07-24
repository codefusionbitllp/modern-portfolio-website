# 🚀 Modern Portfolio Website

A stunning, responsive portfolio website built with React, TypeScript, and Firebase. Features smooth animations, interactive elements, and a beautiful UI design.

[![license](https://img.shields.io/github/license/codefusionbit/universal_code_viewer)](LICENSE)
<a href="https://codefusionbit.com/" target="_blank" rel="noopener noreferrer">
  <img src="https://raw.githubusercontent.com/codefusionbit/universal_code_viewer/main/screenshots/codefusionbit.jpg" alt="Code Fusion Bit" />
</a>

## 🔗 Links

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://fullstack.hiteshsapra.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/codefusionbitllp/modern-portfolio-website)


## 📸 Preview

### Web Video
<img src="https://media.githubusercontent.com/media/codefusionbitllp/project-files/main/files/react-portfolio-web_video.gif" alt="Modern Portfolio Website" />


### Web
| Dark Theme                                                                                                   | Light Theme                                                                                                   |
|---------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/codefusionbitllp/modern-portfolio-website/refs/heads/main/screenshots/web_dark_mode.png" alt="Web Dark Theme" width="300"/> | <img src="https://raw.githubusercontent.com/codefusionbitllp/modern-portfolio-website/refs/heads/main/screenshots/web_ligth_mode.png" alt="Web Light Theme" width="300"/> |


### Mobile
| Light Theme                                                                                                       | Dark Theme                                                                                                       |
|-------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/codefusionbitllp/modern-portfolio-website/refs/heads/main/screenshots/mobile_ligth_mode.png" alt="Android Light Theme" width="300"/> | <img src="https://raw.githubusercontent.com/codefusionbitllp/modern-portfolio-website/refs/heads/main/screenshots/mobile_dark_mode.png" alt="Android Dark Theme" width="300"/> |

## ✨ Features

- **🎨 Modern Design**: Clean, professional UI with gradient effects and smooth animations
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🌙 Dark/Light Mode**: Theme toggle with system preference support
- **🎭 Interactive Elements**: 
  - Fluid cursor effects with WebGL shaders
  - Scatter text animations on hover/click
  - Smooth scroll navigation with progress indicator
- **🔥 Performance**: Optimized loading with custom spinner and lazy loading
- **📊 Dynamic Content**: Firebase-powered content management
- **🎯 Sections**:
  - Hero with animated background
  - About with skills and experience timeline
  - Projects showcase with detailed modals
  - Contact form with validation
- **🛠️ Developer Friendly**: TypeScript, ESLint, organized component structure

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Mantine UI** - Beautiful component library
- **Framer Motion** - Smooth animations
- **Motion** - Advanced animations and interactions

### Backend & Database
- **Firebase** - Authentication, Firestore, Hosting
- **Firebase Admin SDK** - Server-side operations

### Styling & UI
- **Mantine Core** - Complete styling system with CSS-in-JS
- **PostCSS** - CSS processing with Mantine preset
- **Tabler Icons** - Beautiful icon set

### Development Tools
- **Vite/Create React App** - Build tooling
- **ESLint** - Code linting
- **Firebase Tools** - Deployment and management

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/codefusionbitllp/modern-portfolio-website.git
   cd modern-portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   
   Create a new Firebase project and enable Firestore and Hosting:
   
   ```bash
   # Install Firebase CLI globally
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase in your project
   firebase init
   ```

4. **Configure Firebase Security Rules**
   
   The project includes Firestore security rules. Deploy them using:
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Configure Environment Variables**
   
   Create `.env` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

6. **Set up Firebase Admin (for data upload)**
   
   - Download your Firebase Admin SDK private key
   - Rename it to `serviceAccountKey.json`
   - Place it in the root directory

7. **Upload initial data**
   ```bash
   node uploadPortfolioData.js
   ```

8. **Start development server**
   ```bash
   npm start
   ```

Visit `http://localhost:3000` to see your portfolio!

## 📁 Project Structure

```
modern-portfolio-website/
├── public/
│   ├── images/           # Static images
│   └── resume.pdf        # Resume file
├── src/
│   ├── components/
│   │   ├── Effects/      # Interactive effects
│   │   │   └── SplashCursor.tsx
│   │   ├── Layout/       # Layout components
│   │   │   ├── MainHeader.tsx
│   │   │   ├── MainFooter.tsx
│   │   │   ├── MainLoadingSpinner.tsx
│   │   │   └── ScatterText.tsx
│   │   └── Sections/     # Main sections
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Projects.tsx
│   │       └── Contact.tsx
│   ├── firebase/         # Firebase configuration
│   │   ├── config.ts     # Firebase config
│   │   └── database.ts   # Database service
│   ├── helper/           # Utility components
│   │   └── ThemeToggle.tsx
│   ├── types/           # TypeScript definitions
│   │   └── index.ts
│   ├── utils/
│   │   ├── serviceAccountKey.json # Add you service file
│   │   └── uploadPortfolioData.js # Data upload script
│   └── App.tsx          # Main app component
├── firestore.rules      # Firestore security rules
├── firebase.json        # Firebase configuration
├── onlyReactDeploy.sh   # Deployment script
└── .env   # don't forgate to add env file Check env.sample
```

## 🎨 Customization

### 1. Personal Information

Edit the data in `uploadPortfolioData.js`:

```javascript
const mockPortfolioData = {
  profile: {
    name: "Your Name",
    title: "Your Title",
    bio: "Your bio...",
    email: "your.email@example.com",
    // ... other fields
  },
  // ... projects, skills, experience
};
```

### 2. Styling

- **Theme**: Modify the Mantine theme configuration in `App.tsx`
- **Components**: Each component uses Mantine's styling system with CSS-in-JS
- **Colors**: Update color schemes in the theme object
- **Responsive Design**: Leverage Mantine's responsive props

### 3. Content Sections

- **Hero**: Edit `Hero.tsx` for the landing section
- **About**: Modify `About.tsx` for skills and experience
- **Projects**: Update `Projects.tsx` for project showcase
- **Contact**: Customize `Contact.tsx` for contact form

## 🚀 Deployment

### Firebase Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   # Deploy everything (hosting + firestore rules)
   firebase deploy
   
   # Or deploy only hosting
   firebase deploy --only hosting
   ```

   Or use the provided script:
   ```bash
   chmod +x onlyReactDeploy.sh
   ./onlyReactDeploy.sh
   ```

### Other Platforms

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `build` folder
- **GitHub Pages**: Use GitHub Actions for deployment

## 🔒 Security

### Firestore Security Rules

The project includes security rules in `firestore.rules` that:

- Allow public read access to portfolio data
- Restrict write access to authenticated users only
- Provide structured access to different collections

```javascript
// Example rule structure
match /portfolioWeb/{profileId} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

Deploy security rules:
```bash
firebase deploy --only firestore:rules
```

## 📊 Data Management

### Adding New Projects

1. Update the `projects` array in `src/utils/uploadPortfolioData.js`
2. Run the upload script: `node uploadPortfolioData.js`
3. Redeploy your application

### Updating Skills/Experience

1. Modify the respective arrays in `uploadPortfolioData.js`
2. Upload the changes to Firebase
3. The website will automatically reflect the updates

## 🎯 Features Showcase

### Interactive Cursor Effect
- WebGL-based fluid simulation
- Responds to mouse movement and clicks
- Customizable colors and physics

### Scatter Text Animation
- Characters scatter on interaction
- Smooth spring animations
- Mobile-friendly touch support

### Smooth Scroll Navigation
- Progress indicator in header
- Section-aware navigation highlighting
- Smooth scrolling between sections

### Project Modals
- Detailed project information
- Image carousels for multiple screenshots
- Technology tags and external links

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**CodeFusionBit LLP**
- Website: [https://github.com/codefusionbitllp](https://github.com/codefusionbitllp)
- LinkedIn: [Hitesh Sapra](https://www.linkedin.com/in/hiteshsapra/)
- GitHub: [@saprahits](https://github.com/saprahits)
- Email: saprahits007@gmail.com

## 🙏 Acknowledgments

- [Mantine](https://mantine.dev/) - Amazing React components library
- [Tabler Icons](https://tabler-icons.io/) - Beautiful icon set
- [Firebase](https://firebase.google.com/) - Backend and hosting platform
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

⭐ Don't forget to give this project a star if you found it helpful!

## 🐛 Known Issues

- [ ] Some animations may be slower on older devices
- [ ] Email form requires SMTP configuration for production use

## 🔮 Future Enhancements

- [ ] Blog section with CMS integration
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] PWA features
- [ ] SEO optimizations

---

## 🏢 Company Information

**© 2025 CodeFusion Bit LLP. All rights reserved.**

- **Website**: [https://www.codefusionbit.com](https://www.codefusionbit.com)
- **Contact**: [info@codefusionbit.com](mailto:info@codefusionbit.com)
- **Specialization**: Cross-platform mobile app development
- **Technologies**: Flutter, TypeScript, React, Next.js, Django, Swift, SwiftUI, Skip Framework, and cross-platform development for iOS & Android.
- **Technical Project Manager / Team Lead / Developer**: Hitesh Sapra ([@saprahits](https://hiteshsapra.com)) ([@fullstack](https://fullstack.hiteshsapra.com))

### About CodeFusion Bit
CodeFusion Bit LLP is a leading mobile app development company specializing in innovative cross-platform solutions. We leverage cutting-edge technologies like Skip Framework to deliver truly native experiences across iOS and Android platforms from a single Swift codebase.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

**Built with ❤️ by CodeFusion Bit LLP using with React, TypeScript, and Firebase.**
