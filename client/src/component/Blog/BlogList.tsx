import React from 'react';
import Typography from "@material-ui/core/Typography";
import {PostAttributes} from "../../../../models/post.model";
import BlogListItem from "./BlogListItem";

interface IBlogList {
    postList: PostAttributes[]
    isEdit: boolean
}

const BlogList: React.FC<IBlogList> = (props) => {
    const { postList, isEdit } = props;

    const renderPostList = () => postList.map(post => <BlogListItem post={post} isEdit={isEdit} />);

    return (
        <div>
            <Typography component="h1" variant="h4" align="center" color="textPrimary">
               --==*** список постов ***==--
            </Typography>

            {renderPostList()}

        </div>
    );
};

export default BlogList;