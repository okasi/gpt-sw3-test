import { Inter } from "next/font/google";
import "./globals.css";
import packageJSON from '../package.json'
import { Metadata } from "next";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: packageJSON.name,
  description: packageJSON.name,
}


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="sv">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
