import { Navigate, Outlet } from "react-router-dom"
import { useGetStoreInfo } from "@/hooks/store/useGetStoreInfo"
import { saveStorageStore } from "@/storage/store.storage"

export const ProtectedStoreRoutes = () => {

  const { storeInfo } = useGetStoreInfo()

  if (storeInfo.status === 0) {
    return <div>Carregando...</div>
  }

  if (storeInfo.status !==200) {
    return <Navigate to="/login" replace />
  }

  if (storeInfo.datas.id === 0) {
    return <Navigate to="/abrir-loja" replace />
  }
  saveStorageStore(storeInfo.datas);

  return <Outlet />
}