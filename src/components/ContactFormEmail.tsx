import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Tailwind,
  Font,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

const ContactFormEmail = ({ name, email, message }: ContactFormEmailProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="NT Brick Sans"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://github.com/crafter-station/website/raw/00ea06d70b2c7f90a564fc3944fbd550ab61e6f7/public/fonts/NTBrickSans.ttf",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Space Mono"
          fallbackFontFamily="monospace"
          webFont={{
            url: "https://fonts.gstatic.com/s/spacemono/v12/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                night: "#1F1F1F",
                pineapple: "#FFDF6B",
                sky: "#AAFCBE",
                bone: "#FFFCEB",
                strawberry: "#F6AFFB",
                berries: "#FF704B",
                grape: "#2F1B6D",
                wine: "#5A2B6A",
              },
              fontFamily: {
                brick: ["NT Brick Sans", "Arial", "sans-serif"],
                space: ["Space Mono", "Courier", "monospace"],
              },
            },
          },
        }}
      >
        <Body className="bg-night text-bone font-space">
          <Container className="mx-auto  p-4 max-w-xl">
            <Section
              className="bg-night rounded-lg p-8 mb-4"
              style={{
                border: "1px solid #FFFCEB",
              }}
            >
              <Heading className="text-3xl font-brick text-pineapple mb-4 text-center">
                Crafter Station
              </Heading>
              <Hr className="border-bone mb-6" />
              <Heading className="text-2xl font-brick text-sky mb-4 text-center">
                Nuevo Mensaje de Contacto
              </Heading>
              <Container className="mb-4">
                <Text className="text-strawberry font-bold">Nombre:</Text>
                <Text className="bg-bone text-night p-4 rounded-lg">
                  {name}
                </Text>
              </Container>
              <Container className="mb-4">
                <Text className="text-strawberry font-bold">Email:</Text>
                <Text className="bg-bone text-night p-4 rounded-lg">
                  {email}
                </Text>
              </Container>
              <Text className="text-strawberry font-bold mb-2">Mensaje:</Text>
              <Container className="bg-bone text-night p-4 rounded-lg">
                <Text>{message}</Text>
              </Container>
            </Section>
            <Text className="text-center text-sm text-sky">
              © 2024 Crafter Station. Todos los derechos reservados.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormEmail;
