import { useQuery } from 'react-query'
import apiClient from '../../services/apiClient'

export const useFetchTaggedApi = (role) => {
    return useQuery(['Sidebar Data', role], async () => {
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
            console.log('API Requested - Get: Tagged Modules')
            return unique
        } catch (error) {
            console.log(error)
        }
    })
}

export const useFetchNotificationApi = async () => {
    return useQuery(async () => {
        try {
            const res = await apiClient.get(`Receiving/GetNotification`)
            console.log('API Requested - Get: Notifications')
            return res.data
        } catch (error) {
            console.log(error)
        }
    })
}



//Default Confirm Toast

// Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // await post api here
//       //.then final swal
//       Swal.fire({
//     position: 'top-end',
//     icon: 'success',
//     title: 'Your work has been saved',
//     showConfirmButton: false,
//     timer: 1500
//   })
//     }
//   })
