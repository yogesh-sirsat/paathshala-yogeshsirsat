import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import awsmobile from '../aws-exports';
import { createPerson } from '../graphql/mutations';

import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const initPerson = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  city: "",
  zip: "",
  profilePicture: "",
  isBoxChecked: false
}

function CreatePerson() {
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    ...initPerson
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPerson = {
      ...person,
      zip: parseInt(person.zip),
      id: uuid()
    }
    console.log(newPerson);

    // Upload the profile picture to S3
    if (newPerson.profilePicture) {
      const fileName = `${newPerson.id}.jpg`;

      Storage.configure({region: 'ap-south-1'});
      const { key } = await Storage.put(fileName, newPerson.profilePicture, {contentType: 'image/jpg'});

      newPerson.profilePicture = {
        bucket: awsmobile.aws_user_files_s3_bucket,
        region: awsmobile.aws_user_files_s3_bucket_region,
        key
      };
    }
    console.log(newPerson);
    // Create a new person in the database
    await API.graphql(graphqlOperation(createPerson, {input: newPerson}));

    e.target.reset();
    setPerson({...initPerson});
  }

  const onChangeProfilePicture = (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setPerson({...person, profilePicture: file});
  }

  const navigateListPerson = () => {
    navigate('/list-person');
  }

  return (
    <Form onSubmit={handleSubmit}>
        <h1 className="center">Fill The Below Form</h1>
        <Stack gap={1} className="col-md-5 mx-auto">
        <hr />
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your first name" onChange={(e) => setPerson({...person, firstName: e.target.value})} required/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your last name" onChange={(e) => setPerson({...person, lastName: e.target.value})} required/>
        </Form.Group>
      </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setPerson({...person, email: e.target.value})} required/>
        </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridGender">
          <Form.Label>Gender</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => setPerson({...person, gender: e.target.value})}>
            <option></option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter city" onChange={(e) => setPerson({...person, city: e.target.value})} required/>
        </Form.Group>


        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="number" placeholder="Enter Zipcode/Pincode" onChange={(e) => setPerson({...person, zip: e.target.value})} required/>
        </Form.Group>
      </Row>


      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type="file" onChange={onChangeProfilePicture} required/>
      </Form.Group>
      
      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" onChange={(e) => setPerson({...person, isBoxChecked: e.target.checked})}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="secondary" onClick={navigateListPerson}>View All Person</Button>
        </Stack>
    </Form>
  );
}

export default CreatePerson;