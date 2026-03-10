import type { Order } from "@/types/storeDashboard.types"
import { getLocalDate, getOrderStatus } from "@/utils";

import styled from "styled-components";
type Props = {
  order:Order[]
}
export const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OrderCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }
`;

export const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #475569;

    strong {
      display: block;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 4px;
    }
  }
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;

  background: ${({ $status }) =>
    $status === "completed"
      ? "#dcfce7"
      : $status === "pending"
      ? "#fef9c3"
      : "#fee2e2"};

  color: ${({ $status }) =>
    $status === "completed"
      ? "#166534"
      : $status === "pending"
      ? "#854d0e"
      : "#991b1b"};
`;
export const ListOrderDetail = ({ order }: Props) => {
  return (
    <OrderListWrapper>
      {order.map((val) => {
        const status = getOrderStatus(val.status)
        const createdAt  =getLocalDate(val.createdAt)
        return (<OrderCard key={val.id}>
          <OrderGrid>
            <p>
              <strong>ID</strong>
              #{val.id}
            </p>

            <p>
              <strong>Cliente</strong>
              {val.user}
            </p>

            <p>
              <strong>Produto</strong>
              {val.product.name}
            </p>

            <p>
              <strong>Quantidade</strong>
              {val.quantity}
            </p>

            <p>
              <strong>Preço Unitário</strong>
              R$ {val.price}
            </p>

            <p>
              <strong>Total</strong>
              R$ {val.total}
            </p>

            <p>
              <strong>Status</strong>
              <StatusBadge $status={val.status}>
                {status}
              </StatusBadge>
            </p>

            <p>
              <strong>Criado em</strong>
              {createdAt}
            </p>

            {val.coupon && (
              <p>
                <strong>Cupom</strong>
                {val.coupon.code} ({val.coupon.discount}%)
              </p>
            )}
          </OrderGrid>
        </OrderCard>
      )})}
    </OrderListWrapper>
  );
};