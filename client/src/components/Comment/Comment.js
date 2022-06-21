import {useState} from 'react';
import {connect} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import moment from 'moment';
import {Box, Flex, HStack, IconButton, Text, Tooltip,} from '@chakra-ui/react';
import {ChatIcon, EditIcon} from '@chakra-ui/icons';
import ThemedBox from '../Boxes/ThemedBox';
import WriteCommentBox from '../Boxes/WriteCommentBox';
import EditBox from '../Boxes/EditBox';
import DeleteButton from '../DeleteButton';
import {userSelector} from '../../selector/selectors';

const Comment = ({id, body, postId, createdAt, author, user,}) => {
    const commentDetailColor = 'gray.500';
    const [showWriteReply, setShowWriteReply] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const deletedText = '[deleted]';
    return (<ThemedBox p={4} borderRadius="md" width="100%" light="gray.300">
        <Flex>
            <Box flexGrow={1}>
                <Text as="span" isTruncated>
                    {author === null ? deletedText : author}
                </Text>{' '}
                <Text as="span" color="gray.600">
                    <Tooltip label={moment(createdAt).format('LLLL')}>
                        {moment(createdAt).fromNow()}
                    </Tooltip>
                </Text>
                {isEditing ? (<Box mt={7}>
                    <EditBox
                        type="comment"
                        id={id}
                        onClose={() => setIsEditing(false)}
                        initialText={body}
                    />
                </Box>) : (<Text>
                    {body === null ? (deletedText) : (<Box listStylePosition="inside">
                        <text>{body}</text>
                    </Box>)}
                </Text>)}
                <Flex mt={3} alignItems="center" color={commentDetailColor} fontWeight="bold">
                    <Box p={2} borderRadius="sm" _hover={{cursor: 'pointer',}}
                         onClick={() => {
                             if (user) {
                                 setShowWriteReply(!showWriteReply);
                             } else {
                                 history.push({
                                     pathname: '/login', state: {
                                         requireAuth: 'Log in to reply to comments', prevPathname: location.pathname,
                                     },
                                 });
                             }
                         }}
                    ><ChatIcon mr={2}/>
                        Reply
                    </Box>
                </Flex>
            </Box>
            {user && user.username && user.username === author && (<HStack alignItems="flex-start">
                {!isEditing && (<IconButton backgroundColor="inherit" onClick={() => setIsEditing(true)}
                                            icon={<EditIcon/>} aria-label={"Comment Button"}/>)}
                <DeleteButton type="comment" id={id}/>
            </HStack>)}
        </Flex>
        {showWriteReply && (<Box mt={2}>
            <Box m={2}>
                <Text as="span" color="gray.500">{'Reply to '}</Text>
                {author}
                <Text as="span" color="gray.500">{' as '}</Text>
                {user.username}
            </Box>
            <WriteCommentBox type="reply" postId={postId} parentCommentId={id}
                             onClose={() => setShowWriteReply(false)}/>
        </Box>)}
    </ThemedBox>);
};

const mapStateToProps = (state) => ({user: userSelector(state),});

export default connect(mapStateToProps)(Comment);
