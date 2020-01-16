import { createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, pink } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: lightBlue,
    type: 'light'
  }
})

module.exports = theme
