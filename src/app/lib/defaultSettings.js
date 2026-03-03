export const DEFAULT_SETTINGS = {
  navbar: {
    brand: "RealEstatePro",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Properties", href: "/properties" },
      { label: "Contact", href: "/contact" },
    ],
  },

  hero: {
    enabled: true,
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    ],
    headline: "Find Your Dream Home",
    subtitle: "Ready • Upcoming • Ongoing • Completed — best deals in your city.",
    buttons: {
      viewProperties: { enabled: true, label: "View Properties", href: "/properties" },
      contactNow: { enabled: true, label: "Contact Now", href: "/contact" },
    },
    sliderIntervalMs: 4000,
  },

  quickSearch: {
    enabled: true,
    locations: ["Dhaka", "Chattogram", "Sylhet", "Khulna"],
    propertyTypes: ["Apartment", "Duplex", "Villa", "Plot"],
    priceRanges: ["10-30 Lakh", "30-60 Lakh", "60L-1Cr", "1Cr+"],
    statuses: ["Ready", "Upcoming", "Ongoing", "Completed"],
  },

  featured: {
    enabled: true,
    items: [
      {
        id: "p1",
        title: "Modern Apartment in Dhaka",
        price: "৳ 65,00,000",
        status: "Ready",
        desc: "2 bed • 2 bath • 1200 sqft • Gulshan",
        image:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1400&auto=format&fit=crop",
        href: "/properties/modern-apartment-dhaka",
        featured: true,
        order: 1,
      },
      {
        id: "p2",
        title: "Luxury Villa",
        price: "৳ 2,50,00,000",
        status: "Ongoing",
        desc: "4 bed • 4 bath • 3200 sqft • Bashundhara",
        image:
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1400&auto=format&fit=crop",
        href: "/properties/luxury-villa",
        featured: true,
        order: 2,
      },
      {
        id: "p3",
        title: "Family Duplex",
        price: "৳ 1,20,00,000",
        status: "Upcoming",
        desc: "3 bed • 3 bath • 2100 sqft • Uttara",
        image:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1400&auto=format&fit=crop",
        href: "/properties/family-duplex",
        featured: true,
        order: 3,
      },
    ],
  },

  whyChooseUs: {
    enabled: true,
    features: [
      { icon: "🏡", title: "Trusted Listings", desc: "Verified properties with clear documents." },
      { icon: "🤝", title: "Expert Support", desc: "Friendly agents and fast responses." },
      { icon: "💳", title: "Flexible Deals", desc: "Payment plans for different budgets." },
    ],
  },

  testimonials: {
    enabled: true,
    items: [
      { id: "t1", name: "Rahim", rating: 5, comment: "Great service & smooth process!", image: "" },
      { id: "t2", name: "Karima", rating: 4, comment: "Good options, helpful team.", image: "" },
      { id: "t3", name: "Tanvir", rating: 5, comment: "I found my apartment quickly!", image: "" },
    ],
  },

  callButton: {
    enabled: true,
    phone: "+8801700000000",
    label: "Call Now",
  },
};