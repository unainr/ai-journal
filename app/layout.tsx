import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { ReactQueryProviders } from "@/components/providers/react-query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ui } from "@clerk/ui";
const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Inkflow | Your AI-Powered Journal",
	description:
		"A beautiful, intelligent journaling experience. Write freely, think clearly, and let AI help you reflect deeper with Inkflow.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				variables: {
					colorPrimary: "#d84b67",
					colorPrimaryForeground: "#ffffff",
				},
			}}>
			<html
				lang="en"
				suppressHydrationWarning
				className={cn(
					"h-full",
					"antialiased",
					geistSans.variable,
					geistMono.variable,
					"font-sans",
					figtree.variable,
				)}>
				<body>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						disableTransitionOnChange>
						<ReactQueryProviders>
							{" "}
							<TooltipProvider>
								{children}
								<Toaster />
							</TooltipProvider>
						</ReactQueryProviders>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
