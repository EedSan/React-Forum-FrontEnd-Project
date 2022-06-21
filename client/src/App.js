import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Box, ChakraProvider, Flex} from '@chakra-ui/react';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import NavigationBar from './components/NavigationBar';
import CommentsPage from './components/Comment/CommentsPage';
import LoginPage from './components/LoginAndRegister/LoginPage';
import RegisterPage from './components/LoginAndRegister/RegisterPage';
import CreatePostPage from './components/Post/CreatePostPage';
import PostList from './components/Post/PostList';
import ThemedBox from './components/Boxes/ThemedBox';
import CreateSubredditPage from './components/CreateSubredditPage';

function App() {
    return (<ChakraProvider>
        <Router>
            <ThemedBox minHeight="100vh" light="white.20">
                <NavigationBar/>
                <Flex justifyContent="center">
                    <Box width={['95%', '80%', '70%', '60%']} mb={10}>
                        <Switch>
                            <Route path="/r/:subreddit/comments/:id"> <CommentsPage/> </Route>
                            <PublicRoute path="/login"> <LoginPage/> </PublicRoute>
                            <PublicRoute path="/register"> <RegisterPage/> </PublicRoute>
                            <PrivateRoute path="/submit"> <CreatePostPage/> </PrivateRoute>
                            <PrivateRoute path="/subreddits/create"> <CreateSubredditPage/> </PrivateRoute>
                            <Route path="/r/:subreddit"> <PostList/> </Route>
                            <Route path="/"> <PostList/> </Route>
                        </Switch>
                    </Box>
                </Flex>
            </ThemedBox>
        </Router>
    </ChakraProvider>);
}

export default App;
