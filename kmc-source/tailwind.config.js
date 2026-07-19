/** @type {import('tailwindcss').Config} */
// Color ratio for this site (keep new sections in line with this):
//   60% dominant  -> bg / surface / surfaceAlt / cream (neutral off-white)
//   30% secondary -> forest / forestDeep / leaf (brand green)
//   10% accent    -> gold / goldLight (single accent, used sparingly for
//                    highlights, badges and CTAs so it stays a true accent)
// Wine is kept only for the rare, deliberate high-contrast touch (not part
// of the regular 60/30/10 rotation) so it doesn't compete with gold as a
// second accent.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        surface: '#F3F8F4',
        surfaceAlt: '#E9F2EC',
        border: '#D9E7DE',
        ink: '#122019',
        text: '#1C2B22',
        muted: '#5C6E63',
        forest: '#0B5D3B',
        forestDeep: '#08432A',
        leaf: '#2F9E5F',
        gold: '#C99A2E',
        goldLight: '#F4E8C1',
        wine: '#7A1F1F',
        wineDeep: '#5A1616',
        cream: '#FBF7EC',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        label: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(#D9E7DE 1px, transparent 1px), linear-gradient(90deg, #D9E7DE 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(135deg, #0B5D3B 0%, #2F9E5F 100%)',
        'brand-gradient-deep': 'linear-gradient(135deg, #08432A 0%, #0B5D3B 55%, #2F9E5F 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C99A2E 0%, #F4E8C1 100%)',
        'wine-gradient': 'linear-gradient(135deg, #5A1616 0%, #7A1F1F 100%)',
        'ribbon-gradient': 'linear-gradient(115deg, #F4E8C1 0%, #C99A2E 35%, #7A1F1F 55%, #08432A 100%)',
        'hero-mesh':
          'radial-gradient(ellipse 60% 50% at 15% 0%, rgba(11,93,59,0.14), transparent 60%), radial-gradient(ellipse 50% 45% at 100% 20%, rgba(201,154,46,0.16), transparent 60%), radial-gradient(ellipse 40% 40% at 50% 100%, rgba(122,31,31,0.08), transparent 60%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(18,32,25,0.04), 0 8px 24px -8px rgba(18,32,25,0.10)',
        lift: '0 4px 8px rgba(18,32,25,0.05), 0 20px 40px -12px rgba(11,93,59,0.20)',
        glow: '0 0 0 1px rgba(201,154,46,0.25), 0 12px 32px -8px rgba(201,154,46,0.25)',
      },
    },
  },
  plugins: [],
}
