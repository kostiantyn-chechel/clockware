import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {PostAttributes} from "../../../../models/post.model";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {dayToString} from "../../helpers/dateTime";

const DEFAULT_PHOTO = 'https://res.cloudinary.com/kodevtm/image/upload/v1612537822/clockware/ao4a0dne0siugaud9pbm.jpg';

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(3),
        width: '80%',
        minHeight: '200px',
        minWidth: '460px',
        maxWidth: '800px',
    },
    media: {
        height: 140,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

interface IBlogListItem {
    post: PostAttributes
    isEdit: boolean
    handleDelPost: (id: number) => void
    handleEditPost: (id: number) => void
}

const BlogListItem: React.FC<IBlogListItem> = (props) => {
    const classes = useStyles();
    const { post, isEdit, handleDelPost, handleEditPost } = props;

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={post.photoURL || DEFAULT_PHOTO}
                title={`Clockware post #${post.id || 0}`}
            />
            <CardContent>
                <div className={classes.buttons}>
                    <div>#{post.id}</div>
                    <div>{dayToString(post.date)}</div>
                </div>

                <div dangerouslySetInnerHTML={{__html: post.post}} />
            </CardContent>

            {isEdit ?
                <CardActions className={classes.buttons} disableSpacing>
                    <IconButton
                        aria-label="edit"
                        onClick={() => handleEditPost(post.id!)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleDelPost(post.id!)}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </CardActions>
                : null
            }

        </Card>
    );
};

export default BlogListItem;