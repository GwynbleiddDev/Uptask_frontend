import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { ConfirmToken } from '@/types/index';
import { confirmAccount } from '@/api/AuthAPI';



export default function ConfirmAccountView() {
  
  const [token, setToken] = useState<ConfirmToken['token']>('');

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/auth/login')
    },
  });

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken['token']) => mutate({ token })

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste{' '}
        <span className="text-fuchsia-500 font-bold">por e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <PinInputField
                key={index}
                className="w-10 h-10 rounded-lg border-gray-300 border text-center"
              />
            ))}
          </PinInput>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4 text-white">
        <Link
          to="/auth/request-code"
          className="text-center font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}