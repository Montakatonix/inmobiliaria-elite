import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="hover:opacity-80 transition-opacity">
      <Image
        src="/logo.png"
        alt="Inmobiliaria Élite"
        width={56}
        height={56}
        priority
        className="object-contain"
      />
    </Link>
  );
}
