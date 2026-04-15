export function PressLogos() {
  return (
    <section className="py-16 border-t border-b border-bone2 bg-linen overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center">
        <span className="text-[10px] text-smoke uppercase tracking-[0.2em] mb-8 text-center">
          Featured As Ethical Design Leaders In
        </span>
        
        {/* We use basic typography/shapes here simulating logos for the prototype */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-40 grayscale filter hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <span className="font-serif text-2xl tracking-widest text-night">VOGUE</span>
          <span className="font-sans font-medium text-xl tracking-tighter text-night">ARCHITECTURAL DIGEST</span>
          <span className="font-serif text-2xl italic text-night">Elle Decor</span>
          <span className="font-sans font-bold text-2xl tracking-widest text-night uppercase">Wallpaper*</span>
        </div>
      </div>
    </section>
  )
}
