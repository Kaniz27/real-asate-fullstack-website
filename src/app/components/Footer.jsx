import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-bold">RealEstatePro</div>
            <p className="mt-2 text-sm text-slate-600">
              Trusted listings, expert support, and transparent deals.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">Pages</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-700">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/properties">Properties</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Office</div>
            <div className="mt-3 text-sm text-slate-700">
              <div>Dhaka, Bangladesh</div>
              <div className="mt-1">Phone: +8801700000000</div>
              <div className="mt-1">Email: info@example.com</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Social</div>
            <div className="mt-3 flex gap-3 text-sm">
              <a className="hover:underline" href="#">Facebook</a>
              <a className="hover:underline" href="#">Instagram</a>
              <a className="hover:underline" href="#">YouTube</a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-slate-500">
          © {new Date().getFullYear()} RealEstatePro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}