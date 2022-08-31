import React from 'react'

function GameTable() {
	return (
		<div className="col">
			<table className="table table-dark table-striped">
				<thead>
					<tr className="">
						<th scope="col">Name:</th>
						<th scope="col">Type:</th>
						<th scope="col">Ends:</th>
					</tr>
				</thead>
				<tbody>
					<tr className="table-dark">
						<td className="table-dark p-0 inline-block">
              <a href={"https://store.steampowered.com/app/351510/Quiplash/?curator_clanid=4777282&utm_source=SteamDB"} target="_blank">
                <img className = "me-2" src={"http://web.archive.org/web/20210425024950im_/https://cdn.cloudflare.steamstatic.com/steam/apps/351510/capsule_sm_120.jpg?t=1619316921"} alt="Game Image" width="107" height="40" />
              </a>
              Quiplash
            </td>
						<td className="table-dark">Permanent</td>
						<td className="table-dark">Aug 15</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default GameTable