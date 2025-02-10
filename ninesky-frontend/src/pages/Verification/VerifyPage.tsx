import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyAccount } from '../../API/Auth/Auth';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default function VerifyPage() {
    const { token } = useParams(); 
    const nav = useNavigate()
    const mutation = useMutation({
        mutationFn: (token: string) => verifyAccount(token),
        onSuccess(suc) {
        
            if(suc.data.access_token){
                    const decodedToken: any = jwt_decode(suc.data.access_token);
                    const expirationTime = decodedToken.exp * 1000;
                    const expirationDate = new Date(expirationTime);
                    cookies.set("token", token, { path: "/", expires: expirationDate });

                    setTimeout(()=>{
                        nav("/user/parcel/storage")
                    },500)
            }
        },
        onError(){
              Swal.fire({
                    title: 'შეცდომა',
                    text: "მომხმარებლის აქტვიაცია ვერ მოხერხდა, მიმართეთ საფორთს" ,
                    icon: 'error',
                    confirmButtonText: 'OK',
                  });
        }
    });

    const handleUserActivation = async () => {
        if (token) {
            await mutation.mutateAsync(token);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <button 
                onClick={handleUserActivation}
                disabled={mutation.isPending} // Disable button when loading
                className={`px-6 py-3 text-white font-bold rounded-lg transition-all duration-300
                    ${mutation.isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                `}
            >
                {mutation.isPending ? "Დატვირთვა..." : "მომხმარებლის გააქტიურება"}
            </button>
        </div>
    );
}
