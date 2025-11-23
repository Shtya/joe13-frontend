import { api } from '@/helpers/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ContactUsSchema } from '@/schema/ContactUsSchema';

export const hookContactUs = () => {
    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setError,
        getValues,
        setValue,
        watch,
        reset,
    } = useForm({ resolver: yupResolver(ContactUsSchema) });
    const [loading, setisloading] = useState(false);
    const t = useTranslations();

    const submit = handleSubmit(async data => {
        setisloading(true);
        const handleData = {
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            message: data?.message,
            type: 'general',
        };

        const toastId = toast.loading(t('submitting'));
        try {
            const res = await api.post('/api/v1/contacts', handleData);
            toast.success(t('contactSuccess'), { id: toastId });
            reset();
        } catch (error) {
            toast.error(t('contactError'), { id: toastId });
        } finally {
            setisloading(false);
        }
    });

    return { loading, register, errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset };
};
