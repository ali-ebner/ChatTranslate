// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate')

const text = 'Bonjour monde!'
const target = 'en'

const translateText = (text, target) => {


// Creates a client
const projectId = 'chattranslate-215721'
const translate = new Translate({
  projectId: projectId,
})

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = 'The text to translate, e.g. Hello, world!';

// Translates the text into the target language. "text" can be a string for
// translating a single piece of text, or an array of strings for translating
// multiple texts.
// 

translate
  .translate(text, target)
  .then(results => {
    let translations = results[0];
    translations = Array.isArray(translations)
      ? translations
      : [translations]

    console.log('Translations:')
    translations.forEach((translation, i) => {
      console.log(`${text[i]} => (${target}) ${translation}`)
    })
    return translations.join('')
  })
  .catch(err => {
    console.error('ERROR:', err)
  })

}
translateText(text, target)
module.exports = translateText