import React from 'react'
import { useRef, useEffect } from 'react'

function Form() {


	useEffect(() => {
		const form = document.getElementById('comForm');

		console.log("LISTENER SET")
			form.addEventListener('submit', function(e) {
			console.log("LISTENER TRIGGERED")
			if(!form.checkValidity()) {
				e.preventDefault();
				e.preventPropagation();
				
			}

			form.classList.add('was-validated')
		})
	})

	return (
		<form className="needs-validation" id="comForm" noValidate >
			<div className="container mt-5">
				
				{/* NAME INPUT */}
				<div className="mb-2">
					<label for="nameInput" className="form-label">First Name</label>
					<input type="phone" className="form-control" id="nameInput" placeholder="" required/>
				</div>
				
				{/* EMAIL INPUT */}
				<div className="mb-3">
					<label for="emailInput" className="form-label">Email address</label>
					<input type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
				</div>

				{/* PHONE INPUT	 */}
				<div className="mb-3">
					<label for="telInput" className="form-label">Phone number</label>
					<input type="phone" className="form-control" id="telInput" placeholder="XXX-XXX-XXXX" />
				</div>

				{/* EMAIL CHECK	 */}
				<div className="form-check">
					<label for="emailCheck" className="form-label">Email</label>
					<input class="form-check-input" type="checkbox" value="email" id="emailCheck" />
				</div>

				{/* PHONE CHECK	 */}
				<div className="form-check">
					<label for="telCheck" className="form-label">Phone</label>
					<input class="form-check-input" type="checkbox" value="phone" id="telCheck" />
				</div>

				{/* SUBMIT BUTTON */}	
				<div className="mt-3">
					<button className="btn btn-primary" type="submit">Submit</button>
				</div>
			</div>
		</form>
	)
}

export default Form