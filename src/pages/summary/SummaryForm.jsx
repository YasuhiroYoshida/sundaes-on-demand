import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default function SummaryForm({ setOrderPhase }) {
  const [termsAndCChecked, setTermsAndCChecked] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setOrderPhase('completed');
  }

  const popover = (
    <Popover id="termsandconditions-popover">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={termsAndCChecked}
          onChange={(e) => setTermsAndCChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!termsAndCChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
