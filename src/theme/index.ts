import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// Global style overrides
import styles from "./styles"

// Foundational style overrides
import config from './foundation/config'
import fonts from './foundation/fonts'
import colors from './foundation/colors'
import shadows from './foundation/shadow'

// Component style overrides


const customTheme = {
  styles,
  fonts,
  config,
  colors,
  shadows,
  components: {

  }
}

export default extendTheme(customTheme)
