import {React} from 'react';
import './WarnModal.css';

const WarnModal = ({setShowModal, delPostId, setDelPostId}) => {
    function hideModal() {
        document.querySelector('html').classList.remove('show-modal');
        document.querySelector('body').classList.remove('show-modal');
        setShowModal(false);
    }
    async function delPost() {
         try {
            if (localStorage.getItem('token') !== null) {
                const res = await fetch("http://localhost:5000/admin/delete/post/" + delPostId, {
                    method: "DELETE",
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });

                if (res.status === 200) {
                    const parsedRes = await res.json();
                    console.log('deleted post', parsedRes);
                    setDelPostId(null);
                    hideModal();
                }
            }
             
         } catch (err) {
             console.error(err.message);
         }
    }
    return (
        <section className="modal del-modal">
			<article className="modal-content">
				<h1 className="modal-title">Are you sure you wanna delete the post?</h1>
				<ul className="modal-btn-list">
					<li className="modal-btn-list-item"><button className="modal-btn modal-del-btn"
                        onClick={delPost}>Yes</button></li>
					<li className="modal-btn-list-item"><button className="modal-btn modal-cancel-btn" 
						onClick={hideModal}>Cancel</button></li>
				</ul>
				<button className="modal-close-btn" 
						onClick={hideModal}>&#10006;</button>
			</article>
		</section>
    );
}

export default WarnModal;
