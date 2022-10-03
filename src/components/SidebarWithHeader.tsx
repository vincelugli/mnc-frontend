import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAccessTokenBackend, getUser } from '../discord/client';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Center,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiUsers,
    FiZap,
    FiShield,
    FiLogIn,
    FiCalendar,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useNavigate } from 'react-router-dom';
import {DISCORD_BASE, DISCORD_OAUTH} from '../discord/api';

const CLIENT_ID = 'TODO: Add application client_id';
const SCOPES = ['identify'].join('%20');
const REDIRECT = encodeURIComponent('https://mnc.pages.dev/');
const oauth2LoginUrl = `${DISCORD_BASE+DISCORD_OAUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=code&scope=${SCOPES}`;

interface LinkItemProps {
    name: string;
    icon: IconType;
    route: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, route: '/' },
    { name: 'Player Overview', icon: FiUsers, route: '/playerOverview' },
    { name: 'Champion Overview', icon: FiShield, route: '/championOverview' },
    { name: 'Match History', icon: FiCalendar, route: '/matchHistory' },
    { name: 'Matchmaker', icon: FiZap, route: '/matchmaker' },
];

export default function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [username, setUsername] = useState('');
    const [fetched, setFetched] = useState<boolean>(false);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        async function getClientInformation() {
            if (!searchParams.has('code') || fetched) return;

            setFetched(true)
            const response = await getAccessTokenBackend(searchParams.get('code')!)

            if (response.error) return;
            const user = await getUser(response.access_token, response.token_type);
            setUsername(user.username);
        }
        if (!fetched) getClientInformation();
    });

    return (
        <Box minH='100vh'>
            <SidebarContent
                onClose={() => onClose}
                username={username}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size='full'
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} username={username} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p='4'>
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    username: string;
}

const SidebarContent = ({ onClose, username, ...rest }: SidebarProps) => {
    return (
        <Box
            transition='3s ease'
            bg={useColorModeValue('white', 'gray.900')}
            borderRight='1px'
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos='fixed'
            h='full'
            {...rest}
        >
            <Flex
                h='20'
                alignItems='center'
                mx='8'
                justifyContent='space-between'
            >
                <Text
                    fontSize='2xl'
                    fontFamily='monospace'
                    fontWeight='bold'
                    fontStyle='italic'
                    textTransform='uppercase'
                >
                    MNC Hub
                </Text>
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    icon={link.icon}
                    route={link.route}
                    onClose={onClose}
                >
                    {link.name}
                </NavItem>
            ))}
            <Link
                // TODO: add profile
                href={username ? '#' : oauth2LoginUrl}
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
            >
                <Flex
                    align='center'
                    p='4'
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    cursor='pointer'
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white',
                    }}
                    {...rest}
                >
                <Icon
                    mr='4'
                    fontSize='16'
                    _groupHover={{
                        color: 'white',
                    }}
                    as={FiLogIn}
                />
                    {username ? username : 'LOGIN'}
                </Flex>
            </Link>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    route: string;
    onClose: () => void;
}
const NavItem = ({ icon, children, route, onClose, ...rest }: NavItemProps) => {
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate(route);
        onClose();
    }, [route, navigate]);

    return (
        <Link
            href='#'
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align='center'
                p='4'
                mx='4'
                borderRadius='lg'
                role='group'
                cursor='pointer'
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                onClick={onClick}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr='4'
                        fontSize='16'
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height='20'
            alignItems='center'
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth='1px'
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant='outline'
                aria-label='open menu'
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize='2xl'
                fontWeight='bold'
            >
                MNC Hub
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">No User Signed In</Text>
                  <Text fontSize="xs" color="gray.600">
                    Sign In
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex> */}
            </HStack>
        </Flex>
    );
};
