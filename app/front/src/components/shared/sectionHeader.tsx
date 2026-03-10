import styled from "styled-components"

type Props = {
  title: string
  action?: React.ReactNode
}

export const SectionHeader = ({ title, action }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      {action && <Action>{action}</Action>}
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb; 
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #374151; 
  letter-spacing: 0.2px;
`

const Action = styled.div`
  font-size: 14px;
  color: #2563eb; 
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`
