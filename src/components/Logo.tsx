import Image from "next/image";
160 Link from "next/link";
160
export default function Logo() {
    return (
          <Link href="/" className="hover:opacity-80 transition-opacity">
                <Image
                          src="/logo.png"
                          alt="Inmobiliaria Élite"
                          width={80}
                          height={80}
                          priority
                          className="object-contain"
                        />
          </Link>Link>
        );
}</Link>
