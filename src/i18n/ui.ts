export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.properties': 'Propiedades',
    'nav.agents': 'Asesores',
    'nav.zones': 'Zonas',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',

    // Hero
    'hero.title': 'Propiedades Exclusivas en La Paz, BCS',
    'hero.subtitle': 'Descubre nuestra selección curada de casas y oportunidades de inversión en las zonas más deseadas de La Paz, Baja California Sur.',
    'hero.cta': 'Ver Propiedades Destacadas',

    // Featured
    'featured.title': 'Propiedades Destacadas',
    'featured.subtitle': 'Selección cuidadosa de propiedades excepcionales que representan lo mejor en calidad de vida e inversión.',
    'featured.viewAll': 'Ver Todas las Propiedades',

    // Zones
    'zones.title': 'Zonas Exclusivas',
    'zones.subtitle': 'Explora nuestras zonas seleccionadas, cada una con ventajas únicas de estilo de vida y potencial de inversión.',
    'zones.explore': 'Explorar',
    'zones.viewAll': 'Ver Todas las Zonas',

    // Value props
    'value.curation.title': 'Selección Experta',
    'value.curation.desc': 'Cada propiedad es cuidadosamente elegida por nuestro equipo de expertos para garantizar calidad y valor excepcionales.',
    'value.quality.title': 'Calidad Premium',
    'value.quality.desc': 'Representamos solo las mejores propiedades que cumplen con nuestros estrictos estándares de ubicación, diseño y potencial de inversión.',
    'value.service.title': 'Servicio Personalizado',
    'value.service.desc': 'Nuestros asesores dedicados te guían durante todo tu proceso de compra, desde la búsqueda hasta el cierre.',

    // CTA
    'cta.title': 'Encuentra tu Propiedad Ideal Hoy',
    'cta.subtitle': 'Déjanos ayudarte a descubrir la propiedad perfecta que se adapte a tu estilo de vida y metas de inversión.',
    'cta.button': 'Contáctanos',

    // Footer
    'footer.desc': 'Descubre propiedades exclusivas en La Paz, BCS. Nuestra selección curada representa las mejores oportunidades inmobiliarias para clientes que buscan calidad y sofisticación.',
    'footer.quicklinks': 'Enlaces Rápidos',
    'footer.contact': 'Contacto',
    'footer.copyright': 'Todos los derechos reservados.',

    // Properties
    'properties.title': 'Nuestras Propiedades',
    'properties.subtitle': 'Explora nuestra selección exclusiva de propiedades en La Paz, BCS.',
    'properties.bedrooms': 'Recámaras',
    'properties.bathrooms': 'Baños',
    'properties.size': 'Superficie',
    'properties.viewDetails': 'Ver Detalles',
    'properties.contact': 'Contactar Asesor',
    'properties.available': 'Disponible',
    'properties.sold': 'Vendida',
    'properties.reserved': 'Reservada',

    // Contact
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Estamos aquí para ayudarte a encontrar la propiedad de tus sueños en La Paz, BCS.',
    'contact.name': 'Nombre',
    'contact.email': 'Correo electrónico',
    'contact.phone': 'Teléfono',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',

    // About
    'about.title': 'Sobre La Inmobiliaria',
    'about.subtitle': 'Tu socio de confianza en bienes raíces en La Paz, Baja California Sur.',
  },
  en: {
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.agents': 'Agents',
    'nav.zones': 'Zones',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'hero.title': 'Exclusive Properties in La Paz, BCS',
    'hero.subtitle': 'Discover our curated selection of homes and investment opportunities in the most desirable areas of La Paz, Baja California Sur.',
    'hero.cta': 'View Featured Properties',

    'featured.title': 'Featured Properties',
    'featured.subtitle': 'Handpicked selection of exceptional properties representing the best in quality living and investment potential.',
    'featured.viewAll': 'View All Properties',

    'zones.title': 'Exclusive Zones',
    'zones.subtitle': 'Explore our selected neighborhoods, each offering unique lifestyle advantages and investment potential.',
    'zones.explore': 'Explore',
    'zones.viewAll': 'View All Zones',

    'value.curation.title': 'Expert Curation',
    'value.curation.desc': 'Every property is carefully selected by our team of experts to ensure exceptional quality and value.',
    'value.quality.title': 'Premium Quality',
    'value.quality.desc': 'We represent only the finest properties that meet our strict standards for location, design, and investment potential.',
    'value.service.title': 'Personalized Service',
    'value.service.desc': 'Our dedicated agents provide personalized guidance throughout your entire real estate journey, from search to closing.',

    'cta.title': 'Find Your Dream Property Today',
    'cta.subtitle': 'Let our expert team help you discover the perfect property that matches your lifestyle and investment goals.',
    'cta.button': 'Contact Us',

    'footer.desc': 'Discover exclusive properties in La Paz, BCS. Our curated selection represents the best real estate opportunities for clients seeking quality and sophistication.',
    'footer.quicklinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.copyright': 'All rights reserved.',

    'properties.title': 'Our Properties',
    'properties.subtitle': 'Explore our exclusive selection of properties in La Paz, BCS.',
    'properties.bedrooms': 'Bedrooms',
    'properties.bathrooms': 'Bathrooms',
    'properties.size': 'Size',
    'properties.viewDetails': 'View Details',
    'properties.contact': 'Contact Agent',
    'properties.available': 'Available',
    'properties.sold': 'Sold',
    'properties.reserved': 'Reserved',

    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to help you find your dream property in La Paz, BCS.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.send': 'Send Message',

    'about.title': 'About La Inmobiliaria',
    'about.subtitle': 'Your trusted real estate partner in La Paz, Baja California Sur.',
  },
} as const;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof typeof ui['es'];

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] || ui['es'][key] || key;
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}
