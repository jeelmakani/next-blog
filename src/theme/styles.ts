
import { mode,StyleFunctionProps } from "@chakra-ui/theme-tools";
const dark = "#000000";
const light = "#ffffff";
const styles = {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode(light, dark)(props)
      }
    })
  } ;

export default styles;
