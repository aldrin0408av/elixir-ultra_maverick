import { useQuery } from 'react-query'
import apiClient from '../../services/apiClient'

export const useFetchTaggedApi = (role) => {
    return useQuery(
        ['Sidebar Data', role],
        async () => {
            try {
                const res = await apiClient.get(`Role/GetRoleModuleWithId/${role}`)
                const unique = []
                const map = new Map();
                for (const item of res.data) {
                    if (!map?.has(item.mainMenuId)) {
                        map.set(item.mainMenuId, true);
                        const submenu = res.data?.filter(s => s.mainMenuId === item.mainMenuId && s.subMenu !== item.mainMenu)
                        unique.push({
                            mainMenuId: item.mainMenuId,
                            mainMenu: item.mainMenu,
                            path: item.menuPath,
                            subMenu: submenu.map(sub => {
                                return {
                                    title: sub.subMenu,
                                    path: sub.moduleName
                                }
                            })
                        })
                    }
                }
                return unique
            } catch (error) {
                console.log(error)
            }
        },
        {
            enabled: !!role,
            cacheTime: 5000
        }
    )
}

export const useFetchNotificationApi = async () => {
    return useQuery(
        async () => {
            try {
                const res = await apiClient.get(`Receiving/GetNotification`)
                return res.data
            } catch (error) {
                console.log(error)
            }
        }
    )
}
