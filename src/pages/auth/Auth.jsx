import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { authStart } from '../../store/auth/auth.actions'
import * as Yup from 'yup'
import { withAuthRedirect } from '../../utils/hoc/AuthRedirect'
import { Container } from '../../components/Container'
import { FormFormik, ContainerFormFormik, Field, LockIcon, ErrorIcon } from '../../components/FieldFormik'


const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.auth.isLoading)
  const error = useSelector(state => state.auth.error)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firsName: '',
      secondName: '',
      userName: '',
    },
    validationSchema: !isRegister ? validateSchemaLogin : validateSchemaRegister,
    onSubmit: values => dispatch(authStart({ ...values, isRegister })),
  })

  return (
    <Container>
      <div className="flex">
        <div>
          <ContainerFormFormik>
            <FormFormik onSubmit={formik.handleSubmit}>

              {isRegister && <Field
                dot={true}
                error={formik.touched?.firsName && formik.errors?.firsName}
                label="First name"
                name="firsName"
                onChange={formik.handleChange}
                type="text"
                disabled={!isRegister}
              />}

              {isRegister && <Field
                dot={true}
                error={formik.touched?.secondName && formik.errors?.secondName}
                label="Second name"
                name="secondName"
                onChange={formik.handleChange}
                type="text"
                disabled={!isRegister}
              />}

              {isRegister && <Field
                dot={true}
                error={formik.touched?.userName && formik.errors?.userName}
                label="User name"
                name="userName"
                onChange={formik.handleChange}
                type="text"
                disabled={!isRegister}
              />}

              <Field
                dot={true}
                error={formik.touched?.email && formik.errors?.email}
                label="Email"
                name="email"
                onChange={formik.handleChange}
                type="text"
              />

              <Field
                dot={true}
                error={formik.touched?.password && formik.errors?.password}
                icon={<LockIcon />}
                label="Password"
                name="password"
                onChange={formik.handleChange}
                type="password"
              />

              <button
                className={`mb-2 mt-8 bg-black active:bg-gray-900 ${isLoading && 'bg-gray-500'} focus:outline-none text-white rounded px-4 py-1`}
                type="submit"
                disabled={isLoading}
              >
                {isRegister ? 'Register' : 'Log in'}
              </button>

              {error && <div className="text-red-300 mb-2 relative"><ErrorIcon /> {error}</div>}
            </FormFormik>

            {!isRegister && <div>
              Don't have an account yet?
              <span className="underline cursor-pointer text-blue-600" onClick={() => setIsRegister(true)}> Register now</span>
            </div>}

            {isRegister && <div>
              Do you already have an account?
              <span className="underline cursor-pointer text-blue-600" onClick={() => setIsRegister(false)}> Log in</span>
            </div>}

          </ContainerFormFormik>

        </div>

        <div>
          Side
        </div>
      </div>
    </Container>
  )
}

export default withAuthRedirect(Auth)

// Yup validation schemas
const validateObjectLogin = {
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Password required'),
}

const validateSchemaLogin = Yup.object().shape(validateObjectLogin)

const validateSchemaRegister = Yup.object().shape({
  ...validateObjectLogin,
  firsName: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('First name required'),
  secondName: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Second name required'),
  userName: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('User name required'),
})
