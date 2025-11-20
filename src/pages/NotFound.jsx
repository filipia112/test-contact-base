import Header from "../components/Header";
import TypewriterTitle from "../hooks/TypewriterTitle";
import NotFoundImg from "../assets/images/Asset -Not Found.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 relative">
        <div className="w-full max-w-[900px]">
          <div className="flex items-center gap-8">
            <img
              src={NotFoundImg}
              width="250"
              height="250"
              className="flex-none mb-36 mx-auto"
            />
            <div className="w-[420px] min-h-[150px] flex items-center">
              <TypewriterTitle
                words={[
                  "Not Found 404",
                  "Page Missing",
                  "You Seem Lost",
                  "Oops! Something Went Wrong",
                  "Content Unavailable",
                ]}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight font-extrabold tracking-tight text-white"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></div>
      </main>

      <footer className="py-6 text-center text-white/60">
        © {new Date().getFullYear()} Filipia Xena. All rights reserved.
      </footer>
    </div>
  );
}
