import React, { Fragment, useState, useRef, useEffect } from "react";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { logKeyPress } from '../../utils/keyboardShortcuts';

const DataCardAdjudicateButton = ({ cardData, fn, isOpenExternal, setIsOpenExternal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);
    const submitButtonRef = useRef(null);

    const effectiveIsOpen = isOpenExternal !== undefined ? isOpenExternal : isOpen;
    const effectiveSetIsOpen = setIsOpenExternal || setIsOpen;

    useEffect(() => {
        if (effectiveIsOpen) {
            // Focus the textarea after a short delay to ensure the modal is rendered
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                }
            }, 100);
        }
    }, [effectiveIsOpen]);

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (message.trim()) {
            fn({ ...cardData, oldLabelID: cardData.labelID, message });
            effectiveSetIsOpen(false);
            setMessage(''); // Clear the message after submission
        }
    };

    const handleModalKeyDown = (event) => {
        // Handle Ctrl+Enter or Cmd+Enter
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            if (message.trim()) {
                logKeyPress(event.metaKey ? 'cmd+enter' : 'ctrl+enter', 'Submit adjudicate form');
                handleSubmit(event);
            }
        } else if (event.key === 'Escape') { // Handle Escape (though Modal handles this automatically)
            event.preventDefault();
            logKeyPress('esc', 'Close adjudicate modal');
            effectiveSetIsOpen(false);
        }
    };

    return (
        <Fragment>
            <OverlayTrigger
                overlay={
                    <Tooltip id="skip_tooltip">
                        Clicking this button will send this card to an administrator for review
                    </Tooltip>
                }
                placement="top"
            >
                <Button
                    onClick={() => effectiveSetIsOpen(true)}
                    variant="info"
                >
                    Adjudicate
                </Button>
            </OverlayTrigger>
            
            {effectiveIsOpen && (
                <Modal 
                    style={{ opacity: 1 }} 
                    show={effectiveIsOpen} 
                    onHide={() => {
                        logKeyPress('click', 'Close adjudicate modal');
                        effectiveSetIsOpen(false);
                    }}
                    onKeyDown={handleModalKeyDown}
                    enforceFocus={false}
                    autoFocus={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Adjudicate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please enter the reasons for skipping this card:</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Reason</Form.Label>
                                <Form.Control
                                    ref={textareaRef}
                                    as="textarea"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    placeholder="Reasons for skipping... (Press Ctrl+Enter or Cmd+Enter to submit)"
                                    required
                                    rows={3}
                                    onKeyDown={(e) => {
                                        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                                            e.preventDefault();
                                            if (message.trim()) {
                                                logKeyPress(e.metaKey ? 'cmd+enter' : 'ctrl+enter', 'Submit adjudicate form');
                                                handleSubmit(e);
                                            }
                                        } else if (e.key === 'Tab' && !e.shiftKey && submitButtonRef.current) {
                                            e.preventDefault();
                                            submitButtonRef.current.focus();
                                        }
                                    }}
                                />
                            </Form.Group>
                            <Button 
                                ref={submitButtonRef}
                                variant="primary" 
                                type="submit"
                                disabled={!message.trim()}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </Fragment>
    );
};

export default DataCardAdjudicateButton;
