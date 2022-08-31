import React from 'react'

function Hero() {
	return (
		<div className="bg-dark text-secondary px-4 py-5 text-center">
			<div className="pt-5 pb-2">
				<h1 className="display-5 fw-bold text-white">Free Game Tracker</h1>
				<div className="col-lg-6 mx-auto">
					<p className="fs-5 mb-4">Keep up with free offers on Steam and the Epic Games Store using the table below, or sign up below to get notifications when there are new promotions!</p>
					<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
						{/*               <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Custom button</button>
              <button type="button" class="btn btn-outline-light btn-lg px-4">Secondary</button> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero