import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signUpWithFirebaseThunk } from '@/store/thunks/authThunks';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import { ROUTES } from '@/constants';
import toast from 'react-hot-toast';

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    displayName: z.string().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading: authLoading, error: authError } = useAppSelector(
    state => state.auth
  );
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setFirebaseError(null);
    try {
      await dispatch(
        signUpWithFirebaseThunk({
          email: data.email,
          password: data.password,
          displayName: data.displayName,
        })
      ).unwrap();
      toast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : 'Sign up failed';
      setFirebaseError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - React Boilerplate</title>
        <meta name="description" content="Create a new account" />
      </Helmet>
      <div className="max-w-md mx-auto">
        <Card title={t('auth.signup')}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {(firebaseError || authError) && (
              <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md text-sm">
                {firebaseError || authError}
              </div>
            )}

            <Input
              label="Display Name (Optional)"
              type="text"
              {...register('displayName')}
              error={errors.displayName?.message}
              autoComplete="name"
            />
            <Input
              label={t('auth.email')}
              type="email"
              {...register('email')}
              error={errors.email?.message}
              autoComplete="email"
            />
            <Input
              label={t('auth.password')}
              type="password"
              {...register('password')}
              error={errors.password?.message}
              autoComplete="new-password"
            />
            <Input
              label="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={authLoading}
            >
              {t('auth.signup')}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('auth.hasAccount')}{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              {t('auth.login')}
            </Link>
          </p>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
