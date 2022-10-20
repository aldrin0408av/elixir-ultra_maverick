import { useMutation } from "react-query"
import * as yup from "yup";
import apiClient from "../../services/apiClient"

export const loginSchema = yup.object({
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
})

export const useLoginApi = () => {
    return useMutation(
        (data) => {
            return apiClient.post(`Login/Authenticate`, data)
        }
    )
}
