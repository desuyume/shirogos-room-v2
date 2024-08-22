const { prettier } = require('@desuyume/prettier')

/** @type {import('prettier').Config} */
module.exports = {
  ...prettier,
  plugins: ['prettier-plugin-tailwindcss']
}
