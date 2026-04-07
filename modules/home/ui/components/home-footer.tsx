import Link from "next/link";
import Image from "next/image";
// import { Github, Twitter, Linkedin } from "lucide-react";

export const HomeFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo2.png"
                alt="InkFlow Logo"
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              The premium, AI-powered thinking space for professionals, creators, and teams.
            </p>
            {/* <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-[#d84b67] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-[#d84b67] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-[#d84b67] transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div> */}
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground mb-2">Product</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Features</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Integrations</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Pricing</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Changelog</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground mb-2">Resources</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Documentation</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Blog</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Community Forum</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Templates</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground mb-2">Company</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">About Us</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Careers</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[#d84b67] transition-colors">Terms of Service</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/40 gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InkFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
