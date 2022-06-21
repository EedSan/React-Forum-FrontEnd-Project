import {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {Box, Flex, Heading, HStack, IconButton, Text, Tooltip,} from '@chakra-ui/react';
import {ChatIcon, EditIcon} from '@chakra-ui/icons';
import ThemedBox from '../Boxes/ThemedBox';
import EditBox from '../Boxes/EditBox';
import DeleteButton from '../DeleteButton';
import {userSelector} from '../../selector/selectors';

const Post = ({id, type, subreddit, author, createdAt, title, body, numComments, user,}) => {
    const postDetailColor = 'gray.600';
    const isTextPost = type === 'text';
    const [isEditing, setIsEditing] = useState(false);
    const deletedText = '[deleted]';
    return (<ThemedBox p={4} borderRadius="md" width="100%" light="gray.400">
            <Flex>
                <Box flexGrow={1}>
                    <Text as={Link} to={`/r/${subreddit}`} fontWeight="bold">{`r/${subreddit}`}</Text>{' '}
                    <Text as="span" color={postDetailColor}>{`Posted by `}</Text>
                    <Text as="span">{author ? `u/${author}` : deletedText}</Text>
                    <Text as="span" color={postDetailColor}>{' '}
                        <Tooltip label={moment(createdAt).format('LLLL')}>{moment(createdAt).fromNow()}</Tooltip>
                    </Text>
                    <Heading as={isTextPost ? Link : 'a'} display="block"
                             to={isTextPost ? `/r/${subreddit}/comments/${id}` : null} href={isTextPost ? null : body}
                             target={isTextPost ? null : '_blank'} mt={2} mb={4} fontSize="1.5em" fontWeight="500">
                        {title || deletedText}
                    </Heading>
                    {isTextPost ? (isEditing ? (
                        <EditBox type="post" id={id} initialText={body} onClose={() => setIsEditing(false)}/>) : (
                        <Box listStylePosition="inside">
                            <text>{body}</text>
                        </Box>)) : null}
                    <Flex mt={3} alignItems="center" color={postDetailColor} fontWeight="bold">
                        <Box as={Link} to={`/r/${subreddit}/comments/${id}`} p={2} borderRadius="md">
                            <ChatIcon mr={2}/>{numComments} {numComments === 1 ? 'comment' : 'comments'}
                        </Box>
                    </Flex>
                </Box>
                {user && user.username === author && (<HStack alignItems="flex-start">
                        {isTextPost && !isEditing && (<IconButton onClick={() => setIsEditing(true)}
                                                                  backgroundColor="inherit" icon={<EditIcon/>}
                                                                  aria-label={"Editing"}/>)}
                        <DeleteButton type="post" id={id}/>
                    </HStack>)}
            </Flex>
        </ThemedBox>);
};

const mapStateToProps = (state) => ({user: userSelector(state),});

export default connect(mapStateToProps)(Post);
