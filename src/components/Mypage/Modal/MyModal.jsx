import ReactModal from 'react-modal';

const MyModal = ( {onClose} ) => {

    return (
        <ReactModal isOpen>
            <div>모달</div>
            <button onClick={() => onClose() }> X </button>
        </ReactModal>
    )
}

export default MyModal;