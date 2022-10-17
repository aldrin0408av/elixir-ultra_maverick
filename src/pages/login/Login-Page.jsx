import { Box, Button, Flex, Image, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import apiClient from '../../services/apiClient';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { saltkey } from '../../@features/saltkey';
import Swal from 'sweetalert2';

const loginSchema = yup.object({
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
})

const LoginPage = () => {

    const [isLoading, setisLoading] = useState(false)

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange"
    })

    const submitHandler = async (submitData) => {
        try {
            setisLoading(true)
            const res = await apiClient.post("Login/Authenticate", submitData)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Welcome ${res.data.fullName}`,
                showConfirmButton: false,
                timer: 1000
            }).then(() => {
                navigate("/")
                var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(res.data), saltkey).toString()
                sessionStorage.setItem('userData', ciphertext)
                setisLoading(false)
                window.location.reload(false)
            })
        } catch (err) {
            setisLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (

        <Flex bgGradient="linear(to-l, secondary, primary)" h='100vh' justifyContent='center' alignItems='center'>
            <form onSubmit={handleSubmit(submitHandler)}>
                <VStack spacing={2} bgColor='gray.600' pl={10} pr={10} pt={4} pb={3} rounded={6}>
                    {/* <VStack> */}
                    {/* <HStack> */}
                    <Image width='200px' src='/images/umelixirlogo.png' />
                    {/* <Image width='85px' src='/images/logo.png' /> */}
                    {/* </HStack> */}
                    {/* <Heading color='#18b58f' size='md' fontFamily="">UM-Elixir</Heading> */}
                    {/* </VStack> */}
                    <Box>
                        <Input variant='filled' size='sm' autoComplete='off' placeholder='Username' {...register("userName")} />
                        <Text color="danger" fontSize='xs' mt={1}>{errors.userName?.message}</Text>
                    </Box>
                    <Box>
                        <Input variant='filled' size='sm' autoComplete='off' placeholder='Password' type='password' {...register("password")} />
                        <Text color="danger" fontSize='xs' mt={1}>{errors.password?.message}</Text>
                    </Box>
                    <Button width='full' bgColor='#18b58f' size='sm' type='sumbit' disabled={!isValid} isLoading={isLoading}>
                        Login
                    </Button>
                    <Text color='gray.300' fontSize='10px'>© 2022, UM-Elixir Powered by MIS</Text>
                </VStack>
            </form>
        </Flex>

    )
}

export default LoginPage;