import { useState } from 'react'

//Hook converts video subtitles from YouTube by removing special characters.
//With Formik we dont need import 'subtitle' and 'setSubtitle'
export const useConvertSubtitle = (initValue, isFormik) => {
  const [convertedText, setConvertedText] = useState('')
  const [subtitle, setSubtitle] = useState(initValue)
  const [inProcess, setInProcess] = useState(false)  

  const paterns = [
    [/\b\d{1,3}\n/g, ''],
    [/<.{1,}?>/g, ''],
    [/00:\d{2}:\d{2}\,\d{2,3} --> \d{2}:\d{2}:\d{2,3}/gm, ' '],//<br />\,\d{2,3}
    [/\s{2,},\s{2,}/gm, ''],
    [/\[Music\]/gm, ' '],//<br />
    [/\,/gm, '']
  ]

  const removeCharacters = subText => {
    setInProcess(true)
    let text = subText

    for (var i = 0; i < paterns.length; i++){
        text = text.replace(paterns[i][0], paterns[i][1])
    }

    setConvertedText(text)
    if (isFormik) setSubtitle('')
    setInProcess(false)
  }

// When we use Formik we recive 'formikValue' in ather case we use a local 'subtitle', 'setSubtitle'
  const converteText = (formikValue = '') => {
    if (!isFormik) {
      removeCharacters(subtitle)
    } else {
      removeCharacters(formikValue.subtitle)
      // console.log('HOOK 555', formikValue.subtitle)
    }
  }

  return {
    subtitle,
    convertedText,
    inProcess,
    onChangeConvText: e => setSubtitle(e.target.value),
    onClickConvText: (values='') => converteText(values)
  }
}