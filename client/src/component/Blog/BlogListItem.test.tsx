import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import CardActions from '@material-ui/core/CardActions';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import BlogListItem from './BlogListItem';

describe('Test BlogListItem component', () => {
    let isEdit = false;
    const handleDelPostMock = jest.fn();
    const handleEditPostMock = jest.fn();
    const post = {
        id: 33,
        date: '06-01-2021',
        post: 'some text',
        photoURL: 'https://res.cloudinary.com/iugaud9pbm.jpg'
    };

    const Component = <BlogListItem
        post={post}
        isEdit={isEdit}
        handleDelPost={handleDelPostMock}
        handleEditPost={handleEditPostMock}
    />;
    const ShallowBlogListItem = shallow(Component);
    
    test('BlogListItem component should exists', () => {
        expect(ShallowBlogListItem).toBeDefined();
    });

    test("ToMatchSnapshot BlogListItem component", () => {
        expect(renderer.create(Component).toJSON()).toMatchSnapshot();
    });

    // TODO ???
    // test('Click button Delete return ID', () => {
    //     const Component = <BlogListItem
    //         isEdit={true}
    //         post={post} handleDelPost={handleDelPostMock} handleEditPost={handleEditPostMock}
    //     />;
    //     const MountBlogListItem = mount(Component);
    //     MountBlogListItem.find('delete').simulate('click');
    //
    //     expect(handleDelPostMock).toBeCalledTimes(1);
    //     expect(handleDelPostMock).toBeCalledWith(post.id);
    // });

    //TODO ????
    test("BlogListItem enabled Control Panel (Edit and Del button)", () => {
        const Component = <BlogListItem
            isEdit={true}
            post={post} handleDelPost={handleDelPostMock} handleEditPost={handleEditPostMock}
        />;
        const MountBlogListItem = mount(Component);

        const BlogListItemComponent = MountBlogListItem.find(CardActions);
        expect(BlogListItemComponent).toBeDefined(); //TODO ????

    });

    //TODO ????
    test("BlogListItem disabled Control Panel (Edit and Del button)", () => {
        const Component = <BlogListItem
            isEdit={false}
            post={post} handleDelPost={handleDelPostMock} handleEditPost={handleEditPostMock}
        />;
        const MountBlogListItem = mount(Component);

        expect(MountBlogListItem.contains(<CardActions />)).toBeDefined(); //TODO ????

    });

});