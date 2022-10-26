import apiClient from '../../../../services/apiClient'
import { useMutation, useQuery } from 'react-query'

export const useFetchUserRolesApi = (status, currentPage, pageSize, search, setPageTotal) => {
    return useQuery(
        ['User Roles', status, currentPage, pageSize, search, setPageTotal],
        async () => {
            try {
                const res = await apiClient.get(`https://localhost:44342/api/Role/GetAllRolesWithPaginationOrig/${status}?pageNumber=${currentPage}&pageSize=${pageSize}&search=${search}`)
                setPageTotal(res.data.totalCount)
                return res.data
            } catch (error) {
                console.log(error)
            }
        },
    )
}

export const useChangeRoleStatusApi = () => {
    return useMutation(
        ({ id, roleStatus }) => {
            if (roleStatus) {
                return apiClient.put(`Role/InActiveRole/${id}`, { id: id })
            } else {
                return apiClient.put(`Role/ActivateRole/${id}`, { id: id })
            }
        }
    )
}
