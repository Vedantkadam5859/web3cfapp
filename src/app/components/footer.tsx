export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-4 fixed bottom-0 left-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div>
              <p className="text-lg font-bold tracking-wide">CrowdChain</p>
              <p className="text-sm text-gray-400">Empowering Dreams, One Block at a Time</p>
            </div>
  
            <div className="flex space-x-6 text-gray-300">
              <a href="/contact" className="hover:text-white transition">Contact</a> {}
              <a href="/refund" className="hover:text-white transition">Refund</a> {}
            </div>
  
          </div>
        </div>
      </footer>
    );
  }
  