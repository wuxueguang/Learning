module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        '>0.25%',
        'not ie 11',
        'not op_mini all'
      ]
    })
  ]
}