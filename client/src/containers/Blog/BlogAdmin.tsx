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
import {
    deleteAuthServerRequest,
    getAuthServerRequest,
    postAuthServerRequest
} from "../../helpers/axios/axiosClockwareAPI";
import { today } from "../../helpers/dateTime";
import { PostAttributes } from "../../../../models/post.model";
import BlogListItem from "../../component/Blog/BlogListItem";
import {postPhotoCloudinary} from "../../helpers/axios/axiosCloudinary";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '500px',
        marginTop: theme.spacing(2),
    },
    editContainer: {
        backgroundColor: 'rgba(120,151,137,0.55)',
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    editor: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    postItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    buttonBlock: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
    label: {
        cursor: 'pointer',
    },
}));

const FILE_SIZE_LIMIT = 2097152;
const POST_START_TEXT: string = '<p>Введите текст поста</p>';

const BlogAdmin: React.FC<PropsFromRedux> = (props) => {
    const classes = useStyles();

    const [postText, setPostText] = useState<string>(POST_START_TEXT);
    const [photoURL, setPhotoURL] = useState<string>('');
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
            photoURL: photoURL,
        }).then(post => {
            setPostList(post);
            setPhotoURL('');
            setPostText(POST_START_TEXT);
        })
    };

    const handleEditorChange = (content, editor) => {
        setPostText(content);
    };

    const handleDelPost = (id: number) => {
        deleteAuthServerRequest(`/post/${id}`).then(post => setPostList(post))
    };

    const loadPhoto =  (event) => {
        event.preventDefault();
        // @ts-ignore
        let file = document.getElementById('load-file').files[0];

        if (file) {
            if (file.size > FILE_SIZE_LIMIT) {
            } else {
                postPhotoCloudinary(file)
                    .then(url =>{
                        setPhotoURL(url);
                        console.log(url);
                    })
                    .catch(() => {
                        setPhotoURL('');
                    });
            }
        }
    };

    const activePost = (): PostAttributes => ({
        id: 0,
        date: today(),
        post: postText,
        photoURL: photoURL,
    });

    return (
        <React.Fragment>

            <Container className={classes.editContainer} component="main" maxWidth="xl">

                <Typography component="h1" variant="h4" align="center" color="textPrimary">
                    РЕДАКТОР БЛОГА
                </Typography>


                <Editor
                    apiKey="cuui8tjwlt3igv4mwk97wdeunoslkbseasgrdnoehyntvpmn"
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
                    onEditorChange={handleEditorChange}
                />
                <div className={classes.buttonBlock}>
                    <input accept="image/*"  id="load-file" type="file"
                           className={classes.input}
                           onChange={loadPhoto}
                    />

                    <Button
                        className={classes.button}
                        variant="contained"
                        color='primary'
                        // onClick={loadPhoto}
                    >
                        <label htmlFor="load-file" className={classes.label}>
                            картинка
                        </label>
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

                <div className={classes.postItem}>
                    <BlogListItem
                        post={activePost()}
                        isEdit={false}
                        handleDelPost={() => {}}
                    />
                </div>

            </Container>

            <BlogList
                postList={postList}
                isEdit={true}
                handleDelPost={handleDelPost}
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
        </React.Fragment>
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