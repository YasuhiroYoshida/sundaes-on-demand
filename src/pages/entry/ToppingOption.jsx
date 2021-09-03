import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const changeHandler = (event) => {
    updateItemCount(name, Number(event.target.checked));
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
        style={{ width: '75%' }}
      />
      <Form>
        <Form.Group
          controlId={`${name}-count`}
          as={Row}
          style={{ marginTop: '10px' }}
        >
          <Form.Label column xs={6} style={{ textAlign: 'right' }}>
            {name}
          </Form.Label>
          <Col xs={5} style={{ textAlign: 'left' }}>
            <Form.Control
              type="checkbox"
              defaultValue={false}
              onChange={changeHandler}
              label={name}
            />
          </Col>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default ToppingOption;
