import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TableLine from '../TableLine';
import DISPLAY_POSTS from '../../../graphql/PostForDisplay.graphql'
import NEW_POST from '../../../graphql/AddPost.graphql'
import POSTS_SUB from '../../../graphql/PostsSub.graphql'
class InputForm_ extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentWillMount(){
        this.props.data.subscribeToMore({
        document: POSTS_SUB,
        updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) {
                return prev;
            }
            const newPosts = subscriptionData.data.postChanged;
            console.log(subscriptionData.data);
            return Object.assign({}, prev, {
                posts: newPosts
            });

        }
    })
  }

  handleSubmit(e) {
    let post = e.target.hf_email.value;
    let views = e.target.hf_password.value;
    e.preventDefault();

    if (post && views) {
        e.target.hf_email.value = '';
        e.target.hf_password.value = '';
        // this.props.mutate({
        //     variables: { content: post, views: 12 }
        // });
        this.props.newPostMutation({
            variables: { content: post, views: views}
        });

    }}



  renderTableLine(){
    if(this.props.data && this.props.data.posts && this.props.data.posts instanceof Array){
      return this.props.data.posts.map(function(post) {
        return <TableLine key={post.id} post={post} />; })
    }
    return <div/>
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12">
          <div className="card">
              <div className="card-header">
                <strong>Horizontal</strong> Form
              </div>
              <div className="card-block">
                <form action="" className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                    <div className="col-md-9">
                      <input type="text" id="hf-email" name="hf_email" className="form-control" placeholder="Enter Email.."/>
                      <span className="help-block">Please enter your email</span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Password</label>
                    <div className="col-md-9">
                      <input type="text" id="hf-password" name="hf_password" className="form-control" placeholder="Enter Password.."/>
                      <span className="help-block">Please enter your password</span>
                    </div>
                  </div>
                  <div className="card-footer">
                <button type="submit" className="btn btn-sm btn-primary"><i className="fa fa-dot-circle-o"></i> Submit</button>
                <button type="reset" className="btn btn-sm btn-danger"><i className="fa fa-ban"></i> Reset</button>
              </div>
                </form>
              </div>

            </div>
          </div>
        </div>
        <div className="card">

              <div className="card-header">
                <i className="fa fa-align-justify"></i> Striped Table
              </div>

              <div className="card-block">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Content</th>
                      <th>Views</th>
                      
                      <th>Status</th>
                      <th>Actions</th>  
          
                    </tr>
                  </thead>
                  <tbody>
                  {this.renderTableLine()}
                  </tbody>
                </table>
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">4</a></li>
                  <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
              </div>
              </div>
              <Button color="danger" onClick={this.toggleDelete}>Danger modal</Button>

      </div>
    )
  }
}

export default InputForm = compose(
  graphql(DISPLAY_POSTS),
  graphql(NEW_POST, { name: 'newPostMutation' })
)(InputForm_);