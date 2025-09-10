import type { PageInfo } from "@/types/pagination.types";

type UsableWithPages<T> = {
  setPages: (params: { totalPages: number; currentPage: number }) => void;
  setDatas: (args: { datas: T[]; status: number; message: string }) => void;
  service: (args: { body: any; pages: PageInfo }) => Promise<{
    datas: T[];
    message: string;
    status: number;
    currentPage: number;
    totalPages: number;
  }>;
  body: any;
  pages: PageInfo;
};

export const UsableFetchWithPages = async <T,>(
  { setDatas, service, setPages, body, pages }: UsableWithPages<T>
) => {
  try {
    const { datas, status, message, currentPage, totalPages } =
      await service({ body, pages });

    setDatas({ datas, status, message });
    setPages({ currentPage, totalPages });
  } catch (err: any) {
    setDatas({ datas: [], status: 500, message: "Algo deu errado!" });
    setPages({ currentPage: 1, totalPages: 1 });
  }
};
