import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import { listPeople } from '../graphql/queries';

import "./ListPerson.css"
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";



const ListPerson = () => {
    const [listPerson, setListPerson] = useState([]);

    useEffect(() => {
        const fetchListPerson = async () => {
            try {
                const { data } = await API.graphql({
                    query: listPeople
                });
                setListPerson(data.listPeople.items);
            } catch (error) {
                console.log(error);
            }

            // // Get a specific item
            // const onePerson = await API.graphql({
            //     query: getPerson,
            //     variables: { id: 'YOUR_RECORD_ID' }
            // });
        }

        fetchListPerson();
    }, [])

    return (
        <Container>
            <h1>All Person</h1>
            <hr></hr>
            <Row>
                {listPerson.map((person) => {
                    return (
                        <Col md={3} key={person.id}>
                            <Card className="mb-4">
                                <Card.Img className="card-image" variant="top" src={`https://${person.profilePicture.bucket}.s3.${person.profilePicture.region}.amazonaws.com/public/${person.profilePicture.key}`} />
                                <Card.Body>
                                    <Card.Title>{person.firstName} {person.lastName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{person.email}</Card.Subtitle>
                                    <Card.Text>
                                        {person.gender}
                                    </Card.Text>
                                    <Card.Text>
                                        {person.city}
                                    </Card.Text>
                                    <Card.Text>
                                        {person.zip}
                                    </Card.Text>
                                    <Card.Text>
                                        {person.isBoxChecked ? "Box Checked" : "Box Not Checked"}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default ListPerson;
