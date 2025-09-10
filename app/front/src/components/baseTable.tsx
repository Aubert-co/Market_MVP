import { Table } from "@/styles/dashboardStore.style";


type Props = {
  tbody:React.ReactNode,
  thead:React.ReactNode
}
export const BaseTable = ({tbody,thead}:Props) => {
  
  return (
      <Table>
        <thead>
          <tr>
            {thead}
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </Table>
    
  );
};
