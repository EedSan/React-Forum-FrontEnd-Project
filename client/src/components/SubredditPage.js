import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, Input, Stack, Textarea,} from '@chakra-ui/react';
import {createLoadingAndErrorSelector} from '../selector/selectors';
import {createSubreddit} from '../CRUD-actions/subreddits';

class SubredditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', description: '',};
    }

    isNameValid = (name) => { // eslint-disable-next-line
        const nameRegex = new RegExp('^[a-z\d]+$', 'i');
        return nameRegex.test(name);
    };

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const {name, description} = this.state;
            const {createSubreddit, history} = this.props;
            const {name: subredditName} = await createSubreddit(name, description);
            history.push(`/r/${subredditName}`);
        } catch (e) {
        }
    };

    render() {
        const {name, description} = this.state;
        const {isLoading, error} = this.props;
        return (<Box w={['100%', '90%', '80%', '70%']} m="auto">
            {error && (<Alert status="error" mb={4}><AlertIcon/>{error}</Alert>)}
            <form onSubmit={this.handleSubmit}>
                <Stack>
                    <FormControl isInvalid={name.length > 0 && !this.isNameValid(name)}>
                        <Input value={name} onChange={(e) => this.setState({name: e.target.value})}
                               variant="filled" placeholder="subreddit name" isRequired/>
                        <FormErrorMessage> Name can only contain alphanumeric characters </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <Textarea value={description} onChange={(e) => this.setState({description: e.target.value})}
                                  variant="filled" rows={5} placeholder="description (optional)"/>
                    </FormControl>
                    <Button isLoading={isLoading} type="submit" isDisabled={!this.isNameValid(name)}
                            size='md' height='48px' width='200px' border='2px' borderColor='green.500'>
                        create subreddit
                    </Button>
                </Stack>
            </form>
        </Box>);
    }
}

const {loadingSelector, errorSelector} = createLoadingAndErrorSelector(['CREATE_SUBREDDIT'], false);

const mapStateToProps = (state) => ({isLoading: loadingSelector(state), error: errorSelector(state),});

const mapDispatchToProps = (dispatch) => ({
    createSubreddit: (name, description) => dispatch(createSubreddit(name, description)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubredditPage));
