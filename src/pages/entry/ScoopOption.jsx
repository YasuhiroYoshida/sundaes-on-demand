import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const currentValue = event.target.value;
    const currentFloatValue = parseFloat(currentValue);

    const valueValidates =
      0 <= currentValue &&
      currentValue <= 10 &&
      Math.floor(currentFloatValue) === currentFloatValue;

    if (valueValidates) updateItemCount(name, currentValue);

    setIsValid(valueValidates);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        // src={`https://testing-react-yasuhiro.herokuapp.com${imagePath}`} // Heroku production
        // src={`https://localhost:5000/${imagePath}`} // Heroku local "heroku local web"
        src={`http://localhost:3030${imagePath}`} // self local "yarn start"
        alt={`${name} scoop`}
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
              type="number"
              defaultValue={0}
              onChange={handleChange}
              isInvalid={!isValid}
            />
          </Col>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default ScoopOption;
