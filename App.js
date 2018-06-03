import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
class App extends Component {

  state = {
    posts: [],
    comments:[],
    input : '',
    comment:''
    }
  componentDidMount() {
    axios.get(`http://localhost:8081/post/post.php`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
  }

  componentWillMount() {
    axios.get(`http://localhost:8081/post/comment.php`)
      .then(res => {
        const comments = res.data;
        this.setState({ comments });
      })
  } 
  
  sendpost = ()=>{

    var data = new FormData();
    data.append('poster', 'Post');
    data.append('content', this.state.input);
    data.append('liked', 'Like');

    if(this.state.input === '')
    {
      alert("Please fill input !")
      return
    }

    axios.post(`http://localhost:8081/post/send.php`,  data )
      .then(res => {
        console.log(res.data)
        this.setState({posts: res.data});
        document.getElementById('postArea').value = '';
        this.setState({input:''})
      })

  }

  // addComment = (e)=>{
    
  //     var id = e.target.id
  //     var data = new FormData();
  //   data.append('comment_owner', 'Abdullah');
  //   data.append('comment', this.state.comment);
  //   data.append('liked', 0);
  //   data.append('post_id', id);

  //   axios.post(`http://localhost:8081/post/sendcomment.php`,  data )
  //     .then(res => {
  //       this.setState({comments: res.data});
  //       console.log(res.data);
  //       document.getElementById('comment_area').value = '';
  //     })
  // }

  addCommentwithEnter = (e)=>
  {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      var id = e.target.name
      var data = new FormData();
    data.append('comment_owner', 'Comment');
    data.append('comment', this.state.comment);
    data.append('liked', 'Like');
    data.append('post_id', id);
    axios.post(`http://localhost:8081/post/sendcomment.php`,  data )
      .then(res => {
        this.setState({comments: res.data});
      })
      document.getElementById('comment_area').value = '';
    }
  }
  handleCommentChange = (e) =>{
    this.setState({
      comment : e.target.value
    });
  }

    handleChange = (e) => {
      this.setState({
        input : e.target.value
      });
  }


  handleAnchor = (e) => {
    var id = e.target.id
    var name = e.target.name
    var data = new FormData();
  data.append('liked', name);
  data.append('id', id);
  axios.post(`http://localhost:8081/post/likeHandler.php`,  data )
    .then(res => {
    this.setState({posts: res.data});
    })
  }

  deletePost = (e) =>{
    var id = e.target.id
    var data = new FormData();
  data.append('id', id);
  axios.post(`http://localhost:8081/post/deletePost.php`,  data )
    .then(res => {
    this.setState({posts: res.data});
    })
  }

  deleteComment = (e) =>{
    var id = e.target.id
    var data = new FormData();
  data.append('id', id);
  axios.post(`http://localhost:8081/post/deleteComment.php`,  data )
    .then(res => {
      console.log(res.data)
    this.setState({comments: res.data});
    })
  }
  
  render() {
    
    return (
      <div className="App">
          <section>
      <div className="text">
        <img src="http://placehold.it/100/100" alt='a'/>
        <textarea id="postArea" onChange={this.handleChange} placeholder="What's in your mind" value={this.state.input}></textarea>
        <input type="submit" onClick={this.sendpost} value="post"/>
      </div>
    </section>
      
      { 
        this.state.posts.map(post =>
      <div className="container" key = {post.id}>
      <div className="post viaAction">
        <div className="topNotif"><span className="subtle"><a className="important" >Abdullah</a> commented on this.</span></div>
        <div className="content">
          <div className="head">
            <div className="profPic"></div>
            <div className="topic">
              <div className="name"><a className="important" >{post.poster}</a></div>
              <div className="postData">1 hour · Egypt</div>
            </div>
            <div className="postMenu"><i id={post.id} onClick ={this.deletePost} className="far fa-trash-alt"></i></div>
            <div className="clear"></div>
          </div>
          <div className="body">
            <div className="postContent">
              <p>
              {post.content}
              </p>
            </div>

              
            <div className="postActions"> <a id = {post.id} name = {post.liked} onClick ={this.handleAnchor}> {post.liked}</a> · <a >Comment</a></div>
            
          </div>
        </div>
        <div className="bottom">
          <div className="info">
            <div className="icon like"></div><span className="addit"> <a >2 people</a> like this</span>
          </div>
          <div className="comments">
            <div className="commentHelper">
              <div className="icon comment"></div><a >View 2 more comments</a>
            </div>
            <ul className="commentList">


            {
              this.state.comments.map(comment => 

              
              post.id===comment.post_id && 
              <li key ={comment.id} className="john">
                <div className="profPic"></div>
                <div className="commentBody">
                  <div className="message"><a className="from" >{post.id===comment.post_id && comment.comment_owner}</a>
                    
                    <div className="with">  {post.id===comment.post_id && comment.comment}</div>
                    <i id={comment.id} onClick ={this.deleteComment} className="comment far fa-trash-alt"></i>
                  </div>
                  <div className="messageData">1 hr · <a >Like</a> · <a className="likes" >
                      <div className="icon like"></div>1</a></div>
                </div>
                <div className="commentActions"><a className="icon close" >.</a></div>
                <div className="clear"></div>
              </li>
            )}
              <div className="addComment">
                <div className="input">
                  <textarea onKeyDown={this.addCommentwithEnter} id="comment_area" name={post.id} onChange={this.handleCommentChange}  placeholder="Write a comment..."></textarea><a id={post.id} className="icon camera" >.</a>
                </div>
              </div>
              <div className="clear"></div>
            </ul>
          </div>
        </div>
      </div>
    </div> 
    )}

      </div>
    );
  }
}


export default App;
