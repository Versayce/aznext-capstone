export default function About() {
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-slate-650">
      
      <main className="flex flex-col items-center px-3 sm:px-6 md:px-8 lg:px-12 my-auto">
        <div className="mt-30 max-w-3xl space-y-5 sm:space-y-8 text-center">
          <h1 className="text-3xl font-bold dark:text-slate-100">
            About Us
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            At <span className="font-semibold">The Shop</span>, we’re passionate about 
            high-performance vehicles and precision automotive care. Whether it’s 
            tuning for the track, optimizing suspension, or performing routine 
            maintenance, our mission is to deliver unmatched quality and reliability.
          </p>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            With years of experience and a commitment to customer satisfaction, we 
            treat every car as if it were our own. From daily drivers to race builds, 
            we’re here to help you get the most out of your machine.
          </p>
          
          <div className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            <p>
              <span className="font-semibold">Contact Details:</span>
            </p>
            <p>
              Email: <a href="mailto:info@theshop.com" className="text-rose-400 hover:underline">info@theshop.com</a>
            </p>
            <p>
              Phone: <a href="tel:+1234567890" className="text-rose-400 hover:underline">(123) 456-7890</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
