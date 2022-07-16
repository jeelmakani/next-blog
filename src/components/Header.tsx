import React, { ReactNode } from "react";

import { Box, Button, Flex, HStack, IconButton, Link, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import ColorModeSwitch from "./ColorModeSwitch";

import style from "./Header.module.css"

export interface NavLinkProps {
  children: ReactNode;
  href: string;
  fontWeight?: string;
  fontSize?: string;
}

export interface route {
  nameKey: string;
  to: string;
}
export const routes: route[] = [
  {
    nameKey: "Home",
    to: "/  ",
  },
  {
    nameKey: "Bookmarks",
    to: "/bookmarks",
  },
  {
    nameKey: "Resources",
    to: "/resources",
  },
];


export const NavLink: React.FC<NavLinkProps> = ({ children, ...props }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('green.100', 'green.700'),
    }}
    fontSize={props.fontSize || 'md'}
    fontWeight={props.fontWeight || 'normal'}
    href={props.href}
  >
    {children}
  </Link>
);

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <div className={style.main}>
      <Box px={4} borderRadius={'md'} className={style.navmain} boxShadow={"xl"} zIndex={'tooltip'} position={'fixed'} width={'100%'} maxW={'7xl'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'} position={'relative'}>
            <Box>BLOG</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {routes.map((link) => (
                <NavLink key={link.nameKey} href={link.to} fontWeight={'bold'} fontSize={'lg'}>{link.nameKey}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'} justifyContent={"center"}
          >
            <Stack direction={'row'} spacing={7} justifyContent="center"
              alignItems="center">
              <ColorModeSwitch />
              <Text fontWeight={'bold'}>About</Text>
              <Text fontWeight={'bold'}>Contact</Text>

              <Button px={8}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }} >
                Follow
              </Button>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {routes.map((link) => (
                <NavLink key={link.nameKey} href={link.to}>{link.nameKey}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  )
};


export default Header;
