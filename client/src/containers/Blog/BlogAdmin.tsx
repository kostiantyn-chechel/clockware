import React, { useState, useEffect } from 'react';
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import ListMenu from "../Admin/ListMenu/ListMenu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { RootStateType } from "../../store/reducers/rootReducer";
import { setOpenMenu } from "../../store/actions/appAction";
import { connect, ConnectedProps } from "react-redux";
import { Editor } from '@tinymce/tinymce-react';
import Typography from "@material-ui/core/Typography";
import BlogList from "../../component/Blog/BlogList";
import Button from '@material-ui/core/Button';
import {getAuthServerRequest, postAuthServerRequest} from "../../helpers/axios/axiosClockwareAPI";
import { today } from "../../helpers/dateTime";
import { PostAttributes } from "../../../../models/post.model";
import BlogListItem from "../../component/Blog/BlogListItem";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    block: {
        minWidth: '620px',
    },
    buttonBlock: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(2),
    }
}));

const POST_START_TEXT: string = '<p>Введите текст поста</p>';

const BlogAdmin: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const [postText, setPostText] = useState<string>(POST_START_TEXT);
    const [postList, setPostList] = useState<PostAttributes[]>([]);

    useEffect(() => {
        getAuthServerRequest('/post')
            .then(post => setPostList(post as PostAttributes[]))
    }, []);

    const handleDrawerClose = () => props.setMenuOpen(false);

    const handleSavePost = async (event: React.MouseEvent) => {
        event.preventDefault();
        console.log('Save post', postText);

        await postAuthServerRequest('/post/',{
            date: today(),
            post: postText,
        }).then(post => {
            setPostList(post);
            // console.log('post from Server:', post)
        })
    };


    const handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content);
        setPostText(content);
    };

    return (
        <Container className={classes.block} component="main" maxWidth="xl">
            <Typography component="h1" variant="h4" align="center" color="textPrimary">
                Admin redactor
            </Typography>

            <Editor
                apiKey="cuui8tjwlt3igv4mwk97wdeunoslkbseasgrdnoehyntvpmn"
                // initialValue="<p>Введите текст поста</p>"
                value= {postText}
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        // eslint-disable-next-line
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
                    language:"ru",
                }}
                // outputFormat='text'
                onEditorChange={handleEditorChange}
            />

            <div className={classes.buttonBlock}>
                <Button
                    className={classes.button}
                    variant="contained"
                    color='primary'
                    onClick={handleSavePost}
                >
                    картинка
                </Button>

                <Button
                    className={classes.button}
                    variant="contained"
                    color='primary'
                    onClick={handleSavePost}
                >
                    Сохранить
                </Button>

            </div>

            {/*<BlogListItem*/}
            {/*    post={[{*/}
            {/*        post: postList,*/}
            {/*        date: today(),*/}
            {/*    }]}*/}
            {/*    isEdit={false}*/}
            {/*/>*/}


            <BlogList
                postList={postList}
                isEdit={true}
            />

            <div className={classes.main}>
                <Drawer
                    anchor={"right"}
                    open={props.openMenu}
                    onClose={handleDrawerClose}
                >
                    <ListMenu
                        handleDrawerClose={handleDrawerClose}
                    />
                </Drawer>
            </div>
        </Container>
    );
};

function mapStateToProps(state: RootStateType) {
    return {
        openMenu: state.app.openMenu,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setMenuOpen: (open: boolean) => dispatch(setOpenMenu(open)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(BlogAdmin);

type PropsFromRedux = ConnectedProps<typeof connector>