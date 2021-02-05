import React, {useEffect, useState} from 'react';
import BlogList from "../../component/Blog/BlogList";
import { PostAttributes } from "../../../../models/post.model";
import { getAuthServerRequest } from "../../helpers/axios/axiosClockwareAPI";

const Blog: React.FC = (props) => {

    const [postList, setPostList] = useState<PostAttributes[]>([]);

    useEffect(() => {
        getAuthServerRequest('/post')
            .then(post => setPostList(post as PostAttributes[]))
    }, []);

    return (
        <BlogList
            postList={postList}
            isEdit={false}
            handleDelPost={() => {}}
        />
    );
};

export default Blog;