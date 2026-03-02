import { SmallImage } from "@/styles/shared.style"
import type { TopVisitedProduct } from "@/types/storeDashboard.types"
import { loadImage } from "@/utils"
import styled from "styled-components"
import { RenderDataState } from "../shared/renderDataState"
import { Loading } from "../shared/loading"


type Props = {
  products: TopVisitedProduct[]
  status:number
}

export const renderTopVisitedProducts = (
  products: TopVisitedProduct[]
) => {
  return products.map((p) => (
    <Card key={p.id}>
      <SmallImage
        src={loadImage(p.imageUrl)}
        alt={p.name}
      />

      <Info>
        <Name>{p.name}</Name>
        <Visits>
          {p.currentMonthViews.toLocaleString()} visitas
        </Visits>
      </Info>

      <Growth $positive={p.growth >= 0}>
        {p.growth >= 0 ? "↑" : "↓"} {Math.abs(p.growth)}%
      </Growth>
    </Card>
  ))
}

export const TopVisitedProducts = ({ products,status }: Props) => {
  return (
    <Container>
      <RenderDataState
        skeleton={<Loading/>}
        emptyMessage="Nenhum produto encontrado."
        errorMessage="Erro ao carregar os produtos mais visitados."
        datas={products}
        status={status}
        >
          { renderTopVisitedProducts(products)}
      </RenderDataState>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9fafb;
  padding: 14px 16px;
  border-radius: 10px;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`



const Info = styled.div`
  flex: 1;
  margin-left: 12px;
`

const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`

const Visits = styled.div`
  font-size: 12px;
  color: #6b7280;
`

const Growth = styled.div<{ $positive: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $positive }) =>
    $positive ? "#10b981" : "#ef4444"};
`

