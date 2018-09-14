// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate')

// const text = 'Bonjour monde!'
// const target = 'en'

const translateText = async (text, target) => {
console.log('here')
// Creates a client
const projectId = 'chattranslate-215721'
const translate = new Translate()

// await translate
//   .translate(text, target)
//   .then(results => {
//     let translations = results[0];
//     translations = Array.isArray(translations)
//       ? translations
//       : [translations]

//     console.log('Translations:')
//     translations.forEach((translation, i) => {
//       console.log(`${text[i]} => (${target}) ${translation}`)
//     })
//     console.log(translations)
//     return translations
//   })
//   .catch(err => {
//     console.error('ERROR:', err)
//   })


const translation = await translate.translate(text, target)
console.log(translation)
return translation
}

//translateText(text, target)
module.exports = translateText