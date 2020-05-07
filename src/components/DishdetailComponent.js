import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);





class CommentForm extends Component {
    constructor(props){
        super (props);
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        })
    }

    render() {
        return (
            <>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg m-1"></span> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => {
                        this.handleSubmit(values);
                    }}>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" name="rating" className="form-control mt-1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        <Label htmlFor="author">Your Name</Label>
                        <Control.text model=".author" name="author" className="form-control mt-1" validators={{
                            required,
                            minLength: minLength(3),
                            maxLength: maxLength(15),
                        }} />
                        <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            messages={{
                                required: " Required",
                                minLength: " Greater than 2 number",
                                maxLength: " Must be 15 numbers or less",

                            }}
                        />
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea name="comment" model=".comment" className="form-control m-1" rows="6" />
                        <Button type="submit" color="primary" className="mt-3">
                            Submit
                                </Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        )

    }

}


function RenderDish({ dish }) {
    
    return (
        <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle> {dish.name} </CardTitle>
                <CardText>
                    {dish.description}
                </CardText>
            </CardBody>
        </Card>
    )
    
}

function RenderComments({ comments, postComment, dishId }){

    const allComments = comments.map((eachComment) => {
        return (
    
            <li key={eachComment.id}>
                <p>{eachComment.comment}</p>
                <p>-- {eachComment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(eachComment.date)))}</p>
            </li>
        
        )
    });

    return(
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {allComments}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    )
    
}

const Dishdetail = (props) =>{   

    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }

    else if(props.errMess){
        return (
          <div className="container">
            <div className="row">
              <h4>{props.errMess}</h4>
            </div>
          </div>
        );
    }

    else if(props.selectedDish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.selectedDish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.selectedDish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.selectedDish.id} />                        
                    </div>
                </div>                
            </div>   
        )
    }
    else{
        return(
            <div></div>
        )
    }
}

    


export default Dishdetail;