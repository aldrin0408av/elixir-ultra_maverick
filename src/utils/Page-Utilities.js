import { useState } from "react";
import { usePagination } from "@ajna/pagination"

export const usePageUtilities = () => {

    const [search, setSearch] = useState('')
    const [status, setStatus] = useState(true)

    const [pageTotal, setPageTotal] = useState(undefined)
    const outerLimit = 2;
    const innerLimit = 2;
    const { currentPage, setCurrentPage, pagesCount, pages, setPageSize, pageSize } = usePagination({
        total: pageTotal,
        limits: {
            outer: outerLimit,
            inner: innerLimit,
        },
        initialState: { currentPage: 1, pageSize: 5 },
    })

    return { currentPage, setCurrentPage, pagesCount, pages, setPageSize, pageSize, pageTotal, setPageTotal, search, setSearch, status, setStatus }

}
