import { ReactNode } from "react";
import { Container, Content, Footer, Nav, Header, ContentLayout } from "@/components";

import styles from "./styles.module.css";

interface NavLayoutProps {
  children: ReactNode;
}

export default function NavLayout({ children }: NavLayoutProps) {
  return (
    <Container>
      <Content>
        <Nav />

        <div className={styles.container}>
          <Header />

          <ContentLayout>
            {children}
          </ContentLayout>

          <Footer />
        </div>
      </Content>
    </Container>
  )
}