export function AboutSection() {
return (
    <section
    id="about"
    className="py-24 bg-[#0A0F1C] border-t border-white/5"
    >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
        About Us
        </h2>

        <p className="text-lg text-gray-400 max-w-3xl text-center mx-auto leading-relaxed mb-10">
        Pure Trading is built for traders who want clarity, structure, and 
        consistent trading opportunities. Our mission is to simplify your trading journey  
        through professional analysis, risk-managed signals, and easy-to-understand 
        educational resources.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Our Vision</h3>
            <p className="text-gray-400">
            To empower new and experienced traders with the tools and mindset
            needed to achieve consistent profitability.
            </p>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
            <p className="text-gray-400">
            Deliver clear, structured market insights and remove the noise
            that overwhelms most traders.
            </p>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Why Choose Us?</h3>
            <p className="text-gray-400">
            Because we focus on simplicity, discipline, and accurate trading 
            strategies—made for everyone.
            </p>
        </div>
        </div>
    </div>
    </section>
);
}