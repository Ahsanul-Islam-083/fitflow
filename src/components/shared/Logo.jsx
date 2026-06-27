import Image from "next/image";

export default function Logo({ className = "h-8 sm:h-9 w-auto" }) {
  return (
    <Image 
      src="/NavbarLogo.png" 
      alt="FitFlow Logo" 
      width={180} 
      height={40} 
      className={`object-contain dark:brightness-0 dark:invert ${className}`}
      priority
    />
  );
}
