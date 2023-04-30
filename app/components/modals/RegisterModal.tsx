'use client'

import axios from "axios"
import { AiFillFacebook, AiOutlineMail } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'

import { useCallback, useState } from "react"
import {
    SubmitHandler,
    useForm,
    FieldValues,
} from 'react-hook-form'
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Input from "../inputs/Input"
import { log } from "console"
import { toast } from 'react-hot-toast';
import Button from "../Button"

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    const handleClose = useCallback(() => {
        clearErrors();
        setTimeout(() => {
            registerModal.onClose();
        }, 300)
    }, [registerModal.onClose]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        console.log('will call api register soon');

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered!');
                registerModal.onClose();
                //   loginModal.onOpen();
            })
            .catch((error) => {
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    const bodyContent = (
        <div className="flex flex-col gap-2">
            <div className="text-2xl ">Welcome to Airbnb</div>
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                type='password'
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-row items-center ">
                <div className="border-t-[1px] border-gray-400 h-[1px] w-5/12"> </div>
                <div className="w-1/6 text-center">or</div>
                <div className="border-t-[1px] border-gray-400  h-[1px] w-5/12"> </div>
            </div>


            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => { }}
            />
            <Button
                outline
                label='Continue with Facebook'
                icon={AiFillFacebook}
                iconColor='#4267B2'
                onClick={() => { }}
            />
            <Button
                outline
                label='Continue with Apple'
                icon={BsApple}
                onClick={() => { }}
            />

            <Button
                outline
                label='Continue with Email'
                icon={AiOutlineMail}
                onClick={() => { }}
            />
            <div className="text-xs text-gray-500 flex flex-row gap-1 mt-2 justify-center">
                <div>Already have an account?</div>
                <div
                    onClick={registerModal.onClose}
                    className="
                        hover:underline
                        cursor-pointer
                         text-neutral-900
                    ">Log in</div>
            </div>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )

}

export default RegisterModal                 