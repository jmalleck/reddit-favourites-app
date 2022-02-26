import Navbar from "@/components/Navbar";
import { Container } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Container maxW="container.lg">{children}</Container>
    </>
  );
};

export default Layout;
