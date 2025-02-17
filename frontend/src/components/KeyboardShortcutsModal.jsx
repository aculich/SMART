import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useHotkeys } from 'react-hotkeys-hook';
import { getShortcutsList, logKeyPress } from '../utils/keyboardShortcuts';

const KeyboardShortcutsModal = ({ show, onHide }) => {
    const shortcutSections = getShortcutsList();

    // Add escape key logging
    useHotkeys('esc', (event) => {
        if (show) {
            event.preventDefault();
            logKeyPress('esc', 'Close keyboard shortcuts modal');
            onHide();
        }
    }, { enabled: show });

    return (
        <Modal style={{ opacity: 1 }} show={show} onHide={() => {
            logKeyPress('click', 'Close keyboard shortcuts modal');
            onHide();
        }} size="lg" className="keyboard-shortcuts">
            <Modal.Header closeButton>
                <Modal.Title>Keyboard Shortcuts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {shortcutSections.map(({ section, shortcuts }) => (
                    <div key={section} className="mb-4">
                        <h5>{section}</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ width: "200px" }}>Shortcut</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shortcuts.map(({ key, displayKey, description }) => (
                                    <tr key={key}>
                                        <td>
                                            <kbd>{(displayKey || key).toUpperCase()}</kbd>
                                        </td>
                                        <td>{description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
};

export default KeyboardShortcutsModal; 
