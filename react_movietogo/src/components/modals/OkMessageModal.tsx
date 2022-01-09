import { Button, Modal } from "semantic-ui-react"

interface OkMessageModalProps {
    message: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    blurred?: boolean;
    size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
}

OkMessageModal.defaultProps = {
    blurred: true,
    size: 'mini',
}

export default function OkMessageModal(props: OkMessageModalProps) {
    return (
        <Modal // REGISTRATION CONFIRMATION MODAL
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
            open={props.open}
            size='small'
        >
            <Modal.Content>
                <p>{props.message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='green'
                    icon='checkmark'
                    content='Ok'
                    inverted
                    onClick={() => { props.setOpen(false) }}
                />
            </Modal.Actions>
        </Modal>
    )
};
