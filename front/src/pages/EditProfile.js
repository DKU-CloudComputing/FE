import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlankAuth from '../layout/BlankAuth';
import { Card, Form, Button } from 'react-bootstrap';
import AuthUser from '../service/AuthUser';

function EditProfile() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // form valid
    setValidated(true);
    const $form = event.currentTarget;
    if (!$form.checkValidity()) {
      return;
    }

    // edit user
    AuthUser.editUser(event.target.name.value, event.target.email.value, event.target.password.value)
    .then(
      () => {
        console.log("회원정보 수정 성공");
        navigate('/');
        window.location.reload();
      },
      (error) => {
        console.log("회원정보 수정 실패");
        const resMessage =
          error.response && error.response.data && error.response.data.message;
        const errMessage = error.message || error.toString();
        alert(resMessage || errMessage);
        setValidated(false);
      }
    );
  };

  return (
    <>
      <BlankAuth>
        <Card className="shadow-lg">
          <Card.Body className="p-5">
            <Card.Title className="fs-3 fw-bold mb-4">Edit Profile</Card.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  minLength={3}
                  maxLength={20}
                  required
                  //defaultValue={'userTest'}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  required
                  //defaultValue={'test4321@gmail.com'}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  minLength={3}
                  maxLength={20}
                  required
                  //defaultValue={'test1234'}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password_confirm"
                  minLength={3}
                  maxLength={20}
                  required
                  //defaultValue={'test1234'}
                />
              </Form.Group>
              <div className="d-grid mt-5">
                <Button variant="secondary" size="lg" type="submit">
                  Edit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </BlankAuth>
    </>
  );
}

export default EditProfile;
