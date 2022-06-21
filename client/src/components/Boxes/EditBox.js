import {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Box, Button, FormControl, FormErrorMessage, HStack, Textarea,} from '@chakra-ui/react';
import {startEditComment, startEditPost} from '../../CRUD-actions';
import {createErrorSelector} from '../../selector/selectors';

const EditBox = ({type = 'post', id, initialText, onClose, error, startEditPost, startEditComment,}) => {
    const [value, setValue] = useState(initialText);
    const [isLoading, setIsLoading] = useState(false);
    const hasError = useRef(error);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            hasError.current = error;
        }
        return () => {
            isMounted = false;
        };
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (type === 'post') {
            await startEditPost({id, body: value});
        } else {
            await startEditComment({id, body: value});
        }
        if (!hasError.current) {
            onClose();
        } else {
            setIsLoading(false);
        }
    };

    return (<Box>
            <form onSubmit={handleSubmit}>
                <FormControl mb={2} isInvalid={!!error}>
                    <Textarea value={value} onChange={(e) => setValue(e.target.value)} rows={5}/>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <HStack>
                    <Button isDisabled={value === initialText} isLoading={isLoading}
                            size='md' height='42px' width='100px' border='2px' borderColor='green.500' type="submit">
                        save
                    </Button>
                    <Button onClick={onClose}>cancel</Button>
                </HStack>
            </form>
        </Box>);
};

const errorSelector = createErrorSelector(['EDIT_POST', 'EDIT_COMMENT']);

const mapStateToProps = (state) => ({error: errorSelector(state),});

const mapDispatchToProps = (dispatch) => ({
    startEditPost: ({id, body}) => dispatch(startEditPost({id, body})),
    startEditComment: ({id, body}) => dispatch(startEditComment({id, body})),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBox);
