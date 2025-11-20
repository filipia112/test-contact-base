import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-3">
        <img
          width="100"
          height="100"
          src="src\assets\images\logo-contactbase.png"
        ></img>
        <Link to="/" className="text-[32px] font-bold">
          Contact Base
        </Link>
      </div>
    </header>
  );
}
