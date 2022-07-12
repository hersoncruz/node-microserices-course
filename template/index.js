const path = require('path')
const fs = require('fs')

const isSuccess = false
const contactUsUrl = 'asdolnaosdinamsd'
console.log('contactUsUrl: ', contactUsUrl)
const config = JSON.parse('{ "bagelBrandsLogo": "https://bballegianceapidev.blob.core.windows.net/account-deletion/v1.2.0-20220623/9fcf2d5f84b149e7bc5b8b9cb5f7c137.png", "backgroundImage": "https://bballegianceapidev.blob.core.windows.net/account-deletion/v1.2.0-20220623/412f372ac63d480d9dfacdc2194313b4.jpeg", "bruLogo": "https://bballegianceapidev.blob.core.windows.net/account-deletion/v1.2.0-20220623/e02f73db884e44b38e6d8951cf1ddfa8.png", "ebbLogo": "https://bballegianceapidev.blob.core.windows.net/account-deletion/v1.2.0-20220623/f8957292bcc142a48fd1049f4ee49853.png", "nnybLogo": "https://bballegianceapidev.blob.core.windows.net/account-deletion/v1.2.0-20220623/05e5ce0b34c64e2fbecc178cb9335900.png", "wholeBagel": "https://bballegianceapidev.blob.core.windows.net/account-deletion/v1.2.0-20220623/652ce243a92e48b1bfb7a67bd8c6e607.png", "eatenBagel": "https://bballegianceapidev.blob.core.windows.net/account-deletion/v1.2.0-20220623/ba08fa95976f49068e16b61f589ae712.png", "success": { "title": "Sorry to see you go!", "subtext": "Your account will be deleted over the next few days.<br><br>Contact us <a href=\\\"CONTACTUSURL\\\">here</a> with any questions." }, "failure": { "title": "Ooops, something went wrong!", "subtext": "Please contact guest services <a href=\\\"CONTACTUSURL\\\">here</a> to complete your account deletion." }}')

console.log('config: ', config)

// Extract common visuals for template
const { backgroundImage, bagelBrandsLogo, ebbLogo, bruLogo, nnybLogo } = config

// Adjust template visuals based on success/failure
const bagelImage = isSuccess ? config.wholeBagel : config.eatenBagel
const titleColor = isSuccess ? '#000000' : '#9a3d3a'

// Use success/failure specific messaging
const source = isSuccess ? config.success : config.failure
const title = source.title
const subtext = source.subtext.replace('CONTACTUSURL', contactUsUrl)

// Populate template with configuration values
const htmlTemplate = fs.readFileSync(path.join(__dirname, 'deleteConfirmation.html.template'), {encoding:'utf8', flag:'r'})
const substituted = htmlTemplate.replace('{{titleColor}}', titleColor)
  .replace('{{title}}', title)
  .replace('{{subtext}}', subtext)
  .replace('{{backgroundImage}}', backgroundImage)
  .replace('{{bagelBrandsLogo}}', bagelBrandsLogo)
  .replace('{{ebbLogo}}', ebbLogo)
  .replace('{{bruLogo}}', bruLogo)
  .replace('{{nnybLogo}}', nnybLogo)
  .replace('{{bagelImage}}', bagelImage)

console.log('substituted: ', substituted)
