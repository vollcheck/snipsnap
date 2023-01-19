import { Container, Content, Footer, Hero } from "react-bulma-components";

export default function SnipSnapFooter() {
  return (
    <>
      <Footer>
        <Content style={{ textAlign: "center" }}>
          <p>
            <strong>SnipSnap</strong> by{" "}
            <a href="http://github.com/vollcheck">Jacek Walczak</a>.
          </p>
        </Content>
      </Footer>
    </>
  );
}
