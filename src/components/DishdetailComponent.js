import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';



    

    function RenderDish({ dish }) {
        
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            )
            
    }

    function RenderComments({ comments }){

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
            </div>
        )
        
    }

    const Dishdetail = (props) =>{    
        
        if(props.selectedDish != null){
            return(
                <div className="row container">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.selectedDish} />
                    </div>
                    <div className="col-12 col-md-5 m-4">
                        <RenderComments comments={props.selectedDish.comments}/>
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