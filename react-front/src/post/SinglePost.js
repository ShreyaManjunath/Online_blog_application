import React, { Component } from 'react';
import {singlePost,remove,like,unlike} from './apiPost';
import DefaultPost from '../images/back.jpg';
import {Link,Redirect} from 'react-router-dom';
import {isAuthenticated} from '../auth';
import Comment from './Comment'

export class SinglePost extends Component {
    state = {
        post:"",
        redirectToHome:false,
        like:false,
        redirectToSignin:false,
        comments:[],
        likes:0
    };
    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };
    componentDidMount =() =>{
        const postId = this.props.match.params.postId;
        singlePost(postId)
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({post:data,
                    likes:data.likes.length,like:this.checkLike(data.likes),comments:data.comments
                        });
            }
        });
    };
    updateComments = comments => {
        this.setState({ comments });
    };



    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    };

    deletePost = () =>{
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId,token)
        .then(data =>{
            if(data.error){
            console.log(data.error)
            }else{
                this.setState({redirectToHome:true});
            }
        });
    };
    deleteConfirm =() =>{
        let answer  =  window.confirm("Are you sure you want to delete your post?")
        if(answer){
            this.deletePost();
        }
    };
    renderPost = (post) =>{
        const posterId = post.postedBy ? `/user/${post.postedBy._id}`: "";
        const posterName = post.postedBy ? post.postedBy.name: " Unknown";
        const {like,likes}=this.state;
        return (
            // <div className="profile">
            <div className="card-body">
            <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt={post.title}
            onError={i => i .target.src = `${DefaultPost}`} style={{height:'400px',width:"100%",objectFit:"cover"}} 
            className="img-thumbnail mb-3" />

            {/* <button className="btn btn-raised btn-primary"
            onClick={this.likeToggle}>{likes} Like</button> */}

            {like ? (
                    <h3 onClick={this.likeToggle}>
                        <i
                            className="fa fa-thumbs-up "
                            style={{ padding: '10px', borderRadius: '50%' }}
                        />{' '}
                        {likes} Like
                    </h3>
                ) : (
                    <h3 onClick={this.likeToggle}>
                        <i
                            className="fa fa-thumbs-up  "
                            style={{ padding: '10px', borderRadius: '50%' }}
                        />{' '}
                        {likes} Like
                    </h3>
                )}

                
                <p className="card-text">{post.body}</p>
                <br />
                <p className="font-italic mark">
                    Posted By <Link to={`${posterId}`}>{posterName}</Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <div className="d-inline-block">
                <Link to={`/`} 
                className="btn btn-sm btn-raised btn-primary mr-5 ">
                Back to post
                
                </Link>
                {isAuthenticated().user && 
                    isAuthenticated().user._id === post.postedBy._id &&
                    <>
                    <Link to={`/post/edit/${post._id}`} 
                className="btn btn-sm btn-raised btn-warning mr-5 ">
                Update Post
                
                </Link>
                <button className="btn btn-raised btn-danger " onClick={this.deleteConfirm}>
                    Delete Post
                </button>
               </>

                     }
                
                     </div>
            </div>
            // </div>
        );
    };

    render() {
        
        const {comments,post,redirectToHome,redirectToSignin} =this.state;
        if(redirectToHome){
            return <Redirect to={'/'} />;
        }else if (redirectToSignin){
            return <Redirect to={'/signin'} />;
        }

        return (
            <div className="profile">
            <div className="container">
                <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

                {!post ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}

                <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments}/>
            </div>
             </div>
            
        );
        
    }
}

export default SinglePost;
