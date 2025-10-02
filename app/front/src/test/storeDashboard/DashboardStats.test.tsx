import { DashboardStats } from "@/components/store/DashboardStats"
import { render } from "@testing-library/react"

const datas = [
    {
        orders:{
        cancelled:519,completed:1999,pending:199
    },
        views:{total:192}
    }
]
describe("component DashboardStats",()=>{
    it("should successfully render the data",()=>{
        const {container,getByText} = render(
            <DashboardStats orders={datas[0].orders} views={datas[0].views}/>
        )
        const [valueComp,valueCancel,valuePending,valueViews] = container.querySelectorAll(".box-value")

        expect( valueComp ).toHaveTextContent(datas[0].orders.completed.toString())
        expect( valueCancel ).toHaveTextContent(datas[0].orders.cancelled.toString())
        expect( valuePending ).toHaveTextContent(datas[0].orders.pending.toString())
        expect( valueViews ).toHaveTextContent(datas[0].views.total.toString())
        expect(getByText("Pedidos cancelados")).toBeInTheDocument()
        expect(getByText("Pedidos completados")).toBeInTheDocument()
        expect(getByText("Pedidos pendentes")).toBeInTheDocument()
        expect(getByText("Total de visualizações")).toBeInTheDocument()
    })
     it("should successfully render with empty data and display value 0",()=>{
        const {container,getByText} = render(
            <DashboardStats orders={[] as never} views={[] as never}/>
        )
        const [valueComp,valueCancel,valuePending,valueViews] = container.querySelectorAll(".box-value")

        expect( valueComp ).toHaveTextContent('0')
        expect( valueCancel ).toHaveTextContent('0')
        expect( valuePending ).toHaveTextContent('0')
        expect( valueViews ).toHaveTextContent('0')
        expect(getByText("Pedidos cancelados")).toBeInTheDocument()
        expect(getByText("Pedidos completados")).toBeInTheDocument()
        expect(getByText("Pedidos pendentes")).toBeInTheDocument()
        expect(getByText("Total de visualizações")).toBeInTheDocument()
    })
})
