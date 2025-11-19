import { RegisterForm } from '@/app/components/forms/RegisterForm';
import AuthLayout from '../layout';

export default function RegisterPage() {
  return (
    // <AuthLayout title="" subtitle="">
      <div className="w-full lg:w-1/2 p-12 md:p-16 flex flex-col justify-center">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">REGISTER</h1>
          <p className="text-gray-500 text-base">How to i get started ?</p>
        </div>

        {/* Form */}
        <RegisterForm />
      </div>
  );
}