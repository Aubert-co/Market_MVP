import { DashboardStats } from "@/components/shared/dashboardStats"
import { mapStats, Stats } from "@/constants/dashboardStats"
import type { BackendStats } from "@/types/storeDashboard.types"
import { render } from "@testing-library/react"


export const mockBackendStats: BackendStats = {
  views: 1240,
  revenue: 12540,
  orders: 32,
  products: 18,
  coupons: 4,
  conversion: 3.4
}
describe("component DashboardStats",()=>{
    it("should successfully render the data",()=>{
        const map = mapStats(mockBackendStats)
        const {getByText,queryByText} = render(
            <DashboardStats stats={map}/>
        )
        Stats.forEach((stat) => {
            const rawValue = mockBackendStats[stat.dataKey]
            expect(queryByText(stat.label)).toBeInTheDocument()
            if (stat.dataKey === "conversion") {
                const formatted = `${rawValue}%`
                expect(getByText(formatted)).toBeInTheDocument()
                return
            }

           if (stat.dataKey === "revenue") {
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(rawValue)

                const escaped = formatted.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

                expect(
                    getByText(new RegExp(escaped.replace(/\s/, "\\s?")))
                ).toBeInTheDocument()

                return
            }
            expect(getByText(String(rawValue))).toBeInTheDocument()
        })
    })
   
})
