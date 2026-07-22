/** @type {import('tailwindcss').Config} */
// Color ratio for this site, rebuilt around the crest logo's red + gold
// (keep new sections in line with this):
//   60% dominant  -> bg / surface / surfaceAlt / cream (warm neutral off-white)
//   30% secondary -> forest / forestDeep / leaf (brand red, lifted straight
//                    from the logo — leaf is the exact logo red, forest/
//                    forestDeep are darker tonal steps for depth)
//   10% accent    -> gold / goldLight (the logo's gold, used for highlights,
//                    badges and CTAs so it stays a true accent)
// Wine is shifted to a warm amber so error/alert states stay legible and
// distinct from the red brand colour instead of competing with it.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        surface: '#FAF7F2',
        surfaceAlt: '#F3ECE1',
        border: '#E6DCD0',
        ink: '#1F1512',
        text: '#2A1F1B',
        muted: '#6E645C',
        forest: '#7A0000',
        forestDeep: '#3D0000',
        leaf: '#B0000D',
        gold: '#CDAC5D',
        goldLight: '#F0E6CE',
        wine: '#B45309',
        wineDeep: '#78350F',
        cream: '#FBF7EC',
        kingdomGreen: '#0F5C30',
        kingdomGreenLight: '#46B36E',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        label: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(#E6DCD0 1px, transparent 1px), linear-gradient(90deg, #E6DCD0 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(135deg, #3D0000 0%, #B0000D 100%)',
        'brand-gradient-deep': 'linear-gradient(135deg, #3D0000 0%, #7A0000 55%, #B0000D 100%)',
        'gold-gradient': 'linear-gradient(135deg, #CDAC5D 0%, #F0E6CE 100%)',
        'wine-gradient': 'linear-gradient(135deg, #78350F 0%, #B45309 100%)',
        'ribbon-gradient': 'linear-gradient(115deg, #F0E6CE 0%, #CDAC5D 35%, #B0000D 55%, #3D0000 100%)',
        'hero-mesh':
          'radial-gradient(ellipse 60% 50% at 15% 0%, rgba(122,0,0,0.14), transparent 60%), radial-gradient(ellipse 50% 45% at 100% 20%, rgba(205,172,93,0.18), transparent 60%), radial-gradient(ellipse 40% 40% at 50% 100%, rgba(176,0,13,0.10), transparent 60%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(31,21,18,0.04), 0 8px 24px -8px rgba(31,21,18,0.10)',
        lift: '0 4px 8px rgba(31,21,18,0.05), 0 20px 40px -12px rgba(58,0,0,0.20)',
        glow: '0 0 0 1px rgba(205,172,93,0.25), 0 12px 32px -8px rgba(205,172,93,0.25)',
      },
    },
  },
  plugins: [],
}
