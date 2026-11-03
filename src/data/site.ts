export interface MenuItem {
  name: string;
  desc?: string;
  price?: string;
  options?: { label: string; price: string }[];
}

export interface MenuGroup {
  title: string;
  note?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  title: string;
  groups: MenuGroup[];
}

const GUARNICION =
  "Todas incluyen guarnición a elección: papas fritas, ensalada de lechuga y tomate, o ensalada de zanahoria y huevo.";

const menu: MenuCategory[] = [
  {
    title: "Entradas y picadas",
    groups: [
      {
        title: "Entradas",
        items: [
          {
            name: "Empanadas de carne, pollo o jamón y queso",
            options: [
              { label: "Unidad", price: "$4.290" },
              { label: "Media docena", price: "$23.100" },
            ],
          },
          { name: "Empanadas de verdura tipo canasta", desc: "Por unidad", price: "$3.630" },
          { name: "Papas fritas", price: "$10.780" },
          { name: "Papas a caballo", desc: "Con dos huevos fritos", price: "$19.800" },
          { name: "Papas fritas con cheddar y panceta", price: "$19.800" },
          { name: "Buñuelos de acelga", price: "$9.350" },
          { name: "Tortilla española", desc: "Seis porciones pequeñas", price: "$6.800" },
          { name: "Bastoncitos de provolone", desc: "Seis unidades", price: "$17.800" },
        ],
      },
      {
        title: "Picadas",
        items: [
          {
            name: "Picada fría",
            desc: "Jamón, queso, jamón crudo, bondiola, salame, aceitunas, berenjenas al escabeche y porotos a la provenzal.",
            options: [{ label: "Para 2 personas", price: "$33.000" }],
          },
          {
            name: "Picada caliente",
            desc: "Bastoncitos de provolone y de pollo, tortilla de papa, salchichas envueltas, cazuela de salchicha criolla, papas fritas, milanesa, buñuelos de acelga y porotos a la provenzal.",
            options: [
              { label: "Para 2 personas", price: "$48.400" },
              { label: "Para 4 personas", price: "$89.800" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Platos principales",
    groups: [
      {
        title: "Milanesas",
        note: GUARNICION,
        items: [
          { name: "Milanesa a caballo", price: "$23.100" },
          { name: "Milanesa a la napolitana", price: "$24.200" },
          { name: "Milanesa simple", price: "$21.780" },
          { name: "Milanesa de pollo", price: "$19.800" },
          { name: "Milanesa de berenjena", price: "$17.600" },
        ],
      },
      {
        title: "Carnes",
        note: GUARNICION,
        items: [
          {
            name: "Peceto de cerdo envuelto en panceta",
            desc: "Con salsa de miel y mostaza",
            price: "$29.800",
          },
          { name: "Bife Portales", price: "$32.450" },
          {
            name: "Parrillada completa",
            desc: "Precio por persona. Chorizo, morcilla, pollo, pechito de cerdo, asado y vacío. Servicio en bandejas.",
            price: "$36.850",
          },
        ],
      },
      {
        title: "Verduras",
        items: [{ name: "Wok de verduras", price: "$20.900" }],
      },
    ],
  },
  {
    title: "Pastas y postres",
    groups: [
      {
        title: "Pastas",
        note: "Incluyen salsa a elección: fileto, pesto, salsa rosa, boloñesa.",
        items: [
          { name: "Sorrentinos de jamón y ricota", price: "$23.650" },
          { name: "Sorrentinos de calabaza y ricota", price: "$23.650" },
          { name: "Ravioles de verdura", price: "$23.650" },
          {
            name: "Agnolottis Portales",
            desc: "Rellenos de puré de papas y panceta",
            price: "$23.650",
          },
          { name: "Ñoquis", price: "$22.550" },
          { name: "Fideos caseros", price: "$22.550" },
          { name: "Canelones de verdura", price: "$29.150" },
        ],
      },
      {
        title: "Adicionales",
        items: [{ name: "Salsa cuatro quesos", desc: "Adicional", price: "$6.600" }],
      },
      {
        title: "Postres",
        items: [
          {
            name: "Flan casero",
            options: [
              { label: "Solo", price: "$7.920" },
              { label: "Con dulce de leche y crema", price: "$9.680" },
            ],
          },
          {
            name: "Budín de pan",
            options: [
              { label: "Solo", price: "$7.920" },
              { label: "Con dulce de leche y crema", price: "$9.020" },
            ],
          },
          { name: "Vigilante", desc: "Queso y dulce de batata", price: "$6.820" },
          { name: "Café", price: "$3.520" },
        ],
      },
    ],
  },
  {
    title: "Bebidas",
    groups: [
      {
        title: "Sin alcohol",
        items: [
          { name: "Gaseosas línea Coca-Cola (500 cc)", price: "$4.290" },
          { name: "Agua sin gas (500 cc)", price: "$4.290" },
          { name: "Agua gasificada (500 cc)", price: "$4.290" },
          { name: "Agua saborizada (500 cc)", price: "$4.290" },
          { name: "Saborizada línea Aquarius", price: "$7.000" },
          { name: "Jugo de naranja exprimido (vaso)", price: "$7.040" },
        ],
      },
      {
        title: "Cerveza tirada Portales",
        note: "Variedades: Red IPA · Scottish · Honey · Golden · Session IPA.",
        items: [{ name: "Vaso de 370 cc", price: "$3.520" }],
      },
      {
        title: "Vinos",
        note: "Por botella",
        items: [
          { name: "Angélica Zapata · Malbec", price: "$30.800" },
          { name: "Trumpeter · Malbec", price: "$14.300" },
          { name: "Escorihuela · Malbec", price: "$13.750" },
          { name: "Cordero · Malbec", price: "$8.800" },
          { name: "Cordero · Blanco", price: "$8.800" },
        ],
      },
    ],
  },
];

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
  menu,
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
    address: "Av. Valeria de Crotto, Uribelarrea, Provincia de Buenos Aires",
    mapEmbed:
      "https://maps.google.com/maps?q=Portales+de+Uribelarrea,+Av.+Valeria+de+Crotto,+Uribelarrea,+Provincia+de+Buenos+Aires&t=&z=16&ie=UTF8&iwloc=&output=embed",
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
    body: "Elegí el día y la hora, dejanos tus datos y te confirmamos por email.",
    cta: "Reservar ahora",
  },
} as const;
