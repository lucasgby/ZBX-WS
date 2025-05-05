import { NotificationType, toasty } from "@/components";
import { LoginState } from "@/controller/state/loginState"
import { useSchemaValidade } from "@/hooks/useSchemaValidade";
import { LoginSchema, loginSchema } from "@/model/formShema/loginSchema";
import { signIn } from "@/service/fetch/login";
import { useRouter } from 'next/navigation';

export function ControllerLogin() {
  const { isVisible, setIsVisible } = LoginState();
  const loginMethods = useSchemaValidade<LoginSchema>( { schemaYup: loginSchema } );

  const { register, handleSubmit, formState: { errors } } = loginMethods

  const navigation = useRouter();

  async function handleSignIn({ login, password }: LoginSchema) {
    try {
      await signIn({ login, password })

      navigation.push('/home');

      toasty({ message: "Login Realizado com Sucesso", type: NotificationType.SUCCESS })
    } catch (error: any) {
      toasty({ message: "Login ou Senha inválidos", type: NotificationType.ERROR })
    }
  }

  const toggleVisibility = () => setIsVisible(prev => !prev);

  const state = {
    isVisible
  }
  
  const yupForm = {
    register,
    handleSubmit,
    errors
  }

  return {
    state,
    yupForm,

    toggleVisibility,
    handleSignIn
  }
}