import { Button, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useEffect, useState } from "react";


function ColorModeSwitch() {
  const [mounted, setMounted] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode()
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <header>
      <Button onClick={toggleColorMode} >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </header>
  )
}
export default ColorModeSwitch;
