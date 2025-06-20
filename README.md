# Sniper CV - Paweł Niedermaier

Interactive CV website built with Next.js featuring sniper scope and shooting effects.

## 🎯 Features

- **Sniper Scope**: Interactive scope that follows mouse movement
- **Shooting Effects**: Click on the profile photo to trigger shooting sound and visual effects
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Responsive Design**: Works on desktop and mobile devices
- **Cyberpunk Aesthetic**: Dark theme with green accents

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add your images**:
   - Replace `/public/zdjecie.jpg` with your profile photo
   - Replace `/public/TWOJA_GRAFIKA.jpg` with your background image

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

### Sniper Scope
- **Hover** over the hero section to activate the scope
- **Move mouse** to see the scope follow your cursor
- **Click "Aktywuj celownik"** button to toggle scope manually

### Shooting Effect
- **Click** on the profile photo to trigger shooting sound and visual effects
- **Audio**: Web Audio API generates realistic shooting sounds
- **Visual**: Muzzle flash and bullet trail animations

### Navigation
- **Smooth scrolling** between sections
- **Animated timeline** for work experience
- **Interactive elements** with hover effects

## 🛠️ Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **Lucide React** - Icons
- **Web Audio API** - Sound effects

## 📁 Project Structure

```
sniper/
├── src/
│   └── app/
│       ├── page.tsx          # Main CV page
│       ├── layout.tsx        # Root layout
│       └── globals.css       # Global styles
├── public/
│   ├── zdjecie.jpg          # Profile photo (add your image)
│   └── TWOJA_GRAFIKA.jpg    # Background image (add your image)
└── package.json
```

## 🎨 Customization

### Colors
- Primary green: `#22c55e`
- Background: `#0a0a0a`
- Text: `#e2e8f0`

### Animations
- GSAP animations are configured in `page.tsx`
- CSS animations for scope and shooting effects in `globals.css`

### Content
- Update text content directly in `page.tsx`
- Modify experience timeline, skills, and other sections

## 📱 Mobile Support

- Scope is hidden on mobile for better UX
- Responsive design adapts to all screen sizes
- Touch-friendly interactions

## 🎵 Audio Features

- **Shooting Sound**: Generated using Web Audio API
- **Browser Compatibility**: Works in all modern browsers
- **User Interaction**: Requires user interaction to enable audio

## 🚀 Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (recommended):
   ```bash
   npx vercel
   ```

3. **Or deploy to any static hosting service**

## 📄 License

This project is for personal use. Feel free to modify and adapt for your own CV.

---

**Created by Paweł Niedermaier** - Expert in Vibroacoustics, Innovation, and AI
