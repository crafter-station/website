export interface Perk {
  id: string;
  name: string;
  email: string;
  password: string;
  url: string;
}

export const perks: Perk[] = [
  {
    id: "ejemplo",
    name: "Ejemplo",
    email: "ejemplo@correo.com",
    password: "password123",
    url: "https://ejemplo.com",
  },
];
