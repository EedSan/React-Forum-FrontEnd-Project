import {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {IconButton} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';
import {createErrorSelector} from '../selector/selectors';
import {startDeleteComment, startDeletePost} from '../CRUD-actions';

const DeleteButton = ({type = 'post', error, id, startDeletePost, startDeleteComment,}) => {
    const hasError = useRef(error);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            hasError.current = error;
        }
        return () => {
            isMounted = false;
        };
    }, [error]);

    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async () => {
        setIsLoading(true);
        if (type === 'post') {
            await startDeletePost(id);
        } else {
            await startDeleteComment(id);
        }
        if (!hasError.current) {
            setIsLoading(false);
        }
    };

    return (<IconButton onClick={handleClick} isLoading={isLoading}
                        backgroundColor="inherit" icon={<DeleteIcon/>} aria-label={"Deletion"}/>);
};

const errorSelector = createErrorSelector(['DELETE_POST', 'DELETE_COMMENT'], false);

const mapStateToProps = (state) => ({error: errorSelector(state),});

const mapDispatchToProps = (dispatch) => ({
    startDeletePost: (id) => dispatch(startDeletePost(id)),
    startDeleteComment: (id) => dispatch(startDeleteComment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
