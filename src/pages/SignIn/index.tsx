import React, { useCallback, useRef } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { Card, Container } from './styles';
import InputField from '../../components/Input';

import LogoSignIn from '../../assets/logo-signin.png';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';
import getValidationErrors from '../../utils/getVaalidationErrors';
import { useToast } from '../../hooks/Toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('Nome de usuário obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      await signIn({
        email: data.email,
        password: data.password,
      });
      history.push('/dashboard');
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Bem-vindo!`,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Credenciais inválidas!',
      });
    }
  }, []);

  return (
    <Container>
      <img width="220px" src={LogoSignIn} alt="Carina Sabonetes Artesanais" />
      <Card>
        <p>Acesse sua conta</p>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputField
            name="email"
            icon={MdEmail}
            placeholder="Digite seu e-mail"
          />

          <InputField
            name="password"
            type="password"
            icon={MdLock}
            placeholder="Digite sua senha"
          />

          <Button>ENTRAR</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignIn;
