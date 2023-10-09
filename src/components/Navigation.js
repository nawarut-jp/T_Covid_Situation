import bacteria from "../images/bacteria.png";
export default function Navigation() {
  return (
    <>
      <nav className="flex items-center justify-between px-10 py-2 bg-blue-800">
        <img src={bacteria} alt="bacteria" className="w-12 h-auto"></img>
        <a href="/" className="text-white text-lg">COVID Situation</a>
      </nav>
    </>
  );
}
