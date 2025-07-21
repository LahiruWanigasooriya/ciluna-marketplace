import React, { useState } from "react";
import Title from "./Title";
import { TextField, Checkbox, Button } from "@/components/ui";
import { CircleX, Loader2 } from "lucide-react";
import {
  signupValidationSchema,
  loginValidationSchema,
  forgotPasswordValidationSchema,
} from "@/schemas/validationSchemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { checkUserAndGenerateToken, createNewUser } from "@/actions/users/user";
import { resendTemporaryPassword } from "@/actions/users/resendTempPassword";
import Tel from "@/components/custom/Phone";
import { ValidationError } from "yup";
import { useAuthStore } from "@/store/authStore";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  remember: boolean;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

const useForm = (initialState: FormData) => {
  const [formData, setFormData] = React.useState<FormData>(initialState);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return { formData, errors, setErrors, handleChange, resetForm };
};

// Login Form Component
const LoginForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isLoading,
  isSuccess,
  setView,
}: {
  formData: FormData;
  errors: FormErrors;
  handleChange: (field: keyof FormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSuccess: boolean;
  setView: (view: "login" | "signup" | "forgot") => void;
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col space-y-3 lg:space-y-4 w-full items-center"
  >
    <Title
      title="Welcome to PAW MARKETPLACE"
      className="lg:text-lg text-white/90"
    />
    <div className="flex flex-col space-y-3 lg:space-y-4 w-full">
      <TextField
        label="Email"
        className="auth-textfield"
        placeholder="yourname@email.com"
        name="email"
        id="email"
        type="email"
        value={formData.email}
        onChange={(value: string) => handleChange("email", value)}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      <div className="flex flex-col space-y-1">
        <TextField
          type="password"
          isRevealable
          label="Password"
          className="auth-textfield"
          placeholder="password"
          value={formData.password}
          onChange={(value: string) => handleChange("password", value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
        <div className="flex items-center justify-between">
          <Checkbox
            isSelected={formData.remember}
            onChange={(isSelected: boolean) =>
              handleChange("remember", isSelected)
            }
          >
            <p className="text-xs text-white/90">Remember me</p>
          </Checkbox>
          <p
            onClick={() => setView("forgot")}
            className="text-white/90 cursor-pointer underline text-xs hover:opacity-75"
          >
            Forgot your password?
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-3">
        <Button
          type="submit"
          className={`w-full font-interSemiBold bg-purple transition-opacity duration-300 text-white/90 ${
            isLoading ? "opacity-80" : ""
          }`}
          isDisabled={isLoading || isSuccess}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin mr-1" /> Sign In
            </>
          ) : (
            "Sign In"
          )}
        </Button>
        <div className="flex items-center gap-2 w-full">
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
          <p className="text-xs text-gray-200">or</p>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        </div>
        <div className="flex items-center justify-center space-x-2 text-white/70">
          <p className="text-sm">Don't have an account?</p>
          <p
            onClick={() => setView("signup")}
            className="cursor-pointer underline text-sm hover:opacity-75"
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  </form>
);

// Sign Up Form Component
const SignUpForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isLoading,
  isSuccess,
  setView,
}: {
  formData: FormData;
  errors: FormErrors;
  handleChange: (field: keyof FormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSuccess: boolean;
  setView: (view: "login" | "signup" | "forgot") => void;
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col space-y-3 lg:space-y-4 w-full items-center"
  >
    <Title title="Join PAW MARKETPLACE" className="lg:text-lg text-white/90" />
    <div className="flex flex-col space-y-3 lg:space-y-4 w-full">
      <div className="flex items-start gap-2 w-full">
        <div className="w-full">
          <TextField
            label="First Name"
            placeholder="First Name"
            value={formData.firstName}
            className="auth-textfield w-full"
            onChange={(value: string) => handleChange("firstName", value)}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName}</p>
          )}
        </div>
        <div className="w-full">
          <TextField
            label="Last Name"
            placeholder="Last Name"
            value={formData.lastName}
            className="auth-textfield w-full"
            onChange={(value: string) => handleChange("lastName", value)}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs">{errors.lastName}</p>
          )}
        </div>
      </div>
      <div>
        <TextField
          label="Email"
          placeholder="yourname@email.com"
          value={formData.email}
          className="auth-textfield w-full"
          onChange={(value: string) => handleChange("email", value)}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>
      <div>
        <Tel
          value={formData.phone}
          onChange={(phone: string) => handleChange("phone", phone)}
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
      </div>
      <div>
        <TextField
          type="password"
          isRevealable
          label="Create Password"
          placeholder="********"
          className="auth-textfield w-full"
          description="Password must contain at least 8 characters."
          value={formData.password}
          onChange={(value: string) => handleChange("password", value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>
      <Button
        type="submit"
        className={`w-full font-interSemiBold bg-purple transition-opacity duration-300 text-white/90 ${
          isLoading ? "opacity-80" : ""
        }`}
        isDisabled={isLoading || isSuccess}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin mr-1" /> Sign Up
          </>
        ) : (
          "Sign Up"
        )}
      </Button>
      <div className="flex items-center gap-2 w-full">
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <p className="text-xs text-gray-200">or</p>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
      </div>
      <div className="flex items-center justify-center space-x-2 text-white/70">
        <p className="text-sm">Already have an account?</p>
        <p
          onClick={() => setView("login")}
          className="cursor-pointer underline text-sm hover:opacity-75"
        >
          Sign In
        </p>
      </div>
    </div>
  </form>
);

