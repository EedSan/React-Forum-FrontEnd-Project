import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {
    Alert,
    AlertIcon,
    Button,
    CircularProgress,
    Flex,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
} from '@chakra-ui/react';
import {ChevronDownIcon} from '@chakra-ui/icons';
import ThemedBox from './Boxes/ThemedBox';
import {createLoadingAndErrorSelector, subredditsSelector, userSelector,} from '../selector/selectors';
import {startLogout} from '../CRUD-actions/auth';
import {getSubreddits} from '../CRUD-actions/subreddits';
import LoginAndRegisterButtons from './LoginAndRegister/LoginAndRegisterButtons';

const NavigationBar = ({user, subreddits, isLoading, error, startLogout, getSubreddits,}) => {
    const location = useLocation();
    const subredditName = location.pathname.match(/r\/[^/]+/);

    useEffect(() => {
        getSubreddits()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (<ThemedBox py={1} px={[0, 0, 10, 10]} display="flex" justifyContent="flex-start" alignItems="center" mb={5}>
        <Heading ml={[2, 4]} display={user ? 'block' : ['none', 'block']}
                 fontSize={['1.5rem', '2.5rem']}></Heading>
        <HStack spacing={3}>
            <Button as={Link} to="/" size='md' variantColor="blue" variant='outline'>Forum</Button>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>{subredditName || 'Communities'}</MenuButton>
                <MenuList>
                    <MenuItem as={Link} to="/">Home</MenuItem>
                    <MenuDivider/>
                    {subreddits.map(({name}) => (
                        <MenuItem key={name} as={Link} to={`/r/${name}`}>{`r/${name}`}</MenuItem>))}
                    {error && (<Alert status="error"><AlertIcon/>Error fetching subreddits</Alert>)}
                    {isLoading && (<Flex justifyContent="center"><CircularProgress isIndeterminate/></Flex>)}
                </MenuList>
            </Menu>
            {user && (<Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>Create</MenuButton>
                <MenuList>
                    <MenuItem as={Link} to="/submit">Create Post</MenuItem>
                    <MenuItem as={Link} to="/subreddits/create">Create subreddit</MenuItem>
                </MenuList>
            </Menu>)}
        </HStack>
        <Spacer/>

        {user ? (<Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>{user.username}</MenuButton>
            <MenuList><MenuItem onClick={async () => {
                await startLogout();
            }}>Logout</MenuItem></MenuList>
        </Menu>) : (<LoginAndRegisterButtons/>)}
    </ThemedBox>);
};

const {loadingSelector, errorSelector} = createLoadingAndErrorSelector(['GET_SUBREDDITS',]);

const mapStateToProps = (state) => ({
    isLoading: loadingSelector(state),
    error: errorSelector(state),
    subreddits: subredditsSelector(state),
    user: userSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()), getSubreddits: () => dispatch(getSubreddits()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
