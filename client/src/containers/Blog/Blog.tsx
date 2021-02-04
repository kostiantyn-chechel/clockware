import React from 'react';
import Typography from "@material-ui/core/Typography";
import BlogList from "../../component/Blog/BlogList";

const Blog: React.FC = (props) => {

    return (
        <div>

            <Typography component="h1" variant="h4" align="center" color="textPrimary">
                BLOG
            </Typography>

            {/*<BlogList />*/}
        </div>
    );
};

export default Blog;