// Forgot Password Form Component
const ForgotPasswordForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isLoading,
  isSuccess,
  setView,
}: {
  formData: FormData;
  errors: FormErrors;
  handleChange: (field: keyof FormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSuccess: boolean;
  setView: (view: "login" | "signup" | "forgot") => void;
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col space-y-3 lg:space-y-4 w-full items-center"
  >
    <Title title="Reset Your Password" className="lg:text-lg text-white/90" />
    <div className="flex flex-col space-y-3 lg:space-y-4 w-full">
      <TextField
        label="Email"
        className="auth-textfield"
        placeholder="yourname@email.com"
        name="email"
        id="email"
        type="email"
        value={formData.email}
        onChange={(value: string) => handleChange("email", value)}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      <Button
        type="submit"
        className={`w-full font-interSemiBold bg-purple transition-opacity duration-300 text-white/90 ${
          isLoading ? "opacity-80" : ""
        }`}
        isDisabled={isLoading || isSuccess}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin mr-1" /> Send Reset Link
          </>
        ) : (
          "Send Reset Link"
        )}
      </Button>
      <div className="flex items-center gap-2 w-full">
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        <p className="text-xs text-gray-200">or</p>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
      </div>
      <div className="flex items-center justify-center space-x-2 text-white/70">
        <p className="text-sm">Remember password?</p>
        <p
          onClick={() => setView("login")}
          className="cursor-pointer underline text-sm hover:opacity-75"
        >
          Sign In
        </p>
      </div>
    </div>
  </form>
);

interface AuthWrapperProps {
  ref: any;
  closePopup: () => void;
}

const AuthWrapper = ({ ref, closePopup }: AuthWrapperProps) => {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [view, setView] = useState<"login" | "signup" | "forgot">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialState: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    remember: false,
  };
  const { formData, errors, setErrors, handleChange, resetForm } =
    useForm(initialState);

  const getHeightClass = () => {
    switch (view) {
      case "login":
        return "h-[500px]";
      case "signup":
        return "h-[660px]";
      case "forgot":
        return "h-[400px]";
      default:
        return "h-[500px]";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let validationSchema;
      let action;

      switch (view) {
        case "login":
          validationSchema = loginValidationSchema;
          action = async () => {
            if (!formData.email || !formData.password) {
              setIsLoading(false);
              return { success: false, message: "Missing fields" };
            }
            const { email, password } = formData;
            return await checkUserAndGenerateToken({ email, password });
          };
          break;
        case "signup":
          validationSchema = signupValidationSchema;
          action = async () => {
            const { firstName, lastName, email, password, phone } = formData;
            const contactNo = phone;
            return await createNewUser({
              firstName,
              lastName,
              email,
              password,
              contactNo,
            });
          };
          break;
        case "forgot":
          validationSchema = forgotPasswordValidationSchema;
          action = async () => {
            const { email } = formData;
            return await resendTemporaryPassword(email);
          };
          break;
        default:
          throw new Error("Invalid view");
      }

      await validationSchema.validate(formData, { abortEarly: false });
      const res = await action();

      if (res.success) {
        setIsSuccess(true);
        if (view === "login") {
          const token = "data" in res && res.data?.token ? res.data.token : "";
          setAuth(token, formData.remember);
          router.push("/");
          router.refresh();
          closePopup();
        } else if (view === "signup") {
          toast.success("Welcome to PAW Marketplace! Please log in to continue.");
          setTimeout(() => {
            setView("login"); 
            resetForm(); 
            setIsSuccess(false);
          }, 1000);
        } else if (view === "forgot") {
          toast.success("Password reset link sent to your email.");
          setTimeout(() => {
            setView("login");
            resetForm();
            closePopup();
          }, 2000);
        }
      } else {
        toast.error(
          res.message ||
            `Failed to ${
              view === "login"
                ? "login"
                : view === "signup"
                ? "sign up"
                : "send reset link"
            }.`
        );
      }
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        const newErrors = error.inner.reduce<FormErrors>((acc, err) => {
          if (err.path && typeof err.message === "string") {
            acc[err.path as keyof FormData] = err.message;
          }
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        toast.error(
          `${
            view === "login" ? "Login" : view === "signup" ? "Signup" : "Reset"
          } error`
        );
        console.error(`${view} error:`, error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`bg-[#FFFFFF]/10 backdrop-blur-2xl w-full md:w-[500px] text-black flex flex-col items-center justify-center gap-12 px-4 md:px-6 lg:px-8 py-4 rounded-lg border border-transparent shadow-xl mx-4 relative ${getHeightClass()}`}
    >
      <div className="absolute top-2 right-2">
        <CircleX
          className="cursor-pointer text-purple hover:opacity-75"
          onClick={closePopup}
        />
      </div>
      {view === "login" && (
        <LoginForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isSuccess={isSuccess}
          setView={setView}
        />
      )}
      {view === "signup" && (
        <SignUpForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isSuccess={isSuccess}
          setView={setView}
        />
      )}
      {view === "forgot" && (
        <ForgotPasswordForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isSuccess={isSuccess}
          setView={setView}
        />
      )}
    </div>
  );
};

export default AuthWrapper;
