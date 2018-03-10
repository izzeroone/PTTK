import React, { Component } from 'react';
import DELETE_POST from '../../../graphql/DeletePost.graphql'
import {compose, graphql} from "react-apollo";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class TableLine_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteWarning: false,
      allowDelete: false
    };
    this.toggleDeleteWarning= this.toggleDeleteWarning.bind(this);
    this.toggleAllowDelete = this.toggleAllowDelete.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }
  toggleDeleteWarning() {
    this.setState({
      deleteWarning: !this.state.deleteWarning
    });
  }
  
  toggleAllowDelete() {
    this.setState({
      allowDelete: !this.state.allowDelete
    })
  }


    deletePost(e){
      this.toggleDeleteWarning();
        this.props.deletePostMutation({
            variables: {id: this.props.post.id}
        });
    }

  render() {
    return (
      <tr>
      <Modal isOpen={this.state.deleteWarning} toggle={this.toggleDeleteWarning} className={'modal-danger ' + this.props.className}>
          <ModalHeader toggle={this.toggleDeleteWarning}>Modal title</ModalHeader>
          <ModalBody>
            Link summon. Transcode talker.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deletePost}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleDeleteWarning}>Cancel</Button>
          </ModalFooter>
        </Modal>
      <td>{this.props.post.content}</td>
      <td>{this.props.post.views}</td>
      <td>
        <span className="badge badge-success">Active</span>
      </td>
      <td><button type="button" className="btn btn-danger" id={this.props.post.id} onClick={this.toggleDeleteWarning}><i className="fa icon-close"></i>&nbsp; Danger</button></td>
      </tr>
    )
  }
}

export default TableLine = compose(
    graphql(DELETE_POST, {name: 'deletePostMutation'})
)(TableLine_);