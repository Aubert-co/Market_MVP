import styled from "styled-components"
import { Container } from "@/components/layouts/container"

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
  color: #333;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: #e63946;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 24px;
  }

  a {
    background-color: #2563eb;
    color: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.2s ease;

    &:hover {
      background-color: #1e40af;
    }
  }
`

export const NotFound = () => {
  return (
    <Container>
      <NotFoundWrapper>
        <h1>Página não encontrada</h1>
        <p>Ops! O conteúdo que você procura não existe.</p>
        <a href="/">Voltar para a página inicial</a>
      </NotFoundWrapper>
    </Container>
  )
}
