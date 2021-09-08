import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const changeHandler = (event) => {
    updateItemCount(name, Number(event.target.checked));
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
        style={{ width: '75%' }}
      />
      <Form.Group
        controlId={`${name}-topping-checkbox`}
        className="d-flex justify-content-center"
      >
        <Form.Check
          type="checkbox"
          onChange={changeHandler}
          label={name}
          defaultValue={false}
        />
      </Form.Group>
    </Col>
  );
};
export default ToppingOption;
