import React from 'react';
import { PostAttributes } from "../../../../models/post.model";
import BlogListItem from "./BlogListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    block: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

interface IBlogList {
    postList: PostAttributes[]
    isEdit: boolean
    handleDelPost(id: number): void
    handleEditPost(id: number): void
}

const BlogList: React.FC<IBlogList> = (props) => {
    const classes = useStyles();
    const { postList, isEdit, handleDelPost, handleEditPost } = props;

    return (
        <Container className={classes.container} component="main" maxWidth="xl">

            <Typography component="h1" variant="h4" align="center" color="textPrimary">
                CLOCKWARE БЛОГ
            </Typography>

            <div className={classes.block}>
                {postList.map(post => <BlogListItem
                                        key={post.id + 'post'}
                                        post={post}
                                        isEdit={isEdit}
                                        handleDelPost={handleDelPost}
                                        handleEditPost={handleEditPost}
                                    />)}
            </div>

        </Container>
    );
};

export default BlogList;