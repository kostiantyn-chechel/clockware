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

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(3),
        minHeight: '200px',
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
}

const BlogListItem: React.FC<IBlogListItem> = (props) => {
    const classes = useStyles();
    const { post, isEdit } = props;



    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={post.photoUrl || 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg'}
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
                    <IconButton aria-label="add to favorites">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <DeleteForeverIcon />
                    </IconButton>
                </CardActions>
                : null
            }

        </Card>
    );
};

export default BlogListItem;