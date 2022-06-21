import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
    Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, Input, Select, Stack, Textarea,
} from '@chakra-ui/react';
import {createLoadingAndErrorSelector, subredditsSelector,} from '../../selector/selectors';
import {getSubreddits} from '../../CRUD-actions/subreddits';
import {submitPost} from '../../CRUD-actions/post';

class PostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {postType: 'text', title: '', body: '', subreddit: '',};
    }

    componentDidMount() {
        const {getSubreddits} = this.props;
        getSubreddits();
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const {postType, title, body, subreddit} = this.state;
            const {submitPost, history} = this.props;
            const {id} = await submitPost({type: postType, title, body: body, subreddit,});
            history.push(`/r/${subreddit}/comments/${id}`);
        } catch (err) {
        }
    };

    render() {
        const {title, body, subreddit} = this.state;
        const {srIsLoading, srError, submitIsLoading, submitError, subreddits,} = this.props;
        return (<Box w={['100%', '90%', '80%', '70%']} m="auto">
            {submitError && (<Alert status="error" mb={4}><AlertIcon/>{submitError}</Alert>)}
            <form onSubmit={this.handleSubmit}>
                <Stack spacing={3}>
                    <FormControl>
                        <Input value={title} onChange={(e) => this.setState({title: e.target.value})}
                               type="text" variant="filled" placeholder="title" isRequired/>
                    </FormControl>
                    <FormControl>
                        <Textarea value={body} onChange={(e) => this.setState({body: e.target.value})}
                                  variant="filled" placeholder="text" rows={10}/>
                    </FormControl>
                    <FormControl isInvalid={srError}>
                        <Select value={subreddit} onChange={(e) => this.setState({subreddit: e.target.value})}
                                variant="filled" placeholder={srIsLoading ? 'loading...' : 'choose a subreddit'}
                                isRequired>
                            {subreddits.map(({name}) => (<option key={name} value={name}>{name}</option>))}
                        </Select>
                        <FormErrorMessage>Could not load subreddits</FormErrorMessage>
                    </FormControl>
                    <Button size='md' height='48px' width='200px' border='2px'
                            borderColor='green.500' type="submit"
                            isLoading={srIsLoading || submitIsLoading || null}>
                        Submit
                    </Button>
                </Stack>
            </form>
        </Box>);
    }
}

const {
    loadingSelector: srLoadingSelector, errorSelector: srErrorSelector,
} = createLoadingAndErrorSelector(['GET_SUBREDDITS']);

const {
    loadingSelector: submitLoadingSelector, errorSelector: submitErrorSelector,
} = createLoadingAndErrorSelector(['SUBMIT_POST'], false);

const mapStateToProps = (state) => ({
    srIsLoading: srLoadingSelector(state),
    srError: srErrorSelector(state),
    submitIsLoading: submitLoadingSelector(state),
    submitError: submitErrorSelector(state),
    subreddits: subredditsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    getSubreddits: () => dispatch(getSubreddits()), submitPost: (postDetails) => dispatch(submitPost(postDetails)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage));
