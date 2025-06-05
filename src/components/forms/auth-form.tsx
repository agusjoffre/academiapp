import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AuthFormProps = {
  type: "login" | "register";
  onSubmit: (data: AuthFormData) => Promise<void>;
  isLoading?: boolean;
};

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type AuthFormData = z.infer<typeof loginSchema> & {
  confirmPassword?: string;
};

const AuthForm = ({ type, onSubmit, isLoading = false }: AuthFormProps) => {
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<AuthFormData>({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: AuthFormData) => {
    try {
      await onSubmit(data);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <CheckCircle2 className="h-12 w-12 text-green-500 animate-bounce sm:h-16 sm:w-16" />
        <p className="text-lg font-medium sm:text-xl">
          {type === "login"
            ? "¡Inicio de sesión exitoso!"
            : "¡Registro exitoso!"}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="ejemplo@email.com"
                  type="email"
                  disabled={isLoading}
                  className="h-10 sm:h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  disabled={isLoading}
                  className="h-10 sm:h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        {type === "register" && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Confirmar Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    disabled={isLoading}
                    className="h-10 sm:h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="w-full h-10 sm:h-11 text-sm sm:text-base"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Procesando...</span>
            </div>
          ) : type === "login" ? (
            "Iniciar Sesión"
          ) : (
            "Registrarse"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
