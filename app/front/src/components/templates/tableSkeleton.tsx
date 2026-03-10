import { Table } from "@/styles/tables.style";
import styled, { keyframes } from "styled-components";

  const shimmer = keyframes`
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  `;



const SkeletonBlock = styled.div`
  height: 20px;
  width: 100%;
  border-radius: 6px;

  background: linear-gradient(
    90deg,
    #e0e0e0 0%,
    #f5f5f5 50%,
    #e0e0e0 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;

  will-change: background-position;
`;


type Props = {
  rows?: number;
  columns?: number;
};

export const TableSkeleton = ({
  rows = 2,
  columns = 2,
}: Props) => {
  return (
    <Table data-testid="table-skeleton">
      <thead>
        <tr>
            {Array.from({ length: columns }).map((_, colIndex) => (
            <th key={`head-${colIndex}`}>
                <SkeletonBlock />
            </th>
            ))}
        </tr>
        </thead>

        <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
            {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={`cell-${rowIndex}-${colIndex}`}>
                <SkeletonBlock />
                </td>
            ))}
            </tr>
        ))}
        </tbody>

    </Table>
  );
};
