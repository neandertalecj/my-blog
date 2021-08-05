import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FormFormik, ContainerFormFormik, Field, LockIcon, ErrorIcon } from '../../../components/FieldFormik'
import { useConvertSubtitle } from '../hooks/useConvertSubtitle'

const Tools = () => {
  const { subtitle, convertedText, inProcess, onChangeConvText, onClickConvText } = useConvertSubtitle('', true)

  const formik = useFormik({
    initialValues: {
      subtitle: '',
    },
    validationSchema: validScheme,
    onSubmit: (values, { resetForm }) => {
      onClickConvText(values)

      resetForm({ subtitle: '' })
    }, //values => dispatch(authStart({ ...values, isRegister }))
  })

  return (
    <div>
      <h3>Tools</h3>
      <p>Resource for getting subtitle from Youtube: </p>
      <a
        className="text-blue-400 hover:text-blue-600 underline"
        href="https://www.nikse.dk/SubtitleEdit/Online" target="blank">
        Link
      </a>
      <br />

      <ContainerFormFormik>
        <FormFormik onSubmit={formik.handleSubmit}>

          <Field
            dot={true}
            error={formik.touched?.subtitle && formik.errors?.subtitle}
            label="Subtitle"
            name="subtitle"
            onChange={formik.handleChange}
            value={formik.values.subtitle}//this field for formReset nessesary
            type="textarea"
          />

          <button
            className={`mb-2 mt-8 bg-black active:bg-gray-900 ${inProcess && 'bg-gray-500'} focus:outline-none text-white rounded px-4 py-1`}
            type="submit"
            disabled={inProcess}
          >
            Convert
          </button>

        </FormFormik>
      </ContainerFormFormik>

      <div>{convertedText}</div>{/* here well appear text*/}
    </div>
  )
}

export default Tools

const validScheme = Yup.object().shape({
  subtitle: Yup.string().min(2, 'Too Short!').required('Required'),
})

{/* <br />
<input 
  className="border"
  type="text" 
  value={subtitle} 
  onChange={onChangeConvText}
/>
<button
  onClick={onClickConvText}
>Convert text</button> */}