import TimeConverter from "@/components/comps/TimeConverter";



export default function Page() {
  return <TimeConverter />;
}







































// import {TimeConverter}  from "@/components/TimeConverter";
// import PopularCities  from "@/components/PopularCities";
// import  TimeZoneInfo  from "@/components/TimeZoneInfo";
// import  {GoogleAd}  from "@/components/GoogleAds";
// import  {Header}  from "@/components/Header";
// import  {Footer}  from "@/components/Footer";
// import { Metadata } from "next";
// import Background from "@/components/Background";

// // SEO Metadata - Server Side
// export const metadata: Metadata = {
//   title: "Global Time Converter - Convert Time Zones Instantly | Free Online Tool",
//   description: "Convert time between any cities worldwide. Fast, accurate time zone converter supporting 1000+ cities. Schedule meetings across time zones with ease. Free online tool.",
//   keywords: [
//     "time zone converter",
//     "world clock",
//     "time difference calculator",
//     "timezone converter",
//     "international time",
//     "meeting scheduler",
//     "time conversion tool",
//     "convert time zones",
//     "global time",
//     "world time zones"
//   ],
//   authors: [{ name: "Global Time" }],
//   openGraph: {
//     title: "Global Time Converter - Convert Time Zones Instantly",
//     description: "Convert time between any cities worldwide. Free, fast, and accurate.",
//     type: "website",
//     locale: "en_US",
//     siteName: "Global Time Converter",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Global Time Converter",
//     description: "Convert time between cities worldwide instantly",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   alternates: {
//     canonical: "https://yourdomain.com",
//   },
// };

// // SERVER COMPONENT - No "use client"
// export default function HomePage() {
//   return (
//     <div className="min-h-screen text-slate-200 pb-20 relative font-sans">
//       {/* Background Effects */}
//       {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl rounded-full animate-pulse" />
//         <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-400/20 to-indigo-600/20 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
//       </div> */}

//       <Background/>

//       {/* Header - Client Component */}
//       <Header />

//       {/* Main Content - Server Component with SEO content */}
//       <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* SEO-Optimized Hero Section */}
//         <section className="text-center mb-12 space-y-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
//             What time is it{" "}
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               anywhere?
//             </span>
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300">
//             Convert time between any two cities in the world instantly
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
//             Free online time zone converter supporting over 1000 cities worldwide. 
//             Perfect for scheduling international meetings, planning travel, or staying 
//             connected with friends and family across different time zones.
//           </p>
//         </section>

//         {/* Time Converter - Client Component (Interactive) */}
//         <TimeConverter />

//         {/* Popular Cities - Client Component (Interactive) */}
//         <PopularCities />

//         {/* Google Ad - Non-intrusive */}
//         <div className="mt-12">
//           <GoogleAd 
//           // slot="1234567890" 
//           />
//         </div>

//         {/* SEO Content Section - Server Component */}
//         <section className="mt-16 space-y-8">
//           <article className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl p-8">
//             <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               How to Use Our Time Zone Converter
//             </h2>
//             <div className="prose prose-lg dark:prose-invert max-w-none">
//               <ol className="space-y-4 text-gray-700 dark:text-gray-300">
//                 <li>
//                   <strong>Select your source city:</strong> Start typing the name of the city 
//                   where you currently are or where the original time is from. Our auto-suggest 
//                   feature will help you find cities quickly.
//                 </li>
//                 <li>
//                   <strong>Choose your destination city:</strong> Type the name of the city 
//                   you want to convert the time to. We support major cities and regions worldwide.
//                 </li>
//                 <li>
//                   <strong>Enter the time:</strong> Input the time you want to convert using 
//                   the time picker. The converter automatically accounts for daylight saving time.
//                 </li>
//                 <li>
//                   <strong>Get instant results:</strong> Click &apos;Convert Time&apos; to see the 
//                   equivalent time in your destination city immediately.
//                 </li>
//               </ol>
//             </div>
//           </article>

//           <article className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl p-8">
//             <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
//               Why Use a Time Zone Converter?
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
//               <div>
//                 <h3 className="text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
//                   Business & Meetings
//                 </h3>
//                 <p>
//                   Schedule international meetings without confusion. Know exactly when to join 
//                   video calls with colleagues, clients, or partners in different time zones. 
//                   Avoid embarrassing missed meetings due to time zone mistakes.
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
//                   Travel Planning
//                 </h3>
//                 <p>
//                   Plan your trips better by knowing arrival times, booking flights, and 
//                   coordinating with hotels across different time zones. Prevent jet lag 
//                   by understanding time differences before you travel.
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-3 text-pink-600 dark:text-pink-400">
//                   Stay Connected
//                 </h3>
//                 <p>
//                   Keep in touch with family and friends living abroad. Know the best time 
//                   to call without waking them up. Perfect for expats and international families.
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
//                   Global Events
//                 </h3>
//                 <p>
//                   Never miss live streams, product launches, or global events. Convert event 
//                   times to your local timezone to ensure you&apos;re ready when it matters.
//                 </p>
//               </div>
//             </div>
//           </article>
//         </section>

//         {/* Educational Content */}
//         <TimeZoneInfo />

//         {/* FAQ Section for SEO */}
//         <section className="mt-16 backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl p-8">
//           <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
//             Frequently Asked Questions
//           </h2>
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
//                 How accurate is this time zone converter?
//               </h3>
//               <p className="text-gray-700 dark:text-gray-300">
//                 Our converter uses the IANA Time Zone Database, the most comprehensive and 
//                 accurate source of timezone data. It automatically accounts for daylight 
//                 saving time changes and historical timezone adjustments.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
//                 Do I need to create an account to use this tool?
//               </h3>
//               <p className="text-gray-700 dark:text-gray-300">
//                 No! Our time zone converter is completely free to use without any registration. 
//                 However, creating an account allows you to save favorite cities and access 
//                 additional features.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
//                 Does this work for all countries?
//               </h3>
//               <p className="text-gray-700 dark:text-gray-300">
//                 Yes! We support over 1000 cities across all countries and territories worldwide. 
//                 From major metropolitan areas to smaller cities, our database covers global 
//                 time zones comprehensively.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
//                 What about daylight saving time?
//               </h3>
//               <p className="text-gray-700 dark:text-gray-300">
//                 Daylight saving time (DST) is automatically handled by our converter. We track 
//                 DST changes for all regions and ensure your conversions are accurate year-round.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="mt-16 text-center backdrop-blur-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/30 rounded-2xl p-12">
//           <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
//             Never Miss a Global Moment
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
//             Whether you&apos;re coordinating with international teams, planning travel, or 
//             staying connected with loved ones abroad, our time zone converter makes it easy.
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Bookmark this page for quick access to accurate time zone conversions anytime, anywhere.
//           </p>
//         </section>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }
