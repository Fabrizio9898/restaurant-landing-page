export const site = {
  name: "Portales de Uribelarrea",
  shortName: "PORTALES",
  tagline: "Cocina de campo en el corazón de Uribelarrea",
  description:
    "Restaurante rústico en Uribelarrea. Sabores de la tierra, fuego lento y buena mesa.",
  about: {
    title: "Nuestra historia",
    body: "En Portales de Uribelarrea abrimos las puertas a una cocina de campo honesta: productos de la zona, recetas de familia y un ambiente cálido entre madera y luz natural. Ideal para almuerzos de fin de semana y cenas con amigos.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
  },
  heroSlides: [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1920&auto=format&fit=crop",
  ],
  menu: [
    {
      name: "Empanadas de la casa",
      description: "Carne cortada a cuchillo, horno de barro.",
      price: "$4.500",
      category: "Entradas",
      featured: true,
    },
    {
      name: "Provoleta a la parrilla",
      description: "Orégano, aceite de oliva y pan casero.",
      price: "$8.200",
      category: "Entradas",
      featured: true,
    },
    {
      name: "Bife de chorizo",
      description: "500g, ensalada criolla y papas rústicas.",
      price: "$22.000",
      category: "Principales",
      featured: true,
    },
    {
      name: "Risotto de hongos",
      description: "Hongos de temporada y queso reggianito.",
      price: "$16.500",
      category: "Principales",
      featured: false,
    },
    {
      name: "Tarta de ricota",
      description: "Receta de la abuela, dulce de leche.",
      price: "$6.800",
      category: "Postres",
      featured: false,
    },
    {
      name: "Vino de la casa",
      description: "Copa de tinto o blanco seleccionado.",
      price: "$5.500",
      category: "Bebidas",
      featured: false,
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482049016gy5b3e1df2d2b9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600891964099-90d2367269b9?q=80&w=800&auto=format&fit=crop",
  ],
  location: {
    address: "Calle Principal s/n, Uribelarrea, Buenos Aires",
    mapEmbed:
      "https://maps.google.com/maps?q=Uribelarrea,+Buenos+Aires&t=&z=14&ie=UTF8&iwloc=&output=embed",
    hours: [
      { days: "Vie – Dom", time: "12:00 – 16:00 / 20:00 – 00:00" },
      { days: "Lun – Jue", time: "Cerrado" },
    ],
    phone: "+54 9 11 0000-0000",
    email: "hola@portalesdeuribelarrea.example",
  },
  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },
  reservation: {
    title: "Reservá tu mesa",
    body: "Pronto vas a poder reservar online. Por ahora escribinos o llamanos.",
    cta: "Próximamente",
  },
} as const;
